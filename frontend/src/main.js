import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";

import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "vue-toastification/dist/index.css";

import Toast from "vue-toastification";
import { toastOptions } from "./config/toast.config.js";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Toast, toastOptions);

app.mount("#app");
