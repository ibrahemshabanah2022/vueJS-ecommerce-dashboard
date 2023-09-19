<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    },

    {
        label: 'UI Components',
        items: [
            { label: 'Add New Category', icon: 'pi pi-fw pi-id-card', to: '/uikit/AddNewCategory' },
            { label: 'Display All Categories', icon: 'pi pi-fw pi-check-square', to: '/uikit/Categories' },
            // { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/uikit/EditCategory' }
            { label: 'Display All Users', icon: 'pi pi-fw pi-exclamation-circle', to: '/uikit/DisplayAllUsers' },
            { label: 'Display All Products', icon: 'pi pi-fw pi-mobile', to: '/uikit/AllProducts', class: 'rotated-icon' },
            { label: 'Add New Product', icon: 'pi pi-fw pi-table', to: '/uikit/AddNewProduct' },
            { label: 'Orders', icon: 'pi pi-fw pi-list', to: '/uikit/Orders' }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
    <!-- <router-link to="/login">login</router-link> -->
</template>

<style lang="scss" scoped></style>
