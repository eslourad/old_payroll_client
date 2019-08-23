<template>
  <div class="">
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
                  <p class="headerTitleText ml-1">Employment Requirements - 01</p>
                  <div class="fileDiv">
                    <div class="col-md-12 text-center">
                      <p class="fileLabel">2X2 ID PHOTO</p>
                    </div>
                    <div class="col-md-12 text-center">
                      <div v-show="isCreating === '1' || overRide1">
                        <div id="preview" class="uploadPicSize ml-auto mr-auto mt-1 mb-1" v-show="showPreview1"></div>
                        <p class="fileIconP" v-show="!showPreview1"><i class="material-icons fileIcon">folder</i></p>
                      </div>
                      <div v-show="isCreating1 === '0'" class="uploadPicSize ml-auto mr-auto mt-1 mb-1">
                        <img :src="'http://server.solarace.com.ph/uploads/' + editFileName1" alt="2x2" height="100" width="100">
                      </div>
                    </div>
                    <div class="col-md-12 text-center">
                      <p class="fileName">{{ fileName1 }}<span v-show="!showPreview1">(File Name)</span></p>
                    </div>
                    <div class="col-md-12 text-center small">
                      <span class="fileSize">{{ fileSize1 }}<span v-show="!showPreview1">(Size)</span></span><span class="fileDateUploaded">{{ fileDate1 }}<span v-show="!showPreview1">(Date)</span></span>
                    </div>
                    <div class="col-md-12 text-center">
                      <button class="btn btnUpload" @click="upload2x2">UPLOAD</button>
                    </div>
                    <input type="file" id="upl2x2" class="hiddenUploads" @change="previewFiles($event)" v-validate="'required|image'" name="2x2 ID photo">
                  </div>
                  <div class="row pl-4 mt-1 mb-0 pb-2 text-danger small">
                    <span>{{ errors.first('2x2 ID photo') }}</span>
                  </div>
                  <div class="fileDiv">
                    <div class="col-md-12 text-center">
                      <p class="fileLabel">PSA - BIRTH CERTIFICATE</p>
                    </div>
                    <div class="col-md-12 text-center">
                      <div v-show="isCreating === '1' || overRide2">
                        <div id="preview2" class="uploadPicSize ml-auto mr-auto mt-1 mb-1" v-show="showPreview2"></div>
                        <p class="fileIconP" v-show="!showPreview2"><i class="material-icons fileIcon">folder</i></p>
                      </div>
                      <div v-show="isCreating2 === '0'" class="uploadPicSize ml-auto mr-auto mt-1 mb-1">
                        <img :src="'http://server.solarace.com.ph/uploads/' + editFileName2" alt="2x2" height="100" width="100">
                      </div>
                    </div>
                    <div class="col-md-12 text-center">
                      <p class="fileName">{{ fileName2 }}<span v-show="!showPreview2">(File Name)</span></p>
                    </div>
                    <div class="col-md-12 text-center small">
                      <span class="fileSize">{{ fileSize2 }}<span v-show="!showPreview2">(Size)</span></span><span class="fileDateUploaded">{{ fileDate2 }}<span v-show="!showPreview2">(Date)</span></span>
                    </div>
                    <div class="col-md-12 text-center">
                      <button class="btn btnUpload" @click="uploadPsa">UPLOAD</button>
                    </div>
                    <input type="file" id="uplpsa" class="hiddenUploads" @change="previewFiles2($event)" v-validate="'required|image'" name="birth certificate">
                  </div>
                  <div class="row pl-4 mt-1 mb-0 pb-2 text-danger small">
                    <span>{{ errors.first('birth certificate') }}</span>
                  </div>
                  <div class="fileDiv">
                    <div class="col-md-12 text-center">
                      <p class="fileLabel">POLICE / NBI CLEARANCE</p>
                    </div>
                    <div class="col-md-12 text-center">
                      <div v-show="isCreating === '1' || overRide3">
                        <div id="preview3" class="uploadPicSize ml-auto mr-auto mt-1 mb-1" v-show="showPreview3"></div>
                        <p class="fileIconP" v-show="!showPreview3"><i class="material-icons fileIcon">folder</i></p>
                      </div>
                      <div v-show="isCreating3 === '0'" class="uploadPicSize ml-auto mr-auto mt-1 mb-1">
                        <img :src="'http://server.solarace.com.ph/uploads/' + editFileName3" alt="2x2" height="100" width="100">
                      </div>
                    </div>
                    <div class="col-md-12 text-center">
                      <p class="fileName">{{ fileName3 }}<span v-show="!showPreview2">(File Name)</span></p>
                    </div>
                    <div class="col-md-12 text-center small">
                      <span class="fileSize">{{ fileSize3 }}<span v-show="!showPreview2">(Size)</span></span><span class="fileDateUploaded">{{ fileDate3 }}<span v-show="!showPreview3">(Date)</span></span>
                    </div>
                    <div class="col-md-12 text-center">
                      <button class="btn btnUpload" @click="uploadNbi">UPLOAD</button>
                    </div>
                    <input type="file" id="uplnbi" class="hiddenUploads" @change="previewFiles3($event)" v-validate="'required|image'" name="police / nbi clearance">
                  </div>
                  <div class="row pl-4 mt-1 mb-0 pb-2 text-danger small">
                    <span>{{ errors.first('police / nbi clearance') }}</span>
                  </div>
                  <!-- Button -->
                  <div class="buttonDiv text-center">
                    <button class="footerBtn btn" @click="toPageFive"><i class="large material-icons">arrow_forward</i></button>
                  </div>
                  <!-- End Search -->
                </div>         
              </div>
            </div>
            
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>
<script>
import sidebar from '@/components/web/Sidebar.vue'
import sidebar2 from '@/components/web/Sidebar2.vue'
export default {
  components: {
    sidebar,
    sidebar2
  },
  name: 'AgentAdd',
  data: function () {
    return {
      startDate: '',
      endDate: '',
      maxDatetime: '',
      ndate: new Date(),
      confirmationPage: false,
      agent2x2: '',
      showPreview1: false,
      fileName1: '',
      fileSize1: '',
      fileDate1: '',
      showPreview2: false,
      fileName2: '',
      fileSize2: '',
      fileDate2: '',
      showPreview3: false,
      fileName3: '',
      fileSize3: '',
      fileDate3: '',
      isCreating1: '',
      editFileName1: '',
      isCreating2: '',
      editFileName2: '',
      isCreating3: '',
      editFileName3: '',
      isCreating: '',
      admin: false,
      overRide1: false,
      overRide2: false,
      overRide3: false
    }
  },
  created: function () {
    if(localStorage.admin === 'true') {
      this.admin = true
    } else {
      this.admin = false
    }
  },
  mounted: function () {
    if(localStorage.isCreating === '0') {
      if(localStorage['editingFile1']){
        this.isCreating1 = '1'
        this.editFileName1 = localStorage.editingFile1
      } else {
        this.isCreating1 = localStorage.isCreating
        this.editFileName1 = localStorage.fileName1
      }
      if(localStorage['editingFile2']){
        this.isCreating2 = '1'
        this.editFileName2 = localStorage.editingFile2
      } else {
        this.isCreating2 = localStorage.isCreating
        this.editFileName2 = localStorage.fileName2
      }
      if(localStorage['editingFile3']){
        this.isCreating3 = '1'
        this.editFileName3 = localStorage.editingFile3
      } else {
        this.isCreating3 = localStorage.isCreating
        this.editFileName3 = localStorage.fileName3
      }
      this.fileName1 = localStorage.fileName1
      this.fileSize1 = localStorage.fileSize1
      this.fileDate1 = localStorage.fileDate1
      this.fileName2 = localStorage.fileName2
      this.fileSize2 = localStorage.fileSize2
      this.fileDate2 = localStorage.fileDate2
      this.fileName3 = localStorage.fileName3
      this.fileSize3 = localStorage.fileSize3
      this.fileDate3 = localStorage.fileDate3
      this.showPreview1 = true
      this.showPreview2 = true
      this.showPreview3 = true
    } else {
      this.isCreating = '1'
    }
    if(localStorage["agentCompany"] && localStorage["agentPosition"] && localStorage["comp1From"] && localStorage["agentContactPerson"]){
      if(localStorage["upl2x2"]) {
        this.showPreview1 = true
        let image = new Image()
        image.src = localStorage.upl2x2
        image.height = 100
        image.width = 100
        image.id = '2by2'
        $('#preview').append(image)
        this.fileName1 = localStorage.fileName1
        this.fileSize1 = localStorage.fileSize1
        this.fileDate1 = localStorage.fileDate1
      }
      if(localStorage["uplpsa"]) {
        this.showPreview2 = true
        let image = new Image()
        image.src = localStorage.uplpsa
        image.height = 100
        image.width = 100
        image.id = 'psaId'
        $('#preview2').append(image)
        this.fileName2 = localStorage.fileName2
        this.fileSize2 = localStorage.fileSize2
        this.fileDate2 = localStorage.fileDate2
      }
      if(localStorage["uplnbi"]) {
        this.showPreview3 = true
        let image = new Image()
        image.src = localStorage.uplnbi
        image.height = 100
        image.width = 100
        image.id = 'nbiId'
        $('#preview3').append(image)
        this.fileName3 = localStorage.fileName3
        this.fileSize3 = localStorage.fileSize3
        this.fileDate3 = localStorage.fileDate3
      }
    } else {
      this.$router.push('/agent/new/3')
    }
  },
  methods: {
    backMainMenu () {
      this.$router.push('/agent/new/3')
    },
    toPageFive () {
      let self = this
      if(localStorage["upl2x2"] && localStorage["uplpsa"] && localStorage["uplnbi"]) {
        self.$router.push('/agent/new/5')
      } else {
        this.$validator.validate().then(valid => {
          if (valid) {
            self.$router.push('/agent/new/5')
          }
        })
      }
    },
    upload2x2 () {
      $('#upl2x2').click()
    },
    uploadPsa () {
      $('#uplpsa').click()
    },
    uploadNbi () {
      $('#uplnbi').click()
    },
    previewFiles (event) {
      let self = this
      if(localStorage.isCreating === '0') {
        localStorage.editingFile1 = localStorage.fileName1
      }
      let fileReader = new FileReader()
      fileReader.readAsDataURL(event.target.files[0])
      fileReader.onload = (event) => {
        //localStorage.upl2x2 = event.target.result || ''
        self.$auth.setPic1(event.target.result)
        //console.log(self.$auth.getPic1())
      }
      let preview = document.querySelector('#preview')
      let files   = document.querySelector('#upl2x2').files
      $('#preview').empty()
      function readAndPreview(file) {
        // Make sure `file.name` matches our extensions criteria
        if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
          let reader = new FileReader()
          reader.addEventListener("load", function () {
            let image = new Image()
            image.height = 100
            image.width = 100
            image.title = file.name
            image.src = this.result
            image.id = '2by2'
            preview.appendChild( image )
            self.fileName1 = file.name
            localStorage.fileName1 = file.name  || ''
          }, false)
          reader.readAsDataURL(file)
        }
      }
      if (files) {
        [].forEach.call(files, readAndPreview)
      }
      let imgpath = document.getElementById('upl2x2')
      this.fileSize1 = Math.round(((imgpath.files.item(0).size / 1024) * 100) / 100) + 'kb'
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0')
      let mm = String(today.getMonth() + 1).padStart(2, '0')
      let yyyy = today.getFullYear()
      today = mm + '/' + dd + '/' + yyyy
      this.fileDate1 = today
      this.showPreview1 = true
      localStorage.fileSize1 = this.fileSize1 || ''
      localStorage.fileDate1 = this.fileDate1 || ''
      this.isCreating1 = '1'
      this.overRide1 = true
    },
    previewFiles2 (event) {
      let self = this
      if(localStorage.isCreating === '0') {
        localStorage.editingFile2 = localStorage.fileName2
      }
      let fileReader = new FileReader()
      fileReader.readAsDataURL(event.target.files[0])
      fileReader.onload = (event) => {
        //localStorage.uplpsa = event.target.result || ''
        self.$auth.setPic2(event.target.result)
        //console.log(self.$auth.getPic2())
      }
      let preview = document.querySelector('#preview2')
      let files   = document.querySelector('#uplpsa').files
      $('#preview2').empty()
      function readAndPreview(file) {
        // Make sure `file.name` matches our extensions criteria
        if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
          let reader = new FileReader()
          reader.addEventListener("load", function () {
            let image = new Image()
            image.height = 100
            image.width = 100
            image.title = file.name
            image.src = this.result
            image.id = 'psaId'
            preview.appendChild( image )
            self.fileName2 = file.name
            localStorage.fileName2 = file.name || ''
          }, false)
          reader.readAsDataURL(file)
        }
      }
      if (files) {
        [].forEach.call(files, readAndPreview)
      }
      let imgpath = document.getElementById('uplpsa')
      this.fileSize2 = Math.round(((imgpath.files.item(0).size / 1024) * 100) / 100) + 'kb'
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0')
      let mm = String(today.getMonth() + 1).padStart(2, '0')
      let yyyy = today.getFullYear()
      today = mm + '/' + dd + '/' + yyyy
      this.fileDate2 = today
      this.showPreview2 = true
      localStorage.fileSize2 = this.fileSize2 || ''
      localStorage.fileDate2 = this.fileDate2 || ''
      this.isCreating2 = '1'
      this.overRide2 = true
    },
    previewFiles3 (event) {
      let self = this
      if(localStorage.isCreating === '0') {
        localStorage.editingFile3 = localStorage.fileName3
      }
      let fileReader = new FileReader()
      fileReader.readAsDataURL(event.target.files[0])
      fileReader.onload = (event) => {
        //localStorage.uplnbi = event.target.result || ''
        self.$auth.setPic3(event.target.result)
        //console.log(self.$auth.getPic3())
      }
      var preview = document.querySelector('#preview3')
      var files   = document.querySelector('#uplnbi').files
      $('#preview3').empty()
      function readAndPreview(file) {
        // Make sure `file.name` matches our extensions criteria
        if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
          let reader = new FileReader()
          reader.addEventListener("load", function () {
            let image = new Image()
            image.height = 100
            image.width = 100
            image.title = file.name
            image.src = this.result
            image.id = 'imgID'
            preview.appendChild( image )
            self.fileName3 = file.name
            localStorage.fileName3 = file.name || ''
          }, false)
          reader.readAsDataURL(file)
        }
      }
      if (files) {
        [].forEach.call(files, readAndPreview)
      }
      let imgpath = document.getElementById('uplnbi')
      this.fileSize3 = Math.round(((imgpath.files.item(0).size / 1024) * 100) / 100) + 'kb'
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0')
      let mm = String(today.getMonth() + 1).padStart(2, '0')
      let yyyy = today.getFullYear()
      today = mm + '/' + dd + '/' + yyyy
      this.fileDate3 = today
      this.showPreview3 = true
      localStorage.fileSize3 = this.fileSize3 || ''
      localStorage.fileDate3 = this.fileDate3 || ''
      this.isCreating3 = '1'
      this.overRide3 = true
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
  }  
  .fileDiv {
    width: 95%;
    margin: auto;
    border: 1px solid #BCE0FD;
    text-align: center;
    color: #2699FB;
    font-weight: 700;
    font-family: Arial;
    font-size: 20;
    padding-top: 12px;
  }
  .fileLabel {
    margin: 0;
  }
  .fileIcon {
    font-size: 30px !important;
  }
  .fileIconP {
    margin-top: 35px;
    margin-bottom: 22px;
  }
  .fileName {
    margin: 0;
  }
  .fileSize {
    margin: 0;
  }
  .fileDateUploaded {
    margin: 0;
    margin-left: 5px;
  }
  .footerBtn {
    max-width: 343px;
    background-color: #2699FB;
    color: white;
    font-size: 14px;
    font-weight: 700;
    height: 48px;
    max-height: 40px;
    margin: auto;
    width: 100%;
    margin-top: 16px !important;
  }
  .btnUpload {
    background-color: #2699FB;
    color: white;
    font-weight: 700;
    height: 40px;
    width: 80%;
    margin-top: 15px;
    margin-bottom: 10px;
  }
  .hiddenUploads {
    display: none;
  }
  .buttonDiv {
    width: 100%;
  }
  @media (min-width: 1px) {
    .formRow {
      border: none;
      padding-bottom: 20px;
      background-color: #FBFBFB;
      padding-top: 0px;
    }
  }
  @media (min-width: 992px) {
    .formRow {
      border: 1px solid #79C0FD;
      border-radius: 5px;
      padding-top: 20px;
    }
  }
  .headerTitleText {
    font-size: 14px;
    margin-bottom: 10px;
    margin-top: 0px;
    color: #2699FB;
  }
  .uploadPicSize {
    height: 100px;
    width: 100px;
  }
  /* End Added for froms */
</style>
