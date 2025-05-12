'use client';

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { getUserById, getAlbumsByUser, getAvatarUrl } from '@/services/api';
import type { User, Album } from '@/types';

const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const [user, setUser] = useState<User | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [userData, albumsData] = await Promise.all([
          getUserById(userId),
          getAlbumsByUser(userId),
        ]);
        setUser(userData);
        setAlbums(albumsData);
      } catch (error) {
        console.error('Error fetching user or albums:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (isLoading) return <>Loading...</>;
  if (!user) return <div className="p-4">User not found</div>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <img
            src={getAvatarUrl(user.name)}
            alt={`Avatar of ${user.name}`}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${user.email}`} className="clickable">
                {user.email}
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
      <h2 className="text-xl font-semibold mb-2">Albums</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {albums.map((album) => (
            <TableRow key={album.id}>
              <TableCell>{album.id}</TableCell>
              <TableCell>{album.title}</TableCell>
              <TableCell>
                <Link to={`/albums/${album.id}`} className="clickable">
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserDetailPage;