<template>
  <div class="main">
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
    <span v-if="imgError" class="big-image-error">Image trop grande</span>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "pfpChange",
  data() {
    return {
      imgError: false,
      picture: Vue.prototype.$userInfo.imageUrl,
    };
  },
  methods: {
    async onFile(event) {
      const file = event.target.files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) return;

      //image to base64
      console.log("yo");
      const fileReader = new FileReader();
      const convertBase64 = (file) => {
        return new Promise((resolve) => {
          fileReader.readAsDataURL(file);

          fileReader.onload = function (event) {
            const imgElement = document.createElement("img");
            imgElement.src = event.target.result;

            imgElement.onload = function (e) {
              const canvas = document.createElement("canvas");
              const MAX_WIDTH = 150;

              // const scaleSize = MAX_WIDTH / e.target.width;
              canvas.width = MAX_WIDTH;
              canvas.height = MAX_WIDTH;

              const ctx = canvas.getContext("2d");

              ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);

              const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");
              resolve(srcEncoded);
            };
          };
        });
      };
      const srcEncoded = await convertBase64(file);
      //size calculations
      const stringLength = srcEncoded.length - "data:image/png;base64,".length;

      const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
      const sizeInKb = sizeInBytes / 1000;
      console.log(srcEncoded, sizeInKb);
      if (sizeInKb > 100) {
        this.imgError = true;
        return;
      }
      fetch("http://localhost:8080/settings/changeImage", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: Vue.prototype.$userInfo.username,
          img: srcEncoded,
        }),
      })
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.picture = res.link;
            Vue.prototype.$userInfo.imageUrl = res.link;
            this.imgError = false;
          }
          // if (res.status === 413) {
          //   console.log("gg");
          // }
        });
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  width: fit-content;
}
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
  background-color: black !important;
}
.big-image-error {
  color: red;
  font-size: 12px;
  font-weight: 500;
}
</style>
