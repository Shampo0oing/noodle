<template>
  <component :is="dynamicComponent" />
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "SvgIcon",
  props: ["name"],
  computed: {
    dynamicComponent() {
      const name = this.name;

      return defineAsyncComponent(() => import(`./${name}.vue`));
    },
  },
};
</script>

<style scoped></style>
