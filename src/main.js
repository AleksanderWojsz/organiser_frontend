import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router/index.js'

import { initializeApp } from "firebase/app";

// If lost, all keys can be found under
// https://console.firebase.google.com/u/0/project/organiser-850a0/settings/general
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_API_KEY,
  authDomain: import.meta.env.VITE_API_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_API_PROJECT_ID,
  storageBucket: import.meta.env.VITE_API_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_API_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_API_APP_ID,
};

initializeApp(firebaseConfig);

const app = createApp(App);
app.use(router);
app.mount('#app')
