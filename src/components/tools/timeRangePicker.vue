<template>
  <div class="d-flex gap-1">
    <v-menu
      ref="picker"
      v-model="menu1"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value="model.start"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          dense
          outlined
          v-model="model.start"
          class="shrink"
          :prepend-icon="
            !$vuetify.breakpoint.mdAndUp ? 'mdi-clock-time-four-outline' : null
          "
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-time-picker
        v-if="menu1"
        v-model="model.start"
        full-width
        ampm-in-title
        @click:minute="$refs.picker.save(model.start)"
      ></v-time-picker>
    </v-menu>
    <v-menu
      ref="picker"
      v-model="menu2"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value="model.end"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          dense
          outlined
          v-model="model.end"
          prepend-icon="mdi-minus"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-time-picker
        v-if="menu2"
        v-model="model.end"
        full-width
        ampm-in-title
        @click:minute="$refs.picker.save(model.end)"
      ></v-time-picker>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "time-picker",
  props: ["value"],
  data: () => ({
    menu1: false,
    menu2: false,
  }),
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      },
    },
  },
  methods: {
    console(msg = "console :") {
      console.log(msg);
    },
  },
};
</script>

<style scoped></style>
