import Api from '@/services/Api.js'

export default {
    addUser(credentials){
        return Api().post('addUser',credentials)
    }
}

// AuthenticationService.register({
//     user: 'admin',
//     password:'123456'
// })