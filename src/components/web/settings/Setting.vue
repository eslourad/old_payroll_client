<template>
  <div class="">
    <transition name="fade">
      <div id="emberloader" v-show="doLoad">
        <emberLoader></emberLoader>
      </div>
    </transition>
    <transition name="fadeMain">
      <div v-show="!confirmationPage">
        <div v-if="!isJustUser" class="side">
          <sidebar v-if="admin"></sidebar>
          <sidebar2 v-if="!admin"></sidebar2>
        </div>
        <div v-if="isJustUser" class="side">
          <sidebar3></sidebar3>
        </div>
        <transition name="fadeMain">
          <!-- Content -->
          <div class="myContent">
            <!-- Title -->
            <div class="row titleHead ml-2 mr-2">
              <span class="titleHeadText navHeaderMoreOption">
              <i class="material-icons iconAlign mr-1 bckArrow" id="arrowBack" @click="backMainMenu">arrow_back</i>
                <span>Settings</span>
              <i class="material-icons iconAlign float-right">more_vert</i></span>
            </div>
            <!-- End Title -->
            <div class="bgDiv">
              <!-- Search -->
              <div class="row searchRow mt-1 pl-1">
                <p class="lblSearch"><u>Change Password</u></p>
              </div>
              <div class="row">
                <div class="col-md-12 formRow col-lg-6 col-xl-3">
                  <transition name="fade">
                    <div class="bg-danger text-white text-center" v-show="creationError">
                      <p class="mt-2 pt-2 pb-2"><i class="material-icons iconAlign2">info</i> Password is incorrect</p>
                    </div>
                  </transition>
                  <transition name="fade">
                    <div class="bg-success text-white text-center" v-show="creationOK">
                      <p class="mt-2 pt-2 pb-2"><i class="material-icons iconAlign2">check</i> Password changed successfully </p>
                    </div>
                  </transition>
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">Current <br />Password</div>
                      </div>
                      <input type="password" v-model="currentPass" v-validate="'required|min:6'" name="current password" class="form-control customText"  placeholder="enter current password">
                    </div>
                  </div>
                  <div class="row pl-3 mt-1 mb-0 pb-0 text-danger small">
                    <span>{{ errors.first('current password') }}</span>
                  </div>
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">New <br />Password</div>
                      </div>
                      <input type="password" v-model="newPass" v-validate="'required|min:6|max:25'" name="new password" class="form-control customText"  placeholder="enter new password">
                    </div>
                  </div>
                  <div class="row pl-3 mt-1 mb-0 pb-0 text-danger small">
                    <span>{{ errors.first('new password') }}</span>
                  </div>
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">Confirm <br />Password</div>
                      </div>
                      <input type="password" v-model="confirmPass" v-validate="'required|min:6|max:25'" name="confirm password" class="form-control customText"  placeholder="enter new password">
                    </div>
                  </div>
                  <div class="row pl-3 mt-1 mb-0 pb-0 text-danger small" v-show="passEqual">
                    <span>Password does not match</span>
                  </div>
                  <div class="row pl-3 mt-1 mb-0 pb-0 text-danger small">
                    <span>{{ errors.first('confirm password') }}</span>
                  </div>
                  <div class="buttonDiv">
                    <button class="footerBtn btn" @click="nxtPage" ><i class="large material-icons">arrow_forward</i></button>
                  </div>
                  <!-- End Search -->
                </div>         
              </div>
            </div>
          </div>
        </transition>
        <!--Confirmation Page-->
      </div>
    </transition>
    <transition name="fadeMain">
      <div v-show="confirmationPage" class="allInput style-1">
        <Confirmation @cancel="cancel" @confirm="confirm"></Confirmation>
      </div> 
    </transition>
  </div>
</template>
<script>
import sidebar from '@/components/web/Sidebar.vue'
import Confirmation from '@/components/Confirmation.vue'
import axios from 'axios'
import emberLoader from '@/components/emberLoader.vue'
import sidebar2 from '@/components/web/Sidebar2.vue'
import sidebar3 from '@/components/web/Sidebar3.vue'
export default {
  components: {
    sidebar,
    Confirmation,
    emberLoader,
    sidebar2,
    sidebar3
  },
  name: 'Setting',
  data: function () {
    return {
      startDate: '',
      endDate: '',
      maxDatetime: '',
      ndate: new Date(),
      confirmationPage: false,
      currentPass: '',
      newPass: '',
      confirmPass: '',
      id: '',
      passEqual: false,
      creationError: false,
      creationOK: false,
      doLoad: false,
      admin: false,
      isJustUser: false
    }
  },
  created: function () {
    this.doLoad = true
    let self = this
    axios.get('api/user').then(response => {
      if(response.data.user_level === "1") {
        self.admin = true
        self.isJustUser = false
      } else {
        if(response.data.user_level === "0") {
          self.admin = false
          self.isJustUser = false
        }else{
          self.isJustUser = true
        }
      }
      self.doLoad = false
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    backMainMenu () {
      this.$router.push('/dashboard')
    },
    showPaymentDetails () {
      this.paymentList = false
    },
    nxtPage () {
      self = this
      this.$validator.validate().then(valid => {
        if (valid) {
          if(self.newPass !== self.confirmPass){
            self.passEqual = true
          } else {
            self.passEqual = false
            self.confirmationPage = true
          }
          
        }
      })
    },
    cancel () {
      this.confirmationPage = false
    },
    confirm () {
      let self = this
      let id;
      this.doLoad = true
      axios.get('api/user').then(response => {
        self.id = response.data.id
        let data = {
          id: self.id,
          password: self.currentPass,
          new_password: self.newPass,
          confirm_password: self.confirmPass,
        }
        axios.post('api/user/pass', data).then(response => {
          if(response.data.status === 'success'){
            self.resetFields()
            self.confirmationPage = false
            self.creationOK = true
            setTimeout(function(){ self.creationOK = false }, 7000)
          } else {
            self.confirmationPage = false
            self.creationError = true
            setTimeout(function(){ self.creationError = false }, 7000)
          }
          this.doLoad = false
        }).catch(error => {
          console.log(error)
          this.doLoad = false
        })
      }).catch(error => {
        console.log(error)
      })
    },
    resetFields () {
      this.currentPass = ''
      this.newPass = ''
      this.confirmPass = ''
      this.$validator.reset()
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
      height: 90vh;
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
</style>
