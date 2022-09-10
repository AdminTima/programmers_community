import {createStore} from "vuex";
import {authApi, publicApi} from "@/http/axios-config";

export const store = createStore({
    state() {
        return {
            isAuth: localStorage.getItem('isAuth'),
        }
    },
    mutations: {
        changeIsAuth(state, bool) {
            state.isAuth = bool;
        }
    },
    actions: {
        async checkIfUserAuth({commit}) {
                try {
                    const response = await publicApi.get('/tokens/refresh');
                    localStorage.setItem('access', response.data.access);
                    commit('changeIsAuth', true);
                    localStorage.setItem('isAuth', 'true');
                } catch (err) {
                    console.log(err);
                    commit('changeIsAuth', false);
                    localStorage.removeItem('isAuth');
                    localStorage.removeItem('access');

                }
            }
    }
});