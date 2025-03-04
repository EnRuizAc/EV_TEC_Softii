import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        alias: "/propinas",
        name: "propinas",
        component: () => import("../components/PuntoDeVenta.vue"),
    },
    {
        path: "/",
        alias: "/recibos",
        name: "recibos",
        component: () => import("../components/Recibos.vue"),
    }
];

    
console.log(process.env.BASE_URL);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;