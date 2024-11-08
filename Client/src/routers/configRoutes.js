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
import OTP from "../components/OTP/otp";

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
        path: '/mfa-configuration',
        component: MFAConfiguration,
        
    },
    {
        path: 'forgot/mfa-configuration',
        component: MFAConfiguration,
        layout: NO_LAYOUT,
        
    },
    {
        path: '/mfa-authentication',
        component: MFA,
        
    },
    {
        path: '/system/mfa-configuration',
        component: MFAConfiguration,
        layout: SYSTEM_LAYOUT,
        rolePermissions: ['system'],
    },
    {
        path: '/system/mfa-authentication',
        component: MFA,
        layout: SYSTEM_LAYOUT,
        rolePermissions: ['system'],
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
    {
        path: '/system/login',
        component: LoginSystem,
        layout: NO_LAYOUT
    },
    {
        path: '/system/profile',
        component: UserInfo,
        layout: SYSTEM_LAYOUT,
        protected: true,
        rolePermissions: ['system'],
    },
    {
        path: '/system/first-login/settings',
        component: SystemSettings,
        layout: NO_LAYOUT,
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
    {
        path: '/otp',
        component: OTP,
    },
    
]