import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Chat from "@/views/Chat.vue";
import List from "@/views/List.vue";
import Tasks from "@/views/Tasks.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: 'home',
            component: HomeView,
        },
        {
            path: "/tasks",
            name: 'tasks',
            component: Tasks,
            props: route => ({
                user_id: route.query.user_id,
            }) // Sharing props by router
        },
        {
            path: "/list",
            name: 'list',
            component: List,
        },
        {
            path: "/chat",
            name: 'chat',
            component: Chat,
        }
    ]
})

export default router;




