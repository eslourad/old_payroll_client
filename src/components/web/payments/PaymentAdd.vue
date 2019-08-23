<template>
  <div class="" @click="suggestClose">
    <transition name="fade">
      <div id="emberloader" v-show="doLoad">
        <emberLoader></emberLoader>
      </div>
    </transition>
    <transition name="fadeMain">
      <div v-show="!confirmationPage">
        <div class="side">
          <sidebar v-if="!notAdmin"></sidebar>
          <sidebar2 v-if="notAdmin"></sidebar2>
        </div>
        <transition name="fadeMain">
          <!-- Content -->
          <div class="myContent">
            <!-- Title -->
            <div class="row titleHead ml-2 mr-2">
              <span class="titleHeadText navHeaderMoreOption">
              <i class="material-icons iconAlign mr-1 bckArrow" id="arrowBack" @click="backMainMenu">arrow_back</i>
                <span>Create New Payments</span>
              <i class="material-icons iconAlign float-right">more_vert</i></span>
            </div>
            <!-- End Title -->
            <div class="bgDiv">
              <!-- Search -->
              <div class="row searchRow mt-1 pl-1">
                <p class="lblSearch"><u>Pay Details</u></p>
              </div>
              <div class="row">
                <div class="col-md-12 formRow col-lg-6 col-xl-3">
                  <div class="listItem col-md-12 text-center mt-3" v-show="!canPay">
                    <span class="w-100 text-primary">No payment period available</span>
                  </div>
                  <div v-show="canPay">
                    <transition name="fade">
                      <div class="bg-danger text-white text-center" v-show="creationError">
                        <p class="mt-2 pt-2 pb-2"><i class="material-icons iconAlign2">info</i> Error: Agent already paid</p>
                      </div>
                    </transition>
                    <transition name="fade">
                      <div class="bg-success text-white text-center" v-show="creationOK">
                        <p class="mt-2 pt-2 pb-2"><i class="material-icons iconAlign2">check</i> Payment successful </p>
                      </div>
                    </transition>
                    <div class="eachInput" v-if="!notAdmin">
                      <div class="input-group txtLabels">
                        <div class="input-group-prepend">
                          <div class="input-group-text customLabel">Store</div>
                        </div>
                        <input type="text" id="suggestBranchID" class="form-control customText" @keyup="chooseBranch" v-model="selectedOption" autocomplete="off">
                        <input type="hidden" v-model="branchNameID" v-validate="'required|numeric'" name="branch ID" autocomplete="off">
                        <div id="livesearchBranch" class="col-12 p-0" @click="branchSelected"></div>
                      </div>
                      <div class="row ml-2 pt-2 text-danger small" v-show="errors.first('branch ID')">
                        <span>Choose branch from the suggestion list</span>
                      </div>
                    </div>
                    <!-- remove agent -->
                    <div class="eachInput" v-if="notAdmin">
                      <!-- <div class="input-group txtLabels">
                        <div class="input-group-prepend">
                          <div class="input-group-text customLabel">Store</div>
                        </div>
                        <input type="text" class="form-control customText" v-model="selectedOption" disabled>
                      </div> -->
                      <div class="input-group txtLabels">
                        <div class="input-group-prepend">
                          <div class="input-group-text customLabel">Store</div>
                        </div>
                        <select type="text" class="form-control customText" @change="branchChanged" v-model="crtStore"  placeholder="store assigned" v-validate="'required'" name="store">
                          <option value=""></option>
                          <option v-for="name in branchName" :key="'branch' + name.id" :value="name.id"> {{ name.branch_name }}</option>
                        </select>
                      </div>
                      <div class="row ml-2 pt-2 text-danger small">
                        <span>{{ errors.first('crtStore') }}</span>
                      </div>
                    </div>
                    <div class="eachInput">
                      <div class="input-group txtLabels">
                        <div class="input-group-prepend">
                          <div class="input-group-text customLabel">Agent <br />Name</div>
                        </div>
                        <input type="text" class="form-control customText" id="agentSuggestName" v-model="agentName" placeholder="select agent name" @keyup="chooseAgent" v-validate="'required'" name="agent name" :disabled="crtStore === ''" autocomplete="off">
                        <input type="hidden" v-model="agentNameID" v-validate="'required|numeric'" name="agent ID" autocomplete="off"><br>
                        <div id="livesearch" class="col-12 p-0" @click="agentSelected"></div>
                      </div>
                    </div>
                    <div class="row ml-1 pt-2 text-danger small" v-show="errors.first('agent ID')">
                      <span>Choose from the suggestion list</span>
                    </div>
                    <div class="eachInput d-flex flex-row d-flex flex-row">
                      <!-- <input v-model="startDate" type="text" class="form-controlCustom cstmTextDate customText mr-2" v-validate="'required'" name="from" disabled>
                      <i class="large material-icons iconAlign pt-2 mt-1 arrowColor">trending_flat</i>
                      <input v-model="endDate" type="text" class="form-controlCustom cstmTextDate customText ml-2" v-validate="'required'" name="to" disabled> -->
                      <div class="input-group-prepend">
                          <div class="input-group-text customLabel">Payment <br> Period</div>
                        </div>
                        <select  type="text" class="form-control customText" v-model="periodID" id="agentStore" v-validate="'required'" name="payment period">
                          <option value=""></option>
                          <option v-for="period in paymentPeriods" :key="'period' + period.id" :value="period.id"> {{ period.starting_date }} - {{ period.end_date }}</option>
                        </select>
                    </div>
                    <div class="row ml-2 pt-2 text-danger small">
                      <span>{{ errors.first('payment period') }}</span>
                    </div>
                    <div class="eachInput">
                      <div class="input-group txtLabels">
                        <div class="input-group-prepend">
                          <div class="input-group-text customLabel">Work<br />Days</div>
                        </div>
                        <input type="text" class="form-control customText"  placeholder="enter number of days" v-validate="'required|numeric'" name="work days" v-model="workDays">
                      </div>
                    </div>
                    <div class="row ml-2 pt-2 text-danger small">
                      <span>{{ errors.first('work days') }}</span>
                    </div>
                    <div class="eachInput">
                      <div class="input-group txtLabels">
                        <div class="input-group-prepend">
                          <div class="input-group-text customLabel">Over<br />Time</div>
                        </div>
                        <input type="text" class="form-control customText"  placeholder="enter number of hours" v-validate="'required|numeric|min_value:0'" name="over time" v-model="overTime">
                      </div>
                    </div>
                    <div class="row ml-2 pt-2 text-danger small">
                      <span>{{ errors.first('over time') }}</span>
                    </div>
                    <div class="eachInput">
                      <div class="input-group txtLabels">
                        <div class="input-group-prepend">
                          <div class="input-group-text customLabel">Work on<br />Rest Day</div>
                        </div>
                        <select type="text" class="form-control customText"  placeholder="enter number of rest days" v-validate="'required|numeric|min_value:0'" name="rest days" v-model="restDays">
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                        </select>
                      </div>
                    </div>
                    <div class="row ml-2 pt-2 text-danger small">
                      <span>{{ errors.first('rest days') }}</span>
                    </div>
                    <div class="eachInput">
                      <div class="input-group txtLabels">
                        <div class="input-group-prepend">
                          <div class="input-group-text customLabel">Regular<br />Holiday</div>
                        </div>
                        <input type="text" class="form-control customText"  placeholder="enter number of regular holiday" v-validate="'required|numeric|min_value:0'" name="regular holiday" v-model="regularHoliday">
                      </div>
                    </div>
                    <div class="row ml-2 pt-2 text-danger small">
                      <span>{{ errors.first('regular holiday') }}</span>
                    </div>
                    <div class="eachInput">
                      <div class="input-group txtLabels">
                        <div class="input-group-prepend">
                          <div class="input-group-text customLabel">Special<br />Holiday</div>
                        </div>
                        <input type="text" class="form-control customText"  placeholder="enter number of special holiday" v-validate="'required|numeric|min_value:0'" name="special holiday" v-model="specialHoliday">
                      </div>
                    </div>
                    <div class="row ml-2 pt-2 text-danger small">
                      <span>{{ errors.first('special holiday') }}</span>
                    </div>
                    <div class="eachInput">
                      <div class="input-group txtLabels">
                        <div class="input-group-prepend">
                          <div class="input-group-text customLabel">Adjustment</div>
                        </div>
                        <input type="text" class="form-control customText"  placeholder="enter amount for adjustments" v-validate="'required|decimal:2|min_value:0'" name="adjustments" v-model="adjustments">
                        <div class="input-group-prepend" @click="changeAdjustments">
                          <div class="input-group-text customLabelPercent" v-show="adjustmentSign">&nbsp;&nbsp;+</div>
                          <div class="input-group-text customLabelPercent2" v-show="!adjustmentSign">&nbsp;&nbsp;-</div>
                        </div>
                      </div>
                    </div>
                    <div class="row ml-2 pt-2 text-danger small">
                      <span>{{ errors.first('adjustments') }}</span>
                    </div>
                    <div class="eachInput mb-4" v-show="adjustments !== 0 && adjustments !== '' && adjustments !== '0'">
                      <div class="input-group txtLabels">
                        <div class="input-group-prepend">
                          <div class="input-group-text customLabel">Remarks</div>
                        </div>
                        <input type="text"  class="form-control customText"  placeholder="enter remarks for adjustment" name="remarks" v-model="remarks">
                      </div>
                    </div>
                    <div class="eachInputUpl">
                      <button class="btn btnUpload" @click="uploadOT">{{ btnOT }}</button>
                      <input type="file" @change="onOTAprrovalChange" id="uplOT" class="hiddenUploads" name="OT approval file" v-validate="'image'">
                    </div>
                    <div class="row ml-2 pt-2 text-danger small">
                      <span>{{ errors.first('OT approval file') }}</span>
                    </div>
                    <div class="row ml-2 pt-2 text-danger small" v-show="showOTAprrovalErr">
                      <span>The OT approval is required</span>
                    </div>
                    <div class="eachInputUpl">
                      <button class="btn btnUpload" @click="uploadDTR">{{ btnDTR }}</button>
                      <input type="file" @change="onDTRChange" id="uplDTR" class="hiddenUploads" name="dtr file" v-validate="'required|image'">
                    </div>
                    <div class="row ml-2 pt-2 text-danger small">
                      <span>{{ errors.first('dtr file') }}</span>
                    </div>
                    <div class="buttonDiv">
                      <button class="footerBtn btn" @click="nxtPage"><i class="large material-icons">arrow_forward</i></button>
                    </div>
                    <!-- End Search -->
                  </div>
                </div>         
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
    <!--Confirmation Page-->
    <transition name="fadeMain">
      <div v-show="confirmationPage" class="allInput style-1">
        <Confirmation @cancel="cancel" @confirm="confirm"></Confirmation>
      </div> 
    </transition>
  </div>
</template>
<script>
import sidebar from '@/components/web/Sidebar.vue'
import sidebar2 from '@/components/web/Sidebar2.vue'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import Confirmation from '@/components/Confirmation.vue'
import axios from 'axios'
import emberLoader from '@/components/emberLoader.vue'
export default {
  components: {
    sidebar,
    Datetime,
    Confirmation,
    emberLoader,
    sidebar2
  },
  name: 'PaymentView',
  data: function () {
    return {
      periodID: '',
      startDate: '',
      endDate: '',
      maxDatetime: '',
      ndate: new Date(),
      confirmationPage: false,
      branchName: [],
      crtStore: '',
      agentName: '',
      agentNameID: '',
      workDays: '',
      overTime: 0,
      restDays: 0,
      regularHoliday: 0,
      specialHoliday: 0,
      OTFile: '',
      DTRFile: '',
      focusedItem: -1,
      suggestionCount: 0,
      showOTAprrovalErr: false,
      doLoad: false,
      periodError: false,
      selectedOption: '',
      notAdmin: false,
      userLevel: '',
      creationOK: false,
      creationError: false,
      btnDTR: 'UPLOAD D.T.R.',
      btnOT: 'UPLOAD O.T. APPROVAL',
      focusedItemBranch: -1,
      suggestionCountBranch: 0,
      branchNameID: '',
      userAgentID: '',
      canPay: true,
      paymentPeriods: [],
      adjustmentSign: true,
      adjustments: 0,
      remarks: ''
    }
  },
  created: function () {
    this.doLoad = true
    let self = this
    axios.get('api/user').then(response => {
      self.userLevel = response.data.user_level
      if(response.data.user_level === "0") {
        self.notAdmin = true
        this.callbranchName(response.data.agent_id)
      } else {
        self.notAdmin = false
      }
      self.userAgentID = response.data.agent_id
    }).catch(error => {
      console.log(error)
    })
    
    this.callPeriod()
  },
  methods: {
    callbranchName (id) {
      let self = this
      let data = {
        agent_id: id
      }
      axios.post('api/branch/branchNameAgent', data).then(response => {
        // self.crtStore = response.data.data.id
        // self.branchNameID = response.data.data.id
        // self.selectedOption = response.data.data.branch_name3
        self.branchName = response.data.data
      }).catch(error => {
        console.log(error)
      })
    },
    callPeriod () {
      let self = this
      axios.get('api/paymentperiod/period').then(response => {
        if(response.data.status === 'success'){
          self.canPay = true
          self.paymentPeriods = response.data.data
        } else {
          self.canPay = false
        }
        this.doLoad = false 
      }).catch(error => {
        console.log(error)
      })
    },
    backMainMenu () {
      this.$router.push('/payment')
    },
    showPaymentDetails () {
      this.paymentList = false
    },
    uploadOT () {
      $('#uplOT').click()
    },
    uploadDTR () {
      $('#uplDTR').click()
    },
    nxtPage () {
      let self = this
      this.$validator.validate().then(valid => {
        if (valid) {
          if (this.overTime > 0) {
            if ( document.getElementById("uplOT").files.length === 0 ) {
              this.showOTAprrovalErr = true
            } else {

              this.showOTAprrovalErr = false
              this.confirmationPage = true
            }
          } else {
            this.showOTAprrovalErr = false
            this.confirmationPage = true
          }
        } 
      })
    },
    chooseAgent (event) {
      if(event.keyCode === 38){
        if(this.focusedItem  === -1 || this.focusedItem  === 0) {
          this.focusedItem = this.suggestionCount - 1
          $('.allTlItem').removeClass('addOnKeyPress')
          $('#tlSgtn' + this.focusedItem).addClass('addOnKeyPress')
        } else {
          this.focusedItem--
          $('.allTlItem').removeClass('addOnKeyPress')
          $('#tlSgtn' + this.focusedItem).addClass('addOnKeyPress')
        }
      }else if(event.keyCode === 40){
        if(this.focusedItem === -1 || this.focusedItem === (this.suggestionCount - 1)) {
          this.focusedItem = 0
          $('.allTlItem').removeClass('addOnKeyPress')
          $('#tlSgtn' + this.focusedItem).addClass('addOnKeyPress')
        } else {
          this.focusedItem++
          $('.allTlItem').removeClass('addOnKeyPress')
          $('#tlSgtn' + this.focusedItem).addClass('addOnKeyPress')
        }
      }else if(event.keyCode === 13){
        this.agentName = $('.addOnKeyPress').text()
        this.agentNameID = $('.addOnKeyPress').attr('name').substring(6)
        this.suggestClose()
      }else if(event.keyCode === 9){
      }else if(event.keyCode === 8){
        this.agentName = ''
        this.agentNameID = ''
      }else{
        if(event.target.value.length > 1){
          let tlID = 0
          if(self.notAdmin) {
            tlID = self.userAgentID
          }
          this.suggestClose
          self = this
          this.agentNameID = this.agentName
          let data = {
            name: event.target.value,
            id: self.crtStore,
            tlId: tlID
          }
          axios.post('api/agent/nameBranchPayment', data).then(response => {
            $('#livesearch').empty()
            self.suggestionCount = response.data.data.length
            let w = $('#agentSuggestName').outerWidth()
            for (var i = 0; i < response.data.data.length; i++) {
              $("#livesearch").append('<div class="autocomplete-items allTlItem" id="tlSgtn'+ i +'" name="tlSgtn'+ response.data.data[i].id +'" style="width:' + w + 'px">' + response.data.data[i].agent_name + '</div>')
            }
          }).catch(error => {
            console.log(error)
            this.doLoad = false
          })
        }
      }
    },
    branchChanged () {
      this.agentName = ''
    },
    agentSelected (e) {
       this.agentName = e.target.textContent
      let id = e.target.id
      this.agentNameID  = $('#' + id).attr('name').substring(6)
      this.suggestClose()
    },
    suggestClose () {
      $('#livesearch').empty()
      this.focusedItem = -1,
      this.suggestionCount = 0
      $('#livesearchBranch').empty()
      this.focusedItemBranch = -1,
      this.suggestionCountBranch = 0
    },
    confirm () {
      let finalRemark = ''
      if(this.adjustments !== 0 && this.adjustments !== '' && this.adjustments !== '0') {
        finalRemark = this.remarks
      } else {
        finalRemark = ''
      }
      this.doLoad = true
      self = this
      let adjustmentAmount = 0
      let data = {
        branch_id: self.crtStore,
        agent_id: self.agentNameID,
        payment_period_id: self.periodID,
        work_days: self.workDays,
        ot_hours: self.overTime,
        rest_days: self.restDays,
        regular_holiday: self.regularHoliday,
        special_holiday: self.specialHoliday,
        ot_approval: self.OTFile,
        dtr: self.DTRFile,
        paid_by: self.userAgentID,
        adjustments: self.adjustments,
        adjustmentSign: self.adjustmentSign,
        remarks: finalRemark
      }
      axios.post('api/payment/new', data).then(response => {
        self.clearFields()
        self.confirmationPage = false
        self.doLoad = false
        self.creationOK = true
        setTimeout(function(){ self.creationOK = false }, 7000)
      }).catch(error => {
        console.log(error)
        self.confirmationPage = false
        self.doLoad = false
        self.creationError = true
        setTimeout(function(){ self.creationError = false }, 7000)
      })
    },
    cancel () {
      this.confirmationPage = false
    },
    onOTAprrovalChange (event) {
      this.btnOT = 'Change OT File'
      let fileReader = new FileReader()
      fileReader.readAsDataURL(event.target.files[0])
      fileReader.onload = (event) => {
        this.OTFile = event.target.result
      }
    },
    onDTRChange (event) {
      this.btnDTR = 'Change DTR File'
      let fileReader = new FileReader()
      fileReader.readAsDataURL(event.target.files[0])
      fileReader.onload = (event) => {
        this.DTRFile = event.target.result
      }
    },
    clearFields () {
      this.selectedOption = ''
      this.crtStore = ''
      this.agentNameID = ''
      this.agentName = ''
      this.workDays = ''
      this.overTime = 0
      this.restDays = 0
      this.regularHoliday = 0
      this.specialHoliday = 0
      this.OTFile = ''
      this.DTRFile = ''
      this.adjustments = 0
      this.remarks = ''
      document.getElementById("uplDTR").value = "";
      document.getElementById("uplOT").value = "";
      this.btnDTR = 'UPLOAD D.T.R.'
      this.btnOT = 'UPLOAD O.T. APPROVAL'
      
      this.$validator.reset()
    },
    chooseBranch (event) {
      if(event.keyCode === 38){
        if(this.focusedItemBranch  === -1 || this.focusedItemBranch  === 0) {
          this.focusedItemBranch = this.suggestionCountBranch - 1
          $('.allTlItemBranch').removeClass('addOnKeyPress')
          $('#brSgtn' + this.focusedItemBranch).addClass('addOnKeyPress')
        } else {
          this.focusedItemBranch--
          $('.allTlItemBranch').removeClass('addOnKeyPress')
          $('#brSgtn' + this.focusedItemBranch).addClass('addOnKeyPress')
        }
      }else if(event.keyCode === 40){
        if(this.focusedItemBranch === -1 || this.focusedItemBranch === (this.suggestionCountBranch - 1)) {
          this.focusedItemBranch = 0
          $('.allTlItemBranch').removeClass('addOnKeyPress')
          $('#brSgtn' + this.focusedItemBranch).addClass('addOnKeyPress')
        } else {
          this.focusedItemBranch++
          $('.allTlItemBranch').removeClass('addOnKeyPress')
          $('#brSgtn' + this.focusedItemBranch).addClass('addOnKeyPress')
        }
      }else if(event.keyCode === 13){
        this.agentName = ''
        this.selectedOption = $('.addOnKeyPress').text()
        this.crtStore = $('.addOnKeyPress').attr('name').substring(6)
        this.branchNameID = $('.addOnKeyPress').attr('name').substring(6)
        this.suggestClose()
      }else if(event.keyCode === 9){
      }else if(event.keyCode === 8){
        this.agentName = ''
        this.selectedOption = ''
        this.crtStore = ''
        this.branchNameID = ''
      }else{
        if(event.target.value.length > 1){
          this.suggestClose
          self = this
          let data = {
            name: event.target.value
          }
          axios.post('api/branch/suggestBranchExclusiveToPayment', data).then(response => {
            $('#livesearchBranch').empty()
            self.suggestionCountBranch = response.data.data.length
            let w = $('#suggestBranchID').outerWidth()
            for (var i = 0; i < response.data.data.length; i++) {
              $("#livesearchBranch").append('<div class="autocomplete-items allTlItemBranch" id="brSgtn'+ i +'" name="brSgtn'+ response.data.data[i].id +'" style="width:' + w + 'px">' + response.data.data[i].branch_name + '</div>')
            }
          }).catch(error => {
            console.log(error)
            this.doLoad = false
          })
        }
      }
    },
    branchSelected (e) {
      this.agentName = ''
      this.selectedOption = e.target.textContent
      let id = e.target.id
      this.crtStore = $('#' + id).attr('name').substring(6)
      this.branchNameID  = $('#' + id).attr('name').substring(6)
      this.suggestClose()
    },
    changeAdjustments () {
      if(this.adjustmentSign) {
        this.adjustmentSign = false
      } else {
        this.adjustmentSign = true
      }
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
  /* End Added for froms */
  .iconAlign2 {
    vertical-align: bottom;
  }
  .customLabelPercent {
    font-size: 24px;
    color: white;
    width: 55px;
    padding: 5px;
    text-align: center;
    cursor: pointer;
  }
  .customLabelPercent2 {
    font-size: 24px;
    color: white;
    width: 55px;
    padding: 5px;
    padding-left: 6px;
    text-align: center;
    cursor: pointer;
  }
</style>
