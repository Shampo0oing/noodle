<template>
  <div>
    <HeaderBar>
      <section class="d-flex gap-2">
        <Autocomplete
          label="Ajouter un cours"
          @onAddEvent="addEvent($event)"
        ></Autocomplete>
      </section>
    </HeaderBar>
    <Schedule :bus="bus"></Schedule>
  </div>
</template>

<script>
import Autocomplete from "@/components/autocomplete";
import HeaderBar from "@/components/templates/header";
import Schedule from "@/components/schedule/schedule.vue";
import Vue from "vue";

export default {
  name: "schedule-page",
  components: {
    HeaderBar,
    Autocomplete,
    Schedule
  },
  data: () => {
    return {
      bus: new Vue(),
    };
  },
  methods: {
    addEvent(event) {
      this.bus.$emit("addEvent", event);
    },
  },
};
</script>

<style scoped lang="scss"></style>
