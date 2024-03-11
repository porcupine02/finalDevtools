<template>
  <div class="bg-[#3A4646] flex flex-row p-2 rounded-lg">
    <div class="basis-1/2">
      <img
        class="w-full rounded-lg h-36"
        src="https://cdn.discordapp.com/attachments/914474333273989140/1216580080642429031/Scene.._1_1.png?ex=6600e77e&is=65ee727e&hm=4f058d5f479577a204a6f320be6ea031d245ff044ebaf86d84a74de65273c94d&"
      />
    </div>
    <div class="basis-1/2 justify-center pl-3">
      <div class="border border-[#C1CB9C] rounded-full p-1 text-center">
        <h4 class="justify-center text-white text-xs">Start : {{ startdate }}</h4>
        <h4 class="justify-center text-white text-xs">End : {{ enddate }}</h4>
      </div>
      <div class="mt-1">
        <h4 class="justify-center text-white text-center">{{ nametrip }}</h4>
      </div>
      <div class="text-center">
        <i class="fa-solid fa-map text-white"></i>
        <label class="date text-white p-2">{{ numberplace }} places</label>
      </div>
      <div class="pt-3 text-white text-center justify-center items-center flex">
        <button
          type="submit"
          class="bg-[#C1CB9C] text-white text-sm  tracking-wider block w-3/4 rounded-full"
        >
          <RouterLink :to="{name: 'Detail', params: {alldata: JSON.stringify(this.alldataplace)}}">Read More</RouterLink>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    props: {
      startdate: {
        type: String,
        default: ""
      },
      enddate: {
        type: String,
        default: ""
      },
      nametrip: {
        type: String,
        default: ""
      },
      numberplace: {
        type: Number,
        default: ""
      },
      alldataplace: {
        type: Object,
        default: () => ({})
      }
    }
  };

</script>
