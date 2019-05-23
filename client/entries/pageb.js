import Vue from 'vue';

import '../scss/common.scss';

import pageb from '../components/pageb/index.vue';

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    template: '<pageb/>',
    components : {pageb}
});
