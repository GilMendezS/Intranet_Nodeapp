import store from '../store';

export default (to, from ,next) => {
    const token = store.getters['auth/getToken'];
    const user = store.getters['auth/getUser'];

    if(token && user){
        next();
    }
    else {
        next('/')
    }
    
    
}