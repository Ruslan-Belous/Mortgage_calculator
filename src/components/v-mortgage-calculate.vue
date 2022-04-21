<template>
  <div class="v-mortage-calculate">
    <div class="inputs-section">
      <div class="inputs-section__form-group">
        <label for="initialLoan">Initial Amount</label>
        <input
          id="initialLoan"
          v-model.number="initialLoan"
          class="inputs-section__form-control"
          placeholder="Enter Loan Amount"
          type="text"
        />
      </div>
      <div class="inputs-section__form-group">
        <label for="downPayment">Down payment</label>
        <input
          id="downPayment"
          v-model.number="downPayment"
          class="inputs-section__form-control"
          placeholder="Enter down payment"
          type="text"
        />
      </div>
      <div class="inputs-section__form-group">
        <label for="chooseBank">Choose Bank</label>
        <v-custom-select :options="banks" />
      </div>

      <div class="inputs-section__capable">
        <div v-if="chosenBank.id && checkCapable">
          <p>the bank is capable of giving a requested loan</p>
          <button class="inputs-section__btn-save" @click="saveSettings">Calculate</button>
        </div>
        <p v-else>the bank is not capable of giving a requested loan</p>
      </div>
    </div>
    <v-result-section :isShown="isResultShown" />
  </div>
</template>

<script>
import vCustomSelect from "./v-custom-select.vue";
import VResultSection from "./v-result-section.vue";
import { mapMutations, mapState } from "vuex";

export default {
  components: { vCustomSelect, VResultSection },
  name: "v-mortgage-calculate",
  data() {
    return {
      initialLoan: 1000,
      downPayment: 100,
      downPaymentPer: 20,
      isResultShown: false,
    };
  },
  methods: {
    saveSettings() {
      if (this.downPayment >= this.initialLoan) this.isResultShown = false;
      const rate = parseFloat(this.chosenBank.interestRate) / 100 / 12;
      // const monthlyPayments = parseFloat(this.chosenBank.loanTerm) * 12;
      const monthlyPayments = parseFloat(this.chosenBank.loanTerm);
      const x = Math.pow(1 + rate, monthlyPayments);
      const emiMonthly = (parseFloat(this.initialLoan) * x * rate) / (x - 1);
      const totalPayment = emiMonthly * monthlyPayments;
      const data = {
        monthlyPayments,
        emiMonthly,
        minDownFromBank: (this.initialLoan / 100) * parseFloat(this.chosenBank.minDownPayment),
        totalPayment,
        totalInterest: totalPayment - parseFloat(this.initialLoan),
      };
      this.CHANGE_DATA_FOR_CALCULATION(data);
      this.isResultShown = true;
    },
    ...mapMutations(["CHANGE_DATA_FOR_CALCULATION"]),
  },
  computed: {
    ...mapState(["banks", "chosenBank"]),
    checkCapable() {
      const maximumLoan = parseFloat(this.chosenBank.maximumLoan.replace(/\D/g, ""));
      const minDownFromBank = (this.initialLoan / 100) * this.chosenBank.minDownPayment;
      let dowPaymentUser = parseFloat(this.downPayment);
      let initialLoanUser = parseFloat(this.initialLoan);
      return initialLoanUser <= maximumLoan && minDownFromBank <= dowPaymentUser;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-mortage-calculate {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.inputs-section {
  width: 35%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 0px;
  &__form-control {
    border: 1px solid green;
    padding: 9px;
    border-radius: 15px;
  }
  &__form-group {
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 100%;
    border-bottom: dotted 1px #ddd;
    margin: 0 0 10px;
  }
  &__capable {
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 100%;
    border-bottom: dotted 1px #ddd;
    margin: 0 0 10px;
  }
  &__btn-save {
    width: 100%;
    position: relative;
    background-color: #50d8d7;
    border-radius: 20px;
    display: flex;
    color: #fff;
    justify-content: center;
    padding: 10px 5px;
    align-items: center;
    cursor: pointer;
    border: none;
  }
}
input,
select:focus {
  outline: none;
}
</style>
