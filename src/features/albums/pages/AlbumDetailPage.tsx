'use client';

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAlbumById, getPhotosByAlbumId, getUserById, getAvatarUrl } from '@/services/api';
import type { Album, Photo, User } from '@/types';
import { Image } from "antd"

const AlbumDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const albumId = Number(id);
  const [album, setAlbum] = useState<Album | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [albumData, photosData] = await Promise.all([
          getAlbumById(albumId),
          getPhotosByAlbumId(albumId),
          getUserById(albumId).catch(() => null),
        ]);
        setAlbum(albumData);
        setPhotos(photosData);
        if (albumData?.userId) {
          const user = await getUserById(albumData.userId);
          setUser(user);
        }
      } catch (error) {
        console.error('Error fetching album, photos, or user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [albumId]);

  if (isLoading) return <>Loading...</>;
  if (!album) return <div className="p-4">Album not found</div>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Album Details</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Album Information</CardTitle>
        </CardHeader>
        <CardContent>
          {user && (
            <div className="flex items-center gap-4 mb-4">
              <img
                src={getAvatarUrl(user.name)}
                alt={`Avatar of ${user.name}`}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p>
                  <strong>User:</strong>{' '}
                  <Link to={`/users/${user.id}`} className="clickable">
                    {user.name}
                  </Link>
                </p>
                <p>
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${user.email}`} className="clickable">
                    {user.email}
                  </a>
                </p>
              </div>
            </div>
          )}
          <p>
            <strong>Title:</strong> {album.title}
          </p>
        </CardContent>
      </Card>
      <h2 className="text-xl font-semibold mb-2">Photos</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <Image
            src={photo.thumbnailUrl}
            alt={photo.title}
            className="w-full h-auto rounded-md"
          />
        ))}
      </div>
    </div>
  );
};

export default AlbumDetailPage;