import ViaticsView from '../views/Viatics.vue';
import CheckAuth  from '../middlewares/authenticated';
export default [ 
    {
        component: ViaticsView,
        path: '/viatics',
        name: 'viatics',
        beforeEnter: CheckAuth
    }
]