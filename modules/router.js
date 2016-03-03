export default ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/login');
	$stateProvider.
		state('login', {
			url: '/login',
			templateUrl: 'login/login.html',
			controller: 'loginCtrl as vm'
		}).
		state('home', {
			url: '/home',
			templateUrl: 'home/home.html',
			controller: 'loginCtrl as vm'
		});
}];