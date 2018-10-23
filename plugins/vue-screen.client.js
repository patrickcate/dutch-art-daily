import Vue from 'vue'
import VueScreen from 'vue-screen'

if (process.client) {
  Vue.use(VueScreen, {
    min: '320px',
    xxs: '360px',
    xs: '400px',
    sm: '600px',
    md: '700px',
    lg: '960px',
    xl: '1280px',
    breakpointsOrder: ['min', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl'],
  })
}
