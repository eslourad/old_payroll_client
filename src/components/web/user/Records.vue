<template>
  <div class="">
    <transition name="fade">
      <div id="emberloader" v-show="doLoad">
        <emberLoader></emberLoader>
      </div>
    </transition>
    <div class="side">
      <sidebar3></sidebar3>
    </div>
    <transition name="fadeMain">
      <!-- Content -->
      <div class="myContent">
        <!-- Title -->
        <div class="row titleHead ml-2 mr-2">
          <span class="titleHeadText navHeaderMoreOption">
          <i class="material-icons iconAlign mr-1 bckArrow" id="arrowBack" @click="backMainMenu">arrow_back</i>
          <transition name="fadeMain">
            <span>Records</span>
          </transition>
          <i class="material-icons iconAlign float-right">more_vert</i></span>
        </div>
        <!-- End Title -->
        <div class="bgDiv">
          <div class="row">
            <!-- End Search -->
            <div class="col-md-12 col-lg-12 p-0 tableDiv" v-show="!(hasTableError)">
              <div class="listRow float-right col-md-12">
                <div class="scrollable style-2">
                  <transition name="fadeMain" v-for="paid in payments" :key="'paid' + paid.id">
                    <div class="listItem col-md-12 d-flex" @click="viewPaymentAgent(paid.id)">
                      <span class="listIcon col-1"><i class="material-icons iconAlign2">beenhere</i></span>
                      <span class="col-8">
                        <span class="listTitle ">{{ '₱' + ((Number(paid.total_paid).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</span>
                        <span class="listDescription "><span class="hiddenNextLine"><br /></span>{{ paid.created_at }}</span>
                      </span>
                      <span class="listIconMore col-3"><i class="material-icons iconAlign2 float-right">keyboard_arrow_right</i></span>
                    </div>
                  </transition>
                </div>
                <div class="row p-0 mt-2" v-show="!(hasTableError)">
                  <div class="col-6 pl-4">
                    <span class="pageColor">{{ pagination.from}} to {{ pagination.to }} of {{ pagination.total}}</span>
                  </div>
                  <div class="col-6 pr-4">
                    <nav aria-label="Page navigation example">
                      <ul class="pagination float-right p-0 m-0">
                        <li class="page-item" @click="decideMovePage(pagination.prevPageUrl)">
                          <a class="page-link cursorPoint pageColor btnPrev" :class="{ pageDisabled: pagination.isPrevDisabled }" aria-label="Previous">
                            <span aria-hidden="true">&lsaquo;</span>
                          </a>
                        </li>
                        <li class="page-item cursorPoint"><a class="page-link pageColor btnCurrent">{{ pagination.currentPage }} / {{ pagination.last_page }}</a></li>
                        <li class="page-item cursorPoint" @click="decideMovePage(pagination.nextPageUrl)">
                          <a class="page-link cursorPoint pageColor btnNext" :class="{ pageDisabled: pagination.isNextDisabled }">
                            <span aria-hidden="true">&rsaquo;</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div> 
              </div>
            </div>  
          </div>
        </div>
      </div>
    </transition>
    <!-- Modal -->
    <div class="modal fade bd-example-modal-lg" id="mdlAgentPayment" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title" id="exampleModalLabel">Payment Information
              <span v-if="singlePayment.status === 'PENDING'" class="listIconMore clickable" title="Delete Payment"></span>
            </h6>
          </div>
          <div class="modal-body pt-1 pb-4">
            <h4 class=""><small>Payment: </small>{{ '₱' + ((Number(singlePayment.total_paid).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</h4>
            <small class="">Paid On: {{ singlePayment.created_at}}</small><br><br>
            <p class="p-0 m-0">Name: {{ singlePayment.first_name }} {{ singlePayment.last_name }}</p>
            <p class="p-0 m-0">Store: {{ singlePayment.branch_name }}</p>
            <div class="divOuterTable style-2">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Work Days</th>
                    <th scope="col">Overtime</th>
                    <th scope="col">Work on RD</th>
                    <th scope="col">Regular Holiday</th>
                    <th scope="col">Special Holiday</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Rate</th>
                    <td >{{ '₱' + ((Number(singlePayment.rate).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</td>
                    <td >{{ singlePayment.ot_rates }}%</td>
                    <td >{{ singlePayment.rest_day_rate }} %</td>
                    <td >{{ singlePayment.regular_holiday_rate }}%</td>
                    <td >{{ singlePayment.special_holiday_rate }}%</td>
                  </tr>
                  <tr>
                    <th scope="row">Rendered</th>
                    <td>{{ singlePayment.work_days }}</td>
                    <td>{{ singlePayment.ot_hours }}</td>
                    <td>{{ singlePayment.rest_days }}</td>
                    <td>{{ singlePayment.regular_holiday }}</td>
                    <td>{{ singlePayment.special_holiday }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Total</th>
                    <td>{{ '₱' + workDaysTotal }}</td> 
                    <td>{{ '₱' + otTotal }}</td>
                    <td>{{ '₱' + workOnRDTotal }}</td>
                    <td>{{ '₱' + regularHolidayTotal }}</td>
                    <td>{{ '₱' + specialHolidayTotal }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br><br>
            <div class="divOuterTable style-2">
              <small>Deductions</small>
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th scope="col">SSS</th>
                    <th scope="col">Pag-ibig</th>
                    <th scope="col">Phil-health</th>
                    <th scope="col">Savings</th>
                    <th scope="col">CA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ '₱' + ((Number(singlePayment.sss).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</td>
                    <td>{{ '₱' + ((Number(singlePayment.pag_ibig).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</td>
                    <td>{{ '₱' + ((Number(singlePayment.phil_health).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</td>
                    <td>{{ '₱' + ((Number(singlePayment.savings).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</td>
                    <td>{{ '₱' + ((Number(singlePayment.ca_deduction).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="d-flex">
              <div class="col-md-6 mt-3">
                <div v-show="singlePayment.adjustments !== '0' && singlePayment.remarks !== ''">
                  <p class="m-0 b-0">Adjustment Remarks:</p>
                  <p class="ml-3">{{ singlePayment.remarks }}</p>
                </div>
              </div>
              <div  class="col-md-6">
                <br>
                
                <p class="float-right m-0 p-0">Allowance: {{ '₱' + ((Number(singlePayment.allowance).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}}</p><br>
                <p class="float-right m-0 p-0">Adjustments: {{ '₱' + ((Number(singlePayment.adjustments).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</p><br>
                <br>
                <b class="float-right">Earnings: ₱{{ allEarning}}</b><br>
                <b class="float-right">Deductions: ₱{{ allDeductions }}</b><br>
                <b class="float-right">Total Payment: {{ '₱' + ((Number(singlePayment.total_paid).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</b>
                <br><br>
              </div>
            </div>
            <div>
              <p>Files:</p>
              <div class="d-flex">
                <div class="col-12">
                  <p class="mb-0 text-secondary">DTR:</p>
                  <img :src="'http://server.solarace.com.ph/uploads/payment/' + singlePayment.dtr" alt="DTR" class="img-thumbnail bckArrow viewableImgs" height="350px" width="500px" @click="showImg('dtrID')" id="dtrID">
                  <br><br>
                  <p class="mb-0 text-secondary" v-show="singlePayment.ot_approval !== 'OT'">OT Approval:</p>
                  <img v-show="singlePayment.ot_approval !== 'OT'" :src="'http://server.solarace.com.ph/uploads/payment/' + singlePayment.ot_approval" alt="OT Approval" class="img-thumbnail bckArrow viewableImgs" height="350px" width="500px" @click="showImg('otID')" id="otID">
                </div>
              </div>
              <div id="psaModal" class="imgmodal">
                <span class="close" @click="closeModal">&times;</span>
                <img class="cstmmodal" id="img01">
                <div id="caption"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sidebar3 from '@/components/web/Sidebar3.vue'
import axios from 'axios'
import emberLoader from '@/components/emberLoader.vue'
export default {
  components: {
    sidebar3,
    emberLoader
  },
  name: 'Records',
  data: function () {
    return {
      pagination: {
        nextPageUrl: '',
        prevPageUrl: '',
        currentPage: '',
        last_page: '',
        isPrevDisabled: true,
        isNextDisabled: false,
        from: '',
        to: '',
        total: ''
      },
      payments: [],
      userAgentID: '',
      hasTableError: false,
      isSearching: false,
      doLoad: false,
      singlePayment: {
        total_paid: 0,
        work_days: 0,
        rate: 0,
        ot_hours: 0,
        ot_rates: 0,
        rest_days: 0,
        rest_day_rate: 0,
        regular_holiday: 0,
        regular_holiday_rate: 0,
        special_holiday: 0,
        special_holiday_rate: 0,
        sss: 0,
        pag_ibig: 0,
        phil_health: 0,
        savings: 0,
        ca_deduction: 0,
        adjustments: 0,
        allowance: 0,
      },
      allEarning: 0,
      allDeductions: 0,
      workDaysTotal: 0,
      otTotal: 0,
      workOnRDTotal: 0,
      regularHolidayTotal: 0,
      specialHolidayTotal: 0
    }
  },
  created: function () {
    this.doLoad = true
    axios.get('api/user').then(response => {
      self.userAgentID = response.data.agent_id
      this.showTable(self.userAgentID)
    }).catch(error => {
      console.log(error)
    })
    
  },
  methods: {
    backMainMenu () {
      if(this.paymentList) {
        if(!localStorage.getItem('isMobile')) {
          this.$router.push('/m/dashboard')
        } else {
          this.$router.push('/dashboard')
        }
      } else {
        this.paymentList = true
      }
    },
    showTable (id) {
      this.doLoad = true
      this.paymentList = false
      let self = this
      axios.get('api/payment/mypayments/' + id).then(response => {
        if(response.data.status === 'success'){
          self.payments = response.data.data.data
          self.isSearching = false
          self.pagination.prevPageUrl = response.data.data.prev_page_url
          self.pagination.nextPageUrl = response.data.data.next_page_url
          self.pagination.currentPage = response.data.data.current_page
          self.pagination.last_page = response.data.data.last_page
          self.pagination.from = response.data.data.from
          self.pagination.to = response.data.data.to
          self.pagination.total = response.data.data.total
          if (self.pagination.prevPageUrl === null) {
            self.pagination.isPrevDisabled = true
          } else {
            self.pagination.isPrevDisabled = false
          }
          if (self.pagination.nextPageUrl === null) {
            self.pagination.isNextDisabled = true
          } else {
            self.pagination.isNextDisabled = false
          }
          self.hasTableError = false
        } else {
          self.hasTableError = true
          self.tableErrorMsg = response.data.data
        }
        self.doLoad = false
      }).catch(error => {
        console.log(error)
      })
    },
    movePage (url) {
      if(url !== null){
        this.doLoad = true
        url = url.replace('http://server.solarace.com.ph/', '')
        let self = this
        axios.get(url).then(response => {
          self.isSearching = false
          self.payments = response.data.data.data
          self.paidAgents = response.data.data.data
          self.pagination.prevPageUrl = response.data.data.prev_page_url
          self.pagination.nextPageUrl = response.data.data.next_page_url
          self.pagination.currentPage = response.data.data.current_page
          self.pagination.last_page = response.data.data.last_page
          self.pagination.from = response.data.data.from
          self.pagination.to = response.data.data.to
          self.pagination.total = response.data.data.total
          if (self.pagination.prevPageUrl === null) {
            self.pagination.isPrevDisabled = true
          } else {
            self.pagination.isPrevDisabled = false
          }
          if (self.pagination.nextPageUrl === null) {
            self.pagination.isNextDisabled = true
          } else {
            self.pagination.isNextDisabled = false
          }
          let widthVP = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
          if (widthVP <= 992) {
            $('html, body').animate({ scrollTop: 950 }, 'slow')
          }
          this.doLoad = false
        }).catch(error => {
          console.log(error)
        })

      } 
    },
    decideMovePage (url) {
      if(this.isSearching) {
        this.searchMovePage(url)
      } else {
        this.movePage(url)
      }
    },
    viewPaymentAgent (id) {
      let self = this
      axios.get('api/paymentperiod/payment/' + id).then(response => {
        self.singlePayment = response.data.data
        if(self.singlePayment.adjustments > 0) {
          self.singlePayment.positiveAdjustment = self.singlePayment.adjustments
          self.singlePayment.negativeAdjustment = 0
        } else {
          self.singlePayment.positiveAdjustment = 0
          self.singlePayment.negativeAdjustment = self.singlePayment.adjustments.toString().substr(1)
        }
        //EARNINGS
        //WORK DAYS
        let test = (self.singlePayment.rate * this.singlePayment.work_days).toFixed(2)
        self.workDaysTotal = ((Number(test)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        //ADJUSTMENT
        let test1 = self.singlePayment.positiveAdjustment
        //OT
        let preciseRate = Number(self.singlePayment.rate)
        let preciseOtRate = Number(self.singlePayment.ot_rates)
        let preciseOtRendered = Number(self.singlePayment.ot_hours)
        let test2 = ((((preciseOtRate / 100) * preciseRate) + preciseRate) / 8) * preciseOtRendered
        self.otTotal = (test2.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        //REST DAY
        let test3 = (((self.singlePayment.rest_day_rate / 100) * self.singlePayment.rate) * self.singlePayment.rest_days).toFixed(2)
        self.workOnRDTotal = ((Number(test3)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        //REGULAR HOLIDAY
        let test4 = (((self.singlePayment.regular_holiday_rate / 100) * self.singlePayment.rate) * self.singlePayment.regular_holiday).toFixed(2)
        self.regularHolidayTotal = ((Number(test4)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        //SPECIAL HOLIDAY
        let test5 = (((self.singlePayment.special_holiday_rate / 100) * self.singlePayment.rate) * self.singlePayment.special_holiday).toFixed(2)
        self.specialHolidayTotal = ((Number(test5)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        //TOTAL
        let totalEarning = Number(test) + Number(test1) + Number(test2) + Number(test3) + Number(test4) + Number(test5) + Number(self.singlePayment.allowance)
        self.allEarning = ((Number(totalEarning)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

        //DEDUCTIONS
        //SSS
        let nega1 = Number(self.singlePayment.sss)
        //PAGIBIG
        let nega2 = Number(self.singlePayment.pag_ibig)
        //PHILHEALTH
        let nega3 = Number(self.singlePayment.phil_health)
        //SAVINGS
        let nega4 = Number(self.singlePayment.savings)
        //CA
        let nega5 = Number(self.singlePayment.ca_deduction)
        //ADJUSTMENT
        let nega6 = Number(self.singlePayment.negativeAdjustment)
        //Deduction
        let totalDeductions = nega1 + nega2 + nega3 + nega4 + nega5 + nega6
        self.allDeductions = ((Number(totalDeductions)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        $('#mdlAgentPayment').modal('show')
      }).catch(error => {
        console.log(error)
      })
      
    },
    showImg (imgId) {
      let modal = document.getElementById('psaModal')
      let img = document.getElementById(imgId)
      let modalImg = document.getElementById('img01')
      let captionText = document.getElementById("caption");
      modal.style.display = "block"
      modalImg.src = img.src
      captionText.innerHTML = img.alt
    },
    closeModal () {
      let modal = document.getElementById('psaModal')
      modal.style.display = "none"
    },
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
      padding-top: 15px;
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
      padding-left: 0px;
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
      min-height: 468px;
      padding: 0;
      background-color: none;
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
   /* The Modal (background) */
  .custom_thumbnail {
    padding: 0.25rem;
    background-color: #fff;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
  }
  .viewableImgs:hover {opacity: 0.7;}

  /* The Modal (background) */
  .imgmodal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
  }

  /* Modal Content (Image) */
  .cstmmodal {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
  }

  /* Caption of Modal Image (Image Text) - Same Width as the Image */
  #caption {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
    text-align: center;
    color: #ccc;
    padding: 10px 0;
    height: 150px;
  }

  /* Add Animation - Zoom in the Modal */
  .cstmmodal, #caption { 
    animation-name: zoom;
    animation-duration: 0.6s;
  }

  @keyframes zoom {
    from {transform:scale(0)} 
    to {transform:scale(1)}
  }

  /* The Close Button */
  .close {
    position: absolute;
    top: 15px;
    right: 35px;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    transition: 0.3s;
  }

  .close:hover,
  .close:focus {
    color: #bbb;
    text-decoration: none;
    cursor: pointer;
  }

  /* 100% Image Width on Smaller Screens */
  @media only screen and (max-width: 700px){
    .cstmmodal {
      width: 100%;
    }
  }
</style>
