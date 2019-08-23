<template>
  <div>
    <p class="headerTitleText ml-1">Employment History</p>
    <!-- Company 1 -->
    <div class="eachInput">
      <div class="input-group txtLabels">
        <div class="input-group-prepend">
          <div class="input-group-text customLabel text-left">Company<br/>Name 1</div>
        </div>
        <input type="text" class="form-control customText"  placeholder="enter company name">
      </div>
    </div>
    <div class="eachInput">
      <div class="input-group txtLabels">
        <div class="input-group-prepend">
          <div class="input-group-text customLabel text-left">Position</div>
        </div>
        <input type="text" class="form-control customText"  placeholder="enter position">
      </div>
    </div>
    <div class="eachInput d-flex flex-row">
      <input type="text" class="form-control customText mr-2" id="fr1" @click="showYearFrom1('fr1')" v-model="comp1From" placeholder="from year">
      <i class="large material-icons iconAlign pt-2 mt-1">trending_flat</i>
      <input type="text" class="form-control customText ml-2" id="to1" @click="showYearTo1('to1', comp1From)" v-model="comp1To" placeholder="to year">
    </div>
    <!-- Company 2 -->
    <div class="eachInput">
      <div class="input-group txtLabels">
        <div class="input-group-prepend">
          <div class="input-group-text customLabel text-left">Company<br/>Name 2</div>
        </div>
        <input type="text" class="form-control customText"  placeholder="enter company name">
      </div>
    </div>
    <div class="eachInput">
      <div class="input-group txtLabels">
        <div class="input-group-prepend">
          <div class="input-group-text customLabel text-left">Position</div>
        </div>
        <input type="text" class="form-control customText"  placeholder="enter position">
      </div>
    </div>
    <div class="eachInput d-flex flex-row">
      <input type="text" class="form-control customText mr-2" id="fr2" @click="showYearFrom2('fr2')" v-model="comp2From" placeholder="from year">
      <i class="large material-icons iconAlign pt-2 mt-1">trending_flat</i>
      <input type="text" class="form-control customText ml-2" id="to2" @click="showYearTo2('to2', comp2From)" v-model="comp2To" placeholder="to year">
    </div>
    <!-- Company 3 -->
    <div class="eachInput">
      <div class="input-group txtLabels">
        <div class="input-group-prepend">
          <div class="input-group-text customLabel text-left">Company<br/>Name 3</div>
        </div>
        <input type="text" class="form-control customText"  placeholder="enter company name">
      </div>
    </div>
    <div class="eachInput">
      <div class="input-group txtLabels">
        <div class="input-group-prepend">
          <div class="input-group-text customLabel text-left">Position</div>
        </div>
        <input type="text" class="form-control customText"  placeholder="enter position">
      </div>
    </div>
    <div class="eachInput d-flex flex-row">
      <input type="text" class="form-control customText mr-2" id="fr3" @click="showYearFrom3('fr3')" v-model="comp3From" placeholder="from year">
      <i class="large material-icons iconAlign pt-2 mt-1">trending_flat</i>
      <input type="text" class="form-control customText ml-2" id="to3" @click="showYearTo3('to3', comp3From)" v-model="comp3To" placeholder="to year">
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
</template>
<script>
import 'vue-datetime/dist/vue-datetime.css'
export default {
  components: {
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
    }
  },
  methods: {
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
      this.$emit('toPageFour')
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
  .iconAlign {
    vertical-align: middle;
  }
</style>
