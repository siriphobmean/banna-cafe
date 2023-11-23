import React, { useState } from "react";
import { UserOutlined, DashboardOutlined, DesktopOutlined, TableOutlined, HomeOutlined, MenuOutlined} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import { Breadcrumb, Layout, Menu, theme } from "antd";
import logo from "./assets/logo.png";

import Dashboards from "./pages/dashboard";
import Menus from "./pages/menu";
import MenuCreate from "./pages/menu/create";
import MenuEdit from "./pages/menu/edit";

import Employees from "./pages/employee";
import EmployeeCreate from "./pages/employee/create";
import EmployeeEdit from "./pages/employee/edit";
import "./mean.css";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("หน้าหลัก", "1", <DashboardOutlined />),
  getItem("จัดการเมนู", "2", <MenuOutlined />), // no dashboard edit to "2"
  getItem("จัดการพนักงาน", "3", <UserOutlined />),
  // getItem("จัดการตารางงาน", "4", <UserOutlined />),
];

const App: React.FC = () => {
  const page = localStorage.getItem("page");
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const setCurrentPage = (val: string) => {
    localStorage.setItem("page", val);
  };

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
        theme="dark"
          style={{
            backgroundColor: '#678983',
          }}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: "50%", borderRadius: "50%" }}
            />
          </div>
          <Menu
            theme="light"
            defaultSelectedKeys={[page ? page : "dashboard"]}
            mode="inline"
          >
            <Menu.Item key="dashboard" onClick={() => setCurrentPage("dashboard")}>
              <Link to="/">
                <HomeOutlined />
                <span>หน้าหลัก</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="menu" onClick={() => setCurrentPage("menu")}>
              <Link to="/menu">
                <MenuOutlined />
                <span>จัดการเมนู</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="menu1" onClick={() => setCurrentPage("menu1")}>
              <Link to="/employee">
                <UserOutlined />
                <span>จัดการพนักงาน</span>
              </Link>
            </Menu.Item>
            {/* <Menu.Item key="menu2" onClick={() => setCurrentPage("menu2")}>
              <Link to="/employee">
                <TableOutlined />
                <span>จัดการตารางงาน</span>
              </Link>
            </Menu.Item> */}
          </Menu>
        </Sider >
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }} />
            <div
              style={{
                padding: 24,
                minHeight: "100%",
                background: colorBgContainer,
              }}
            >
              <Routes>
                <Route path="/" element={<Dashboards />} />
                <Route path="/menu" element={<Menus />} />
                <Route path="/employee" element={<Employees />} />
                <Route path="/menu/create" element={<MenuCreate />} />
                <Route path="/employee/create" element={<EmployeeCreate />} />
                <Route path="/menu/edit/:id" element={<MenuEdit />} />
                <Route path="/employee/edit/:id" element={<EmployeeEdit />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Banna Cafe
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
