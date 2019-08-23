<template>
  <transition name="fadeMain">
    <div id="mainDiv">
      <div v-show="!confirmationPage" class="contentDiv m-auto">
        <div class="headerNav p-1">
          <span class="navHeaderTitle"><i class="material-icons iconAlign mr-1" id="arrowBack" @click="backToPayments">arrow_back</i>Create New Payment</span>
          <span class="navHeaderMoreOption float-right"><i class="material-icons iconAlign">more_vert</i></span>
        </div>
        <div>
          <!--Page One-->
          <transition name="fadeMain">
            <div class="allInput style-1">
              <p class="headerTitleText ml-1">Pay Details</p>
              <div class="eachInput">
                <div class="input-group txtLabels">
                  <div class="input-group-prepend">
                    <div class="input-group-text customLabel">Store</div>
                  </div>
                  <input type="text" class="form-control customText"  placeholder="store assigned">
                </div>
              </div>
              <div class="eachInput">
                <div class="input-group txtLabels">
                  <div class="input-group-prepend">
                    <div class="input-group-text customLabel">Agent <br />Name</div>
                  </div>
                  <input type="text" class="form-control customText"  placeholder="select agent name">
                </div>
              </div>
              <div class="eachInput d-flex flex-row d-flex flex-row">
                <datetime v-model="startDate" id="startDate" input-class="form-controlCustom cstmTextDate customText mr-2" :max-datetime="maxDatetime" placeholder="start date"></datetime>
                <i class="large material-icons iconAlign pt-2 mt-1">trending_flat</i>
                <datetime v-model="endDate" id="endDate" input-class="form-controlCustom cstmTextDate customText mr-2" :min-datetime="startDate" placeholder="end date"></datetime>
              </div>
              <div class="eachInput">
                <div class="input-group txtLabels">
                  <div class="input-group-prepend">
                    <div class="input-group-text customLabel">Work<br />Days</div>
                  </div>
                  <input type="text" class="form-control customText"  placeholder="enter number of days">
                </div>
              </div>
              <div class="eachInput">
                <div class="input-group txtLabels">
                  <div class="input-group-prepend">
                    <div class="input-group-text customLabel">Over<br />Time</div>
                  </div>
                  <input type="text" class="form-control customText"  placeholder="enter number of hours">
                </div>
              </div>
              <div class="eachInput">
                <div class="input-group txtLabels">
                  <div class="input-group-prepend">
                    <div class="input-group-text customLabel">Rest<br />Days</div>
                  </div>
                  <input type="text" class="form-control customText"  placeholder="enter number of work days">
                </div>
              </div>
              <div class="eachInput">
                <div class="input-group txtLabels">
                  <div class="input-group-prepend">
                    <div class="input-group-text customLabel">Adjustments</div>
                  </div>
                  <input type="text" class="form-control customText"  placeholder="enter number of work days">
                  <div class="input-group-prepend">
                    <div class="input-group-text customLabelPercent">&nbsp;&nbsp;&nbsp;&nbsp;%</div>
                  </div>
                </div>
              </div>
              <div class="eachInputUpl">
                <button class="btn btnUpload" @click="uploadOT">UPLOAD O.T. APPROVAL</button>
                <input type="file" id="uplOT" class="hiddenUploads" name="">
              </div>
              <div class="eachInputUpl">
                <button class="btn btnUpload" @click="uploadDTR">UPLOAD D.T.R.</button>
                <input type="file" id="uplDTR" class="hiddenUploads" name="">
              </div>
              <div class="buttonDiv">
                <button class="footerBtn btn" @click="nxtPage"><i class="large material-icons">arrow_forward</i></button>
              </div>
            </div>
          </transition>
        </div> 
      </div>
      <!--Confirmation Page-->
      <transition name="fadeMain">
        <div v-show="confirmationPage" class="allInput style-1">
          <Confirmation></Confirmation>
        </div> 
      </transition>
    </div>
  </transition>
</template>
<script>
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import Confirmation from '@/components/Confirmation.vue'
export default {
  components: {
    Datetime,
    Confirmation
  },
  name: 'AgentAdd',
  data: function () {
    return {
      startDate: '',
      endDate: '',
      maxDatetime: '',
      ndate: new Date(),
      confirmationPage: false
    }
  },
  created: function () {
    this.maxDatetime = this.ndate.toISOString()
  },
  methods: {
    nxtPage () {
      this.confirmationPage = true
    },
    backToPayments () {
      this.$router.push('/m/payment')
    },
    uploadOT () {
      $('#uplOT').click()
    },
    uploadDTR () {
      $('#uplDTR').click()
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #92CCFD !important;
    opacity: 1; /* Firefox */
  }
  #mainDiv {
    width: 100%;
    height: 100vh;
    background-color: #F1F9FF;
    font-family: Arial;
    padding-top: 16px;
    color: #2699FB;
  }
  @media only screen and (max-width: 320px) {
    .contentDiv{
      width: 94% !important;
      height: 94vh;
    }
  }
  .contentDiv {
    padding-bottom: 14px;
    width: 343px;
    background-color: white;
  }
  .headerNav {
    border: 1px solid;
    border-color: #2699FB;
    margin-bottom: 10px
  }
  .iconAlign {
    vertical-align: middle;
  }
  .navHeaderTitle {
    font-size: 14px;
    font-weight: 700;
  }
  #arrowBack {
    cursor: pointer;
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
  .allInput {
    margin: auto;
    width: 94%;
    overflow-y: scroll;
    overflow-x: hidden;
    height: calc(100vh - 104px)
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
    width: 94%;
  }
</style>
     