import CompanyView from '../views/Company.vue';
import Authenticated from '../middlewares/authenticated';
export default [
    {
        component: CompanyView,
        path: '/company',
        name: 'company',
        beforeEnter: Authenticated
    }
]