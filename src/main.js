import * as VueThreejs from "vue-threejs";

import App from "./App.vue";
import Vue from "vue";
import router from "./router";

Vue.use(VueThreejs);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
