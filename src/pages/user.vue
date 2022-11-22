<template>
  <div>
    <div class="text-center">
          <v-card
              elevation="8"
              :loading="dialog || dialog2"
              class="mx-auto my-12"
              max-width="300"
          >
            <template slot="progress">
              <v-progress-linear
                  color="#89AEF1"
                  height="10"
                  indeterminate
              ></v-progress-linear>
            </template>
            <v-img
                height="250"
                src="https://www.tituslearning.com/wp-content/uploads/2022/08/Moodle.jpeg"
            ></v-img>
            <v-card-title color: >Connecter votre Moodle</v-card-title>
            <v-card-text>
              <div>Accéder à vos examen, vos quiz , votre calendrier tout à partir de noodle!</div>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
            <v-spacer></v-spacer>
            <v-card-actions class="justify-center">
              <template>
                <v-dialog  v-if="!linked" v-model="dialog" content-class="moodle-pop" width="300">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        v-if="!linked"
                        class="moodle-button"
                        v-bind="attrs"
                        v-on="on"
                        rounded
                    >Link Moodle</v-btn
                    >

                  </template>
                  <v-card>
                    <v-card-title class="text-h5" style="color: #b8b5ff">
                      Connection Moodle
                    </v-card-title>
                    <v-card-text> Connecter vous avec votre compte moodle! </v-card-text>
                    <v-col class="inputs">
                      <v-text-field
                          label="Username"
                          v-model="username"
                          hide-details="auto"
                          :rules="rules"
                          color="#b8b5ff"
                      ></v-text-field>
                      <v-text-field
                          label="Password"
                          @keyup.native.enter="sendForm"
                          v-model="password"
                          hide-details="auto"
                          type="password"
                          :rules="rules"
                          color="#b8b5ff"
                      ></v-text-field>
                      <span
                          v-if="wrong"
                          class="wrongPass"
                          style="color: red; font-size: 10pt"
                      >
        Votre mot de passe/username est faux</span
                      >
                    </v-col>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-btn
                          text
                          @click="sendForm"
                          :loading="loading"
                          class="ma-1"
                          plain
                          style="height: 30px; border-radius: 8px; color: #b8b5ff"
                      >se connecter</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-else v-model="dialog2" content-class="moodle-unlink" width="300">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        v-if="linked"
                        class="moodle-unlinkBtn"
                        v-bind="attrs"
                        v-on="on"
                        rounded
                    ><v-icon x-small> mdi-minus-circle</v-icon> unlink Moodle</v-btn
                    >

                  </template>
                  <v-card>
                    <v-card-title class="text-h5" style="color: #b8b5ff">
                      Unlink Moodle
                    </v-card-title>
                    <v-card-text> Êtes-Vous Sûr de vouloir vous déconnecter de moodle ? </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-btn
                          text
                          @click="unlink"
                          :loading="loading"
                          class="ma-1"
                          plain
                          style="height: 30px; border-radius: 8px; color: #b8b5ff"
                      >Oui</v-btn
                      >
                      <v-btn
                          text
                          @click="dialog2=false"
                          :loading="loading"
                          class="ma-1"
                          plain
                          style="height: 30px; border-radius: 8px; color: #b8b5ff"
                      >Anuller</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
            </v-card-actions>
          </v-card>
          <pfp-change></pfp-change>
    </div>
  </div>
</template>

<script>

import Vue from "vue";
import PfpChange from "@/components/templates/pfpChange";

export default {
  name: "user-page",
  components: { PfpChange },
  data() {
    return {
      dialog: false,
      username: null,
      password: null,
      wrong: false,
      loading: false,
      linked: Vue.prototype.$userInfo.linked_moodle,
      dialog2: false,
      rules: [(value) => !!value || "Required."],
    };
  },
  methods: {
    sendForm() {
      this.loading = true;
      console.log(this.linked)
      if (this.username != null || this.password != null) {
        fetch("http://localhost:8080/moodle/moodle-link", {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
            noodleUser: Vue.prototype.$userInfo.username,
          }),
        })
            .then((res) => res.json())

            .then((res) => {
              if (res.status === 200) {
                this.loading = false;
                this.linked = true;
                this.dialog = false;
                Vue.prototype.$userInfo.linked_moodle = false;
              } else {
                this.loading = false;
                this.wrong = true;
                //redirect here
              }
            });
      } else {
        this.loading = false;
      }
    },
    unlink() {
      fetch("http://localhost:8080/moodle/moodle-unlink", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          noodleUser: Vue.prototype.$userInfo.username,
        }),
      })
          .then((res) => res.json())

          .then((res) => {
            if (res.status === 200) {
              this.loading = false;
              this.linked = false;
              Vue.prototype.$userInfo.linked_moodle = false;
              this.dialog2 = false;
            } else {
              this.loading = false;

              //redirect here
            }
          })

    },
  },
  // beforeCreate: function() {
  //   console.log(this.$userInfo.linked_moodle)
  //   this.linked = this.$userInfo.linked_moodle;
  // }
};
</script>

<style scoped lang="scss">
.moodle-button {
  font-size: 12px;
  text-transform: capitalize;
  width: 100px;
  color: white;
  background-color: cornflowerblue !important;
}

.moodle-pop {
  .wrongPass {
    color: red !important;
    font-size: 12px !important;
    font-weight: 500 !important;
  }
}
.moodle-unlinkBtn{
  font-size: 12px;
  background-color: indianred !important;
  color: white;
  text-transform: capitalize;
}
</style>
