import angular from 'angular';
import uirouter from 'angular-ui-router';
import Router from './router.js';
import Config from './config/config';
import Translate from './translate/translate';
import {default as loginModule} from './login/login';
import {default as homeModule} from './home/home';

angular.module('cssp', [
	uirouter,
	'config',
	'translate',
	loginModule.name,
	homeModule.name
]).
config(Router).
run(function (config) {
});
