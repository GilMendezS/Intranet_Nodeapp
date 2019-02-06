import Projects from '../views/Projects.vue';
import Authenticated from '../middlewares/authenticated';
import EditProject from '../components/projects/EditProject.vue';
export default [ 
    {
        path: '/projects',
        name: 'projects-view',
        component: Projects,
        beforeEnter: Authenticated
    },
    {
        path: '/edit/:id',
        name: 'edit-project',
        component: EditProject,
        beforeEnter: Authenticated,
        props: true
    }
]