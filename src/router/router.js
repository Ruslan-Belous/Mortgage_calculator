import Vue from 'vue'
import Router from 'vue-router'

import vBanksList from '../components/v-banks-list'
import vMortgageCalculate from '../components/v-mortgage-calculate'

Vue.use(Router)

let router = new Router({
    mode: "history",
    routes: [
        {
            path: '',
            name: 'header',
            component: vBanksList,
            props: true
        },
        {
            path: '/banks',
            name: 'banks',
            component: vBanksList,
            props: true
        },
        {
            path: '/calculator',
            name: 'mortgage_calculator',
            component: vMortgageCalculate,
            props: true
        }
    ]

})

export default router