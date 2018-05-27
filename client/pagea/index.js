import 'babel-polyfill';

import Vue from 'vue';
import {lineChart} from 'tui-chart';

import '../common.scss';

import index from './index.vue';

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    template: '<index/>',
    components : {index}
});
