<template>
  <div>
    <header>
      <i class="fa fa-bars"></i>
      <label class="text-2xl">List Your Trip</label>
    </header>

    <!-- Name -->
    <div class="mx-5 my-5">
      <label class="text-2xl">{{ nameplace }}</label>
      

      <div
        v-for="result in places"
        :key="result.id"
        class="flex rounded-lg shadow-lg p-5 items-center"
      >
        <div class="w-1/3">
          <img
            class="loginImg w-[100px] h-[120px] bg-cover rounded-lg"
            :src="result.img"
            alt="coverBook"
          />
        </div>

        <div class="w-2/3 p-4 md:p-4">
          <h1 class="text-l font-bold text-gray-800">{{ result.name }}</h1>

          <p class="mt-2 text-xs text-gray-600">{{ result.province }}</p>

          <div class="flex justify-between mt-3 item-center">
            <h1 class="text-lg font-bold text-gray-700 md:text-xl">
              {{ result.price }}
            </h1>
          </div>
        </div>

        

      </div>
      <div class="flex justify-end">
      <router-link
        :to="{
          path: '/AllTourCalendar',
          component: AllTourCalendar,
        }"
      >
        <button
          type="submit"
          @click="addTrip()"
          class="flex justify-center mt-3 w-full px-6 py-2 text-[#4C3FB6] border border-[#4C3FB6] rounded-full md:mt-0 md:w-auto md:mx-2"
        >
          ไปหน้ามะปราง
        </button>
      </router-link>
    </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ['myProp'],
  data() {
    return {
      places: [],
      nameplace: "",
    };
  },
  created() {
    console.log("po",this.myProp);
      this.fetchplace();
  },
  methods: {
    async fetchplace() {
        console.log("place")
        console.log("plance3", this.places)
      try { 
        console.log(this.$route.params)
        const response =  await axios.get(`http://localhost:4000/place/${this.$route.params.tripId}`);
        
        this.places = response.data.selectedTrips
        this.nameplace = response.data.nameTrip
        
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }
  },
};
</script>
