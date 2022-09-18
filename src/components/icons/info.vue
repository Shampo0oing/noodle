<template>
  <icon-lottie :json="json" />
</template>

<script>
import IconLottie from './Lottie'
import json from '@/assets/icons/info.json'

export default {
  name: "info-icon",
  components: {
    IconLottie,
  },

  data() {
    return {
      json,
    }
  },
}
</script>

<style scoped>

</style>