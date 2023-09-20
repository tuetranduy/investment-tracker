export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
// export const API_URL = 'https://api-hvphong-prj.tuetd.website';
export const ENABLE_REDUX_LOGGER = process.env.NODE_ENV !== 'production';
export const SECRET_KEY =
  process.env.REACT_APP_SECRET_KEY || '3e47c324049f3cf1ff9594c84f8e74de';
export const CLOUDINARY_ASSET_FOLDER =
  process.env.NODE_ENV === 'production'
    ? 'hvphong_media'
    : 'test_hvphong_media';

export const ROLES = [
  {
    name: 'Admin',
    roleId: 1,
  },
  {
    name: 'Users',
    roleId: 2,
  },
  {
    name: 'Guest',
    roleId: 3,
  },
];
