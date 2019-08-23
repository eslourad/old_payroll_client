<template>
  <transition name="fadeMain">
    <div id="mainDiv">
      <div class="contentDiv m-auto">
        <div class="headerNav p-1">
          <span class="navHeaderTitle"><i class="material-icons iconAlign mr-1" id="arrowBack" @click="backMainMenu">arrow_back</i>Announcements</span>
          <span class="navHeaderMoreOption float-right"><i class="material-icons iconAlign">more_vert</i></span>
        </div>
        <div class="allInput style-1">
          <div class="eachAnnouncement">
            <p class="anncmntDate">25-DEC-2018</p>
            <p class="anncmntTitle">Double Pay - Christmas Day</p>
            <p class="anncmntDscptn">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</p>
          </div>
          <div class="eachAnnouncement">
            <p class="anncmntDate">25-DEC-2018</p>
            <p class="anncmntTitle">Double Pay - Christmas Day</p>
            <p class="anncmntDscptn">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</p>
          </div>
          <div class="eachAnnouncement">
            <p class="anncmntDate">25-DEC-2018</p>
            <p class="anncmntTitle">Double Pay - Christmas Day</p>
            <p class="anncmntDscptn">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</p>
          </div>
          <div class="eachAnnouncement">
            <p class="anncmntDate">25-DEC-2018</p>
            <p class="anncmntTitle">Double Pay - Christmas Day</p>
            <p class="anncmntDscptn">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</p>
          </div>
          <div class="eachAnnouncement">
            <p class="anncmntDate">25-DEC-2018</p>
            <p class="anncmntTitle">Double Pay - Christmas Day</p>
            <p class="anncmntDscptn">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'AnnounceView',
  data: function () {
    return {
    }
  },
  created: function () {
  },
  methods: {
    backMainMenu () {
      this.$router.push('/m/dashboard')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #mainDiv {
    width: 100%;
    height: 100vh;
    background-color: #F1F9FF;
    font-family: Arial;
    padding-top: 16px;
    color: #2699FB;
    padding-bottom: 15px;
  }
  @media only screen and (max-width: 320px) {
    .contentDiv{
      width: 94% !important;
    }
  }
  .contentDiv {
    width: 343px;
    background-color: white;
  }
  .headerNav {
    border: 1px solid;
    border-color: #2699FB;
  }
  .iconAlign {
    vertical-align: middle;
  }
  .navHeaderTitle {
    font-size: 14px;
    font-weight: 700;
  }
  .nameDiv {
    margin-bottom: 0px;
  }
  .branceDiv {
    font-size: 10px;
  }
  #arrowBack {
    cursor: pointer;
  }
  .eachAnnouncement {
    width: 90%;
    margin: auto;
    background-color: #F1F9FF;
    margin-top: 15px;
    padding-right: 32px;
    padding-left: 32px;
    padding-top: 16px;
    padding-bottom: 16px;
  }
  .allInput {
    overflow-y: scroll;
    overflow-x: hidden;
    height: calc(100vh - 70px);
    padding-bottom: 20px;
  }
  .anncmntDate {
    font-weight: bold;
    font-size: 12px;
  }
  .anncmntTitle {
    font-weight: bold;
    font-size: 20px;
  }
  .anncmntDscptn {
    font-size: 14px;
  }
</style>
