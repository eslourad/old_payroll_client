<template>
  <div class="">
    <transition name="fade">
      <div id="emberloader" v-show="doLoad">
        <emberLoader></emberLoader>
      </div>
    </transition>
    <transition name="fadeMain">
      <div v-show="!confirmationPage">
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
                <span>Brand Specialist Registration</span>
              <i class="material-icons iconAlign float-right">more_vert</i></span>
            </div>
            <!-- End Title -->
            <div class="bgDiv">
              <!-- Search -->
              <div class="row">
                <div class="col-md-12 formRow col-lg-6 col-xl-3">
                  <p class="headerTitleText ml-1">Employment Requirements - 02</p>
                  <div class="eachInputUpl">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">SSS <br />Number</div>
                      </div>
                      <input type="text" class="form-control customText" v-model="agentSSS"  placeholder="enter sss number" v-validate="'required|numeric|max:50'" name="sss number">
                    </div>
                  </div>
                  <div class="row pl-4 text-danger small">
                    <span>{{ errors.first('sss number') }}</span>
                  </div>
                  <div class="eachInputUpl">
                    <button class="btn btnUpload" @click="uploadSss">{{ btnSSS }}</button>
                    <input type="file" id="uplsss" class="hiddenUploads" @change='onSSSChange($event)' v-validate="'image'" name="sss form/id">
                  </div>
                  <div class="row pl-4 text-danger small">
                    <span>{{ errors.first('sss form/id') }}</span>
                  </div>
                  <div class="eachInputUpl">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">Pag-ibig <br />Number</div>
                      </div>
                      <input type="text" class="form-control customText" v-model="agentPagIbig"  placeholder="enter pag-ibig number" v-validate="'required|numeric|max:50'" name="pag-ibig number">
                    </div>
                  </div>
                  <div class="row pl-4 text-danger small">
                    <span>{{ errors.first('pag-ibig number') }}</span>
                  </div>
                  <div class="eachInputUpl">
                    <button class="btn btnUpload" @click="uploadPagIbig">{{ btnPagIbig }}</button>
                    <input type="file" id="uplpagibig" class="hiddenUploads" @change='onPabIbigChange($event)' v-validate="'image'" name="pag-ibig form/id">
                  </div>
                  <div class="row pl-4 text-danger small">
                    <span>{{ errors.first('pag-ibig form/id') }}</span>
                  </div>
                  <div class="eachInputUpl">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">Phil-Health <br />Number</div>
                      </div>
                      <input type="text" class="form-control customText" v-model="agentPhilHealth" placeholder="enter phil-health number" v-validate="'required|numeric|max:50'" name="phil-health number">
                    </div>
                  </div>
                  <div class="row pl-4 text-danger small">
                    <span>{{ errors.first('phil-health number') }}</span>
                  </div>
                  <div class="eachInputUpl">
                    <button class="btn btnUpload" @click="uploadPhileHealth">{{ btnPhilHealth }}</button>
                    <input type="file" id="uplphilhealth" class="hiddenUploads" @change='onPhilHealthChange($event)' v-validate="'image'" name="phil-health form/id">
                  </div>
                  <div class="row pl-4 text-danger small">
                    <span>{{ errors.first('phil-health form/id') }}</span>
                  </div>
                  <p class="headerTitleText ml-1">Banking Information</p>
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">Bank <br />Name</div>
                      </div>
                      <input type="text" class="form-control customText" v-model="agentBankName" placeholder="enter bank name" v-validate="'required|max:255'" name="bank name">
                    </div>
                  </div>
                  <div class="row pl-4 text-danger small">
                    <span>{{ errors.first('bank name') }}</span>
                  </div>
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">Account <br />Name</div>
                      </div>
                      <input type="text" class="form-control customText" v-model="agentAccountName" placeholder="enter account name" v-validate="'required|max:255'" name="account name">
                    </div>
                  </div>
                  <div class="row pl-4 text-danger small">
                    <span>{{ errors.first('account name') }}</span>
                  </div>
                  <div class="eachInput">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">Account <br />Number</div>
                      </div>
                      <input type="text" class="form-control customText" v-model="agentAccountNumber" placeholder="enter account number" v-validate="'required|numeric|max:255'" name="account number">
                    </div>
                  </div>
                  <div class="row pl-4 text-danger small">
                    <span>{{ errors.first('account number') }}</span>
                  </div>
                  <p class="headerTitleText ml-1">Allowance Rate</p>
                  <div class="eachInputUpl">
                    <div class="input-group txtLabels">
                      <div class="input-group-prepend">
                        <div class="input-group-text customLabel text-left">Allowance</div>
                      </div>
                      <input type="text" class="form-control customText" v-model="allowance"  placeholder="enter allowance" v-validate="'required|decimal:2|min_value:0'" name="allowance">
                    </div>
                  </div>
                  <div class="row pl-4 text-danger small">
                    <span>{{ errors.first('allowance') }}</span>
                  </div>
                  <!-- Button -->
                  <div class="eachInput mt-0" v-show="isCreating === '1'">
                    <button type="file" class="footerBtn btn" id="test" @click="nxtPage"><i class="large material-icons">arrow_forward</i></button>
                  </div>
                  <!-- Button -->
                  <div class="eachInput mt-0" v-show="isCreating === '0'">
                    <button type="file" class="footerBtn btn" id="test" @click="nxtPage">Update Agent Information</button>
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
        <Confirmation @confirm="confirm" @cancel="cancel"></Confirmation>
      </div> 
    </transition>
  </div>
</template>
<script>
import axios from 'axios'
import sidebar from '@/components/web/Sidebar.vue'
import sidebar2 from '@/components/web/Sidebar2.vue'
import Confirmation from '@/components/Confirmation.vue'
import emberLoader from '@/components/emberLoader.vue'
export default {
  components: {
    sidebar,
    sidebar2,
    Confirmation,
    emberLoader
  },
  name: 'AgentAdd',
  data: function () {
    return {
      confirmationPage: false,
      agentSSS: '',
      agentPagIbig: '',
      agentPhilHealth: '',
      agentBankName: '',
      agentAccountName: '',
      agentAccountNumber: '',
      doLoad: false,
      isCreating: '',
      admin: false,
      btnSSS: 'UPLOAD FORM / ID',
      btnPagIbig: 'UPLOAD FORM / ID',
      btnPhilHealth: 'UPLOAD FORM / ID',
      allowance: '',
      pic4: '',
      pic5: '',
      pic6: ''
    }
  },
  created: function () {
    this.isCreating = localStorage.isCreating
    if(localStorage["fileName1"] && localStorage["fileSize1"] && localStorage["fileDate1"] && localStorage["fileName2"] && localStorage["fileSize2"] && localStorage["fileDate2"] && localStorage["fileName3"] && localStorage["fileSize3"] && localStorage["fileDate3"] && this.$auth.getPic1() !== '' && this.$auth.getPic2() !== '' && this.$auth.getPic3() !== ''){
      this.agentSSS = localStorage.agentSSS
      this.agentPagIbig = localStorage.agentPagIbig
      this.agentPhilHealth = localStorage.agentPhilHealth
      this.agentBankName = localStorage.agentBankName
      this.agentAccountName = localStorage.agentAccountName
      this.agentAccountNumber = localStorage.agentAccountNumber
      this.allowance = localStorage.allowance
      if(localStorage.admin === 'true') {
        this.admin = true
      } else {
        this.admin = false
      }
    } else {
      this.$router.push('/agent/new/4')
    }
  },
  methods: {
    backMainMenu () {
      localStorage.agentSSS = this.agentSSS || ''
      localStorage.agentPagIbig = this.agentPagIbig || ''
      localStorage.agentPhilHealth = this.agentPhilHealth || ''
      localStorage.agentBankName = this.agentBankName || ''
      localStorage.agentAccountName = this.agentAccountName || ''
      localStorage.agentAccountNumber = this.agentAccountNumber || ''
      localStorage.allowance = this.allowance || ''
      this.$router.push('/agent/new/4')
    },
    nxtPage () {
      let self = this
      this.$validator.validate().then(valid => {
        if (valid) {
          localStorage.agentSSS = this.agentSSS
          localStorage.agentPagIbig = this.agentPagIbig
          localStorage.agentPhilHealth = this.agentPhilHealth
          localStorage.agentBankName = this.agentBankName
          localStorage.agentAccountName = this.agentAccountName
          localStorage.agentAccountNumber = this.agentAccountNumber
          localStorage.allowance = this.allowance
          this.confirmationPage = true
        }
      })
    },
    uploadSss () {
      $('#uplsss').click()
    },
    uploadPagIbig () {
      $('#uplpagibig').click()
    },
    uploadPhileHealth () {
      $('#uplphilhealth').click()
    },
    onSSSChange (event) {
      let self = this
      this.btnSSS = 'Change SSS File'
      let fileReader = new FileReader()
      fileReader.readAsDataURL(event.target.files[0])
      fileReader.onload = (event) => {
        self.pic4 = event.target.result
      }
    },
    onPabIbigChange (event) {
      let self = this
      this.btnPagIbig = 'Change Pag-ibig File'
      let fileReader = new FileReader()
      fileReader.readAsDataURL(event.target.files[0])
      fileReader.onload = (event) => {
        self.pic5 = event.target.result
      }
    },
    onPhilHealthChange (event) {
      let self = this
      this.btnPhilHealth = 'Change Phile-health File'
      let fileReader = new FileReader()
      fileReader.readAsDataURL(event.target.files[0])
      fileReader.onload = (event) => {
         self.pic6 = event.target.result
      }
    },
    confirm () {
      if(this.isCreating === '1') {
        this.create()
      } else {
        this.update()
      }
    },
    create () {
      this.doLoad = true
      let pic1 = this.$auth.getPic1()
      let pic2 = this.$auth.getPic2()
      let pic3 = this.$auth.getPic3()
      let isHsGrad = localStorage.agentIsHSGraduated === 'true' ? 1 : 0
      let isColGrad = localStorage.agentIsColGrad === 'true' ? 1 : 0
      let isTsGrad = localStorage.agentIsTSGrad === 'true' ? 1 : 0
      let dob = localStorage.agentDob.substring(0, localStorage.agentDob.indexOf('T'))
      let emergency_number = localStorage.agentMobileNumber.substring(0, localStorage.agentDob.indexOf('T'))
      let employment_date = localStorage.agentEmployementDate.substring(0, localStorage.agentEmployementDate.indexOf('T'))
      let data = {
        branch_id: localStorage.agentStore || null,
        title: localStorage.agentTitle || null,
        first_name: localStorage.agentFName || null,
        last_name: localStorage.agentLName || null,
        dob: dob || null,
        employment_date: employment_date || null,
        email: localStorage.agentEmail || null,
        mobile_number: localStorage.agentMNumber || null,
        current_address: localStorage.agentCAddress || null,
        permanent_address: localStorage.agentPAddress || null,
        // page 2
        emergency_person: localStorage.agentContactPerson || null,
        emergency_number: emergency_number || null,
        high_school: localStorage.agentHighSchool || null,
        is_hs_grad: isHsGrad,
        // page 3
        company_name: localStorage.agentCompany || null,
        position: localStorage.agentPosition || null,
        from: localStorage.comp1From || null,
        to: localStorage.comp1To || null,
        // page 4
        image_file: pic1 || null,
        image_file_name: localStorage.fileName1 || null,
        image_file_size: localStorage.fileSize1 || null,
        image_date_uploaded: localStorage.fileDate1 || null,
        psa_file: pic2 || null,
        psa_file_name: localStorage.fileName2 || null,
        psa_file_size: localStorage.fileSize2 || null,
        psa_date_uploaded: localStorage.fileDate2 || null,
        nbi_file: pic3 || null,
        nbi_file_name: localStorage.fileName3 || null,
        nbi_file_size: localStorage.fileSize3 || null,
        nbi_date_uploaded: localStorage.fileDate3 || null,
        // page 5
        sss: this.agentSSS || null,
        pag_ibig: this.agentPagIbig || null,
        phil_health: this.agentPhilHealth || null,
        bank_name: this.agentBankName || null,
        account_name: this.agentAccountName || null,
        account_number: this.agentAccountNumber || null,
        allowance: this.allowance || null,
        is_college_grad: isColGrad,
        is_ts_grad: isTsGrad
      }
      if (localStorage.hsYear) {
        data.hs_grad_year = localStorage.hsYear
      } else {
        data.hs_grad_year = ''
      }
      if (localStorage.agentCollege) {
        data.college = localStorage.agentCollege
      } else {
        data.college = ''
      }
      if (localStorage.collegeYear) {
        data.college_grad_year = localStorage.collegeYear
      } else {
        data.college_grad_year = ''
      }
      if (localStorage.agentColCourse) {
        data.college_course = localStorage.agentColCourse
      } else {
        data.college_course = ''
      }
      if (localStorage.tsSchool) {
        data.technical_school = localStorage.tsSchool
      } else {
        data.technical_school = ''
      }
      if (localStorage.agentTSProgram) {
        data.ts_program = localStorage.agentTSProgram
      } else {
        data.ts_program = ''
      }
      if (localStorage.tsYear) {
        data.ts_year = localStorage.tsYear
      } else {
        data.ts_year = ''
      }
      if (localStorage.agentCompany2) {
        data.company_name_two = localStorage.agentCompany2
      } else {
        data.company_name_two = ''
      }
      if (localStorage.agentPosition2) {
        data.position_two = localStorage.agentPosition2
      } else {
        data.position_two = ''
      }
      if (localStorage.comp2From) {
        data.from_two = localStorage.comp2From
      } else {
        data.from_two = ''
      }
      if (localStorage.comp2To) {
        data.to_two = localStorage.comp2To
      } else {
        data.to_two = ''
      }
      if (localStorage.agentCompany3) {
        data.company_name_three = localStorage.agentCompany3
      } else {
        data.company_name_three = ''
      }
      if (localStorage.agentPosition3) {
        data.position_three = localStorage.agentPosition3
      } else {
        data.position_three = ''
      }
      if (localStorage.comp3From) {
        data.from_three = localStorage.comp3From
      } else {
        data.from_three = ''
      }
      if (localStorage.comp3To) {
        data.to_three = localStorage.comp3To
      } else {
        data.to_three = ''
      }
      data.sss_file = this.pic4
      //data.sss_file = this.$pic1
      data.pag_ibig_file = this.pic5
      //data.pag_ibig_file = this.$pic2
      data.phil_health_file = this.pic6
      //data.phil_health_file = this.$pic3

      let self = this
      axios.post('api/agent/new', data).then(response => {
        self.doLoad = false
        self.$auth.setPic1('')
        self.$auth.setPic2('')
        self.$auth.setPic3('')
        self.$router.push('/agent')
      }).catch(error => {
        console.log(error)
        self.doLoad = false
      })
    },
    update () {
      this.doLoad = true
      let pic1 = this.$auth.getPic1()
      let pic2 = this.$auth.getPic2()
      let pic3 = this.$auth.getPic3()
      let isHsGrad = localStorage.agentIsHSGraduated === 'true' ? 1 : 0
      let isColGrad = localStorage.agentIsColGrad === 'true' ? 1 : 0
      let isTsGrad = localStorage.agentIsTSGrad === 'true' ? 1 : 0
      let dob = localStorage.agentDob.substring(0, localStorage.agentDob.indexOf('T'))
      let emergency_number = localStorage.agentMobileNumber.substring(0, localStorage.agentDob.indexOf('T'))
      let employment_date = localStorage.agentEmployementDate.substring(0, localStorage.agentEmployementDate.indexOf('T'))
      let data = {
        id: localStorage.editingID,
        branch_id: localStorage.agentStore || null,
        title: localStorage.agentTitle || null,
        first_name: localStorage.agentFName || null,
        last_name: localStorage.agentLName || null,
        dob: dob || null,
        employment_date: employment_date || null,
        email: localStorage.agentEmail || null,
        mobile_number: localStorage.agentMNumber || null,
        current_address: localStorage.agentCAddress || null,
        permanent_address: localStorage.agentPAddress || null,
        // page 2
        emergency_person: localStorage.agentContactPerson || null,
        emergency_number: emergency_number || null,
        high_school: localStorage.agentHighSchool || null,
        is_hs_grad: isHsGrad,
        // page 3
        company_name: localStorage.agentCompany || null,
        position: localStorage.agentPosition || null,
        from: localStorage.comp1From || null,
        to: localStorage.comp1To || null,
        // page 4
        //image_file: localStorage.upl2x2 || null,
        image_file: pic1,
        image_file_name: localStorage.fileName1 || null,
        image_file_size: localStorage.fileSize1 || null,
        image_date_uploaded: localStorage.fileDate1 || null,
        //psa_file: localStorage.uplpsa || null,
        psa_file: pic2,
        psa_file_name: localStorage.fileName2 || null,
        psa_file_size: localStorage.fileSize2 || null,
        psa_date_uploaded: localStorage.fileDate2 || null,
        //nbi_file: localStorage.uplnbi || null,
        nbi_file: pic3,
        nbi_file_name: localStorage.fileName3 || null,
        nbi_file_size: localStorage.fileSize3 || null,
        nbi_date_uploaded: localStorage.fileDate3 || null,
        // page 5
        sss_file: this.pic4 || localStorage.uplsss,
        sss: this.agentSSS || null,
        pag_ibig_file: this.pic5 || localStorage.uplpagibig,
        pag_ibig: this.agentPagIbig || null,
        phil_health_file: this.pic6 || localStorage.uplphilhealth,
        phil_health: this.agentPhilHealth || null,
        bank_name: this.agentBankName || null,
        account_name: this.agentAccountName || null,
        account_number: this.agentAccountNumber || null,
        allowance: this.allowance || null,
        is_college_grad: isColGrad,
        is_ts_grad: isTsGrad
      }
      if (localStorage.hsYear) {
        data.hs_grad_year = localStorage.hsYear
      } else {
        data.hs_grad_year = ''
      }
      if (localStorage.agentCollege) {
        data.college = localStorage.agentCollege
      } else {
        data.college = ''
      }
      if (localStorage.collegeYear) {
        data.college_grad_year = localStorage.collegeYear
      } else {
        data.college_grad_year = ''
      }
      if (localStorage.agentColCourse) {
        data.college_course = localStorage.agentColCourse
      } else {
        data.college_course = ''
      }
      if (localStorage.tsSchool) {
        data.technical_school = localStorage.tsSchool
      } else {
        data.technical_school = ''
      }
      if (localStorage.agentTSProgram) {
        data.ts_program = localStorage.agentTSProgram
      } else {
        data.ts_program = ''
      }
      if (localStorage.tsYear) {
        data.ts_year = localStorage.tsYear
      } else {
        data.ts_year = ''
      }
      if (localStorage.agentCompany2) {
        data.company_name_two = localStorage.agentCompany2
      } else {
        data.company_name_two = ''
      }
      if (localStorage.agentPosition2) {
        data.position_two = localStorage.agentPosition2
      } else {
        data.position_two = ''
      }
      if (localStorage.comp2From) {
        data.from_two = localStorage.comp2From
      } else {
        data.from_two = ''
      }
      if (localStorage.comp2To) {
        data.to_two = localStorage.comp2To
      } else {
        data.to_two = ''
      }
      if (localStorage.agentCompany3) {
        data.company_name_three = localStorage.agentCompany3
      } else {
        data.company_name_three = ''
      }
      if (localStorage.agentPosition3) {
        data.position_three = localStorage.agentPosition3
      } else {
        data.position_three = ''
      }
      if (localStorage.comp3From) {
        data.from_three = localStorage.comp3From
      } else {
        data.from_three = ''
      }
      if (localStorage.comp3To) {
        data.to_three = localStorage.comp3To
      } else {
        data.to_three = ''
      }

      let self = this
      axios.post('api/agent/update', data).then(response => {
        self.doLoad = false
        if(localStorage.isTLEditing === '0') {
          self.$auth.setPic1('')
          self.$auth.setPic2('')
          self.$auth.setPic3('')
          self.$router.push('/agent')
        } else {
          self.$auth.setPic1('')
          self.$auth.setPic2('')
          self.$auth.setPic3('')
          self.$router.push('/teamlead')
        }
        
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
      height: 90vh;
      min-height: 701px;
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
  }  
  /* Added for froms */
  .footerBtn {
    background-color: #2699FB;
    color: white;
    font-size: 14px;
    font-weight: 700;
    height: 48px;
    max-height: 40px;
    width: 94%;
  }
  .eachInput {
    margin: auto;
    margin-top: 16px;
    height: 50px;
    width: 94%;
  }
  .eachInputUpl {
    margin: auto;
    margin-top: 8px;
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
    color: #2699FB
  }
  .input-group-text {
    background-color: #BCE0FD !important;
    border-radius: 0 !important;
    border-color: #BCE0FD;
  }
  .btnUpload {
    background-color: #2699FB;
    color: white;
    font-weight: 700;
    height: 40px;
    width: 100%;
  }
  .hiddenUploads {
    display: none;
  }
  .headerTitleText {
    font-size: 12px;
    margin-bottom: 0px;
    margin-top: 16px;
    color: #2699FB;
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
  }
  @media (min-width: 992px) {
    .formRow {
      border: 1px solid #79C0FD;
      border-radius: 5px;
    }
  }
  /* End Added for froms */
</style>
