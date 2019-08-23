<template>
  <div class="">
    <transition name="fadeMain">
      <div>
        <div class="side">
          <sidebar v-if="admin"></sidebar>
          <sidebar2 v-if="!admin"></sidebar2>
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
              <div class="row">
                <div class="col-md-12 formRow col-lg-6 col-xl-3">
                  <p class="headerTitleText ml-1">Employment History</p>
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">Company<br/>Name 1</div>
                      </div>
                      <input type="text" class="form-control customText" v-model="agentCompany" placeholder="enter company name" v-validate="'required|max:255'" name="company name 1">
                    </div>
                  </div>
                  <div class="row pl-3 text-danger small">
                    <span>{{ errors.first('company name 1') }}</span>
                  </div>
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">Position</div>
                      </div>
                      <input type="text" class="form-control customText" v-model="agentPosition" placeholder="enter position" v-validate="'required|max:255'" name="position">
                    </div>
                  </div>
                  <div class="row pl-3 text-danger small">
                    <span>{{ errors.first('position') }}</span>
                  </div>
                  <div class="eachInput d-flex flex-row">
                    <input type="text" class="form-control customText mr-2" id="fr1" @click="showYearFrom1('fr1')" @keyup="showYearFrom1('fr1')" v-model="comp1From" placeholder="from year" v-validate="'required|numeric|max:4'" name="from">
                    <i class="large material-icons iconAlign pt-2 mt-1 arrow-color">trending_flat</i>
                    <input type="text" class="form-control customText ml-2" id="to1" @click="showYearTo1('to1', comp1From)" @keyup="showYearTo1('to1', comp1From)" v-model="comp1To" placeholder="to year" v-validate="'required|numeric|max:4'" name="to">
                  </div>
                  <div class="row pl-3 text-danger small">
                    <span>{{ errors.first('from') }}</span>
                  </div>
                  <div class="row pl-3 text-danger small">
                    <span>{{ errors.first('to') }}</span>
                  </div>
                  <!-- Company 2 -->
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">Company<br/>Name 2</div>
                      </div>
                      <input type="text" class="form-control customText" v-validate="'max:255'" name="company 2" v-model="agentCompany2" placeholder="enter company name">
                    </div>
                  </div>
                  <div class="row pl-3 text-danger small">
                    <span>{{ errors.first('company 2') }}</span>
                  </div>
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">Position</div>
                      </div>
                      <input type="text" class="form-control customText" v-validate="'max:255'" name="company 2 position" v-model="agentPosition2" placeholder="enter position">
                    </div>
                  </div>
                  <div class="row pl-3 text-danger small">
                    <span>{{ errors.first('company 2 position') }}</span>
                  </div>
                  <div class="eachInput d-flex flex-row">
                    <input type="text" class="form-control customText mr-2" v-validate="'numeric|max:4'" name="comapny 2 from" id="fr2" @click="showYearFrom2('fr2')" @keyup="showYearFrom2('fr2')" v-model="comp2From" placeholder="from year">
                    <i class="large material-icons iconAlign pt-2 mt-1 arrow-color">trending_flat</i>
                    <input type="text" class="form-control customText ml-2" v-validate="'numeric|max:4'" name="comapny 2 to" id="to2" @click="showYearTo2('to2', comp2From)" @keyup="showYearTo2('to2', comp2From)" v-model="comp2To" placeholder="to year">
                  </div>
                  <div class="row pl-3 text-danger small">
                    <span>{{ errors.first('comapny 2 from') }}</span>
                    <span>{{ errors.first('comapny 2 to') }}</span>
                  </div>
                  <!-- Company 3 -->
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">Company<br/>Name 3</div>
                      </div>
                      <input type="text" class="form-control customText" v-validate="'max:255'" name="company 3" v-model="agentCompany3" placeholder="enter company name">
                    </div>
                  </div>
                  <div class="row pl-3 text-danger small">
                    <span>{{ errors.first('company 3') }}</span>
                  </div>
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">Position</div>
                      </div>
                      <input type="text" class="form-control customText" v-validate="'max:255'" name="company 3 position" v-model="agentPosition3" placeholder="enter position">
                    </div>
                  </div>
                  <div class="row pl-3 text-danger small">
                    <span>{{ errors.first('company 3 position') }}</span>
                  </div>
                  <div class="eachInput d-flex flex-row">
                    <input type="text" class="form-control customText mr-2" v-validate="'numeric|max:4'" name="comapny 3 from" id="fr3" @click="showYearFrom3('fr3')" @keyup="showYearFrom3('fr3')" v-model="comp3From" placeholder="from year">
                    <i class="large material-icons iconAlign pt-2 mt-1 arrow-color">trending_flat</i>
                    <input type="text" class="form-control customText ml-2" v-validate="'numeric|max:4'" name="comapny 3 to" id="to3" @click="showYearTo3('to3', comp3From)" @keyup="showYearTo3('to3', comp3From)" v-model="comp3To" placeholder="to year">
                  </div>
                  <div class="row pl-3 text-danger small">
                    <span>{{ errors.first('comapny 3 from') }}</span>
                    <span>{{ errors.first('comapny 3 to') }}</span>
                  </div>
                  <!-- Button -->
                  <div class="buttonDiv">
                    <button class="footerBtn btn" id="test" @click="toPageFour"><i class="large material-icons">arrow_forward</i></button>
                  </div>
                  <!-- Company 1 Calendar -->
                  <div class="popUpYear" v-show="yearF1Visible">
                    <div class="vdatetime-overlay" @click="overlayClick"></div>
                    <div class="vdatetime-popup">
                      <div class="vdatetime-popup__header">
                        <div class="vdatetime-popup__year">
                          Choose Year
                        </div>
                      </div>
                      <div class="vdatetime-popup__body">
                        <div id="yrListFrom1" class="vdatetime-year-picker__list vdatetime-year-picker__list text-center">
                          <div class="vdatetime-year-picker__item" v-for="yrs in fr1yrs" :key="'fr1yr' + yrs" :id="'yearIDfr1' + yrs" @click="yearSelected">{{ yrs }}</div>
                        </div>
                        <div id="lastItem"></div>
                      </div>
                    </div>
                  </div>
                  <div class="popUpYear" v-show="yearT1Visible">
                    <div class="vdatetime-overlay" @click="overlayClick"></div>
                    <div class="vdatetime-popup">
                      <div class="vdatetime-popup__header">
                        <div class="vdatetime-popup__year">
                          Choose Year
                        </div>
                      </div>
                      <div class="vdatetime-popup__body">
                        <div id="yrListTo1" class="vdatetime-year-picker__list vdatetime-year-picker__list text-center">
                          <div class="vdatetime-year-picker__item" v-for="yrs in to1yrs" :key="'to1yr' + yrs" :id="'yearIDto1' + yrs" @click="yearSelected">{{ yrs }}</div>
                        </div>
                        <div id="lastItem"></div>
                      </div>
                    </div>
                  </div>
                  <!-- Company 2 Calendar -->
                  <div class="popUpYear" v-show="yearF2Visible">
                    <div class="vdatetime-overlay" @click="overlayClick"></div>
                    <div class="vdatetime-popup">
                      <div class="vdatetime-popup__header">
                        <div class="vdatetime-popup__year">
                          Choose Year
                        </div>
                      </div>
                      <div class="vdatetime-popup__body">
                        <div id="yrListFr2" class="vdatetime-year-picker__list vdatetime-year-picker__list text-center">
                          <div class="vdatetime-year-picker__item" v-for="yrs in fr2yrs" :key="'fr2yrs' + yrs" :id="'yearIDfr2' + yrs" @click="yearSelected">{{ yrs }}</div>
                        </div>
                        <div id="lastItem"></div>
                      </div>
                    </div>
                  </div>
                  <div class="popUpYear" v-show="yearT2Visible">
                    <div class="vdatetime-overlay" @click="overlayClick"></div>
                    <div class="vdatetime-popup">
                      <div class="vdatetime-popup__header">
                        <div class="vdatetime-popup__year">
                          Choose Year
                        </div>
                      </div>
                      <div class="vdatetime-popup__body">
                        <div id="yrListTo2" class="vdatetime-year-picker__list vdatetime-year-picker__list text-center">
                          <div class="vdatetime-year-picker__item" v-for="yrs in to2yrs" :key="'to2yrs' + yrs" :id="'yearIDto2' + yrs" @click="yearSelected">{{ yrs }}</div>
                        </div>
                        <div id="lastItem"></div>
                      </div>
                    </div>
                  </div>
                  <!-- Company 3 Calendar -->
                  <div class="popUpYear" v-show="yearF3Visible">
                    <div class="vdatetime-overlay" @click="overlayClick"></div>
                    <div class="vdatetime-popup">
                      <div class="vdatetime-popup__header">
                        <div class="vdatetime-popup__year">
                          Choose Year
                        </div>
                      </div>
                      <div class="vdatetime-popup__body">
                        <div id="yrListFr3" class="vdatetime-year-picker__list vdatetime-year-picker__list text-center">
                          <div class="vdatetime-year-picker__item" v-for="yrs in fr3yrs" :key="'fr3yrs' + yrs" :id="'yearIDfr3' + yrs" @click="yearSelected">{{ yrs }}</div>
                        </div>
                        <div id="lastItem"></div>
                      </div>
                    </div>
                  </div>
                  <div class="popUpYear" v-show="yearT3Visible">
                    <div class="vdatetime-overlay" @click="overlayClick"></div>
                    <div class="vdatetime-popup">
                      <div class="vdatetime-popup__header">
                        <div class="vdatetime-popup__year">
                          Choose Year
                        </div>
                      </div>
                      <div class="vdatetime-popup__body">
                        <div id="yrListTo3" class="vdatetime-year-picker__list vdatetime-year-picker__list text-center">
                          <div class="vdatetime-year-picker__item" v-for="yrs in to3yrs" :key="'to3yrs' + yrs" :id="'yearIDto3' + yrs" @click="yearSelected">{{ yrs }}</div>
                        </div>
                        <div id="lastItem"></div>
                      </div>
                    </div>
                  </div>
                </div>      
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
    <!--Confirmation Page-->
  </div>
</template>
<script>
import sidebar from '@/components/web/Sidebar.vue'
import sidebar2 from '@/components/web/Sidebar2.vue'
export default {
  components: {
    sidebar,
    sidebar2
  },
  name: 'AgentAddPage3',
  data: function () {
    return {
      yearIndicator: null,
      yearF1Visible: false,
      yearT1Visible: false,
      yearF2Visible: false,
      yearT2Visible: false,
      yearF3Visible: false,
      yearT3Visible: false,
      fr1yrs: [],
      to1yrs: [],
      fr2yrs: [],
      to2yrs: [],
      fr3yrs: [],
      to3yrs: [],
      comp1From: null,
      comp2From: null,
      comp3From: null,
      comp1To: null,
      comp2To: null,
      comp3To: null,
      agentCompany2: '',
      agentPosition2: '',
      agentCompany3: '',
      agentPosition3: '',
      admin: false
    }
  },
  created: function () {
    if(localStorage["agentContactPerson"] && localStorage["agentMobileNumber"] && localStorage["agentHighSchool"]){
      this.agentCompany = localStorage.agentCompany
      this.agentPosition = localStorage.agentPosition
      this.comp1From = localStorage.comp1From
      this.comp1To = localStorage.comp1To
      this.agentCompany2 = localStorage['agentCompany2'] ? localStorage.agentCompany2 : '' 
      this.agentPosition2 = localStorage['agentPosition2'] ? localStorage.agentPosition2 : '' 
      this.comp2From = localStorage['comp2From'] ? localStorage.comp2From : '' 
      this.comp2To = localStorage['comp2To'] ? localStorage.comp2To : '' 
      this.agentCompany3 = localStorage['agentCompany3'] ? localStorage.agentCompany3 : '' 
      this.agentPosition3 = localStorage['agentPosition3'] ? localStorage.agentPosition3 : '' 
      this.comp3From = localStorage['comp3From'] ? localStorage.comp3From : '' 
      this.comp3To = localStorage['comp3To'] ? localStorage.comp3To : '' 

      this.agentCompany2 = localStorage['agentCompany2'] === 'null' ? '' : this.agentCompany2
      this.agentPosition2 = localStorage['agentPosition2'] === 'null' ? '' : this.agentPosition2
      this.comp2From = localStorage['comp2From'] === 'null' ? '' : this.comp2From
      this.comp2To = localStorage['comp2To'] === 'null' ? '' : this.comp2To
      this.agentCompany3 = localStorage['agentCompany3'] === 'null' ? '' : this.agentCompany3
      this.agentPosition3 = localStorage['agentPosition3'] === 'null' ? '' : this.agentPosition3
      this.comp3From = localStorage['comp3From'] === 'null' ? '' : this.comp3From 
      this.comp3To = localStorage['comp3To'] === 'null' ? '' : this.comp3To

      if(localStorage.admin === 'true') {
        this.admin = true
      } else {
        this.admin = false
      }
    } else {
      this.$router.push('/agent/new/2')
    }
  },
  methods: {
    backMainMenu () {
      localStorage.agentCompany = this.agentCompany  || ''
      localStorage.agentPosition = this.agentPosition  || ''
      localStorage.comp1From = this.comp1From  || ''
      localStorage.comp1To = this.comp1To  || ''
      localStorage.agentCompany2 = this.agentCompany2 || ''
      localStorage.agentPosition2 = this.agentPosition2 || ''
      localStorage.comp2From = this.comp2From || ''
      localStorage.comp2To = this.comp2To || ''
      localStorage.agentCompany3 = this.agentCompany3 || ''
      localStorage.agentPosition3 = this.agentPosition3 || ''
      localStorage.comp3From = this.comp3From || ''
      localStorage.comp3To = this.comp3To || ''
      this.$router.push('/agent/new/2')
    },
    resetDate () {
      let yrList = []
      let thisYear = (new Date()).getFullYear()
      for (var i = 0; i <= 100; i++) {
        yrList.push(thisYear - i)
      }
      return yrList
    },
    resetDateWithLimit(limit) {
      let thisYear = (new Date()).getFullYear()
      let yrList = []
      limit = thisYear - limit
      yrList = []
      for (var i = 0; i <= limit; i++) {
        yrList.push(thisYear - i)
      }
      return yrList
    },
    overlayClick () {
      this.yearF1Visible = false
      this.yearT1Visible = false
      this.yearF2Visible = false
      this.yearT2Visible = false
      this.yearF3Visible = false
      this.yearT3Visible = false
    },
    showYearFrom1 (inputModel) {
      event.preventDefault()
      event.target.blur()
      this.fr1yrs = this.resetDate()
      $('#yearIDfr1' + this.comp1From).addClass('vdatetime-item-selected')
      this.yearF1Visible = true;
      this.yearIndicator = inputModel
    },
    showYearTo1 (inputModel, yearLimit) {
      event.preventDefault()
      event.target.blur()
      this.to1yrs = this.resetDateWithLimit(yearLimit)
      $('#yearIDto1' + this.comp1To).addClass('vdatetime-item-selected')
      this.yearT1Visible = true;
      this.yearIndicator = inputModel
    },
    showYearFrom2 (inputModel) {
      event.preventDefault()
      event.target.blur()
      this.fr2yrs = this.resetDate()
      $('#yearIDfr2' + this.comp2From).addClass('vdatetime-item-selected')
      this.yearF2Visible = true;
      this.yearIndicator = inputModel
    },
    showYearTo2 (inputModel, yearLimit) {
      event.preventDefault()
      event.target.blur()
      this.to2yrs = this.resetDateWithLimit(yearLimit)
      $('#yearIDto2' + this.comp2To).addClass('vdatetime-item-selected')
      this.yearT2Visible = true;
      this.yearIndicator = inputModel
    },
    showYearFrom3 (inputModel) {
      event.preventDefault()
      event.target.blur()
      this.fr3yrs = this.resetDate()
      $('#yearIDfr2' + this.comp3From).addClass('vdatetime-item-selected')
      this.yearF3Visible = true;
      this.yearIndicator = inputModel
    },
    showYearTo3 (inputModel, yearLimit) {
      event.preventDefault()
      event.target.blur()
      this.to3yrs = this.resetDateWithLimit(yearLimit)
      $('#yearIDto2' + this.comp3To).addClass('vdatetime-item-selected')
      this.yearT3Visible = true;
      this.yearIndicator = inputModel
    },
    yearSelected (event) {
      $('.vdatetime-year-picker__item').removeClass('vdatetime-item-selected')
      event.target.classList.toggle('vdatetime-item-selected')
      if(this.yearIndicator === 'fr1'){
        this.comp1From = event.target.innerHTML
        this.yearF1Visible = false
        if(this.comp1From > this.comp1To) {
          this.comp1To = null
        }
      } else if (this.yearIndicator === 'to1') {
        this.comp1To = event.target.innerHTML
        this.yearT1Visible = false
      } else if (this.yearIndicator === 'fr2') {
        this.comp2From = event.target.innerHTML
        this.yearF2Visible = false
        if(this.comp2From > this.comp2To) {
          this.comp2To = null
        }
      } else if (this.yearIndicator === 'to2') {
        this.comp2To = event.target.innerHTML
        this.yearT2Visible = false
      } else if (this.yearIndicator === 'fr3') {
        this.comp3From = event.target.innerHTML
        this.yearF3Visible = false
        if(this.comp3From > this.comp3To) {
          this.comp3To = null
        }
      } else if (this.yearIndicator === 'to3') {
        this.comp3To = event.target.innerHTML
        this.yearT3Visible = false
      } else{
        this.tsYear = event.target.innerHTML
      }
      this.yearIndicator = null
    },
    toPageFour () {
      let self = this
      this.$validator.validate().then(valid => {
        if (valid) {
          localStorage.agentCompany = self.agentCompany || ''
          localStorage.agentPosition = self.agentPosition || ''
          localStorage.comp1From = self.comp1From || ''
          localStorage.comp1To = self.comp1To || ''
          localStorage.agentCompany2 = self.agentCompany2 || ''
          localStorage.agentPosition2 = self.agentPosition2 || ''
          localStorage.comp2From = self.comp2From || ''
          localStorage.comp2To = self.comp2To || ''
          localStorage.agentCompany3 = self.agentCompany3 || ''
          localStorage.agentPosition3 = self.agentPosition3 || ''
          localStorage.comp3From = self.comp3From || ''
          localStorage.comp3To = self.comp3To || ''
          self.$router.push('/agent/new/4')
        } else {
          if(self.dateOfBirth === ''){
            document.querySelector('.agentDob').classList.add('has-error')
          }
          if(self.employmentDate === ''){
            document.querySelector('.agentEmployementDate').classList.add('has-error')
          }
        }
      });
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
  .headerTitleText {
    font-size: 14px;
    margin-bottom: 0px;
    margin-top: 16px;
    color: #2699FB;
  }
  .cboxLabel {
    font-size: 14px;
    margin-right: 10px;
    color: #2699FB;
  }
  .radioLabel {
    font-size: 10px;
    margin-right: 0;
    color: #2699FB;
  }
  .vdatetime-popup {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    z-index: 1000;
    position: fixed;
    top: 48%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 340px;
    max-width: calc(100% - 30px);
    -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .3);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .3);
    color: #444;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    background: #fff;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .vdatetime-popup__header {
    padding: 15px 30px;
    background: #3f51b5;
    color: #fff;
    font-size: 32px;
  }
  .vdatetime-popup__year {
    display: block;
    font-weight: 300;
    font-size: 14px;
    opacity: 0.7;
    cursor: pointer;
    -webkit-transition: opacity .3s;
    transition: opacity .3s;
  }
  .vdatetime-year-picker__list {
    float: left;
    width: 100%;
    max-height: 305px;
    overflow-y: scroll;
  }
  .vdatetime-year-picker__item {
    padding: 10px 0;
    font-size: 20px;
    text-align: center;
    cursor: pointer;
    -webkit-transition: font-size .3s;
    transition: font-size .3s;
  }
  .vdatetime-item-selected {
    color: #3f51b5;
    font-size: 32px;
  }
  .vdatetime-item-disabled {
    opacity: 0.4;
    cursor: default;
  }
  .vdatetime-year-picker__item:hover {
    font-size: 32px;
  }
  .arrow-color {
    color: #2699FB
  }
  /* End Added for froms */
</style>
