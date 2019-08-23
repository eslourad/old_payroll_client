<template>
  <div>
    <p class="headerTitleText ml-1">Emergency Contact Information</p>
    <div class="eachInput">
      <div class="input-group txtLabels">
        <div class="input-group-prepend">
          <div class="input-group-text customLabel text-left">Contact <br />Person</div>
        </div>
        <input type="text" class="form-control customText"  placeholder="enter complete name">
      </div>
    </div>
    <div class="eachInput">
      <div class="input-group txtLabels">
        <div class="input-group-prepend">
          <div class="input-group-text customLabel text-left">Mobile <br />Number</div>
        </div>
        <input type="text" class="form-control customText"  placeholder="enter mobile number">
      </div>
    </div>
    <p class="headerTitleText ml-1">Educational Background</p>
    <div class="eachInput">
      <div class="input-group txtLabels">
        <div class="input-group-prepend">
          <div class="input-group-text customLabel text-left">High <br />School</div>
        </div>
        <input type="text" class="form-control customText"  placeholder="enter school name">
      </div>
    </div>
    <div class="eachInput d-flex flex-row">
      <div class="cbDiv pt-2">
        <input type="checkbox" id="tsGraduated" class="cbx" style="display: none;" @click="hsBxClick">
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
        <input type="text" class="form-control customText" @click="showYearHS(hsYear)" @keyup="showYearHS(hsYear)" v-model="hsYear"  placeholder="select year" :disabled=hsIsDisabled>
      </div>
    </div>
    <div class="eachInput">
      <div class="input-group txtLabels">
        <div class="input-group-prepend">
          <div class="input-group-text customLabel">College</div>
        </div>
        <input type="text" class="form-control customText" placeholder="enter school name" :disabled="isNotHSGrad">
      </div>
    </div>
    <div class="eachInput d-flex flex-row">
      <div class="cbDiv pt-2">
        <div class="radio">
          <input id="clOption" name="radio" type="radio" @click="isCollegeLevel" :disabled="isNotHSGrad">
          <label  for="clOption" class="radio-label"></label>
        </div>
      </div>
      <div class="pt-2 mt-1">
        <span class="radioLabel pr-3">College&nbsp;Level&nbsp;</span>
      </div>
      <div class="input-group txtLabels">
        <input type="text" class="form-control customText"  placeholder="enter course"  :disabled="clIsDisabled">
      </div>
    </div>
    <div class="eachInput d-flex flex-row">
      <div class="cbDiv pt-2">
        <div class="radio">
          <input id="collegeOption" name="radio" type="radio" @click="isCollegeLevel" :disabled="isNotHSGrad">
          <label  for="collegeOption" class="radio-label"></label>
        </div>
      </div>
      <div class="pt-2 mt-1">
        <span class="radioLabel pr-4 mr-2">Graduated</span>
      </div>
      <div class="input-group txtLabels">
        <input type="text" class="form-control customText" v-model="collegeYear"  @click="showYearCol(collegeYear)" @keyup="showYearCol(collegeYear)" placeholder="select year" :disabled="cgIsDisabled">
      </div>
    </div>
    <div class="eachInput">
      <div class="input-group txtLabels">
        <div class="input-group-prepend">
          <div class="input-group-text customLabel text-left">Technical <br>School</div>
        </div>
        <input type="text" class="form-control customText"  placeholder="enter school name" :disabled="isNotHSGrad">
      </div>
    </div>
    <div class="eachInput">
      <div class="input-group txtLabels">
        <div class="input-group-prepend">
          <div class="input-group-text customLabel text-left">Program</div>
        </div>
        <input type="text" class="form-control customText"  placeholder="enter program" :disabled="isNotHSGrad">
      </div>
    </div>
    <div class="eachInput d-flex flex-row">
      <div class="cbDiv pt-2">
        <input type="checkbox" id="cbGraduated" class="cbx" style="display: none;" @click="tsBxClick" :disabled="isNotHSGrad">
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
        <input type="text" class="form-control customText" @click="showYearTec(tsYear)" @keyup="showYearTec(tsYear)" v-model="tsYear"  placeholder="select year" :disabled=tsIsDisabled>
      </div>
    </div>
    <div class="buttonDiv">
      <button class="footerBtn btn" id="test" @click="toPageThree"><i class="large material-icons">arrow_forward</i></button>
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
</template>
<script>
import 'vue-datetime/dist/vue-datetime.css'
export default {
  components: {
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
      isNotHSGrad: true
    }
  },
  created: function () {
    let thisYear = (new Date()).getFullYear()
    for (var i = 0; i <= 100; i++) {
      this.numOfYearsHS.push(thisYear - i)
    }
  },
  methods: {
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
        this.clIsDisabled = false
        this.cgIsDisabled = true
      }else{
        this.clIsDisabled = true
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
        if(isNaN(yearLimit)) {
          for (var i = 0; i <= (yearLimit -1); i++) {
            this.numOfYearsCol.push(thisYear - i)
          }
        }
        this.prevHsValueInCol = this.hsYear
      }
      if(this.numOfYearsCol.length  === 0){
        let thisYear = (new Date()).getFullYear()
        for (var r = 0; r <= 100; r++) {
          this.numOfYearsCol.push(thisYear - r)
        }
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
        if(isNaN(yearLimit)) {
          for (var i = 0; i <= (yearLimit -1); i++) {
            this.numOfYearsTec.push(thisYear - i)
          }
        }
        this.prevHsValueInTec = this.hsYear
      }
      if(this.numOfYearsTec.length  === 0){
        let thisYear = (new Date()).getFullYear()
        for (var y = 0; y <= 100; y++) {
          this.numOfYearsTec.push(thisYear - y)
        }
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
      this.$emit('toPageThree')
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  .cboxLabel {
    font-size: 14px;
    margin-right: 10px;
  }
  .radioLabel {
    font-size: 10px;
    margin-right: 0;
  }
  .headerTitleText {
    font-size: 12px;
    text-decoration: underline;
    margin-bottom: 0px;
    margin-top: 16px;
  }
  .input-group-text {
    background-color: #BCE0FD !important;
    border-radius: 0 !important;
    border-color: #BCE0FD;
  }
  .eachInput {
    margin: auto;
    margin-top: 16px;
    height: 50px;
    width: 94%;
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
  .footerBtn {
    max-width: 343px;
    background-color: #2699FB;
    color: white;
    font-size: 14px;
    font-weight: 700;
    height: 48px;
    max-height: 40px;
    width: 94%;
    margin-left: 3%;
    margin-top: 16px !important;
  }
  .customLabelDate {
    height: 50px;
  }
  .errorStyles {
    color: red;
    height: 10px;
    margin-bottom: 10px;
    font-size: 14px;
    padding-right: 9px;
    display: none;
  }
</style>
