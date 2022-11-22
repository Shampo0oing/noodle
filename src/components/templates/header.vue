<template>
  <v-app-bar
    app
    prominent
    elevation="0"
    color="bgColor"
    class="app-bar"
    height="104px"
  >
    <h3 class="header-text">{{ $route.name }}</h3>
    <v-spacer></v-spacer>
    <slot></slot>
  </v-app-bar>
</template>

<script>
export default {
  name: "header-bar",
};
</script>

<style scoped lang="scss">
.header-text {
  font-family: "gilroy", serif;
}
</style>
