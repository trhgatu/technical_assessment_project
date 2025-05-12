import axios from 'axios';
import type { User,Album, Photo} from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserById = async (id: number): Promise<User> => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw error;
  }
};

export const getAlbums = async (page: number = 1, limit: number = 10): Promise<Album[]> => {
  try {
    const response = await axios.get(`${API_URL}/albums`, {
      params: { _page: page, _limit: limit },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching albums:', error);
    throw error;
  }
};

export const getAlbumsByUser = async (userId: number): Promise<Album[]> => {
  try {
    const response = await axios.get(`${API_URL}/albums`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching albums by user:', error);
    throw error;
  }
};


export const getAlbumById = async (id: number): Promise<Album> => {
  try {
    const response = await axios.get(`${API_URL}/albums/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching album with id ${id}:`, error);
    throw error;
  }
};

export const getPhotosByAlbumId = async (albumId: number): Promise<Photo[]> => {
  try {
    const response = await axios.get(`${API_URL}/photos`, {
      params: { albumId },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching photos for album ${albumId}:`, error);
    throw error;
  }
};

export const getAvatarUrl = (name: string): string => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&&background=random`;
};