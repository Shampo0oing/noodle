<template>
  <div class="d-flex justify-center">
    <v-menu bottom min-width="200px" rounded offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon x-large v-on="on">
          <v-avatar color="red" size="40">
            <span class="white--text text-h5">{{ user.initials }}</span>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <v-avatar color="red">
              <span class="white--text text-h5">{{ user.initials }}</span>
            </v-avatar>
            <h3>{{ user.fullName }}</h3>
            <p class="text-caption mt-1">
              {{ user.email }}
            </p>
            <v-divider class="my-3"></v-divider>
            <v-btn depressed rounded text @click="edit">
              Edité le Compte
            </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn depressed rounded text @click="disc"> Se Déconnecter </v-btn>
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "avatar-sidebar",
  data: () => ({
    user: {
      initials: Vue.prototype.$userInfo.username[0],
      fullName: Vue.prototype.$userInfo.username,
      email: Vue.prototype.$userInfo.email,
      picture: Vue.prototype.$userInfo.imageUrl,
    },
  }),
  methods: {
    disc() {},
    edit() {
      this.$router.push("user");
    },
  },
};
</script>

<style scoped></style>
