import AuthMiddleware from '../middlewares/authenticated';
import UsersView from '../views/Users.vue';
import AddUser from '../components/users/AddUser.vue';
export default [
    {
        component: UsersView,
        path:'/users',
        name: 'users',
        beforeEnter: AuthMiddleware
    },
    {
        component: AddUser,
        name :'add-user',
        path :'/users/add',
        beforeEnter : AuthMiddleware
    }
]