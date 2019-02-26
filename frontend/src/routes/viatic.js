import ViaticsView from '../views/Viatics.vue';
import CheckAuth  from '../middlewares/authenticated';
import MainEditView from '@/components/viatics/lifecycle/MainEditView.vue';
export default [ 
    {
        component: ViaticsView,
        path: '/viatics',
        name: 'viatics',
        beforeEnter: CheckAuth
    },
    {
        component: MainEditView,
        path: '/viatics/:id',
        name: 'edit-viatic',
        beforeEnter: CheckAuth,
        props: true
    }
]