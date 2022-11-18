<template>
  <div class="profile-pic">
    <label class="-label" for="file">
      <input
        id="file"
        type="file"
        style="display: none"
        @change="onFile($event)"
      />
      <img :src="picture" id="output" class="pfp" />
      <font-awesome-icon class="edit-icon" icon="fa-regular fa-image" />
    </label>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "pfpChange",
  data() {
    return {
      picture: Vue.prototype.$userInfo.imageUrl,
    };
  },
  methods: {
    async onFile(event) {
      const file = event.target.files[0];
      if (!file.type.startsWith("image/")) return;
      //image to base64

      const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);

          fileReader.onload = () => {
            resolve(fileReader.result);
          };

          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };
      const base64 = await convertBase64(file);

      fetch("http://localhost:8080/settings/changeImage", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: Vue.prototype.$userInfo.username,
          img: base64,
        }),
      })
        .then((res) => res.json())

        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.picture = res.link;
            Vue.prototype.$userInfo.imageUrl = res.link;
          } else {
            //redirect here
          }
        });
    },
  },
};
</script>

<style scoped lang="scss">
.profile-pic {
  position: relative;
  border-radius: 50%;
  border: 10px solid transparent;
  overflow: hidden;
  height: 150px;
  width: 150px;
  &:hover {
    cursor: pointer;
    .pfp {
      filter: brightness(60%) blur(2px);
      cursor: pointer;
    }
    .edit-icon {
      opacity: 1;
    }
  }
}
.-label {
  height: 100%;
}
.edit-icon {
  position: absolute;
  opacity: 0;
  color: rgba(255, 255, 255, 0.84);
  height: 24px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 150ms ease;
  cursor: pointer;
}
.pfp {
  width: 100%;
  transition: filter 150ms ease;
}
</style>
