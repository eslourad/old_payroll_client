<template>
  <div class="">
    <transition name="fade">
      <div id="emberloader" v-show="doLoad">
        <emberLoader></emberLoader>
      </div>
    </transition>
    <transition name="fadeMain">
      <div v-show="!confirmationPage">
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
                <span>Deductions / Deposits</span>
              <i class="material-icons iconAlign float-right">more_vert</i></span>
            </div>
            <!-- End Title -->
            <div class="bgDiv">
              <!-- Search -->
              <div class="row searchRow mt-1 pl-1">
                <p class="lblSearch"><u>Premium Benefits</u></p>
              </div>
              <div class="row">
                <div class="col-md-12 formRow col-lg-6 col-xl-3">
                  <transition name="fade">
                    <div class="eachInput mb-0 pb-0" v-show="creationOK">
                      <div class="bg-success text-white text-center mb-0 pb-0" >
                        <p class="pt-2 pb-2 mb-0 pb-0"><i class="material-icons iconAlign2">check</i> Premium benefits successfully set</p>
                      </div>
                    </div>
                  </transition>
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">SSS</div>
                      </div>
                      <input type="text" v-model="sss" class="form-control customText"  placeholder="enter amount" v-validate="'required|min_value:0'" name="sss">
                    </div>
                  </div>
                  <div class="row pl-3 mt-1 mb-0 pb-0 text-danger small">
                    <span>{{ errors.first('sss') }}</span>
                  </div>
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">Pag-Ibig</div>
                      </div>
                      <input type="text" v-model="pagIbig" class="form-control customText"  placeholder="enter amount" v-validate="'required|min_value:0'" name="pag ibig">
                    </div>
                  </div>
                  <div class="row pl-3 mt-1 mb-0 pb-0 text-danger small">
                    <span>{{ errors.first('pag ibig') }}</span>
                  </div>
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">Phil <br />Health</div>
                      </div>
                      <input type="text" v-model="philHealth" class="form-control customText"  placeholder="enter amount" v-validate="'required|min_value:0'" name="phil health">
                    </div>
                  </div>
                  <div class="row pl-3 mt-1 mb-0 pb-0 text-danger small">
                    <span>{{ errors.first('phil health') }}</span>
                  </div>
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">Saving <br />Deposit</div>
                      </div>
                      <input type="text" v-model="savings" class="form-control customText"  placeholder="enter amount" v-validate="'required|min_value:0'" name="savings / deposit">
                    </div>
                  </div>
                  <div class="row pl-3 mt-1 mb-0 pb-0 text-danger small">
                    <span>{{ errors.first('savings / deposit') }}</span>
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
    <!--Confirmation Page-->
    <transition name="fadeMain">
      <div v-show="confirmationPage" class="allInput style-1">
        <Confirmation @confirm="confirm" @cancel="cancel"></Confirmation>
      </div> 
    </transition>
  </div>
</template>
<script>
import sidebar from '@/components/web/Sidebar.vue'
import Confirmation from '@/components/Confirmation.vue'
import axios from 'axios'
import emberLoader from '@/components/emberLoader.vue'
export default {
  components: {
    sidebar,
    Confirmation,
    emberLoader
  },
  name: 'Deduction',
  data: function () {
    return {
      confirmationPage: false,
      sss: 0,
      pagIbig: 0,
      philHealth: 0,
      savings: 0,
      doLoad: false,
      creationOK: false
    }
  },
  created: function () {
    this.refresh()
  },
  methods: {
    backMainMenu () {
      this.$router.push('/dashboard')
    },
    confirm () {
      this.doLoad = true
      let self = this
      let data = {
        sss: self.sss,
        pag_ibig: self.pagIbig,
        phil_health: self.philHealth,
        savings: self.savings
      }
      axios.post('api/deductions/new', data).then(response => {
        self.confirmationPage = false
        //self.refresh()
        self.creationOK = true
        self.doLoad = false
        setTimeout(function(){ self.creationOK = false }, 7000);
      }).catch(error => {
        console.log(error)
      })
    },
    nxtPage () {
      self = this
      this.$validator.validate().then(valid => {
        if (valid) {
          self.confirmationPage = true
        }
      });
    },
    refresh () {
      this.doLoad = true
      let self = this
      axios.get('api/deductions').then(response => {
        self.sss = response.data.data.sss
        self.pagIbig = response.data.data.pag_ibig
        self.philHealth = response.data.data.phil_health
        self.savings = response.data.data.savings
        this.doLoad = false
      }).catch(error => {
        this.doLoad = false
        console.log(error)
      })
    },
    cancel () {
      this.confirmationPage = false
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
      height: calc(100vh - 104px);
      min-height: 321px;
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
  .iconAlign2 {
    vertical-align: bottom;
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
</style>
