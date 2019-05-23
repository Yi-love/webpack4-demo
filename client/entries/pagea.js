import Vue from 'vue';
import VueI18n from 'vue-i18n';
import {lineChart} from 'tui-chart';

import '../scss/common.scss';

import pagea from '../components/pagea/index.vue';

Vue.config.productionTip = false;

Vue.use(VueI18n);

const i18n = new VueI18n({locale: ['cn' , 'en'][Math.floor(Math.random() * 100) % 2]});

new Vue({
    el: '#app',
    i18n,
    render: h=>h(pagea)
});
