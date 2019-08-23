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
          <sidebar v-if="!notAdmin"></sidebar>
          <sidebar2 v-if="notAdmin"></sidebar2>
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
                <span>Announcement</span>
              <i class="material-icons iconAlign float-right">more_vert</i></span>
            </div>
            <!-- End Title -->
            <div class="bgDiv">
              <div class="row">
                <div class="col-md-12 formRow col-lg-3 cstmPanel" v-show="!notAdmin">
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel pl-3">Title</div>
                      </div>
                      <input type="text" v-model="title" class="form-control customText"  placeholder="enter announcement title">
                    </div>
                  </div>
                  <div class="eachInputTextArea">
                    <div class="input-group txtLabels">
                      <textarea type="text" v-model="body" class="form-control customTextDesc" rows="8"  placeholder="enter announcement">
                      </textarea>
                    </div>
                  </div>
                  <div class="buttonDiv">
                    <button class="footerBtn btn" @click="nxtPage" :disabled="title === '' || body === ''"><i class="large material-icons" >arrow_forward</i></button>
                  </div>
                </div>
                <div class="col-md-12 col-lg-9 anoouncementDiv " id="mainancmnt">
                  <div class="listRow col-md-12 formRow pb-0">
                    <div class="scrollable style-2 ">
                      <div class="listItem col-md-12" v-show="announcements.length === 0">
                        <p>NO ANNOUNCEMENT</p>
                      </div>
                      <div class="listItem col-md-12" v-for="annc in announcements">
                        <p class="anncmntDate">{{ annc.created_at }}
                          <span class="float-right text-danger ml-1" title="Delete" v-show="!notAdmin" @click="deleteAnc(annc.id)">
                            <i class="material-icons tools">delete</i>
                          </span>
                          <!-- <span class="float-right text-success ml-1" title="Edit" v-show="!notAdmin">
                            <i class="material-icons tools">edit</i>
                          </span> -->
                        </p> 
                        <p class="anncmntTitle">{{ annc.title }}</p>
                        <p class="anncmntDscptn">{{ annc.body }}</p>
                      </div>
                    </div>
                  </div>
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
        <Confirmation @cancel="cancel" @confirm="confirm"></Confirmation>
      </div> 
    </transition>
  </div>
</template>
<script>
import sidebar from '@/components/web/Sidebar.vue'
import sidebar2 from '@/components/web/Sidebar2.vue'
import sidebar3 from '@/components/web/Sidebar3.vue'
import Confirmation from '@/components/Confirmation.vue'
import axios from 'axios'
import emberLoader from '@/components/emberLoader.vue'
export default {
  components: {
    sidebar,
    sidebar2,
    sidebar3,
    Confirmation,
    emberLoader
  },
  name: 'PaymentView',
  data: function () {
    return {
      startDate: '',
      endDate: '',
      maxDatetime: '',
      ndate: new Date(),
      confirmationPage: false,
      notAdmin: true,
      doLoad: false,
      title: '',
      body: '',
      announcements: [],
      isJustUser: false
    }
  },
  created: function () {
    this.doLoad = true
    let self = this
    axios.get('api/user').then(response => {
      if(response.data.user_level === "1") {
        self.notAdmin = false
        self.isJustUser = false
      } else {
        var element = document.getElementById("mainancmnt")
        element.classList.remove('col-lg-9')
        element.classList.remove('col-lg-12')
        element.style.paddingLeft = '0px'
        if(response.data.user_level === "0") {
          self.notAdmin = true
          self.isJustUser = false
        }else{
          self.isJustUser = true
        }
      }

    }).catch(error => {
      console.log(error)
    })

    this.refresh()
    // no announcement case
  },
  methods: {
    refresh () {
      let self = this
      axios.get('api/announcement').then(response => {
        self.announcements = response.data.data
        self.doLoad = false
      }).catch(error => {
        console.log(error)
      })
    },
    backMainMenu () {
      this.$router.push('/dashboard')
    },
    showPaymentDetails () {
      this.paymentList = false
    },
    nxtPage () {
      this.confirmationPage = true
    },
    cancel () {
      this.confirmationPage = false
    },
    confirm () {
      this.doLoad = true
      let self = this
      let data = {
        title: self.title,
        body: self.body,
      }
      axios.post('api/announcement/new', data).then(response => {
        self.title = ''
        self.body = ''
        self.confirmationPage = false
        self.refresh()
        self.doLoad = false
      }).catch(error => {
        console.log(error)
        self.doLoad = false
      })
    },
    deleteAnc (id) {
      this.doLoad = true
      let self = this
      let data = {
        id: id
      }
      axios.post('api/announcement/delete', data).then(response => {
        self.refresh()
        self.doLoad = false
      }).catch(error => {
        console.log(error)
        self.doLoad = false
      })
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
  /* Added for froms */
  .eachInput {
    margin: auto;
    margin-top: 16px;
    height: 50px;
  }
  .eachInputTextArea {
    margin: auto;
    margin-top: 16px;
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
  .customTextDesc {
    border-radius: 0 !important;
    border-color: #BCE0FD;
    font-size: 14px;
    color: #2699FB
  }
  .input-group-text {
    background-color: #BCE0FD !important;
    border-radius: 0 !important;
    border-color: #BCE0FD;
  }
  .eachInputUpl {
    margin: auto;
    margin-top: 8px;
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
    .anoouncementDiv {
      padding-left: 0;
      padding-right: 0;
    }
  }
  @media (min-width: 992px) {
    .formRow {
      border: 1px solid #79C0FD;
      border-radius: 5px;
    }
    .anoouncementDiv {
      padding-left: 30px;
    }
  }
  /* End Added for froms */
  .listItem {
    background-color: #F1F9FF;
    padding: 19px;
    color: #2699FB;
    margin-bottom: 15px;
    margin-top: 15px;
    font-size: 14px;
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
  .tools {
    font-size: 16px;
    cursor: pointer;
  }
  .cstmPanel {
    max-height: 343px;
  }
</style>
