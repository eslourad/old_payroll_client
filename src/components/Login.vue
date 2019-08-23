<template>
  <transition name="fadeMain">
    <div id="bg-div">
      <transition name="fade">
        <div id="emberloader" v-show="doLoad">
          <emberLoader></emberLoader>
        </div>
      </transition>
      <div class="header-div text-center">
        LOGIN
      </div>
      <div class="input-group-un">
        <div class=" maxWidth m-auto to80">
          <label class="lblCredentials">User Name</label>
          <input v-model="txtUserName" class="form-control form-control-lg credentials-text" type="text" @keyup="isEnter" placeholder="enter username">
        </div>
      </div>
      <div class="input-group-password">
        <div class="input-group-password maxWidth m-auto to80">
          <label class="lblCredentials">Password</label>
          <input v-model="txtPassword" type="password" class="form-control form-control-lg credentials-text" @keyup="isEnter" placeholder="enter password">
        </div>
      </div>
      <div id="btnLoginDiv" class="m-auto to80">
        <button @click="login" id="btnLogin" class="btn mt-50 "><i class="material-icons">arrow_forward</i></button>
      </div>
      <div class="fixed-bottom" id="footer-color"></div>
      <transition name="fade">
        <div id="dimScreen" v-show="hassError">
          <div class="notif-text-container text-center">
            <p class="errHeader-text">ERROR</p>
            <p><i class="material-icons errIcon">warning</i></p>
            <p class="errDesc-text">Username or password is incorrect</p>
            <button class="btn btnOk" @click="acknowledgeError">OK</button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import axios from 'axios'
import emberLoader from '@/components/emberLoader.vue'
export default {
  components: {
    emberLoader
  },
  name: 'Login',
  data: function () {
    return {
      hassError: false,
      txtPassword: '',
      txtUserName: '',
      doLoad: false
    }
  },
  created: function() {
    if(this.$auth.isAuthenticated()){
      axios.get('api/user').then(response => {
        if(response.data.status === "1") {
          this.$router.push('/dashboard')
          self.doLoad = false
        } else {
          self.hassError = true;
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  methods: {
    detectmob() { 
     if( navigator.userAgent.match(/Android/i)
     || navigator.userAgent.match(/webOS/i)
     || navigator.userAgent.match(/iPhone/i)
     || navigator.userAgent.match(/iPad/i)
     || navigator.userAgent.match(/iPod/i)
     || navigator.userAgent.match(/BlackBerry/i)
     || navigator.userAgent.match(/Windows Phone/i)
     ){
        localStorage.setItem('isMobile', true)
        return true;
      }
     else {
        localStorage.setItem('isMobile', false)
        return false;
      }
    },
    login () {
      let self = this
      this.doLoad = true
      let data = {
        client_id: 2,
        client_secret: 's7G5v3NL7PU8xne5yig5jBUZPYwVMI75vZvyhRbm',
        grant_type: 'password',
        username: this.txtUserName,
        password: this.txtPassword
      }
      axios.post('oauth/token', 
        data
      ).then(response => {
        self.$auth.setToken(response.data.access_token, response.data.expires_in + Date.now())
        window.location = '/'
      }).catch(error => {
        console.log(error)
        self.hassError = true;
        self.doLoad = false
      })
    },
    showError () {
      this.hassError = true;
    },
    acknowledgeError () {
      this.hassError = false;
    },
    test () {
      self.$router.push('/dashboard')
    },
    isEnter  ($event) {
      if(event.keyCode === 13){
        this.login()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header-div {
    padding-top: 22px;
    background-color: #2699FB;
    height: 68px;
    font-size: 14px;
    font-family: Arial;
    color: white;
  }
  .input-group-password {
    margin-top: 18px;
  }
  .input-group-un {
    margin-top: 67px;
  }
  #btnLoginDiv {
    width: 327px;
  }
  #btnLogin {
    margin-top: 27px;
    height: 48px;
    color: white;
    background-color: #2699FB;
    width: 100%;
  }
  #bg-div {
    background-color: #F1F9FF;
    height: 100vh;
    width: 100%;
  }
  #footer-color {
    background-color: #BCE0FD;
    height: 56px;
    z-index: 1;
  }
  .credentials-text {
    font-color: #2699FB;
    border-color: #2699FB;
    font-size: 14px;
  }
  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #2699FB !important;
    opacity: 1; /* Firefox */
  }
  .lblCredentials {
    font-size: 10px;
    font-family: Arial;
    color: #2699FB;
  }
  #dimScreen {
    position:fixed;
    padding:0;
    margin:0;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: #F1F9FF;
    z-index: 2;
  }
  .notif-text-container {
    margin-top: 30vh;
  }
  .errHeader-text {
    font-size: 20px;
    font-weight: 700;
    color: #2699FB;
    font-family: Arial
  }
  .errIcon {
    font-size: 40px;
    color: #BCE0FD; 
    margin-top: 31px;
  }
  .errDesc-text {
    font-family: Arial;
    font-size: 14px;
    color: #2699FB;
    margin-top: 32px;
  }
  .btnOk {
    margin-top: 46px;
    background-color: #2699FB;
    color: white;
    width: 90px;
    font-size: 11px;
    height: 40px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .maxWidth {
    width: 327px;
  }
  @media only screen and (max-width: 375px) {
    .to80{
      width: 80% !important;
      margin:auto;
    }
  }
</style>
