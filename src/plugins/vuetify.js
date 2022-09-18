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
        bgColor: "#222831",
        bgColor2: "#393e46",
        primary: "#6995FF",
        secondary: "#6e9887",
        error: "#ff6b6b",
        text: "#ffffff",
        textLight: "#eeeeee",
      },
      light: {
        bgColor: "#ffffff",
        bgColor2: "#f8f9fe",
        primary: "#6995FF",
        secondary: "#6e9887",
        error: "#ff6b6b",
        text: "#000000",
        textLight: "#eeeeee",
      },
    },
  },
});
