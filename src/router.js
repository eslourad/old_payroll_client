import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
//mobile
// import Dashboard from './components/Dashboard.vue'
// import AgentView from './components/agents/AgentView.vue'
// import AgentAdd from './components/agents/AgentAdd.vue'
// import PaymentView from './components/payments/PaymentView.vue'
// import PaymentAdd from './components/payments/PaymentAdd.vue'
// import AnnouncementView from './components/announcements/AnnouncementView.vue'
// import Setting from './components/settings/SettingView.vue'
//web
import WebDashboard from './components/web/Dashboard.vue'
import WebPaymentView from './components/web/payments/PaymentView.vue'
import WebPaymentAdd from './components/web/payments/PaymentAdd.vue'
import WebAnnouncement from './components/web/announcements/Announcement.vue'
import WebSetting from './components/web/settings/Setting.vue'
import WebDeduction from'./components/web/deductions/Deduction.vue'
import WebReport from'./components/web/reports/Report.vue'
import WebRate from'./components/web/rates/Rate.vue'
import WebSaving from'./components/web/savings/Saving.vue'
import WebViewAgent from'./components/web/agents/ViewAgent.vue'
import WebViewAgentAdd from'./components/web/agents/AgentAdd.vue'
import WebViewAgentAddPage2 from'./components/web/agents/AgentAddPage2.vue'
import WebViewAgentAddPage3 from'./components/web/agents/AgentAddPage3.vue'
import WebViewAgentAddPage4 from'./components/web/agents/AgentAddPage4.vue'
import WebViewAgentAddPage5 from'./components/web/agents/AgentAddPage5.vue'
import TeamLead from'./components/web/teamlead/TeamLead.vue'
import Records from'./components/web/user/Records.vue'
 
Vue.use(Router)
// eslint-disable-next-line
let router = new Router({
  mode: '',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
				forVisitors: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
				forVisitors: true
      }
    },
    // {
    //   path: '/m/dashboard',
    //   name: 'Dashboard',
    //   component: Dashboard,
    //   // meta: {
    //   //   forAuth: true
    //   //   // forVisitors: true
    //   // }
    // },
    // {
    //   path: '/m/agent',
    //   name: 'AgentView',
    //   component: AgentView,
    //   // meta: {
    //   //   forAuth: true
    //   //   // forVisitors: true
    //   // }
    // },
    // {
    //   path: '/m/agent/new',
    //   name: 'AgentAdd',
    //   component: AgentAdd,
    //   // meta: {
    //   //   forAuth: true
    //   //   // forVisitors: true
    //   // }
    // },
    // {
    //   path: '/m/payment',
    //   name: 'PaymentView',
    //   component: PaymentView,
    //   // meta: {
    //   //   forAuth: true
    //   //   // forVisitors: true
    //   // }
    // },
    // {
    //   path: '/m/payment/new',
    //   name: 'PaymentAdd',
    //   component: PaymentAdd,
    //   // meta: {
    //   //   forAuth: true
    //   //   // forVisitors: true
    //   // }
    // },
    // {
    //   path: '/m/announcement',
    //   name: 'AnnouncementView',
    //   component: AnnouncementView,
    //   // meta: {
    //   //   forAuth: true
    //   //   // forVisitors: true
    //   // }
    // },
    // {
    //   path: '/m/setting',
    //   name: 'SettingView',
    //   component: Setting,
    //   // meta: {
    //   //   forAuth: true
    //   //   // forVisitors: true
    //   // }
    // },
    // WEB ROUTES
    {
      path: '/dashboard',
      name: 'WebDashboard',
      component: WebDashboard,
      meta: {
        forAuth: true
        // forVisitors: true
      }
    },
    {
      path: '/payment',
      name: 'PaymentView',
      component: WebPaymentView,
      meta: {
        forAuth: true
        // forVisitors: true
      }
    },
    {
      path: '/payment/new',
      name: 'PaymentAdd',
      component: WebPaymentAdd,
      meta: {
        forAuth: true
        // forVisitors: true
      }
    },
    {
      path: '/announcement',
      name: 'Announcement',
      component: WebAnnouncement,
      meta: {
        forAuth: true
        // forVisitors: true
      }
    },
    {
      path: '/setting',
      name: 'Setting',
      component: WebSetting,
      meta: {
        forAuth: true
        // forVisitors: true
      }
    },
    {
      path: '/deduction',
      name: 'Deduction',
      component: WebDeduction,
      meta: {
        forAuth: true
        // forVisitors: true
      }
    },
    {
      path: '/report',
      name: 'Report',
      component: WebReport,
      meta: {
        forAuth: true
        // forVisitors: true
      }
    },
    {
      path: '/rate',
      name: 'Rate',
      component: WebRate,
      meta: {
        forAuth: true
        // forVisitors: true
      }
    },
    {
      path: '/savings',
      name: 'Saving',
      component: WebSaving,
      meta: {
        forAuth: true
        // forVisitors: true
      }
    },
    {
      path: '/agent',
      name: 'Agent',
      component: WebViewAgent,
      meta: {
        forAuth: true
        // forVisitors: true
      }
    },
    {
      path: '/agent/new',
      name: 'AgentAdd',
      component: WebViewAgentAdd,
      meta: {
        forAuth: true
        // forVisitors: true
      }
    },
    {
      path: '/agent/new/2',
      name: 'AgentAddPage2',
      component: WebViewAgentAddPage2,
      meta: {
        forAuth: true
        // forVisitors: true
      }
    },
    {
      path: '/agent/new/3',
      name: 'AgentAddPage3',
      component: WebViewAgentAddPage3,
      meta: {
        forAuth: true
        // forVisitors: true
      }
    },
    {
      path: '/agent/new/4',
      name: 'AgentAddPage4',
      component: WebViewAgentAddPage4,
      meta: {
        forAuth: true
        // forVisitors: true
      }
    },
    {
      path: '/agent/new/5',
      name: 'AgentAddPage5',
      component: WebViewAgentAddPage5,
      meta: {
        forAuth: true
        // forVisitors: true
      }
    },
    {
      path: '/records',
      name: 'Records',
      component: Records,
      meta: {
        forAuth: true
        // forVisitors: true
      }
    },
    {
      path: '/teamlead',
      name: 'TeamLead',
      component: TeamLead,
      meta: {
        forAuth: true
        // forVisitors: true
      }
    }
  ],
  scrollBehavior () {
    // page scroll to top for all route navigations
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.forVisitors)) {
		if (Vue.auth.isAuthenticated()){
			next({path: '/dashboard'})
		} else next()
	} else if (to.matched.some(record => record.meta.forAuth)) {
		if (!Vue.auth.isAuthenticated()){
			next({path: '/login'})
		}else next()
	} else next()
})

export default router
