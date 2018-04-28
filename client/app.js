import 'babel-polyfill';

import Vue from 'vue';

import './common.scss';

import index from './index';

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    template: '<index/>',
    components : {index}
});
