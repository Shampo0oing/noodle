<template>
  <div>
    <header>
      <HeaderBar></HeaderBar>
    </header>
    <main class="d-flex flex-column gap-3">
      <section class="d-flex flex-column gap-3">
        <div>
          <h3>Informations utilisateur</h3>
          <span>Gérer les informations du compte</span>
        </div>
        <v-row style="max-width: 1040px">
          <v-col>
            <v-row>
              <h4>Photo de profile</h4>
            </v-row>
            <v-row>
              <pfp-change></pfp-change>
            </v-row>
          </v-col>
          <v-col cols="12" md="10" lg="9">
            <v-row>
              <v-col cols="12" md="6">
                <v-row>
                  <h4>Nom d'utilisateur</h4>
                  <v-spacer></v-spacer>
                  <span class="text--secondary">Visible par les autres</span>
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="username"
                    label="Camillou"
                    single-line
                    hide-details
                    outlined
                    dense
                  ></v-text-field>
                </v-row>
              </v-col>
              <v-col>
                <v-row>
                  <h4>Prénom et nom</h4>
                  <v-spacer></v-spacer>
                  <span class="text--secondary">Nom et prénom complet</span>
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="username"
                    label="Camille Durant"
                    single-line
                    hide-details
                    outlined
                    dense
                  ></v-text-field>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-row>
                  <h4>Adresse courriel</h4>
                  <v-spacer></v-spacer>
                  <span class="text--secondary">
                    Pour les notification et se connecter
                  </span>
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="email"
                    label="exemple@gmail.com"
                    single-line
                    hide-details
                    outlined
                    dense
                  ></v-text-field>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </section>
      <v-divider></v-divider>
      <section>
        <div class="mb-4">
          <h3>Connexions</h3>
          <span>Gérer vos services et comptes connectés</span>
        </div>
        <v-card elevation="8" max-width="500" class="rounded-lg">
          <template slot="progress">
            <v-progress-linear
              color="#89AEF1"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>
          <div class="px-3 pt-1 pb-4">
            <section class="d-flex justify-center flex-wrap align-center">
              <article>
                <v-img
                  contain
                  height="70"
                  width="70"
                  src="https://play-lh.googleusercontent.com/WETi4kiHx6KfyGBDsZ1-jgPdAATt8n6Fq4tK05TOBe_z6NxsoWjrGkDyy8PIW29pvJw=w240-h480-rw"
                ></v-img>
              </article>
              <div class="d-flex flex-column justify-start">
                <div class="text--primary font-weight-medium w-fit">Moodle</div>
                <a
                  class="text--secondary body-2 text-decoration-none"
                  href="https://moodle.polymtl.ca/"
                  target="_blank"
                >
                  moodle.polymtl.ca
                  <font-awesome-icon
                    style="opacity: 0.6"
                    class="ml-1"
                    icon="fa-solid fa-arrow-up-right-from-square"
                  />
                </a>
              </div>
              <v-spacer></v-spacer>
              <v-card-actions class="justify-center">
                <template>
                  <v-dialog
                    v-if="!linked"
                    v-model="dialog"
                    content-class="moodle-pop"
                    width="340"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-if="!linked"
                        color="primary"
                        v-bind="attrs"
                        v-on="on"
                        rounded
                      >
                        Se connecter
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="text-h5 primary--text">
                        Connection Moodle
                      </v-card-title>
                      <v-card-text>
                        Connecter vous avec votre compte moodle !
                      </v-card-text>
                      <div
                        id="inputs-connection"
                        class="d-flex flex-column gap-2 px-4 pb-4"
                      >
                        <v-text-field
                          v-model="username"
                          label="Nom d'utilisateur"
                          :rules="rules"
                          height="45"
                          single-line
                          hide-details
                          outlined
                          rounded
                          full-width
                          dense
                        ></v-text-field>
                        <v-text-field
                          v-model="password"
                          @keyup.native.enter="sendForm"
                          :rules="rules"
                          label="Mot de passe"
                          type="password"
                          height="45"
                          single-line
                          hide-details
                          outlined
                          rounded
                          full-width
                          dense
                        ></v-text-field>
                        <span
                          v-if="wrong"
                          class="wrongPass"
                          style="color: red; font-size: 10pt"
                        >
                          Votre mot de passe ou nom d'utilsateur est
                          incorrecte</span
                        >
                      </div>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          @click="sendForm"
                          :disabled="!username || !password"
                          :loading="loading"
                          class="ma-1"
                          rounded
                          color="primary"
                          >se connecter</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog
                    v-else
                    v-model="dialog2"
                    content-class="moodle-unlink"
                    width="340"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-if="linked"
                        color="error"
                        class="moodle-unlinkBtn"
                        v-bind="attrs"
                        v-on="on"
                        rounded
                      >
                        <font-awesome-icon
                          class="mr-1"
                          icon="fa-solid fa-circle-minus"
                        />
                        se déconnecter
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="text-h5 primary--text">
                        Se déconnecter de Moodle
                      </v-card-title>
                      <v-card-text>
                        Êtes-Vous Sûr de vouloir vous déconnecter de moodle ?
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-spacer></v-spacer
                        ><v-btn
                          @click="dialog2 = false"
                          :loading="loading"
                          text
                          rounded
                          class="ma-1"
                          >Anuller</v-btn
                        >
                        <v-btn
                          color="primary"
                          @click="unlink"
                          :loading="loading"
                          rounded
                          class="ma-1"
                          >Oui</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </template>
              </v-card-actions>
            </section>
            <section>
              <span class="body-2 text--primary">
                Accéder à vos examen, vos quiz , votre calendrier tout à partir
                de noodle !
              </span>
            </section>
          </div>
        </v-card>
      </section>
    </main>
  </div>
</template>

<script>
import Vue from "vue";
import PfpChange from "@/components/account/pfpChange";
import HeaderBar from "@/components/templates/header";

export default {
  name: "user-page",
  components: { HeaderBar, PfpChange },
  data() {
    return {
      dialog: false,
      username: null,
      password: null,
      email: null,
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
      console.log(this.linked);
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
        });
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
.moodle-unlinkBtn {
  font-size: 12px;
  color: white;
  text-transform: capitalize;
}
</style>
