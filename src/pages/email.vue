<template>
  <div>
    <HeaderBar></HeaderBar>
    <iframe
      src="https://www.imp.polymtl.ca/imp/dynamic.php?page=mailbox#mbox:SU5CT1g"
      id="horde-website"
      title="Website Page Title"
      width="100%"
      height="700"
    ></iframe>
  </div>
</template>

<script>
import HeaderBar from "@/components/templates/header";
export default {
  name: "email-page",
  components: { HeaderBar },
  methods: {},
};
</script>

<style scoped lang="scss">
::v-deep .horde-website {
  .div.vpRow {
    height: 40px;
  }
}
</style>
