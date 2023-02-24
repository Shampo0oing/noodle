<template>
  <div>
    <section class="page-content d-flex flex-column flex-lg-row">
      <div class="calendar-container">
        <v-calendar
            ref="calendar"
            locale="fr"
            :type="dayFormat ? 'day' : 'week'"
            :class="{ 'compact' : dayFormat}"
            first-time="07:30"
            interval-count="20"
            :value="today"
            :short-weekdays="!$vuetify.breakpoint.mdAndUp"
            :events="events"
            :event-ripple="false"
            :weekdays="[1, 2, 3, 4, 5]"
            :interval-minutes="60"
            :short-intervals="false"
            @click:event="showEventMenu($refs.contextMenu, $event)"
            @contextmenu:event="showEventMenu($refs.contextMenu, $event)"
        >
          <template v-slot:day-body="{ date, week }">
            <div
                class="v-current-time"
                :class="{ first: date === week[0].date }"
                :style="{ top: nowY }"
            ></div>
          </template>
          <template v-slot:event="{ event, eventParsed }">
            <article class="d-flex flex-column pa-4 fill-height">
              <div class="font-weight-medium text-ellipsis">{{ event.name }}</div>
              <div class="mt-auto text-ellipsis">
                {{ eventParsed.start.time }} - {{ eventParsed.end.time }}
              </div>
            </article>
          </template>
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
} from "date-fns";
import GroupDialog from "@/components/groupDialog";
import ContextMenu from "@/components/tools/contextMenu";
import EventEditDialog from "@/components/schedule/eventEditDialog";

export default {
  name: "schedule-page",
  props: ["bus", "dayFormat"],
  components: {
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
      frToEngDays: {
        Lundi: monday,
        Mardi: tuesday,
        Mercredi: wednesday,
        Jeudi: thursday,
        Vendredi: friday,
      },
      colors: ["#ffe2e2", "#fff9e2", "#e2f2ff", "#edffe2", "#f3e2ff"],
      start: monday,
      today: new Date(),
      events: [],
      addCourses: false,
      selectedEvent: null,
      selectedElement: null,
      eventEditDialog: false,
      dialog: false,
      menu2: false,
      ready: false,
    };
  },
  methods: {
    console(toPrint) {
      console.log(toPrint);
    },
    showEventMenu(context, { nativeEvent, event }) {
      context.show(nativeEvent, [
        {
          icon: ["far", "pen-to-square"],
          text: "Modifier",
          click: () => {
            this.selectedEvent = event;
            this.eventEditDialog = true;
          },
        },
        {
          icon: ["fas", "list-ol"],
          text: "Changer de groupe",
          click: () => alert("Option2"),
        },
        {
          icon: ["far", "trash-can"],
          text: "Retirer ce cours",
          click: () => this.deleteEvent(event),
        },
        {
          icon: ["far", "circle-question"],
          text: "Voir la page du cours",
          click: () => alert("Option4"),
        },
      ]);
    },
    formatDate(date, hours) {
      return date.toLocaleString().split(" ")[0] + " " + hours;
    },
    createEvent(event, group, color) {
      let labWeek = group.time.split(" (")[1]
          ? "(" + group.time.split(" (")[1]
          : null;
      const time = labWeek ? group.time.split(" (")[0] : group.time;
      return {
        name: event.acronym + (group.isLab ? " (LAB)" : ""),
        isLab: group.isLab,
        link: event.link,
        color,
        start: this.formatDate(
            this.frToEngDays[group.day],
            time.split(" - ")[0].split("h").join(":")
        ),
        end: this.formatDate(
            this.frToEngDays[group.day],
            time.split(" - ")[1].split("h").join(":")
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
      this.selectedEvent.start = this.formatDate(model.day, model.start);
      this.selectedEvent.end = this.formatDate(model.day, model.end);
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    rndElement(arr) {
      return arr[this.rnd(0, arr.length - 1)];
    },
    updateTime () {
      setInterval(() => this.cal.updateTimes(), 60 * 1000)
    },
  },
  mounted() {
    this.ready = true;
    this.cal.checkChange();
    this.bus?.$on("addEvent", this.addEvent);
    this.events = [
      {
        color: "#ffb3b3",
        start: this.formatDate(new Date(), '10:45'),
        end: this.formatDate(new Date(), '13:30'),
        isLab: undefined,
        link: "https://www.polymtl.ca/programmes/cours/probabilites-et-statistique",
        name: "MTH0104",
      },
      {
        color: "#fff0b3",
        start: this.formatDate(new Date(), '15:45'),
        end: this.formatDate(new Date(), '18:30'),
        isLab: undefined,
        link: "https://www.polymtl.ca/programmes/cours/probabilites-et-statistique",
        name: "MTH0104",
      },
    ];
    this.updateTime();
  },
  computed: {
    cal () {
      return this.ready ? this.$refs.calendar : null
    },
    nowY () {
      return this.cal ? this.cal.timeToY(this.cal.times.now) + 'px' : '-10px'
    },
  }
};
</script>

<style scoped lang="scss">
.v-current-time {
  height: 2px;
  background-color: var(--v-primary-base);
  position: absolute;
  left: -1px;
  right: 0;
  pointer-events: none;

  &.first::before {
    content: '';
    position: absolute;
    background-color: var(--v-primary-base);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: -5px;
    margin-left: -6.5px;
  }
}
.page-content {
  gap: 32px;

  .calendar-container {
    width: 100%;
    overflow-x: auto;
  }
}

::v-deep ::-webkit-scrollbar {
  width: 5px;
}
::v-deep ::-webkit-scrollbar-thumb {
  background-color: var(--v-border-darken2);
  //border: 1px solid grey;
  border-radius: 5px;
}

::v-deep .v-calendar {
  border-radius: 1.5rem 1.5rem 0 0;

  &,
  * {
    border-color: var(--v-border-base) !important;
  }

  .v-calendar-daily__intervals-body {
    position: sticky;
    left: 0;
    top: 0;
  }

  .v-calendar-daily__interval-text {
    font-size: 1rem !important;
    top: -0.6rem;
  }

  .v-calendar-daily__scroll-area {
    max-height: 70vh;
    overflow-y: auto;

    .v-calendar-daily__pane {
      overflow: hidden;
    }
  }

  .v-calendar-daily__body {
    background-color: var(--v-bgColor1-base);
  }

  .v-calendar-daily__head {
    background-color: #f5f7f9;
    border-bottom: 1px solid rgba(1, 1, 1, 0.08) !important;
    margin-right: 0 !important;
    padding-right: 5px;

    * {
      border: none !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    .v-calendar-daily_head-weekday {
      font-size: 1rem;
      color: black !important;
      font-weight: 400;
    }

    .v-calendar-daily_head-day {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      align-items: center;
      height: 4rem;

      .v-calendar-daily_head-day-label {
        display: flex;
        height: 100%;
        align-items: center;
        cursor: initial;
      }

      .v-btn {
        font-size: 1rem;
        font-weight: 400;
        letter-spacing: 0;
        pointer-events: none;
        width: fit-content;
        height: fit-content;
      }
    }
  }

  &.hideDays {
    .v-calendar-daily_head-day-label {
      display: none !important;
    }
  }

  .v-event-timed {
    border: 1px solid var(--v-border-base) !important;
    //box-shadow: rgb(0 0 0 / 14%) 0 0 3px;
    border-radius: 1.25rem;
    font-size: 1rem;
    color: black !important;
  }

  &.compact {
    border: none;

    .v-calendar-daily__intervals-head {
      display: none;
    }
    .v-calendar-daily__head {
      background-color: initial;
      border: none !important;
    }
    .v-calendar-daily_head-day {
      height: fit-content;
      padding: 1rem !important;
      align-items: baseline;
      justify-content: start;

      .v-calendar-daily_head-weekday {
        font-size: 1.17rem;
        font-weight: 600;
        text-transform: capitalize;
      }
      .v-calendar-daily_head-day-label > .v-btn {
        width: fit-content;
        height: 100%;
        font-size: 1.17rem;
        font-weight: 600;
        background-color: transparent;
      }
    }
    .v-calendar-daily__body {
      background-color: initial;

      .v-calendar-daily__intervals-body {
        border: none !important;
      }
    }
  }
}
</style>
