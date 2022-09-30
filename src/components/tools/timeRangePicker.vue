<template>
  <div class="d-flex">
    <v-menu
      ref="picker"
      v-model="menu1"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value="startTime"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="startTime"
          label="Début"
          prepend-icon="mdi-clock-time-four-outline"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-time-picker
        v-if="menu1"
        v-model="startTime"
        full-width
        ampm-in-title
        @click:minute="$refs.picker.save(startTime)"
      ></v-time-picker>
    </v-menu>
    <v-menu
      ref="picker"
      v-model="menu2"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value="endTime"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="endTime"
          label="Fin"
          prepend-icon="mdi-clock-time-four-outline"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-time-picker
        v-if="menu2"
        v-model="endTime"
        full-width
        ampm-in-title
        @click:minute="$refs.picker.save(endTime)"
      ></v-time-picker>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'time-picker',
  props: ['start', 'end'],
  data: () => ({
    startTime: null,
    endTime: null,
    menu1: false,
    menu2: false,
  }),
  methods: {
    console(msg = 'console :') {
      console.log(msg);
      console.log(this.endTime);
    },
  },
  mounted() {
    this.startTime = this.start.split(' ')[1];
    this.endTime = this.end.split(' ')[1];
  },
  watch: {
    startTime(newTime) {
      if (newTime !== this.start.split(' ')[1]) {
        this.$emit('onStartTimeChange', newTime);
      }
    },
    endTime(newTime) {
      if (newTime !== this.end.split(' ')[1]) {
        this.$emit('onEndTimeChange', newTime);
      }
    },
  },
};
</script>

<style scoped></style>
