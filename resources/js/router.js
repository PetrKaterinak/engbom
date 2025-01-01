import {createRouter, createWebHistory} from "vue-router";
import AuthLayout from "./components/layouts/AuthLayout.vue";
import DefaultLayout from "./components/layouts/DefaultLayout.vue";
import Page404 from "./views/PageNotFound.vue";
import Login from "./views/auth/Login.vue";
import Home from "./views/home/Home.vue";
import Register from "./views/auth/Register.vue";
import ForgottenPassword from "./views/auth/ForgottenPassword.vue";
import PasswordReset from "./views/auth/PasswordReset.vue";
import ActiveProjects from "./views/links/ActiveProjects.vue";
import CompletedProjects from "./views/links/CompletedProjects.vue";
import NewProject from "./views/links/NewProject.vue";
import Inventory from "./views/links/Inventory.vue";
import Settings from "./views/links/Settings.vue";
import Documentation from "./views/links/Documentation.vue";
import Contact from "./views/links/Contact.vue";

const routes = [
    {
        path: "/",
        redirect: "/home",
        component: DefaultLayout,
        children: [
            {path: "/home", name: "Home", component: Home, meta: {title: "Domovská stránka"}},
            {path: "/projects/active", name: "ActiveProjects", component: ActiveProjects, meta: {title: "Aktivní projekty"}},
            {path: "/projects/completed", name: "CompletedProjects", component: CompletedProjects, meta: {title: "Dokončené projekty"}},
            {path: "/projects/new", name: "NewProject", component: NewProject, meta: {title: "Nový projekt"}},
            {path: "/inventory", name: "Inventory", component: Inventory, meta: {title: "Inventář"}},
            {path: "/settings", name: "Settings", component: Settings, meta: {title: "Nastavení"}},
            {path: "/help/docs", name: "Documentation", component: Documentation, meta: {title: "Dokumentace"}},
            {path: "/help/faq", name: "FAQ", component: Settings, meta: {title: "Často kladené otázky"}},
            {path: "/help/contact", name: "Contact", component: Contact, meta: {title: "Kontaktujte nás"}},
        ],
    },
    {
        path: "/auth",
        redirect: "/login",
        name: "Auth",
        component: AuthLayout,
        children: [
            {path: "/login", name: "Login", component: Login},
            {path: "/register", name: "Register", component: Register},
            {path: "/forgotten-password", name: "ForgottenPassword", component: ForgottenPassword},
            {path: "/password-reset/:reset_token", name: "PasswordReset", component: PasswordReset},
        ],
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: Page404,
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Update the document title on each route change
router.beforeEach((to, from, next) => {
    if (!['Login', 'Register', 'ForgottenPassword', 'PasswordReset'].includes(to.name) && !localStorage.getItem('token')) {
        next({name: 'Login'});
    }
    document.title = to.meta.title || 'Laravel Vue Boilerplate';
    next();
});

export default router;