const user = {
    state: {
        users: []
    },
    mutations: {
        SET_USERS: (state, users) => {
            state.users = users
        },
        DELETE_USER: (state, uuid) => {
            const index = state.users.findIndex(item => item.login.uuid === uuid)
            index >= 0 ? state.users.splice(index, 1) : new Error(`uuid = ${uuid} has already not exist!`)
        },
        SAVE_TO_LOCAL: (state) => {
            localStorage.setItem('users', JSON.stringify(state.users))
        }
    },
    actions: {
        initUsers: ({commit}, users) => {
            commit('SET_USERS', users);
        },
        saveUsers: ({commit}) => {
            commit('SAVE_TO_LOCAL')
        }
    }
}
export default user
