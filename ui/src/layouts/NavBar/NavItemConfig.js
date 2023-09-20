import * as Icon from 'react-feather';

export default [
  {
    title: 'Dashboard',
    icon: Icon.Database,
    href: '/dashboard',
    isAuth: false,
  },
  {
    title: 'Product Type Management',
    icon: Icon.Tag,
    href: '/admin/product-type-management',
    isAuth: true,
  },
  {
    title: 'User Management',
    icon: Icon.User,
    href: '/admin/user-management',
    isAuth: false,
  },
];
