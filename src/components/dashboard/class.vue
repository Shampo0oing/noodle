<template>
  <main class="main">
    <article class="rectangle">
      <div class="items_rectangle">
        <div class="texts">
          <span class="classTitle">Mth1004</span>
          <section class="classInfo">
            <span class="classFullName"> calcul 1</span>
            <span class="classGroup"> /grp 01</span>
          </section>
        </div>
        <div class="IconRectangle"></div>
      </div>
    </article>
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
}
.items_rectangle {
  display: flex;
  flex-direction: row;

  padding-left: 16px;
  padding-top: 12px;
  float: left;
}
.texts {
  padding-top: 4px;
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
  width: 56px;
  height: 56px;
  padding-left: 5px;
  border-radius: 8px;
  background-color: #ffefe2;
  filter: brightness(95%);
}
</style>
