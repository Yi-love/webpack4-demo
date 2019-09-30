import Vue from 'vue';
import VueI18n from 'vue-i18n';

import '../../scss/common.scss';

import pagea from './index.vue';

Vue.config.productionTip = false;

Vue.use(VueI18n);

const i18n = new VueI18n({ locale: window._i18n.locale });

new Vue({
    el: '#app',
    i18n,
    render: h => h(pagea)
});
