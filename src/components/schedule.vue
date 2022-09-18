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
              <v-btn
                icon
                :href="`https://www.polymtl.ca/programmes/cours/recherche/${selectedEvent.name}?`"
                target="_blank"
              >
                <info-icon></info-icon>
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon>
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
      <article class="autocomplete-container">
        <v-card color="bgColor2">
          <v-card-title class="text-h5"> Ajouter un cours </v-card-title>
          <v-card-text class="mt-5">
            <v-autocomplete
              v-model="model"
              filled
              rounded
              :items="items"
              :loading="isLoading"
              :search-input.sync="search"
              hide-no-data
              hide-selected
              item-text="acronym"
              item-value="_id"
              placeholder="Start typing to Search"
              prepend-inner-icon="mdi-magnify"
              return-object
            ></v-autocomplete>
          </v-card-text>
          <v-divider></v-divider>
          <v-expand-transition>
            <v-list v-if="model">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title v-text="model.acronym"></v-list-item-title>
                  <v-list-item-subtitle
                    v-text="model.name"
                  ></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    icon
                    :href="model.link"
                    target="_blank"
                    color="primary"
                  >
                    <v-icon>mdi-web</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <section class="groups-container">
                <v-radio-group v-model="radio">
                  <v-list-item
                    v-for="(group, index) in model.groups"
                    :key="group._id"
                  >
                    <v-list-item-content class="group-content">
                      <div class="group-info-line">
                        <b>{{ group.nGroup }}</b>
                        <div>{{ group.day }}</div>
                        <div>{{ group.time }}</div>
                      </div>
                      <div class="group-info-line">
                        <div>{{ group.nClass }}</div>
                        <div>{{ group.teacher }}</div>
                      </div>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-radio :value="index"></v-radio>
                    </v-list-item-action>
                  </v-list-item>
                </v-radio-group>
              </section>
            </v-list>
          </v-expand-transition>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="!model" @click="model = null">
              Clear
              <v-icon right> mdi-close-circle </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </article>
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
import TrashIcon from "@/components/icons/Trash";
import InfoIcon from "@/components/icons/info";

export default {
  name: "schedule-page",
  components: { InfoIcon, TrashIcon },
  data: () => {
    const sunday = startOfWeek(new Date());
    const monday = nextMonday(sunday);
    const tuesday = nextTuesday(sunday);
    const wednesday = nextWednesday(sunday);
    const thursday = nextThursday(sunday);
    const friday = nextFriday(sunday);
    const creatSchedule = (date, hours) => {
      return date.toISOString().split("T")[0] + " " + hours;
    };
    return {
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      radio: [],
      model: null,
      search: null,
      start: monday,
      masks: {
        weekdays: "WWW",
      },
      events: [
        {
          name: "INF8480",
          start: creatSchedule(monday, "12:45"),
          end: creatSchedule(monday, "15:45"),
        },
        {
          name: `INF3995`,
          start: creatSchedule(tuesday, "9:30"),
          end: creatSchedule(tuesday, "12:30"),
        },
        {
          name: `INF8770`,
          start: creatSchedule(tuesday, "12:45"),
          end: creatSchedule(tuesday, "15:45"),
        },
        {
          name: "INF8480",
          start: creatSchedule(wednesday, "15:45"),
          end: creatSchedule(wednesday, "18:30"),
        },
        {
          name: "INF3995",
          start: creatSchedule(thursday, "9:30"),
          end: creatSchedule(thursday, "12:30"),
        },
        {
          name: "INF9770",
          start: creatSchedule(friday, "8:30"),
          end: creatSchedule(friday, "11:30"),
        },
        {
          name: "INF3995",
          start: creatSchedule(friday, "12:45"),
          end: creatSchedule(friday, "15:30"),
        },
        {
          name: "PHS4700",
          start: creatSchedule(friday, "15:45"),
          end: creatSchedule(friday, "17:30"),
        },
      ],
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
  },
  computed: {
    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map((key) => {
        return {
          key,
          value: this.model[key] || "n/a",
        };
      });
    },
    items() {
      return this.entries.map((c) => {
        return {
          ...c,
          groups: c.groups.map((g) => {
            const timeArray = g.time.split(", ");
            const startH = timeArray[0].split("h")[0];
            const startM = timeArray[0].split("h")[1];
            const endH = +startH + timeArray.length;
            console.log(timeArray[0] + " - " + endH + "h" + startM);
            return {
              ...g,
              time: timeArray[0] + " - " + endH + "h" + startM,
            };
          }),
        };
      });
    },
  },
  watch: {
    search() {
      // Items have already been loaded
      if (this.items?.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      fetch("http://localhost:3000/classes", { mode: "cors" })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          this.entries = res;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
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
  .autocomplete-container {
    width: 30%;
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
  .v-event-timed {
    border-radius: 0 10px 10px 0;
    background-color: var(--v-primary-lighten1) !important;
    border: none !important;

    div {
      height: 100%;
      padding: 8px !important;
      font-size: 16px;
      border-left: 3px solid var(--v-primary-darken2) !important;

      .v-event-summary {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
  }
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

  .v-event-summary {
    color: var(--v-primary-darken4);
  }

  &.hideDays {
    .v-calendar-daily_head-day-label {
      display: none !important;
    }
  }
}

.groups-container {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 300px;
  gap: 16px;

  .group-content {
    display: flex;
    flex-direction: column;
    border: 1px solid grey;
    border-radius: 5px;
    padding: 8px;
    margin-top: 8px;

    .group-info-line {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }
}
</style>
