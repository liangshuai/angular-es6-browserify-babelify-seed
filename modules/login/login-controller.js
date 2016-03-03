const STATE = new WeakMap();

class LoginCtrl {
	constructor(HomeService,$state) {
		this.HomeService = HomeService;
		STATE.set(this,$state);
	}
	goHome() {
		STATE.get(this).go('home');
	}
}

LoginCtrl.$inject = ['HomeService','$state'];
export default LoginCtrl;