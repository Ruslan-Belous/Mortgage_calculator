<template>
  <div class="v-main-wrapp">
    <v-header />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import vHeader from "./v-header.vue";
export default {
  name: "v-main-wrapp",
  components: {
    vHeader,
  },
};
</script>
<style lang="scss" scoped>
.v-main-wrapp {
  box-shadow: 3px 3px 8px 0px rgba(34, 60, 80, 0.2);
  width: calc(100vw - 100px);
  height: 100%;
  background-color: #fff;
  margin: 50px auto;
  border-radius: 10px;
  max-width: 1400px;
}
</style>
