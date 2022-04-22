<template>
  <div class="v-baks-list">
    <div class="v-baks-list__container">
      <button class="v-baks-list__btn-add" @click="ADD_BANK">
        &nbsp; Add Banks
        <font-awesome-icon class="v-baks-list__icon" icon="fa-regular fa-credit-card" />
      </button>
      <h1>Banks</h1>
      <v-bank v-for="(bank, i) in banks" :id="`bank${i + 1}`" :key="i" :bankData="bank"></v-bank>
      <p v-if="!this.banks.length">There are no banks ...</p>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import VMortgageCalculate from "./v-mortgage-calculate.vue";
import vBank from "./v-bank.vue";
export default {
  name: "v-baks-list",
  components: {
    vBank,
    VMortgageCalculate,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["banks"]),
  },
  methods: {
    ...mapMutations(["ADD_BANK"]),
  },
};
</script>

<style lang="scss" scoped>
.v-baks-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  &__container {
    flex-wrap: wrap;
    width: 90%;
    margin: 0 auto;
    padding-bottom: 10px;
    border-bottom: 3px solid #eee;
    margin-bottom: 15px;
    & h1 {
      margin: 0;
    }
  }
  &__btn-add {
    position: relative;
    background-color: #50d8d7;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    padding: 0px 5px;
    align-items: center;
    cursor: pointer;
    border: none;
    margin: 0 0 0 10px;
  }
  &__icon {
    padding: 10px 7px;
    position: relative;
    width: 30px;
    height: 30px;
  }
}
</style>
