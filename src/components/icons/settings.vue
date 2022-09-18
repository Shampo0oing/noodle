<template>
  <icon-lottie :json="json" />
</template>

<script>
import IconLottie from './Lottie'
import json from '@/assets/icons/settings.json'

export default {
  name: "settings-icon",
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