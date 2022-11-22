<template>
  <div>
    <header>
      <HeaderBar></HeaderBar>
    </header>
    <main>
      <section class="leftSection">
        <div class="classList">
          <class></class>
        </div>
      </section>
      <aside class="rightSection"></aside>
    </main>
  </div>
</template>

<script>
import HeaderBar from "@/components/templates/header";
import Class from "@/components/dashboard/class";
export default {
  name: "dashboard-app",
  components: { HeaderBar, Class },
  data() {
    return {};
  },
};
</script>

<style scoped></style>
