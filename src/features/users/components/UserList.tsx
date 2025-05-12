import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getUsers, getAvatarUrl } from '@/services/api';
import type { User } from '@/types';
import { Badge } from '@/components/ui/badge';
import LoadingComponent from '@/components/common/Loading';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users or users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);


 if (isLoading) {
    return (
     <LoadingComponent/>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Avatar</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            return (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
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
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">
                    {user.email}
                  </a>
                </TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.website}</TableCell>

                <TableCell>
                  <Link to={`/users/${user.id}`} className="clickable">
                    <Badge>Show</Badge>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserList;