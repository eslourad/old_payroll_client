<template>
  <div id="landingPage">
    <div class="text-center" id="main-panel-bg">
      <div class="landing-header-text">
        <p id="landing-header" class="pt-5">SAPPI</p>
        <p id="landing-description">Solar Ace Premium Products Inc.<br>Mobile Payroll</p>
      </div>
    </div>
    <div class="landing-logo text-center ">
      <img src="@/assets/logo.png" class="m-auto to80">
    </div>
    <div class="btnWeb mb-4 text-center">
      <button @click="letStart" id="btnGo" class="btnLandingM btn m-auto ">LET'S START</button>
    </div>
    <div class="fixed-bottom btnActionM mb-4 text-center ">
      <button @click="letStart" id="btnGoM" class="btn m-auto btnLandingM to80">LET'S START</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    letStart () {
      this.$router.push('/login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #landingPage {
    width: 100%;
    height: 100vh;
    background-color: white;
  }
  #main-panel-bg {
    height: 278px;
    background-color: #F1F9FF;
  }
  #landing-header {
    font-size: 46px;
    font-family: Georgia
  }
  #landing-description {
    font-size: 14px;
    font-family: Arial
  }
  .landing-header-text {
    height: 104px;
    color: #2699FB;
  }
  .landing-logo {
    height: 97px;
  }
  .btnLandingM {
    width: 327px;
    margin: auto;
    height: 48px;
    background-color: #2699FB;
    color: white;
    font-family: Arial;
    font-size: 16px;
  }
  #btnGoM {
    font-size: 13px
  }
  .landing-button {
    margin-top: 220px;
  }
  .landing-button-mobile {
  }
  .btnWeb {
    margin-top: 100px
  }
  @media only screen and (max-width: 375px) {
    .to80{
      width: 80%;
    }
  }
  @media only screen and (max-width: 576px) {
    .btnWeb {
      display: none;
    }
    .fixed-bottom {
      display: block;
    }
  }
  @media only screen and (min-width: 577px) {
    .fixed-bottom {
      display: none;
    }
    .btnWeb {
      display: block;
    }
  }
</style>
