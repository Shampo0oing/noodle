<template>
  <div class="d-flex justify-center">
    <v-menu bottom min-width="200px" rounded offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon x-large v-on="on">
          <v-avatar size="40">
            <img :src="user.picture" alt="pfp" />
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <v-avatar>
              <img :src="user.picture" alt="pfp" />
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
      fullName: Vue.prototype.$userInfo.username,
      email: Vue.prototype.$userInfo.email,
      picture: Vue.prototype.$userInfo.imageUrl,
    },
  }),

  methods: {
    disc() {
      fetch("http://localhost:8080/users/disconnect", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: Vue.prototype.$userInfo.username,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            location.reload();
          }
        });
    },
    edit() {
      this.$router.push("user");
    },
  },
};
</script>

<style scoped></style>
