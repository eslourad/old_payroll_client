<template>
  <transition name="fadeMain">
    <div id="mainDiv">
      <div v-show="!confirmationPage" class="contentDiv m-auto">
        <div class="headerNav p-1">
          <span class="navHeaderTitle"><i class="material-icons iconAlign mr-1" id="arrowBack" @click="backMainMenu">arrow_back</i>Settings</span>
          <span class="navHeaderMoreOption float-right"><i class="material-icons iconAlign">more_vert</i></span>
        </div>
        <div>
          <div v-show="!confirmationPage" class="allInput style-1">
            <p class="headerTitleText ml-1">Password Reset</p>
            <div class="errorStyles">
              <small class="float-right">Required</small>
            </div>
            <div class="eachInput">
              <div class="input-group txtLabels">
                <div class="input-group-prepend">
                  <div class="input-group-text customLabel">Current <br />Password</div>
                </div>
                <input type="text" class="form-control customText"  placeholder="enter current password">
              </div>
            </div>
            <div class="eachInput">
              <div class="input-group txtLabels">
                <div class="input-group-prepend">
                  <div class="input-group-text customLabel">New <br />Password</div>
                </div>
                <input type="text" class="form-control customText"  placeholder="enter new password">
              </div>
            </div>
            <div class="eachInput">
              <div class="input-group txtLabels">
                <div class="input-group-prepend">
                  <div class="input-group-text customLabel">Confirm <br />Password</div>
                </div>
                <input type="text" class="form-control customText"  placeholder="enter new password">
              </div>
            </div>
          </div>
        </div> 
        <div v-show="!confirmationPage" class="fixed-bottom footerDiv  bg-white text-center">
          <button class="footerBtn btn m-3" @click="resetPassword"><i class="large material-icons">arrow_forward</i></button>
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
import Confirmation from '@/components/Confirmation.vue'
export default {
  components: {
    Confirmation
  },
  name: 'Setting',
  data: function () {
    return {
      confirmationPage: false
    }
  },
  created: function () {
  },
  methods: {
    backMainMenu () {
      this.$router.push('/m/dashboard')
    },
    resetPassword () {
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
  .footerBtn {
    max-width: 343px;
    background-color: #2699FB;
    color: white;
    font-size: 14px;
    font-weight: 700;
    height: 100%;
    max-height: 40px;
    width: 90%;
    margin-bottom: 0px !important;
    margin-top: 0px !important;
  }
  .footerDiv {
    height: 70px;
    padding-bottom: 15px !important;
    padding-top: 15px !important;
  }
</style>
