<template>
  <v-dialog persistent v-model="dialogModify" width="500px">
    <v-card>
      <v-card-title>
        <v-text-field v-model="selectedEvent.name"></v-text-field>
      </v-card-title>
      <v-card-subtitle class="d-flex gap-2">
        <TimeRangePicker
          :start="selectedEvent.start"
          :end="selectedEvent.end"
        ></TimeRangePicker>
      </v-card-subtitle>
      <v-card-actions class="justify-end">
        <v-btn @click="dialogModify = false">Annuler</v-btn>
        <v-btn @click="dialogModify = false">Sauvegarder</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'event-edit-dialog',
  props: [''],
  data: () => {},
};
</script>

<style scoped lang="scss"></style>
