<script setup>
import HeaderWeb from "../components/HeaderWeb.vue";
import CheckBill from "../screen/CheckBill.vue";
</script>


<template>
  <div>
    <button
      class="flex justify-end w-full p-3"
      v-if="showCheckBill"
      @click="toggleCheckBill"
    >
      <i class="fa-solid fa-times" style="color: red"></i>
    </button>
    <CheckBill v-if="showCheckBill" />
    <HeaderWeb :toggleCheckBill="toggleCheckBill" v-if="!showCheckBill" />


    <!-- Name Trip -->
    <div class="m-5" v-if="!showCheckBill">
      <label class="text-2xl">Name Trip</label>
      <div class="flex items-center justify-center my-2">
        <input
          id="name"
          name="name"
          type="name"
          autocomplete="name"
          v-model="nameTrip"
          placeholder="Enter Name your trips"
          class="block border-solid border-2 border-neutral-400 w-[100%] p-2 ps-3 text-sm text-camelcoat rounded-full"
        />
      </div>
    </div>

    <!-- Search -->
    <div class="mx-5 mt-10">
      <label class="text-l">ค้นหาจังหวัด หรือ ชื่อสถานที่</label>

      <div class="search flex flex-row mt-2 justify-between items-center">
        <div class="flex justify-center">
          <input
            type="text"
            placeholder="Search"
            v-model="searchTerm"
            class="w-full border-[#DFDFDF] rounded-full pl-10 pr-4 py-2 focus:border-blue-500"
          />
        </div>

        <button
          @click="performSearch"
          class="flex justify-center px-6 py-2 text-[#4C3FB6] border border-[#4C3FB6] rounded-full md:mt-0 md:w-auto md:mx-2"
        >
          ค้นหา
        </button>
      </div>
    </div>

    <!-- แสดงสถานที่ -->
    <div class="mx-5 mt-5">
      <label class="text-l">เลือกสถานที่ที่ต้องการ</label>
      <div v-if="searchResults.length > 0" class="flex justify-center flex-col">
        <div
          v-for="result in searchResults"
          :key="result.id"
          class="flex rounded-lg shadow-lg p-5 items-center"
        >
          <input
            type="checkbox"
            class="form-checkbox h-5 w-5 mr-3"
            v-model="selectedTrips"
            :value="result"
          />
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
      </div>
    </div>

    <div class="flex justify-end">
      <router-link
        :to="{
          path: '/listConfirm/:tripId',
          component: listConfirm,
        }"
      >
        <button
          type="submit"
          @click="addTrip()"
          class="flex justify-center mt-3 w-full px-6 py-2 text-[#4C3FB6] border border-[#4C3FB6] rounded-full md:mt-0 md:w-auto md:mx-2"
        >
          สร้างทริป
        </button>
      </router-link>
      <router-link to="/">
        <button
          type="submit"
          class="flex justify-center mt-3 w-full px-6 py-2 text-[#4C3FB6] border border-[#4C3FB6] rounded-full md:mt-0 md:w-auto md:mx-2"
        >
          ยกเลิก
        </button>
      </router-link>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      showCheckBill : false,
      searchTerm: "",
      searchResults: [],
      selectedTrips: [],
      nameTrip: "",
      // places : [],
    };
  },
  methods: {
    async performSearch() {
      try {
        const response = await axios.get("http://34.125.112.174:3001/places");
        const allTrips = response.data; // Assuming your data is in the 'data' property

        console.log("allTrips345: ", allTrips);

        // Filter trips based on the search term
        this.searchResults = allTrips.filter((trip) => {
          console.log("keysearch", this.searchTerm);
          console.log("key", trip);
          return (
            trip.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            trip.province.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
        });
        console.log("searchResults: ", this.searchResults);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    },
    addTrip() {
      console.log("Selected Trips: ", this.selectedTrips);
      console.log("Name Trip: ", this.nameTrip);
      const selectedTripsData = this.selectedTrips.map((trip) => ({
        description: trip.description,
        img: trip.img,
        name: trip.name,
        price: trip.price,
        province: trip.province,
        type: trip.type,
      }));
      console.log("selectedTripsData", selectedTripsData);
      if (this.selectedTrips.length === 0) {
        alert("Please select at least one trip.");
        return;
      }
      const trip = {
        selectedTrips: this.selectedTrips,
        nameTrip: this.nameTrip,
      };

      axios.post("http://34.125.112.174:3001/trip", trip).then((res) => {
        console.log("Response: ", res);
        console.log("Response: ", res.data);
        const tripId = res.data ? res.data.id : null;
        if (tripId) {
          alert("Trip added successfully!");
          this.$router.push({ path: `/listConfirm/${tripId}`, params: { tripId } });
        } else {
          alert("Unable to get trip ID from the response.");
        }
      });
    },

    toggleCheckBill() {
      this.showCheckBill = !this.showCheckBill;
    },
  },
};
</script>
