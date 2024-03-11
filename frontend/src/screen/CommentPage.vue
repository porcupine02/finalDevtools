<script setup>


</script>

<template>
    <div class="m-10">
        <h1>Comments</h1>
        <div class="w-full  order-solid border-2 border-grey-500 p-2 mt-2 rounded">
            <div class="flex">
                <img class="object-cover w-10 h-10 rounded-full m-5"
                    src="https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5K33rPih0ekXpdjTYJZMA1xjXzItlZVde9muslF5HbRKeGtfS5w.jpg"
                    alt="">
                <h1 class="flex items-center">Flash</h1>
            </div>


            <textarea class=" w-full p-2" name="" id="" cols="30" rows="5" v-model="commentInput"></textarea>
            <h1>{{commentInput}}</h1>

            <hr>
            <div class="flex mt-2">
                <div class=" w-full flex  gap-2">
                    <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-2 rounded">add</button>
                    <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-2 rounded">add</button>
                    <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-2 rounded">add</button>
                </div>
                <div class=" w-full  flex justify-end">
                    <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded " @click="comment">Comment</button>
                </div>
            </div>

        </div>

        <div v-for="(comment, index) in comments" :key="index">

        
        <div class="w-full mt-10" v-if="index == 0">
            <div class="flex">
                <img class="object-cover w-10 h-10 rounded-full mr-5"
                    src="https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5K33rPih0ekXpdjTYJZMA1xjXzItlZVde9muslF5HbRKeGtfS5w.jpg"
                    alt="">
                <h1 class="flex items-center">{{ comment.name }}</h1>
            </div>
            <div class="w-full pt-5">
                    <h1>{{comment.text}}</h1>
            </div>

            <div class="flex gap-2 pt-5">
                <button class="bg-blue-500 hover:bg-blue-100 p-2"><</button>
                <button class="bg-blue-500 hover:bg-blue-100 p-2">></button>
                <h1 class="flex items-center text-sm">5 min</h1>
            </div>
        </div>

        <div class="w-full" v-show="showHiddenDiv2" v-if="index != 0">
            <div class="w-full mt-10">
                <div class="flex">
                    <img class="object-cover w-10 h-10 rounded-full mr-5"
                        src="https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5K33rPih0ekXpdjTYJZMA1xjXzItlZVde9muslF5HbRKeGtfS5w.jpg"
                        alt="">
                    <h1 class="flex items-center">{{comment.name}}</h1>
                </div>
                <div class="w-full pt-5">
                        <h1>{{ comment.text }}</h1>
                </div>
            
            
            
                <div class="flex gap-2 pt-5">
                    <button class="bg-blue-500 hover:bg-blue-100 p-2"><</button>
                    <button class="bg-blue-500 hover:bg-blue-100 p-2">></button>
                    <h1 class="flex items-center text-sm">5 min</h1>
                </div>
            </div>
           
        </div>

        </div>



            <button class="w-full mt-10 bg-gray-300 hover:bg-gray-200 p-2 rounded" @click="toggleHiddenDiv" v-if="countText > 1"> Load More</button>

    </div>

</template>

<script>

import axios from 'axios';

    export default {
  data() {
    return {
      showHiddenDiv2: false,
      
      commentInput: '',
      comments: [],
      countText : 0
    };
  },

  created() {
    // Fetch comments data when the component is mounted
    this.fetchComments();
  },
  methods: {
    toggleHiddenDiv() {
      this.showHiddenDiv2 = !this.showHiddenDiv2;
    },
  

    comment(){

        const data ={
            comment : this.commentInput
        }
        console.log("folk")
        axios.post('http://localhost:4000/comment', data)
        .then(response => {
          this.responseData = response.data;

          this.commentInput = ""
          console.log(this.responseData)
          this.fetchComments()
          
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    async fetchComments() {
        console.log("FOlk")
      try {
        
        const response =  await axios.get('http://localhost:4000/comment');
        this.comments = response.data; // Store the retrieved comments data in the 'comments' array
        console.log(this.comments)
        this.countText = this.comments.length
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }
  }
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
        padding-left: 1rem;
        /* Adjust as needed */
        padding-right: 1rem;
        /* Adjust as needed */
    }


}
</style>