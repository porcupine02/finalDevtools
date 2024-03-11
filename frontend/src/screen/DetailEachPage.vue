<template>
  <div id="app">
    <div class="bg-white items-center justify-center py-5">
      <h4 class="text-2xl text-center justify-center font-semibold text-[#3A4646]">Tour details</h4>
      <h4 class="text-xl text-center justify-center font-semibold text-[#3A4646]">{{ this.detail.Tour.nameTrip }}</h4>
      <div class="flex items-center justify-center">
        <div class=" bg-[#C1CB9C] rounded-full p-1 w-4/5">
        <h4 class="text-base text-center justify-center text-[#3A4646]">{{ this.detail.StartDate }} - {{ this.detail.EndDate }}</h4>
      </div>
      </div>
    </div>
    <div
      class="bg-[#C1CB9C] items-center justify-center rounded-lg h-full p-4"
    >
      <div class="bg-[#3A4646] rounded-2xl p-2 justify-center items-center text-center" v-for="(eachtrip, index) in this.detail.Tour.selectedTrips">
        <div class="rounded-lg">
          <img
            class="w-full rounded-lg h-44"
            :src="eachtrip.img"
          />
        </div>
        <h4 class="justify-center text-[#E5E6E1] text-lg">{{ eachtrip.name }}</h4>
        <h4 class="justify-center text-[#E5E6E1]">{{ eachtrip.description }}</h4>
        <div>
          <i class="fa-solid fa-location-dot text-[#E5E6E1]"></i>
          <label class="date text-[#E5E6E1] pl-2">{{ eachtrip.province }}</label>
        </div>
        <h4 class="justify-center text-[#E5E6E1]">{{ eachtrip.price }} ฿</h4>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    data() {
      return {
        detail: {}
      }
    },
    created() {
      this.detail = JSON.parse(this.$route.params.alldata)
    }
  };
</script>

<style>

</style>
