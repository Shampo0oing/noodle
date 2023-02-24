<template>
  <div class="dashboard">
    <section class="schedule-section">
      <Schedule :dayFormat="true"></Schedule>
    </section>
    <section class="calendar-section">
      <MonthCalendar></MonthCalendar>
    </section>
    <section class="class-section">
      <h3>Mes cours</h3>
      <div
          ref="classContainer"
          class="class-container"
          v-if="!loadingData"
      >
        <class v-for="(course, i) in courses" :key="i" :course="course" />
      </div>
    </section>
    <section class="moodle-profile-section">
      <article class="profilePicContainer">
        <div class="profilePic">
          <img
              :src="user.picture.split('f2?').join('f1?')"
              alt="moodle profile pic"
              class="w-full"
          />
        </div>
      </article>
      <article class="d-flex flex-column align-center">
        <h2 class="fullName">{{ user.name }}</h2>
        <span class="text--primary">anthelme.clisson@polymtl.ca</span>
      </article>
      <v-btn class="gotToMoodleBtn" color="primary">Aller vers Moodle</v-btn>
    </section>
  </div>
</template>

<script>
import Class from "@/components/dashboard/class";
import MonthCalendar from "@/components/dashboard/monthCalendar";
import Schedule from "@/components/schedule/schedule.vue";

export default {
  name: "dashboard-app",
  components: { MonthCalendar, Class, Schedule },
  data: () => ({
    loadingData: false,
    calendar: [],
    coursess: [],
    courses: [
      {
        symbol: "RET",
        name: "GCH3995",
        fullName: "Projet de conception d'un syst. informatique",
      },
      {
        symbol: "PHS",
        name: "PHS4700",
        fullName: "Physique pour les applications multimédia",
      },
      {
        symbol: "INF",
        name: "INF8480",
        fullName: "Systèmes répartis et infonuagique",
      },
      {
        symbol: "MTH",
        name: "MTH1101",
        fullName: "Communication écrite et orale",
      },
      {
        symbol: "CHE",
        name: "CHE1101",
        fullName: "Communication écrite et orale",
      },
    ],
    tasks: [],
    user: {
      id: null,
      name: "Anthelme Clisson",
      picture:
        "https://moodle.polymtl.ca/pluginfile.php/606443/user/icon/boost/f1?rev=20299970",
    },
  }),
  methods: {
    nextClass() {
      // scroll programmatically on Y axis in classContainer from child height
      const classContainer = this.$refs.classContainer;
      const childHeight = classContainer.scrollHeight / classContainer.children.length;
      classContainer.scrollBy({
        top: childHeight * 3,
        behavior: "smooth",
      });

    },
    getMoodleData() {
      return fetch("http://localhost:8080/moodle/moodle-signin", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "",
        }),
      })
        .then((res) => res.json())
        .catch((err) => console.error("Failed to fetch Moodle data", err));
    },
    parseCourses(courses) {
      return courses.map((c) => ({
        symbol: c.name.split(" - ")[0].replace(/\d/g, ""),
        name: c.name.split(" - ")[0],
        fullName: c.name.split(" - ")[1],
      }));
    },
  },
  // beforeMount() {
  //   this.loadingData = true;
  //   this.getMoodleData()
  //     .then((data) => {
  //       try {
  //         const { calendar, courses, tasks, user } = data?.moodle;
  //         this.calendar = calendar.map((val) => ({
  //           key: val.at(-1).date,
  //           value: val.slice(0, -1),
  //         }));
  //         this.courses = this.parseCourses(courses);
  //         this.tasks = tasks;
  //         this.user = user;
  //         console.log(this.tasks);
  //       } catch (e) {
  //         console.error("Failed to parse Moodle data", e);
  //       }
  //     })
  //     .catch((err) => console.error(err))
  //     .finally(() => (this.loadingData = false));
  // },
};
</script>

<style scoped lang="scss">
.dashboard {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  gap: 2rem;

  h3 {
    padding: 1rem;
  }

  .schedule-section {
    grid-area: schedule;
    width: 400px;
  }

  .calendar-section {
    grid-area: calendar;
  }

  .class-section {
    grid-area: classes;
    height: 100%;
    display: flex;
    flex-direction: column;

    .class-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      height: 100%;
      position: relative;
      padding: 0.5rem;
      overflow-y: auto;
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

  .moodle-profile-section {
    width: 300px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    background-color: rgba(1, 1, 1, 0.03);
    padding: 2rem;
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;

    .profilePicContainer {
      padding: 8px;
      border: 1px solid rgba(1, 1, 1, 0.4);
      border-radius: 2rem;

      .profilePic {
        width: 100px;
        height: 100px;
        border-radius: calc(2rem - 8px);
        overflow: hidden;
        object-fit: contain;
      }
    }

    .fullName {
      font-size: 22px;
      font-weight: bold;
    }

    .gotToMoodleBtn {
      border-radius: 8px;
      text-transform: initial;
    }
  }
}
</style>
