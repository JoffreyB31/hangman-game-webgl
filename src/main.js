import App from "./App.vue";
import Vue from "vue";
import { i18n } from "@/i18n";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  render: (h) => h(App),
}).$mount("#app");
