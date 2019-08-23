<template>
  <div class="" @click="suggestClose">
    <transition name="fade">
      <div id="emberloader" v-show="doLoad">
        <emberLoader></emberLoader>
      </div>
    </transition>
    <transition name="fadeMain">
      <div>
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
                <span>Brand Specialist Registration</span>
              <i class="material-icons iconAlign float-right">more_vert</i></span>
            </div>
            <!-- End Title -->
            <div class="bgDiv">
              <!-- Search -->
              <div class="row searchRow mt-1 pl-1">
                <p class="lblSearch"><u>Personal Information</u></p>
              </div>
              <div class="row">
                <div class="col-md-12 formRow col-lg-6 col-xl-3">
                    <div class="eachInput" v-show="!notAdmin && agentStore !== '0'">
                      <!-- <div class="input-group txtLabels">
                        <div class="input-group-prepend">
                          <div class="input-group-text customLabel">Store</div>
                        </div>
                        <select  type="text" class="form-control customText" v-model="agentStore" id="agentStore" v-validate="'required|numeric'" name="store">
                          <option value=""></option>
                          <option v-for="name in branchName" :key="'branch' + name.id" :value="name.id"> {{ name.branch_name }}</option>
                        </select>
                      </div> -->
                      <div class="input-group txtLabels">
                        <div class="input-group-prepend">
                          <div class="input-group-text customLabel">Store</div>
                        </div>
                        <input type="text" v-model="selectedOption" id="suggestBranchID" class="form-control customText" @keyup="chooseBranch" autocomplete="off">
                        <input type="hidden" v-model="agentStore" v-validate="'required|numeric'" name="branch ID" autocomplete="off">
                        <div id="livesearchBranch" class="col-12 p-0" @click="branchSelected"></div>
                      </div>
                    </div>
                    <div class="eachInput" v-show="notAdmin">
                      <div class="input-group txtLabels">
                        <div class="input-group-prepend">
                          <div class="input-group-text customLabel">Store</div>
                        </div>
                        <select  type="text" class="form-control customText" v-model="agentStore" id="agentStore" v-validate="'required|numeric'" name="store">
                          <option value=""></option>
                          <option v-for="name in branchName" :key="'branch' + name.id" :value="name.id"> {{ name.branch_name }}</option>
                        </select>
                      </div>
                      <!-- <div class="input-group txtLabels">
                        <div class="input-group-prepend">
                          <div class="input-group-text customLabel">Store</div>
                        </div>
                        <input type="text" class="form-control customText" v-model="selectedOption" disabled>
                      </div> -->
                    </div>
                    <div class="row pl-3 text-danger small">
                      <span>{{ errors.first('store') }}</span>
                    </div>
                    <div class="eachInput">
                      <div class="input-group txtLabels">
                        <div class="input-group-prepend">
                          <div class="input-group-text customLabel">Job Title</div>
                        </div>
                        <input type="text" class="form-control customText" v-model="agentTitle" placeholder="enter job title" id="agentTitle" v-validate="'required|alpha_spaces'" name="job title">
                      </div>
                    </div>
                    <div class="row pl-3 mt-1 mb-0 pb-0 text-danger small">
                      <span>{{ errors.first('job title') }}</span>
                    </div>
                    <div class="eachInput">
                      <div class="input-group txtLabels">
                        <div class="input-group-prepend">
                          <div class="input-group-text customLabel">First Name</div>
                        </div>
                        <input type="text" class="form-control customText" v-model="agentFName" placeholder="enter first name" id="agentFName" v-validate="'required|alpha_spaces|max:50'" name="first name">
                      </div>
                    </div>
                    <div class="row pl-3 mt-1 mb-0 pb-0 text-danger small">
                      <span>{{ errors.first('first name') }}</span>
                    </div>
                    <div class="eachInput">
                      <div class="input-group txtLabels">
                        <div class="input-group-prepend">
                          <div class="input-group-text customLabel">Last Name</div>
                        </div>
                        <input type="text" class="form-control customText" v-model="agentLName" placeholder="enter last name" id="agentLName" v-validate="'required|alpha_spaces|max:50'" name="last name">
                      </div>
                    </div>
                    <div class="row pl-3 mt-1 mb-0 pb-0 text-danger small">
                      <span>{{ errors.first('last name') }}</span>
                    </div>
                    <div class="eachInput d-flex flex-row">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel customLabelDate">Birth Date</div>
                      </div>
                      <div class="input-group txtLabels">
                        <datetime v-model="dateOfBirth" input-class="form-controlCustom cstmTextDate agentDob" class="dateStyle" :max-datetime="maxDatetime" placeholder="enter birth date" v-validate="'required'" name="birth date"></datetime>
                      </div>
                    </div>
                    <div class="row pl-3 mt-1 mb-0 pb-0 text-danger small">
                      <span>{{ errors.first('birth date') }}</span>
                    </div>
                    <div class="eachInput d-flex flex-row">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel customLabelDate text-left">Employment <br>Date</div>
                      </div>
                      <div class="input-group txtLabels">
                        <datetime v-model="employmentDate" input-class="form-controlCustom cstmTextDate agentEmployementDate" class="dateStyle" format="" :max-datetime="maxDatetime" placeholder="enter date" v-validate="'required'" name="employment date" ></datetime>
                      </div>
                    </div>
                    <div class="row pl-3 mt-1 mb-0 pb-0 text-danger small">
                      <span>{{ errors.first('employment date') }}</span>
                    </div>
                    <div class="eachInput">
                      <div class="input-group txtLabels">
                        <div class="input-group-prepend">
                          <div class="input-group-text customLabel">Email</div>
                        </div>
                        <input type="text" class="form-control customText" v-model="agentEmail"  placeholder="enter email" id="agentEmail" v-validate="'required|email'" name="email">
                      </div>
                    </div>
                    <div class="row pl-3 mt-1 mb-0 pb-0 text-danger small">
                      <span>{{ errors.first('email') }}</span>
                    </div>
                    <div class="eachInput">
                      <div class="input-group txtLabels">
                        <div class="input-group-prepend">
                          <div class="input-group-text customLabel text-left">Mobile <br>Number</div>
                        </div>
                        <input type="text" class="form-control customText" v-model="agentMNumber" placeholder="enter mobile number" id="agentMNumber" v-validate="'required|numeric|min:10|max:15'" name="mobile number">
                      </div>
                    </div>
                    <div class="row pl-3 mt-1 mb-0 pb-0 text-danger small">
                      <span>{{ errors.first('mobile number') }}</span>
                    </div>
                    <div class="eachInput">
                      <div class="input-group txtLabels">
                        <div class="input-group-prepend">
                          <div class="input-group-text customLabel">Current <br>Address</div>
                        </div>
                        <input type="text" class="form-control customText" v-model="agentCAddress" placeholder="enter current address" id="agentCAddress" v-validate="'required|max:255'" name="current address">
                      </div>
                    </div>
                    <div class="row pl-3 mt-1 mb-0 pb-0 text-danger small">
                      <span>{{ errors.first('current address') }}</span>
                    </div>
                    <div class="eachInput">
                      <div class="input-group txtLabels">
                        <div class="input-group-prepend">
                          <div class="input-group-text customLabel text-left">Permanent <br>Address</div>
                        </div>
                        <input type="text" class="form-control customText" v-model="agentPAddress" placeholder="enter permanent address" id="agentPAddress" v-validate="'required|max:255'" name="permanent address">
                      </div>
                    </div>
                    <div class="row pl-3 mt-1 mb-0 pb-0 text-danger small">
                      <span>{{ errors.first('permanent address') }}</span>
                    </div>
                    <div class="buttonDiv">
                      <button class="footerBtn btn" @click="nxtPage"><i class="large material-icons">arrow_forward</i></button>
                    </div>
                  <!-- End Search -->
                </div>         
              </div>
            </div>
            
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>
<script>
import sidebar from '@/components/web/Sidebar.vue'
import sidebar2 from '@/components/web/Sidebar2.vue'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import axios from 'axios'
import emberLoader from '@/components/emberLoader.vue'
export default {
  components: {
    sidebar,
    sidebar2,
    Datetime,
    emberLoader
  },
  name: 'AgentAdd',
  data: function () {
    return {
      startDate: '',
      endDate: '',
      maxDatetime: '',
      ndate: new Date(),
      branchName: [],
      dateOfBirth: '',
      employmentDate: '',
      agentStore: '',
      agentTitle: '',
      agentFName: '',
      agentLName: '',
      agentDob: '',
      agentEmail: '',
      agentMNumber: '',
      agentCAddress: '',
      agentPAddress: '',
      notAdmin: false,
      doLoad: false,
      selectedOption: '',
      focusedItemBranch: -1,
      suggestionCountBranch: 0,
    }
  },
  created: function () {
    if(localStorage.isCreating === '1' || localStorage.isCreating === '0'){
      this.selectedOption = localStorage.agentStoreName
      this.agentStore = localStorage.agentStore
      this.agentTitle = localStorage.agentTitle
      this.agentFName = localStorage.agentFName
      this.agentLName = localStorage.agentLName
      this.dateOfBirth = localStorage.agentDob 
      this.employmentDate = localStorage.agentEmployementDate 
      this.agentEmail = localStorage.agentEmail 
      this.agentMNumber = localStorage.agentMNumber
      this.agentCAddress = localStorage.agentCAddress
      this.agentPAddress = localStorage.agentPAddress
    } else {
      this.$router.push('/agent')
    }
    this.doLoad = true
    let self = this
    axios.get('api/user').then(response => {
      self.userLevel = response.data.user_level
      if(response.data.user_level === "0") {
        self.notAdmin = true
        self.callbranchName(response.data.agent_id)
      } else {
        self.notAdmin = false
        this.doLoad = false
      }
    }).catch(error => {
      console.log(error)
    })
  },
  watch: {
    dateOfBirth: function (val) {
      if(val !== ''){
        document.querySelector('.agentDob').classList.remove('has-error')
      }
    },
    employmentDate: function (val) {
      if(val !== ''){
        document.querySelector('.agentEmployementDate').classList.remove('has-error')
      }
    }
  },
  methods: {
    callbranchName (id) {
      let self = this
      let data = {
        agent_id: id
      }
      axios.post('api/branch/branchNameAgent', data).then(response => {
        // self.agentStore = response.data.data.id
        // self.selectedOption = response.data.data.branch_name
        self.branchName = response.data.data
        this.doLoad = false
      }).catch(error => {
        console.log(error)
      })
    },
    backMainMenu () {
      let expiration = localStorage.expiration
      let token = localStorage.token
      let admin = localStorage.admin
      console.log(localStorage.isTLEditing)
      if(localStorage.isTLEditing === '0') {
        localStorage.clear()
        localStorage.expiration = expiration
        localStorage.token = token
        localStorage.admin = admin
        this.$router.push('/agent')
      } else {
        localStorage.clear()
        localStorage.expiration = expiration
        localStorage.token = token
        localStorage.admin = admin
        this.$router.push('/teamlead')
      }
      
    },
    nxtPage () {
      self = this
      this.$validator.validate().then(valid => {
        if (valid) {
          localStorage.agentStore = self.agentStore || ''
          localStorage.agentTitle = self.agentTitle || ''
          localStorage.agentFName = self.agentFName || ''
          localStorage.agentLName = self.agentLName || ''
          localStorage.agentDob = self.dateOfBirth || ''
          localStorage.agentEmployementDate = self.employmentDate || ''
          localStorage.agentEmail = self.agentEmail || ''
          localStorage.agentMNumber = self.agentMNumber || ''
          localStorage.agentCAddress = self.agentCAddress || ''
          localStorage.agentPAddress = self.agentPAddress || ''
          self.$router.push('/agent/new/2')
        } else {
          if(this.dateOfBirth === ''){
            document.querySelector('.agentDob').classList.add('has-error')
          }
          if(this.employmentDate === ''){
            document.querySelector('.agentEmployementDate').classList.add('has-error')
          }
        }
      });
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
        this.selectedOption = $('.addOnKeyPress').text()
        this.agentStore = $('.addOnKeyPress').attr('name').substring(6)
        this.suggestClose()
      }else if(event.keyCode === 9){
      }else if(event.keyCode === 8){
        this.selectedOption = ''
        this.agentStore = ''
      }else{
        if(event.target.value.length > 1){
          this.suggestClose
          self = this
          let data = {
            name: event.target.value
          }
          axios.post('api/branch/suggestBranch', data).then(response => {
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
      this.selectedOption = e.target.textContent
      let id = e.target.id
      this.agentStore = $('#' + id).attr('name').substring(6)
      this.suggestClose()
    },
    suggestClose () {
      $('#livesearchBranch').empty()
      this.focusedItemBranch = -1,
      this.suggestionCountBranch = 0
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
  .dateStyle {
    width: 100%;
    color: #2699FB;
  }
  /* End Added for froms */
</style>
