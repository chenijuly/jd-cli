const routes = [
  {
    title: '登录',
    path: '/',
    component: () => import('../components/login'),
  },
  {
    title: '注册',
    path: '/register',
    component: () => import('../components/register'),
  },
  // {
  //   title: '关于我们-资质荣誉',
  //   path: '/about-us/honor',
  //   models: () => [import('./models/honor')], // models可多个
  //   component: () => import('../components/about-us/honor')
  // }
];

export default routes;
