import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Chat from "@/views/Chat.vue";
import List from "@/views/List.vue";
import Plans from "@/views/Plans.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: 'home',
            component: HomeView
        },
        {
            path: "/plans",
            name: 'plans',
            component: Plans
        },
        {
            path: "/list",
            name: 'list',
            component: List
        },
        {
            path: "/chat",
            name: 'chat',
            component: Chat
        }
    ]
})

export default router;




