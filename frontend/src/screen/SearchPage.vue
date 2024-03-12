<script setup>
// import HeaderWeb from '../components/HeaderWeb.vue'
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
    <HeaderWeb :toggleCheckBill="toggleCheckBill" :title="'Search'" v-if="!showCheckBill" />
    <div class="relative flex justify-center p-5" v-if="!showCheckBill">
      <input
        type="text"
        placeholder="Search"
        class="w-full border-[#DFDFDF] rounded-md pl-10 pr-4 py-4 focus:border-blue-500"
        v-model="searchQuery"
      />

      <div class="absolute inset-y-0 left-0 ml-[25px] pl-3 flex items-center">
        <i class="fa-solid fa-magnifying-glass" style="color: #6f7789"></i>
      </div>
    </div>

    <div class="relative" v-show="!showCheckBill">
      <div class="mx-5">
        <h1 class="text-[26px] font-bold text-[#121212]">Category</h1>
      </div>
      <div class="overflow-x-auto">
        <div class="flex gap-2 p-5">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="flex flex-col items-center"
            @click="filterCategory(item.cate)"
          >
            <img
              class="rounded-full w-[80px] h-[80px]"
              :src="item.imageUrl"
              alt=""
            />
            <div class="w-24 h-10 flex items-center justify-center">
              <h1>{{ item.name }}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="relative" v-if="!showCheckBill">
      <div class="flex items-center">
        <h1 class="text-[26px] font-bold text-black mx-5">Recommend</h1>
        <div class="w-full justify-end items-center p-5 flex">
          <router-link to="/listYourtrips"> <p>Trip</p> </router-link>
          <i class="fa-solid fa-chevron-right" style="color: #6f7789"> </i>
        </div>
      </div>

      <div class="flex flex-wrap justify-center m-5 grid grid-cols-2 gap-4">
        <div v-for="(item, index) in filteredItems" :key="index">
          <div
            class="w-[195px] h-[195px] rounded-[13px] overflow-hidden shadow-lg"
          >
            <div class="flex items-center justify-center">
              <img
                class="w-[180px] h-[119px] bg-cover rounded-[13px] flex items-center justify-center"
                :src="item.img"
              />
            </div>

            <div class="px-2 py-2">
              <div class="flex flex-row">
                <div class="font-bold text-[14px] mb-2 flex-initial">
                  {{ item.name }}
                </div>
                <div class="flex flex-row flex-auto text-center">
                  <i
                    class="fa-solid fa-star flex-auto"
                    style="color: #ee684a"
                  ></i>
                  <p class="text-[12px] text-[#6F7789]">4.8</p>
                </div>
              </div>

              <div class="flex flex-row flex-auto">
                <i class="fa-solid fa-location-dot" style="color: #ee684a"></i>
                <p class="text-[#6F7789] text-[15px] mx-1 text-nowrap">
                  {{ item.province }}
                </p>
              </div>
            </div>
            <!--
          <div class="px-6 py-4">
            <span
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              >sea
            </span>
          </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  // emits: ['showBill'],
  data() {
    return {
      searchQuery: "",
      responseData: "",
      selectedCategory: null,
      showCheckBill: false,
      items: [
        {
          imageUrl:
            "https://www.photoschoolthailand.com/wp-content/uploads/2020/02/Beach-photography_2.jpg",
          name: "all",
          cate: "",
        },
        {
          imageUrl:
            "https://www.photoschoolthailand.com/wp-content/uploads/2020/02/Beach-photography_2.jpg",
          name: "sea",
          cate: "sea",
        },
        {
          imageUrl:
            "https://www.photoschoolthailand.com/wp-content/uploads/2020/02/Beach-photography_2.jpg",
          name: "moutain",
          cate: "moutain",
        },
      ],
      items2: [],
    };
  },
  created() {
    

    axios
      .get("http://localhost:4000/places")
      .then((response) => {
        this.responseData = response.data;
        this.items2 = this.responseData;
        console.log(this.responseData);

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },

  methods: {
    filterCategory(category) {
      console.log(category);
      this.selectedCategory = category.toLowerCase();
    },
    toggleCheckBill() {
      this.showCheckBill = !this.showCheckBill;
    },
  },

  computed: {
    filteredItems() {
      return this.items2.filter((item) => {
        const matchesSearch = item.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()) ||  item.province.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesCategory =
          !this.selectedCategory ||
          item.category.toLowerCase() === this.selectedCategory.toLowerCase();

        // const matchesProvince = item.province.toLowerCase().includes(this.searchQuery.toLowerCase());

        return matchesSearch && matchesCategory;
      });
    },
  },
};
</script>

<style>
/* Hide scrollbar for all browsers */
::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
html {
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE and Edge */
}

/* Responsive adjustments for smaller screens */
@media (max-width: 414px) {
  .container {
    padding-left: 1rem; /* Adjust as needed */
    padding-right: 1rem; /* Adjust as needed */
  }
}
</style>
