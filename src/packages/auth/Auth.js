export default function (Vue) {
	let authenticatedUser = {}
	let pic1 = ''
	let pic2 = ''
	let pic3 = ''
	Vue.auth = {
		setToken (token, expiration) {
			localStorage.setItem('token', token)
			localStorage.setItem('expiration', expiration)
		},
		destroyToken () {
			localStorage.removeItem('token')
			localStorage.removeItem('expiration')
		},
		getToken () {
			let token = localStorage.getItem('token')
			let expiration = localStorage.getItem('expiration')
			//console.log('sad')
			//if( !token || !expiration ){
				//return null
			//}

			// if(Date.now() > parseInt(expiration)) {
			// 	this.destroyToken()
			// 	return null
			// } else {
				return token
			//}
		},
		isAuthenticated () {
			if(this.getToken()){
				return true
			} else {
				return false
			}
		},
		setAuthenticatedUser (data) {
			authenticatedUser = data
		},
		getAuthenticatedUser () {
			return authenticatedUser
		},
		setPic1 (data)  {
			pic1 = data
		},
		setPic2 (data)  {
			pic2 = data
		},
		setPic3 (data)  {
			pic3 = data
		},
		getPic1 ()  {
			return pic1
		},
		getPic2 ()  {
			return pic2
		},
		getPic3 ()  {
			return pic3
		}
	}

	Object.defineProperties(Vue.prototype, {
		$auth: {
			get () {
				return Vue.auth
			}
		}
	})
}