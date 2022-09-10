import MainPage from "@/pages/MainPage";
import LoginPage from "@/pages/LoginPage";
import SignUpPage from "@/pages/SignUpPage";
import {createRouter, createWebHistory} from "vue-router/dist/vue-router";
import {store} from "@/store/store";
import ProfilePage from "@/pages/ProfilePage";
import CreateRoomPage from "@/pages/CreateRoomPage";
import RoomPage from "@/pages/RoomPage";
import UserPage from "@/pages/UserPage";


const routes = [
    {
        path: '/',
        component: MainPage,
        name: 'Index',
        // beforeEnter: (to, from) => {
        // if(!store.state.isAuth) {
        //     console.log(store.state.isAuth);
        //     return {name: 'Login'};
        // }
        // }
    },
    {
        path: '/profile',
        component: ProfilePage,
        name: 'Profile',
        // beforeEnter: (to, from) => {
        //     if(!store.state.isAuth) {
        //         console.log(store.state.isAuth);
        //         return {name: 'Login'};
        //     }
        // }
    },
    {path: '/login', component: LoginPage, name: 'Login'},
    {path: '/sign-up', component: SignUpPage, name: 'SignUp'},
    {path: '/create-room', component: CreateRoomPage, name: 'CreateRoom'},
    {path: '/room/:roomId', component: RoomPage, name: 'Room'},
    {path: '/user/:userId', component: UserPage, name: 'User'},
];

export const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});
router.beforeEach((to, from) => {
    if(to.name !== 'Login' && to.name !== 'SignUp' ) {
        if(!store.state.isAuth) {
            return {name: 'Login'}
        }
    }
});

