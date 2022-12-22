import Vuex from 'vuex'

export const store =  new Vuex.Store({
    state:{
        userName:null,
        token:null
    },
    mutations:{
        setUser(state,userName)
        {
            state.userName = userName
        },
        setToken(state,token)
        {
            state.token = token
        }
    },
    actions:{},
    getters:{
        isLogedIn(state)
        {
            return !!state.token
        }
    }
})