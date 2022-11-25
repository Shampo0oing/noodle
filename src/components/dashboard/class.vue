<template>
  <main class="main">
    <button class="rectangle" @click="test">
      <div class="texts">
        <span class="classTitle">Mth1004</span>
        <section class="classInfo">
          <span class="classFullName"> calcul 1</span>
          <span class="classGroup"> /grp 01</span>
        </section>
      </div>
      <div class="IconRectangle">
        <div class="w-full d-flex justify-center align-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            color="#FFEFE2"
            filter="brightness(40%)"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M112 184a8 8 0 0 1-8 8H80v24a8 8 0 0 1-16 0v-24H40a8 8 0 0 1 0-16h24v-24a8 8 0 0 1 16 0v24h24a8 8 0 0 1 8 8Zm-8-120H40a8 8 0 0 0 0 16h64a8 8 0 0 0 0-16Zm48 112.1h64a8 8 0 0 0 0-16h-64a8 8 0 0 0 0 16Zm64 15.8h-64a8 8 0 0 0 0 16h64a8 8 0 0 0 0-16Zm-61.7-90.2a8.2 8.2 0 0 0 11.4 0L184 83.3l18.3 18.4a8.2 8.2 0 0 0 11.4 0a8.1 8.1 0 0 0 0-11.4L195.3 72l18.4-18.3a8.1 8.1 0 0 0-11.4-11.4L184 60.7l-18.3-18.4a8.1 8.1 0 0 0-11.4 11.4L172.7 72l-18.4 18.3a8.1 8.1 0 0 0 0 11.4Z"
            />
          </svg>
        </div>
      </div>
    </button>
  </main>
</template>

<script>
export default {
  name: "class_dashboard",
  data() {
    return {
      colors: ["#FFEFE2", "#FCF3FD", "#F7FAE9"],
      icons: ["music"],
    };
  },
  methods: {
    test() {
      fetch("http://localhost:8080/moodle/moodle-signin", {
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

        .then((res) => {
          console.log(res);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  display: flex;
  font-family: Gilroy, serif;
}
.rectangle {
  width: 416px;
  height: 96px;
  border-radius: 16px;
  background-color: #ffefe2;
  display: flex;
  flex-direction: row;
  padding-left: 16px;
  padding-right: 16px;
  align-items: center;
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
  gap: 16px;
}
.classTitle {
  font-size: 16px;
  text-transform: capitalize;
  line-height: 25px;
  font-weight: 1000;
}
.classFullName {
  font-size: 13px;
  font-weight: 600;
}
.classGroup {
  font-size: 13px;
  font-weight: 400;
  opacity: 80%;
}
.IconRectangle {
  width: 64px;
  height: 64px;
  display: flex;

  border-radius: 16px;
  background-color: #ffefe2;
  filter: brightness(95%);
  margin-left: auto;
}
.icons {
  align-items: center;
}
</style>
