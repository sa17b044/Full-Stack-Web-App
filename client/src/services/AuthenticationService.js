import Api from '@/services/Api.js'

export default {
    dbStoreUser(...user){
        return Api().post('dbStoreUser',user)
    }
}

// AuthenticationService.register({
//     user: 'admin',
//     password:'123456'
// })