<template>
  <icon-lottie :json="json" />
</template>

<script>
import IconLottie from './Lottie'
import json from '@/assets/icons/calendar.json'

export default {
  name: "calendar-icon",
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