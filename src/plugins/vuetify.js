import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    dark: false,
    themes: {
      dark: {
        bgColor: "#192233",
        bgColor1: "#232d40",
        bgColor2: "#364259",
        sideBar: "#14121E",
        primary: "#8080D7",
        border: "#546380",
        error: "#ff6a6d",
      },
      light: {
        bgColor: "#e6e9f2",
        bgColor1: "#dadfeb",
        bgColor2: "#cfd5e6",
        sideBar: "#14121E",
        primary: "#8080d7",
        border: "#a3abbf",
        error: "#ff6a6d",
      },
    },
  },
});
