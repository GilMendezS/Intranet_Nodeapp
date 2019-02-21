import store from '../store';
import router from '@/router';
export default (to, from ,next) => {
    const token = store.getters['auth/getToken'];
    const user = store.getters['auth/getUser'];
    console.log('middleware here')
    if(token && user){
        console.log('is logged in')
        router.push('/projects');
    }
    else {
        console.log('is not logged in')
        next()
    }
    
    
}