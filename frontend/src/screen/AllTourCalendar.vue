<template>
  <div id="app">
    <section class="text-center justify-center items-center bg-white py-5">
      <h5>Good Morning</h5>
      <div class="flex text-center justify-center">
        <h3 class="bg-[#C1CB9C] rounded-full px-3 my-3">{{ this.year }}</h3>
      </div>
      <div class="flex text-center justify-center">
        <h3 class="bg-[#C1CB9C] rounded-full px-3">{{ this.textmonth[this.month] }}</h3>
      </div>
    </section>
    <section>
      <div>
        <div class="my-4 rounded-lg">
          <!--calendar-->
          <div class="items-center justify-center bg-[#C1CB9C] rounded-lg">
            <div
              class="calendar flex flex-col justify-between bg-[#C1CB9C] rounded-3xl w-full"
              id="calendar"
            >
              <div class="month flex items-center justify-between">
                <i class="fa fa-angle-left prev" @click="prevdaymonth()"></i>

                <div id="datebook" class="date quotes text-black my-2"></div>

                <i class="fa fa-angle-right next" @click="nextdaymonth()"></i>
              </div>

              <div>
                <table class="headertext" style="width: 98%">
                  <thead>
                    <tr class="text-center weekdays">
                      <th class="text-center">S</th>
                      <th class="text-center">M</th>
                      <th class="text-center">T</th>
                      <th class="text-center">W</th>
                      <th class="text-center">T</th>
                      <th class="text-center">F</th>
                      <th class="text-center">S</th>
                    </tr>
                  </thead>

                  <tbody
                    class="numberday items-center justify-center text-center"
                    id="daybook"
                  ></tbody>
                </table>
              </div>
              <!--  <div
                    class="flex justify-center items-center"
                  >
                    <input type="date" class="input input-date text-center" style="width: 30%" />
                    <button class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="godayselect(0)">Go</button>
      
                    <button class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 m-3 todaybtn" @click="gototoday()">
                      Today
                    </button>
                  </div> -->
              <hr class="h-px my-4 border-0 bg-[#3A4646] m-5 opacity-25" />
            </div>
          </div>
          <!--event-->
          <div class="">
            <div
              v-for="ev in eventmovies"
              class="events flex flex-col"
              id="eventbook"
              :key="ev.event_id"
            >
              <ul>
                <li v-if="ev.appointment == ansdate">
                  {{ ev.event_name + " " + ev.start_time + "-" + ev.end_time }}
                </li>
              </ul>
            </div>
          </div>
          <div class="p-3">
            <DetailCard
            v-for="(place, index) in places"
            :key="place.id"
              :startdate=place.StartDate
              :enddate=place.EndDate
              :nametrip=place.Tour.nameTrip
              :numberplace=place.Tour.selectedTrips.length
              :alldataplace=place
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import DetailCard from "../components/DetailtourCard.vue";

export default {
  data() {
    return {
      places: [],
      today: "",
      month: 0,
      year: 0,
      findday: 0,
      events: "",
      dates: "",
      start_time: "",
      end_time: "",
      eventmovies: [],
      ansdate: "",
      user: null,
      startdate: "",
      selecttour: {},
      textmonth: ["January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"]
    };
  },
  created() {
    (this.today = new Date()),
      (this.month = new Date().getMonth()),
      (this.year = new Date().getFullYear()),
      this.fetchplace();
  },
  mounted() {
    this.gototoday();
  },
  components: {
    DetailCard: DetailCard,
  },
  methods: {
    shortHeader(name) {
      if (name.length > 14) {
        return name.substring(0, 14) + "...";
      }
      return name;
    },
    getallday() {
      //calendar

      const calendar = document.getElementById("calendar");
      var todaybtn = document.getElementsByClassName("todaybtn")[0];

      var today = this.today;
      let activityDay = "";
      var month = this.month; //use for index array
      var year = this.year;

      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      // adding day in calenday (last month day)
      let days = "";
      let count = 0;
      const firstday = new Date(year, month, 1);
      const lastday = new Date(year, month + 1, 0);
      const prevLastday = new Date(year, month, 0);
      console.log(prevLastday, lastday);
      const prevday = prevLastday.getDate();
      const lastdate = lastday.getDate();
      const day = firstday.getDay();
      const nextday = 7 - lastday.getDay() - 1;
      let date = document.getElementsByClassName("date")[0];
      let allday = document.getElementsByTagName("tbody")[0];

      // header month and year
      allday.innerHTML = "";
      date.innerHTML = months[month] + " " + year;
      console.log(month);

      console.log(today, month, year);

      // prev month to find day
      for (let i = day; i > 0; i--) {
        days += `<td class="day prev-date">${prevday - i + 1}</td>`;

        count++;
      }
      // current month
      for (let i = 1; i <= lastdate; i++) {
        if (count % 7 == 0) {
          let row = document.createElement("tr");
          row.classList.add("days", "text-center");
          console.log(row);
          row.innerHTML = days;
          console.log(row);
          allday.appendChild(row);
          days = "";
        }
        // if today
        if (
          i === new Date().getDate() &&
          year === new Date().getFullYear() &&
          month === new Date().getMonth()
        ) {
          activityDay = i;
          this.getactiveday(i);

          // if event found on today
          days += `<td class="day today active rounded-full bg-[#E5E6E1]">${i}</td>`;
        }
        // if event found on other day
        else {
          if (this.findday == 1 && i == today) {
            this.getactiveday(i);
            days += `<td class="day finding bg-[#E5E6E1] rounded-full">${i}</td>`;
            this.findday = 0;
          } else {
            days += `<td class="day">${i}</td>`;
          }
        }

        count++;
      }

      // next month to find day
      for (let i = 1; i <= nextday + 1; i++) {
        if (count % 7 == 0 || i == nextday + 1) {
          let row = document.createElement("tr");
          row.classList.add("days", "has-text-centered");
          row.innerHTML = days;
          allday.appendChild(row);
          days = "";
        }

        days += `<td class="day next-date">${i}</td>`;
        count++;
      }
    },
    prevdaymonth() {
      this.month -= 1;

      if (this.month < 0) {
        this.month = 11;
        this.year -= 1;
      }
      this.getallday();
    },
    nextdaymonth() {
      this.month += 1;

      if (this.month > 11) {
        this.month = 0;
        this.year += 1;
      }

      this.getallday();
    },
    gototoday() {
      this.today = new Date();
      this.month = this.today.getMonth();
      this.year = this.today.getFullYear();
      this.getallday();
    },
    godayselect(numberinx) {
      let dateval =
        document.getElementsByClassName("input-date")[numberinx].value;
      const valdate = dateval.split("-");
      this.today = valdate[2] * 1; //get index from split
      this.month = valdate[1] * 1 - 1; // use index to array
      this.year = valdate[0] * 1;
      this.findday = 1;
      let days = valdate[2] * 1;
      this.getallday();
      this.getactiveday(days);
    },
    getactiveday(date) {
      const day = new Date(this.year, this.month, date);
      const dayname = day.toString().split(" ")[0];
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      this.startdate =
        dayname + " " + date + " " + months[this.month] + " " + this.year;

      let ans = "";
      if (date < 10 && this.month + 1 < 10) {
        ans = this.year + "-0" + (this.month + 1) + "-0" + date;
      } else if (date < 10) {
        ans = this.year + "-" + (this.month + 1) + "-0" + date;
      } else if (this.month + 1 < 10) {
        ans = this.year + "-0" + (this.month + 1) + "-" + date;
      } else {
        ans = this.year + "-" + (this.month + 1) + "-" + date;
      }

      this.ansdate = ans;
    },
    putmodal(state) {
      const modal = document.getElementById("modal");

      if (state == "open") {
        modal.classList.add("is-active");
      } else {
        modal.classList.remove("is-active");
      }
    },
    async fetchplace() {
        console.log("place")
      try {
        
        const response =  await axios.get('http://localhost:4000/addtour');
        this.places = response.data; // Store the retrieved comments data in the 'comments' array
        this.countplace = this.places.length
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }
  },
};
</script>

<style>
.textsmall {
  font-family: "Roboto", sans-serif;
}

.headertext {
  font-family: "Prompt", sans-serif;
}

.quotes {
  font-family: "Mitr", sans-serif;
}

.calendar {
  position: relative;
  height: 100%;
}

.calendar .month {
  padding: 0 50px;
  text-transform: capitalize;
}

.calendar .month .prev,
.calendar .month .next {
  cursor: pointer;
}

.calendar .month .prev:hover,
.calendar .month .next:hover {
  color: hsl(0, 0%, 29%);
}

.calendar .weekdays {
  padding: 0 20px;
  font-size: 1rem;
  text-transform: capitalize;
}

.calendar .days {
  padding: 0 20px;
  margin-bottom: 20px;
}

.calendar .days .day {
  cursor: pointer;
}

.calendar .day:not(.prev-date, .next-date):hover {
  color: #fff;
  background-color: #826b5d;
}

.calendar .days .prev-date,
.calendar .days .next-date {
  color: #7f7f7f;
}

#calendar .days .active {
  position: relative;
  border: black;
  font-size: 1.5rem;
  color: white;
  background-color: #dda15e;
}

.calendar .days .today {
  font-size: 1.5rem;
  color: #fff;
}

.calendar .days .event {
  position: relative;
}

.calendar .days .event::after {
  content: "";
  position: absolute;
  bottom: 10%;
  left: 50%;
  width: 75%;
  height: 5px;
  border-radius: 30px;
  transform: translateX(-50%);
  background-color: #878895;
}

.calendar .active.event::after {
  background-color: #fff;
  bottom: 20%;
}

.calendar .active.event {
  padding-bottom: 20px;
}

.events {
  width: 100%;
  height: 70%;
  overflow-x: hidden;
  overflow-y: auto;
}

.events .event {
  width: 95%;
  cursor: pointer;
}

.events .event:hover {
  background-color: lightseagreen;
}
</style>
