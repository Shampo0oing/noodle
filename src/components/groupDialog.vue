<template>
  <v-dialog v-if="model" v-model="model" width="900px" scrollable>
    <v-card color="bgColor">
      <article class="d-flex align-center">
        <v-card-title class="text-h5" v-text="model.acronym"></v-card-title>
        <v-btn icon :href="model.link" target="_blank" color="primary">
          <v-icon>mdi-web</v-icon>
        </v-btn>
      </article>
      <v-divider></v-divider>
      <div class="overflow-y-auto d-flex flex-column pl-10 pr-10">
        <section v-if="model.classGroups.length > 0">
          <v-card-title>Cours</v-card-title>
          <v-data-table
            v-model="classGroupSelected"
            dense
            class="bgColor1 mb-10"
            single-select
            show-select
            item-key="_id"
            :items-per-page="50"
            :headers="headers"
            :items="model.classGroups"
            hide-default-footer
          >
          </v-data-table>
        </section>
        <section v-if="model.labGroups.length > 0">
          <v-card-title>Travaux pratiques</v-card-title>
          <v-data-table
            v-model="labGroupSelected"
            class="bgColor1 mb-10"
            dense
            single-select
            show-select
            item-key="_id"
            :items-per-page="50"
            :headers="headers"
            :items="model.labGroups"
            hide-default-footer
          >
          </v-data-table>
        </section>
      </div>

      <v-card-actions v-if="model">
        <v-spacer></v-spacer>
        <v-btn :disabled="!model" @click="$emit('onClose')">
          Annuler
          <v-icon right> mdi-close-circle </v-icon>
        </v-btn>
        <v-btn
          color="primary"
          :disabled="
            classGroupSelected.length === 0 && labGroupSelected.length === 0
          "
          @click="addEvent()"
        >
          Ajouter
          <v-icon right> mdi-plus </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "group-dialog",
  props: ["courses"],
  data: () => ({
    classGroupSelected: [],
    labGroupSelected: [],
    headers: [
      {
        text: "Groupe",
        sortable: false,
        value: "nGroup",
        width: 50,
      },
      { text: "Jour", value: "day", width: 110 },
      { text: "Heure", value: "time", sortable: false, width: 150 },
      { text: "Local", value: "nClass", sortable: false, width: 120 },
      {
        text: "Enseignant(e)(s)",
        value: "teacher",
        sortable: false,
        width: 250,
      },
    ],
  }),
  methods: {
    addEvent() {
      this.$emit("onAddEvent", {
        classGroup: this.classGroupSelected[0],
        labGroup: this.labGroupSelected[0],
      });
    },
  },
  computed: {
    model() {
      return this.courses;
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep tr {
  &.v-data-table__selected,
  &:hover {
    background-color: var(--v-bgColor2-base) !important;
  }
}
::v-deep ::-webkit-scrollbar {
  width: 5px;
}
::v-deep ::-webkit-scrollbar-thumb {
  background-color: var(--v-bgColor2-base);
  border-radius: 5px;
}
</style>
