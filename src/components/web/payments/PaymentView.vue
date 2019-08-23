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
          <transition name="fadeMain">
            <span v-if="paymentList">My Payments</span>
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
                <input class="form-control form-control-lg txtSearch" v-model="searchAgentName" type="text" placeholder="enter agent last name" @keyup.enter="searchAgent">
              </div>
              <div class="row searchRow mt-3 mb-1 text-right pr-0">
                <div class="float-right w-100" >
                  <div class="lblSearch agentStatusLabel inlineDisplay pt-1 pr-3 ">Active Agents</div>
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
              <!-- Start New Payment -->
              <div class="row mt-4 btnNewPayment">
                <button class="btnSearch btn" @click="newPayment" v-show="canPay">ADD NEW PAYMENT</button>
              </div>
              <div class="row divPayPeriod mb-4 pb-3" v-if="admin">
                <div class="col-md-12 searchRow">
                  <p class="lblSearch">Create New Payroll Period</p>
                  <transition name="fade">
                    <div class="bg-success text-white text-center" v-show="creationOK">
                      <p class="pt-2 pb-2"><i class="material-icons iconAlign2">check</i> Successfully created</p>
                    </div>
                  </transition>
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel pl-3">From</div>
                      </div>
                      <datetime @close="fromDateChoosen" input-class="form-control cstmTextDate clPaymentStart" class="dateWidth " placeholder="enter starting date" v-model="starting_date" v-validate="'required'" name="starting_date" data-vv-as="starting date" data-vv-scope="create"></datetime>
                    </div>
                  </div>
                  <div class="row ml-3 pt-2 text-danger" v-show="errStart">
                    <span>Starting date is required</span>
                  </div>
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel pl-3">To</div>
                      </div>
                      <datetime input-class="form-control cstmTextDate clPaymentEnd" class="dateWidth " :min-datetime="minDatetime" placeholder="enter end date" v-model="end_date" v-validate="'required'" name="end_date" data-vv-as="end date" data-vv-scope="create"></datetime>
                    </div>
                  </div>
                  <div class="row ml-3 pt-2 text-danger"  v-show="errEnd">
                    <span>End date is required</span>
                  </div>
                  <div class="eachInput ">
                    <button class="btnSearch btn" @click="addPaymentPeriod">NEW PAYMENT PERIOD</button>
                  </div>
                </div>
              </div>
              <!-- End New Payment -->
            </div>
            <div class="col-md-12 col-lg-9 p-0 tableDiv">
              <div class="listRow float-right col-md-12">
                <div class="showAllDiv">
                  <p v-show="searchingFor.length > 0" class="m-0 mb-2 text-info">Showing search result for {{ searchingFor }} (<u class="primary-color clickable" @click="showAllBranch">Show All</u>
                  )</p>
                </div>
                <transition name="fadeMain" >
                  <div class="listItem col-md-12 text-center mt-3 bg-success"  v-show="successDeletion">
                    <span class="w-100 text-white">Successfully deleted</span>
                  </div>
                </transition>
                <transition name="fadeMain" >
                  <div class="listItem col-md-12 text-center mt-3 bg-success"  v-show="successCompletion">
                    <span class="w-100 text-white">Payment period completed</span>
                  </div>
                </transition>
                <div class="scrollable style-2" v-show="!(hasTableError)">
                  <transition name="fadeMain" v-for="period in paymentPeriods" :key="'period' + period.id">
                    <div class="listItem col-md-12 d-flex" v-if="paymentList" @click="showPaymentDetails(period.id)">
                      <span class="listIcon col-1"><i class="material-icons iconAlign2">attach_money</i></span>
                      <span class="col-8">
                        <span class="listTitle ">{{ period.status }}</span>
                        <span class="listDescription "><span class="hiddenNextLine"><br /></span>{{ period.starting_date }} | {{ period.end_date }}</span>
                      </span>
                      <span class="col-3" v-if="admin">
                        <span class="listIconMore" v-if="period.status === 'COMPLETED'"><i class="material-icons iconAlign2 float-right">keyboard_arrow_right</i></span>
                        <span class="listIconMore" v-if="period.status === 'PENDING'" title="Delete Payment Period"><i class="material-icons iconAlign2 float-right text-success" @click="completePayment(period.id)">check_circle</i></span>
                        <span class="listIconMore " v-if="period.status === 'PENDING'" title="Delete Payment Period"><i class="material-icons iconAlign2 float-right text-danger mr-2" @click="deletePayment(period.id)">delete</i></span>
                      </span>
                      <span v-if="!admin" class="col-3">
                        <span class="listIconMore"><i class="material-icons iconAlign2 float-right">keyboard_arrow_right</i></span>
                      </span>
                    </div>
                  </transition>
                  <transition name="fadeMain" v-for="paid in paidAgents" :key="'paid' + paid.id">
                    <div class="listItem col-md-12 d-flex" v-if="!paymentList && admin" @click="viewPaymentAgent(paid.id)">
                      <span class="listIcon col-1"><i class="material-icons iconAlign2">check</i></span>
                      <span class="col-8">
                        <span class="listTitle ">{{ paid.first_name }} {{ paid.last_name }} | {{ '₱' + ((Number(paid.total_paid).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</span>
                        <span class="listDescription "><span class="hiddenNextLine"><br /></span>{{ paid.branch_name }}</span>
                      </span>
                      <span class="listIconMore col-3"><i class="material-icons iconAlign2 float-right">keyboard_arrow_right</i></span>
                    </div>
                  </transition>
                  <transition name="fadeMain" v-for="paid in paidAgents" :key="'paid' + paid.id">
                    <div  class="listItem notPointer col-md-12 d-flex" v-if="!paymentList && !admin">
                      <span class="listIcon col-1"><i class="material-icons iconAlign2">check</i></span>
                      <span class="col-8">
                        <span class="listTitle ">{{ paid.first_name }} {{ paid.last_name }}</span>
                        <span class="listDescription "><span class="hiddenNextLine"><br /></span> WD: {{ paid.work_days }} | OT: {{ paid.ot_hours }} | DRD: {{ paid.rest_days }} | RH: {{ paid.regular_holiday }} | SH: {{ paid.special_holiday }}</span>
                      </span>
                      <span v-if="paid.status === 'PENDING'" class="listIconMore col-3">
                        <i title="delete payment" class="material-icons iconAlign2 float-right text-danger clickable" @click="deleteOnePayment(paid.id, paid.agent_id)">delete</i>
                        <i title="adjust payment" class="material-icons iconAlign2 float-right text-warning clickable mr-2" @click="editAdjustmentForNonAdmin(paid.id, paid.adjustments, paid.remarks)">settings</i>
                      </span>
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
        <div id="container-floating" v-show="canPay" class="cstmtooltip" @click="newPayment">
          <span class="tooltiptext">Add New Payment</span>
          <div id="floating-button" data-toggle="tooltip" data-placement="left" data-original-title="Create">
            <p class="plus">+</p>
            <i class="material-icons edit">create</i>
          </div>
        </div>
      </div>
    </transition>
    <!--Confirmation Page-->
    <transition name="fadeMain">
      <div v-show="confirmationPage" class="allInput style-1">
        <Confirmation @confirm="confirm" @cancel="cancel"></Confirmation>
      </div> 
    </transition>
    <!-- Modal -->
    <div class="modal fade bd-example-modal-lg" id="mdlAgentPayment" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title" id="exampleModalLabel">PAYMENT INFORMATION</h6>
            <div class="btn-group float-right">
              <p class="mb-0 small clickable dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Actions
              </p>
              <div class="dropdown-menu dropdown-menu-right">
                <button class="dropdown-item clickable" type="button" @click="editAdjustments">Edit Adjustment</button>
                <button class="dropdown-item clickable" type="button" @click="deleteOnePayment(singlePayment.id, singlePayment.agent_id)">Delete Payment</button>
                <button class="dropdown-item clickable" type="button" @click="print">Print Payment</button>
              </div>
            </div>
          </div>
          <div class="modal-body pt-1 pb-4">
            <h4 class=""><small>Payment: </small>{{ '₱' + ((Number(singlePayment.total_paid).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</h4>
            <small class="">Paid On: {{ singlePayment.created_at}}</small><br><br>
            <p class="p-0 m-0">Name: {{ singlePayment.first_name }} {{ singlePayment.last_name }}</p>
            <p class="p-0 m-0">Store: {{ singlePayment.branch_name }}</p>
            <div class="divOuterTable style-2">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Work Days</th>
                    <th scope="col">Overtime</th>
                    <th scope="col">Work on RD</th>
                    <th scope="col">Regular Holiday</th>
                    <th scope="col">Special Holiday</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Rate</th>
                    <td >{{ '₱' + ((Number(singlePayment.rate).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</td>
                    <td >{{ singlePayment.ot_rates }}%</td>
                    <td >{{ singlePayment.rest_day_rate }} %</td>
                    <td >{{ singlePayment.regular_holiday_rate }}%</td>
                    <td >{{ singlePayment.special_holiday_rate }}%</td>
                  </tr>
                  <tr>
                    <th scope="row">Rendered</th>
                    <td>{{ singlePayment.work_days }}</td>
                    <td>{{ singlePayment.ot_hours }}</td>
                    <td>{{ singlePayment.rest_days }}</td>
                    <td>{{ singlePayment.regular_holiday }}</td>
                    <td>{{ singlePayment.special_holiday }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Total</th>
                    <td>{{ '₱' + workDaysTotal }}</td> 
                    <td>{{ '₱' + otTotal }}</td>
                    <td>{{ '₱' + workOnRDTotal }}</td>
                    <td>{{ '₱' + regularHolidayTotal }}</td>
                    <td>{{ '₱' + specialHolidayTotal }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br><br>
            <div class="divOuterTable style-2">
              <small>Deductions</small>
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th scope="col">SSS</th>
                    <th scope="col">Pag-ibig</th>
                    <th scope="col">Phil-health</th>
                    <th scope="col">Savings</th>
                    <th scope="col">CA</th>
                    <th scope="col">SSS Loan</th>
                    <th scope="col">Pag-ibig Loan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ '₱' + ((Number(singlePayment.sss).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</td>
                    <td>{{ '₱' + ((Number(singlePayment.pag_ibig).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</td>
                    <td>{{ '₱' + ((Number(singlePayment.phil_health).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</td>
                    <td>{{ '₱' + ((Number(singlePayment.savings).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</td>
                    <td>{{ '₱' + ((Number(singlePayment.ca_deduction).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</td>
                    <td>{{ '₱' + ((Number(singlePayment.sss_loan_deduction).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</td>
                    <td>{{ '₱' + ((Number(singlePayment.pi_loan_deduction).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="d-flex">
              <div class="col-md-6 mt-3">
                <div v-show="singlePayment.adjustments !== '0' && singlePayment.remarks !== ''">
                  <p class="m-0 b-0">Adjustment Remarks:</p>
                  <p class="ml-3">{{ singlePayment.remarks }}</p>
                </div>
              </div>
              <div  class="col-md-6">
                <br>
                
                <p class="float-right m-0 p-0">Allowance: {{ '₱' + ((Number(singlePayment.allowance).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}}</p><br>
                <p class="float-right m-0 p-0">Adjustments: {{ '₱' + ((Number(singlePayment.adjustments).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</p><br>
                <br>
                <b class="float-right">Earnings: ₱{{ allEarning}}</b><br>
                <b class="float-right">Deductions: ₱{{ allDeductions }}</b><br>
                <b class="float-right">Total Payment: {{ '₱' + ((Number(singlePayment.total_paid).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</b>
                <br><br>
              </div>
            </div>
            <div>
              <p>Files:</p>
              <div class="d-flex">
                <div class="col-12">
                  <p class="mb-0 text-secondary">DTR:</p>
                  <img :src="'http://server.solarace.com.ph/uploads/payment/' + singlePayment.dtr" alt="DTR" class="img-thumbnail bckArrow viewableImgs" height="350px" width="500px" @click="showImg('dtrID')" id="dtrID">
                  <br><br>
                  <p class="mb-0 text-secondary" v-show="singlePayment.ot_approval !== 'OT'">OT Approval:</p>
                  <img v-show="singlePayment.ot_approval !== 'OT'" :src="'http://server.solarace.com.ph/uploads/payment/' + singlePayment.ot_approval" alt="OT Approval" class="img-thumbnail bckArrow viewableImgs" height="350px" width="500px" @click="showImg('otID')" id="otID">
                </div>
              </div>
              <div id="psaModal" class="imgmodal">
                <span class="close" @click="closeModal">&times;</span>
                <img class="cstmmodal" id="img01">
                <div id="caption"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade bd-example-modal-sm" id="mdlPaymentAdjust" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" data-backdrop="static">
      <div class="modal-dialog modal-sm">
        <div class="modal-content p-2">
          <div class="modal-header pl-1">
            <h6 class="modal-title text-primary" id="exampleModalLabel">EDIT ADJUSTMENT</h6>
          </div>
          <div class="eachInput">
            <div class="input-group txtLabels">
              <div class="input-group-prepend">
                <div class="input-group-text customLabel">Adjustment</div>
              </div>
              <input type="text" class="form-control customText"  placeholder="enter amount for adjustments" v-validate="'required|decimal:2'" name="adjustment" v-model="editAdjustment">
              <div class="input-group-prepend" @click="changeAdjustments">
              <div class="input-group-text customLabelPercent" v-show="adjustmentSign">&nbsp;&nbsp;+</div>
                <div class="input-group-text customLabelPercent2" v-show="!adjustmentSign">&nbsp;&nbsp;-</div>
              </div>
            </div>
          </div>
          <div class="row ml-2 pt-2 text-danger small">
            <span>{{ errors.first('adjustment') }}</span>
          </div>
          <div class="eachInput">
            <div class="input-group txtLabels">
              <div class="input-group-prepend">
                <div class="input-group-text customLabel">Remarks</div>
              </div>
              <input type="text" class="form-control customText"  placeholder="enter remarks" name="work days" v-model="editRemarks">
            </div>
          </div>
          <div class="modal-footer mt-3">
            <button type="button" class="btn btn-secondary" @click="cancelEdit">Cancel</button>
            <button type="button" class="btn btn-primary" @click="confirmEdit">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <div id="print" class=" w-100" :style="{'background-image': 'url(' + require('@/assets/watermark.png') + ')'}" style="font-size: 16px !important;">
      <div class="row d-flex border border-dark">
        <div class="col-4 p-0 border border-dark " >
          <center>
            <img class="logoPNG" src="@/assets/logo1.png" width="290px" height="80px">
          </center>
        </div>
        <div class="col-4 p-0 border border-right-0 border-left-0 border-dark">
          <h1 class="m-auto text-center pt-1 pb-1">SALARY SLIP</h1>
          <p class="border border-right-0 border-left-0 border-bottom-0 border-dark mt-2 mb-0"><span class="ml-2">Pay Period:</span><span class="mr-2 float-right">{{ singlePayment.starting_date }} - {{ singlePayment.end_date }}</span></p>
        </div>
        <div class="col-4 border border-dark c2">
          <center>
            <p class="lead cnfdtl mt-3 " style="font-size: 43px !important">CONFIDENTIAL</p>
          </center>
        </div>
        <div class="col-6 border border-top-0 border-dark">
          <div class="row pt-4 pb-4"> 
            <div class="col-3">
              <p class="m-0">Name:</p>
              <p class="m-0">Date Hired:</p>
              <p class="m-0">Pay Date:</p>
              <p class="m-0">Rate:</p>
            </div>
            <div class="col-9">
              <p class="m-0"><b>{{ singlePayment.first_name }} {{ singlePayment.last_name }}&nbsp;</b></p>
              <p class="m-0">{{ singlePayment.employment_date }}</p>
              <p class="m-0">{{ singlePayment.created_at }}&nbsp;</p>
              <p class="m-0">{{ '₱' + ((Number(singlePayment.rate).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</p>
            </div> 
          </div>    
          <div class="row">
            <div class="col-12 border-top border-bottom border-dark c1">
              <p class="m-0 ml-auto mr-auto text-center text-white">Description</p>
            </div>
            <div class="col-8  border-right border-dark">
              <p class="m-0 text-center">&nbsp;</p>
              <p class="m-0">Basic Salary</p>
              <p class="m-0">Allowance</p>
              <p class="m-0">Premium Benefits</p>
              <p class="m-0 ml-5">Overtime</p>
              <p class="m-0 ml-5">Duty on Rest Day</p>
              <p class="m-0 ml-5">Special Holiday</p>
              <p class="m-0 ml-5">Regular Holiday</p>
              <p class="m-0 text-center">&nbsp;</p>
              <p class="m-0">Contributions/Deductions/Payments:</p>
              <p class="m-0 ml-5">SSS</p>
              <p class="m-0 ml-5">Phil Health</p>
              <p class="m-0 ml-5">Pag-Ibig</p>
              <p class="m-0 ml-5">Cash Advance</p>
              <p class="m-0 ml-5">SSS Loan</p>
              <p class="m-0 ml-5">Pag-ibig Loan</p>
              <p class="m-0 ml-5">Savings</p>
              <p class="m-0 text-center">&nbsp;</p>
              <p class="m-0">Adjustment:</p>
              <p class="m-0 text-center">&nbsp;</p>
            </div>
            <div class="col-4 p-0">
              <p class="m-0 border-bottom border-dark text-center">Rendered</p>
              <p class="m-0 text-center">{{ singlePayment.work_days }}</p>
              <p class="m-0 text-center">-</p>
              <p class="m-0 text-center">&nbsp;</p>
              <p class="m-0 text-center">{{ singlePayment.ot_hours }}</p>
              <p class="m-0 text-center">{{ singlePayment.rest_days }}</p>
              <p class="m-0 text-center">{{ singlePayment.regular_holiday }}</p>
              <p class="m-0 text-center">{{ singlePayment.special_holiday }}</p>
              <p class="m-0 text-center">&nbsp;</p>
            </div>
          </div>
        </div>
        <div class="col-6 border border-top-0 border-left-0 border-dark">
          <div class="row pt-4 pb-4"> 
            <div class="col-4">
              <p class="m-0">Designation:</p>
              <p class="m-0">Area:</p>
              <p class="m-0">Department:</p>
              <p class="m-0">Email Address:</p>
            </div>
            <div class="col-8">
              <p class="m-0">{{ singlePayment.title }}</p>
              <p class="m-0">{{ singlePayment.branch_name }}</p>
              <p class="m-0">Sales</p>
              <p class="m-0">{{ singlePayment.email }}</p>
            </div> 
          </div>
          <div class="row border-top border-dark">
            <div class="col-6 p-0 border-right border-dark" style="height: 100% !important;">
              <p class="m-0 border-bottom border-dark text-center c1 text-white">Earnings</p>
              <p class="m-0 text-center">&nbsp;</p>
              <p class="m-0 text-center">₱{{ workDaysTotal }}</p>
              <p class="m-0 text-center">{{ '₱' + ((Number(singlePayment.allowance).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</p>
              <p class="m-0">&nbsp;</p>
              <p class="m-0 text-center">₱{{ otTotal }}</p>
              <p class="m-0 text-center">₱{{ workOnRDTotal }}</p>
              <p class="m-0 text-center">₱{{ regularHolidayTotal }}</p>
              <p class="m-0 text-center">₱{{ specialHolidayTotal }}</p>
              <p class="m-0 text-center">&nbsp;</p>
              <p class="m-0">&nbsp;</p>
              <p class="m-0 text-center">&nbsp;</p>
              <p class="m-0 text-center">&nbsp;</p>
              <p class="m-0 text-center">&nbsp;</p>
              <p class="m-0 text-center">&nbsp;</p>
              <p class="m-0 text-center">&nbsp;</p>
              <p class="m-0 text-center">&nbsp;</p>
              <p class="m-0 text-center">&nbsp;</p>
              <p class="m-0 text-center">&nbsp;</p>
              <p class="m-0 text-center"><span v-show="singlePayment.adjustments > 0">{{ '₱' + (singlePayment.positiveAdjustment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</span><span v-show="singlePayment.adjustments < 0">&nbsp;</span></p>
              <p class="m-0 text-center">&nbsp;</p>
            </div>
            <div class="col-6 p-0">
              <p class="m-0 border-bottom border-dark text-center c1 text-white">Deductions</p>
              <p class="m-0 text-center">&nbsp;</p>
              <p class="m-0 text-center">&nbsp;</p>
              <p class="m-0 text-center">&nbsp;</p>
              <p class="m-0">&nbsp;</p>
              <p class="m-0 text-center">&nbsp;</p>
              <p class="m-0 text-center">&nbsp;</p>
              <p class="m-0 text-center">&nbsp;</p>
              <p class="m-0 text-center">&nbsp;</p>
              <p class="m-0 text-center">&nbsp;</p>
              <p class="m-0">&nbsp;</p>
              <p class="m-0 text-center">{{ '₱' + ((Number(singlePayment.sss).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</p>
              <p class="m-0 text-center">{{ '₱' + ((Number(singlePayment.pag_ibig).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</p>
              <p class="m-0 text-center">{{ '₱' + ((Number(singlePayment.phil_health).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</p>
              <p class="m-0 text-center">{{ '₱' + ((Number(singlePayment.ca_deduction).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</p>
              <p class="m-0 text-center">{{ '₱' + ((Number(singlePayment.sss_loan_deduction).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</p>
              <p class="m-0 text-center">{{ '₱' + ((Number(singlePayment.pi_loan_deduction).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</p>
              <p class="m-0 text-center">{{ '₱' + ((Number(singlePayment.savings).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</p>
              <p class="m-0 text-center">&nbsp;</p>
              <p class="m-0 text-center"><span v-show="singlePayment.adjustments < 0">{{ '₱' + (singlePayment.negativeAdjustment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</span><span v-show="singlePayment.adjustments > 0">&nbsp;</span></p>
            </div>
          </div>  
        </div>
        <div class="col-12  border border-top-0 border-dark">
          <div class="row">
            <div class="col-6 p-0 border-right border-dark">
              <div class="col-12">
                <p class="m-0"><b>Total</b></p>
              </div>
              <div class="col-12 border-top border-dark">
                <p class="m-0">Notes:</p>
                {{ singlePayment.remarks }}
              </div>
            </div>
            <div class="col-6 p-0">
              <div class="row">
                <div class="col-6 p-0 border-right border-dark">
                  <p class="m-0 text-center"><b>₱{{ allEarning }}</b></p>
                </div>
                <div class="col-6 p-0">
                  <p class="m-0 text-center"><b>₱{{ allDeductions }}</b></p>
                </div>
              </div>
              <div class="row">
                <div class="col-12 ">
                  <p class="m-0 text-center c1 border-top border-dark"><b class="text-white">NET PAY</b></p>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <p class="m-0 text-center pt-2 pb-2 netPay c2"><b>{{ '₱' + ((Number(singlePayment.total_paid).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) }}</b></p>
                </div>
              </div>
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
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import axios from 'axios'
import emberLoader from '@/components/emberLoader.vue'
import Confirmation from '@/components/Confirmation.vue'
export default {
  components: {
    sidebar,
    Datetime,
    emberLoader,
    Confirmation,
    sidebar2
  },
  name: 'PaymentView',
  data: function () {
    return {
      frmDate: '',
      toDate: '',
      minDatetime: '',
      paymentList: true,
      paymentPeriods: [],
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
      doLoad: false,
      starting_date: '',
      end_date: '',
      errStart: false,
      errEnd: false,
      creationOK: false,
      confirmationPage: false,
      paidAgents: [],
      singlePayment: {
        total_paid: 0,
        work_days: 0,
        rate: 0,
        ot_hours: 0,
        ot_rates: 0,
        rest_days: 0,
        rest_day_rate: 0,
        regular_holiday: 0,
        regular_holiday_rate: 0,
        special_holiday: 0,
        special_holiday_rate: 0,
        sss: 0,
        pag_ibig: 0,
        phil_health: 0,
        savings: 0,
        ca_deduction: 0,
        loan_sss: 0,
        loan_pag_ibig: 0,
        adjustments: 0,
        allowance: 0,
        positiveAdjustment: 0,
        negativeAdjustment: 0,
        employment_date: '',
        title: '',
        email: '',
        starting_date: '',
        end_date: '',
        agent_id: ''
      },
      searchAgentName: '',
      searchStatus: '',
      admin: true,
      searchingFor: '',
      isDeleting: false,
      confirmStatus: 'payment',
      deletingPeriodID: '',
      successDeletion: false,
      deletingOneID: '',
      viewingID: '',
      completingID: '',
      successCompletion: false,
      canPay: false,
      editAdjustment: '',
      editRemarks: '',
      adjustmentSign: true,
      editingAdjustmentID: '',
      allEarning: 0,
      allDeductions: 0,
      workDaysTotal: 0,
      otTotal: 0,
      workOnRDTotal: 0,
      regularHolidayTotal: 0,
      specialHolidayTotal: 0,
      deletingId: ''
    }
  },
  created: function () {
    this.doLoad = true
    let self = this
    axios.get('api/user').then(response => {
      self.userLevel = response.data.user_level
      if(response.data.user_level === "0") {
        self.admin = false
      } else {
        self.admin = true
      }
      self.userAgentID = response.data.agent_id
    }).catch(error => {
      console.log(error)
    })
    this.showTable()
    this.callPeriod()
  },
  watch: {
    starting_date: function (val) {
      if(val !== ''){
        document.querySelector('.clPaymentStart').classList.remove('has-error')
        this.errStart = false
      }
    },
    end_date: function (val) {
      if(val !== ''){
        document.querySelector('.clPaymentEnd').classList.remove('has-error')
        this.errEnd = false
      }
    }
  },
  methods: {
    callPeriod () {
      let self = this
      axios.get('api/paymentperiod/period').then(response => {
        if(response.data.status === 'success'){
          self.canPay = true
        } else {
          self.canPay = false
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
    fromDateChoosen () {
      this.minDatetime = this.starting_date
    },
    showPaymentDetails (id) {
      if (this.isDeleting) {

      } else {
        this.viewingID = id
        this.doLoad = true
        this.paymentList = false
        let self = this
        axios.get('api/paymentperiod/agents/' + id).then(response => {
          if(response.data.status === 'success'){
            self.paidAgents = response.data.data.data
            self.isSearching = false
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
          self.doLoad = false
        }).catch(error => {
          console.log(error)
        })
      }
    },
    newPayment () {
      this.$router.push('/payment/new')
    },
    showTable () {
      //this.doLoad = true
      let self = this
      axios.get('api/paymentperiod').then(response => {
        if(response.data.status === 'success'){
          self.paymentPeriods = response.data.data.data
          self.isSearching = false
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
        console.log(url)
        axios.get(url).then(response => {
          self.isSearching = false
          self.paymentPeriods = response.data.data.data
          self.paidAgents = response.data.data.data
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
          self.paymentPeriods = response.data.data.data
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
    addPaymentPeriod () {
      self = this
      this.$validator.validateAll('create').then((result) => {
        if (result) {
          self.doLoad = true
          this.confirmStatus = 'payment'
          this.confirmationPage = true
          setTimeout(function(){ self.doLoad = false }, 1000)
        } else {
          if(self.starting_date === ''){
            document.querySelector('.clPaymentStart').classList.add('has-error')
            this.errStart = true
          }
          if(self.end_date === ''){
            document.querySelector('.clPaymentEnd').classList.add('has-error')
            this.errEnd = true
          }
        }
      });
    },
    cancel () {
      this.isDeleting = false
      this.confirmationPage = false
    },
    confirm () {
      if( this.confirmStatus === 'onePayment') {
        this.finalDeleteOnePayment()
      } else if ( this.confirmStatus === 'deletePeriod' ) {
        this.deletePeriod()
      } else if ( this.confirmStatus === 'completePayment') {
        this.ajaxCompletePayment()
      } else if ( this.confirmStatus === 'editAdjustment') {
        this.finalEditAdjusment()
      }else {
        this.newPaymentPeriod()
      }
    },
    newPaymentPeriod () {
      this.doLoad = true
      let self = this
      let data = {
        starting_date: this.starting_date.split('T')[0],
        end_date: this.end_date.split('T')[0]
      }
      axios.post('api/paymentperiod/new', data).then(response => {
        if(response.data.status === 'success'){
          self.showTable()
          self.doLoad = false
          self.starting_date = ''
          self.end_date = ''
          self.creationOK = true
          setTimeout(function(){ self.creationOK = false }, 7000)
          self.confirmationPage = false
          self.canPay = true
        }
      }).catch(error => {
        console.log(error)
        self.doLoad = false
      })
    },
    viewPaymentAgent (id) {
      //this.doLoad = true
      this.paymentList = false
      let self = this
      axios.get('api/paymentperiod/payment/' + id).then(response => {
        self.singlePayment = response.data.data
        if(self.singlePayment.adjustments > 0) {
          self.singlePayment.positiveAdjustment = self.singlePayment.adjustments
          self.singlePayment.negativeAdjustment = 0
        } else {
          self.singlePayment.positiveAdjustment = 0
          self.singlePayment.negativeAdjustment = self.singlePayment.adjustments.toString().substr(1)
        }
        //EARNINGS
        //WORK DAYS
        let test = (self.singlePayment.rate * this.singlePayment.work_days).toFixed(2)
        self.workDaysTotal = ((Number(test)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        //ADJUSTMENT
        let test1 = self.singlePayment.positiveAdjustment
        //OT
        let preciseRate = Number(self.singlePayment.rate)
        let preciseOtRate = Number(self.singlePayment.ot_rates)
        let preciseOtRendered = Number(self.singlePayment.ot_hours)
        let test2 = ((((preciseOtRate / 100) * preciseRate) + preciseRate) / 8) * preciseOtRendered
        self.otTotal = (test2.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        //REST DAY
        let test3 = (((self.singlePayment.rest_day_rate / 100) * self.singlePayment.rate) * self.singlePayment.rest_days).toFixed(2)
        self.workOnRDTotal = ((Number(test3)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        //REGULAR HOLIDAY
        let test4 = (((self.singlePayment.regular_holiday_rate / 100) * self.singlePayment.rate) * self.singlePayment.regular_holiday).toFixed(2)
        self.regularHolidayTotal = ((Number(test4)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        //SPECIAL HOLIDAY
        let test5 = (((self.singlePayment.special_holiday_rate / 100) * self.singlePayment.rate) * self.singlePayment.special_holiday).toFixed(2)
        self.specialHolidayTotal = ((Number(test5)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        //TOTAL
        let totalEarning = Number(test) + Number(test1) + Number(test2) + Number(test3) + Number(test4) + Number(test5) + Number(self.singlePayment.allowance)
        self.allEarning = ((Number(totalEarning)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

        //DEDUCTIONS
        //SSS
        let nega1 = Number(self.singlePayment.sss)
        //PAGIBIG
        let nega2 = Number(self.singlePayment.pag_ibig)
        //PHILHEALTH
        let nega3 = Number(self.singlePayment.phil_health)
        //SAVINGS
        let nega4 = Number(self.singlePayment.savings)
        //CA
        let nega5 = Number(self.singlePayment.ca_deduction)
        //ADJUSTMENT
        let nega6 = Number(self.singlePayment.negativeAdjustment)
        //LOAN SSS
        let nega7 = Number(self.singlePayment.sss_loan_deduction)
        //LOAN PAG-IBIG
        let nega8 = Number(self.singlePayment.pi_loan_deduction)
        //Deduction
        let totalDeductions = nega1 + nega2 + nega3 + nega4 + nega5 + nega6 + nega7 + nega8
        self.allDeductions = ((Number(totalDeductions)).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        $('#mdlAgentPayment').modal('show')
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
      axios.post('api/paymentperiod/search', data).then(response => {
        if(response.data.status === 'success'){
          self.isSearching = true
          self.paymentPeriods = response.data.data.data
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
          self.searchingFor = self.searchAgentName
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
    deletePayment (id) {
      this.doLoad = true
      this.isDeleting = true
      this.confirmStatus = 'deletePeriod'
      this.confirmationPage = true
      this.deletingPeriodID =  id
      let self = this
      setTimeout(function(){ self.doLoad = false }, 1000)
    },
    deletePeriod () {
      this.doLoad = true
      let self = this
      let data = {
        id: this.deletingPeriodID
      }
      axios.post('api/paymentperiod/delete', data).then(response => {
        self.isDeleting = false
        self.confirmStatus = 'payment'
        self.successDeletion = true
        setTimeout(function(){ self.successDeletion = false }, 5000)
        self.showTable()
        self.confirmationPage = false
        self.doLoad = false
      }).catch(error => {
        console.log(error)
        self.doLoad = false
      })
    },
    deleteOnePayment (id, agentID) {
      this.doLoad = true
      this.confirmStatus = 'onePayment'
      this.confirmationPage = true
      this.deletingOneID =  id
      let self = this
      this.deletingId = agentID
      setTimeout(function(){ self.doLoad = false }, 1000)
    },
    finalDeleteOnePayment () {
      this.doLoad = true
      let self = this
      let data = {
        id: this.deletingOneID,
        agent_id: this.deletingId
      }
      axios.post('api/payment/delete', data).then(response => {
        $('#mdlAgentPayment').modal('hide')
        self.confirmStatus = 'payment'
        self.successDeletion = true
        setTimeout(function(){ self.successDeletion = false }, 5000)
        self.isDeleting = false
        self.showPaymentDetails(self.viewingID)
        self.confirmationPage = false
        self.doLoad = false
      }).catch(error => {
        console.log(error)
        self.doLoad = false
      })
    },
    completePayment (id) {
      this.doLoad = true
      this.isDeleting = true
      this.confirmStatus = 'completePayment'
      this.confirmationPage = true
      this.completingID =  id
      let self = this
      setTimeout(function(){ self.doLoad = false }, 1000)
    },
    ajaxCompletePayment () {
      this.doLoad = true
      let self = this
      let data = {
        id: this.completingID
      }
      axios.post('api/paymentperiod/complete', data).then(response => {
        self.isDeleting = false
        self.confirmStatus = 'payment'
        self.successCompletion = true
        setTimeout(function(){ self.successCompletion = false }, 5000)
        self.showTable()
        self.confirmationPage = false
        self.doLoad = false
      }).catch(error => {
        console.log(error)
        self.doLoad = false
      })
    },
    editAdjustments () {
      if(this.singlePayment.adjustments > 0) {
        this.adjustmentSign = true
        this.editAdjustment = this.singlePayment.adjustments
      } else {
        this.editAdjustment = this.singlePayment.adjustments.toString().substr(1)
        this.adjustmentSign = false
      }
      this.editingAdjustmentID = this.singlePayment.id
      this.editRemarks = this.singlePayment.remarks
      $('#mdlPaymentAdjust').modal('show')
      $('#mdlAgentPayment').modal('hide')
    },
    cancelEdit () {
      $('#mdlPaymentAdjust').modal('hide')
      if(this.admin){
        $('#mdlAgentPayment').modal('show')
      }
    },
    changeAdjustments () {
      if(this.adjustmentSign) {
        this.adjustmentSign = false
      } else {
        this.adjustmentSign = true
      }
    },
    confirmEdit () {
      this.doLoad = true
      this.confirmStatus = 'editAdjustment'
      this.confirmationPage = true
      let self = this
      setTimeout(function(){ self.doLoad = false }, 1000)
    },
    finalEditAdjusment () {
      this.doLoad = true
      let self = this
      let data = {
        id: this.editingAdjustmentID,
        adjustments: this.editAdjustment,
        adjustmentSign: this.adjustmentSign,
        remarks: this.editRemarks
      }
      axios.post('api/payment/adjustment', data).then(response => {
        self.confirmStatus = 'payment'
        $('#mdlPaymentAdjust').modal('hide')
        // self.successCompletion = true
        // setTimeout(function(){ self.successCompletion = false }, 5000)
        self.confirmationPage = false
        self.doLoad = false
        if(!this.admin) {
          self.isDeleting = false
          self.showPaymentDetails(self.viewingID)
        } else{
          self.viewPaymentAgent(self.editingAdjustmentID)
        }
      }).catch(error => {
        console.log(error)
        self.doLoad = false
      })
    },
    editAdjustmentForNonAdmin (id, amount, remarks) {
      this.singlePayment.id = id
      this.singlePayment.adjustments = amount
      this.singlePayment.remarks = remarks
      this.editAdjustments()
    },
    print () {
      //$('#mdlAgentPayment').modal('hide')
      // const modal = document.getElementById("mdlAgentPayment")
      // const cloned = modal.cloneNode(true)
      // let section = document.getElementById("print")

      // if (!section) {
      //    section  = document.createElement("div")
      //    section.id = "print"
      //    document.body.appendChild(section)
      // }

      // section.innerHTML = "";
      // section.appendChild(cloned);
      window.print();
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
  /* floating button */
  #floating-button{
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background: #01579b;
    position: fixed;
    bottom: 30px;
    right: 30px;
    cursor: pointer;
    box-shadow: 0px 2px 5px #666;
  }

  .plus{
    color: white;
    position: absolute;
    top: 0;
    display: block;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    padding: 0;
    margin: 0;
    line-height: 55px;
    font-size: 38px;
    font-family: 'Roboto';
    font-weight: 300;
    animation: plus-out 0.3s;
    transition: all 0.3s;
  }

  #container-floating{
    position: fixed;
    width: 55px;
    height: 55px;
    bottom: 30px;
    right: 30px;
    z-index: 50px;
  }
  #container-floating:hover{
    height: 400px;
    width: 90px;
    padding: 30px;
  }

  #container-floating:hover .plus{
    animation: plus-in 0.15s linear;
    animation-fill-mode: forwards;
  }

  .edit{
    position: absolute;
    top: 0;
    display: block;
    bottom: 0;
    left: 0;
    display: block;
    right: 0;
    padding: 0;
    opacity: 0;
    margin: auto;
    line-height: 55px;
    transform: rotateZ(-70deg);
    transition: all 0.3s;
    animation: edit-out 0.3s;
    color: white;
    text-align: center;
  }
  #container-floating:hover .edit{
    animation: edit-in 0.2s;
     animation-delay: 0.1s;
    animation-fill-mode: forwards;
  }

  @keyframes edit-in{
      from {opacity: 0; transform: rotateZ(-70deg);}
      to {opacity: 1; transform: rotateZ(0deg);}
  }

  @keyframes edit-out{
      from {opacity: 1; transform: rotateZ(0deg);}
      to {opacity: 0; transform: rotateZ(-70deg);}
  }

  @keyframes plus-in{
      from {opacity: 1; transform: rotateZ(0deg);}
      to {opacity: 0; transform: rotateZ(180deg);}
  }

  @keyframes plus-out{
      from {opacity: 0; transform: rotateZ(180deg);}
      to {opacity: 1; transform: rotateZ(0deg);}
  }

  .tooltiptext {
    visibility: hidden;
    width: 170px;
    background-color: #455a64;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    /* Position the tooltip */
    position: absolute;
    z-index: 1;
    top: 355px;
    right: 75%;
  }

  .cstmtooltip:hover .tooltiptext {
    visibility: visible;
  }
  /* End floating button */
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
  .divOuterTable {
    overflow-x: scroll;
  }
  /* The Modal (background) */
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

  .notPointer {
    cursor: auto !important;
  }
  .modal {
    overflow-y:auto;
  }
  .customLabelPercent {
    font-size: 24px;
    color: white;
    width: 55px;
    padding: 5px;
    text-align: center;
    cursor: pointer;
  }
  .customLabelPercent2 {
    font-size: 24px;
    color: white;
    width: 55px;
    padding: 5px;
    padding-left: 6px;
    text-align: center;
    cursor: pointer;
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
      z-index: 100000000000000;
      padding: 40px;
      padding-top: 100px;
      font-size: 18px;
      background-repeat: no-repeat;
      background-size: cover;
    }
    @page {
      size: auto;   /* auto is the initial value */
      margin: 0;  /* this affects the margin in the printer settings */
    }
    .cnfdtl {
      font-size: 48px !important;
    }
    .netPay {
      font-size: 28px !important;
    }
    .c1 {
      background-color: #3F704D;
    }
    .c2 {
      background-color: #D0F0C0;
    }
    .logoPNG {
      margin-top: 10px;
      margin-left: 10px;
    }
  }
</style>
