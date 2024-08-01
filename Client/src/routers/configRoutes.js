import { ADMIN_LAYOUT, NO_LAYOUT } from "../constants/layout";
import About from "../pages/About/about";
import LoginAdmin from "../pages/Admin/Login";
import Cart from "../pages/Cart/cart";
import Home from "../pages/Home/home";
import Login from "../pages/Login/login";
import Register from "../pages/Register/register";
import UserInfo from "../pages/UserInfo/userInfo";

export const configRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/home',
        component: Home,
    },
    {
        path: '/about',
        component: About,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/register',
        component: Register,
    },
    {
        path: '/cart',
        component: Cart,
        protected: true,
        rolePermissions: ['user', 'admin'],
    },
    {
        path: '/userInfo/:userId',
        component: UserInfo,
        protected: true,
        rolePermissions: ['admin', 'user'],
    },
    {
        path: '/admin/login',
        component: LoginAdmin,
        layout: NO_LAYOUT
    },
    {
        path: '/admin/test',
        component: LoginAdmin,
        layout: ADMIN_LAYOUT
    },
    
]