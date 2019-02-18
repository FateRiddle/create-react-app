import { lazy } from 'react';
const Page1 = lazy(() => import('pages/Page1'));
const Page2 = lazy(() => import('pages/Page2'));
const Game = lazy(() => import('pages/Game'));
const Content = lazy(() => import('pages/Content'));

const routes = [
  {
    title: '活动',
    icon: 'pie-chart',
    path: '/game',
    Component: Game,
  },
  {
    title: '内容',
    icon: 'desktop',
    path: '/content',
    Component: Content,
  },
  {
    title: 'User',
    icon: 'user',
    path: '/user',
    children: [
      { title: 'Tom', path: '/tom', Component: Page1 },
      { title: 'Bill', path: '/bill', Component: Page2 },
      { title: 'Alex', path: '/alex', Component: Page2 },
    ],
  },
  {
    title: 'Team',
    icon: 'team',
    path: '/team',
    children: [
      { title: 'Team 1', path: '/1', Component: Page1 },
      { title: 'Team 2', path: '/2', Component: Page2 },
    ],
  },
  { title: 'File', icon: 'file', path: '/file', Component: Page1 },
];

// 以每个模块对应的全path作为key，唯一。
function addKeys(routes, parentPath) {
  return routes.map(route => {
    const fullPath = parentPath ? parentPath + route.path : route.path;
    if (route.children) {
      const children = addKeys(route.children, route.path);
      return { ...route, key: fullPath, children };
    }
    return { ...route, key: fullPath };
  });
}

export default addKeys(routes);
