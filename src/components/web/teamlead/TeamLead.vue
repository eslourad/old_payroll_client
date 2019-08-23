<template>
  <div class="">
    <transition name="fade">
      <div id="emberloader" v-show="doLoad">
        <emberLoader></emberLoader>
      </div>
    </transition>
    <div class="side">
      <sidebar v-if="admin"></sidebar>
      <sidebar2 v-if="!admin"></sidebar2>
    </div>
    <transition name="fadeMain">
      <!-- Content -->
      <div class="myContent">
        <!-- Title -->
        <div class="row titleHead ml-2 mr-2">
          <span class="titleHeadText navHeaderMoreOption">
          <i class="material-icons iconAlign mr-1 bckArrow" id="arrowBack" @click="backMainMenu">arrow_back</i>
            <span >Team Leader</span>
          <i class="material-icons iconAlign float-right">more_vert</i></span>
        </div>
        <!-- End Title -->
        <div class="bgDiv">
          <!-- Search -->
          <div class="row searchRow mt-1 pl-1">
            <p class="lblSearch">Search</p>
          </div>
          <div class="row">
            <div class="col-md-12 col-lg-3">
              <div class="row txtRow">
                <input class="form-control form-control-lg txtSearch" v-model="searchAgentName" type="text" placeholder="enter team leader last name">
              </div>
              <div class="row searchRow mt-3 mb-1 text-right pr-0">
                <div class="float-right w-100" >
                  <div class="lblSearch agentStatusLabel inlineDisplay pt-1 pr-3">Active Team Leader</div>
                  <label class="switch inlineDisplay">
                    <input type="checkbox" class="cbAgentStatus" checked>
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
              <div class="row buttonRow">
                <button class="btnSearch btn " @click="searchAgent" :disabled="searchAgentName === ''">SEARCH</button>
              </div>
              <!-- End Search -->
            </div>
            <div class="col-md-12 col-lg-9 p-0 tableDiv">
              <div class="listRow float-right col-md-12">
                <div class="scrollable style-2 col-12">
                  <transition name="fadeMain">
                    <div class="showAllDiv">
                      <p v-show="searchingFor.length > 0" class="m-0 mb-2 text-info">Showing search result for {{ searchingFor }} (<u class="primary-color clickable" @click="showAllBranch">Show All</u>
                      )</p>
                    </div>
                  </transition>
                  <transition name="fadeMain">
                    <div class="listItem col-md-12 text-center mt-3" v-show="hasTableError">
                      <span class="w-100">{{ tableErrorMsg }}</span>
                    </div>
                  </transition>
                  <!-- Each List Item -->
                  <transition name="fadeMain" v-for="agent in agents" :key="'agent' + agent.id">
                    <div class="listItem col-md-12 d-flex" @click="showAgentInfo(agent.id, agent.branch_name)">
                      <span class="listIcon col-1 text-primary" v-show="agent.is_active === '1'" title="Active Agent"><i class="material-icons iconAlign2">person</i></span>
                      <span class="listIcon col-1 text-danger" v-show="agent.is_active === '0'" title="Inactive Agent"><i class="material-icons iconAlign2">person</i></span>
                      <span class="col-8 col-lg-6">
                        <span class="listTitle ">{{ agent.first_name }} {{ agent.last_name }}</span>
                        <span class="listDescription hideLg mt-1"><span class="hiddenNextLine"><br /></span>{{ agent.username }}</span>
                      </span>
                      <span class="col-0 col-lg-4 hiddenOnSmallDesc">
                        <span class="">{{ agent.username }}</span>
                      </span>
                      <span class="listIconMore col-3 col-lg-1"><i class="material-icons iconAlign2 float-right">keyboard_arrow_right</i></span>
                    </div>
                  </transition>
                  <!-- End Each List Item -->
                </div>
                <div class="row p-0 mt-2" v-show="!(hasTableError)">
                  <div class="col-6 pl-4">
                    <span class="pageColor">{{ pagination.from}} to {{ pagination.to }} of {{ pagination.total}}</span>
                  </div>
                  <div class="col-6 pr-4">
                    <nav aria-label="Page navigation example">
                      <ul class="pagination float-right p-0 m-0">
                        <li class="page-item" @click="decideMovePage(pagination.prevPageUrl)">
                          <a class="page-link cursorPoint pageColor btnPrev" :class="{ pageDisabled: pagination.isPrevDisabled }" aria-label="Previous">
                            <span aria-hidden="true">&lsaquo;</span>
                          </a>
                        </li>
                        <li class="page-item cursorPoint"><a class="page-link pageColor btnCurrent">{{ pagination.currentPage }} / {{ pagination.last_page }}</a></li>
                        <li class="page-item cursorPoint" @click="decideMovePage(pagination.nextPageUrl)">
                          <a class="page-link cursorPoint pageColor btnNext" :class="{ pageDisabled: pagination.isNextDisabled }">
                            <span aria-hidden="true">&rsaquo;</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>          
          </div>
        </div>
      </div>
    </transition>
    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" id="mdlAgentInfo">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="card">
            <h5 class="card-header bg-white">
              BRAND SPECIALIST INFORMATION
              <div class="btn-group float-right">
                <p class="mb-0 small clickable dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Actions
                </p>
                <div class="dropdown-menu dropdown-menu-right">
                  <button class="dropdown-item clickable" type="button" @click="editAgent" v-show="agentStatus">Edit Profile</button>
                  <button class="dropdown-item clickable" type="button" @click="editAgentStatus" v-show="agentStatus">Disable Brand Specialist</button>
                  <button class="dropdown-item clickable" type="button" @click="editAgentStatus" v-show="!agentStatus">Enable Brand Specialist</button>
                </div>
              </div>
            </h5>
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  <div class="row">
                    <div class="col-12 col-md-4 mb-4">
                      <img :src="'http://server.solarace.com.ph/uploads/' + selected.image_file_name" class="mr-3 custom_thumbnail" alt="2x2" height="200px" width="200px" id="twoBytwoID">
                    </div>
                    <div class="col-12 col-md-8 mb-4 pl-4">
                      <h5 class="mt-0"><i class="material-icons iconAlign2">person</i> {{ selected.first_name }} {{ selected.last_name }} (<span class="small text-success" v-show="selected.is_active === '1'">Active</span><span class="small text-danger" v-show="selected.is_active === '0'">Inactive</span>)</h5>
                      <p class="mb-0"><span class="text-secondary">Job Title - </span> {{ selected.title }}</p>
                      <p class="mb-0"><span class="text-secondary">Employment Date - </span> {{ selected.employment_date }}</p>
                      <p class="mb-0"><span class="text-secondary">Contact Number - </span> {{ selected.mobile_number }}</p>
                      <p class="mb-0"><span class="text-secondary">Email Address - </span> {{ selected.email }}</p>
                      <p class="mb-0"><span class="text-secondary">Date of Birth - </span> {{ selected.dob }}</p>
                      <p class="mb-0"><span class="text-secondary">Current Address - </span> {{ selected.current_address }}</p>
                      <p class="mb-0"><span class="text-secondary">Permanent Address - </span> {{ selected.permanent_address }}</p>
                    </div>
                  </div>
                  <div class="row mb-4">
                    <div class="col-12"> 
                      <p class="mb-0"><b>Emergency Contact Information</b></p>
                    </div>
                    <div class="col-12 col-md-6 ">
                      <p class="mb-0"><span class="text-secondary">Contact Person - </span> {{ selected.emergency_person }}</p>
                    </div>
                    <div class="col-12 col-md-6">
                      <p class="mb-0"><span class="text-secondary">Contact Number - </span> {{ selected.emergency_number }}</p>
                    </div>
                  </div>
                  <div class="row mb-4">
                    <div class="col-12"> 
                      <p class="mb-0"><b>Allowance</b></p>
                    </div>
                    <div class="col-12 col-md-12 ">
                      <p class="mb-0"><span class="text-secondary">Amount - </span>₱{{ selected.allowance }}</p>
                    </div>
                  </div>
                  <div class="row mb-4">
                    <div class="col-12"> 
                      <p class="mb-0"><b>Account Information</b></p>
                    </div>
                    <div class="col-12 col-md-12 ">
                      <p class="mb-0"><span class="text-secondary">Username - </span>{{ selected.username }}</p>
                    </div>
                  </div>
                  <div class="row pb-2">
                    <div class="col-12">
                      <div class="accordion" id="accordionExample">
                        <div class="card">
                          <div class="card-header" id="headingOne">
                            <h2 class="mb-0">
                              <button class="btn btn-link text-dark pl-0" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Educational Background
                              </button>
                            </h2>
                          </div>
                          <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div class="card-body">
                              <div class="mb-4">
                                <p class="mb-0"><b>High School</b></p>
                                <p class="mb-0"><span class="text-secondary">School Name - </span> {{ selected.high_school }}</p>
                                <p class="mb-0"><span class="text-secondary">Graduated - </span> <span v-show="selected.is_hs_grad === '1'">{{ selected.hs_grad_year }}</span><span v-show="selected.is_hs_grad === '0'">Not Graduated</span></p>
                              </div>
                              <div class="mb-4" v-show="selected.is_college_grad === '1'">
                                <p class="mb-0"><b>College</b></p>
                                <p class="mb-0"><span class="text-secondary">School Name - </span> {{ selected.college }}</p>
                                <p class="mb-0"><span class="text-secondary">Graduated - </span> <span v-show="selected.is_college_grad === '1'">{{ selected.college_grad_year }}</span><span v-show="selected.is_college_grad === '0'">Not Graduated</span></p>
                                <p class="mb-0"><span class="text-secondary">Course - </span> {{ selected.college_course }}</p>
                              </div>
                              <div v-show="selected.is_ts_grad === '1'">
                                <p class="mb-0"><b>Technical School</b></p>
                                <p class="mb-0"><span class="text-secondary">School Name - </span> {{ selected.technical_school }}</p>
                                <p class="mb-0"><span class="text-secondary" v-show="selected.is_ts_grad === '0'">Graduated - </span> <span v-show="selected.is_ts_grad === '1'">{{ selected.ts_year }}</span><span v-show="selected.is_ts_grad === '0'">Not Graduated</span></p>
                                <p class="mb-0"><span class="text-secondary">Program - </span> {{ selected.ts_program }}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="card">
                          <div class="card-header" id="headingTwo">
                            <h2 class="mb-0">
                              <button class="btn btn-link collapsed text-dark pl-0" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Employment History
                              </button>
                            </h2>
                          </div>
                          <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                            <div class="card-body">
                              <div class="mb-4">
                                <p class="mb-0"><b>{{ selected.company_name }}</b></p>
                                <p class="mb-0">{{ selected.position }} ( {{ selected.from }} - {{ selected.to }} )</p>
                              </div>
                              <div class="mb-4" v-show="selected.company_name_two">
                                <p class="mb-0"><b>{{ selected.company_name_two }}</b></p>
                                <p class="mb-0">{{ selected.position_two }} ( {{ selected.from_two }} - {{ selected.to_two }} )</p>
                              </div>
                              <div class="mb-4" v-show="selected.company_name_three">
                                <p class="mb-0"><b>{{ selected.company_name_three }}</b></p>
                                <p class="mb-0">{{ selected.position_three }} ( {{ selected.from_three }} - {{ selected.to_three }} )</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="card">
                          <div class="card-header" id="headingThree">
                            <h2 class="mb-0">
                              <button class="btn btn-link collapsed text-dark pl-0" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Employment Requirements
                              </button>
                            </h2>
                          </div>
                          <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                            <div class="card-body">
                              <div class="col-12 mb-2">
                                <center>
                                  <p class="mb-0 text-secondary">PSA Birth Certificate</p>
                                  <img :src="'http://server.solarace.com.ph/uploads/' + selected.psa_file_name" alt="PSA Birth Certificate" class="img-thumbnail bckArrow viewableImgs" height="100" width="100" @click="showImg('psaID')" id="psaID">
                                </center>
                              </div>
                              <div class="col-12 mb-2">
                                <center>
                                  <p class="mb-0 text-secondary">Police / NBI Clearance</p>
                                  <img :src="'http://server.solarace.com.ph/uploads/' + selected.nbi_file_name" alt="Police / NBI Clearance" class="img-thumbnail bckArrow viewableImgs" height="100" width="100" @click="showImg('nbiID')" id="nbiID">
                                </center>
                              </div>
                              <div class="col-12 mb-2">
                                <center>
                                  <p class="mb-0 text-secondary">SSS: {{ selected.sss }}</p>
                                  <img v-show="selected.sss_file !== ''" :src="'http://server.solarace.com.ph/uploads/' + selected.sss_file" alt="SSS Form" class="img-thumbnail bckArrow viewableImgs" height="100" width="100" @click="showImg('sssID')" id="sssID">
                                </center>
                              </div>
                              <div class="col-12 mb-2">
                                <center>
                                  <p class="mb-0 text-secondary">Pab-Ibig: {{ selected.pag_ibig }}</p>
                                  <img v-show="selected.pag_ibig_file !== ''" :src="'http://server.solarace.com.ph/uploads/' + selected.pag_ibig_file" alt="Pag-ibig Form" class="img-thumbnail bckArrow viewableImgs" height="100" width="100" @click="showImg('pagbigID')" id="pagbigID">
                                </center>
                              </div>
                              <div class="col-12 mb-2">
                                <center>
                                  <p class="mb-0 text-secondary">Phil-Health: {{ selected.phil_health }}</p>
                                  <img v-show="selected.phil_health_file !== ''" :src="'http://server.solarace.com.ph/uploads/' + selected.phil_health_file" alt="Phil-health Form" class="img-thumbnail bckArrow viewableImgs" height="100" width="100" @click="showImg('philHealthID')" id="philHealthID">
                                </center>
                              </div>
                            </div>
                            <div id="psaModal" class="imgmodal">
                              <span class="close" @click="closeModal">&times;</span>
                              <img class="cstmmodal" id="img01">
                              <div id="caption"></div>
                            </div>
                          </div>
                        </div>
                        <div class="card">
                          <div class="card-header" id="headingFour">
                            <h2 class="mb-0">
                              <button class="btn btn-link collapsed text-dark pl-0" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                Branches
                              </button>
                            </h2>
                          </div>
                          <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                            <div class="card-body">
                              <div class="mb-4">
                                <p v-for="branch in tlBranches" v-show="tlBranches.length">
                                  - {{ branch.branch_name }}
                                </p>
                                <p class="small text-warning" v-show="!tlBranches.length">No branch assigned</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--Confirmation Page-->
    <div v-show="confirmationPage" class="allInput style-1">
      <Confirmation @confirm="confirm" @cancel="cancel"></Confirmation>
    </div> 
  </div>
</template>
<script>
import sidebar from '@/components/web/Sidebar.vue'
import sidebar2 from '@/components/web/Sidebar2.vue'
import axios from 'axios'
import emberLoader from '@/components/emberLoader.vue'
import Confirmation from '@/components/Confirmation.vue'
export default {
  components: {
    sidebar,
    emberLoader,
    axios,
    Confirmation,
    sidebar2
  },
  name: 'Saving',
  data: function () {
    return {
      paymentList: true,
      agents: [],
      pagination: {
        nextPageUrl: '',
        prevPageUrl: '',
        currentPage: '',
        last_page: '',
        isPrevDisabled: true,
        isNextDisabled: false,
        from: '',
        to: '',
        total: ''
      },
      hasTableError: false,
      isSearching: false,
      tableErrorMsg: '',
      searchAgentName: '',
      searchingFor: '',
      searchStatus: true,
      selected: [],
      agentStatus: true,
      confirmationPage: false,
      agentId: '',
      admin: true,
      isPromoting: false,
      tlBranches: []
    }
  },
  created: function () {
    if(localStorage.admin === 'true') {
      this.admin = true
    } else {
      this.admin = false
    }
    this.showTable()
  },
  methods: {
    backMainMenu () {
      if(this.paymentList) {
        this.$router.push('/dashboard')
      } else {
        this.paymentList = true
      }
    },
    showPaymentDetails () {
      this.paymentList = false
    },
    showTable () {
      this.doLoad = true
      let self = this
      axios.get('api/teamlead').then(response => {
        if(response.data.status === 'success'){
          self.isSearching = false
          self.agents = response.data.data.data
          self.pagination.prevPageUrl = response.data.data.prev_page_url
          self.pagination.nextPageUrl = response.data.data.next_page_url
          self.pagination.currentPage = response.data.data.current_page
          self.pagination.last_page = response.data.data.last_page
          self.pagination.from = response.data.data.from
          self.pagination.to = response.data.data.to
          self.pagination.total = response.data.data.total
          if (self.pagination.prevPageUrl === null) {
            self.pagination.isPrevDisabled = true
          } else {
            self.pagination.isPrevDisabled = false
          }
          if (self.pagination.nextPageUrl === null) {
            self.pagination.isNextDisabled = true
          } else {
            self.pagination.isNextDisabled = false
          }
          self.hasTableError = false
        } else {
          self.hasTableError = true
          self.tableErrorMsg = response.data.data
        }
        this.doLoad = false
      }).catch(error => {
        console.log(error)
      })
    },
    movePage (url) {
      if(url !== null){
        this.doLoad = true
        url = url.replace('http://server.solarace.com.ph/', '')
        let self = this
        axios.get(url).then(response => {
          self.isSearching = false
          self.agents = response.data.data.data
          self.pagination.prevPageUrl = response.data.data.prev_page_url
          self.pagination.nextPageUrl = response.data.data.next_page_url
          self.pagination.currentPage = response.data.data.current_page
          self.pagination.last_page = response.data.data.last_page
          self.pagination.from = response.data.data.from
          self.pagination.to = response.data.data.to
          self.pagination.total = response.data.data.total
          if (self.pagination.prevPageUrl === null) {
            self.pagination.isPrevDisabled = true
          } else {
            self.pagination.isPrevDisabled = false
          }
          if (self.pagination.nextPageUrl === null) {
            self.pagination.isNextDisabled = true
          } else {
            self.pagination.isNextDisabled = false
          }
          let widthVP = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
          if (widthVP <= 992) {
            $('html, body').animate({ scrollTop: 950 }, 'slow')
          }
          this.doLoad = false
        }).catch(error => {
          console.log(error)
        })

      } 
    },
    decideMovePage (url) {
      if(this.isSearching) {
        this.searchMovePage(url)
      } else {
        this.movePage(url)
      }
    },
    searchAgent () {
      this.doLoad = true
      if($('.cbAgentStatus').prop('checked')) {
        this.searchStatus = true
      } else {
        this.searchStatus = false
      }
      let data = {
        last_name: this.searchAgentName,
        is_active: this.searchStatus
      }
      let self = this
      axios.post('api/tl/search', data).then(response => {
        if(response.data.status === 'success'){
          self.isSearching = true
          self.agents = response.data.data.data
          self.pagination.prevPageUrl = response.data.data.prev_page_url
          self.pagination.nextPageUrl = response.data.data.next_page_url
          self.pagination.currentPage = response.data.data.current_page
          self.pagination.last_page = response.data.data.last_page
          self.pagination.from = response.data.data.from
          self.pagination.to = response.data.data.to
          self.pagination.total = response.data.data.total
          if (self.pagination.prevPageUrl === null) {
            self.pagination.isPrevDisabled = true
          } else {
            self.pagination.isPrevDisabled = false
          }
          if (self.pagination.nextPageUrl === null) {
            self.pagination.isNextDisabled = true
          } else {
            self.pagination.isNextDisabled = false
          }
          self.hasTableError = false
          self.doLoad = false
        } else {
          self.agents = []
          self.hasTableError = true
          self.tableErrorMsg = response.data.data
          self.doLoad = false
        }
        let widthVP = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
        let limitCharLength = 0
        if (widthVP <= 992) {
          limitCharLength = 15
        } else {
          limitCharLength = 45
        }
        if (this.searchAgentName.length > limitCharLength) {
          limitCharLength = limitCharLength - 3
          this.searchAgentName = this.searchAgentName.substring(0, limitCharLength) + '...'
        }
        self.searchingFor = this.searchAgentName
      }).catch(error => {
        console.log(error)
        self.doLoad = false
      })
    },
    showAllBranch () {
      this.showTable()
      this.searchingFor = ''
      this.hasTableError = false
      this.searchAgentName = ''
    },
    searchMovePage (url) {
      if(url !== null){
        this.doLoad = true
        url = url.replace('http://server.solarace.com.ph/', '')
        let self = this
        let data = {
          last_name: this.searchAgentName,
          is_active: this.searchStatus
        }
        axios.post(url, data).then(response => {
          self.isSearching = true
          self.agents = response.data.data.data
          self.pagination.prevPageUrl = response.data.data.prev_page_url
          self.pagination.nextPageUrl = response.data.data.next_page_url
          self.pagination.currentPage = response.data.data.current_page
          self.pagination.last_page = response.data.data.last_page
          self.pagination.from = response.data.data.from
          self.pagination.to = response.data.data.to
          self.pagination.total = response.data.data.total
          if (self.pagination.prevPageUrl === null) {
            self.pagination.isPrevDisabled = true
          } else {
            self.pagination.isPrevDisabled = false
          }
          if (self.pagination.nextPageUrl === null) {
            self.pagination.isNextDisabled = true
          } else {
            self.pagination.isNextDisabled = false
          }
          self.hasTableError = false
          let widthVP = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
          if (widthVP <= 992) {
            $('html, body').animate({ scrollTop: 950 }, 'slow')
          }
          this.doLoad = false
        }).catch(error => {
          console.log(error)
        })
      } 
    },
    showAgentInfo(id, branchName) {
      self = this
      this.doLoad = true
      localStorage.agentStoreName = branchName
      let self = this
      this.agentId = id
      axios.get('api/agent/' + id).then(response => {
        //self.selected.id = response.data.id
        self.selected = response.data
        if(self.selected.is_active === '1') {
          self.agentStatus = true
        } else {
          self.agentStatus = false
        }
        self.showTLBranches()
        $('#mdlAgentInfo').modal('show')
      }).catch(error => {
        console.log(error)
      })
    },
    showImg (imgId) {
      let modal = document.getElementById('psaModal')
      let img = document.getElementById(imgId)
      let modalImg = document.getElementById('img01')
      let captionText = document.getElementById("caption");
      modal.style.display = "block"
      modalImg.src = img.src
      captionText.innerHTML = img.alt
      
    },
    closeModal () {
      let modal = document.getElementById('psaModal')
      modal.style.display = "none"
    },
    editAgent () {
      localStorage.editingID = this.agentId
      localStorage.isCreating = '0'
      localStorage.agentStore = this.selected.branch_id
      localStorage.agentTitle = this.selected.title
      localStorage.agentFName = this.selected.first_name
      localStorage.agentLName = this.selected.last_name
      localStorage.agentDob  = this.selected.dob
      localStorage.agentEmployementDate  = this.selected.employment_date
      localStorage.agentEmail  = this.selected.email
      localStorage.agentMNumber = this.selected.mobile_number
      localStorage.agentCAddress = this.selected.current_address
      localStorage.agentPAddress = this.selected.permanent_address
      //page2
      localStorage.agentContactPerson = this.selected.emergency_person
      localStorage.agentMobileNumber = this.selected.emergency_number
      localStorage.agentHighSchool = this.selected.high_school
      if (this.selected.is_hs_grad === '1') {
        localStorage.agentIsHSGraduated = 'true'
      } else {
        localStorage.agentIsHSGraduated = 'false'
      }
      localStorage.hsYear = this.selected.hs_grad_year
      localStorage.agentCollege = this.selected.college
      if (this.selected.is_college_grad === '1') {
        localStorage.agentIsColGrad = 'true'
      } else {
        localStorage.agentIsColGrad = 'false'
      }
      localStorage.collegeYear = this.selected.college_grad_year
      localStorage.agentColCourse = this.selected.college_course
      localStorage.agentTSProgram = this.selected.ts_program
      if (this.selected.is_ts_grad === '1') {
        localStorage.agentIsTSGrad = 'true'
      } else {
        localStorage.agentIsTSGrad = 'false'
      }
      localStorage.tsYear = this.selected.ts_year
      localStorage.tsSchool = this.selected.technical_school
      //page3
      localStorage.agentCompany = this.selected.company_name
      localStorage.agentPosition = this.selected.position
      localStorage.comp1From = this.selected.from
      localStorage.comp1To = this.selected.to
      localStorage.agentCompany2 = this.selected.company_name_two
      localStorage.agentPosition2 = this.selected.position_two
      localStorage.comp2From = this.selected.from_two
      localStorage.comp2To = this.selected.to_two
      localStorage.agentCompany3 = this.selected.company_name_three
      localStorage.agentPosition3 = this.selected.position_three
      localStorage.comp3From = this.selected.from_three
      localStorage.comp3To = this.selected.to_three
      //page4
      localStorage.removeItem('editingFile1')
      localStorage.removeItem('editingFile2')
      localStorage.removeItem('editingFile3')
      localStorage.fileName1 = this.selected.image_file_name
      localStorage.fileSize1 = this.selected.image_file_size
      localStorage.fileDate1 = this.selected.image_date_uploaded
      localStorage.fileName2 = this.selected.psa_file_name
      localStorage.fileSize2 = this.selected.psa_file_size
      localStorage.fileDate2 = this.selected.psa_date_uploaded
      localStorage.fileName3 = this.selected.nbi_file_name
      localStorage.fileSize3 = this.selected.nbi_file_size
      localStorage.fileDate3 = this.selected.nbi_date_uploaded
      localStorage.upl2x2 = this.selected.image_file_name
      localStorage.uplpsa = this.selected.psa_file_name
      localStorage.uplnbi = this.selected.nbi_file_name
      //page 5
      localStorage.agentSSS = this.selected.sss
      localStorage.agentPagIbig = this.selected.pag_ibig
      localStorage.agentPhilHealth = this.selected.phil_health
      localStorage.agentBankName = this.selected.bank_name
      localStorage.agentAccountName = this.selected.account_name
      localStorage.agentAccountNumber = this.selected.account_number
      localStorage.uplsss = this.selected.sss_file
      localStorage.uplpagibig = this.selected.pag_ibig_file
      localStorage.uplphilhealth = this.selected.phil_health
      localStorage.allowance = this.selected.allowance
      localStorage.isTLEditing = '1'
      $('#mdlAgentInfo').modal('hide')
      this.$router.push('/agent/new')
    },
    editAgentStatus (e) {
      e.preventDefault()
      this.doLoad = true
      this.confirmationPage = true
      this.doLoad = false
    },
    confirm () {
      if(this.isPromoting) {
        this.confirmPromoteAgent()
      } else {
        this.changeAgentStatus()
      }
    },
    changeAgentStatus () {
      let self = this
      this.doLoad = true
      this.confirmationPage = false
      let status = 0
      if(!(this.agentStatus)){
        status = 1
      }
      let data = {
        id: this.agentId,
        is_active: status
      }
      axios.post('api/agent/status', data).then(response => {
        self.showAgentInfo(self.agentId)
        self.showTable()
        self.doLoad = false
      }).catch(error => {
        console.log(error)
      })
    },
    cancel () {
      this.confirmationPage = false
    },
    promoteAgent () {
      this.isPromoting = true
      this.confirmationPage = true
    },
    confirmPromoteAgent () {
      let self = this
      this.doLoad = true
      this.confirmationPage = false
      let data = {
        id: this.agentId
      }
      axios.post('api/agent/promote', data).then(response => {
        self.showAgentInfo(self.agentId)
        self.showTable()
        $('#mdlAgentInfo').modal('hide')
        self.isPromoting = false
        self.doLoad = false
      }).catch(error => {
        console.log(error)
      })
    },
    showTLBranches () {
      let self = this
      this.doLoad = true
      let data = {
        id: this.agentId
      }
      axios.post('api/tl/branches', data).then(response => {
        if(response.data.status === 'success'){
          self.tlBranches = response.data.data
        } else {
          self.tlBranches = []
        }
        self.doLoad = false
      }).catch(error => {
        console.log(error)
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
  /* Search */
  .searchRow {
    font-size: 14px;
    color: #2699FB;
    margin-bottom: -10px;
  }  .txtSearch {
    border: 1px solid #BCE0FD;
    border-radius: 0;
    font-size: 14px;
    margin-top: 6px;
    width: 100%;
    margin: auto;
    height: 50px !important;
    margin-left: 0px;
    z-index: 0;
    float: none;
  }
  .btnSearch {
    background-color: #2699FB;
    color: white;
    font-size: 14px;
    font-weight: 700;
    height: 40px;
    width: 100%;
    margin-top: 3px;
  }
  .buttonRow {
    padding: 0;
    padding-bottom: 20px;
  }
  .switch {
    position: relative;
    display: inline-block;
    width: 52px;
    height: 26px;
  }

  .switch input { 
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #2196F3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
  .toggleDiv {
    text-align: center;
  }
  /* End Search */
  /* each input */
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
    color: #2699FB;
  }
  .input-group-text {
    background-color: #BCE0FD !important;
    border-radius: 0 !important;
    border-color: #BCE0FD;
  }
  .dateWidth {
    width: calc(100% - 75px);
  }
  /* each input end */
  /* End New Payment */
  /* Payment List */
  @media (min-width: 1px) {
    .listRow {
      padding: 0;
      background-color: none;
      padding-bottom: 10px;
    }
    .scrollable {
      padding-right: 0px;
    }
    .hiddenNextLine {
      display: block;
      height: 0px;
      width: 0px;
      margin-top: -8px;
    }
    .listDescription {
      float: none;
      font-size: 10px;
    }
    .divPayPeriod {
      background-color: #F1F9FF;
    }
    .hideLg {
      display: block;
    }
  }
  @media (min-width: 992px) {
    .listRow {
      border: 1px solid #4EABFB;
      border-radius: 5px;
      max-height: none;
      padding-top: 24px;
      padding-bottom: 24px;
      padding-left: 12px;
      padding-right: 6px;
      background-color: white;
    }
    .scrollable {
      padding-right: 10px;
    }
    .hiddenNextLine {
      display: none;
    }
    .listDescription {
      float: right;
      font-size: 14px;
    }
    .divPayPeriod {
      background-color: white;
    }
    .hideLg {
      display: none;
    }
  }
  
  .iconAlign2 {
    vertical-align: bottom;
  }
  .listItem {
    background-color: #F1F9FF;
    padding: 19px;
    padding-right: 1px;
    padding-left: 1px;
    color: #2699FB;
    margin-bottom: 15px;
    font-size: 14px;
    cursor: pointer;
  }
  .paymentDetails {
    display: none !important;
  }
  .scrollable {
    overflow-y: auto;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
  }
  @media (min-width: 1px) {
    .tableDiv {
      padding-left: 0 !important;
    }
    .btnNewPayment {
      display: none;
    }
    .cstmtooltip {
      display: block;
    }
    .hiddenOnSmallDesc {
      display: none;
    }
  }
  @media (min-width: 960px) {
    .tableDiv {
      padding-left: 18px !important;
    }
    .btnNewPayment {
      display: block;
    }
    .cstmtooltip {
      display: none;
    }
    .hiddenOnSmallDesc {
      display: block;
    }
  }
  /* End Payment List */
  /* Added after functions */
  .pageColor {
    color: #2699FB !important;
  }
  .pageDisabled {
    background-color: #E9ECEF !important;
    cursor: not-allowed !important;
    color: white !important;
  }
  .custom_thumbnail {
    padding: 0.25rem;
    background-color: #fff;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
  }
  .viewableImgs:hover {opacity: 0.7;}

  /* The Modal (background) */
  .imgmodal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
  }

  /* Modal Content (Image) */
  .cstmmodal {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
  }

  /* Caption of Modal Image (Image Text) - Same Width as the Image */
  #caption {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
    text-align: center;
    color: #ccc;
    padding: 10px 0;
    height: 150px;
  }

  /* Add Animation - Zoom in the Modal */
  .cstmmodal, #caption { 
    animation-name: zoom;
    animation-duration: 0.6s;
  }

  @keyframes zoom {
    from {transform:scale(0)} 
    to {transform:scale(1)}
  }

  /* The Close Button */
  .close {
    position: absolute;
    top: 15px;
    right: 35px;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    transition: 0.3s;
  }

  .close:hover,
  .close:focus {
    color: #bbb;
    text-decoration: none;
    cursor: pointer;
  }

  /* 100% Image Width on Smaller Screens */
  @media only screen and (max-width: 700px){
    .cstmmodal {
      width: 100%;
    }
  }
</style>
