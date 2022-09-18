<template>
  <icon-lottie :json="json" />
</template>

<script>
import IconLottie from './Lottie'
import json from '@/assets/icons/edit.json'

export default {
  name: "edit-icon",
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