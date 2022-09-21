<template>
  <div>
    <h1 class="mb-5">Schedule</h1>
    <section class="page-content">
      <div class="calendar-container">
        <v-calendar
          ref="calendar"
          locale="fr"
          type="week"
          first-time="07:30"
          interval-count="20"
          disable-page-swipe
          :value="start"
          :class="{ hideDays: !$vuetify.breakpoint.mdAndUp }"
          :short-weekdays="!$vuetify.breakpoint.mdAndUp"
          :events="events"
          :weekdays="[1, 2, 3, 4, 5]"
          :interval-minutes="60"
          :short-intervals="false"
          @click:event="showEvent"
        >
        </v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card min-width="350px" flat>
            <v-toolbar color="bgColor2" :elevation="0" outlined>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-btn icon :href="selectedEvent.link" target="_blank">
                <info-icon></info-icon>
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn
                icon
                @click="
                  deleteEvent(selectedEvent);
                  selectedOpen = false;
                "
              >
                <trash-icon></trash-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
      <Autocomplete @addEvent="addEvent($event)"></Autocomplete>
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
} from "date-fns";
import TrashIcon from "@/icons/Trash";
import InfoIcon from "@/icons/info";
import Autocomplete from "@/components/autocomplete";

export default {
  name: "schedule-page",
  components: { InfoIcon, TrashIcon, Autocomplete },
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
      colors: [
        "#2196f3",
        "#3F51B5",
        "#673AB7",
        "#00BCD4",
        "#4CAF50",
        "#FF9800",
        "#757575",
      ],
      descriptionLimit: 60,
      start: monday,
      events: [],
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
    };
  },
  methods: {
    console(toPrint) {
      console.log(toPrint);
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    creatSchedule(date, hours) {
      return date.toISOString().split("T")[0] + " " + hours;
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
    createEvent(event, group, color) {
      return {
        name: event.acronym,
        isLab: event.isLab,
        link: event.link,
        color,
        start: this.creatSchedule(
          this.stringToDay(group.day),
          group.time.split(" - ")[0].split("h").join(":")
        ),
        end: this.creatSchedule(
          this.stringToDay(group.day),
          group.time.split(" - ")[1].split("h").join(":")
        ),
      };
    },
    stringToDay(string) {
      switch (string) {
        case "Lundi":
          return this.weekDays.monday;
        case "Mardi":
          return this.weekDays.tuesday;
        case "Mercredi":
          return this.weekDays.wednesday;
        case "Jeudi":
          return this.weekDays.thursday;
        case "Vendredi":
          return this.weekDays.friday;
        default:
          return this.weekDays.monday;
      }
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
  display: flex;
  gap: 32px;

  .calendar-container {
    width: 70%;
    max-height: 70vh;
  }
}

::v-deep ::-webkit-scrollbar {
  width: 5px;
}
::v-deep ::-webkit-scrollbar-thumb {
  background-color: var(--v-bgColor-darken2);
  border-radius: 5px;
}

::v-deep .v-calendar {
  .v-calendar-daily__interval-text {
    font-size: 16px !important;
  }
  //.v-event-timed {
  //  border-radius: 0 10px 10px 0;
  //  border: none !important;
  //
  //  div {
  //    height: 100%;
  //    padding: 8px !important;
  //    border-left: 3px solid var(--v-primary-darken2) !important;
  //
  //    .v-event-summary {
  //      height: 100%;
  //      display: flex;
  //      flex-wrap: wrap;
  //      flex-direction: column;
  //    }
  //  }
  //}
  .v-calendar-daily_head-weekday {
    font-size: 16px;
  }
  .v-calendar-daily__body {
    background-color: var(--v-bgColor2-base);
  }
  .v-calendar-daily__head {
    background-color: var(--v-bgColor2-lighten1);

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

  //.v-event-summary {
  //  color: var(--v-primary-darken4);
  //}

  &.hideDays {
    .v-calendar-daily_head-day-label {
      display: none !important;
    }
  }
}
</style>
