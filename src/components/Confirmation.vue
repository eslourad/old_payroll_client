<template>
  <div class="overlay ">
    <div class="whiteBG contentDiv">
      <i class="material-icons mainIcon">check</i>
      <p class="confDesc">Are you sure <br />you want to submit?</p>
      <button type="button" @click="confirm" class="btn btn-success btn-circle btn-xl btnYes"><i class="material-icons">check</i></button>
      <button type="button" @click="cancel" class="btn btn-danger btn-circle btn-xl btnNo"><i class="material-icons ">close</i></button>
    </div>
  </div>
</template>
<script>
export default {
  components: {
  },
  name: 'Confirmation',
  data: function () {
    return {
    }
  },
  methods: {
    confirm () {
      this.$emit('confirm')
      //this.$router.push('/dashboard')
    },
    cancel () {
      this.$emit('cancel')
      //this.$router.push('/dashboard')
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .overlay {  
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height: 200%;
    z-index:2000;
    background-color: #ECF7FF;
  }
  @media only screen and (max-width: 320px) {
    .contentDiv{
      width: 94% !important;
    }
  }
  .contentDiv {
    padding-bottom: 14px;
    width: 80%;
    background-color: white;
  }
  .whiteBG {
    background-color: white;
    margin: auto;
    margin-top: 60px;
    text-align: center;
    padding-top: 15px;
    padding-bottom: 50px;
    box-shadow: 1px 8px 20px grey !important;
    -webkit-transition:  box-shadow .3s ease-in !important;
  }
  .whiteBG:hover {

  }
  @media (min-width: 1px) {
    .whiteBG {
      height: 70vh;
      width: 343px;
    }
  }
  @media (min-width: 992px) {
    .whiteBG {
      height: 419px;
      width: 400px;
    }
  }
  .mainIcon {
    font-size: 150px;
    color: #2699FB;
  }
  .confDesc {
    font-family: Arial;
    font-size: 18px;
    margin-top: 30px;
    color: #2699FB;
    margin-bottom: 27px;
  }
  .btnYes {
    margin-right: 30px;
  }
  .btnYes:hover {
    box-shadow: 1px 8px 20px grey !important;
    -webkit-transition:  box-shadow .3s ease-in !important;
  }
  .btnNo {
    margin-left: 30px;
  }
  .btnNo:hover {
    box-shadow: 1px 8px 20px grey !important;
    -webkit-transition:  box-shadow .3s ease-in !important;
  }
  .btn-circle.btn-xl {
    width: 70px;
    height: 70px;
    padding: 10px 16px;
    border-radius: 35px;
    font-size: 12px;
    line-height: 1.42857;
  }
  
</style>
