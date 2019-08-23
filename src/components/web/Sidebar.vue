<template>
  <!-- Sidebar -->
  <div id="mySidebar">
    <div class="s-layout__sidebar">
      <a class="s-sidebar__trigger">
        <i class="material-icons myMenuIcon">menu</i>
      </a>
      <nav class="s-sidebar__nav style-2  ">
        <ul>
          <li @click="dashboard">
            <a class="s-sidebar__nav-link">
              <i class="material-icons myIcons">dashboard</i><em>Dashboard</em>
            </a>
          </li>
          <li @click="payments">
            <a class="s-sidebar__nav-link">
              <i class="material-icons myIcons">payment</i><em>Process Payments</em>
            </a>
          </li>
          <li @click="rates" >
            <a class="s-sidebar__nav-link">
              <i class="material-icons myIcons">trending_up</i><em>Store</em>
            </a>
          </li>
          <li @click="teamLeader">
            <a class="s-sidebar__nav-link">
              <i class="material-icons myIcons">star</i><em>Team Leader</em>
            </a>
          </li>
          <li @click="agents">
            <a class="s-sidebar__nav-link">
              <i class="material-icons myIcons">people</i><em>Brand Specialist</em>
            </a>
          </li>
          <li @click="deductions" >
            <a class="s-sidebar__nav-link">
              <i class="material-icons myIcons">insert_chart</i><em>Deductions / Deposits</em>
            </a>
          </li>
          <li @click="savings" >
            <a class="s-sidebar__nav-link">
              <i class="material-icons myIcons">monetization_on</i><em>Savings / CA</em>
            </a>
          </li>
          <li @click="reports" >
            <a class="s-sidebar__nav-link">
              <i class="material-icons myIcons">pie_chart</i><em>Report</em>
            </a>
          </li>
          <li @click="announcements">
            <a class="s-sidebar__nav-link">
              <i class="material-icons myIcons">announcement</i><em>Announcements</em>
            </a>
          </li>
          <li @click="settings">
            <a class="s-sidebar__nav-link">
              <i class="material-icons myIcons">settings</i><em>Settings</em>
            </a>
          </li>
          <li @click="logout">
            <a class="s-sidebar__nav-link">
              <i class="material-icons myIcons">subdirectory_arrow_left</i><em>Logout</em>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'WebDashboard',
  // props: {
  //   admin: {
  //     type: Boolean
  //   }
  // },
  data: function () {
    return {
    }
  },
  created: function () {
  },
  methods: {
    logout () {
      this.doLoad = true
      let self = this
      axios.get('api/user/logout').then(response => {
        this.doLoad = false
        this.$auth.destroyToken()
        this.$router.push('/login')
      }).catch(error => {
        console.log(error)
      })
      
    },
    dashboard () {
      this.$router.push('/dashboard')
    },
    agents () {
      this.$router.push('/agent')
    },
    payments () {
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
    teamLeader () {
      this.$router.push('/teamlead')
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #mySidebar {
    float: left !important;
    z-index: 100 !important;
    margin-top: 0 !important;
  }
  .myIcons {
    margin-top: 20px;
    margin-left: 20px;
  }
  .myMenuIcon {
    margin: 0 !important;
    margin-left: 20px !important;
    margin-top: 20px !important;
  }
  /* Primary Styles */
  *, *::before, *::after {
    box-sizing: border-box;
  }
  body {
    font-family: sans-serif;
    font-size: 1em;
  }
  h1 {
    font-size: 1.4em;
  }
  em {
    font-style: normal;
  }
  a {
    text-decoration: none;
    color: inherit;
  } 
  /* Layout */
  .s-layout {
    display: flex;
    width: 100%;
    min-height: 100vh;
  }
  .s-layout__content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
  /* Sidebar */
  .s-sidebar__trigger {
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0 ;
    width: 100%;
    height: 4em;
    background: #2699FB;
  }
  .s-sidebar__trigger > i {
    display: inline-block;
    margin: 1.5em 0 0 1.5em;
    color: #fafafa;
  }
  .s-sidebar__nav {
    overflow-y: scroll;
    overflow-x: hidden;
    position: fixed;
    top: 0;
    left: -15em;
    transition: all .3s ease-in;
    width: 15em;
    height: 100vh;
    background: #2699FB;
    color: white;
    margin-top: 0 !important;
  }
  .s-sidebar__nav:hover,
  .s-sidebar__nav:focus,
  .s-sidebar__trigger:focus + .s-sidebar__nav,
  .s-sidebar__trigger:hover + .s-sidebar__nav {
    left: 0;
  }
  .s-sidebar__nav ul {
    position: absolute;
    top: 4em;
    left: 0;
    margin: 0;
    padding: 0;
    width: 15em;
  }
  .s-sidebar__nav ul li {
     width: 100%;
  }
  .s-sidebar__nav-link {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 4em;
    cursor: pointer;
  }
  .s-sidebar__nav-link em {
    position: absolute;
    top: 50%;
    left: 4em;
    transform: translateY(-50%);
  }
  .s-sidebar__nav-link:hover {
    background: #fafafa;
    color: #2699FB !important;
  }
  .s-sidebar__nav-link > i {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 4em;
    height: 4em;
  }
  .s-sidebar__nav-link > i::before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .s-sidebar__nav,
  .s-sidebar__trigger + .s-sidebar__nav {
    z-index: 100 !important;
  }
  /* Mobile First */
 /* @media (min-width: 1px) {
    .s-sidebar__nav {
      overflow-y: scroll;
    }
    .s-sidebar__trigger {
      display: none;
    }
    .s-sidebar__nav:hover,
    .s-sidebar__nav:focus,
    .s-sidebar__trigger:hover + .s-sidebar__nav,
    .s-sidebar__trigger:focus + .s-sidebar__nav {
      width: 15em;
      z-index: 100 !important;
    }
    .s-sidebar__trigger {
      z-index: 101 !important
    }
  }*/
  @media (min-width: 1px) {
    .s-sidebar__nav {
      overflow-y: none !important;
    }
  }
  @media (min-width: 42em) {
    .s-layout__content {
      margin-left: 4em;
    }
     /* Sidebar */
    .s-sidebar__trigger {
      display: none;
      width: 0px;
    }
    .s-sidebar__nav {
      width: 4em;
      left: 0;
    }
    .s-sidebar__nav:hover,
    .s-sidebar__nav:focus,
    .s-sidebar__trigger:hover + .s-sidebar__nav,
    .s-sidebar__trigger:focus + .s-sidebar__nav {
      width: 15em;
      z-index: 100 !important;
    }
    .s-sidebar__nav ul {
      top: 15px;
    }
  }

  @media (min-width: 1600px) {
    .s-layout__content {
      margin-left: 15em;
    }
    /* Sidebar */
    .s-sidebar__trigger {
      display: none
    }
    .s-sidebar__nav {
      width: 15em;
    }
    .s-sidebar__nav ul {
      top: 15px;
    }
  }
</style>
