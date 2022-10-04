<template>
  <article class="autocomplete-container">
    <v-autocomplete
      v-model="model"
      filled
      dense
      rounded
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      cache-items
      hide-no-data
      hide-selected
      item-text="acronym"
      item-value="_id"
      :placeholder="label"
      prepend-inner-icon="mdi-magnify"
      return-object
    ></v-autocomplete>
    <GroupDialog
      :courses.sync="model"
      @onAddEvent="onAddEvent($event)"
      @onClose="model = null"
    ></GroupDialog>
  </article>
</template>
<script>
import GroupDialog from "@/components/groupDialog";
export default {
  name: "auto-complete",
  props: ["label"],
  components: { GroupDialog },
  data: () => ({
    entries: [],
    isLoading: false,
    radio: [],
    model: null,
    search: null,
  }),
  methods: {
    console(msg) {
      console.log(msg);
    },
    getHours(hours) {
      return hours.map((g) => {
        const timeArray = g.time.split(", ");
        const startH = timeArray[0].split("h")[0];
        const endM = timeArray[timeArray.length - 1].split("h")[1];
        const endH = +startH + timeArray.length;
        return {
          ...g,
          time: timeArray[0] + " - " + endH + "h" + endM,
        };
      });
    },
    onAddEvent({ classGroup, labGroup }) {
      this.$emit("onAddEvent", {
        ...this.model,
        class: classGroup,
        laboratory: labGroup,
      });
      this.model = null;
    },
  },
  computed: {
    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map((key) => {
        return {
          key,
          value: this.model[key] || "n/a",
        };
      });
    },
    items() {
      return this.entries.map((c) => ({
        ...c,
        classGroups: this.getHours(c.groups.filter((g) => !g.isLab)),
        labGroups: this.getHours(c.groups.filter((g) => g.isLab)),
      }));
    },
  },
  watch: {
    search() {
      // Items have already been loaded
      if (this.items?.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      fetch("http://localhost:3000/classes", { mode: "cors" })
        .then((res) => res.json())
        .then((res) => {
          this.entries = res;
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>

<style scoped lang="scss">
.autocomplete-container {
  max-height: 70vh;
  .groups-container {
    max-height: 300px;
  }

  .selected-group {
    border-left: 3px solid var(--v-primary-base);

    &::before {
      opacity: 0.1;
    }
  }
}

::v-deep .v-text-field__details {
  display: none;
}
</style>
