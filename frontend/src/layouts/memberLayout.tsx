import React, { useState } from "react";
import {
  UserOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  ProfileOutlined,
  HomeOutlined,
  MenuOutlined,
  CoffeeOutlined,
  TeamOutlined,
  BookOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Breadcrumb, Layout, Menu, theme } from "antd";
import logo from "../assets/logo.png";

import Mains from "../pages/Employee System/main";
import Employees from "../pages/Owner System/employee";
import EmployeeCreate from "../pages/Owner System/employee/create";
import EmployeeEdit from "../pages/Owner System/employee/edit";
import "./mean.css"

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

export default function MemberLayout() {
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
          {/* <Sider
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
                <Link to="/mainOwner">
                  <HomeOutlined />
                  <span>หน้าหลัก</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="employee"
                onClick={() => setCurrentPage("employee")}
              >
                <Link to="/employee">
                  <TeamOutlined />
                  <span>จัดการพนักงาน</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider> */}
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
                  <Route path="/mainOwner" element={<Mains />} />
                  <Route path="/employee" element={<Employees />} />
                  <Route path="/employee/create" element={<EmployeeCreate />} />
                  <Route path="/employee/edit/:id" element={<EmployeeEdit />} />
                </Routes>
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>Banna Café</Footer>
          </Layout>
        </Layout>
    </>
  );
}
