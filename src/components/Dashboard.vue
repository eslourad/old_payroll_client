<template>
  <transition name="fadeMain">
    <div id="bg-div" class="text-center">
      <div class="appTitle">
        <p>Welcome to SAPPI Payroll</p>
      </div>
      <div class="navOptions">
        <div class="navOptionsItem" @click="payment">
          <p>Process Payments</p>
        </div>
        <div class="navOptionsItem" @click="agents">
          <p>My Agents</p>
        </div>
        <div class="navOptionsItem" @click="agents" v-if="admin">
          <p>Rates</p>
        </div>
        <div class="navOptionsItem" @click="agents" v-if="admin">
          <p>Deductions / Deposits</p>
        </div>
        <div class="navOptionsItem" @click="agents" v-if="admin">
          <p>Savings / CA</p>
        </div>
        <div class="navOptionsItem" @click="agents" v-if="admin">
          <p>Report</p>
        </div>
        <div class="navOptionsItem" @click="announcements">
          <p>Announcements</p>
        </div>
        <div class="navOptionsItem" @click="settings">
          <p>Settings</p>
        </div>
        <div class="navOptionsItem" @click="settings">
          <p>Log Out</p>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Dashboard',
  data: function () {
    return {
      admin: true,
      userID: '',
      branchId: '',
    }
  },
  created: function () {
    let self = this
    axios.get('api/user').then(response => {
      self.userLevel = response.data.user_level
      if(response.data.user_level === 0) {
        self.admin = false
      } else {
        self.admin = true
      }
    }).catch(error => {
      console.log(error)
    })
  }
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
