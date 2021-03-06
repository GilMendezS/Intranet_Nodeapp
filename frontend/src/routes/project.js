import Projects from '../views/Projects.vue';
import Authenticated from '../middlewares/authenticated';
import AddProject from '../components/projects/AddProject.vue';
import EditProject from '../components/projects/EditProject.vue';
export default [ 
    {
        path: '/projects',
        name: 'projects-view',
        component: Projects,
        beforeEnter: Authenticated
    },
    {
        path: '/projects/add',
        name: 'add-project',
        component: AddProject,
        beforeEnter: Authenticated
    },
    {
        path: '/projects/edit/:id',
        name: 'edit-project',
        component: EditProject,
        beforeEnter: Authenticated,
        props: true
    }
]