<template>
  <div>
    <article
      ref="courseContainer"
      class="rectangle"
      :style="`background-color: ${
        subjects[course.symbol]?.color || defaultColor
      }`"
    >
      <div class="texts">
        <span class="classTitle">{{ course.name }}</span>
        <div class="classInfo">
          <span class="classFullName">{{ course.fullName }}</span>
          <!--          <span class="classGroup"> /grp 01</span>-->
        </div>
      </div>
      <div class="iconContainer" v-html="icon"></div>
    </article>
  </div>
</template>

<script>
export default {
  name: "class_dashboard",
  props: ["course"],
  data: () => ({
    icon: "",
    defaultColor: "#e3e2ff",
    subjects: {
      MTH: {
        color: "#ffe2e2",
      },
      INF: {
        color: "#fff9e2",
      },
      PHS: {
        color: "#e2f2ff",
      },
      CHE: {
        color: "#edffe2",
      },
      GCH: {
        color: "#f3e2ff",
      },
    },
    icons: ["music"],
  }),
  methods: {
    async getSvgContent(fileName) {
      try {
        let response = await fetch(`/assets/${fileName}`);
        let svgText = await response.text();
        // if default icon
        if (!svgText.startsWith("<svg")) {
          response = await fetch("/assets/defaultSubjectIcon.svg");
          svgText = await response.text();
        }
        // this.icon = await response.text();
        const splitSvg = svgText.split("<svg");
        this.icon =
          "<svg " + 'style="width: 2rem;height: 2rem;opacity:.6"' + splitSvg[1];
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    const fileName = this.course.symbol + ".svg"; // change this to the desired file name
    this.getSvgContent(fileName);
  },
  // beforeMount() {
  //   this.$refs.courseContainer.nativeElement.style.backgroundColor =
  //     this.subject[this.course.name].color;
  // },
};
</script>

<style scoped lang="scss">

.rectangle {
  height: 6rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  align-items: center;
  outline: 1px solid rgba(1, 1, 1, .05);
}
.rectangle:hover {
  transform: scale(1.01);
  cursor: pointer;
}
.texts {
  display: flex;
  width: fit-content;
  height: fit-content;
  flex-direction: column;
  text-align: justify;
  gap: 1rem;
}

.classTitle {
  font-weight: bold;
}

.classInfo {
  font-size: .8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 15rem;
}

.iconContainer {
  display: grid;
  place-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  background-color: rgba(0, 0, 0, 0.05);
  margin-left: auto;

  svg {
    width: 2rem;
    height: 2rem;
    opacity: 0.6;
  }
}

.subjectIcon {
  width: 2rem;
  height: 2rem;
  opacity: 0.6;
}

.icons {
  align-items: center;
}
</style>
