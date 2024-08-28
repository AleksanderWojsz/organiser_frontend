import { createRouter, createWebHistory } from "vue-router";
import Chat from "@/views/Chat.vue";
import List from "@/views/List.vue";
import Tasks from "@/views/Tasks.vue";
import Home from "@/views/Home.vue";
import Register from "@/views/Register.vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import Feed from "@/views/Feed.vue";
import SignIn from "@/views/SignIn.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
       {
            path: "/",
            name: 'home',
            component: Home,

        },
        {
            path: "/feed",
            name: 'feed',
            component: Feed,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/register",
            name: 'register',
            component: Register,
        },
       {
            path: "/sign-in",
            name: 'sign-in',
            component: SignIn,
        },
        {
            path: "/tasks",
            name: 'tasks',
            component: Tasks,
            props: route => ({ // Sharing props by router
                user_id: route.query.user_id,
            }),
            meta: {
                requiresAuth: true,
            }

        },
        {
            path: "/list",
            name: 'list',
            component: List,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/chat",
            name: 'chat',
            component: Chat,
            meta: {
                requiresAuth: true,
            }
        }

    ]
})

function getCurrentuser() {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener()
                resolve(user);
            }
        );
    });
}

router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) { // is authorization needed for given route
        if (await getCurrentuser()) {
            next();
        } else {
            next("/")
        }
    } else {
        next();
    }
})

export default router;




