<template>
  <div class="mainDiv">
    <transition name="fade">
      <div id="emberloader" v-show="doLoad">
        <emberLoader></emberLoader>
      </div>
    </transition>
    <transition name="fadeMain">
      <div v-if="notUser">
        <sidebar v-if="admin"></sidebar>
        <sidebar2 v-if="!admin"></sidebar2>
        <!-- Content -->
        <transition name="fadeMain">
        <div id="myContent">
        </div>
        </transition>
      </div>
      <div v-if="!notUser">
        <sidebar3></sidebar3>
        <!-- Content -->
        <transition name="fadeMain">
        <div id="myContent">
        </div>
        </transition>
      </div>
    </transition>
    <div class="myContent">
      <div class="row d-flex m-0">
        <div class="col-12 col-md-6 col-lg-3 p-2">
          <div class="card border-0 m-2">
            <div class="card-body pb-0">
              <div class="row">
                <div class="col-5">
                  <i class="material-icons biggerFont">done_all</i>
                </div>
                <div  class="col-7">
                  <p class="float-right m-0">Completed Payment</p>
                  <br />
                  <h1 class="p-0 m-0 float-right">{{ stats.completed_payments }}/{{ stats.total_payments }}</h1>
                </div>
                <div  class="col-12 mt-1 border-top p-1 pl-2">
                  <i class="material-icons text-secondary iconAlign2">date_range</i>
                  <small class="text-secondary ml-1">{{ now }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3 p-2">
          <div class="card border-0 m-2">
            <div class="card-body pb-0">
              <div class="row">
                <div class="col-5">
                  <i class="material-icons biggerFont">people</i>
                </div>
                <div  class="col-7">
                  <p class="float-right m-0">Brand Specialist</p>
                  <br />
                  <h1 class="p-0 m-0 float-right">{{ stats.total_agents }}</h1>
                </div>
                <div  class="col-12 mt-1 border-top p-1 pl-2">
                  <i class="material-icons text-secondary iconAlign2">date_range</i>
                  <small class="text-secondary ml-1">{{ now }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ccol-12 col-md-6 col-lg-3 p-2">
          <div class="card border-0 m-2">
            <div class="card-body pb-0">
              <div class="row">
                <div class="col-5">
                  <i class="material-icons biggerFont">star</i>
                </div>
                <div  class="col-7">
                  <p class="float-right m-0">Team Leader</p>
                  <br />
                  <h1 class="p-0 m-0 float-right">{{ stats.total_tl }}</h1>
                </div>
                <div  class="col-12 mt-1 border-top p-1 pl-2">
                  <i class="material-icons text-secondary iconAlign2">date_range</i>
                  <small class="text-secondary ml-1">{{ now }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3 p-2">
          <div class="card border-0 m-2">
            <div class="card-body pb-0">
              <div class="row">
                <div class="col-5">
                  <i class="material-icons biggerFont">store</i>
                </div>
                <div  class="col-7">
                  <p class="float-right m-0">Store</p>
                  <br />
                  <h1 class="p-0 m-0 float-right">{{ stats.total_branch }}</h1>
                </div>
                <div  class="col-12 mt-1 border-top p-1 pl-2">
                  <i class="material-icons text-secondary iconAlign2">date_range</i>
                  <small class="text-secondary ml-1">{{ now }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="jumbotron bg-white m-3">
        <h1 class="display-4">Hello, {{ username }}!</h1>
        <p class="lead">Welcome to your online payroll app.</p>
        <hr class="my-4" v-if="admin">
        <p class="lead" v-if="admin">
          <a class="btn btn-primary btn-lg" href="#" role="button" @click="payment">Process Payments</a>
        </p>
      </div>
      <div class="row d-flex m-0" v-if="admin">
        <div class="col-12 pl-4 pr-4" v-show="show1stTable">
          <div class="dropdown float-right">
            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              PRINT TABLE
            </button>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#" v-show="showPagination1" @click="print">Print Current Page</a>
              <a class="dropdown-item" href="#" v-show="showPagination1" @click="showAllData">Show All</a>
              <a class="dropdown-item" href="#" v-show="!showPagination1" @click="print">Print Table</a>
              <a class="dropdown-item" href="#" v-show="!showPagination1" @click="showTen">Enable Pagination</a>
            </div>
          </div>
        </div>
        <div class="col-12 pl-4 pr-4" v-show="show2ndTable">
          <div class="dropdown float-right">
            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              PRINT TABLE
            </button>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#" v-show="showPagination2" @click="print">Print Current Page</a>
              <a class="dropdown-item" href="#" v-show="showPagination2" @click="showAllData">Show All</a>
              <a class="dropdown-item" href="#" v-show="!showPagination2" @click="print">Print Table</a>
              <a class="dropdown-item" href="#" v-show="!showPagination2" @click="showTen">Enable Pagination</a>
            </div>
          </div>
        </div>
        <div class="col-12 pl-4 pr-4"  v-show="show3rdTable">
          <div class="dropdown float-right">
            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              PRINT TABLE
            </button>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#" v-show="showPagination3" @click="print">Print Current Page</a>
              <a class="dropdown-item" href="#" v-show="showPagination3" @click="showAllData">Show All</a>
              <a class="dropdown-item" href="#" v-show="!showPagination3" @click="print">Print Table</a>
              <a class="dropdown-item" href="#" v-show="!showPagination3" @click="showTen">Enable Pagination</a>
            </div>
          </div>
        </div>
        <div class="col-12 pl-4 pr-4" v-show="show4thTable">
          <div class="dropdown float-right">
            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              PRINT TABLE
            </button>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#" v-show="showPagination4" @click="print">Print Current Page</a>
              <a class="dropdown-item" href="#" v-show="showPagination4" @click="showAllData">Show All</a>
              <a class="dropdown-item" href="#" v-show="!showPagination4" @click="print">Print Table</a>
              <a class="dropdown-item" href="#" v-show="!showPagination4" @click="showTen">Enable Pagination</a>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="card border-0 m-2" v-show="show1stTable">
            <div class="card-body">
              <div class="row p-4">
                <div class="col-12 col-md-4 float-right mb-1 p-0">
                  <div class="row d-flex pl-3">
                    <div class="col-12 col-sm-8 p-0">
                      <datetime input-class="form-controlCustom cstmTextDate agentDob" class="dateStyle" placeholder="choose date" v-validate="'required'" name="seach using date" v-model="textForSearch"></datetime>
                    </div>
                    <div class="col-12 col-sm-4">
                      <button class="btnSearch btn" @click="search" :disabled="textForSearch === ''">SEARCH</button>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-8 pt-3">
                  <small v-show="isSearching" class="float-right">Searching for {{ permaSearchingForT1 }} (<u class="text-primary clickable" @click="stopSearching">SHOW ALL</u>)</small>
                </div>
                <div class="col-12 pt-2" v-show="hasTableError">
                  <small class="">No results found (<u class="text-primary clickable" @click="stopSearching">SHOW ALL</u>)</small>
                </div>
                <div class="table-responsive">
                  <table class="table table-hover mt-3 mb-1"  v-show="!(hasTableError)" id="table1">
                    <thead>
                      <tr>
                        <th scope="col">Payment Period</th>
                        <th scope="col">Paid Brand Specialist</th>
                        <th scope="col">Paid Team Leader</th>
                        <th scope="col">Status</th>
                        <th scope="col">Total Net Pay</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in table1Data" class="clickable" @click="paymentPeriodDetail(item.id, item.starting_date, item.end_date)">
                        <td scope="row">{{ item.starting_date }} to {{ item.end_date }}</td>
                        <td>{{ item.bsPaid }}</td>
                        <td>{{ item.tlPaid }}</td>
                        <td>{{ item.status }}</td>
                        <td>{{ '₱' + ((Number(item.total).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="row p-0 pb-3 mt-2" v-show="!(hasTableError) && showPagination1">
                <div class="col-12 col-sm-6 pl-4">
                  <span class="pageColor">{{ pagination.from}} to {{ pagination.to }} of {{ pagination.total}}</span>
                </div>
                <div class="col-12 col-sm-6 pr-4">
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
          <div class="card border-0 m-2" v-show="show2ndTable">
            <div class="card-body pb-0">
              <div class="col-12 col-md-4 float-right mb-1 p-0">
                <div class="row d-flex pl-3">
                  <div class="col-12 col-sm-8 p-0">
                    <input class="form-control form-control-lg txtSearch" v-model="txtSearchTl" type="text" placeholder="enter last name">
                  </div>
                  <div class="col-12 col-sm-4">
                    <button class="btnSearch btn" @click="searchTL" :disabled="txtSearchTl === ''">SEARCH</button>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-8 pt-3">
                <small v-show="isSearching2">Searching for {{ permaSearchingForT2 }} (<u class="text-primary clickable" @click="stopSearching2">SHOW ALL</u>)</small>
                <small v-show="!isSearching2"><span class="text-primary clickable" @click="showBackTable1()"> All </span> / <span class="text-primary clickable">{{ viewingStart }} to {{ viewingEnd }}</span></small>
              </div>
              <div class="table-responsive">
                <table class="table table-hover" id="table2">
                  <thead>
                    <tr>
                      <th scope="col">Team Leader</th>
                      <th scope="col">Store</th>
                      <th scope="col">Status</th>
                      <th scope="col">Paid Brand Specialist</th>
                      <th scope="col">Total Net Pay</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="tl in table2Data" @click="view3rdTable(tl.tl_id, tl.first_name, tl.last_name)" class="clickable">
                      <td>{{ tl.first_name }} {{ tl.last_name }}</td>
                      <td>{{ tl.storeCount }}</td>
                      <th>
                        <small  v-show="tl.isTLPaid === 1" class="text-success">PAID</small>
                        <small  v-show="tl.isTLPaid === 0" class="text-warning">UNPAID</small>
                      </th>
                      <td>{{ tl.bsPaid }}</td>
                      <td>{{ '₱' + ((Number(tl.total).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="row p-0 pb-3 mt-2" v-show="!(hasTableError) && showPagination2">
                <div class="col-12 col-sm-6 pl-4">
                  <span class="pageColor">{{ pagination2.from}} to {{ pagination2.to }} of {{ pagination2.total}}</span>
                </div>
                <div class="col-12 col-sm-6 pr-4">
                  <nav aria-label="Page navigation example">
                    <ul class="pagination float-right p-0 m-0">
                      <li class="page-item" @click="decideMovePage2(pagination2.prevPageUrl)">
                        <a class="page-link cursorPoint pageColor btnPrev" :class="{ pageDisabled: pagination2.isPrevDisabled }" aria-label="Previous">
                          <span aria-hidden="true">&lsaquo;</span>
                        </a>
                      </li>
                      <li class="page-item cursorPoint"><a class="page-link pageColor btnCurrent">{{ pagination2.currentPage }} / {{ pagination2.last_page }}</a></li>
                      <li class="page-item cursorPoint" @click="decideMovePage2(pagination2.nextPageUrl)">
                        <a class="page-link cursorPoint pageColor btnNext" :class="{ pageDisabled: pagination2.isNextDisabled }">
                          <span aria-hidden="true">&rsaquo;</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div class="card border-0 m-2" v-show="show3rdTable">
            <div class="card-body pb-0">
              <div class="col-12 col-md-4 float-right mb-1 p-0">
                <div class="row d-flex pl-3">
                  <div class="col-12 col-sm-8 p-0">
                    <input class="form-control form-control-lg txtSearch" v-model="txtSearchT3" type="text" placeholder="enter store name">
                  </div>
                  <div class="col-12 col-sm-4">
                    <button class="btnSearch btn" @click="searchStore" :disabled="txtSearchT3 === ''">SEARCH</button>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-8 pt-3">
                <small v-show="isSearching3">Searching for {{ permaSearchingForT3 }} (<u class="text-primary clickable" @click="stopSearching3">SHOW ALL</u>)</small>
                <small v-show="!isSearching3"><span class="text-primary clickable" @click="showBackTable1()"> All </span> / <span class="text-primary clickable" @click="showBackTable2()">{{ viewingStart }} to {{ viewingEnd }}</span> / <span class="text-primary clickable">{{ viewingTLName }}</span></small>
              </div>
              <div class="table-responsive">
                <table class="table table-hover" id="table3">
                  <thead>
                    <tr>
                      <th scope="col">Store</th>
                      <th scope="col">Paid Brand Specialist</th>
                      <th scope="col">Total Net Pay</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in table3Data" class="clickable" @click="view4thTable(item.id, item.branch_name)">
                      <td>{{ item.branch_name }}</td>
                      <td>{{ item.bsPaid }}</td>
                      <td>{{ '₱' + ((Number(item.total).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="row p-0 pb-3 mt-2" v-show="!(hasTableError) && showPagination3">
                <div class="col-12 col-sm-6 pl-4">
                  <span class="pageColor">{{ pagination3.from}} to {{ pagination3.to }} of {{ pagination3.total}}</span>
                </div>
                <div class="col-12 col-sm-6 pr-4">
                  <nav aria-label="Page navigation example">
                    <ul class="pagination float-right p-0 m-0">
                      <li class="page-item" @click="decideMovePage3(pagination3.prevPageUrl)">
                        <a class="page-link cursorPoint pageColor btnPrev" :class="{ pageDisabled: pagination3.isPrevDisabled }" aria-label="Previous">
                          <span aria-hidden="true">&lsaquo;</span>
                        </a>
                      </li>
                      <li class="page-item cursorPoint"><a class="page-link pageColor btnCurrent">{{ pagination3.currentPage }} / {{ pagination3.last_page }}</a></li>
                      <li class="page-item cursorPoint" @click="decideMovePage3(pagination3.nextPageUrl)">
                        <a class="page-link cursorPoint pageColor btnNext" :class="{ pageDisabled: pagination3.isNextDisabled }">
                          <span aria-hidden="true">&rsaquo;</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div class="card border-0 m-2" v-show="show4thTable">
            <div class="card-body pb-0">
              <div class="col-12 col-md-4 float-right mb-1 p-0">
                <div class="row d-flex pl-3">
                  <div class="col-12 col-sm-8 p-0">
                    <input class="form-control form-control-lg txtSearch" v-model="txtSearchT4" type="text" placeholder="enter last name">
                  </div>
                  <div class="col-12 col-sm-4">
                    <button class="btnSearch btn" @click="searchAgent" :disabled="txtSearchT4 === ''">SEARCH</button>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-8 pt-3">
                <small v-show="isSearching4">Searching for {{ permaSearchingForT4 }} (<u class="text-primary clickable" @click="stopSearching4">SHOW ALL</u>)</small>
                <small v-show="!isSearching4"><span class="text-primary clickable" @click="showBackTable1()"> All </span> / <span class="text-primary clickable" @click="showBackTable2()">{{ viewingStart }} to {{ viewingEnd }}</span> / <span class="text-primary clickable" @click="showBackTable3()">{{ viewingTLName }}</span> / <span class="text-primary clickable">{{ storeName }}</span></small>
              </div>
              <div class="table-responsive">
                <table class="table table-hover" id="table4">
                  <thead>
                    <tr>
                      <th scope="col">Brand Specialist</th>
                      <th scope="col">Title</th>
                      <th scope="col">Date Paid</th>
                      <th scope="col">Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in table4Data" class="clickable">
                      <td>{{ item.first_name }} {{ item.last_name }} <small v-if="item.isTL === 1" title="TEAM LEADER"><i class="material-icons iconAlign2 text-warning">star</i></small></td>
                      <td>{{ item.title }}</td>
                      <td>{{ item.created_at }}</td>
                      <td>{{ '₱' + ((Number(item.total_paid).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="row p-0 pb-3 mt-2" v-show="!(hasTableError) && showPagination4">
                <div class="col-12 col-sm-6 pl-4">
                  <span class="pageColor">{{ pagination4.from}} to {{ pagination4.to }} of {{ pagination4.total}}</span>
                </div>
                <div class="col-12 col-sm-6 pr-4">
                  <nav aria-label="Page navigation example">
                    <ul class="pagination float-right p-0 m-0">
                      <li class="page-item" @click="decideMovePage4(pagination4.prevPageUrl)">
                        <a class="page-link cursorPoint pageColor btnPrev" :class="{ pageDisabled: pagination4.isPrevDisabled }" aria-label="Previous">
                          <span aria-hidden="true">&lsaquo;</span>
                        </a>
                      </li>
                      <li class="page-item cursorPoint"><a class="page-link pageColor btnCurrent">{{ pagination4.currentPage }} / {{ pagination4.last_page }}</a></li>
                      <li class="page-item cursorPoint" @click="decideMovePage4(pagination4.nextPageUrl)">
                        <a class="page-link cursorPoint pageColor btnNext" :class="{ pageDisabled: pagination4.isNextDisabled }">
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
        <div id="print" class="w-100">
          <div class="row d-flex p-5">
            <div class="col-8">
              <h3>Solar Ace Premium Products Incorporated</h3>
            </div>
            <div class="col-4">
              <span class="float-right">{{ now }}</span>
            </div>
            <div class="col-6" v-show="viewingStart !== '' && viewingEnd !== ''">
              <p>Payment Period: {{ viewingStart }} to {{ viewingEnd }}</p>
            </div>
            <div class="col-6" v-show="viewingTLName !== ''">
              <p>Team Leader: {{ viewingTLName }}</p>
            </div>
            <div class="col-6" v-show="storeName !== ''">
              <p>Store: {{ storeName }}</p>
            </div>
            <div class="col-12">
              <p v-show="permaSearchingForT1 !== '' || permaSearchingForT2 !== '' || permaSearchingForT3 !== '' || permaSearchingForT4 !== ''">Search Result For: {{ permaSearchingForT1 }} {{ permaSearchingForT2 }} {{ permaSearchingForT3 }} {{ permaSearchingForT4 }}</p>
            </div>
            <div class="col-6" v-show="!showAll">
              <p class="pb-0 mb-0">Entry {{ pagination.from }} to {{ pagination.to }} of {{ pagination.from }}</p>
            </div>
            <div class="col-6" v-show="!showAll">
              <p class="float-right pb-0 mb-0">Page: {{ pagination.currentPage }} of {{ pagination.last_page }}</p>
            </div>
            <div class="col-12 mt-0 pt-0" id="tableDiv">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sidebar from '@/components/web/Sidebar.vue'
import sidebar2 from '@/components/web/Sidebar2.vue'
import sidebar3 from '@/components/web/Sidebar3.vue'
import axios from 'axios'
import emberLoader from '@/components/emberLoader.vue'
import { Datetime } from 'vue-datetime'
export default {
  components: {
    sidebar,
    sidebar2,
    sidebar3,
    emberLoader,
    Datetime,
  },
  name: 'WebDashboard',
  data: function () {
    return {
      isMob: false,
      admin: false,
      doLoad: true,
      agentId: '',
      branchId: '',
      notUser: true,
      stats: [],
      username: '',
      table1Data: [],
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
      pagination2: {
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
      pagination3: {
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
      textForSearch: '',
      isSearching: false,
      isSearching2: false,
      hasTableError: false,
      doLoad: false,
      show1stTable: true,
      show2ndTable: false,
      viewingStart: '',
      viewingEnd: '',
      show3rdTable: false,
      table2Data: [],
      ppId: '',
      viewingTLName: '',
      txtSearchTl: '',
      permaSearchingForT1: '',
      permaSearchingForT2: '',
      table3Data: [],
      isSearching3: false,
      tlId: '',
      txtSearchT3: '',
      permaSearchingForT3: '',
      tlFname: '',
      tlLname: '',
      show4thTable: false,
      storeName: '',
      pagination4: {
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
      table4Data: [],
      isSearching4: false,
      permaSearchingForT4: '',
      storeId: '',
      txtSearchT4: '',
      tableTh: [],
      tableRow: [],
      printData: {
        searchingFor: ''
      },
      showPagination1: true,
      showPagination2: true,
      showPagination3: true,
      showPagination4: true,
      showAll: false
    }
  },
  created: function () {
    //this.check()
    this.doLoad = true
    let self = this
    axios.get('api/user').then(response => {
      if(response.data.status === "0") {
        axios.get('api/user/logout').then(response => {
          self.doLoad = false
          self.$auth.destroyToken()
          self.$router.push('/login')
          self.doLoad = false
        }).catch(error => {
          console.log(error)
        })
      }else{
        if(response.data.user_level === "0") {
          self.admin = false
          localStorage.admin = 'false'
          self.doLoad = false
        } else if (response.data.user_level === "1") {
          self.admin = true
          localStorage.admin = 'true'
          self.showTable()
        } else {
          self.notUser = false
          localStorage.admin = 'false'
          self.doLoad = false
        }
        self.showCards(response.data.agent_id)
        // axios.get('agent' + self.agentId).then(response => {
        //   self.userLevel = response.data.user_level
        //   if(response.data.user_level === 0) {
        //     self.admin = false
        //   } else {
        //     self.admin = true
        //   }
        // }).catch(error => {
        //   console.log(error)
        // })
      }
    }).catch(error => {
      console.log(error)
    })

  },
  computed: {
    now () {
      let date = new Date()
      let hours = date.getHours()
      let minutes = date.getMinutes()
      let ampm = hours >= 12 ? 'pm' : 'am'
      hours = hours % 12
      hours = hours ? hours : 12 // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes
      let strTime = hours + ':' + minutes + ' ' + ampm
      return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime
    }
  },
  methods: {
    // check: function() {
    //   let self = this
    //   axios.get('api/user').then(response => {
    //     if(response.data.user_level === 0) {
    //       localStorage.admin = 'false'
    //       this.admin = false
    //       return this.admin
    //     } else {
    //       localStorage.admin = 'true'
    //       this.admin = true
    //       return this.admin
    //     }
    //   }).catch(error => {
    //     console.log(error)
    //   })
    // },
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
    logout () {
      this.$auth.destroyToken()
      this.$router.push('/login')
    },
    dashboard () {
      this.$router.push('/dashboard')
    },
    agents () {
      this.$router.push('/agent')
    },
    payment () {
      this.$router.push('/payment')
    },
    rates () {
      this.$router.push('/rate')
    },
    deductions () {
      this.$router.push('/deduction')
    },
    savings () {
      this.$router.push('/savings')
    },
    reports () {
      this.$router.push('/report')
    },
    announcements () {
      this.$router.push('/announcement')
    },
    settings () {
      this.$router.push('/setting')
    },
    showCards (id) {
      this.doLoad = true
      let self = this
      axios.get('api/cards/' + id).then(response => {
        self.stats = response.data.data
        if(id === '0') {
          self.username = 'Admin'
        } else {
          self.username = response.data.data.first_name
        }
        self.doLoad = false
      }).catch(error => {
        console.log(error)
      })
    },
    print () {
      if(this.show1stTable) {
        this.tablePrinting('table1')
      } else if(this.show2ndTable) {
        this.tablePrinting('table2')
      } else if(this.show3rdTable) {
        this.tablePrinting('table3')
      } else {
        this.tablePrinting('table4')
      }
    },
    showAllData () {
      this.showAll = true
      if(this.show1stTable) {
        this.showPagination1 = false
        if(!this.isSearching) {
          this.showTable()
        } else {
          this.search()
        }
      } else if(this.show2ndTable) {
        this.showPagination2 = false
        if(!this.isSearching2) {
          this.paymentPeriodDetail(this.ppId,  this.viewingStart, this.viewingEnd)
        } else {
          this.searchTL()
        }
      } else if(this.show3rdTable) {
        this.showPagination3 = false
        if(!this.isSearching3) {
          this.view3rdTable(this.tlId,  this.tlFname, this.tlLname)
        } else {
          this.searchStore()
        }
      } else {
        this.showPagination4 = false
        if(!this.isSearching4) {
          this.view4thTable (this.storeId, this.storeName)
        } else {
          this.searchAgent()
        }
      }
    },
    showTen () {
      this.showAll = false
      if(this.show1stTable) {
        this.showPagination1 = true
        if(!this.isSearching) {
          this.showTable()
        } else {
          this.search()
        }
      } else if(this.show2ndTable) {
        this.showPagination2 = true
        if(!this.isSearching2) {
          this.paymentPeriodDetail(this.ppId,  this.viewingStart, this.viewingEnd)
        } else {
          this.searchTL()
        }
      } else if(this.show3rdTable) {
        this.showPagination3 = true
        if(!this.isSearching3) {
          this.view3rdTable(this.tlId,  this.tlFname, this.tlLname)
        } else {
          this.searchStore()
        }
      } else {
        this.showPagination4 = true
        if(!this.isSearching4) {
          this.view4thTable (this.storeId, this.storeName)
        } else {
          this.searchAgent()
        }
      }
    },
    tablePrinting (sourceTbl) {
      document.getElementById('tableDiv').innerHTML = "";
      let tbl = document.createElement('table'); 
      tbl.setAttribute('id', 'printTable');
      document.getElementById("tableDiv").appendChild(tbl);
      let source = document.getElementById(sourceTbl);
      let destination = document.getElementById('printTable');
      let copy = source.cloneNode(true);
      copy.setAttribute('id', 'tableB');
      destination.parentNode.replaceChild(copy, destination);
      window.print();
    },
    showTable () {
      let isShowingAll = false
      if(!this.showPagination1) {
        isShowingAll = true
      }
      let data = {
        show_all: isShowingAll
      }
      this.clearPermaSearch()
      this.doLoad = true
      let self = this
      axios.post('api/reports', data).then(response => {
        self.isSearching = false
        if (self.showPagination1) {
          self.table1Data = response.data.data.data
        } else {
          self.table1Data = response.data.data
        }
        self.stats = response.data.stats
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
          self.table1Data = response.data.data.data
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
          payment_period: this.permaSearchingForT1
        }
        axios.post(url, data).then(response => {
          self.isSearching = true
          self.table1Data = response.data.data.data
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
    search () {
      this.doLoad = true
      this.permaSearchingForT1 = this.textForSearch.substring(0,10)
      let isShowingAll = false
      if(!this.showPagination1) {
        isShowingAll = true
      }
      let data = {
        payment_period: this.textForSearch.substring(0,10),
        show_all: isShowingAll
      }
      let self = this
      axios.post('api/reports/search', data).then(response => {
        if(response.data.status === 'success'){
          self.isSearching = true
          if (self.showPagination1) {
            self.table1Data = response.data.data.data
          } else {
            self.table1Data = response.data.data
          }
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
          self.table1Data = []
          self.hasTableError = true
          self.tableErrorMsg = response.data.data
          self.doLoad = false
        }
        let widthVP = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
        let limitCharLength = 0
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
    stopSearching () {
      this.permaSearchingForT1 = ''
      this.showTable()
      this.hasTableError = false
      this.textForSearch = ''
    },
    paymentPeriodDetail (id, start, end) {
      this.clearPermaSearch()
      this.doLoad = true
      this.viewingStart = start
      this.viewingEnd = end
      this.show1stTable = false
      this.show2ndTable = true
      this.ppId = id
      let isShowingAll = false
      if(!this.showPagination2) {
        isShowingAll = true
      }
      let self = this
      let data = {
        id: id,
        show_all: isShowingAll,
      }
      axios.post('api/reports/ppdetail', data).then(response => {
        self.isSearching2 = false
        if (self.showPagination2) {
          self.table2Data = response.data.data.data
        } else {
          self.table2Data = response.data.data
        }
        self.pagination2.prevPageUrl = response.data.data.prev_page_url
        self.pagination2.nextPageUrl = response.data.data.next_page_url
        self.pagination2.currentPage = response.data.data.current_page
        self.pagination2.last_page = response.data.data.last_page
        self.pagination2.from = response.data.data.from
        self.pagination2.to = response.data.data.to
        self.pagination2.total = response.data.data.total
        if (self.pagination2.prevPageUrl === null) {
          self.pagination2.isPrevDisabled = true
        } else {
          self.pagination2.isPrevDisabled = false
        }
        if (self.pagination2.nextPageUrl === null) {
          self.pagination2.isNextDisabled = true
        } else {
          self.pagination2.isNextDisabled = false
        }
        self.hasTableError = false
        this.doLoad = false
      }).catch(error => {
        console.log(error)
      })
    },
    movePage2 (url, id) {
      if(url !== null){
        this.doLoad = true
        url = url.replace('http://server.solarace.com.ph/', '')
        let self = this
        let data = {
          id: self.ppId
        }
        axios.post(url, data).then(response => {
          self.isSearching2 = true
          self.table2Data = response.data.data.data
          self.pagination2.prevPageUrl = response.data.data.prev_page_url
          self.pagination2.nextPageUrl = response.data.data.next_page_url
          self.pagination2.currentPage = response.data.data.current_page
          self.pagination2.last_page = response.data.data.last_page
          self.pagination2.from = response.data.data.from
          self.pagination2.to = response.data.data.to
          self.pagination2.total = response.data.data.total
          if (self.pagination2.prevPageUrl === null) {
            self.pagination2.isPrevDisabled = true
          } else {
            self.pagination2.isPrevDisabled = false
          }
          if (self.pagination2.nextPageUrl === null) {
            self.pagination2.isNextDisabled = true
          } else {
            self.pagination2.isNextDisabled = false
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
    showBackTable1 () {
      this.viewingStart = ''
      this.viewingEnd = ''
      this.viewingTLName = ''
      this.storeName = ''
      this.show1stTable = true
      this.show2ndTable = false
      this.show3rdTable = false
      this.show4thTable = false
    },
    showBackTable2 () {
      this.viewingTLName = ''
      this.storeName = ''
      this.show2ndTable = true
      this.show3rdTable = false
      this.show1stTable = false
      this.show4thTable = false
    },
    searchTL () {
      this.doLoad = true
      this.permaSearchingForT2 = this.txtSearchTl
      let isShowingAll = false
      if(!this.showPagination2) {
        isShowingAll = true
      }
      let self = this
      let data = {
        id: this.ppId,
        tlId: this.txtSearchTl,
        show_all: isShowingAll,
      }
      axios.post('api/reports/ppdetail/search', data).then(response => {
        self.isSearching2 = true
        if (self.showPagination2) {
          self.table2Data = response.data.data.data
        } else {
          self.table2Data = response.data.data
        }
        self.pagination2.prevPageUrl = response.data.data.prev_page_url
        self.pagination2.nextPageUrl = response.data.data.next_page_url
        self.pagination2.currentPage = response.data.data.current_page
        self.pagination2.last_page = response.data.data.last_page
        self.pagination2.from = response.data.data.from
        self.pagination2.to = response.data.data.to
        self.pagination2.total = response.data.data.total
        if (self.pagination2.prevPageUrl === null) {
          self.pagination2.isPrevDisabled = true
        } else {
          self.pagination2.isPrevDisabled = false
        }
        if (self.pagination2.nextPageUrl === null) {
          self.pagination2.isNextDisabled = true
        } else {
          self.pagination2.isNextDisabled = false
        }
        self.hasTableError = false
        this.doLoad = false
      }).catch(error => {
        console.log(error)
      })
    },
    decideMovePage2 (url) {
      if(this.isSearching2) {
        this.searchMovePage2(url)
      } else {
        this.movePage2(url)
      }
    },
    searchMovePage2 (url) {
      if(url !== null){
        this.doLoad = true
        url = url.replace('http://server.solarace.com.ph/', '')
        let self = this
        let data = {
          id: this.ppId,
          tlId: this.permaSearchingForT2
        }
        axios.post(url, data).then(response => {
          self.isSearching2 = true
          self.table2Data = response.data.data.data
          self.pagination2.prevPageUrl = response.data.data.prev_page_url
          self.pagination2.nextPageUrl = response.data.data.next_page_url
          self.pagination2.currentPage = response.data.data.current_page
          self.pagination2.last_page = response.data.data.last_page
          self.pagination2.from = response.data.data.from
          self.pagination2.to = response.data.data.to
          self.pagination2.total = response.data.data.total
          if (self.pagination2.prevPageUrl === null) {
            self.pagination2.isPrevDisabled = true
          } else {
            self.pagination2.isPrevDisabled = false
          }
          if (self.pagination2.nextPageUrl === null) {
            self.pagination2.isNextDisabled = true
          } else {
            self.pagination2.isNextDisabled = false
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
    stopSearching2 () {
      this.paymentPeriodDetail(this.ppId,  this.viewingStart, this.viewingEnd)
      this.hasTableError = false
      this.txtSearchTl = ''
      this.permaSearchingForT2 = ''
    },
    view3rdTable (id, fname, lname) {
      this.clearPermaSearch()
      this.tlFname = fname
      this.tlLname  = lname
      this.show1stTable = false
      this.show2ndTable = false
      this.viewingTLName = fname + ' ' + lname
      this.show3rdTable = true
      this.doLoad = true
      this.tlId = id
      let isShowingAll = false
      if(!this.showPagination3) {
        isShowingAll = true
      }
      let self = this
      let data = {
        id: this.ppId,
        tl_id: id,
        show_all: isShowingAll
      }
      axios.post('api/reports/store', data).then(response => {
        self.isSearching3 = false
        if (self.showPagination3) {
          self.table3Data = response.data.data.data
        } else {
          self.table3Data = response.data.data
        }
        self.pagination3.prevPageUrl = response.data.data.prev_page_url
        self.pagination3.nextPageUrl = response.data.data.next_page_url
        self.pagination3.currentPage = response.data.data.current_page
        self.pagination3.last_page = response.data.data.last_page
        self.pagination3.from = response.data.data.from
        self.pagination3.to = response.data.data.to
        self.pagination3.total = response.data.data.total
        if (self.pagination3.prevPageUrl === null) {
          self.pagination3.isPrevDisabled = true
        } else {
          self.pagination3.isPrevDisabled = false
        }
        if (self.pagination3.nextPageUrl === null) {
          self.pagination3.isNextDisabled = true
        } else {
          self.pagination3.isNextDisabled = false
        }
        self.hasTableError = false
        this.doLoad = false
      }).catch(error => {
        console.log(error)
      })
    },
    decideMovePage3 (url) {
      if(this.isSearching3) {
        this.searchMovePage3(url)
      } else {
        this.movePage3(url)
      }
    },
    movePage3 (url) {
      if(url !== null){
        this.doLoad = true
        let self = this
        url = url.replace('http://server.solarace.com.ph/', '')
        let data = {
          id: this.ppId,
          tl_id: this.tlId
        }
        axios.post(url, data).then(response => {
          self.isSearching3 = false
          self.table3Data = response.data.data.data
          self.pagination3.prevPageUrl = response.data.data.prev_page_url
          self.pagination3.nextPageUrl = response.data.data.next_page_url
          self.pagination3.currentPage = response.data.data.current_page
          self.pagination3.last_page = response.data.data.last_page
          self.pagination3.from = response.data.data.from
          self.pagination3.to = response.data.data.to
          self.pagination3.total = response.data.data.total
          if (self.pagination3.prevPageUrl === null) {
            self.pagination3.isPrevDisabled = true
          } else {
            self.pagination3.isPrevDisabled = false
          }
          if (self.pagination3.nextPageUrl === null) {
            self.pagination3.isNextDisabled = true
          } else {
            self.pagination3.isNextDisabled = false
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
    searchStore () {
      this.doLoad = true
      this.permaSearchingForT3 = this.txtSearchT3
      let isShowingAll = false
      if(!this.showPagination3) {
        isShowingAll = true
      }
      let self = this
      let data = {
        id: this.ppId,
        tl_id: this.tlId,
        txt_search: this.txtSearchT3,
        show_all: isShowingAll
      }
      axios.post('api/reports/store/search', data).then(response => {
        self.isSearching3 = true
        if (self.showPagination3) {
          self.table3Data = response.data.data.data
        } else {
          self.table3Data = response.data.data
        }
        self.pagination3.prevPageUrl = response.data.data.prev_page_url
        self.pagination3.nextPageUrl = response.data.data.next_page_url
        self.pagination3.currentPage = response.data.data.current_page
        self.pagination3.last_page = response.data.data.last_page
        self.pagination3.from = response.data.data.from
        self.pagination3.to = response.data.data.to
        self.pagination3.total = response.data.data.total
        if (self.pagination3.prevPageUrl === null) {
          self.pagination3.isPrevDisabled = true
        } else {
          self.pagination3.isPrevDisabled = false
        }
        if (self.pagination3.nextPageUrl === null) {
          self.pagination3.isNextDisabled = true
        } else {
          self.pagination3.isNextDisabled = false
        }
        self.hasTableError = false
        this.doLoad = false
      }).catch(error => {
        console.log(error)
      })
    },
    searchMovePage3 (url) {
      if(url !== null){
        this.doLoad = true
        url = url.replace('http://server.solarace.com.ph/', '')
        let self = this
        let data = {
          id: this.ppId,
          tl_id: this.tlId,
          txt_search: this.txtSearchT3
        }
        axios.post(url, data).then(response => {
          self.isSearching3 = true
          self.table3Data = response.data.data.data
          self.pagination3.prevPageUrl = response.data.data.prev_page_url
          self.pagination3.nextPageUrl = response.data.data.next_page_url
          self.pagination3.currentPage = response.data.data.current_page
          self.pagination3.last_page = response.data.data.last_page
          self.pagination3.from = response.data.data.from
          self.pagination3.to = response.data.data.to
          self.pagination3.total = response.data.data.total
          if (self.pagination3.prevPageUrl === null) {
            self.pagination3.isPrevDisabled = true
          } else {
            self.pagination3.isPrevDisabled = false
          }
          if (self.pagination3.nextPageUrl === null) {
            self.pagination3.isNextDisabled = true
          } else {
            self.pagination3.isNextDisabled = false
          }
          self.hasTableError = false
          this.doLoad = false
        }).catch(error => {
          console.log(error)
        })
      }
    },
    stopSearching3 () {
      this.view3rdTable(this.tlId,  this.tlFname, this.tlLname)
      this.hasTableError = false
      this.txtSearchT3 = ''
      this.permaSearchingForT3 = ''
    },
    view4thTable (id, store) {
      this.clearPermaSearch()
      this.storeName = store
      this.show1stTable = false
      this.show2ndTable = false
      this.show3rdTable = false
      this.show4thTable = true
      this.doLoad = true
      this.storeId = id
      let isShowingAll = false
      if(!this.showPagination4) {
        isShowingAll = true
      }
      let self = this
      let data = {
        pp_id: this.ppId,
        tl_id: this.tlId,
        store_id: id,
        show_all: isShowingAll
      }
      axios.post('api/reports/agents', data).then(response => {
        self.isSearching4 = false
        if (self.showPagination4) {
          self.table4Data = response.data.data.data
        } else {
          self.table4Data = response.data.data
        }
        self.pagination4.prevPageUrl = response.data.data.prev_page_url
        self.pagination4.nextPageUrl = response.data.data.next_page_url
        self.pagination4.currentPage = response.data.data.current_page
        self.pagination4.last_page = response.data.data.last_page
        self.pagination4.from = response.data.data.from
        self.pagination4.to = response.data.data.to
        self.pagination4.total = response.data.data.total
        if (self.pagination4.prevPageUrl === null) {
          self.pagination4.isPrevDisabled = true
        } else {
          self.pagination4.isPrevDisabled = false
        }
        if (self.pagination4.nextPageUrl === null) {
          self.pagination4.isNextDisabled = true
        } else {
          self.pagination4.isNextDisabled = false
        }
        self.hasTableError = false
        this.doLoad = false
      }).catch(error => {
        console.log(error)
      })
    },
    movePage4 (url) {
      if(url !== null){
        this.doLoad = true
        let self = this
        url = url.replace('http://server.solarace.com.ph/', '')
        let data = {
          pp_id: this.ppId,
          tl_id: this.tlId,
          store_id: this.storeId,
        }
        axios.post(url, data).then(response => {
          self.isSearching4 = false
          self.table4Data = response.data.data.data
          self.pagination4.prevPageUrl = response.data.data.prev_page_url
          self.pagination4.nextPageUrl = response.data.data.next_page_url
          self.pagination4.currentPage = response.data.data.current_page
          self.pagination4.last_page = response.data.data.last_page
          self.pagination4.from = response.data.data.from
          self.pagination4.to = response.data.data.to
          self.pagination4.total = response.data.data.total
          if (self.pagination4.prevPageUrl === null) {
            self.pagination4.isPrevDisabled = true
          } else {
            self.pagination4.isPrevDisabled = false
          }
          if (self.pagination4.nextPageUrl === null) {
            self.pagination4.isNextDisabled = true
          } else {
            self.pagination4.isNextDisabled = false
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
    decideMovePage4 (url) {
      if(this.isSearching4) {
        this.searchMovePage4(url)
      } else {
        this.movePage4(url)
      }
    },
    searchAgent () {
      this.doLoad = true
      this.permaSearchingForT4 = this.txtSearchT4
      let isShowingAll = false
      if(!this.showPagination4) {
        isShowingAll = true
      }
      let self = this
      let data = {
        pp_id: this.ppId,
        tl_id: this.tlId,
        store_id: this.storeId,
        txt_search: this.txtSearchT4,
        show_all: isShowingAll
      }
      axios.post('api/reports/agents/search', data).then(response => {
        self.isSearching4 = true
        if (self.showPagination4) {
          self.table4Data = response.data.data.data
        } else {
          self.table4Data = response.data.data
        }
        self.pagination4.prevPageUrl = response.data.data.prev_page_url
        self.pagination4.nextPageUrl = response.data.data.next_page_url
        self.pagination4.currentPage = response.data.data.current_page
        self.pagination4.last_page = response.data.data.last_page
        self.pagination4.from = response.data.data.from
        self.pagination4.to = response.data.data.to
        self.pagination4.total = response.data.data.total
        if (self.pagination4.prevPageUrl === null) {
          self.pagination4.isPrevDisabled = true
        } else {
          self.pagination4.isPrevDisabled = false
        }
        if (self.pagination4.nextPageUrl === null) {
          self.pagination4.isNextDisabled = true
        } else {
          self.pagination4.isNextDisabled = false
        }
        self.hasTableError = false
        this.doLoad = false
      }).catch(error => {
        console.log(error)
      })
    },
    stopSearching4 () {
      this.view4thTable (this.storeId, this.storeName)
      this.hasTableError = false
      this.txtSearchT4 = ''
      this.permaSearchingForT4 = ''
    },
    searchMovePage4 (url) {
      if(url !== null){
        this.doLoad = true
        url = url.replace('http://server.solarace.com.ph/', '')
        let self = this
        let data = {
          pp_id: this.ppId,
          tl_id: this.tlId,
          store_id: this.storeId,
          txt_search: this.txtSearchT4
        }
        axios.post(url, data).then(response => {
          self.isSearching4 = true
          self.table4Data = response.data.data.data
          self.pagination4.prevPageUrl = response.data.data.prev_page_url
          self.pagination4.nextPageUrl = response.data.data.next_page_url
          self.pagination4.currentPage = response.data.data.current_page
          self.pagination4.last_page = response.data.data.last_page
          self.pagination4.from = response.data.data.from
          self.pagination4.to = response.data.data.to
          self.pagination4.total = response.data.data.total
          if (self.pagination4.prevPageUrl === null) {
            self.pagination4.isPrevDisabled = true
          } else {
            self.pagination4.isPrevDisabled = false
          }
          if (self.pagination4.nextPageUrl === null) {
            self.pagination4.isNextDisabled = true
          } else {
            self.pagination4.isNextDisabled = false
          }
          self.hasTableError = false
          this.doLoad = false
        }).catch(error => {
          console.log(error)
        })
      }
    },
    showBackTable3 () {
      this.storeName = ''
      this.show3rdTable = true
      this.show4thTable = false
      this.show2ndTable = false
      this.show1stTable = false
    },
    clearPermaSearch () {
      this.permaSearchingForT1 = ''
      this.permaSearchingForT2 = ''
      this.permaSearchingForT3 = ''
      this.permaSearchingForT4 = ''
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mainDiv {
    background-color: #F1F9FF;
    width: 100%;
  }
  #bg-div {
    background-color: #2699FB;
    height: 100%;
    width: 100%;
    color: white;
    font-family: Arial;
  }
  #footer {
    background-color: #7FC4FD;
    color: white;
    height: 64px;
    cursor: pointer;
  }
  .appTitle {
    padding-top: 50px;
    font-size: 18;
    font-weight: 700;
  }
  .navOptions {
    margin-top: 79px;
    padding-bottom: 30px;
  }
  .navOptionsItem {
    margin-top: 30px;
    font-size: 16px;
    cursor: pointer;
  }
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
  }
  @media (min-width: 1600px) {
    .myContent {
      margin-left: 15em;
      margin-top: 0px;
    }
  }
  .biggerFont {
    font-size: 60px;
  }
  .iconAlign2 {
    vertical-align: top;
  }
  .divprint:hover {
    background-color: #007BFF;
    color: white;
  }

  @media screen {
    #print {
      display: none;
    }
  }

  @media print {
    html, body {
        height: 100%;
    }
    body * {
      visibility:hidden;

    }
    #print, #print * {
      -webkit-print-color-adjust: exact;
      visibility:visible;
      color:black;
    }
    #print {
      height: 100%;
      position:absolute;
      left:0;
      top:0;
    }
    @page {
      size: auto;   /* auto is the initial value */
      margin: 0;  /* this affects the margin in the printer settings */
    }
  }
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
  .divprint:hover {
    background-color: #007BFF;
    color: white;
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
</style>
