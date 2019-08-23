<template>
  <div>
    <p class="headerTitleText ml-1">Employment Requirements - 02</p>
    <div class="eachInputUpl">
      <div class="input-group txtLabels">
        <div class="input-group-prepend">
          <div class="input-group-text customLabel text-left">SSS <br />Number</div>
        </div>
        <input type="text" class="form-control customText"  placeholder="enter sss number">
      </div>
    </div>
    <div class="eachInputUpl">
      <button class="btn btnUpload" @click="uploadSss">UPLOAD FORM / ID</button>
      <input type="file" id="uplsss" class="hiddenUploads" name="">
    </div>
    <div class="eachInputUpl">
      <div class="input-group txtLabels">
        <div class="input-group-prepend">
          <div class="input-group-text customLabel text-left">Pag-ibig <br />Number</div>
        </div>
        <input type="text" class="form-control customText"  placeholder="enter pag-ibig number">
      </div>
    </div>
    <div class="eachInputUpl">
      <button class="btn btnUpload" @click="uploadPagIbig">UPLOAD FORM / ID</button>
      <input type="file" id="uplpagibig" class="hiddenUploads" name="">
    </div>
    <div class="eachInputUpl">
      <div class="input-group txtLabels">
        <div class="input-group-prepend">
          <div class="input-group-text customLabel text-left">Phil-Health <br />Number</div>
        </div>
        <input type="text" class="form-control customText"  placeholder="enter phil-health number">
      </div>
    </div>
    <div class="eachInputUpl">
      <button class="btn btnUpload" @click="uploadPhileHealth">UPLOAD FORM / ID</button>
      <input type="file" id="uplphilhealth" class="hiddenUploads" name="">
    </div>
    <p class="headerTitleText ml-1">Banking Information</p>
    <div class="eachInput">
      <div class="input-group txtLabels">
        <div class="input-group-prepend">
          <div class="input-group-text customLabel text-left">Bank <br />Name</div>
        </div>
        <input type="text" class="form-control customText"  placeholder="enter bank name">
      </div>
    </div>
    <div class="eachInput">
      <div class="input-group txtLabels">
        <div class="input-group-prepend">
          <div class="input-group-text customLabel text-left">Account <br />Name</div>
        </div>
        <input type="text" class="form-control customText"  placeholder="enter account name">
      </div>
    </div>
    <div class="eachInput">
      <div class="input-group txtLabels">
        <div class="input-group-prepend">
          <div class="input-group-text customLabel text-left">Account <br />Number</div>
        </div>
        <input type="text" class="form-control customText"  placeholder="enter account number">
      </div>
    </div>
    <!-- Button -->
    <div class="buttonDiv">
      <button type="file" class="footerBtn btn" id="test" @click="toConfirmation"><i class="large material-icons">arrow_forward</i></button>
    </div>
  </div>
</template>
<script>
export default {
  components: {
  },
  name: 'AgentAddPage5',
  data: function () {
    return {
    }
  },
  methods: {
    toConfirmation () {
      this.$emit('toConfirmation')
    },
    uploadSss () {
      $('#uplsss').click()
    },
    uploadPagIbig () {
      $('#uplpagibig').click()
    },
    uploadPhileHealth () {
      $('#uplphilhealth').click()
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .footerBtn {
    max-width: 343px;
    background-color: #2699FB;
    color: white;
    font-size: 14px;
    font-weight: 700;
    height: 48px;
    max-height: 40px;
    width: 100%;
    margin-left: 3%;
    margin-top: 16px !important;
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
    text-decoration: underline;
    margin-bottom: 0px;
    margin-top: 16px;
  }
</style>
