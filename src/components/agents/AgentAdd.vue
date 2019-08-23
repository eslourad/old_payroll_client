<template>
  <transition name="fadeMain">
    <div id="mainDiv">
      <div class="contentDiv m-auto">
        <div class="headerNav p-1">
          <span class="navHeaderTitle"><i class="material-icons iconAlign mr-1" id="arrowBack" @click="backToAgents">arrow_back</i>Agent Registration</span>
          <span class="navHeaderMoreOption float-right"><i class="material-icons iconAlign">more_vert</i></span>
        </div>
        <div>
          <!--Page One-->
          <transition name="fadeMain">
            <div v-show="page1" class="allInput style-1">
              <p class="headerTitleText ml-1">Personal Information</p>
              <div class="eachInput">
                <div class="input-group txtLabels">
                  <div class="input-group-prepend">
                    <div class="input-group-text customLabel">Store</div>
                  </div>
                  <select  type="text" class="form-control customText" >
                    <option>Store A</option>
                    <option>Store B</option>
                    <option>Store C</option>
                    <option>Store D</option>
                  </select>
                </div>
              </div>
              <div class="errorStyles">
                <small class="float-right">Required</small>
              </div>
              <div class="eachInput">
                <div class="input-group txtLabels">
                  <div class="input-group-prepend">
                    <div class="input-group-text customLabel">Job Title</div>
                  </div>
                  <input type="text" class="form-control customText"  placeholder="enter job title">
                </div>
              </div>
              <div class="eachInput">
                <div class="input-group txtLabels">
                  <div class="input-group-prepend">
                    <div class="input-group-text customLabel">First Name</div>
                  </div>
                  <input type="text" class="form-control customText"  placeholder="enter first name">
                </div>
              </div>
              <div class="eachInput">
                <div class="input-group txtLabels">
                  <div class="input-group-prepend">
                    <div class="input-group-text customLabel">Last Name</div>
                  </div>
                  <input type="text" class="form-control customText"  placeholder="enter last name">
                </div>
              </div>
              <div class="eachInput d-flex flex-row">
                <div class="input-group-prepend">
                  <div class="input-group-text customLabel customLabelDate">Birth Date</div>
                </div>
                <div class="input-group txtLabels">
                  <datetime v-model="date" id="agentAdd" input-class="form-controlCustom cstmTextDate" :max-datetime="maxDatetime" placeholder="enter birth date"></datetime>
                </div>
              </div>
              <div class="eachInput">
                <div class="input-group txtLabels">
                  <div class="input-group-prepend">
                    <div class="input-group-text customLabel">Email</div>
                  </div>
                  <input type="text" class="form-control customText"  placeholder="enter email">
                </div>
              </div>
              <div class="eachInput">
                <div class="input-group txtLabels">
                  <div class="input-group-prepend">
                    <div class="input-group-text customLabel text-left">Mobile <br>Number</div>
                  </div>
                  <input type="text" class="form-control customText"  placeholder="enter mobile number">
                </div>
              </div>
              <div class="eachInput">
                <div class="input-group txtLabels">
                  <div class="input-group-prepend">
                    <div class="input-group-text customLabel">Current <br>Address</div>
                  </div>
                  <input type="text" class="form-control customText"  placeholder="enter current address">
                </div>
              </div>
              <div class="eachInput">
                <div class="input-group txtLabels">
                  <div class="input-group-prepend">
                    <div class="input-group-text customLabel text-left">Permanent <br>Address</div>
                  </div>
                  <input type="text" class="form-control customText"  placeholder="enter permanent address">
                </div>
              </div>
              <div class="buttonDiv">
                <button class="footerBtn btn" @click="toPageTwo"><i class="large material-icons">arrow_forward</i></button>
              </div>
            </div>
          </transition>
          <!--Page Two-->
          <transition name="fadeMain">
            <div v-show="page2" class="allInput style-1">
              <AgentAddPage2 @toPageThree="toPageThree"></AgentAddPage2>
            </div> 
          </transition>
          <!--Page Three-->
          <transition name="fadeMain">
            <div v-show="page3" class="allInput style-1">
              <AgentAddPage3 @toPageFour="toPageFour"></AgentAddPage3>
            </div> 
          </transition>
          <!--Page Four-->
          <transition name="fadeMain">
            <div v-show="page4" class="allInput style-1">
              <AgentAddPage4 @toPageFive="toPageFive"></AgentAddPage4>
            </div> 
          </transition>
          <!--Page Five-->
          <transition name="fadeMain">
            <div v-show="page5" class="allInput style-1">
              <AgentAddPage5 @toConfirmation="toConfirmation"></AgentAddPage5>
            </div> 
          </transition>
          <!--Confirmation Page-->
          <transition name="fadeMain">
            <div v-show="confirmationPage" class="allInput style-1">
              <Confirmation></Confirmation>
            </div> 
          </transition>
        </div> 
      </div>
    </div>
  </transition>
</template>
<script>
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import AgentAddPage2 from '@/components/agents/AgentAddPage2.vue'
import AgentAddPage3 from '@/components/agents/AgentAddPage3.vue'
import AgentAddPage4 from '@/components/agents/AgentAddPage4.vue'
import AgentAddPage5 from '@/components/agents/AgentAddPage5.vue'
import Confirmation from '@/components/Confirmation.vue'
export default {
  components: {
    Datetime,
    AgentAddPage2,
    AgentAddPage3,
    AgentAddPage4,
    AgentAddPage5,
    Confirmation
  },
  name: 'AgentAdd',
  data: function () {
    return {
      date: '',
      ndate: new Date(),
      maxDatetime: '',
      page1: true,
      page2: false,
      page3: false,
      page4: false,
      page5: false,
      confirmationPage: false
    }
  },
  created: function () {
    this.maxDatetime = this.ndate.toISOString()
  },
  methods: {
    backToAgents () {
      if(this.page1){
        this.$router.push('/m/agent')
      }else if (this.page2) {
        this.page1 = true
        this.page2 = false  
      }else if (this.page3){
        this.page2 = true
        this.page3 = false
      }else if (this.page4){
        this.page3 = true
        this.page4 = false
      }else if (this.page5){
        this.page4 = true
        this.page5 = false
      }else if (this.page6){
        this.page5 = true
        this.confirmationPage = false
      }else{
        return
      }
    },
    toPageTwo () {
      this.page1 = false
      this.page2 = true
    },
    toPageThree () {
      this.page2 = false
      this.page3 = true
    },
    toPageFour () {
      this.page3 = false
      this.page4 = true
    },
    toPageFive () {
      this.page4 = false
      this.page5 = true
    },
    toConfirmation () {
      this.page5 = false
      this.confirmationPage = true
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
</style>
