import {createRouter, createWebHistory} from 'vue-router'

import registerView from '@/screen/RegisterView.vue'
import loginView from '@/screen/LoginView.vue'
import CommentPage from '@/screen/CommentPage.vue'
import listConfirm from '@/screen/listConfirm.vue'
import listYourTrips from '@/screen/listYourTrips.vue'
import SearchPage from '@/screen/SearchPage.vue'
import AddTour from '@/screen/AddTour.vue'
import AllTourCalendar from '@/screen/AllTourCalendar.vue'
import DetailEachPage from '@/screen/DetailEachPage.vue'
import Home from '@/screen/Home.vue'
import Tour from '@/screen/Tour.vue'
// import Home from '@/components/Home.vue'

const router = createRouter({
    history : createWebHistory(),
    routes : [
        {
            path : '/register',
            component : registerView
        },
        {
            path : '/login',
            component : loginView
        },
        {
            path : '/comment',
            component : CommentPage
        },

        {
            path : '/listConfirm/:tripId',
            component : listConfirm
        },
        {
            path : "/listYourTrips",
            component : listYourTrips
        },
        {
            path : "/",
            component : SearchPage
            
        },
        {
            path : "/AddTour",
            component : AddTour
        },
        {
            path : "/AllTourCalendar",
            component : AllTourCalendar
        },
        {
            path : "/DetailEachPagearch/:alldata",
            name: 'Detail',
            component : DetailEachPage
        },
        {
            path : '/Home',
            component : Home
        },
        {
            path : '/Tour/:name',
            component : Tour,
        },

    ]
})

export default router;