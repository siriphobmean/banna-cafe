import React, { useState } from "react";
import { UserOutlined, DashboardOutlined, ShoppingCartOutlined, ProfileOutlined, HomeOutlined, MenuOutlined, CoffeeOutlined, TeamOutlined, BookOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import { Breadcrumb, Layout, Menu, theme } from "antd";
import logo from "./assets/logo.png";

import Mains from "./pages/main";
import Menus from "./pages/menu";
import MenuCreate from "./pages/menu/create";
import MenuEdit from "./pages/menu/edit";

import Employees from "./pages/employee";
import EmployeeCreate from "./pages/employee/create";
import EmployeeEdit from "./pages/employee/edit";
import "./mean.css";
import IngredientMenus from "./pages/menu/ingredientMenu";
import Members from "./pages/member";
import MemberEdit from "./pages/member/edit";
import Ingredient from "./pages/ingredient";
import IngredientCreate from "./pages/ingredient/create";
import IngredientEdit from "./pages/ingredient/edit";
import History from "./pages/history";

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
  getItem("สร้างคำสั่งซื้อ", "2", <ShoppingCartOutlined />),
  getItem("จัดการเมนูสินค้า", "3", <MenuOutlined />),
  getItem("จัดการโปรโมชั่น", "4", <ProfileOutlined />),
  getItem("จัดการสมาชิก", "5", <UserOutlined />),
  getItem("จัดการพนักงาน", "6", <TeamOutlined />),
  getItem("จัดการวัตถุดิบ", "7", <CoffeeOutlined />),
  getItem("บันทึกรายรับรายจ่าย", "8", <BookOutlined />),
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
            <Menu.Item key="main" onClick={() => setCurrentPage("main")}>
              <Link to="/">
                <HomeOutlined />
                <span>หน้าหลัก</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="createBuy" onClick={() => setCurrentPage("createBuy")}>
              <Link to="/menu">
                <ShoppingCartOutlined />
                <span>สร้างคำสั่งซื้อ</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="menu" onClick={() => setCurrentPage("menu")}>
              <Link to="/menu">
                <MenuOutlined />
                <span>จัดการเมนูสินค้า</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="promotion" onClick={() => setCurrentPage("promotion")}>
              <Link to="/menu">
                <ProfileOutlined />
                <span>จัดการโปรโมชั่น</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="member" onClick={() => setCurrentPage("member")}>
              <Link to="/member">
                <UserOutlined />
                <span>จัดการสมาชิก</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="employee" onClick={() => setCurrentPage("employee")}>
              <Link to="/employee">
                <TeamOutlined />
                <span>จัดการพนักงาน</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="ingredient" onClick={() => setCurrentPage("ingredient")}>
              <Link to="/ingredient">
                <CoffeeOutlined />
                <span>จัดการวัตถุดิบ</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="giveChange" onClick={() => setCurrentPage("giveChange")}>
              <Link to="/employee">
                <BookOutlined />
                <span>บันทึกรายรับรายจ่าย</span>
              </Link>
            </Menu.Item>
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
                // background: 'white',
              }}
            >
              <Routes>
                <Route path="/" element={<Mains />} />
                <Route path="/menu" element={<Menus />} />
                <Route path="/employee" element={<Employees />} />
                <Route path="/member" element={<Members />} />
                <Route path="/menu/ingredientMenu/:id" element={<IngredientMenus />} />
                <Route path="/ingredient" element={<Ingredient />} />
                <Route path="/ingredient/create" element={<IngredientCreate />} />
                <Route path="/ingredient/edit/:id" element={<IngredientEdit />} />
                <Route path="/history" element={<History />} />
                <Route path="/menu/create" element={<MenuCreate />} />
                <Route path="/employee/create" element={<EmployeeCreate />} />
                <Route path="/menu/edit/:id" element={<MenuEdit />} />
                <Route path="/employee/edit/:id" element={<EmployeeEdit />} />
                <Route path="/member/edit/:id" element={<MemberEdit />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Banna Café
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
