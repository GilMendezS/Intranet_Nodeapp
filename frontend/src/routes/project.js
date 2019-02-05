import Projects from '../views/Projects.vue';
import Authenticated from '../middlewares/authenticated';
export default [ 
    {
        path: '/projects',
        name: 'projects-view',
        component: Projects,
        beforeEnter: Authenticated
    }
]