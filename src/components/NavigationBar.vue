<script setup>

import InviteToFamilyPopUp from "@/components/InviteToFamilyPopUp.vue";
import {onBeforeUnmount, onMounted, ref} from "vue";
import {getAuth, signOut} from "firebase/auth";
import router from "@/router/index.js";

defineProps({
    user_id: String,
})

const show_popup = ref(false);
const open_hamburger_menu = ref("")
const show_or_hide_burger_menu = ref("hidden")
const site_scrolled = ref(false)

function change_hamburger_menu_state() {
    open_hamburger_menu.value === "" ? open_hamburger_menu.value = "open" : open_hamburger_menu.value = "";
    show_or_hide_burger_menu.value === "hidden" ? show_or_hide_burger_menu.value = "flex" : show_or_hide_burger_menu.value = "hidden";
}

function closeInviteToFamilyPopUp() {
    show_popup.value = false;
}

async function handleSignOut() {
    await signOut(getAuth());
    await router.push("/");
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
})

function handleScroll() {
    site_scrolled.value = window.scrollY !== 0
}

</script>

<template>

<nav style="z-index: 2; position: fixed; left: 0; right: 0; top: 0px" v-bind:class="site_scrolled ? 'shadow-visible' : 'shadow-hidden'" class="fade-in bg-white rounded-2xl mx-auto p-2 m-2 flex justify-between items-center
      sm:w-[92%]
      md:w-[92%]
      lg:w-[82%]
      xl:w-[72%]
      2xl:w-[62%]">

<!--  logo  -->
    <RouterLink to="/home" class="flex items-center space-x-1">
        <img src="/src/assets/logo.jpg" class="h-[3rem]" alt="Logo">
        <span class="text-black text-3xl font-handwriting">Organiser</span>
    </RouterLink>

<!--  subpages  -->
    <div class="hidden md:flex space-x-6">
        <RouterLink v-bind:to="{ path: '/tasks', query: { user_id: user_id } }" v-bind:class="[$route.path === '/tasks' ? 'active-link' : '']" class="button-shadow bg-amber-50 hover:bg-amber-50">Tasks</RouterLink>
        <RouterLink v-bind:to="{ path: '/list', query: { user_id: user_id } }" v-bind:class="[$route.path === '/list' ? 'active-link' : '']" class="button-shadow bg-amber-50 hover:bg-amber-50">List</RouterLink>
        <RouterLink v-bind:to="{ path: '/chat', query: { user_id: user_id } }" v-bind:class="[$route.path === '/chat' ? 'active-link' : '']" class="button-shadow bg-amber-50 hover:bg-amber-50">Chat</RouterLink>
    </div>

<!--  logIn, inviteToFamily  -->
    <div class="hidden md:flex items-center space-x-6">
        <button v-on:click="show_popup = true" class="button-shadow bg-amber-300 hover:bg-yellow-500 text-black">Invite to family</button>
        <button v-on:click="handleSignOut" class="button-shadow bg-red-400 hover:bg-red-600">Log out</button>
    </div>

<!--  Mobile Menu  -->
    <div>
        <!--  Burger Icon  -->
        <button v-on:click="change_hamburger_menu_state" v-bind:class="open_hamburger_menu" class="hamburger md:hidden focus:outline-none mr-3 flex flex-col justify-center" id="menu-btn">
            <span class="hamburger-top"></span>
            <span class="hamburger-middle"></span>
            <span class="hamburger-bottom"></span>
        </button>

        <!--   Menu     -->
        <div class="md:hidden">
            <div v-bind:class="show_or_hide_burger_menu" class="absolute flex-col shadow-xl rounded-md items-center self-end py-8 mt-10 space-y-3 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md">
                <RouterLink v-bind:to="{ path: '/tasks', query: { user_id: user_id } }" v-bind:class="[$route.path === '/tasks' ? 'active-link' : '']" v-on:click="change_hamburger_menu_state" class="button-shadow bg-amber-50 hover:bg-amber-50">Tasks</RouterLink>
                <RouterLink v-bind:to="{ path: '/list', query: { user_id: user_id } }" v-bind:class="[$route.path === '/list' ? 'active-link' : '']" v-on:click="change_hamburger_menu_state" class="button-shadow bg-amber-50 hover:bg-amber-50">List</RouterLink>
                <RouterLink v-bind:to="{ path: '/chat', query: { user_id: user_id } }" v-bind:class="[$route.path === '/chat' ? 'active-link' : '']" v-on:click="change_hamburger_menu_state" class="button-shadow bg-amber-50 hover:bg-amber-50">Chat</RouterLink>
                <button v-on:click="show_popup = true; change_hamburger_menu_state()" class="button-shadow bg-amber-300 hover:bg-yellow-500 text-black">Invite to family</button>
                <button v-on:click="change_hamburger_menu_state(); handleSignOut()" class="button-shadow bg-red-400 hover:bg-red-600">Log out</button>

            </div>
        </div>
    </div>

</nav>

<InviteToFamilyPopUp v-if="show_popup" v-bind:user_id="user_id" v-bind:closeInviteToFamilyPopUp="closeInviteToFamilyPopUp"></InviteToFamilyPopUp>

</template>

<style scoped>

.active-link {
    background-color: #fde68a;
}

.shadow-hidden {
    transition-duration: 0.5s;
}

.shadow-visible {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition-duration: 0.5s;
}

</style>



