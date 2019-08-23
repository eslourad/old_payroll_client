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
                  <p class="headerTitleText ml-1">Emergency Contact Information</p>
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">Contact <br />Person</div>
                      </div>
                      <input type="text" class="form-control customText" v-model="agentContactPerson"  placeholder="enter complete name" v-validate="'required|alpha_spaces|max:50'" name="contact person">
                    </div>
                  </div>
                  <div class="row pl-3 text-danger small">
                    <span>{{ errors.first('contact person') }}</span>
                  </div>
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">Mobile <br />Number</div>
                      </div>
                      <input type="text" class="form-control customText" v-model="agentMobileNumber" placeholder="enter mobile number"  v-validate="'required|numeric|min:10|max:15'" name="mobile number">
                    </div>
                  </div>
                  <div class="row pl-3 text-danger small">
                    <span>{{ errors.first('mobile number') }}</span>
                  </div>
                  <p class="headerTitleText ml-1">Educational Background</p>
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">High <br />School</div>
                      </div>
                      <input type="text" class="form-control customText" v-model="agentHighSchool" placeholder="enter school name" v-validate="'required|alpha_spaces|max:255'" name="high school">
                    </div>
                  </div>
                  <div class="row pl-3 text-danger small">
                    <span>{{ errors.first('high school') }}</span>
                  </div>
                  <div class="eachInput d-flex flex-row">
                    <div class="cbDiv pt-2">
                      <input type="checkbox" id="tsGraduated" class="cbx" v-model="agentIsHSGraduated" style="display: none;" @click="hsBxClick">
                      <label for="tsGraduated" class="check">
                        <svg class="boxbox" width="18px" height="18px" viewBox="0 0 18 18">
                          <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                          <polyline points="1 9 7 14 15 4"></polyline>
                        </svg>
                      </label>
                    </div>
                    <div class="pt-2 mt-1">
                      <span class="cboxLabel">Graduated</span>
                    </div>
                    <div class="input-group txtLabels">
                      <input type="text" class="form-control customText" @click="showYearHS(hsYear)" @keyup="showYearHS(hsYear)" v-model="hsYear"  placeholder="select year" :disabled="isNotHSGrad">
                    </div>
                  </div>
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel">College</div>
                      </div>
                      <input type="text" class="form-control customText" v-model="agentCollege" placeholder="enter school name" :disabled="isNotHSGrad">
                    </div>
                  </div>
                  <div class="eachInput d-flex flex-row">
                    <div class="cbDiv pt-2">
                      <div class="radio">
                        <input id="clOption" name="radio" type="radio" value="false" v-model="agentIsColGrad" @click="isCollegeLevel" :disabled="isNotHSGrad">
                        <label  for="clOption" class="radio-label"></label>
                      </div>
                    </div>
                    <div class="pt-2 mt-1">
                      <span class="radioLabel pr-3">College&nbsp;Level&nbsp;</span>
                    </div>
                    <div class="input-group txtLabels">
                      <input type="text" class="form-control customText" v-model="agentColCourse" placeholder="enter course" :disabled="isNotHSGrad">
                    </div>
                  </div>
                  <div class="eachInput d-flex flex-row">
                    <div class="cbDiv pt-2">
                      <div class="radio">
                        <input id="collegeOption" name="radio" type="radio" value="true" v-model="agentIsColGrad" @click="isCollegeLevel" :disabled="isNotHSGrad">
                        <label  for="collegeOption" class="radio-label"></label>
                      </div>
                    </div>
                    <div class="pt-2 mt-1">
                      <span class="radioLabel pr-4 mr-2">Graduated</span>
                    </div>
                    <div class="input-group txtLabels">
                      <input type="text" class="form-control customText" v-model="collegeYear"  @click="showYearCol(collegeYear)" @keyup="showYearCol(collegeYear)" placeholder="select year" :disabled="isNotHSGrad">
                    </div>
                  </div>
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">Technical <br>School</div>
                      </div>
                      <input type="text" class="form-control customText" v-model="agentTS" placeholder="enter school name" :disabled="isNotHSGrad">
                    </div>
                  </div>
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">Program</div>
                      </div>
                      <input type="text" class="form-control customText" v-model="agentTSProgram" placeholder="enter program" :disabled="isNotHSGrad">
                    </div>
                  </div>
                  <div class="eachInput d-flex flex-row">
                    <div class="cbDiv pt-2">
                      <input type="checkbox" id="cbGraduated" class="cbx" v-model="agentIsTSGrad" style="display: none;" @click="tsBxClick" :disabled="isNotHSGrad">
                      <label for="cbGraduated" class="check">
                        <svg class="boxbox disabledBoxbox" id="svgForTS" width="18px" height="18px" viewBox="0 0 18 18">
                          <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                          <polyline points="1 9 7 14 15 4"></polyline>
                        </svg>
                      </label>
                    </div>
                    <div class="pt-2 mt-1">
                      <span class="cboxLabel">Graduated</span>
                    </div>
                    <div class="input-group txtLabels">
                      <input type="text" class="form-control customText"  @click="showYearTec(tsYear)" @keyup="showYearTec(tsYear)" v-model="tsYear"  placeholder="select year" :disabled=isNotHSGrad>
                    </div>
                  </div>
                  <div class="buttonDiv">
                    <button class="footerBtn btn" id="test" @click="toPageThree"><i class="large material-icons">arrow_forward</i></button>
                  </div>
                  <!-- End Search -->
                </div>
                <div class="popUpYear" v-show="yearVisibleHS">
                  <div class="vdatetime-overlay" @click="overlayClick"></div>
                  <div class="vdatetime-popup">
                    <div class="vdatetime-popup__header">
                      <div class="vdatetime-popup__year">
                        Choose Year
                      </div>
                    </div>
                    <div class="vdatetime-popup__body">
                      <div id="yearListHS" class="vdatetime-year-picker__list  text-center">
                        <div class="vdatetime-year-picker__item" v-for="yrs in numOfYearsHS" :key="'hsyr' + yrs" :id="'yearIDHs' + yrs" @click="yearSelected">{{ yrs }}</div>
                      </div>
                      <div id="lastItem"></div>
                    </div>
                  </div>
                </div>
                <div class="popUpYear" v-show="yearVisibleCol">
                  <div class="vdatetime-overlay" @click="overlayClick"></div>
                  <div class="vdatetime-popup">
                    <div class="vdatetime-popup__header">
                      <div class="vdatetime-popup__year">
                        Choose Year
                      </div>
                    </div>
                    <div class="vdatetime-popup__body">
                      <div id="yearListCol" class="vdatetime-year-picker__list yearList2 text-center">
                        <div class="vdatetime-year-picker__item" v-for="yrs in numOfYearsCol" :key="'colyr' + yrs" :id="'yearIDCol' + yrs" @click="yearSelected">{{ yrs }}</div>
                      </div>
                      <div id="lastItem"></div>
                    </div>
                  </div>
                </div>
                <div class="popUpYear" v-show="yearVisibleTec">
                  <div class="vdatetime-overlay" @click="overlayClick"></div>
                  <div class="vdatetime-popup">
                    <div class="vdatetime-popup__header">
                      <div class="vdatetime-popup__year">
                        Choose Year
                      </div>
                    </div>
                    <div class="vdatetime-popup__body">
                      <div id="yearListTec" class="vdatetime-year-picker__list yearList3 text-center">
                        <div class="vdatetime-year-picker__item" v-for="yrs in numOfYearsTec" :key="'tecyr' + yrs" :id="'yearIDTec' + yrs" @click="yearSelected">{{ yrs }}</div>
                      </div>
                      <div id="lastItem"></div>
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
  name: 'AgentAddPage2',
  data: function () {
    return {
      hsYear: null,
      tsYear: null,
      collegeYear: null,
      hsIsDisabled: true,
      clIsDisabled: true,
      cgIsDisabled: true,
      tsIsDisabled: true,
      yearIndicator: null,
      yearVisibleHS: false,
      yearVisibleCol: false,
      yearVisibleTec: false,
      prevHsValueInCol: '',
      prevHsValueInTec: '',
      numOfYearsHS: [],
      numOfYearsCol: [],
      numOfYearsTec: [],
      isNotHSGrad: true,
      agentContactPerson: '',
      agentMobileNumber: '',
      agentHighSchool: '',
      agentIsHSGraduated:  '',
      agentCollege: '',
      agentIsColGrad: '',
      agentColGradYear: '',
      agentColLevel: '',
      agentColCourse: '',
      agentTS: '',
      agentTSProgram: '',
      agentIsTSGrad: '',
      admin: false
    }
  },
  created: function () {
    if(localStorage["agentStore"] && localStorage["agentTitle"] && localStorage["agentFName"] && localStorage["agentLName"] && localStorage["agentDob"] && localStorage["agentEmployementDate"] && localStorage["agentEmail"] && localStorage["agentMNumber"] && localStorage["agentCAddress"] && localStorage["agentPAddress"]){
      this.agentContactPerson = localStorage.agentContactPerson
      this.agentMobileNumber = localStorage.agentMobileNumber 
      this.agentHighSchool = localStorage.agentHighSchool
      this.agentIsHSGraduated = localStorage['agentIsHSGraduated'] ? localStorage.agentIsHSGraduated  : ''
      this.hsYear = localStorage['hsYear'] ? localStorage.hsYear  : ''
      this.agentCollege = localStorage['agentCollege'] ? localStorage.agentCollege : ''
      this.agentIsColGrad = localStorage['agentIsColGrad'] ? localStorage.agentIsColGrad  : ''
      this.collegeYear = localStorage['collegeYear'] ? localStorage.collegeYear  : ''
      this.agentColCourse = localStorage['agentColCourse'] ? localStorage.agentColCourse  : ''
      this.agentTSProgram = localStorage['agentTSProgram'] ?  localStorage.agentTSProgram  : ''
      this.agentIsTSGrad = localStorage['agentIsTSGrad'] ?  localStorage.agentIsTSGrad  : ''
      this.tsYear = localStorage['tsYear'] ?  localStorage.tsYear  : ''
      this.agentTS = localStorage['tsSchool'] ?  localStorage.tsSchool  : ''

      this.agentIsHSGraduated = localStorage['agentIsHSGraduated'] === 'null' ?  '' : this.agentIsHSGraduated
      this.hsYear = localStorage['hsYear'] === 'null' ?  '' : this.hsYear
      this.agentCollege = localStorage['agentCollege'] === 'null' ?  '' : this.agentCollege
      this.agentIsColGrad = localStorage['agentIsColGrad'] === 'null' ?  '' : this.agentIsColGrad
      this.collegeYear = localStorage['collegeYear'] === 'null' ?  '' : this.collegeYear
      this.agentColCourse = localStorage['agentColCourse'] === 'null' ?  '' : this.agentColCourse
      this.agentTSProgram = localStorage['agentTSProgram'] === 'null' ?  '' : this.agentTSProgram
      this.agentIsTSGrad = localStorage['agentIsTSGrad'] === 'null' ?  '' : this.agentIsTSGrad
      this.tsYear = localStorage['tsYear'] === 'null' ?  '' : this.tsYear
      this.agentTS = localStorage['tsSchool'] === 'null' ? '' : this.agentTS

      if(this.agentIsHSGraduated === 'true') {
        this.isNotHSGrad = false
      } else {
        this.isNotHSGrad = true
        this.agentIsHSGraduated = null
      }
      if(this.agentIsTSGrad === 'false') {
        this.agentIsTSGrad = null
      }
      let thisYear = (new Date()).getFullYear()
      for (var i = 0; i <= 100; i++) {
        this.numOfYearsHS.push(thisYear - i)
      }
      if(localStorage.admin === 'true') {
        this.admin = true
      } else {
        this.admin = false
      }
    } else {
      this.$router.push('/agent/new')
    }
  },
  methods: {
    backMainMenu () {
      localStorage.agentContactPerson = this.agentContactPerson || ''
      localStorage.agentMobileNumber = this.agentMobileNumber || ''
      localStorage.agentHighSchool = this.agentHighSchool || ''
      localStorage.agentIsHSGraduated = this.agentIsHSGraduated || ''
      localStorage.hsYear = this.hsYear || ''
      localStorage.agentCollege = this.agentCollege || ''
      localStorage.agentIsColGrad = this.agentIsColGrad || ''
      localStorage.collegeYear = this.collegeYear || ''
      localStorage.agentColCourse = this.agentColCourse || ''
      localStorage.agentTSProgram = this.agentTSProgram || ''
      localStorage.agentIsTSGrad = this.agentIsTSGrad || ''
      localStorage.tsYear = this.tsYear || ''
      localStorage.tsSchool = this.agentTS || ''
      this.$router.push('/agent/new')
    },
    // PAG SUBMIT DAPAT CHECK ANG MGA YEAR KAY MA TYPAN
    hsBxClick (event) {
      if (event.target.checked) {
        if(parseInt((new Date()).getFullYear()) !== parseInt(this.hsYear)) {
          this.enableColege()
        }else{
          this.hsIsDisabled = false
        }
      }else{
        this.disableCollege()
      }
    },
    disableCollege () {
      this.hsIsDisabled = true
      this.isNotHSGrad = true
      this.cgIsDisabled = true
      this.tsIsDisabled = true
      this.clIsDisabled = true
      $('#svgForTS').addClass('disabledBoxbox')
    },
    enableColege () {
      this.hsIsDisabled = false
      this.isNotHSGrad = false
      this.isCollegeLevel()
      if($('#collegeOption').is(':not(:checked)') && $('#clOption').is(':not(:checked)')){
        this.cgIsDisabled = true
      }
      this.tsBxClick()
      $('#svgForTS').removeClass('disabledBoxbox')
    },
    tsBxClick () {
      if($('#cbGraduated').is(':checked')) {
        this.tsIsDisabled = false
      }else{
        this.tsIsDisabled = true
      }
    },
    isCollegeLevel () {
      if($('#clOption').is(':checked')) {
        this.cgIsDisabled = true
      }else{
        this.cgIsDisabled = false
      }
    },
    showYearHS (yr) {
      event.preventDefault()
      event.target.blur()
      this.hsYear = ''
      this.yearVisibleHS = true
      $('.vdatetime-year-picker__item').removeClass('vdatetime-item-selected')
      $('#yearIDHs' + yr).addClass('vdatetime-item-selected')
      this.yearIndicator = 'hsInput'
    },
    showYearCol (yr) {
      event.preventDefault()
      event.target.blur()
      this.collegeYear = ''
      if(this.prevHsValueInCol !== this.hsYear){
        this.numOfYearsCol = []
        let thisYear = (new Date()).getFullYear()
        let yearLimit  = parseInt(thisYear) - parseInt(this.hsYear)
        let newHieght = ((yearLimit * 50) + 13) + 'px'
        $('.yearList2').height(newHieght)
        if(!isNaN(yearLimit)) {
          for (var i = 0; i < yearLimit; i++) {
            this.numOfYearsCol.push(thisYear - i)
          }
        } else {
          for (var r = 0; r <= 100; r++) {
            this.numOfYearsCol.push(thisYear - r)
          }
        }
        this.prevHsValueInCol = this.hsYear
      }
      $('.vdatetime-year-picker__item').removeClass('vdatetime-item-selected')
      $('#yearIDCol' + yr).addClass('vdatetime-item-selected')
      this.yearVisibleCol = true
      this.yearIndicator = 'collegeInput'
    },
    showYearTec (yr) {
      event.preventDefault()
      event.target.blur()
      this.tsYear = ''
      if(this.prevHsValueInTec !== this.hsYear){
        this.numOfYearsTec = []
        let thisYear = (new Date()).getFullYear()
        let yearLimit  = parseInt(thisYear) - parseInt(this.hsYear)
        let newHieght = ((yearLimit * 50) + 13) + 'px'
        $('.yearList3').height(newHieght)
        if(!isNaN(yearLimit)) {
          for (var i = 0; i < yearLimit; i++) {
            this.numOfYearsTec.push(thisYear - i)
          }
        } else {
          for (var y = 0; y <= 100; y++) {
            this.numOfYearsTec.push(thisYear - y)
          }
        }
        this.prevHsValueInTec = this.hsYear
      }
      $('.vdatetime-year-picker__item').removeClass('vdatetime-item-selected')
      $('#yearIDTec' + yr).addClass('vdatetime-item-selected')
      this.yearVisibleTec = true
      this.yearIndicator = 'tsInput' 
    },
    overlayClick () {
      this.yearVisibleHS = false
      this.yearVisibleCol = false
      this.yearVisibleTec = false
    },
    yearSelected (event) {
      $('.vdatetime-year-picker__item').removeClass('vdatetime-item-selected')
      event.target.classList.toggle('vdatetime-item-selected')
      this.overlayClick()
      if(this.yearIndicator === 'hsInput'){
        this.hsYear = event.target.innerHTML
        let thisYear = (new Date()).getFullYear()
        if(parseInt(event.target.innerHTML) === parseInt(thisYear)) {
          this.disableCollege()
          this.hsIsDisabled = false
        }else{
          this.enableColege()
        }
        if(this.hsYear >= this.collegeYear){
          this.collegeYear = ''
        }
        if(this.hsYear >= this.tsYear){
          this.tsYear = ''
        }
      }else if (this.yearIndicator === 'collegeInput') {
        this.collegeYear = event.target.innerHTML
      }else{
        this.tsYear = event.target.innerHTML
      }
    },
    toPageThree () {
      let self = this
      this.$validator.validate().then(valid => {
        if (valid) {
          localStorage.agentContactPerson = self.agentContactPerson || ''
          localStorage.agentMobileNumber = self.agentMobileNumber || ''
          localStorage.agentHighSchool = self.agentHighSchool || ''
          localStorage.agentIsHSGraduated = self.agentIsHSGraduated || ''
          localStorage.hsYear = self.hsYear || ''
          localStorage.agentCollege = self.agentCollege || ''
          localStorage.agentIsColGrad = self.agentIsColGrad || ''
          localStorage.collegeYear = self.collegeYear || ''
          localStorage.agentColCourse = self.agentColCourse || ''
          localStorage.agentTSProgram = self.agentTSProgram || ''
          localStorage.agentIsTSGrad = self.agentIsTSGrad || ''
          localStorage.tsYear = self.tsYear || ''
          localStorage.tsSchool = self.agentTS || ''
          self.$router.push('/agent/new/3')
        } else {
        }
      })
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
      height: 90vh;
      min-height: 821px;
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
  /* End Added for froms */
</style>
