<template>
  <div class="">
    <transition name="fade">
      <div id="emberloader" v-show="doLoad">
        <emberLoader></emberLoader>
      </div>
    </transition>
    <div class="side">
      <sidebar></sidebar>
    </div>
    <transition name="fadeMain">
      <!-- Content -->
      <div class="myContent">
        <!-- Title -->
        <div class="row titleHead ml-2 mr-2">
          <span class="titleHeadText navHeaderMoreOption">
          <i class="material-icons iconAlign mr-1 bckArrow" id="arrowBack" @click="backMainMenu">arrow_back</i>
          <transition name="fadeMain">
            <span v-if="paymentList">Reports</span>
          </transition>
          <transition name="fadeMain">
            <span v-if="!paymentList">Payment Detail</span>
          </transition>
          <i class="material-icons iconAlign float-right">more_vert</i></span>
        </div>
        <!-- End Title -->
        <div class="bgDiv">
          <div class="row d-flex">
            <div class="col-12 col-md-6 col-lg-3 p-2">
              <div class="card border-0 m-2">
                <div class="card-body pb-0">
                  <div class="row">
                    <div class="col-5">
                      <i class="material-icons biggerFont">done_all</i>
                    </div>
                    <div  class="col-7">
                      <p class="float-right m-0">Completed Payment</p>
                      <br />
                      <h1 class="p-0 m-0 float-right">{{ stats.completed_payments }}/{{ stats.total_payments }}</h1>
                    </div>
                    <div  class="col-12 mt-1 border-top p-1 pl-2">
                      <i class="material-icons text-secondary iconAlign2">date_range</i>
                      <small class="text-secondary ml-1">{{ now }}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-3 p-2">
              <div class="card border-0 m-2">
                <div class="card-body pb-0">
                  <div class="row">
                    <div class="col-5">
                      <i class="material-icons biggerFont">people</i>
                    </div>
                    <div  class="col-7">
                      <p class="float-right m-0">Brand Specialist</p>
                      <br />
                      <h1 class="p-0 m-0 float-right">{{ stats.total_agents }}</h1>
                    </div>
                    <div  class="col-12 mt-1 border-top p-1 pl-2">
                      <i class="material-icons text-secondary iconAlign2">date_range</i>
                      <small class="text-secondary ml-1">{{ now }}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="ccol-12 col-md-6 col-lg-3 p-2">
              <div class="card border-0 m-2">
                <div class="card-body pb-0">
                  <div class="row">
                    <div class="col-5">
                      <i class="material-icons biggerFont">star</i>
                    </div>
                    <div  class="col-7">
                      <p class="float-right m-0">Team Leader</p>
                      <br />
                      <h1 class="p-0 m-0 float-right">{{ stats.total_tl }}</h1>
                    </div>
                    <div  class="col-12 mt-1 border-top p-1 pl-2">
                      <i class="material-icons text-secondary iconAlign2">date_range</i>
                      <small class="text-secondary ml-1">{{ now }}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-3 p-2">
              <div class="card border-0 m-2">
                <div class="card-body pb-0">
                  <div class="row">
                    <div class="col-5">
                      <i class="material-icons biggerFont">store</i>
                    </div>
                    <div  class="col-7">
                      <p class="float-right m-0">Store</p>
                      <br />
                      <h1 class="p-0 m-0 float-right">{{ stats.total_branch }}</h1>
                    </div>
                    <div  class="col-12 mt-1 border-top p-1 pl-2">
                      <i class="material-icons text-secondary iconAlign2">date_range</i>
                      <small class="text-secondary ml-1">{{ now }}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="card">
                <div class="card-body">
                  <div class="row d-flex">
                    <div class="col-12" v-show="srchPPChoosen === ''">
                      <small class="text-primary">Search:</small>
                    </div>
                    <div class="col-12" v-show="srchPPChoosen !== ''">
                      <small class="mb-3">
                        <span class="text-primary clickable2" @click="clearAll">CLEAR</span>
                         / 
                        <span class="text-primary clickable2" @click="isSearchingFor = 'pp'">{{ srchPPChoosen }}</span>
                        <span v-show="srchStoreChoosen !== ''">
                           / 
                          <span  class="text-primary clickable2" @click="isSearchingFor = 'store'">{{ srchStoreChoosen }}</span>
                        </span>
                      </small>
                    </div>
                    <div class="col-12" v-show="srchPPChoosen === ''">
                      <div class="eachInput d-flex flex-row">
                        <div class="input-group-prepend">
                          <div class="input-group-text customLabel customLabelDate text-left">Payment <br />Period</div>
                        </div>
                        <div class="input-group txtLabels">
                          <datetime input-class="form-controlCustom cstmTextDate agentDob" class="dateStyle w-100" placeholder="enter payment period" name="birth date" v-model="srchPP">></datetime>
                        </div>
                      </div>
                    </div>
                    <div class="col-12" v-show="srchPPChoosen !== ''">
                      <div class="eachInput">
                        <div class="input-group txtLabels">
                          <div class="input-group-prepend">
                            <div class="input-group-text customLabel text-left">Store</div>
                          </div>
                          <input type="text" class="form-control customText"  placeholder="enter store name" name="work days" v-model="srchStore" ref="txtStore" @keyup.enter="searchStore(srchStore)" autocomplete="off">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12" v-show="isSearchingFor === 'pp'">
              <div class="card mt-3">
                <div class="card-body">
                  <h5 class="card-title"><i class="large material-icons iconAlign2">view_headline</i> Search Result</h5>
                  <ul class="searchUL pl-1">
                    <li v-show="ppNoResult !== ''" class="col-12 p-1 pt-3 pb-3 border-bottom border-top text-secondary text-danger">
                      <i class="large material-icons iconAlign2">do_not_disturb</i> {{ ppNoResult }}
                    </li>
                    <li v-show="ppNoResult === ''" class="col-12 eachSearchResult p-1 pt-3 pb-3 border-bottom border-top"
                      v-for="item in ppList"
                      @click="ppChoosen(item.id, item.starting_date, item.end_date)">
                      <i class="large material-icons iconAlign2">chevron_right</i> {{ item.starting_date }} to {{ item.end_date }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-12" v-show="isSearchingFor === 'store' && srchStore.length > 1">
              <div class="card mt-3">
                <div class="card-body">
                  <h5 class="card-title"><i class="large material-icons iconAlign2">view_headline</i> Search Result</h5>
                  <ul class="searchUL pl-1">
                    <li v-show="storeNoResult !== ''" class="col-12 p-1 pt-3 pb-3 border-bottom border-top text-secondary text-danger">
                      <i class="large material-icons iconAlign2">do_not_disturb</i> {{ storeNoResult }}
                    </li>
                    <li v-show="isStoreSearching">Searching . . .</li>
                    <li class="col-12 eachSearchResult p-1 pt-3 pb-3 border-bottom border-top"
                    v-for="item in storeList"
                    @click="storeChoosen(item.id, item.branch_name)"
                     :class="{ 'text-secondary': item.is_active === '0' }">
                      <i class="large material-icons iconAlign2">chevron_right</i> {{ item.branch_name }} <i class="large material-icons iconAlign2" v-show="item.is_active === '0'">healing</i>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-12" v-show="isSearchingFor === 'payments'">
              <div class="card p-4 mt-3">
                <div class="w-25 m-1 ml-auto">
                  <button type="button" class="btn btn-primary float-right" @click="print">PRINT REPORT</button>
                </div>
                <div class="table-responsive style-27">
                  <table class="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th colspan="2" class="bg-gray"></th>
                        <th colspan="1" class="bg-gray">Duty</th>
                        <th colspan="5" class="bg-gray text-center">Rate</th>
                        <th colspan="1" class="bg-gray"></th>
                        <th colspan="1" class="bg-gray">Worked</th>
                        <th colspan="8" class="bg-gray text-center">Premium Benefits</th>
                        <th colspan="1" class="bg-gray"></th>
                        <th colspan="3" class="bg-gray text-center">Contributions</th>
                        <th colspan="2" class="bg-gray text-center">Loans</th>
                        <th colspan="2" class="bg-gray text-center">CA</th>
                        <th colspan="1" class="bg-gray text-center">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="col"><small>Name</small></th>
                        <th scope="col"><small>Title</small></th>
                        <th scope="col"><small>Days</small></th>
                        <th scope="col"><small>WD</small></th>
                        <th scope="col"><small>OT</small></th>
                        <th scope="col"><small>DRD</small></th>
                        <th scope="col"><small>RH</small></th>
                        <th scope="col"><small>SH</small></th>
                        <th scope="col"><small>Allowances</small></th>
                        <th scope="col"><small>Amount</small></th>
                        <th scope="col"><small>OT</small></th>
                        <th scope="col"><small>Amount</small></th>
                        <th scope="col"><small>DRD</small></th>
                        <th scope="col"><small>Amount</small></th>
                        <th scope="col"><small>RH</small></th>
                        <th scope="col"><small>Amount</small></th>
                        <th scope="col"><small>SH</small></th>
                        <th scope="col"><small>Amount</small></th>
                        <th scope="col"><small>Adjustment</small></th>
                        <th scope="col"><small>SSS</small></th>
                        <th scope="col"><small>PagIbig</small></th>
                        <th scope="col"><small>Phealth</small></th>
                        <th scope="col"><small>SSS</small></th>
                        <th scope="col"><small>PagIbig</small></th>
                        <th scope="col"><small>CA</small></th>
                        <th scope="col"><small>Balance</small></th>
                        <th scope="col"><small>Received</small></th>
                      </tr>
                      <tr v-for="item in payments">
                        <td>{{ item.first_name }} {{ item.last_name }}</td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.work_days }}</td>
                        <td>{{ (Number(item.rate)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
                        <td>{{ (((((Number(item.ot_rates) / 100)  * Number(item.rate)) + Number(item.rate)) / 8)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
                        <td>{{ ((item.rest_day_rate / 100)  * item.rate).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
                        <td>{{ ((item.regular_holiday_rate / 100)  * item.rate).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
                        <td>{{ ((item.special_holiday_rate / 100)  * item.rate).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
                        <td>{{ (Number(item.allowance)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
                        <td>{{ (item.work_days  * item.rate).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
                        <td>{{ item.ot_hours }}</td>
                        <td>{{ (((((Number(item.ot_rates) / 100)  * Number(item.rate)) + Number(item.rate)) / 8) * Number(item.ot_hours)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
                        <td>{{ item.rest_days }}</td>
                        <td>{{ (((item.rest_day_rate / 100)  * item.rate) * item.rest_days).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
                        <td>{{ item.regular_holiday }}</td>
                        <td>{{ (((item.regular_holiday_rate / 100)  * item.rate) * item.regular_holiday).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
                        <td>{{ item.special_holiday }}</td>
                        <td>{{ (((item.special_holiday_rate / 100)  * item.rate) * item.special_holiday).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
                        <td>{{ (Number(item.adjustments)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
                        <td>{{ (Number(item.sss)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
                        <td>{{ (Number(item.pag_ibig)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
                        <td>{{ (Number(item.phil_health)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
                        <td>{{ (Number(item.sss_loan_deduction)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
                        <td>{{ (Number(item.pi_loan_deduction)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
                        <td>{{ (Number(item.deduction_rate)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
                        <td>{{ (Number(item.ca_balance)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
                        <td>{{ (Number(item.total_paid)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
                      </tr>
                      <tr>
                        <td colspan="25"><small></small></td>
                        <td><small> Total</small></td>
                        <td><small>{{ (Number(totalPaid)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</small></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div id="print" class="w-100 p-0 m-0" >
      <div class="row d-flex m-1 style-27">
        <div class="col-6 pl-2">
          <h3>Solar Ace Premium Products Incorporated</h3>
          <p>{{ srchStoreChoosen }}</p>
        </div>
        <div class="col-6">
          <p>Payment Period: {{ srchPPChoosen }}</p>
        </div>
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th colspan="2" class="bg-gray"></th>
              <th colspan="1" class="bg-gray">Duty</th>
              <th colspan="5" class="bg-gray text-center">Rate</th>
              <th colspan="1" class="bg-gray"></th>
              <th colspan="1" class="bg-gray">Worked</th>
              <th colspan="8" class="bg-gray text-center">Premium Benefits</th>
              <th colspan="1" class="bg-gray"></th>
              <th colspan="3" class="bg-gray text-center">Contributions</th>
              <th colspan="2" class="bg-gray text-center">Loans</th>
              <th colspan="2" class="bg-gray text-center">CA</th>
              <th colspan="1" class="bg-gray text-center">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="col"><small>Name</small></th>
              <th scope="col"><small>Title</small></th>
              <th scope="col"><small>Days</small></th>
              <th scope="col"><small>WD</small></th>
              <th scope="col"><small>OT</small></th>
              <th scope="col"><small>DRD</small></th>
              <th scope="col"><small>RH</small></th>
              <th scope="col"><small>SH</small></th>
              <th scope="col"><small>Allowance</small></th>
              <th scope="col"><small>Amount</small></th>
              <th scope="col"><small>OT</small></th>
              <th scope="col"><small>Amount</small></th>
              <th scope="col"><small>DRD</small></th>
              <th scope="col"><small>Amount</small></th>
              <th scope="col"><small>RH</small></th>
              <th scope="col"><small>Amount</small></th>
              <th scope="col"><small>SH</small></th>
              <th scope="col"><small>Amount</small></th>
              <th scope="col"><small>Adjustment</small></th>
              <th scope="col"><small>SSS</small></th>
              <th scope="col"><small>PagIbig</small></th>
              <th scope="col"><small>Phealth</small></th>
              <th scope="col"><small>SSS</small></th>
              <th scope="col"><small>PagIbig</small></th>
              <th scope="col"><small>CA</small></th>
              <th scope="col"><small>Balance</small></th>
              <th scope="col"><small>Received</small></th>
            </tr>
            <tr v-for="item in payments">
              <td>{{ item.first_name }} {{ item.last_name }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.work_days }}</td>
              <td>{{ (Number(item.rate)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
              <td>{{ (((((Number(item.ot_rates) / 100)  * Number(item.rate)) + Number(item.rate)) / 8)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
              <td>{{ ((item.rest_day_rate / 100)  * item.rate).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
              <td>{{ ((item.regular_holiday_rate / 100)  * item.rate).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
              <td>{{ ((item.special_holiday_rate / 100)  * item.rate).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
              <td>{{ (Number(item.allowance)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
              <td>{{ (item.work_days  * item.rate).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
              <td>{{ item.ot_hours }}</td>
              <td>{{ (((((Number(item.ot_rates) / 100)  * Number(item.rate)) + Number(item.rate)) / 8) * Number(item.ot_hours)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
              <td>{{ item.rest_days }}</td>
              <td>{{ (((item.rest_day_rate / 100)  * item.rate) * item.rest_days).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
              <td>{{ item.regular_holiday }}</td>
              <td>{{ (((item.regular_holiday_rate / 100)  * item.rate) * item.regular_holiday).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
              <td>{{ item.special_holiday }}</td>
              <td>{{ (((item.special_holiday_rate / 100)  * item.rate) * item.special_holiday).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
              <td>{{ (Number(item.adjustments)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
              <td>{{ (Number(item.sss)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
              <td>{{ (Number(item.pag_ibig)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
              <td>{{ (Number(item.phil_health)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
              <td>{{ (Number(item.sss_loan_deduction)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
              <td>{{ (Number(item.pi_loan_deduction)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
              <td>{{ (Number(item.deduction_rate)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
              <td>{{ (Number(item.ca_balance)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
              <td>{{ (Number(item.total_paid)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</td>
            </tr>
            <tr>
              <td colspan="25"><small></small></td>
              <td><small> Total</small></td>
              <td><small>{{ (Number(totalPaid)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","}}</small></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import sidebar from '@/components/web/Sidebar.vue'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import emberLoader from '@/components/emberLoader.vue'
import axios from 'axios'
export default {
  components: {
    sidebar,
    Datetime,
    emberLoader
  },
  name: 'Report',
  data: function () {
    return {
      paymentList: true,
      doLoad: false,
      stats: [],
      srchPP: '',
      srchTL: '',
      srchStore: '',
      isSearchingFor: '',
      ppList: [],
      storeList: [],
      choosenPPID: '',
      srchPPChoosen: '',
      srchStoreChoosen: '',
      ppNoResult: '',
      storeNoResult: '',
      isStoreSearching: false,
      choosenStoreID: '',
      payments: [],
      otTotal: 0,
      totalPaid: 0
    }
  },
  created: function () {
    this.showCards()
  },
  ready:function(){
    ppChange();
  },
  computed: {
    now () {
      let date = new Date()
      let hours = date.getHours()
      let minutes = date.getMinutes()
      let ampm = hours >= 12 ? 'pm' : 'am'
      hours = hours % 12
      hours = hours ? hours : 12 // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes
      let strTime = hours + ':' + minutes + ' ' + ampm
      return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime
    }
  },
  watch: {
    srchPP: function (val, old) {
      if(val !== old && val !== '') {
        this.srchPPChoosen = ''
        this.isSearchingFor = 'pp'
        this.srchTL = ''
        this.srchStore = ''
        this.searchPP(val)
      }
    },
    srchStore: function (val, old) {
      this.storeNoResult = ''
      if(val.length > 1 && val !== old && val !== '') {
        this.searchStore(val)
      } else {
        this.storeList = []
      }
    }
  },
  methods: {
    backMainMenu () {
      this.$router.push('/dashboard')
    },
    showCards (id) {
      this.doLoad = true
      let self = this
      axios.get('api/cards/' + id).then(response => {
        self.stats = response.data.data
        if(id === '0') {
          self.username = 'Admin'
        } else {
          self.username = response.data.data.first_name
        }
        self.doLoad = false
      }).catch(error => {
        console.log(error)
      })
    },
    searchPP (txtSearch) {
      this.doLoad = true
      let self = this
      let data = {
        payment_period: txtSearch
      }
      axios.post('api/reports/search/pp', data).then(response => {
        if(response.data.status === 'success') {
          self.ppList = response.data.data
          self.ppNoResult = ''
          self.doLoad = false
        } else {
          self.ppNoResult = 'No result found'
          self.doLoad = false
        }
      }).catch(error => {
        console.log(error)
      })
    },
    ppChoosen (id, start, end) {
      this.choosenStoreID = ''
      this.srchTLChoosen = ''
      this.isSearchingFor = ''
      this.choosenPPID = id
      this.srchPPChoosen = start + ' to ' + end
      this.$nextTick(() => {
        this.$refs.txtStore.focus()
      })
    },
    searchStore (txtSearch) {
      this.storeList = []
      this.isStoreSearching = true
      let self = this
      let data = {
        store_name: txtSearch
      }
      axios.post('api/reports/search/store', data).then(response => {
        self.isSearchingFor = 'store'
        if(response.data.status === 'success') {
          self.storeList = response.data.data
          self.isStoreSearching = false
          self.storeNoResult = ''
        } else {
          self.isStoreSearching = false
          self.storeNoResult = 'No result found'
        }
      }).catch(error => {
        console.log(error)
      })
    },
    storeChoosen (id, name) {
      this.doLoad = true
      this.srchStoreChoosen = name
      this.choosenStoreID = id
      let data = {
        pp_id: this.choosenPPID,
        store_id: id
      }
      let self = this
      axios.post('api/reports/search/agents', data).then(response => {
        self.payments = []
        self.isSearchingFor = 'payments'
        if(response.data.status === 'success') {
          self.payments = response.data.data
          let x = 0;
          self.payments.forEach(function(entry) {
            x = Number(x) + Number(entry.total_paid)
          });
          self.totalPaid = x
        } else {
        }
        this.doLoad = false
      }).catch(error => {
        console.log(error)
      })
    },
    clearAll () {
      this.isSearchingFor = ''
      this.srchPPChoosen = ''
      this.srchPP = ''
      this.srchStore = ''
    },
    print () {
      window.print();
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* Until Title */
  .myContent {
    padding: 10px;
    padding-left: 5px;
    padding-right: 5px;
    background-color: #F1F9FF;
    font-family: Arial
  }
  @media (min-width: 1px) {
    .myContent {
      margin-top: 0;
    }
    .bgDiv {
      background-color: white;
      padding: 30px;
      margin-left: 8px;
      margin-right: 8px;
      padding-bottom: 0;
      margin-top: 0;
      margin-bottom: 0;
      padding-top: 5px;
    }
    .titleHead {
      background-color: white;
    }
  }
  @media (min-width: 42em) {
    .myContent {
      margin-left: 4em;
      margin-top: 0px;
    }
  }
  @media (min-width: 992px) {
    .bgDiv {
      background-color: #F1F9FF;
      padding-bottom: 40px;
      padding: 15px;
    }
    .titleHead {
      background-color: #F1F9FF;
    }
  }
  @media (min-width: 1600px) {
    .myContent {
      margin-left: 15em;
      margin-top: 0px;
    }
  }
  .titleHead {
    height: 30px;
    border: 1px solid #79C0FD;
  }
  .iconAlign {
    vertical-align: middle;
  }
  .titleHeadText {
    color: #2699FB;
    font-size: 18px;
    font-weight: bold;
  }
  .navHeaderMoreOption {
    width: 100%;
  }
  .bckArrow {
    cursor: pointer;
  }
  /* End Until Title */
  /* Search */
  .searchRow {
    font-size: 14px;
    color: #2699FB;
    margin-bottom: -10px;
  }  .txtSearch {
    border: 1px solid #BCE0FD;
    border-radius: 0;
    font-size: 14px;
    margin-top: 6px;
    width: 100%;
    margin: auto;
    height: 50px !important;
    margin-left: 0px;
    z-index: 0;
    float: none;
  }
  .btnSearch {
    background-color: #2699FB;
    color: white;
    font-size: 14px;
    font-weight: 700;
    height: 40px;
    width: 100%;
    margin-top: 3px;
  }
  .buttonRow {
    padding: 0;
  }
  .switch {
    position: relative;
    display: inline-block;
    width: 52px;
    height: 26px;
  }

  .switch input { 
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #2196F3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
  .toggleDiv {
    text-align: center;
  }
  /* End Search */
  /* Payment List */
  @media (min-width: 1px) {
    .listRow {
      height: calc(100vh - 121px);
      max-height: 500px;
      padding: 0;
      background-color: none;
      min-height: 468px;
    }
    .scrollable {
      padding-right: 0px;
    }
    .hiddenNextLine {
      display: block;
      height: 0px;
      width: 0px;
      margin-top: -8px;
    }
    .listDescription {
      float: none;
      font-size: 10px;
    }
    .divPayPeriod {
      background-color: #F1F9FF;
    }
    .hideLg {
      display: block;
    }
  }
  @media (min-width: 992px) {
    .listRow {
      border: 1px solid #4EABFB;
      border-radius: 5px;
      height: calc(100vh - 121px);
      max-height: none;
      padding-top: 24px;
      padding-bottom: 24px;
      padding-left: 12px;
      padding-right: 6px;
      background-color: white;
    }
    .scrollable {
      padding-right: 10px;
    }
    .hiddenNextLine {
      display: none;
    }
    .listDescription {
      float: right;
      font-size: 14px;
    }
    .divPayPeriod {
      background-color: white;
    }
    .hideLg {
      display: none;
    }
  }
  
  .iconAlign2 {
    vertical-align: bottom;
  }
  .listItem {
    background-color: #F1F9FF;
    padding: 19px;
    padding-right: 1px;
    padding-left: 1px;
    color: #2699FB;
    margin-bottom: 15px;
    font-size: 14px;
    cursor: pointer;
  }
  .paymentDetails {
    display: none !important;
  }
  .scrollable {
    height: 100%;
    overflow-y: auto;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
  }
  @media (min-width: 1px) {
    .tableDiv {
      padding-left: 0 !important;
    }
    .btnNewPayment {
      display: none;
    }
    .cstmtooltip {
      display: block;
    }
    .hiddenOnSmallDesc {
      display: none;
    }
  }
  @media (min-width: 960px) {
    .tableDiv {
      padding-left: 18px !important;
    }
    .btnNewPayment {
      display: block;
    }
    .cstmtooltip {
      display: none;
    }
    .hiddenOnSmallDesc {
      display: block;
    }
  }
  /* End Payment List */
  .biggerFont {
    font-size: 60px;
  }
  .iconAlign2 {
    vertical-align: top;
  }
  /* Pagination */
  .cursorPoint {
    cursor: pointer;
  }
  .pageColor {
    color: #2699FB !important;
  }
  .pageDisabled {
    background-color: #E9ECEF !important;
    cursor: not-allowed !important;
    color: white !important;
  }
  .pageActive {
    background-color: #2699FB !important;
    color: white !important;
  }
  .showAllDiv {
    height: 24px;
  }
  .titleFontSize {
    font-size: 1.5rem;
    font-weight: 400;
  }
  .teamLeadFontSize {
    font-size: 1.25rem;
  }
  .cstmStyleSuggestion {
    position: relative;
    -ms-flex: 1 1 auto;
    -webkit-box-flex: 1;
    flex: 1 1 auto;
    width: 1%;
    margin-bottom: 0;
  }
  .cstmHgth {
    height: 50px !important;
  }
  .customLabelPercent {
    font-size: 12px;
    color: white;
    width: 55px;
    padding: 5px;
    text-align: center;
  }
  .divprint:hover {
    background-color: #007BFF;
    color: white;
  }

  @media screen {
    #print {
      display: none;
    }
  }

  @media print {
    html, body {
        height: 100%;
    }
    body * {
      visibility:hidden;

    }
    #print, #print * {
      -webkit-print-color-adjust: exact;
      visibility:visible;
      color:black;
    }
    #print {
      height: 100%;
      position:absolute;
      left:0;
      top:0;
      padding-left: 96px;
    }
    @page {
      size: auto;   /* auto is the initial value */
      margin: 0;  /* this affects the margin in the printer settings */
    }
  }
  /* Added for froms */
  .eachInput {
    margin: auto;
    margin-top: 16px;
    height: 50px;
  }
  .customLabel {
    font-size: 12px;
    color: white;
    width: 75px;
    padding: 5px;
  }
  .customText {
    border-radius: 0 !important;
    border-color: #BCE0FD;
    height: 50px;
    font-size: 14px;
    color: #2699FB
  }
  .input-group-text {
    background-color: #BCE0FD !important;
    border-radius: 0 !important;
    border-color: #BCE0FD;
  }
  .btnUpload {
    background-color: #2699FB;
    color: white;
    font-weight: 700;
    height: 40px;
    width: 100%;
  }
  .hiddenUploads {
    display: none;
  }
  .eachInputUpl {
    margin: auto;
    margin-top: 8px;
  }
  .footerBtn {
    background-color: #2699FB;
    color: white;
    font-size: 14px;
    font-weight: 700;
    height: 48px;
    max-height: 40px;
    width: 100%;
    margin-top: 16px !important;
  }
  .arrowColor {
    color: #2699FB;
  }
  @media (min-width: 1px) {
    .formRow {
      border: none;
      padding-bottom: 20px;
      background-color: #FBFBFB;
    }
  }
  @media (min-width: 992px) {
    .formRow {
      border: 1px solid #79C0FD;
      border-radius: 5px;
    }
  }
  .searchUL {
    list-style: none
  }
  .eachSearchResult {
    cursor: pointer;
  }
  .eachSearchResult:hover {
    background-color: #F3F3F3;
    color: #000000;
  }
  .clickable2 {
    cursor: pointer;
  }
  .clickable2:hover {
    text-decoration: underline;
  }
  .bg-gray {
    background-color: #FFFFFF;
  }
  .style-27::-webkit-scrollbar-track{
    border-radius: 3px;
    background-color: #F5F5F5;
  }
  .style-27::-webkit-scrollbar{
    width: 3px;
    background-color: #F5F5F5;
  }
  .style-27::-webkit-scrollbar-thumb{
    border-radius: 3px;
    background-color: #BCE0FD
  }
</style>
