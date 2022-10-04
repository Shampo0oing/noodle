<template>
  <v-dialog persistent v-if="show && model?.name" v-model="show" width="500px">
    <v-card>
      <v-card-title>
        <v-text-field
          dense
          outlined
          prepend-icon="mdi-subtitles-outline"
          v-model="model.name"
        ></v-text-field>
      </v-card-title>
      <v-card-subtitle class="d-flex flex-column flex-md-row gap-2">
        <v-select
          dense
          outlined
          hide-details
          :items="Object.entries(daysList)"
          item-text="0"
          item-value="1"
          v-model="model.day"
          prepend-icon="mdi-calendar-today"
        ></v-select>
        <TimeRangePicker v-model="model"></TimeRangePicker>
      </v-card-subtitle>
      <v-card-actions class="justify-end">
        <v-btn @click="cancel()">Annuler</v-btn>
        <v-btn @click="save()">Sauvegarder</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import TimeRangePicker from "@/components/tools/timeRangePicker";
export default {
  name: "event-edit-dialog",
  props: ["value", "event", "daysList"],
  components: { TimeRangePicker },
  data: () => ({
    model: {
      name: null,
      day: null,
      start: null,
      end: null,
    },
  }),
  methods: {
    console(msg) {
      console.log(msg);
    },
    save() {
      this.$emit("onSave", this.model);
      this.close();
    },
    cancel() {
      this.reset(this.event);
      this.close();
    },
    close() {
      this.show = false;
    },
    reset(event) {
      this.model = {
        name: event.name,
        day: Object.entries(this.daysList)[
          new Date(event.start.split(" ")[0]).getDay()
        ][1],
        start: event.start.split(" ")[1],
        end: event.end.split(" ")[1],
      };
    },
  },
  watch: {
    event(newEvent) {
      this.reset(newEvent);
    },
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(newEvent) {
        this.$emit("input", newEvent);
      },
    },
  },
};
</script>

<style scoped lang="scss"></style>
