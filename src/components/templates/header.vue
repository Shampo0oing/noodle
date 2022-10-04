<template>
  <v-app-bar app prominent elevation="0" color="bgColor" class="app-bar">
    <h3>{{ $route.name }}</h3>
    <v-spacer></v-spacer>
    <slot></slot>
  </v-app-bar>
</template>

<script>
export default {
  name: "header-bar",
};
</script>

<style scoped></style>
