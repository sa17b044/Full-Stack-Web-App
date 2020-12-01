import Api from '@/services/Api.js'

export default {
    dbStoreUser(user){
        return Api().post('dbStoreUser',user)
    },
    login(credentials){
        return Api().post('login',credentials)
    }
}

// AuthenticationService.register({
//     user: 'admin',
//     password:'123456'
// })