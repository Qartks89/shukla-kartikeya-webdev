(function () {
    angular
        .module("WebAppMaker")
        .config(Config);

    
    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl : "views/user/login.view.client.html",
                controller : "LoginController",
                controllerAs : "LoginCtrl"
            })
            .when("/", {
                redirectTo : "/login"
            })
            .when("/register", {
                templateUrl : "views/user/register.view.client.html",
                controller : "RegisterController",
                controllerAs : "RegisterCtrl"
            })
            .when("/user", {
                templateUrl : "views/user/profile.view.client.html",
                controller : "ProfileController",
                controllerAs : "ProfileCtrl",
                resolve : {
                    loggedin: checkLoggedIn
                }
            })
            .when("/user/:uid/website", {
                templateUrl : "views/website/website-list.view.client.html",
                controller : "WebsiteListController",
                controllerAs : "WebListCtrl",
                resolve : {
                    loggedin: checkLoggedIn
                }
            })
            .when("/user/:uid/website/new", {
                templateUrl : "views/website/website-new.view.client.html",
                controller : "NewWebsiteController",
                controllerAs : "NewWebsiteCtrl",
                resolve : {
                    loggedin: checkLoggedIn
                }
            })
            .when("/user/:uid/website/:wid", {
                templateUrl : "views/website/website-edit.view.client.html",
                controller : "EditWebsiteController",
                controllerAs : "EditWebsiteCtrl",
                resolve : {
                    loggedin: checkLoggedIn
                }
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl : "views/page/page-list.view.client.html",
                controller : "PageListController",
                controllerAs : "PageListCtrl",
                resolve : {
                    loggedin: checkLoggedIn
                }
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl : "views/page/page-new.view.client.html",
                controller : "NewPageController",
                controllerAs : "NewPageCtrl",
                resolve : {
                    loggedin: checkLoggedIn
                }
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl : "views/page/list-page-edit.view.client.html",
                controller : "EditPageController",
                controllerAs : "EditPageCtrl",
                resolve : {
                    loggedin: checkLoggedIn
                }
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl : "views/widget/widget-list.view.client.html",
                controller : "WidgetListController",
                controllerAs : "WidgetListCtrl",
                resolve : {
                    loggedin: checkLoggedIn
                }
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl : "views/widget/widget-chooser.view.client.html",
                controller : "NewWidgetController",
                controllerAs : "model",
                resolve : {
                    loggedin: checkLoggedIn
                }
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/create/:wgid", {
                templateUrl : "views/widget/widget-new.view.client.html",
                controller : "NewWidgetController",
                controllerAs : "model",
                resolve : {
                    loggedin: checkLoggedIn
                }
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl : "views/widget/widget-edit.view.client.html",
                controller : "EditWidgetController",
                controllerAs : "model",
                resolve : {
                    loggedin: checkLoggedIn
                }
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid/search", {
                templateUrl: "views/widget/widget-flickr-search.view.client.html",
                controller: "FlickrImageSearchController",
                controllerAs: "model",
                resolve : {
                    loggedin: checkLoggedIn
                }
            })
            .otherwise({
                redirectTo : "/login"
            });
    }

    var checkLoggedIn = function ($q, $http, $location, $rootScope) {
        var deferred = $q.defer();
        var url = "/api/loggedin";
        $http.get(url)
            .success(function (user) {
                $rootScope.error = null;
                if (user !== '0') {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $rootScope.error = "You need to log in."
                    $location.url("/login");
                }
            });
        return deferred.promise;
    };
})();
