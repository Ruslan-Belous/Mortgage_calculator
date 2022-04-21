<template>
  <div class="v-result-section">
    <ul v-if="isShown">
      <li>
        <h5>Monthly payment</h5>
        <div>$ {{ dataForCalculation.emiMonthly.toFixed(2) }}</div>
      </li>
      <li>
        <h5>Total payments</h5>
        <div>{{ dataForCalculation.monthlyPayments }} monthly payments</div>
      </li>
      <li>
        <h5>Down payment %</h5>
        <div>$ {{ dataForCalculation.minDownFromBank.toFixed(2) }}</div>
      </li>
      <li>
        <h5>Total interest paid</h5>
        <div>$ {{ dataForCalculation.totalInterest.toFixed(2) }}</div>
      </li>
      <li>
        <h5>Total mortgage cost*</h5>
        <div>$ {{ dataForCalculation.totalPayment.toFixed(2) }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "v-result-section",
  props: ["isShown"],
  computed: {
    ...mapState(["banks", "dataForCalculation"]),
  },
};
</script>

<style lang="scss" scoped>
.v-result-section {
  width: 40%;
  border-left: solid 1px #e6e6e6;
  margin: 0 0 10px 0;
  padding: 0 30px;
  & ul {
    margin: 0;
  }
  & ul li {
    list-style: none;
    padding: 0 0 5px;
    border-bottom: dotted 1px #ddd;
  }
  & ul li:first-child {
    font-weight: 500;
    font-size: 24px;
    line-height: 1;
  }
}
</style>
