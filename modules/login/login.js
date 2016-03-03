import LoginCtrl from './login-controller';
import HomeService from './login-service';

var loginModule = angular.module('cssp.login', []);

loginModule.controller('loginCtrl',LoginCtrl);
loginModule.service('HomeService', HomeService);

export default loginModule;
