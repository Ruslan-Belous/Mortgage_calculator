<template>
  <div class="v-header">
    <router-link :to="{ name: 'banks' }">
      <div class="v-header__admin-panel">
        <font-awesome-icon icon="fa-solid fa-dollar-sign" class="v-header__admin-panel__icon" />
        <h1 class="v-header_title">Banks panel</h1>
      </div>
    </router-link>

    <router-link :to="{ name: 'mortgage_calculator' }">
      <div class="v-header__user-panel">
        <font-awesome-icon icon="fa-solid fa-calculator" class="v-header__admin-panel__icon" />
        <h1 class="v-header_title">Mortgage calculate</h1>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "v-header",
};
</script>

<style lang="scss" scoped>
.v-header {
  background: linear-gradient(-90deg, #84cf6a, #16c0b0);
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 15px;
  border-bottom: 2px solid #f6f6f6;
  padding: 0 40px;
  &__admin-panel,
  &__user-panel {
    display: flex;
    align-items: center;
    &__icon {
      width: 30px;
      height: 30px;
      padding: 0 10px 0 0;
    }
  }
}
a {
  text-decoration: none;
  color: #000;
}
</style>
