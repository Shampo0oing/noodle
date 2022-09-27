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
        bgColor1: "#09172a",
        bgColor2: "#000016",
        sideBar: "#14121E",
        primary: "#8080D7",
        border: "#383864",
      },
      light: {
        bgColor: "#F4F4F4",
        bgColor1: "#ffffff",
        bgColor2: "#d8d8e0",
        sideBar: "#14121E",
        primary: "#8080d7",
        border: "#cacade",
      },
    },
  },
});
