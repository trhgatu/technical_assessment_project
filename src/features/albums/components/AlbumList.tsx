import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { getAlbums, getUserById, getAvatarUrl } from '@/services/api';
import type { Album, User } from '@/types';
import { Badge } from '@/components/ui/badge';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

const TOTAL_ALBUMS = 100;
const LIMIT_OPTIONS = [10, 20, 50, 100];

const AlbumList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 10);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [users, setUsers] = useState<{ [key: number]: User }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const totalPages = Math.ceil(TOTAL_ALBUMS / limit);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setIsLoading(true);
        const data = await getAlbums(page, limit);
        setAlbums(data);

        const userIds = [...new Set(data.map((album) => album.userId))];
        const userPromises = userIds.map((id) => getUserById(id));
        const userData = await Promise.all(userPromises);
        const userMap = userData.reduce((acc, user) => ({ ...acc, [user.id]: user }), {});
        setUsers(userMap);
      } catch (error) {
        console.error('Error fetching albums or users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlbums();
  }, [page, limit]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString(), limit: limit.toString() });
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(e.target.value);
    setSearchParams({ page: '1', limit: newLimit.toString() });
  };

  if (isLoading) return <>Loading...</>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Albums</h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {albums.map((album) => {
            const user = users[album.userId];
            return (
              <TableRow key={album.id}>
                <TableCell>{album.id}</TableCell>
                <TableCell>{album.title}</TableCell>
                <TableCell>
                  {user ? (
                    <div className="flex items-center gap-2">
                      <img
                        src={getAvatarUrl(user.name)}
                        alt={`Avatar of ${user.name}`}
                        className="w-8 h-8 rounded-full"
                      />
                      <Link to={`/users/${user.id}`} className="clickable">
                        {user.name}
                      </Link>
                    </div>
                  ) : (
                    'Loading...'
                  )}
                </TableCell>
                <TableCell>
                  <Link to={`/albums/${album.id}`} className="clickable">
                    <Badge>Show</Badge>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className="flex items-center">
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(page - 1)}
                className={cn('clickable', page === 1 && 'pointer-events-none opacity-50')}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  onClick={() => handlePageChange(p)}
                  isActive={page === p}
                  className="clickable"
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            )
            )}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(page + 1)}
                className={cn('clickable', page === totalPages && 'pointer-events-none opacity-50')}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <div className="flex items-center gap-2">
          <select
            id="limit-select"
            value={limit}
            onChange={handleLimitChange}
            className="border rounded px-2 py-1"
          >
            {LIMIT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AlbumList;
