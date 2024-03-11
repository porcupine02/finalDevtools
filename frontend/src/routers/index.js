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
import Checkbill from "@/screen/CheckBill.vue"
// /Users/porcupine02/Documents/GitHub/DevtoolProject/travel/frontend/src/
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
            path : '/listConfirm',
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
            path : '/bills',
            component : Checkbill
        }
    ]
})

export default router;