import HoursView from '../views/Hours.vue';
import Authenticated from '../middlewares/authenticated';
export default [
    {
        name: 'hours',
        path: '/hours',
        component: HoursView,
        beforeEnter: Authenticated
    }
]