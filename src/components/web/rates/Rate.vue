<template>
  <div class="" @click="suggestClose">
    <transition name="fade">
      <div id="emberloader" v-show="doLoad">
        <emberLoader></emberLoader>
      </div>
    </transition>
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
            <span>Rates</span>
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
                <input class="form-control form-control-lg txtSearch" type="text" v-model="searchBranchName" placeholder="enter store name" @keyup.enter="searchBranch">
              </div>
              <div class="row searchRow mt-3 mb-1 text-right pr-0">
                <div class="float-right w-100" >
                  <div class="lblSearch agentStatusLabel inlineDisplay pt-1 pr-3">Active Store</div>
                  <label class="switch inlineDisplay">
                    <input type="checkbox" class="cbBranchStatus" checked>
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
              <div class="row buttonRow">
                <button class="btnSearch btn" @click="searchBranch" :disabled="searchBranchName === ''">SEARCH</button>
              </div>
              <!-- End Search -->
              <!-- Start New Payment -->
              <div class="row divPayPeriod mb-4">
                <div class="col-md-12 searchRow">
                  <p class="lblSearch">Store Information</p>
                  <transition name="fade">
                    <div class="bg-danger text-white text-center" v-show="creationError">
                      <p class="pt-2 pb-2"><i class="material-icons iconAlign2">info</i> Store name already taken</p>
                    </div>
                  </transition>
                  <transition name="fade">
                    <div class="bg-success text-white text-center" v-show="creationOK">
                      <p class="pt-2 pb-2"><i class="material-icons iconAlign2">check</i> Store successfully created</p>
                    </div>
                  </transition>
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">Store <br />Name</div>
                      </div>
                      <input type="text" v-model="create.branchName" class="form-control customText" v-validate="'required'" data-vv-as="store name" data-vv-scope="add" name="create.branchName"  placeholder="enter store name">
                    </div>
                  </div>
                  <div class="row ml-3 pt-2 text-danger">
                    <span>{{ errors.first('create.branchName') }}</span>
                  </div>
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">Rate</div>
                      </div>
                      <input type="text" v-model="create.rate" v-validate="'required|numeric|max_value:2147483647'" data-vv-as="rate" data-vv-scope="add" name="create.rate" class="form-control customText"  placeholder="enter rate">
                    </div>
                  </div>
                  <div class="row ml-3 pt-2 text-danger">
                    <span>{{ errors.first('create.rate') }}</span>
                  </div>
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">Over Time</div>
                      </div>
                      <input type="text" v-model="create.overTime" v-validate="'required|numeric|max_value:2147483647'" data-vv-as="overtime" data-vv-scope="add" name="over time" class="form-control customText"  placeholder="enter amount">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabelPercent">&nbsp;&nbsp;&nbsp;&nbsp;%</div>
                      </div>
                    </div>
                  </div>
                  <div class="row ml-3 pt-2 text-danger">
                    <span>{{ errors.first('over time') }}</span>
                  </div>
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">Regular <br />Holiday</div>
                      </div>
                      <input type="text" v-model="create.regularHoliday" v-validate="'required|numeric|max_value:2147483647'"  data-vv-as="regular holiday" data-vv-scope="add" name="create.regularHoliday" class="form-control customText"  placeholder="enter amount">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabelPercent">&nbsp;&nbsp;&nbsp;&nbsp;%</div>
                      </div>
                    </div>
                  </div>
                  <div class="row ml-3 pt-2 text-danger">
                    <span>{{ errors.first('create.regularHoliday') }}</span>
                  </div>
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">Special <br />Holiday</div>
                      </div>
                      <input type="text" v-model="create.specialHoliday" v-validate="'required|numeric|max_value:2147483647'" data-vv-as="special holiday" data-vv-scope="add" name="create.specialHoliday" class="form-control customText"  placeholder="enter amount">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabelPercent">&nbsp;&nbsp;&nbsp;&nbsp;%</div>
                      </div>
                    </div>
                  </div>
                  <div class="row ml-3 pt-2 text-danger">
                    <span>{{ errors.first('create.specialHoliday') }}</span>
                  </div>
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">Work on<br />Rest Day</div>
                      </div>
                      <input type="text" v-model="create.restDay" v-validate="'required|numeric|max_value:2147483647'" data-vv-as="rest day" data-vv-scope="add" name="create.restDay" class="form-control customText"  placeholder="enter amount">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabelPercent">&nbsp;&nbsp;&nbsp;&nbsp;%</div>
                      </div>
                    </div>
                  </div>
                  <div class="row ml-3 pt-2 text-danger">
                    <span>{{ errors.first('create.restDay') }}</span>
                  </div>
                  <div class="eachInput mb-3">
                    <button type="submit" @click="createBranch" class="btnSearch btn pb-2"><i class="large material-icons">arrow_forward</i></button>
                  </div>
                </div>
              </div>
              <!-- End New Payment -->
            </div>
            <div class="col-md-12 col-lg-9 p-0 tableDiv">
              <div class="listRow float-right col-md-12 pb-2 pt-1">
                <div class="scrollable style-2 col-12">
                  <transition name="fadeMain">
                    <div class="showAllDiv mb-2 mt-1">
                      <p v-show="searchingFor.length > 0" class="m-0 mb-2 text-info">Showing search result for {{ searchingFor }} (<u class="primary-color clickable" @click="showAllBranch">Show All</u>
                      )</p>
                    </div>
                  </transition>
                  <transition name="fadeMain">
                    <div class="listItem col-md-12 text-center" v-show="hasTableError">
                      <span class="w-100">{{ tableErrorMsg }}</span>
                    </div>
                  </transition>
                  <!-- Each List Item -->
                  <transition name="fadeMain" v-for="brnch in branch" :key="'branch' + brnch.id">
                    <div class="listItem col-md-12 d-flex " @click="showBranchInfo(brnch.id)">
                      <span class="listIcon col-1 text-success" v-show="brnch.is_active === '1'" title="Active Branch"><i class="material-icons iconAlign2">check_circle</i></span>
                      <span class="listIcon col-1 text-warning" v-show="brnch.is_active === '0'" title="Inactive Branch"><i class="material-icons iconAlign2">cancel</i></span>
                      <span class="col-8 col-lg-6">
                        <span class="listTitle ">{{ brnch.branch_name }}</span>
                        <span class="listDescription hideLg mt-1"><span class="hiddenNextLine"><br /></span>{{ brnch.first_name }} {{ brnch.last_name }}</span>
                      </span>
                      <span class="col-0 col-lg-4 hiddenOnSmallDesc">
                        <span class="">{{ brnch.first_name }} {{ brnch.last_name }}</span>
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
    <!-- Modal -->
    <div class="modal fade" id="mdlBranchInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title" id="exampleModalLabel">Store Information</h6>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body pt-0 pb-0">
            <div class="row p-3" v-show="!isEditing">
              <div class="col-12">
                <span class="titleFontSize">{{ selected.branchName }} </span><span v-show="selected.status" class="small bg-success text-white p-1 lead">ACTIVE</span><span v-show="!selected.status" class="small bg-secondary text-white p-1 lead">INACTIVE</span>
                <p class="teamLeadFontSize">{{ selected.teamLead }}</p>
                <p>Username: {{ selected.username }}</p>
              </div>
              <div class="col-6">
                <p>Rate: {{ selected.rate }}</p>
                <p>Over Time: {{ selected.overTime }}%</p>
                <p>Regular Holiday: {{ selected.regularHoliday }}%</p>
              </div>
              <div class="col-6">
                <p>Special Holiday: {{ selected.specialHoliday }}%</p>
                <p>Work on Rest Day: {{ selected.restDay }}%</p>
              </div>
            </div>
            <div class="row p-3" v-show="isEditing">
              <transition name="fade">
                <div class="bg-danger text-white text-center w-100 mb-2" v-show="editingHasError" >
                  <p class="pt-3 pl-3 pr-3 w-100"><i class="material-icons iconAlign2">info</i> Store name already taken</p>
                </div>
              </transition>
              <div class="row col-12 searchRow w-100 pl-4">
                <div class="lblSearch agentStatusLabel inlineDisplay pt-1 pr-3 ml-1">Store Status</div>
                <label class="switch inlineDisplay">
                  <input type="checkbox" class="cbEditBranchStatus" v-model="selected.status">
                  <span class="slider round"></span>
                </label>
              </div>
              <div class="eachInput">
                <div class="input-group txtLabels">
                  <div class="input-group-prepend">
                    <div class="input-group-text customLabel text-left">Store   <br />Name</div>
                  </div>
                  <input type="text" v-model="selected.branchName" class="form-control customText" v-validate="'required|alpha_spaces'" id="txtEditBranchName" name="selected.branchName" data-vv-as="store name" data-vv-scope="edit"  placeholder="enter store name"  :disabled="!selected.status">
                </div>
              </div>
              <div class="row ml-3 pt-2 text-danger">
                <span>{{ errors.first('selected.branchName') }}</span>
              </div>
              <div class="eachInput">
                <div class="input-group txtLabels">
                  <div class="input-group-prepend">
                    <div class="input-group-text customLabel text-left">Team <br />Lead</div>
                  </div>
                  <input type="text" v-model="selected.teamLead" v-validate="'alpha_spaces'" @keyup="tlChosenEdit" name="selected.teamLead" data-vv-as="team lead" data-vv-scope="edit" id="txtEditTeamLead" class="form-control customText"  placeholder="search using last name" :disabled="!selected.status" autocomplete="off">
                  <input type="hidden" v-model="selected.teamLeadID" v-validate="'numeric'" name="selected.teamLeadID" data-vv-scope="edit" :disabled="!selected.status"><br>
                  <div id="editLivesearch" class="col-12 p-0" @click="editTlSelected"></div>
                </div>
              </div>
              <div class="row ml-3 pt-2 text-danger" v-show="errors.first('selected.teamLeadID')">
                <span>Choose team lead from the suggestion list</span>
              </div>
              <div class="eachInput">
                <div class="input-group txtLabels">
                  <div class="input-group-prepend">
                    <div class="input-group-text customLabel text-left">Rate</div>
                  </div>
                  <input type="text" v-model="selected.rate" v-validate="'required|numeric|max_value:2147483647'" name="selected.rate" data-vv-as="rate" data-vv-scope="edit" id="txtEditRate" class="form-control customText"  placeholder="enter rate" :disabled="!selected.status">
                </div>
              </div>
              <div class="row ml-3 pt-2 text-danger">
                <span>{{ errors.first('selected.rate') }}</span>
              </div>
              <div class="eachInput">
                <div class="input-group txtLabels">
                  <div class="input-group-prepend">
                    <div class="input-group-text customLabel text-left">Over Time</div>
                  </div>
                  <input type="text" v-model="selected.overTime" v-validate="'required|numeric|max_value:2147483647'" name="selected.overTime" data-vv-as="over time" data-vv-scope="edit" id="txtEditOverTime"  class="form-control customText"  placeholder="enter amount" :disabled="!selected.status">
                  <div class="input-group-prepend">
                    <div class="input-group-text customLabelPercent">&nbsp;&nbsp;&nbsp;&nbsp;%</div>
                  </div>
                </div>
              </div>
              <div class="row ml-3 pt-2 text-danger">
                <span>{{ errors.first('selected.overTime') }}</span>
              </div>

              <div class="eachInput">
                <div class="input-group txtLabels">
                  <div class="input-group-prepend">
                    <div class="input-group-text customLabel text-left">Regular <br />Holiday</div>
                  </div>
                  <input type="text" v-model="selected.regularHoliday" v-validate="'required|numeric|max_value:2147483647'" name="selected.regularHoliday" data-vv-as="regular holiday" id="txtEditRegularHoliday" data-vv-scope="edit" class="form-control customText"  placeholder="enter amount" :disabled="!selected.status">
                  <div class="input-group-prepend">
                    <div class="input-group-text customLabelPercent">&nbsp;&nbsp;&nbsp;&nbsp;%</div>
                  </div>
                </div>
              </div>
              <div class="row ml-3 pt-2 text-danger">
                <span>{{ errors.first('selected.regularHoliday') }}</span>
              </div>
              <div class="eachInput">
                <div class="input-group txtLabels">
                  <div class="input-group-prepend">
                    <div class="input-group-text customLabel text-left">Special <br />Holiday</div>
                  </div>
                  <input type="text" v-model="selected.specialHoliday" v-validate="'required|numeric|max_value:2147483647'" name="selected.specialHoliday" data-vv-as="special holiday" id="txtEditSpecialHoliday" data-vv-scope="edit" class="form-control customText"  placeholder="enter amount" :disabled="!selected.status">
                  <div class="input-group-prepend">
                    <div class="input-group-text customLabelPercent">&nbsp;&nbsp;&nbsp;&nbsp;%</div>
                  </div>
                </div>
              </div>
              <div class="row ml-3 pt-2 text-danger">
                <span>{{ errors.first('selected.specialHoliday') }}</span>
              </div>
              <div class="eachInput">
                <div class="input-group txtLabels">
                  <div class="input-group-prepend">
                    <div class="input-group-text customLabel text-left">Work on<br />Rest Day</div>
                  </div>
                  <input type="text" v-model="selected.restDay" v-validate="'required|numeric|max_value:2147483647'" name="selected.restDay" data-vv-as="rest day" data-vv-scope="edit" id="txtEditRestDay" class="form-control customText"  placeholder="enter amount" :disabled="!selected.status">
                  <div class="input-group-prepend">
                    <div class="input-group-text customLabelPercent">&nbsp;&nbsp;&nbsp;&nbsp;%</div>
                  </div>
                </div>
              </div>
              <div class="row ml-3 pt-2 text-danger">
                <span>{{ errors.first('selected.restDay') }}</span>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" v-show="!isEditing" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" v-show="!isEditing" class="btn btn-warning text-white" @click="showEdit">Edit Info</button>
            <button type="button" v-show="isEditing" class="btn btn-danger" @click="showEdit" tabindex="-1">Cancel</button>
            <button type="button" v-show="isEditing" class="btn btn-success text-white" @click="saveEdit(selected.id)">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sidebar from '@/components/web/Sidebar.vue'
import axios from 'axios'
import emberLoader from '@/components/emberLoader.vue'
export default {
  components: {
    sidebar,
    emberLoader,
    axios
  },
  name: 'Rate',
  data: function () {
    return {
      paymentList: true,
      branch: [],
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
      tableErrorMsg: '',
      hasTableError: false,
      searchBranchName: '',
      searchStatus: true,
      isSearching: false,
      create: {
        branchName: '',
        rate: '',
        allowance: '',
        overTime: '',
        regularHoliday: '',
        specialHoliday: '',
        restDay: ''
      },
      doLoad: false,
      creationError: false,
      creationOK: false,
      searchingFor: '',
      selected: {
        id: '',
        branchName: '',
        rate: '',
        allowance: '',
        overTime: '',
        regularHoliday: '',
        specialHoliday: '',
        restDay: '',
        teamLead: '',
        status: '',
        teamLeadID: '',
        username: ''
      },
      isEditing: false,
      editingHasError: false,
      disableEditFields: false,
      focusedItem: -1,
      suggestionCount: 0
    }
  },
  created: function () {
    this.showTable()
    // $('#tlSuggest').click(function(event) {
    //   //var text = $(event.target).text();
    //   alert('asd')
    // })
  },
  methods: {
    showTable () {
      this.doLoad = true
      let self = this
      axios.get('api/branch').then(response => {
        if(response.data.status === 'success'){
          self.isSearching = false
          self.branch = response.data.data.data
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
    newPayment () {
      this.$router.push('/payment/new')
    },
    movePage (url) {
      if(url !== null){
        this.doLoad = true
        url = url.replace('http://server.solarace.com.ph/', '')
        let self = this
        axios.get(url).then(response => {
          self.isSearching = false
          self.branch = response.data.data.data
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
    searchMovePage (url) {
      if(url !== null){
        this.doLoad = true
        url = url.replace('http://server.solarace.com.ph/', '')
        let self = this
        let data = {
          branch_name: this.searchBranchName,
          is_active: this.searchStatus
        }
        axios.post(url, data).then(response => {
          self.isSearching = true
          self.branch = response.data.data.data
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
    searchBranch () {
      this.doLoad = true
      if($('.cbBranchStatus').prop('checked')) {
        this.searchStatus = true
      } else {
        this.searchStatus = false
      }
      let data = {
        branch_name: this.searchBranchName,
        is_active: this.searchStatus
      }
      let self = this
      axios.post('api/branch/search', data).then(response => {
        if(response.data.status === 'success'){
          self.isSearching = true
          self.branch = response.data.data.data
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
          self.branch = []
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
        if (this.searchBranchName.length > limitCharLength) {
          limitCharLength = limitCharLength - 3
          this.searchBranchName = this.searchBranchName.substring(0, limitCharLength) + '...'
        }
        self.searchingFor = this.searchBranchName
      }).catch(error => {
        console.log(error)
        self.doLoad = false
      })
    },
    decideMovePage (url) {
      if(this.isSearching) {
        this.searchMovePage(url)
      } else {
        this.movePage(url)
      }
    },
    clearFields () {
      this.create.branchName = ''
      this.create.rate = ''
      this.create.allowance = ''
      this.create.overTime = ''
      this.create.regularHoliday = ''
      this.create.specialHoliday = ''
      this.create.restDay = ''
      this.create.teamLead = ''
      this.$validator.reset()
    },
    createBranch () {
      let self = this
      this.$validator.validateAll('add').then(result => {
        
        if (result) {
          this.doLoad = true
          let data = {
            branch_name: self.create.branchName,
            rate: self.create.rate,
            ot_rates: self.create.overTime,
            regular_holidays: self.create.regularHoliday,
            special_holidays: self.create.specialHoliday,
            rest_days: self.create.restDay
          }
          // eslint-disable-next-line
          axios.post('api/branch/new', data).then(response => {
            $('html, body').animate({ scrollTop: 0 }, 'slow')
            self.showTable()
            self.creationError = false
            self.creationOK = true
            self.clearFields()
            self.doLoad = false
            setTimeout(function(){ self.creationOK = false }, 7000)
          // eslint-disable-next-line
          }).catch(error => {
            $('html, body').animate({ scrollTop: 0 }, 'slow')
            self.creationOK = false
            self.creationError = true
            self.doLoad = false
          })
        }
      })
    },
    showAllBranch () {
      this.showTable()
      this.searchingFor = ''
      this.hasTableError = false
      this.searchBranchName = ''
    },
    showBranchInfo (id) {
      this.doLoad = true
      let self = this
      this.isEditing = false
      axios.get('api/branch/' + id).then(response => {
        self.selected.id = response.data.id
        self.selected.branchName = response.data.branch_name
        self.selected.rate = response.data.rate
        self.selected.allowance = response.data.allowance
        self.selected.overTime = response.data.ot_rates
        self.selected.regularHoliday = response.data.regular_holidays
        self.selected.specialHoliday = response.data.special_holidays
        self.selected.restDay = response.data.rest_days
        self.selected.username = response.data.username
        if(response.data.first_name !== null && response.data.last_name !== null) {
          self.selected.teamLead = response.data.first_name + ' ' + response.data.last_name
        } else {
          self.selected.teamLead = ''
        }
        if(response.data.agent_id !== null){
          self.selected.teamLeadID = response.data.agent_id
        } else {
          self.selected.teamLeadID = ''
        }
        if(response.data.is_active === '1') {
          self.selected.status = true
        } else {
          self.selected.status = false
        }
        let data = {
          id: self.selected.teamLead
        }
        self.doLoad = false
      }).catch(error => {
        console.log(error)
      })
      $('#mdlBranchInfo').modal('show')
    },
    showEdit () {
      if(this.isEditing) {
        this.isEditing = false
        this.editingHasError = false
      } else {
        this.isEditing = true
        this.editingHasError = false
      }
    },
    saveEdit (branchId) {
      let self = this
      this.$validator.validateAll('edit').then((result) => {
        if (result) {
          this.doLoad = true
          let newStatus = ''
          if(self.selected.status) {
            newStatus = 1
          } else {
            newStatus = 0
          }
          let data = {
            id: branchId,
            branch_name: self.selected.branchName,
            rate: self.selected.rate,
            allowance: self.selected.allowance,
            ot_rates: self.selected.overTime,
            regular_holidays: self.selected.regularHoliday,
            special_holidays: self.selected.specialHoliday,
            rest_days: self.selected.restDay,
            team_lead: self.selected.teamLeadID,
            is_active: newStatus
          }
          axios.post('api/branch/update', data).then(response => {
            if(response.data.status === 'success') {
              self.showBranchInfo(branchId)
              self.showEdit()
              self.showTable()
              self.isEditing = false
              self.editingHasError = false
              self.doLoad = false
            } else {
              self.editingHasError = true
              self.doLoad = false
            }
          }).catch(error => {
            console.log(error)
            this.doLoad = false
          })
        }
      });
    },
    suggestClose () {
      $('#livesearch').empty()
      $('#editLivesearch').empty()
      this.focusedItem = -1,
      this.suggestionCount = 0
    },
    editTlSelected (e) {
      this.selected.teamLead = e.target.textContent
      let id = e.target.id
      this.selected.teamLeadID  = $('#' + id).attr('name').substring(6)
      this.suggestClose()
    },
    tlChosenEdit (event) {
      if(event.keyCode === 38){
        if(this.focusedItem  === -1 || this.focusedItem  === 0) {
          this.focusedItem = this.suggestionCount - 1
          $('.allTlItem').removeClass('addOnKeyPress')
          $('#tlEdit' + this.focusedItem).addClass('addOnKeyPress')
        } else {
          this.focusedItem--
          $('.allTlItem').removeClass('addOnKeyPress')
          $('#tlEdit' + this.focusedItem).addClass('addOnKeyPress')
        }
      }else if(event.keyCode === 40){
        if(this.focusedItem === -1 || this.focusedItem === (this.suggestionCount - 1)) {
          this.focusedItem = 0
          $('.allTlItem').removeClass('addOnKeyPress')
          $('#tlEdit' + this.focusedItem).addClass('addOnKeyPress')
        } else {
          this.focusedItem++
          $('.allTlItem').removeClass('addOnKeyPress')
          $('#tlEdit' + this.focusedItem).addClass('addOnKeyPress')
        }
      }else if(event.keyCode === 13){
        this.selected.teamLead = $('.addOnKeyPress').text()
        this.selected.teamLeadID = $('.addOnKeyPress').attr('name').substring(6)
        this.suggestClose()
      }else if(event.keyCode === 9){

      }else if(event.keyCode === 8){
        this.selected.teamLead = ''
        this.selected.teamLeadID = ''
      }else{
        this.selected.teamLeadID = this.selected.teamLead
        if(event.target.value.length > 1) {
          this.suggestClose
          let data = {
            name: event.target.value,
            id: this.selected.id
          }
          axios.post('api/agent/nameBranch', data).then(response => {
            $('#editLivesearch').empty()
            this.suggestionCount = response.data.data.length
            let w = $('#txtEditTeamLead').outerWidth()
            for (var i = 0; i < response.data.data.length; i++) {
              $("#editLivesearch").append('<div class="autocomplete-items allTlItem" id="tlEdit'+ i +'" name="tlEdit'+ response.data.data[i].id +'" style="width:' + w + 'px">' + response.data.data[i].agent_name + '</div>')
            }
          }).catch(error => {
            console.log(error)
            this.doLoad = false
          })
        } else {
          $('#livesearch').empty()
        }
      }
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
      padding-bottom: 10px;
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
      height: inherit;
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
  .txtSearch {
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
  /* New Payment */
  .divPayPeriod {
    border: 1px solid #4EABFB;
    margin-top: 10px;
    border-radius: 5px;
    padding-top: 8px;
    background-color: #FBFBFB;
  }
  .txtPeriod {
    color: white;
    font-size: 14px;
    font-weight: 700;
    height: 40px;
    width: 100%;
  }
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
    .scrollable {
      height: 80%;
    }
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
    .scrollable {
      height: 100%;
    }
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
  /* Pagination */
  .cursorPoint {
    cursor: pointer;
  }
  .pageColor {
    color: #2699FB !important;
  }
  .pageDisabled {
    background-color: #E9ECEF !important;
    cursor: not-allowed !important;
    color: white !important;
  }
  .pageActive {
    background-color: #2699FB !important;
    color: white !important;
  }
  .showAllDiv {
    height: 24px;
  }
  .titleFontSize {
    font-size: 1.5rem;
    font-weight: 400;
  }
  .teamLeadFontSize {
    font-size: 1.25rem;
  }
  .cstmStyleSuggestion {
    position: relative;
    -ms-flex: 1 1 auto;
    -webkit-box-flex: 1;
    flex: 1 1 auto;
    width: 1%;
    margin-bottom: 0;
  }
  .cstmHgth {
    height: 50px !important;
  }
  .customLabelPercent {
    font-size: 12px;
    color: white;
    width: 55px;
    padding: 5px;
    text-align: center;
  }
</style>
