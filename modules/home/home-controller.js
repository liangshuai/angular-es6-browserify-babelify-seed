const STATE = new WeakMap();

class HomeCtrl {
	constructor(HomeService,$state) {
		this.HomeService = HomeService;
		STATE.set(this,$state);
	}
	goHome() {
		STATE.get(this).go('home');
	}
}

HomeCtrl.$inject = ['HomeService','$state'];
export default HomeCtrl;