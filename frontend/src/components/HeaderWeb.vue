<template>
  <header class="bg-gray-800 text-white py-5 px-5">
    <div class="container mx-auto flex justify-between items-center">
      <img src="../assets/Group 1.svg" alt="" @click="toggleCheckBill">
      <h1 class="text-2xl font-semibold text-gray-500">Search</h1>
      <nav>
        <ul class="flex space-x-4" v-if="user == null">

          <router-link to="login"><button class="hover:bg-slate-400 p-2 rounded-full">Login</button> </router-link>
        </ul>
        <ul class="flex space-x-4" v-else>
            <button class="hover:bg-slate-400 p-2 rounded-full" @click="logout">Logout</button>
        </ul>
      </nav>
    </div>
  </header>
</template>


<script>

export default {
  props: ['toggleCheckBill'],
  data() {
    return {
      user: ""
    };
  },


   created() {
     this.user = localStorage.getItem('token')
   },
   methods:{
    logout(){
      localStorage.removeItem('token')
      this.user = null
    },
    showBill(){
      this.$emit('showBill');
    }
   }

};
</script>
