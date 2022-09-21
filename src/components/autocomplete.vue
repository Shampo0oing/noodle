<template>
  <article class="autocomplete-container">
    <v-card color="bgColor2">
      <v-card-title class="text-h5"> Ajouter un cours </v-card-title>
      <v-card-text class="mt-5">
        <v-autocomplete
          v-model="model"
          filled
          rounded
          :items="items"
          :loading="isLoading"
          :search-input.sync="search"
          hide-no-data
          hide-selected
          item-text="acronym"
          item-value="_id"
          placeholder="Start typing to Search"
          prepend-inner-icon="mdi-magnify"
          return-object
        ></v-autocomplete>
      </v-card-text>
      <v-divider></v-divider>
      <v-expand-transition>
        <v-list v-if="model">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title v-text="model.acronym"></v-list-item-title>
              <v-list-item-subtitle v-text="model.name"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon :href="model.link" target="_blank" color="primary">
                <v-icon>mdi-web</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <section class="groups-container d-flex flex-column overflow-y-auto">
            <v-list-item-group
              v-if="model.classGroups.length > 0"
              mandatory
              v-model="classGroupSelected"
              active-class="selected-group"
            >
              <v-card-title>Cours</v-card-title>
              <v-list-item v-for="group in model.classGroups" :key="group._id">
                <v-list-item-content
                  class="group-content d-flex flex-column rounded-lg"
                >
                  <v-list-item-title class="w-full">
                    <div class="d-flex justify-space-between w-full">
                      <b>{{ group.nGroup }}</b>
                      <div>{{ group.day }}</div>
                      <div>{{ group.time }}</div>
                    </div>
                  </v-list-item-title>
                  <v-list-item-title class="w-full">
                    <div class="d-flex justify-space-between w-full">
                      <div>{{ group.nClass }}</div>
                      <div>{{ group.teacher }}</div>
                    </div>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item-group
              v-if="model.labGroups.length > 0"
              mandatory
              v-model="labGroupSelected"
              active-class="selected-group"
            >
              <v-card-title>Laboratoires</v-card-title>
              <v-list-item v-for="group in model.labGroups" :key="group._id">
                <v-list-item-content
                  class="group-content d-flex flex-column rounded-lg"
                >
                  <v-list-item-title class="w-full">
                    <div class="d-flex justify-space-between w-full">
                      <b>{{ group.nGroup }}</b>
                      <div>{{ group.day }}</div>
                      <div>{{ group.time }}</div>
                    </div>
                  </v-list-item-title>
                  <v-list-item-title class="w-full">
                    <div class="d-flex justify-space-between w-full">
                      <div>{{ group.nClass }}</div>
                      <div>{{ group.teacher }}</div>
                    </div>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </section>
        </v-list>
      </v-expand-transition>
      <v-card-actions v-if="model">
        <v-spacer></v-spacer>
        <v-btn :disabled="!model" @click="model = null">
          Annuler
          <v-icon right> mdi-close-circle </v-icon>
        </v-btn>
        <v-btn
          color="primary"
          :disabled="!model || !model.classGroups[classGroupSelected]"
          @click="onAddClass()"
        >
          Ajouter
          <v-icon right> mdi-plus </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </article>
</template>

<script>
export default {
  name: "auto-complete",
  data: () => ({
    entries: [],
    isLoading: false,
    radio: [],
    model: null,
    labGroupSelected: null,
    classGroupSelected: null,
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
    onAddClass() {
      this.$emit("addEvent", {
        ...this.model,
        class: this.model.classGroups[this.classGroupSelected],
        laboratory: this.model.labGroups[this.labGroupSelected],
      });
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
      return this.entries.map((c) => {
        return {
          ...c,
          classGroups: this.getHours(c.groups.filter((g) => !g.isLab)),
          labGroups: this.getHours(c.groups.filter((g) => g.isLab)),
        };
      });
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
  width: 30%;
  max-height: 70vh;

  .groups-container {
    max-height: 300px;
  }

  .selected-group {
    border-left: 3px solid var(--v-primary-base);
  }
}
</style>
