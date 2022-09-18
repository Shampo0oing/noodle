<template>
  <icon-lottie :json="json" />
</template>

<script>
import IconLottie from './Lottie'
import json from '@/assets/icons/searchToX.json'

export default {
  name: "search-icon",
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