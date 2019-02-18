import React, { useState, useMemo } from 'react';
import { Layout, Menu, Icon } from 'antd';
import ROUTES from '../routes';
import { navigate, Router, Link } from '@reach/router';
import './Sidebar.css';
import logo from '../assets/logo.png';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = collapsed => setCollapsed(collapsed);
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="h3 w3 ma3" key="logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <Router>
        <SideMenu default />
      </Router>
    </Sider>
  );
}

export default Sidebar;

function SideMenu({ uri }) {
  // 在render里的大量计算使用useMemo, 结尾的[]表示只计算一次（首次渲染）
  const keyConfig = useMemo(() => {
    const flatKeys = getFlatKeys(ROUTES);
    const firstKey = flatKeys[0];
    // 这里默认了侧栏最多只有两层结构，只找出了顶层的openKey
    const defaultOpenKeys = ROUTES.filter(r => r.children)
      .map(r => r.key)
      .filter(key => uri.includes(key));
    const defaultSelectedKeys = flatKeys.filter(key => uri.includes(key));
    if (defaultSelectedKeys.length === 0) {
      defaultSelectedKeys.push(firstKey);
    }
    return { defaultOpenKeys, defaultSelectedKeys };
  }, []);

  return (
    <Menu default theme="dark" {...keyConfig}>
      {renderRoutes(ROUTES)}
    </Menu>
  );
}

function renderRoutes(routes, parent = null) {
  return routes.map(({ key, title, icon, path, children }) => {
    const fullPath = key; // 使用全path作为key
    if (children) {
      return (
        <SubMenu
          key={key}
          title={
            <>
              {icon && <Icon type={icon} />}
              <span className="menu-item" to={fullPath}>
                {title}
              </span>
            </>
          }
        >
          {renderRoutes(children, fullPath)}
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={key} onClick={() => navigate(fullPath)}>
        {icon && <Icon type={icon} />}
        <span className="menu-item">{title}</span>
      </Menu.Item>
    );
  });
}

function getFlatKeys(routes) {
  let keys = [];
  routes.forEach(item => {
    keys.push(item.key);
    if (item.children) keys = [...keys, ...getFlatKeys(item.children)];
  });
  return keys;
}
