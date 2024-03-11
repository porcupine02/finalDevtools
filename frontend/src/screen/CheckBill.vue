<template>
  <p class="title has-text-centered has-text-danger mt-4">Money Manage</p>
  <div class="column">
    <div class="is-medium tabs">
      <ul>
        <li class="tab is-active" @click="openTab('billList')">
          <a><i class="fa fa-shopping-basket mr-3"></i> Bill List</a>
        </li>
        <li class="tab" @click="openTab('people')">
          <a><i class="fa fa-user mr-3"></i> People</a>
        </li>
        <li class="tab" @click="openTab('total')">
          <a><i class="fa fa-info-circle mr-3"></i> Total</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="columns">
    <div class="container section">
      <!-- Menu List -->
      <div id="billList" class="content-tab">
        <div class="column is-8">
          <input
            type="text"
            class="input is-rounded"
            placeholder="รายการของคุณ"
            v-model="newListMenu"
          />
          <div class="has-text-right">
            <div class="button is-success my-3" @click="isActiveModal = true">
              เพิ่มรายการ
            </div>
          </div>
        </div>
        <!-- modal add list menu -->
        <div>
          <Modal :is-active.sync="isActiveModal" :title="newListMenu">
            <!-- Modal content goes here -->
            <input
              type="number"
              v-model="price"
              class="input has-text-centered"
            />
            <p class="has-text-centered text-xl m-1 mt-3">ใครหารบ้าง</p>

            <div class="columns is-multiline is-mobile">
              <div
                class="column is-6"
                v-for="(person, index) in people"
                :key="index"
              >
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    :id="'person_' + index"
                    :value="person.member"
                    v-model="selectedPeople"
                    class="form-checkbox h-5 w-5 mr-3"
                  />
                  <span class="text-xl">{{ person.member }}</span>
                </label>
              </div>
            </div>
            <div class="buttons is-centered">
              <button class="button" @click="closeModal()">Cancel</button>
              <button class="button is-success" @click="addMenu()">Add</button>
            </div>

            <!-- <div class="button" @click="closeModal()">add</div> -->
          </Modal>
        </div>

        <!-- display list menu -->
        <div class="column is-8">
          <a class="panel-block" v-for="(menu, index) in bills" :key="menu.id">
            <div class="flex justify-between items-center w-full text-xl">
              <!-- <div>{{ menu }}</div> -->
              <div class="w-1/4">
                {{ menu.title }}
                <p class="text-red-500">
                  {{ menu.price }}
                </p>
              </div>
              <div class="w-2/4">
                {{ menu.member.join(", ") }}

                <p class="text-red-500">
                  {{ (menu.price / menu.member.length).toFixed(2) }}
                </p>
              </div>
              <i
                class="fa fa-trash"
                aria-hidden="true"
                @click="deleteListMenu(index)"
              ></i>
            </div>
          </a>
        </div>
      </div>
      <!-- People -->
      <!-- <div id="customer" class="content-tab"> -->
      <div id="people" class="content-tab" style="display: none">
        <div class="column is-8">
          <input
            type="text"
            class="input is-rounded"
            placeholder="สมาชิกของคุณ"
            v-model="newMember"
          />
          <div class="has-text-right">
            <div class="button is-success my-3" @click="addMember()">
              เพิ่มสมาชิก
            </div>
          </div>
          <div class="column is-8">
            <a
              class="panel-block"
              v-for="(person, index) in people"
              :key="person.id"
            >
              <div class="flex justify-between items-center w-full text-xl">
                <div>{{ person.member }}</div>
                <i
                  class="fa fa-trash"
                  aria-hidden="true"
                  @click="deletePerson(index)"
                ></i>
              </div>
            </a>
          </div>
        </div>
      </div>
      <!-- Total -->
      <!-- <div id="customer" class="content-tab"> -->
      <div id="total" class="content-tab" style="display: none">
        <div class="column is-8" v-for="item in result">
          <div
            class="max-w-md mx-auto bg-green-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl "
          >
            <div class="md:flex">
              <div class="p-8">
                <p
                  href="#"
                  class="block text-xl leading-tight font-medium text-black"
                >
                  {{ item.member }}
                </p>
                <div
                  class="uppercase tracking-wide text-m text-indigo-500 font-semibold"
                >
                  {{ item.total }}
                </div>
                <p class="mt-2 text-gray-500">
                  {{ item.titles.join(", ") }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import axios from "axios";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      people: [],
      newMember: "",
      newListMenu: "",
      isActiveModal: false,
      listMenu: [],
      price: 0,
      selectedPeople: [],
      bills: [],
      result: [],
    };
  },
  created() {
    this.fetchBills();
    this.fetchMember();
  },
  methods: {
    async fetchBills() {
      try {
        console.log("fetch bills");
        const response = await axios.get("http://localhost:4000/bills");
        this.bills = response.data; // Store the retrieved comments data in the 'comments' array
        console.log(this.bills);
        this.countText = this.bills.length;
        console.log("bills data asdfasdf", this.bills[0].title);

        this.result = this.sumPricesByMember(this.people, this.bills);
        console.log("this.reslut", this.result);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
      console.log("data", this.bills[0].price);
    },
    async fetchMember() {
      try {
        console.log("fetch bills");
        const response = await axios.get("http://localhost:4000/memberBill");
        this.people = response.data; // Store the retrieved comments data in the 'comments' array
        console.log("this.people", this.people);
        this.countText = this.bills.length;
        console.log("bills data asdfasdf", this.bills[0]);

        // console.log("this.bills before function", this.bills);
        // this.result = this.sumPricesByMember(this.people, this.bills);
        console.log("this.reslut", this.result);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    },
    cal() {
      console.log("this is bills from data", this.bills);
      axios
        .post("http://localhost:4000/bills", { bills: this.bills })
        .then((response) => {
          console.log("POST request successful:", response.data);
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
          // Handle errors
        });
      this.fetchBills();
    },
    sumPricesByMember(memberList, billList) {
      const memberMap = {};
      billList.forEach((bill) => {
        bill.member.forEach((member) => {
          if (memberMap[member]) {
            memberMap[member].total += bill.price;
            memberMap[member].titles.push(bill.title);
          } else {
            memberMap[member] = {
              total: bill.price,
              titles: [bill.title],
            };
          }
        });
      });

      const result = memberList.map((memberObj) => ({
        member: memberObj.member,
        total: memberMap[memberObj.member]
          ? memberMap[memberObj.member].total
          : 0,
        titles: memberMap[memberObj.member]
          ? memberMap[memberObj.member].titles
          : [],
      }));

      return result;
    },
    addMember() {
      console.log("add member");
      if (this.newMember != "") {
        this.people.push(this.newMember);
        axios
          .post("http://localhost:4000/memberBill", { member: this.newMember })
          .then((response) => {
            console.log("POST request successful:", response.data);
            this.fetchMember();
          })
          .catch((error) => {
            console.error("Error making POST request:", error);
          });
        this.newMember = "";
      } else {
        alert("โปรดเพิ่มชื่อสมาชิก");
      }
    },
    addListMenu() {
      console.log("add ListMenu");
      if (this.newListMenu != "") {
        this.listMenu = {
          title: this.newListMenu,
          price: this.price,
          member: this.selectedPeople,
        };
        this.bills.push({
          title: this.newListMenu,
          price: this.price,
          member: this.selectedPeople,
        });
        this.newListMenu = "";
      } else {
        // alert("โปรดเพิ่มชื่อสมาชิก");
      }
    },
    addMenu() {
      this.isActiveModal = false;
      this.listMenu.push({
        title: this.newListMenu,
        price: this.price,
        member: this.selectedPeople,
      });
      console.log("list menu", this.listMenu);
      axios
        .post("http://localhost:4000/bills", { bills: this.listMenu })
        .then((response) => {
          console.log("POST request successful:", response.data);
          this.fetchBills();
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
      this.newListMenu = "";
      this.price = 0;
      this.selectedPeople = [];
      this.listMenu = [];
    },
    deletePerson(index) {
      console.log("delete menber");
      const memberID = this.people[index].id;
      console.log("this.people[index].id", memberID);
      axios
        .delete(`http://localhost:4000/memberBill/${memberID}`)
        .then((response) => {
          console.log("POST request successful:", response.data);
          this.fetchMember();
          this.people.splice(index, 1);
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    },
    deleteListMenu(index) {
      console.log("delete listMenu");
      this.listMenu.splice(index, 1);
      console.log("id id id id", this.bills[index].id);
      axios
        .delete(`http://localhost:4000/bill/${this.bills[index].id}`)
        .then((response) => {
          console.log("POST request successful:", response.data);
          this.newListMenu = "";
          this.price = 0;
          this.selectedPeople = [];
          this.fetchBills();
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    },

    closeModal() {
      this.isActiveModal = false;
    },

    openTab(tabName) {
      // Hide all content tabs
      const contentTabs = document.querySelectorAll(".content-tab");
      contentTabs.forEach((tab) => (tab.style.display = "none"));

      // Deactivate all tab links
      const tabLinks = document.querySelectorAll(".tab");
      tabLinks.forEach((tabLink) => tabLink.classList.remove("is-active"));

      // Show the selected content tab
      const selectedTab = document.getElementById(tabName);
      if (selectedTab) {
        selectedTab.style.display = "block";
      }

      // Activate the clicked tab link
      const clickedTab = document.querySelector(`[data-tab="${tabName}"]`);
      if (clickedTab) {
        clickedTab.classList.add("is-active");
      }
    },
  },
};
</script>
