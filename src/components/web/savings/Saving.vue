<template>
  <div class="" @click="suggestClose">
    <!--Confirmation Page-->
    <transition name="fadeMain">
      <div v-show="confirmationPage" class="allInput style-1">
        <Confirmation @confirm="confirm" @cancel="cancel"></Confirmation>
      </div> 
    </transition>
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
          <transition name="fadeMain">
            <span v-if="paymentList">Savings / CA</span>
          </transition>
          <transition name="fadeMain">
            <span v-if="!paymentList">Payment Detail</span>
          </transition>
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
                <input class="form-control form-control-lg txtSearch" type="text" v-model="searchAgentName" placeholder="enter user last name"  @keyup.enter="searchAgent">
              </div>
              <div class="row searchRow mt-3 mb-1 text-right pr-0">
                <div class="float-right w-50" >
                  <div class="lblSearch agentStatusLabel inlineDisplay pt-1 pr-3">Active</div>
                  <label class="switch inlineDisplay">
                    <input type="checkbox" class="cbAgentStatus" checked>
                    <span class="slider round"></span>
                  </label>
                </div>
                <div class="float-right w-50" >
                  <div class="lblSearch agentStatusLabel inlineDisplay pt-1 pr-3">Full Savings</div>
                  <label class="switch inlineDisplay">
                    <input type="checkbox" class="cbSavingStatus">
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
              <div class="row buttonRow">
                <button class="btnSearch btn " @click="searchAgent" :disabled="searchAgentName === ''">SEARCH</button>
              </div>
              <div class="row buttonRow mt-2">
                <button class="btnSearch btn " @click="showNew">NEW TRANSACTION</button>
              </div>
              <!-- End Search -->
              
              <!-- End New Payment -->
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
                    <div class="listItem col-md-12 d-flex" @click="showAgentInfo(agent.id, agent.first_name, agent.last_name, agent.branch_name)">
                      <span class="listIcon col-1 text-primary" v-show="agent.is_active === '1'" title="Active Agent"><i class="material-icons iconAlign2">person</i></span>
                      <span class="listIcon col-1 text-danger" v-show="agent.is_active === '0'" title="Inactive Agent"><i class="material-icons iconAlign2">person</i></span>
                      <span class="col-8 col-lg-6">
                        <span class="listTitle ">{{ agent.first_name }} {{ agent.last_name }}</span>
                        <span class="listDescription hideLg mt-1" v-show="agent.branch_name !== ''"><span class="hiddenNextLine"><br /></span>{{ agent.branch_name }}</span>
                        <span class="listDescription hideLg mt-1" v-show="agent.branch_name === null"><span class="hiddenNextLine"><br /></span>Team Leader</span>
                      </span>
                      <span class="col-0 col-lg-4 hiddenOnSmallDesc">
                        <span class="" v-show="agent.branch_name !== ''">{{ agent.branch_name }}</span>
                        <span class="" v-show="agent.branch_name === null">Team Leader</span>
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
    <div class="modal fade" id="mdlCA" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title small" id="exampleModalLabel">Saving / CA Information</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body pb-4">
            <h4>{{ selected.agentName }}</h4>
            <h5 class="mb-3">{{ selected.branchName }}</h5>
            <div class="row mb-4">
              <div class="col-12 mb-4">
                <p class="mb-0 text-center">
                  <span class="display-4">{{ '₱' + ((Number(selected.totalSavings).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</span>
                  <br />Total Savings
                </p>
              </div>
              <div class="col-6 border-right mb-4">
                <h4 class="mb-0 text-center ">{{ '₱' + ((Number(selected.caBalance).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</h4>
                <p class="mb-0 text-center">C.A. Balance</p>
              </div>
              <div class="col-6 mb-4">
                <h4 class="mb-0 text-center">{{ '₱' + ((Number(selected.deductionRate).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}
                </h4>
                <p class="mb-0 text-center">C.A. Deduction</p>
              </div>
              <div class="col-6 border-right mb-4">
                <h4 class="mb-0 text-center">{{ '₱' + ((Number(selected.loan_sss).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</h4>
                <p class="mb-0 text-center">SSS Loan</p>
              </div>
              <div class="col-6 mb-4">
                <h4 class="mb-0 text-center">{{ '₱' + ((Number(selected.loan_sss_deduction).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</h4>
                <p class="mb-0 text-center">SSS Deduction</p>
              </div>
              <div class="col-6 border-right mb-4">
                <h4 class="mb-0 text-center">{{ '₱' + ((Number(selected.loan_pag_ibig).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</h4>
                <p class="mb-0 text-center">Pag-ibig Loan</p>
              </div>
              <div class="col-6 mb-4">
                <h4 class="mb-0 text-center">{{ '₱' + ((Number(selected.loan_pi_deduction).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</h4>
                <p class="mb-0 text-center">Pag-ibig Deduction</p>
              </div>
            </div>
            <div id="accordion">
              <div class="card">
                <div class="card-header" id="headingOne">
                  <h5 class="mb-0">
                    <button class="btn btn-link" @click="showCA" aria-expanded="false" aria-controls="collapseOne">
                      {{ showCALabel }}
                    </button>
                  </h5>
                </div>
                <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                  <div class="card-body">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Amount</th>
                          <th scope="col">Date</th>
                          <th scope="col"><small><b>SSS Loan</b></small></th>
                          <th scope="col"><small><b>Pag-ibig Loan</b></small></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="ca in cashAdvances">
                          <td>{{ '₱' + ((Number(ca.cash_advance).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</td>
                          <td>{{ ca.created_at.substring(0,10) }}</td>
                          <td>{{ '₱' + ((Number(ca.sss_loan).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</td>
                          <td>{{ '₱' + ((Number(ca.pag_ibig_loan).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="row" v-show="showStatus">
                      <span @click="showAllCa" id="caShowAll" class="text-primary ml-auto pr-3">SHOW ALL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="mdlNew" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title small" id="exampleModalLabel">Account Information</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body pb-4">
            <!-- Start New Payment -->

            <transition name="fade">
              <div class="bg-success text-white text-center" v-show="creationOK">
                <p class="pt-2 pb-2"><i class="material-icons iconAlign2">check</i> Branch successfully created</p>
              </div>
            </transition>
            <div class="eachInput">
              <div class="input-group txtLabels">
                <div class="input-group-prepend">
                  <div class="input-group-text customLabel text-left">Name</div>
                </div>
                <input type="text" data-vv-as="agent" data-vv-scope="savings" class="form-control customText" name="savings.agent" @keyup="tlChosen"  placeholder="search using last name" v-model="savings.agent" autocomplete="off">
                <input type="hidden" v-model="savings.agentID" v-validate="'numeric'" name="savings.agentID" data-vv-scope="savings" ><br>
                <div id="livesearch" class="col-12 p-0" @click="tlSelected"></div>
              </div>
            </div>
            <div class="row ml-3 pt-2 text-danger" v-show="errors.first('savings.agentID')">
              <span>Choose team lead from the suggestion list</span>
            </div>
            <div class="eachInput">
              <div class="input-group txtLabels">
                <div class="input-group-prepend">
                  <div class="input-group-text customLabel text-left">Total <br />Savings</div>
                </div>
                <input type="text" class="form-control customText"  v-model="savings.totalSavings" v-validate="'required|numeric'" data-vv-as="total savings" data-vv-scope="savings" name="savings.totalSavings" placeholder="enter amount" disabled>
              </div>
            </div>
            <div class="row ml-3 pt-2 text-danger">
              <span>{{ errors.first('savings.totalSavings') }}</span>
            </div>
            <div class="eachInput">
              <div class="input-group txtLabels">
                <div class="input-group-prepend">
                  <div class="input-group-text customLabel text-left">C.A. <br />Balance</div>
                </div>
                <input type="text" class="form-control customText" v-model="savings.caBalance" v-validate="'required|numeric'" data-vv-as="C.A. balance" data-vv-scope="savings" name="savings.caBalance" placeholder="enter amount" disabled>
              </div>
            </div>
            <div class="row ml-3 pt-2 text-danger">
              <span>{{ errors.first('savings.caBalance') }}</span>
            </div>
            <div class="eachInput">
              <div class="input-group txtLabels">
                <div class="input-group-prepend">
                  <div class="input-group-text customLabel text-left">New <br />C.A.</div>
                </div>
                <input type="text" class="form-control customText" v-model="savings.newCA" v-validate="'required|numeric'" data-vv-as="new C.A." ref="rfNewCa" data-vv-scope="savings" name="savings.newCA" placeholder="enter amount" value="0" :disabled="savings.totalSavings === ''">
              </div>
            </div>
            <div class="row ml-3 pt-2 text-danger">
              <span>{{ errors.first('savings.newCA') }}</span>
            </div>
            <div class="eachInput">
              <div class="input-group txtLabels">
                <div class="input-group-prepend">
                  <div class="input-group-text customLabel text-left">C.A. <br />Deduction</div>
                </div>
                <input type="text" class="form-control customText" v-model="savings.deductionRate" v-validate="'required|numeric'" data-vv-as="deduction rate" data-vv-scope="savings" name="savings.deductionRate" placeholder="enter amount" :disabled="savings.totalSavings === ''">
              </div>
            </div>
            <div class="row ml-3 pt-2 text-danger">
              <span>{{ errors.first('savings.deductionRate') }}</span>
            </div>
            <div class="eachInput">
              <div class="input-group txtLabels">
                <div class="input-group-prepend">
                  <div class="input-group-text customLabel text-left">SSS <br />Loan</div>
                </div>
                <input type="text" class="form-control customText" v-model="savings.sssLoan" v-validate="'required|numeric'" data-vv-as="sss loan" data-vv-scope="savings" name="savings.sssLoan" placeholder="enter amount" disabled>
              </div>
            </div>
            <div class="row ml-3 pt-2 text-danger">
              <span>{{ errors.first('savings.sssLoan') }}</span>
            </div>
            <div class="eachInput">
              <div class="input-group txtLabels">
                <div class="input-group-prepend">
                  <div class="input-group-text customLabel text-left">New SSS<br />Loan</div>
                </div>
                <input type="text" class="form-control customText" v-model="savings.sssLoanNew" v-validate="'required|numeric'" data-vv-as="new sss loan" ref="rfNewCa" data-vv-scope="savings" name="savings.sssLoanNew" placeholder="enter amount"  value="0" :disabled="savings.totalSavings === ''">
              </div>
            </div>
            <div class="row ml-3 pt-2 text-danger">
              <span>{{ errors.first('savings.sssLoanNew') }}</span>
            </div>
            <div class="eachInput">
              <div class="input-group txtLabels">
                <div class="input-group-prepend">
                  <div class="input-group-text customLabel text-left">SSS Loan <br />Deduction</div>
                </div>
                <input type="text" class="form-control customText" v-model="savings.sssLoanDeduction" v-validate="'required|numeric'" data-vv-as="sss loan deduction" data-vv-scope="savings" name="savings.sssLoanDeduction" placeholder="enter amount" :disabled="savings.totalSavings === ''">
              </div>
            </div>
            <div class="row ml-3 pt-2 text-danger">
              <span>{{ errors.first('savings.sssLoanDeduction') }}</span>
            </div>
            <div class="eachInput">
              <div class="input-group txtLabels">
                <div class="input-group-prepend">
                  <div class="input-group-text customLabel text-left">Pag-ibig<br />Loan</div>
                </div>
                <input type="text" class="form-control customText" v-model="savings.piLoan" v-validate="'required|numeric'" data-vv-as="pag-ibig loan" data-vv-scope="savings" name="savings.piLoan" placeholder="enter amount" disabled>
              </div>
            </div>
            <div class="row ml-3 pt-2 text-danger">
              <span>{{ errors.first('savings.piLoan') }}</span>
            </div>
            <div class="eachInput">
              <div class="input-group txtLabels">
                <div class="input-group-prepend">
                  <div class="input-group-text customLabel text-left">New Pag<br />Ibig Loan</div>
                </div>
                <input type="text" class="form-control customText" v-model="savings.piLoanNew" v-validate="'required|numeric'" data-vv-as="new pag-ibig loan" ref="rfNewCa" data-vv-scope="savings" name="savings.piLoanNew" placeholder="enter amount"  value="0" :disabled="savings.totalSavings === ''">
              </div>
            </div>
            <div class="row ml-3 pt-2 text-danger">
              <span>{{ errors.first('savings.piLoanNew') }}</span>
            </div>
            <div class="eachInput">
              <div class="input-group txtLabels">
                <div class="input-group-prepend">
                  <div class="input-group-text customLabel text-left"><small>Pag-ibig <br />Loan Deduction</small></div>
                </div>
                <input type="text" class="form-control customText" v-model="savings.piLoanDeduction" v-validate="'required|numeric'" data-vv-as="pag-ibig loan deduction" data-vv-scope="savings" name="savings.piLoanDeduction" placeholder="enter amount" :disabled="savings.totalSavings === ''">
              </div>
            </div>
            <div class="row ml-3 pt-2 text-danger">
              <span>{{ errors.first('savings.piLoanDeduction') }}</span>
            </div>
            <div class="eachInput mb-3">
              <button class="btnSearch btn " @click="createCA"><i class="large material-icons">arrow_forward</i></button>
            </div>
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
import Confirmation from '@/components/Confirmation.vue'
export default {
  components: {
    sidebar,
    emberLoader,
    Confirmation,
  },
  name: 'Saving',
  data: function () {
    return {
      confirmationPage: false,
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
      doLoad: false,
      savings: {
        caBalance: '',
        totalSavings: '',
        deductionRate: '',
        newCA: '0',
        agentID: '',
        agent: '',
        sssLoan: '',
        sssLoanDeduction: '',
        sssLoanNew: '0',
        piLoan: '',
        piLoanDeduction: '',
        piLoanNew: '0'
      },
      focusedItem: -1,
      suggestionCount: 0,
      creationOK: false,
      selected: {
        id: '',
        agentName: '',
        branchName: '',
        totalSavings: '',
        caBalance: '',
        deductionRate: '',
        loan_pag_ibig: '',
        loan_pi_deduction: '',
        loan_sss: '',
        loan_sss_deduction: ''
      },
      cashAdvances: [],
      showStatus: false,
      showCALabel: 'SHOW CASH ADVANCE RECORD'
    }
  },
  created: function () {
    this.showTable()
  },
  methods: {
    showNew () {
      $('#mdlNew').modal('show')
    },
    showTable () {
      this.doLoad = true
      let self = this
      axios.get('api/savings/all').then(response => {
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
        url = url.replace('http://server.solarace.com.ph/server/', '')
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
      let url = 'api/savings/search'
      if($('.cbSavingStatus').prop('checked')) {
        url = 'api/savings/search/savings'
      }
      let self = this
      axios.post(url, data).then(response => {
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
        url = url.replace('http://server.solarace.com.ph/server/', '')
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
    createCA () {
      let self = this
      this.$validator.validateAll('savings').then(result => {   
        if (result) {
          this.doLoad = true
          self.confirmationPage = true
          setTimeout(function(){ self.doLoad = false }, 1000)
        }
      });
    },
    fieldRefresh () {
      this.savings.caBalance = ''
      this.savings.totalSavings = ''
      this.savings.deductionRate = ''
      this.savings.newCA = '0'
      this.savings.agentID = ''
      this.savings.agent = ''
      this.savings.sssLoan = ''
      this.savings.sssLoanDeduction = ''
      this.savings.sssLoanNew = '0'
      this.savings.piLoan = ''
      this.savings.piLoanDeduction = ''
      this.savings.piLoanNew = '0'
      this.$validator.reset()
    },
    tlChosen (e) {
      if(event.keyCode === 38){
        if(this.focusedItem  === -1 || this.focusedItem  === 0) {
          this.focusedItem = this.suggestionCount - 1
          $('.allTlItem').removeClass('addOnKeyPress')
          $('#tlSgtn' + this.focusedItem).addClass('addOnKeyPress')
        } else {
          this.focusedItem--
          $('.allTlItem').removeClass('addOnKeyPress')
          $('#tlSgtn' + this.focusedItem).addClass('addOnKeyPress')
        }
      }else if(event.keyCode === 40){
        if(this.focusedItem === -1 || this.focusedItem === (this.suggestionCount - 1)) {
          this.focusedItem = 0
          $('.allTlItem').removeClass('addOnKeyPress')
          $('#tlSgtn' + this.focusedItem).addClass('addOnKeyPress')
        } else {
          this.focusedItem++
          $('.allTlItem').removeClass('addOnKeyPress')
          $('#tlSgtn' + this.focusedItem).addClass('addOnKeyPress')
        }
      }else if(event.keyCode === 13){
        this.savings.agent = $('.addOnKeyPress').text()
        this.savings.agentID = $('.addOnKeyPress').attr('name').substring(6)
        this.suggestClose()
        this.doLoad = true
        let self = this
        axios.get('api/savings/' + self.savings.agentID).then(response => {
          self.savings.caBalance = response.data.ca_balance
          self.savings.totalSavings = response.data.total_savings
          self.savings.deductionRate = response.data.deduction_rate
          self.savings.sssLoan = response.data.loan_sss
          self.savings.sssLoanDeduction = response.data.loan_sss_deduction
          self.savings.piLoan = response.data.loan_pag_ibig
          self.savings.piLoanDeduction = response.data.loan_pi_deduction
          self.$refs.rfNewCa.focus()
          this.doLoad = false
        })
      }else if(event.keyCode === 9){
      }else if(event.keyCode === 8){
        this.savings.agent = ''
        this.savings.agentID = ''
        this.savings.caBalance = ''
        this.savings.totalSavings = ''
        this.savings.deductionRate = ''
        this.$validator.reset()
      }else{
        this.savings.agentID = this.savings.agent
        if(e.target.value.length > 1) {
          this.suggestClose
          let data = {
            name: e.target.value
          }
          axios.post('api/agent/name', data).then(response => {
            $('#livesearch').empty()
            this.suggestionCount = response.data.data.length
            let w = $('#tlSuggest').outerWidth()
            for (var i = 0; i < response.data.data.length; i++) {
              $("#livesearch").append('<div class="autocomplete-items allTlItem" id="tlSgtn'+ i +'" name="tlSgtn'+ response.data.data[i].id +'" style="width:' + w + 'px">' + response.data.data[i].agent_name + '</div>')
            }
          }).catch(error => {
            console.log(error)
            this.doLoad = false
          })
        } else {
          $('#livesearch').empty()
        }
      }
    },
    suggestClose () {
      $('#livesearch').empty()
      $('#editLivesearch').empty()
      this.focusedItem = -1,
      this.suggestionCount = 0
    },
    tlSelected (e) {
      this.savings.agent = e.target.textContent
      let id = e.target.id
      this.savings.agentID  = $('#' + id).attr('name').substring(6)
      this.suggestClose()
      this.doLoad = true
      let self = this
      axios.get('api/savings/' + self.savings.agentID).then(response => {
        self.savings.caBalance = response.data.ca_balance
        self.savings.totalSavings = response.data.total_savings
        self.savings.deductionRate = response.data.deduction_rate
        self.savings.sssLoan = response.data.loan_sss
        self.savings.sssLoanDeduction = response.data.loan_sss_deduction
        self.savings.piLoan = response.data.loan_pag_ibig
        self.savings.piLoanDeduction = response.data.loan_pi_deduction
        self.$refs.rfNewCa.focus()
        self.doLoad = false
      })
    },
    showAgentInfo (id, fname, lname, branch) {
      $('.collapse').collapse('hide')
      this.showCALabel = 'SHOW CASH ADVANCE RECORD'
      $('#mdlCA').modal('show')
      let self = this
      axios.get('api/savings/' + id).then(response => {
        self.selected.id = id
        self.selected.agentName = fname + ' ' + lname
        self.selected.branchName = branch
        self.selected.caBalance = response.data.ca_balance
        self.selected.deductionRate = response.data.deduction_rate
        self.selected.totalSavings = response.data.total_savings
        self.selected.loan_sss = response.data.loan_sss
        self.selected.loan_sss_deduction = response.data.loan_sss_deduction
        self.selected.loan_pag_ibig = response.data.loan_pag_ibig
        self.selected.loan_pi_deduction = response.data.loan_pi_deduction
      }).catch(error => {
        console.log(error)
      })
    },
    showCA () {
      if(this.showCALabel === 'HIDE CASH ADVANCE RECORD') {
        this.showCALabel = 'SHOW CASH ADVANCE RECORD'
      } else {
        this.showCALabel = 'HIDE CASH ADVANCE RECORD'
        this.doLoad = true
        let self = this
        axios.get('api/savings/ca/' + self.selected.id).then(response => {
          self.cashAdvances = response.data.data
          if(response.data.last_page !== 1){
            self.showStatus = true
          }
          self.doLoad = false
        }).catch(error => {
          console.log(error)
        })
      }
      
      $('.collapse').collapse('toggle')
    },
    showAllCa () {
      this.doLoad = true
      let self = this
      axios.get('api/savings/ca/all/' + self.selected.id).then(response => {
        self.cashAdvances = response.data
        self.showStatus = false
        self.doLoad = false
      }).catch(error => {
        self.doLoad = false
        console.log(error)
      })
    },
    confirm () {
      this.doLoad = true
      let self = this
      let data = {
        agent_id: self.savings.agentID,
        deduction_rate: self.savings.deductionRate,
        cash_advance: self.savings.newCA,
        sss_deduction: self.savings.sssLoanDeduction,
        sss_loan_new: self.savings.sssLoanNew,
        pi_deduction: self.savings.piLoanDeduction,
        pi_loan_new: self.savings.piLoanNew,
      }
      axios.post('api/savings/new', data).then(response => {
        self.fieldRefresh()
        self.creationOK = true
        setTimeout(function(){ self.creationOK = false }, 7000)
        self.confirmationPage = false
        self.doLoad = false
      }).catch(error => {
        console.log(error)
        self.doLoad = false
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
  .pageColor {
    color: #2699FB !important;
  }
  .pageDisabled {
    background-color: #E9ECEF !important;
    cursor: not-allowed !important;
    color: white !important;
  }
  #caShowAll {
    cursor: pointer
  }
  #caShowAll:hover {
    text-decoration: underline;
  }
</style>
