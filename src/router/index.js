import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Chat from "@/views/Chat.vue";
import List from "@/views/List.vue";
import Tasks from "@/views/Tasks.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/tasks",
            name: 'tasks',
            component: Tasks,
            props: route => ({ // Sharing props by router
                user_id: route.query.user_id,
            })
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




