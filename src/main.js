import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router/index.js'
import { createAuth0 } from '@auth0/auth0-vue';









// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjT98XnPg54d88RHNayJ_CPCRBpbSJHi8",
  authDomain: "organiser-850a0.firebaseapp.com",
  projectId: "organiser-850a0",
  storageBucket: "organiser-850a0.appspot.com",
  messagingSenderId: "963250076189",
  appId: "1:963250076189:web:35ba8967d36d61c54ae4f4"
};

initializeApp(firebaseConfig);











const app = createApp(App);

app.use(router);
app.use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN, // Defined in `.env.local`
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  })
);

app.mount('#app')
