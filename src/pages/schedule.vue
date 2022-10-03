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
    <section class="page-content d-flex flex-column flex-lg-row">
      <div class="calendar-container">
        <v-calendar
          ref="calendar"
          locale="fr"
          :type="$vuetify.breakpoint.xsOnly ? 'day' : 'week'"
          first-time="07:30"
          interval-count="20"
          :value="$vuetify.breakpoint.xsOnly ? today : start"
          :short-weekdays="!$vuetify.breakpoint.mdAndUp"
          :events="events"
          :event-ripple="false"
          :weekdays="$vuetify.breakpoint.mdAndUp ? [1, 2, 3, 4, 5] : [1, 2, 3]"
          :interval-minutes="60"
          :short-intervals="false"
          @click:event="showEventMenu($refs.contextMenu, $event)"
          @contextmenu:event="showEventMenu($refs.contextMenu, $event)"
        >
        </v-calendar>
        <ContextMenu ref="contextMenu"></ContextMenu>
        <EventEditDialog
          v-model="eventEditDialog"
          :event="selectedEvent"
          :daysList="frToEngDays"
          @onSave="saveEvent($event)"
        ></EventEditDialog>
        <GroupDialog
          v-if="selectedEvent"
          v-model="selectedEvent.model"
          @onAddEvent="addEvent($event)"
        ></GroupDialog>
      </div>
    </section>
  </div>
</template>

<script>
import {
  startOfWeek,
  nextMonday,
  nextTuesday,
  nextWednesday,
  nextThursday,
  nextFriday,
} from 'date-fns';
import Autocomplete from '@/components/autocomplete';
import GroupDialog from '@/components/groupDialog';
import ContextMenu from '@/components/tools/contextMenu';
import HeaderBar from '@/components/templates/header';
import EventEditDialog from '@/components/schedule/eventEditDialog';

export default {
  name: 'schedule-page',
  components: {
    HeaderBar,
    Autocomplete,
    ContextMenu,
    GroupDialog,
    EventEditDialog,
  },
  data: () => {
    const sunday = startOfWeek(new Date());
    const monday = nextMonday(sunday);
    const tuesday = nextTuesday(sunday);
    const wednesday = nextWednesday(sunday);
    const thursday = nextThursday(sunday);
    const friday = nextFriday(sunday);
    return {
      weekDays: {
        sunday,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
      },
      frToEngDays: {
        Lundi: monday,
        Mardi: tuesday,
        Mercredi: wednesday,
        Jeudi: thursday,
        Vendredi: friday,
      },
      colors: [
        '#2196f3',
        '#3F51B5',
        '#673AB7',
        '#00BCD4',
        '#48814a',
        '#8c683d',
        '#757575',
      ],
      start: monday,
      today: new Date(),
      events: [
        {
          color: '#234d98',
          start: '2022-10-03 12:45',
          end: '2022-10-03 14:45',
          isLab: undefined,
          link: 'https://www.polymtl.ca/programmes/cours/probabilites-et-statistique',
          name: 'MTH0104',
        },
        {
          color: '#458fb5',
          start: '2022-10-05 12:45',
          end: '2022-10-05 14:45',
          isLab: undefined,
          link: 'https://www.polymtl.ca/programmes/cours/probabilites-et-statistique',
          name: 'MTH0104',
        },
      ],
      addCourses: false,
      selectedEvent: null,
      selectedElement: null,
      eventEditDialog: false,
      dialog: false,
      menu2: false,
    };
  },
  methods: {
    console(toPrint) {
      console.log(toPrint);
    },
    showEventMenu(context, { nativeEvent, event }) {
      context.show(nativeEvent, [
        {
          icon: ['far', 'pen-to-square'],
          text: 'Modifier',
          click: () => {
            this.selectedEvent = event;
            this.eventEditDialog = true;
          },
        },
        {
          icon: ['fas', 'list-ol'],
          text: 'Changer de groupe',
          click: () => alert('Option2'),
        },
        {
          icon: ['far', 'trash-can'],
          text: 'Retirer ce cours',
          click: () => this.deleteEvent(event),
        },
        {
          icon: ['far', 'circle-question'],
          text: 'Voir la page du cours',
          click: () => alert('Option4'),
        },
      ]);
    },
    formatDate(date, hours) {
      return date.toISOString().split('T')[0] + ' ' + hours;
    },
    createEvent(event, group, color) {
      let labWeek = group.time.split(' (')[1]
        ? '(' + group.time.split(' (')[1]
        : null;
      const time = labWeek ? group.time.split(' (')[0] : group.time;
      return {
        name: event.acronym + (group.isLab ? ' (LAB)' : ''),
        isLab: group.isLab,
        link: event.link,
        color,
        start: this.formatDate(
          this.frToEngDays[group.day],
          time.split(' - ')[0].split('h').join(':')
        ),
        end: this.formatDate(
          this.frToEngDays[group.day],
          time.split(' - ')[1].split('h').join(':')
        ),
        model: event,
      };
    },
    addEvent(event) {
      const color = this.rndElement(this.colors);
      if (event.class) {
        this.events.push(this.createEvent(event, event.class, color));
      }

      if (event.laboratory) {
        this.events.push(this.createEvent(event, event.laboratory, color));
      }
    },
    deleteEvent(event) {
      this.events = this.events.filter((e) => e.name !== event.name);
    },
    saveEvent(model) {
      this.selectedEvent.name = model.name;
      this.selectedEvent.start = model.day + ' ' + model.start;
      this.selectedEvent.end = model.day + ' ' + model.end;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    rndElement(arr) {
      return arr[this.rnd(0, arr.length - 1)];
    },
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
};
</script>

<style scoped lang="scss">
.page-content {
  gap: 32px;

  .calendar-container {
    width: 100%;
  }
}

::v-deep ::-webkit-scrollbar {
  width: 5px;
}
::v-deep ::-webkit-scrollbar-thumb {
  background-color: var(--v-border-base);
  //border: 1px solid grey;
  border-radius: 5px;
}

::v-deep .v-calendar {
  &,
  * {
    border-color: var(--v-border-base) !important;
  }

  .v-calendar-daily__interval-text {
    font-size: 16px !important;
  }
  .v-calendar-daily__scroll-area {
    max-height: 70vh;
    overflow-y: auto;

    .v-calendar-daily__pane {
      overflow: hidden;
    }
  }
  .v-calendar-daily_head-weekday {
    font-size: 16px;
  }
  .v-calendar-daily__body {
    background-color: var(--v-bgColor1-base);
  }
  .v-calendar-daily__head {
    background-color: var(--v-bgColor2-base);
    margin-right: 0 !important;
    padding-right: 5px;

    .v-present {
      .v-btn__content {
        font-weight: 700;
        color: var(--v-primary-darken4);
      }
      .v-btn--has-bg {
        background-color: var(--v-primary-lighten1);
      }
    }
  }

  &.hideDays {
    .v-calendar-daily_head-day-label {
      display: none !important;
    }
  }
}
</style>
