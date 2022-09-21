<template>
  <v-app id="app">
    <v-app-bar v-if="isLogged" app clipped-left elevation="1" color="bgColor">
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
    <Sidebar v-if="isLogged"></Sidebar>
    <v-main app>
      <!-- Provides the application the proper gutter -->
      <v-container v-if="isLogged"  fluid class="pa-10">
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
      <Home v-if="!isLogged"></Home>

    </v-main>
  </v-app>

</template>

<script>
import Sidebar from "@/components/sidebar";
import Home from "@/components/home";
import SettingsIcon from "@/components/icons/settings";

export default {
  name: "App",
  data: () => ({
    
  }),
};
</script>

<style scoped lang="scss">

</style>
