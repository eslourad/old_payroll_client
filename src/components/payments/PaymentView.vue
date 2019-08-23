<template>
  <transition name="fadeMain">
    <div id="mainDiv">
      <div class="contentDiv m-auto">
        <div class="headerNav p-1">
          <span class="navHeaderTitle"><i class="material-icons iconAlign mr-1" id="arrowBack" @click="backMainMenu">arrow_back</i>My Payment</span>
          <span class="navHeaderMoreOption float-right"><i class="material-icons iconAlign">more_vert</i></span>
        </div>
        <div class="searchDiv">
          <p class="searchheader ml-1">Search</p>
          <input class="form-control form-control-lg txtSearch" type="text" placeholder="enter agent last name">
          <div class="divSwitch">
            <span class="agentStatus">Active Agents</span>
            <span class="switchcustom float-right">
              <label class="switch switch-left-right">
                <input class="switch-input " type="checkbox" checked>
                <span class="switch-label" data-on="On" data-off="Off"></span> <span class="switch-handle"></span>
              </label>
            </span>
          </div>
          <button class="btnSearch btn">SEARCH</button>
          <div class="agentsListDiv style-1">
            <div v-show="showAll">
              <div class="agentItemDiv row" @click="viewPayment">
                <div class="col-2 pl-4 mt-1">
                  <i class="material-icons">attach_money</i>
                </div>
                <div class="col-8 agentNameDiv">
                  <p class="nameDiv">PENDING</p>
                  <p class="branceDiv">01-OCT-2018 | 15-OCT-2018</p>
                </div>
                <div class="col-2 pl-1 mt-1">
                  <i class="material-icons">chevron_right</i>
                </div>
              </div>
              <div class="agentItemDiv row" @click="viewPayment">
                <div class="col-2 pl-4 mt-1">
                  <i class="material-icons">attach_money</i>
                </div>
                <div class="col-8 agentNameDiv">
                  <p class="nameDiv">COMPLETED | 30-SEP-2018</p>
                  <p class="branceDiv">16-SEP-2018 | 30-SEP-2018</p>
                </div>
                <div class="col-2 pl-1 mt-1">
                  <i class="material-icons">chevron_right</i>
                </div>
              </div>
              <div class="agentItemDiv row" @click="viewPayment">
                <div class="col-2 pl-4 mt-1">
                  <i class="material-icons">attach_money</i>
                </div>
                <div class="col-8 agentNameDiv">
                  <p class="nameDiv">COMPLETED | 15-SEP-2018</p>
                  <p class="branceDiv">01-SEP-2018 | 15-SEP-2018</p>
                </div>
                <div class="col-2 pl-1 mt-1">
                  <i class="material-icons">chevron_right</i>
                </div>
              </div>
              <div class="agentItemDiv row" @click="viewPayment">
                <div class="col-2 pl-4 mt-1">
                  <i class="material-icons">attach_money</i>
                </div>
                <div class="col-8 agentNameDiv">
                  <p class="nameDiv">COMPLETED | 01-SEP-2018</p>
                  <p class="branceDiv">16-AUG-2018 | 31-AUG-2018</p>
                </div>
                <div class="col-2 pl-1 mt-1">
                  <i class="material-icons">chevron_right</i>
                </div>
              </div>
              <div class="agentItemDiv row" @click="viewPayment">
                <div class="col-2 pl-4 mt-1">
                  <i class="material-icons">attach_money</i>
                </div>
                <div class="col-8 agentNameDiv">
                  <p class="nameDiv">COMPLETED | 15-AUG-2018</p>
                  <p class="branceDiv">01-AUG-2018 | 15-AUG-2018</p>
                </div>
                <div class="col-2 pl-1 mt-1">
                  <i class="material-icons">chevron_right</i>
                </div>
              </div>
            </div>
            <div v-show="!showAll">
              <div class="agentItemDiv row" @click="viewPayment">
                <div class="col-2 pl-4 mt-1">
                  <i class="material-icons">check</i>
                </div>
                <div class="col-8 agentNameDiv">
                  <p class="nameDiv">Lou Ard V. Soriano | 12,500.50</p>
                  <p class="branceDiv">Gaisano Grand Digos</p>
                </div>
                <div class="col-2 pl-1 mt-1">
                  <i class="material-icons">chevron_right</i>
                </div>
              </div>
            </div>
            <div v-show="!showAll">
              <div class="agentItemDiv row" @click="viewPayment">
                <div class="col-2 pl-4 mt-1">
                  <i class="material-icons">check</i>
                </div>
                <div class="col-8 agentNameDiv">
                  <p class="nameDiv">Lou Ard V. Soriano | 12,500.50</p>
                  <p class="branceDiv">Gaisano Grand Digos</p>
                </div>
                <div class="col-2 pl-1 mt-1">
                  <i class="material-icons">chevron_right</i>
                </div>
              </div>
            </div>
            <div v-show="!showAll">
              <div class="agentItemDiv row" @click="viewPayment">
                <div class="col-2 pl-4 mt-1">
                  <i class="material-icons">check</i>
                </div>
                <div class="col-8 agentNameDiv">
                  <p class="nameDiv">Lou Ard V. Soriano | 12,500.50</p>
                  <p class="branceDiv">Gaisano Grand Digos</p>
                </div>
                <div class="col-2 pl-1 mt-1">
                  <i class="material-icons">chevron_right</i>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>
      <div class="fixed-bottom footerDiv  bg-white text-center">
        <button class="footerBtn btn m-3" @click="addPayment">ADD NEW PAYMENT</button>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'PaymentView',
  data: function () {
    return {
      showAll: true
    }
  },
  created: function () {
  },
  methods: {
    backMainMenu () {
      if(this.showAll) {
        this.$router.push('/m/dashboard')
      } else {
        this.showAll = true
      }    },
    truncate (str, limit) {
      if(str.length>limit){
        str = str.substring(0, limit)+"..."
      }
      return str
    },
    populateAgents () {
      //truncate biya ha?
    },
    addPayment () {
      this.$router.push('/m/payment/new')
    },
    viewPayment () {
      this.showAll = false
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
  }
  @media only screen and (max-width: 320px) {
    .contentDiv{
      width: 94% !important;
      height: 90vh;
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
  .searchheader {
    font-size: 12px;
    text-decoration: underline;
    margin-bottom: 0px;
    margin-top: 7px;
  }
  .txtSearch {
    border: 1px solid #BCE0FD;
    border-radius: 0;
    font-size: 14px;
    margin-top: 6px;
    width: 94%;
    margin: auto;
    height: 50px !important;
  }
  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #92CCFD !important;
    opacity: 1; /* Firefox */
  }
  .divSwitch {
    display: inline-block;
    width: 100%;
    margin-top: 20px;
  }
  .agentStatus {
    font-size: 14px;
    margin-left: 16px;
  }
  #arrowBack {
    cursor: pointer;
  }
  .btnSearch {
    background-color: #2699FB;
    color: white;
    font-size: 14px;
    font-weight: 700;
    height: 40px;
    width: 94%;
    margin-left: 3% !important;
  }
  .agentsListDiv {
    margin: auto;
    margin-top: 17px;
    width: 94%;
    height: calc(100vh - 310px);
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .agentItemDiv {
    content: inline-block;
    background-color: #F1F9FF;
    padding-top: 16px;
    padding-bottom: 16px; 
    margin-bottom: 10px;
    cursor: pointer;
    height: 64px;
  }
  .agentNameDiv {
    font-size: 14px;
    overflow: hidden;  /* "overflow" value must be different from "visible" */                
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .nameDiv {
    margin-bottom: 0px;
  }
  .branceDiv {
    font-size: 10px;
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
