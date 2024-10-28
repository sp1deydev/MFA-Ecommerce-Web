import MFAConfiguration from "../components/MFAConfiguration";
import UploadImage from "../components/uploadImage";
import { ADMIN_LAYOUT, NO_LAYOUT, SYSTEM_LAYOUT } from "../constants/layout";
import About from "../pages/About/about";
import LoginAdmin from "../pages/Admin/Login";
import Cart from "../pages/Cart/cart";
import Home from "../pages/Home/home";
import Login from "../pages/Login/login";
import MFA from "../pages/MFA/mfa";
import ProductDetails from "../pages/ProductDetails/productdetails";
import Register from "../pages/Register/register";
import UserInfo from "../pages/UserInfo/userInfo";
import Dashboard from "../pages/Admin/Dashboard";
import LoginSystem from "../pages/System/login";
import SystemSettings from "../pages/System/systemSettings";
import Profile from "../pages/System/profile";

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
        path: '/testMFA',
        component: MFAConfiguration,
    },
    {
        path: '/testMFA2',
        component: MFA,
    },
    {
        path: '/up',
        component: UploadImage,
    },
    {
        path: '/products/:productId',
        component: ProductDetails,
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
    {
        path: '/admin/dashboard',
        component: Dashboard,
        layout: ADMIN_LAYOUT
    },
    // {
    //     path: '/system/login',
    //     component: Dashboard,
    //     layout: ADMIN_LAYOUT
    // },
    {
        path: '/system/login',
        component: LoginSystem,
        layout: NO_LAYOUT
    },
    {
        path: '/system/profile',
        component: Profile,
        layout: SYSTEM_LAYOUT,
        protected: true,
        rolePermissions: ['system'],
    },
    {
        path: '/system/settings',
        component: SystemSettings,
        layout: SYSTEM_LAYOUT,
        protected: true,
        rolePermissions: ['system'],
    },
    
]