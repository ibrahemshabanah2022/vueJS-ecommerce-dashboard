import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/uikit/editProduct',
                    name: 'Add New p',
                    component: () => import('@/views/uikit/EditProduct.vue')
                },
                {
                    path: '/uikit/AddNewCategory',
                    name: 'Add New Category',
                    component: () => import('@/views/uikit/AddNewCategory.vue')
                },
                {
                    path: '/uikit/Categories',
                    name: 'Categories',
                    component: () => import('@/views/uikit/Categories.vue')
                },
                {
                    path: '/uikit/EditCategory',
                    name: 'EditCategory',
                    component: () => import('@/views/uikit/EditCategory.vue')
                },
                {
                    path: '/uikit/DisplayAllUsers',
                    name: 'DisplayAllUsers',
                    component: () => import('@/views/uikit/DisplayAllUsers.vue')
                },
                {
                    path: '/EditUser',
                    name: 'EditUser',
                    component: () => import('@/views/pages/EditUser.vue')
                },
                {
                    path: '/uikit/AllProducts',
                    name: 'button',
                    component: () => import('@/views/uikit/AllProducts.vue')
                },
                {
                    path: '/uikit/AddNewProduct',
                    name: 'table',
                    component: () => import('@/views/uikit/AddNewProduct.vue')
                },
                {
                    path: '/uikit/Orders',
                    name: 'Orders',
                    component: () => import('@/views/uikit/Orders.vue')
                },

                {
                    path: '/uikit/viewOrder',
                    name: 'viewOrder',
                    component: () => import('@/views/uikit/viewOrder.vue')
                }
            ]
        },

        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        }
    ]
});

export default router;
