import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

import ProjectsRoutes from './routes/project';
import CompanyRoutes from './routes/company';
import HoursRoutes from './routes/hour';
import ViaticsRoutes from './routes/viatic';
import UsersRoutes from './routes/users';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    ...ProjectsRoutes,
    ...CompanyRoutes,
    ...HoursRoutes,
    ...ViaticsRoutes,
    ...UsersRoutes
  ]
})
