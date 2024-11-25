import React from "react";
import { Breadcrumb } from "antd";
import { useLocation, Link } from "react-router-dom";

const breadcrumbNameMap = {
  "/admin": "Admin",
  "/admin/categories": "Categories",
  "/admin/products": "Products",
  "/admin/purchase-order": "Purchase Orders",
  "/admin/dashboard": "Dashboard",
  "/admin/users": "Users",
  "/admin/profile": "Profile",
};

const AdminBreadCrumbs = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  console.log('location', location.pathname)
  console.log('path', pathSnippets)
  
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    let subUrl = url
    if(url == '/admin') {
        subUrl = '/admin/dashboard'
    }
    return (
      <Breadcrumb.Item key={url}>
        <Link to={subUrl}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    // <Breadcrumb.Item key="home">
    //   <Link to="/">Home</Link>
    // </Breadcrumb.Item>,
    ...extraBreadcrumbItems,
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </div>
  );
};

export default AdminBreadCrumbs;
