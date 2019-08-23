<template>
  <div>
    <p class="headerTitleText ml-1">Employment Requirements - 01</p>
    <div class="fileDiv">
      <p class="fileLabel">2X2 ID PHOTO</p>
      <p class="fileIconP"><i class="material-icons fileIcon">folder</i></p>
      <p class="fileName">File Name</p>
      <span class="fileSize">25kb</span><span class="fileDateUploaded">01-27-2019</span>
      <button class="btn btnUpload" @click="upload2x2">UPLOAD</button>
      <input type="file" id="upl2x2" class="hiddenUploads" name="">
    </div>
    <div class="fileDiv">
      <p class="fileLabel">PSA - BIRTH CETIFICATE</p>
      <p class="fileIconP"><i class="material-icons fileIcon">folder</i></p>
      <p class="fileName">File Name</p>
      <span class="fileSize">25kb</span><span class="fileDateUploaded">01-27-2019</span>
      <button class="btn btnUpload" @click="uploadPsa">UPLOAD</button>
      <input type="file" id="uplpsa" class="hiddenUploads" name="">
    </div>
    <div class="fileDiv">
      <p class="fileLabel">POLICE / NBI CLEARANCE</p>
      <p class="fileIconP"><i class="material-icons fileIcon">folder</i></p>
      <p class="fileName">File Name</p>
      <span class="fileSize">25kb</span><span class="fileDateUploaded">01-27-2019</span>
      <button class="btn btnUpload" @click="uploadNbi">UPLOAD</button>
      <input type="file" id="uplnbi" class="hiddenUploads" name="">
    </div>
    <!-- Button -->
    <div class="buttonDiv">
      <button type="file" class="footerBtn btn" id="test" @click="toPageFive"><i class="large material-icons">arrow_forward</i></button>
    </div>
    
  </div>
</template>
<script>
export default {
  components: {
  },
  name: 'AgentAddPage4',
  data: function () {
    return {
    }
  },
  methods: {
    toPageFive () {
      this.$emit('toPageFive')
    },
    upload2x2 () {
      $('#upl2x2').click()
    },
    uploadPsa () {
      $('#uplpsa').click()
    },
    uploadNbi () {
      $('#uplnbi').click()
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .fileDiv {
    width: 95%;
    margin: auto;
    height: 250px;
    border: 1px solid #95989A;
    text-align: center;
    color: #2699FB;
    font-weight: 700;
    font-family: Arial;
    font-size: 20;
    padding-top: 12px;
    margin-bottom: 15px;
  }
  .fileLabel {
    margin: 0;
  }
  .fileIcon {
    font-size: 30px !important;
  }
  .fileIconP {
    margin-top: 25px;
    margin-bottom: 12px;
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
    width: 94%;
    margin-left: 3%;
    margin-top: 16px !important;
  }
  .btnUpload {
    background-color: #2699FB;
    color: white;
    font-weight: 700;
    height: 40px;
    width: 80%;
    margin-top: 40px;
  }
  .hiddenUploads {
    display: none;
  }
</style>
