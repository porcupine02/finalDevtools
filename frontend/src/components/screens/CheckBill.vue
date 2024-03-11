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
                    :value="person"
                    v-model="selectedPeople"
                    class="form-checkbox h-5 w-5 mr-3"
                  />
                  <span class="text-xl">{{ person }}</span>
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
          <a
            class="panel-block"
            v-for="(menu, index) in listMenu"
            :key="menu.id"
          >
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
                <div>{{ person }}</div>
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
        <div class="column is-8">
          <div
            class="max-w-md mx-auto bg-green-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl my-3"
          >
            <div class="md:flex">
              <div class="p-8">
                <p
                  href="#"
                  class="block mt-1 text-xl leading-tight font-medium text-black"
                  >Name</p
                >
                <div
                  class="uppercase tracking-wide text-m text-indigo-500 font-semibold"
                >
                  Price
                </div>
                <p class="mt-2 text-gray-500">
                  รายการที่กินไปมีอะไรบ้าง
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  dignissim magna eu sem convallis, ac mattis lectus dapibus.
                </p>
              </div>
            </div>
          </div>
          <div
            class="max-w-md mx-auto bg-green-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl my-3"
          >
            <div class="md:flex">
              <div class="p-8">
                <p
                  href="#"
                  class="block mt-1 text-xl leading-tight font-medium text-black"
                  >Name</p
                >
                <div
                  class="uppercase tracking-wide text-m text-indigo-500 font-semibold"
                >
                  Price
                </div>
                <p class="mt-2 text-gray-500">
                  รายการที่กินไปมีอะไรบ้าง
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  dignissim magna eu sem convallis, ac mattis lectus dapibus.
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
import Modal from "../Modal.vue";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      people: ["fern", "fern2", "fern3"],
      newMember: "",
      newListMenu: "",
      isActiveModal: false,
      listMenu: [],
      price: 0,
      selectedPeople: [],
    };
  },
  methods: {
    addMember() {
      console.log("add member");
      if (this.newMember != "") {
        this.people.push(this.newMember);
        this.newMember = "";
      } else {
        alert("โปรดเพิ่มชื่อสมาชิก");
      }
    },
    addListMenu() {
      console.log("add ListMenu");
      if (this.newListMenu != "") {
        this.listMenu.push(this.newListMenu);
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
      this.newListMenu = "";
      console.log("list menu", this.listMenu);
    },
    deletePerson(index) {
      console.log("delete menber");
      this.people.splice(index, 1);
    },
    deleteListMenu(index) {
      console.log("delete listMenu");
      this.listMenu.splice(index, 1);
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
