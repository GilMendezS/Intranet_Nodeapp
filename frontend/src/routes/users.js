import AuthMiddleware from '../middlewares/authenticated';
import UsersView from '../views/Users.vue';
export default [
    {
        component: UsersView,
        path:'/users',
        name: 'users',
        beforeEnter: AuthMiddleware
    }
]