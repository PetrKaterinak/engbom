<script setup>
import Navbar from "../Navigation/Navbar.vue";
import indeevCubeLogo from '../../../img/iD_cube.png';

const variableItems = [
  {
    icon: 'mdi mdi-view-dashboard',
    to: '/home',
    title: 'Dashboard',
  },
  {
    icon: 'mdi mdi-clipboard-text',
    title: 'Projects',
    children: [
      {to: '/projects/active', title: 'Active Projects'},
      {to: '/projects/completed', title: 'Completed Projects'},
      {to: '/projects/new', title: 'New Project'},
    ],
  },
  {
    icon: 'mdi mdi-cube-outline',
    title: 'Materials',
    children: [
      {to: '/materials/list', title: 'Material List', icon: 'mdi mdi-view-list'},
      {to: '/materials/categories', title: 'Categories'},
      {to: '/materials/add', title: 'Add Material', icon: 'mdi mdi-plus'},
    ],
  },
  {
    icon: 'mdi mdi-file-document-outline',
    title: 'Reports',
    badge: 15,
    children: [
      {to: '/reports/summary', title: 'Summary Reports', badge: 7},
      {to: '/reports/detail', title: 'Detailed Reports', badge: 8},
    ],
  },
  {
    icon: 'mdi mdi-domain',
    title: 'Manufacturers',
    children: [
      {to: '/manufacturers/list', title: 'Manufacturer List'},
      {to: '/manufacturers/add', title: 'Add Manufacturer', icon: 'mdi mdi-domain-plus'},
    ],
  },
  {
    icon: 'mdi mdi-package-variant-closed',
    to: '/inventory',
    title: 'Inventory',
  },
  {
    icon: 'mdi mdi-truck-delivery',
    to: '/suppliers',
    title: 'Suppliers',
  },
  {
    icon: 'mdi mdi-account-group',
    title: 'Teams',
    children: [
      {to: '/teams/members', title: 'Team Members', icon: 'mdi mdi-account-multiple-outline'},
      {to: '/teams/roles', title: 'Roles', icon: 'mdi mdi-account-tag-outline'},
    ],
  },
  {
    icon: 'mdi mdi-chart-bar',
    to: '/analytics',
    title: 'Analytics',
  },
];

const fixedItems = [
  {
    icon: 'mdi mdi-bell',
    to: '/notifications',
    title: 'Notifications',
    badge: 3,
  },
  {
    icon: 'mdi mdi-help-circle-outline',
    title: 'Help',
    children: [
      {to: '/help/docs', title: 'Documentation'},
      {to: '/help/faq', title: 'FAQ'},
      {to: '/help/contact', title: 'Contact Us'},
    ],
  },
  {
    icon: 'mdi mdi-cog',
    to: '/settings',
    title: 'Settings',
  },
  {
    icon: 'mdi mdi-logout',
    to: '/logout',
    title: 'Logout',
  }
];

const navbarConfig = {
  primaryColor: '#333',
  secondaryColor: '#444',
  activeColor: '#07C7F8',
};

</script>

<template>
  <div class="relative min-h-screen bg-white flex flex-col sm:flex-row">
    <Navbar :logo="indeevCubeLogo" :variable-items="variableItems" :fixed-items="fixedItems" :navbar-config="navbarConfig"/>
    <div class="w-full px-5 py-5 overflow-y-auto">
      <router-view/>
    </div>
  </div>
</template>

<style scoped>
.dropdown:hover .dropdown-menu {
  display: block;
}
</style>