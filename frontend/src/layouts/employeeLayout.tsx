import React, { useState } from "react";
import {
  UserOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  ProfileOutlined,
  HomeOutlined,
  MenuOutlined,
  CoffeeOutlined,
  BookOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Breadcrumb, Layout, Menu, theme } from "antd";
import logo from "../assets/logo.png";

import Mains from "../pages/EmployeeSystem/main";
import Menus from "../pages/EmployeeSystem/menu";
import MenuCreate from "../pages/EmployeeSystem/menu/create";
import MenuEdit from "../pages/EmployeeSystem/menu/edit";

import Ingredient from "../pages/EmployeeSystem/ingredient";
import IngredientCreate from "../pages/EmployeeSystem/ingredient/create";
import IngredientEdit from "../pages/EmployeeSystem/ingredient/edit";
import History from "../pages/EmployeeSystem/history";

import "./mean.css"
import IngredientMenus from "../pages/EmployeeSystem/menu/ingredientMenu";
import IngredientMenuCreate from "../pages/EmployeeSystem/menu/ingredientMenuCreate";
import Members from "../pages/EmployeeSystem/member";
import MemberEdit from "../pages/EmployeeSystem/member/edit";
import ManagePreorder from "../pages/EmployeeSystem/managepreorder";
import ManagePreorderEdit from "../pages/EmployeeSystem/managepreorder/edit";

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
  getItem("จัดการวัตถุดิบ", "6", <CoffeeOutlined />),
  getItem("บันทึกรายรับรายจ่าย", "7", <BookOutlined />),
  getItem("จัดการคำสั่งซื้อล่วงหน้า","8", <SolutionOutlined />)
];

export default function EmployeeLayout() {
  const page = localStorage.getItem("page");
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const setCurrentPage = (val: string) => {
    localStorage.setItem("page", val);
  };

  return (
    <>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            theme="dark"
            style={{
              backgroundColor: "#678983",
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
                <Link to="/mainEmployee">
                  <HomeOutlined />
                  <span>หน้าหลัก</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="createBuy"
                onClick={() => setCurrentPage("createBuy")}
              >
                <Link to="/">
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
              <Menu.Item
                key="promotion"
                onClick={() => setCurrentPage("promotion")}
              >
                <Link to="/">
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
              <Menu.Item
                key="ingredient"
                onClick={() => setCurrentPage("ingredient")}
              >
                <Link to="/ingredient">
                  <CoffeeOutlined />
                  <span>จัดการวัตถุดิบ</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="giveChange"
                onClick={() => setCurrentPage("giveChange")}
              >
                <Link to="/">
                  <BookOutlined />
                  <span>บันทึกรายรับรายจ่าย</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="managepreorder"
                onClick={() => setCurrentPage("managepreorder")}
              >
                <Link to="/managepreorder">
                  <BookOutlined />
                  <span>จัดการคำสั่งซื้อล่วงหน้า</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
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
                  <Route path="/mainEmployee" element={<Mains />} />
                  <Route path="/menu" element={<Menus />} />
                  <Route path="/menu/create" element={<MenuCreate />} />
                  <Route path="/menu/edit/:id" element={<MenuEdit />} />
                  <Route path="/menu/ingredientMenu/:id" element={<IngredientMenus />} />
                  <Route path="/menu/ingredientMenu/create/:id" element={<IngredientMenuCreate />} />
                  <Route path="/member" element={<Members />} />
                  <Route path="/member/edit/:id" element={<MemberEdit />} />
                  <Route path="/ingredient" element={<Ingredient />} />
                  <Route path="/ingredient/create" element={<IngredientCreate />} />
                  <Route path="/ingredient/edit/:id" element={<IngredientEdit />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/managepreorder" element={<ManagePreorder />} />
                  <Route path="/managepreorder/edit/:id" element={<ManagePreorderEdit />} />
                </Routes>
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>Banna Café</Footer>
          </Layout>
        </Layout>
    </>
  );
}
