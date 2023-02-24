<template>
  <div class="calendar-container">
    <v-toolbar flat>
      <h3 v-if="$refs.calendar">
        {{ $refs.calendar.title | capitalize }}
      </h3>
      <v-spacer></v-spacer>
      <article class="d-flex gap-1 align-baseline">
        <v-btn icon small color="black" @click="prev">
          <v-icon small> mdi-chevron-left </v-icon>
        </v-btn>
        <v-btn icon small color="black" @click="next">
          <v-icon small> mdi-chevron-right </v-icon>
        </v-btn>
      </article>
    </v-toolbar>
    <v-calendar
      ref="calendar"
      v-model="focus"
      class="month-calendar"
      type="month"
      locale="fr"
      :show-month-on-first="false"
      :weekdays="weekdays"
      :events="events"
      :event-color="getEventColor"
      @click:event="showEvent"
      @click:more="more"
      @click:date="viewDay"
      @change="updateRange"
    >
      <template v-slot:day="{ date }">
        <v-menu
            v-if="hasEvents(date)"
            open-on-hover
            top
            offset-y
            :transition="false"
            :close-on-content-click="false"
            content-class="events-menu"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon
              class="day-hover-container"
            >
              <div class="events-dots-container">
                <div v-for="(event, index) in dateEvents[date].length > 3 ? 3 : dateEvents[date]"
                    :key="index"
                    class="event-dot"
                />
              </div>
            </v-btn>
          </template>
          <div class="menu-content" v-if="date">
            <section class="header">
              <span class="date-title"> {{ date | humanReadableDate }} </span>
              <div class="d-flex gap-1">
                <span class="secondary--text">{{ dateEvents[date].length }}</span>
                <span>évènements</span>
              </div>
            </section>

            <v-divider class="header-divider"></v-divider>

            <section class="events-list">
              <article
                  v-for="(event, index) in dateEvents[date]"
                  :key="index"
                  class="event-container"
              >
                <div class="left-divider secondary"></div>
                <div class="event-content">
                  <span class="time">{{ event.timeLimit }}</span>
                  <span>{{ event.name }}</span>
                </div>
                <div class="event-class-name"></div>
              </article>
            </section>
          </div>
        </v-menu>
      </template>
    </v-calendar>
  </div>
</template>

<script>
export default {
  name: "monthCalendar",
  data: () => ({
    focus: "",
    weekdays: [1, 2, 3, 4, 5, 6, 0],
    events: [],
    dateEvents: {},
    selectedEvent: {},
    selectedDay: false,
    selectedDate: null,
    selectedElement: null,
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    openMenu(event, date) {
      this.selectedDate = date;
      this.selectedElement = event.target;
      this.selectedElement.dispatchEvent(new MouseEvent("mouseover"));
    },
    console(msg) {
      console.log(msg);
    },
    closeMenu() {
      this.selectedDay = false;
    },
    more(event) {
      console.log(
        this.dateEvents[event.date].map((e) => {
          return e.start.toISOString().split("T")[0] + " " + e.name;
        })
      );
    },
    hasEvents(date) {
      return !!this.dateEvents[date];
    },
    viewDay() {
      // this.more(event);
      this.focus = "";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent(event) {
      console.log(event);
      // const open = () => {
      //   this.selectedEvent = event;
      //   this.selectedElement = nativeEvent.target;
      //   requestAnimationFrame(() =>
      //     requestAnimationFrame(() => (this.selectedOpen = true))
      //   );
      // };
      //
      // if (this.selectedOpen) {
      //   this.selectedOpen = false;
      //   requestAnimationFrame(() => requestAnimationFrame(() => open()));
      // } else {
      //   open();
      // }
      //
      // nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      const events = [];
      const dateEvents = {};

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T12:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 10);

      for (let i = 0; i < eventCount; i++) {
        const allDay = false;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = 2 * 900000;
        const second = new Date(first.getTime() + secondTimestamp);
        const dateString = this.dateToString(first);

        const e = {
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          timeLimit: second.toTimeString().split(" ")[0],
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        };
        dateEvents[dateString] = dateEvents[dateString] || [];
        dateEvents[dateString].push(e);
        events.push(e);
      }
      this.dateEvents = dateEvents;
      this.events = events;
      // this.events = [];
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    dateToString(date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
  },
};
</script>

<style scoped lang="scss">
.calendar-container {
  overflow: hidden;
}

::v-deep .month-calendar {
  border: none !important;
  padding-bottom: 1rem;
  height: 22rem;
  width: 22rem;

  .v-calendar-weekly__head {
    display: flex;
    align-items: center;
    height: 45px;

    :nth-child(n) {
      height: fit-content;
      border: none;
    }
  }
  .v-calendar-weekly__head-weekday {
    color: initial !important;
    background-color: initial !important;
  }

  .v-calendar-weekly__day {
    border: none !important;
    background-color: initial !important;
    position: relative;

    .v-event-more {
      display: none !important;
    }

    &.v-present {
      .v-calendar-weekly__day-label .v-btn {
        background-color: var(--v-primary-base) !important;
        color: white;
      }

      .event-dot {
        background-color: white;
      }

      .event-dot + .event-dot {
        outline: 1px solid var(--v-primary-base);
      }
    }

    &.v-outside .v-btn__content {
      color: rgba(1, 1, 1, 0.4);
    }
    .v-calendar-weekly__day-label {
      margin: 0 !important;

      .v-btn {
        font-size: .9rem;
        border-radius: 0.75rem !important;
        font-weight: 600;
      }
    }

  }
}

.day-hover-container {
  position: absolute;
  z-index: 2;
  inset: 0;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: transparent !important;
  border-radius: 0.5rem;
  width: 40px !important;
  height: 40px !important;
  cursor: pointer;

  .events-dots-container {
    display: flex;
    margin-top: 1.5rem;

    .event-dot {
      width: 6px;
      height: 6px;
      background-color: var(--v-secondary-base);
      border-radius: 50%;
    }

    .event-dot + .event-dot {
      outline: 1px solid white;
    }
  }
}

.events-menu {
  border: 1px solid var(--v-border-base);
  border-radius: 1rem !important;
  box-shadow: none;

  .menu-content {
    display: flex;
    padding: 1rem;
    flex-direction: column;
    background-color: var(--v-bgColor-base);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;

    font-weight: 500;
  }

  .header-divider {
    width: 100%;
    height: 2px;
    background-color: var(--v-border-base);
    margin: 0.25rem 0 1rem  0;
  }

  .date-title {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    background-color: var(--v-bgColor-base);
  }

  .events-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .event-container {
    display: flex;
    gap: 1rem;
    height: 50px;

    .left-divider {
      width: 3px;
      height: 100%;
      border-radius: 1rem;
    }

    .event-content {
      display: flex;
      flex-direction: column;

      .time {
        opacity: .8;
      }
    }
  }
}
</style>
