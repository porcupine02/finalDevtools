<template>
  <div class="flex flex-col min-h-screen bg-white">
    <div class="flex flex-1 items-center justify-center">
      <div class="">
        <div class="text-center">
          <h1 class="text-[39px] text-black uppercase">Login</h1>
          <div class="flex items-center justify-center mb-2">
            <img src="@/assets/rafiki.png" alt="" />
          </div>
          <p class="text-black text-[14px] mb-8">
            Plan your tour and forget, we will remind you in advance!
          </p>
          <div class="py-2 text-left">
            <input
              type="text"
              class="border-2 border-gray-300 focus:outline-none bg-none block w-full py-2 px-4 rounded-lg focus:border-gray-700"
              placeholder="Email"
              v-model="email"
            />
          </div>
          <div class="py-2 text-left">
            <input
              type="password"
              class="border-2 border-gray-300 focus:outline-none block w-full py-2 px-4 rounded-lg focus:border-gray-700"
              placeholder="Password"
              v-model="password"
            />
          </div>
          <div class="pt-10">
            <button
              type="submit"
              class="bg-[#C1CB9C] text-[#3A4646] tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-[#C2D189]"
              @click="login"
            >
              Get started
            </button>
          </div>
          <p class="text my-2 flex flex-row items-center justify-center">
            Don't have an account yet?
            <router-link to="/register">
              <p class="text-[#808000] ml-2">Register</p></router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      responseData: [],
    };
  },

  methods: {
    login() {
      const data = {
        email: this.email,
        password: this.password,
      };

      axios
        .post("http://localhost:4000/login", data)
        .then((response) => {
          this.responseData = response.data;

          const token = this.responseData.email;
          localStorage.setItem("token", token);
          this.$swal({
            title: "Login Success",
            icon: "success",
          });

          console.log(this.responseData);
          this.$router.push("/");
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          this.$swal({
            title: "Login Failed",
            text: "Invalid email or password",
            icon: "error",
          });
        });
    },
  },
};
</script>

<style></style>
