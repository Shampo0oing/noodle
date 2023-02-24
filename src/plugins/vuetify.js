import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    dark: true,
    themes: {
      dark: {
        bgColor: "#192233",
        bgColor1: "#232d40",
        bgColor2: "#364259",
        sideBar: "#14121E",
        primary: "#868eff",
        secondary: "#ff6666",
        border: "#546380",
        error: "#ff6a6d",
      },
      light: {
        bgColor: "#ffffff",
        bgColor1: "#f5f7f9",
        bgColor2: "#cfd5e6",
        sideBar: "#14121E",
        primary: "#868eff",
        secondary: "#ff6666",
        border: "#e2e4e5",
        error: "#ff6a6d",
      },
    },
  },
});
