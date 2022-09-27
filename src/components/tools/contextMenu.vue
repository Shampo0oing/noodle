<template>
  <v-menu
    v-if="rightClicked"
    v-model="rightClicked"
    content-class="contextMenu"
    :transition="false"
    :position-x="x"
    :position-y="y"
    close-on-click
    absolute
  >
    <v-list>
      <v-list-item-group>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :ripple="false"
          @click="item.click()"
        >
          <v-list-item-icon>
            <font-awesome-icon :icon="item.icon" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "context-menu",
  data: () => ({
    items: [],
    rightClicked: false,
    x: 0,
    y: 0,
  }),
  methods: {
    show(event, options) {
      event.preventDefault();
      this.items = options;
      this.rightClicked = false;
      this.x = event.clientX;
      this.y = event.clientY;
      this.$nextTick(() => {
        this.rightClicked = true;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.contextMenu {
  border-radius: 10px;

  .v-list {
    background: transparent;
    backdrop-filter: blur(10px);
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: var(--v-sideBar-lighten1);
      opacity: 0.9;
    }
  }

  .v-list-item {
    max-height: 32px;
    min-height: 32px;
    color: white !important;
  }

  .v-list-item__content {
    margin-left: 4px;
  }

  .v-list-item__title {
    font-size: 14px;
  }
  .v-list-item__icon {
    margin: 8px 0 !important;
  }
}
</style>
