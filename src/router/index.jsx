import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout';
import Dashboard from '../pages/Dashboard';
import User from '../pages/User';
import Team from '../pages/Team';
import Files from '../pages/Files';

// 动态路由配置
const routesConfig = [
  {
    path: '/',
    element: <Layout />,
    meta: {
      title: '首页布局',
      requiresAuth: true
    },
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
        meta: {
          title: '仪表盘',
          key: 'dashboard',
          icon: 'PieChartOutlined'
        },
      },
      {
        path: 'user',
        element: <User />,
        meta: {
          title: '用户管理',
          key: 'user',
          icon: 'UserOutlined',
          // 可以在这里添加权限信息
          permissions: ['view_user', 'edit_user']
        },
      },
      {
        path: 'team',
        element: <Team />,
        meta: {
          title: '团队管理',
          key: 'team',
          icon: 'TeamOutlined'
        },
      },
      {
        path: 'files',
        element: <Files />,
        meta: {
          title: '文件管理',
          key: 'files',
          icon: 'FileOutlined'
        },
      },
      // 支持动态参数路由
      {
        path: 'user/:id',
        element: <User />,
        meta: {
          title: '用户详情',
          key: 'user-detail',
          icon: 'UserOutlined'
        },
      },
    ],
  },
  // 可以添加更多顶层路由配置
];

// 动态生成路由的工具函数
function generateRoutes(routes) {
  return routes.map(route => {
    const newRoute = {
      path: route.path,
      element: route.element,
      meta: route.meta,
    };

    // 处理子路由
    if (route.children && route.children.length > 0) {
      newRoute.children = generateRoutes(route.children);
    }

    return newRoute;
  });
}

// 创建路由实例
const router = createBrowserRouter(generateRoutes(routesConfig));

// 导出路由配置，方便在其他地方使用（如菜单生成）
export { routesConfig };
export default router;