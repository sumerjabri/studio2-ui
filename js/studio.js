!function(e){"use strict";var t=e.module("studio",["ngCookies","ui.router","ui.bootstrap"]);t.run(["$rootScope","$state","$stateParams","authService","Constants",function(e,t,r,o,n){e.$state=t,e.$stateParams=r,e.imagesDirectory=n.PATH_IMG,e.$on("$stateChangeStart",function(e,r){-1!==r.name.indexOf("login")||o.isAuthenticated()||(e.preventDefault(),t.go("login"))})}]),t.config(["$stateProvider","$urlRouterProvider",function(e,t){t.otherwise("/sites"),e.state("home",{url:"/","abstract":!0,templateUrl:"templates/home",controller:"AppCtrl"}).state("home.sites",{url:"sites",views:{content:{templateUrl:"templates/sites",controller:"SitesCtrl"}}}).state("home.sites.site",{url:"/:siteId",templateUrl:"templates/site",controller:"SiteCtrl"}).state("home.settings",{url:"settings",views:{content:{templateUrl:"templates/settings",controller:"AppCtrl"}}}).state("login",{url:"/login",onEnter:["$rootScope","$state","$modal",function(e,t,r){e.loginModal=r.open({templateUrl:"templates/login",controller:"LoginCtrl",backdrop:"static",keyboard:!1,size:"sm"}),e.loginModal.result.finally(function(){e.loginModal=null,t.go("home.sites")})}],onExit:["$rootScope",function(e){e.loginModal&&e.loginModal.close()}]}).state("login.recover",{url:"/recover",onEnter:["$rootScope","$state","$modal",function(e,t,r){e.recoverModal=r.open({templateUrl:"templates/login/recover",controller:"RecoverCtrl",backdrop:"static",keyboard:!1,size:"sm"}),e.recoverModal.result.finally(function(){e.recoverModal=null,t.go("login")})}],onExit:["$rootScope",function(e){e.recoverModal&&e.recoverModal.close()}]}).state("preview",{url:"/preview?site&url",cssClass:"studio-preview",templateUrl:"templates/preview",controller:"PreviewCtrl"})}]),t.constant("Constants",{AUTH_SUCCESS:"auth-success",PATH_IMG:"/images/",SERVICE:"/studio/api/1/services/api/1/user/"}),t.service("authService",["$rootScope","$http","$document","Constants",function(t,r,o,n){function s(e){return n.SERVICE+e+".json"}var i=null,a=o[0].getElementById("user");return a&&(a=e.element(a),i=JSON.parse(a.html())),this.isAuthenticated=function(){return!!i},this.login=function(e){return r({data:e,method:"POST",url:s("login"),headers:{"Content-Type":"application/x-www-form-urlencoded"},transformRequest:function(e){var t=[];for(var r in e)t.push(encodeURIComponent(r)+"="+encodeURIComponent(e[r]));return t.join("&")}}).then(function(e){return"success"===e.data.type&&(i=e.data.user,t.$broadcast(n.AUTH_SUCCESS,i)),e.data})},this.logout=function(){i=null},this.getUser=function(){return i},this.recoverPassword=function(e){return r.post(s("reset-password"),e)},this.changePassword=function(e){return r.post(s("change-password"),e).then(function(e){return e.data})},this}]),t.service("sitesService",["$http","Constants","$cookies","$timeout","$window",function(e,t,r,o,n){function s(e){return t.SERVICE+e+".json"}var i=this,a="crafterSite";return this.getSites=function(){return e.get(s("get-sites-2"))},this.getSite=function(t){return e.get(s("get-site"),{params:{siteId:t}})},this.setCookie=function(e){r[a]=e.siteId},this.editSite=function(e){i.setCookie(e),o(function(){n.location.href=e.cstudioURL},0,!1)},this}]),t.controller("AppCtrl",["$scope","$state","authService","Constants",function(e,t,r,o){function n(){r.logout(),t.go("login")}function s(){r.changePassword(e.data).then(function(t){e.error=e.message=null,"error"===t.type?e.error=t.message:t.error?e.error=t.error:e.message=t.message})}e.user=r.getUser(),e.data={email:(e.user||{email:""}).email},e.error=null,e.logout=n,e.changePassword=s,e.$on(o.AUTH_SUCCESS,function(t,r){e.user=r,e.data.email=e.user.email})}]),t.controller("SitesCtrl",["$scope","$state","sitesService",function(e,t,r){function o(){r.getSites().success(function(t){e.sites=t}).error(function(){e.sites=null})}e.sites=null,e.editSite=r.editSite,o()}]),t.controller("SiteCtrl",["$scope","$state","sitesService",function(e,t,r){function o(e){return Math.ceil(100*e.used/e.total)}function n(e){e.target.select()}function s(){var r=t.params.siteId;if(e.sites)for(var o=0,n=e.sites,s=n[o],i=n.length;i>o;s=n[++o])if(s.id+""==r+""){e.site=s;break}}e.site=null,e.editSite=r.editSite,e.percent=o,e.select=n,e.$watch("sites",s)}]),t.controller("LoginCtrl",["$scope","$state","authService","$timeout",function(t,r,o,n){function s(){o.login(c).then(function(e){"error"===e.type?t.error=e:e.error?t.error=e.error:r.go("home.sites")})}function i(){return document.getElementById("loginView").parentNode.parentNode.parentNode}function a(){var t=i();e.element(t).addClass("in")}function l(){var t=i();e.element(t).removeClass("in")}var c={};t.error=null,t.credentials=c,t.login=s,t.$on("$stateChangeSuccess",function(){"login"===r.current.name?a():"login.recover"===r.current.name&&l()}),t.$on("$viewContentLoaded",function(){"login.recover"===r.current.name&&n(l,50)})}]),t.controller("RecoverCtrl",["$scope","$state","authService",function(e,t,r){var o=e.credentials={};e.recover=function(){r.recoverPassword(o).success(function(t){"error"===t.type?e.error=t.message:t.error?e.error=t.error:e.success=t.message})}}]),t.controller("PreviewCtrl",["$scope","$state","$window","$sce",function(e,t,r,o){function n(e){var t=r.document.getElementById("studioIFrame");return e?t.contentWindow:t}function s(){var e=l.message,t=n(!0);t.postMessage(e,c)}function i(t){"http://127.0.0.1:8080"===t.origin&&e.$apply(function(){e.status=t.data})}function a(){n(!0).location.reload()}var l={},c=t.params.url;e.data=l,e.url=o.trustAsResourceUrl(c),e.status="",e.sendMessage=s,e.reloadIFrame=a,r.addEventListener("message",i,!1)}])}(angular);