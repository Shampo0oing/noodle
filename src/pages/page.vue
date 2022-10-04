<template>
  <v-app class="page">
    <Sidebar></Sidebar>
    <v-main app>
      <!-- Provides the application the proper gutter -->
      <v-container fluid class="pr-10 pl-10 pb-10">
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "@/components/templates/sidebar";

export default {
  name: "page-app",
  components: {
    Sidebar,
  },
  data: () => ({}),
  methods: {
    console(toPrint) {
      console.log(toPrint);
    },
  },
};
</script>

<style scoped lang="scss">
.page {
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

::v-deep .app-bar > .v-toolbar__content {
  display: flex;
  align-items: end;
  padding: 10px 40px;
}
</style>
