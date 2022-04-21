import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    banks: [
      {
        id: Date.now(),
        title: 'Bank name ',
        isTitleChanged: true,
        interestRate: '10',
        isRateChanged: true,
        maximumLoan: '1000',
        isMaxLoanChanged: true,
        minDownPayment: '10',
        isMinDownPayment: true,
        loanTerm: '1',
        isLoanTermChanged: true,
      },
    ],
    chosenBank: {},
    isNotCapable: false,
    dataForCalculation: {
      emiMonthly: 0,
      monthlyPayments: 0,
      minDownFromBank: 0,
      totalPayment: 0,
      totalInterest: 0,
    },
  },
  mutations: {
    CHANGE_DATA_FOR_CALCULATION: (state, data) => state.dataForCalculation = data,
    CHOOSE_BANK: (state, id) => state.chosenBank = state.banks.find(item => item.id === id),
    ADD_BANK: state => state.banks.push(
      {
        id: Date.now(),
        title: 'New Bank ' + state.banks.length,
        isTitleChanged: true,
        interestRate: '0',
        isRateChanged: true,
        maximumLoan: '$ 0',
        isMaxLoanChanged: true,
        minDownPayment: '0',
        isMinDownPayment: true,
        loanTerm: '0',
        isLoanTermChanged: true,
      },
    ),
    DELETE_BANK: (state, id) => state.banks = state.banks.filter(el => el.id !== id),
  },
  actions: {},
  modules: {},
})
