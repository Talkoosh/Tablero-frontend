import { userService } from '../../services/user.service.js';

export const userStore = {
    state: {
        loggedinUser: null,
    },
    getters: {
        loggedinUser(state) {
            return state.loggedinUser;
        },
    },
    mutations: {
        login(state, { user }) {
            state.loggedinUser = user;
        },
        logout(state) {
            state.loggedinUser = null;
        }
    },
    actions: {
        async getLoggedinUser({ commit }) {
            try {
                const user = await userService.getLoggedinUser();
                commit({ type: 'login', user });
            } catch (err) {
                throw err
            }
        },
        async login({ commit }, { user }) {
            try {
                const returnedUser = await userService.login(user)
                commit({ type: 'login', user: returnedUser })
            } catch (err) {
                throw err
            }
        },
        async signup({ commit }, { user }) {
            try {
                const returnedUser = await userService.signup(user)
                commit({ type: 'login', user: returnedUser })
            } catch (err) {
                throw err
            }
        },
        async logout({ commit }) {
            console.log('login out')
            try {
                await userService.logout()
                commit({ type: 'logout' })
            } catch (err) {
                throw err
            }
        }
    },
};
