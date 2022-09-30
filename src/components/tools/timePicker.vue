<template>
  <v-menu
    ref="picker"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="time"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="time"
        label="Picker in menu"
        prepend-icon="mdi-clock-time-four-outline"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker
      v-if="menu"
      v-model="time"
      full-width
      ampm-in-title
      @click:minute="$refs.picker.save(time)"
    ></v-time-picker>
  </v-menu>
</template>

<script>
export default {
  name: "time-picker",
  data: () => ({
    time: null,
    menu: false,
  }),
};
</script>

<style scoped></style>
