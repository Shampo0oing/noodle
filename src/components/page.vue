<template>
  <v-app class="page">
    <v-app-bar app clipped-left elevation="1" color="bgColor">
      <v-img
        contain
        src="https://i.imgur.com/U4sYwAj.png"
        max-height="40"
        max-width="200"
      ></v-img>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="navSettings = !navSettings">
        <settings-icon></settings-icon>
      </v-btn>
      <v-navigation-drawer
        app
        v-model="navSettings"
        temporary
        fixed
        right
        :hide-overlay="true"
      >
        <v-toolbar elevation="0" outlined>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click.stop="navSettings = !navSettings">
            <v-icon>mdi-window-close</v-icon>
          </v-btn>
        </v-toolbar>

        <section class="pa-5">
          <div>Theme</div>
          <v-btn-toggle v-model="isDarkTheme" active-class="selected" mandatory>
            <v-btn @click="changeTheme(0)">
              <span>Light</span>

              <v-icon right> mdi-weather-night </v-icon>
            </v-btn>

            <v-btn @click="changeTheme(1)">
              <span>Night</span>

              <v-icon right> mdi-weather-sunny </v-icon>
            </v-btn>
          </v-btn-toggle>
        </section>
      </v-navigation-drawer>
    </v-app-bar>
    <Sidebar></Sidebar>
    <v-main app>
      <!-- Provides the application the proper gutter -->
      <v-container  fluid class="pa-10">
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>

    </v-main>
  </v-app>

</template>

<script>
import Sidebar from "@/components/sidebar";
import SettingsIcon from "@/components/icons/settings";


export default {
  name: "page-app",
  components: {
    SettingsIcon,
    Sidebar,
  },
  data: () => ({
    isLogged: false,
    isDarkTheme: 0,
    navSettings: false,
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard" },
      { title: "Schedule", icon: "mdi-calendar" },
      { title: "Classes", icon: "mdi-book-open-page-variant" },
      { title: "Users", icon: "mdi-account-circle" },
    ],
  }),
  methods: {
    console(toPrint) {
      console.log(toPrint);
    },
    changeTheme(bool) {
      this.$vuetify.theme.dark = bool;
      window.localStorage.setItem("darkTheme", bool);
    },
  },
  mounted() {
    this.isDarkTheme = +window.localStorage.getItem("darkTheme");
    this.$vuetify.theme.dark = this.isDarkTheme;
  },
};
</script>

<style scoped lang="scss">
.app {
  padding: 32px;
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--v-bgColor-base);
}
#nav {
  min-height: 100vh;
}
.selected {
  background-color: var(--v-primary-base) !important;
  color: var(--v-textLight-base) !important;

  .v-icon {
    color: var(--v-textLight-base) !important;
  }
}

::v-deep path {
  //stroke: var(--v-text-base) !important;
}
</style>
