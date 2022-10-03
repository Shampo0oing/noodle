<template>
  <v-dialog persistent v-if="show && model?.name" v-model="show" width="500px">
    <v-card>
      <v-card-subtitle>
        <v-text-field
          prepend-icon="mdi-subtitles-outline"
          v-model="model.name"
        ></v-text-field>
      </v-card-subtitle>
      <v-card-subtitle>
        <v-select
          :items="Object.keys(daysList)"
          prepend-icon="mdi-calendar-today"
          label="Jours de la semaine"
        ></v-select>
      </v-card-subtitle>
      <v-card-subtitle>
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
import TimeRangePicker from '@/components/tools/timeRangePicker';
import { getDate } from 'date-fns';
export default {
  name: 'event-edit-dialog',
  props: ['value', 'event', 'daysList'],
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
      console.log(getDate(new Date(...msg.split('-'))));
    },
    save() {
      this.$emit('onSave', this.model);
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
        day: event.start.split(' ')[0],
        start: event.start.split(' ')[1],
        end: event.end.split(' ')[1],
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
        this.$emit('input', newEvent);
      },
    },
  },
};
</script>

<style scoped lang="scss"></style>
