import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Layout, Menu, Breadcrumb, theme } from 'antd';
import { routesConfig } from '../router';

const { Header, Content, Footer, Sider } = Layout;

// 图标映射
const iconMap = {
  PieChartOutlined: <PieChartOutlined />,
  UserOutlined: <UserOutlined />,
  TeamOutlined: <TeamOutlined />,
  FileOutlined: <FileOutlined />,
  DesktopOutlined: <DesktopOutlined />,
};

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

// 从路由配置动态生成菜单项
function generateMenuItems(routes) {
  const menuItems = [];

  // 过滤出有meta信息且有key的路由作为菜单项
  routes.forEach(route => {
    if (route.meta && route.meta.key && route.path !== '/') {
      const item = getItem(
        route.meta.title,
        route.path,
        route.meta.icon ? iconMap[route.meta.icon] : null,
        route.children && route.children.length > 0 ? generateMenuItems(route.children) : undefined
      );
      menuItems.push(item);
    }
  });

  return menuItems;
}

const LayoutComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 获取顶层路由的子路由作为菜单项
  const menuItems = generateMenuItems(routesConfig[0].children);

  // 根据当前路径找到对应的路由配置
  useEffect(() => {
    const findRouteByPath = (routes, path) => {
      for (const route of routes) {
        // 精确匹配
        if (route.path === path) {
          return route;
        }

        // 动态参数路由匹配（简单实现）
        if (route.path && route.path.includes(':') && path.match(new RegExp(`^${route.path.replace(/:([^/]+)/g, '[^/]+')}$`))) {
          return route;
        }

        // 递归查找子路由
        if (route.children) {
          const found = findRouteByPath(route.children, path);
          if (found) return found;
        }
      }
      return null;
    };

    const route = findRouteByPath(routesConfig, location.pathname);
    setCurrentRoute(route);
  }, [location.pathname]);

  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  // 动态生成面包屑
  const generateBreadcrumb = () => {
    const breadcrumbItems = [{ title: '首页', href: '/' }];

    if (currentRoute && currentRoute.meta) {
      breadcrumbItems.push({ title: currentRoute.meta.title });
    }

    return breadcrumbItems;
  };

  // 获取当前选中的菜单项
  const getCurrentSelectedKey = () => {
    // 对于动态路由参数，我们需要找到对应的基本路径
    const basePath = location.pathname.split('/').slice(0, 2).join('/');
    return menuItems.find(item => item.key === basePath || item.key === location.pathname) ? location.pathname : '/dashboard';
  };

  return (
    <Layout style={{ minHeight: '100vh', width: '100vw' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          selectedKeys={[getCurrentSelectedKey()]}
          mode="inline"
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout style={{ width: 'calc(100% - 32px)', margin: '10px 10px', background: '#ffffff' }}>
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;