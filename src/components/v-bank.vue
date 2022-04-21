<template>
  <div class="v-bank">
    <div class="v-bank__row-wrapp">
      <div v-if="bankData.isTitleChanged" class="v-bank__title" @dblclick="switchModeTitle">
        {{ bankData.title }}
        <button @click="switchModeTitle" class="v-bank__btn btn--primary">Change bank name</button>
      </div>
      <div v-if="!bankData.isTitleChanged" class="v-bank__title">
        <input
          type="text"
          class="v-bank__form-field"
          v-model="bankData.title"
          @keyup.enter="switchModeTitle"
        />
        <button @click="switchModeTitle" class="v-bank__btn btn--save">SaveName</button>
      </div>
    </div>

    <div class="v-bank__row-wrapp">
      <div v-if="bankData.isRateChanged" class="v-bank__rate" @dblclick="switchModeRate">
        {{ bankData.interestRate }} %
        <button @click="switchModeRate" class="v-bank__btn btn--primary">Change rate</button>
      </div>
      <div v-if="!bankData.isRateChanged" class="v-bank__rate">
        <input
          placeholder="Enter rate"
          type="text"
          class="v-bank__form-field"
          @keyup.enter="switchModeRate"
          v-model="bankData.interestRate"
        />
        <button @click="switchModeRate" class="v-bank__btn btn--save">Save</button>
      </div>
    </div>

    <div class="v-bank__row-wrapp">
      <div v-if="bankData.isMaxLoanChanged" class="v-bank__loan" @dblclick="switchModeLoan">
        {{ bankData.maximumLoan }}
        <button @click="switchModeLoan" class="v-bank__btn btn--primary">Change max loan</button>
      </div>
      <div v-if="!bankData.isMaxLoanChanged" class="v-bank__loan">
        <input
          placeholder="Enter maximum loan"
          type="text"
          class="v-bank__form-field"
          v-model="bankData.maximumLoan"
          @keyup.enter="switchModeLoan"
        />
        <button @click="switchModeLoan" class="v-bank__btn btn--save">Save</button>
      </div>
    </div>

    <div class="v-bank__row-wrapp">
      <div
        v-if="bankData.isMinDownPayment"
        class="v-bank__min-down-payment"
        @dblclick="switchModeMinDownPayment"
      >
        {{ bankData.minDownPayment }} %
        <button @click="switchModeMinDownPayment" class="v-bank__btn btn--primary">
          Change min down payment
        </button>
      </div>
      <div v-if="!bankData.isMinDownPayment" class="v-bank__min-down-payment">
        <input
          placeholder="Enter minimum down payment"
          type="text"
          class="v-bank__form-field"
          v-model.number="bankData.minDownPayment"
          @keyup.enter="switchModeMinDownPayment"
        />
        <button @click="switchModeMinDownPayment" class="v-bank__btn btn--save">Save</button>
      </div>
    </div>

    <div class="v-bank__row-wrapp">
      <div
        v-if="bankData.isLoanTermChanged"
        class="v-bank__loan-term"
        @dblclick="switchModeLoanTerm"
      >
        {{ bankData.loanTerm }} months
        <button @click="switchModeLoanTerm" class="v-bank__btn btn--primary">
          Change loan term
        </button>
      </div>
      <div v-if="!bankData.isLoanTermChanged" class="v-bank__loan-term">
        <input
          placeholder="Enter loan term"
          type="text"
          class="v-bank__form-field"
          v-model="bankData.loanTerm"
          @keyup.enter="switchModeLoanTerm"
        />
        <button @click="switchModeLoanTerm" class="v-bank__btn btn--save">Save</button>
      </div>
    </div>

    <div class="v-bank__row-wrapp">
      <button class="v-bank__btn btn-delete" @click="DELETE_BANK(bankData.id)">Delete bank</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "v-bank",
  props: {
    bankData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["DELETE_BANK"]),
    switchModeTitle() {
      this.bankData.isTitleChanged = !this.bankData.isTitleChanged;
      localStorage.setItem("bank", this.bankData.id);
    },
    switchModeRate() {
      this.bankData.isRateChanged = !this.bankData.isRateChanged;
      this.bankData.interestRate = this.checkRate(this.bankData.interestRate);
    },
    switchModeLoan() {
      this.bankData.isMaxLoanChanged = !this.bankData.isMaxLoanChanged;
      this.bankData.maximumLoan = this.checkPrice(this.bankData.maximumLoan);
    },
    switchModeMinDownPayment() {
      this.bankData.isMinDownPayment = !this.bankData.isMinDownPayment;
      this.bankData.minDownPayment = this.checkRate(this.bankData.minDownPayment);
    },
    switchModeLoanTerm() {
      this.bankData.isLoanTermChanged = !this.bankData.isLoanTermChanged;
      this.bankData.loanTerm = String(this.bankData.loanTerm).replace(/[^0-9.]/g, "");

      return;
    },
    remove(index) {
      this.bankData.list.splice(index, 1);
    },
    checkPrice(loan) {
      let value = String(loan);
      value = value.replace(/[^0-9.]/g, "").replace(/^0+/, "");

      if (value.includes(".")) {
        if (value.split(".")[1].length > 2) value = value.slice(0, -1);
      }
      if (value == "" || isNaN(value)) {
        return (value = "$ ");
      }
      return (value = "$ " + String(value).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
    },
    checkRate(rate) {
      let value = String(rate);
      value = value.replace(/[^0-9.]/g, "");

      if (value == "" || isNaN(value)) {
        value = "0 ";
      }
      if (value.charAt(0) == ".") {
        value = "0" + value;
      }
      if (value.charAt(0) == "0") {
        value = value.substr(1);
      }
      value = value < 100 ? value : "100 ";
      value = Number(value).toFixed(2);

      return value;
    },
  },
  computed: {
    checkP() {},
  },
};
</script>

<style lang="scss" scoped>
.v-bank {
  width: 330px;
  float: left;
  margin: 10px 30px 10px 10px;
  padding: 5px;
  box-shadow: 0 0 8px 0 rgb(0 0 0 / 0.3);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &__row-wrapp {
    padding: 8px;
  }
  &__row-wrapp:last-child {
    padding-top: 30px;
  }
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 800;
  }
  &__rate,
  &__loan,
  &__min-down-payment,
  &__loan-term {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
  }
  &__btn {
    border-radius: 15px;
    color: #fff;
    cursor: pointer;
    border: none;
    padding: 5px;
    float: right;
  }
  &__form-field {
    border: 1px solid green;
    padding: 4px;
    border-radius: 15px;
  }
}
.btn-delete {
  background-color: #b30b00;
}
.btn-delete:hover {
  background-color: maroon;
  color: #fff;
}
input:focus {
  outline: none;
}
.btn--primary {
  background: linear-gradient(-90deg, #84cf6a, #16c0b0);
}
.btn--secondary {
  background-color: #5067d9;
}
.btn--save {
  background-color: #5067d9;
}
label {
  user-select: none;
}
</style>
