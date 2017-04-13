/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.router", 
    "ui.bootstrap", 
    "oc.lazyLoad",  
    "ngSanitize"
]); 

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

//AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: 'assets',
        globalPath: 'assets/global',
        layoutPath: 'assets/layouts/layout',
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
        //App.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
    });
}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
}]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('SidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar(); // init sidebar
    });
}]);



///////////// START GHADA WORK
MetronicApp.controller('profile', ['$scope', '$rootScope', '$http',function($scope, $rootScope ,$http) {
   console.log("Profile Controller reporting for duty.");
	 $http.get("http://localhost:3000/products/get").success(function(data, status) {
    $scope.myVar = 'Profile Page';
  console.log(data);
   console.log('ena f ctrl');

		$scope.profile = data;
          console.log(profile);

	});
}]);


/////////////////////////////// SUPPLIER PART ////////////////////////////////////////

MetronicApp.controller('suppliers', ['$scope', '$rootScope', '$http' ,'$location' ,'$stateParams',function($scope, $rootScope ,$http, $location,$stateParams ) {
   console.log("Profile Controller reporting for duty.");
///Affichage
	 $http.get("http://localhost:3000/suppliers/get").success(function(data, status) {
    $scope.myVar = 'Profile Page';
  console.log(data);
   console.log('ena f ctrl suppliers');

		$scope.supplierList = data;
        console.log(supplier);

	});


var refresh = function() {
  $http.get('http://localhost:3000/suppliers/get').success(function(response) {
    console.log("I got the data I requested");
    $scope.supplierList = response;
    $scope.supplier = "";
  });
};


////Delete
    $scope.remove = function(id) {
  console.log(id);
  $http.get('http://localhost:3000/suppliers/delete/'+id).success(function(response) {

  });
   $location.url('/ui_bootstrap.html');
 $rootScope.$apply() ;
};

/////Get By one


$scope.edit = function(id) {
  $http.get('http://localhost:3000/suppliers/getone/'+id).success(function(response ) {

 $scope.supplier = response;  
 $location.url('/editSupplier.html').search({param: id});
 $rootScope.$apply() ;
console.log('ghhhhhhhhhhhhada'+supplier);
})
};

$scope.removeget = function(id) {
  $http.get('http://localhost:3000/suppliers/getone/'+id).success(function(response ) {

 $scope.supplier = response;  
 $location.url('/supplierView.html').search({param: id});
 $rootScope.$apply() ;
console.log('ghhhhhhhhhhhhada'+supplier);
})
};



$scope.editget = function() {

var x = $location.search();
  $http.get('http://localhost:3000/suppliers/getone/'+x.param).success(function(response ) {

 $scope.supplier = response;  
 
console.log('ghada tu est au niveay edit get'+x);
})
};


$scope.removegetparams = function() {

var x = $location.search();
  $http.get('http://localhost:3000/suppliers/getone/'+x.param).success(function(response ) {

 $scope.supplier = response;  
 
console.log('ghada tu est au niveay edit get'+x);
})
};


$scope.update = function(id) {
  $http.post('http://localhost:3000/suppliers/update/'+id, $scope.supplier).success(function(response) {
          refresh();
 $location.url('/ui_bootstrap.html');
 $rootScope.$apply() ;

  })
};




}]);



MetronicApp.controller('addsupp', ['$scope', '$rootScope', '$http' ,function($scope, $rootScope ,$http,$window) {
   console.log("Controller Add Supplier Begin");

  $scope.addSupplier = function() {
  console.log("lalalalallala"+$scope.supplier);
  $http.post('http://localhost:3000/suppliers/add', $scope.supplier).success(function(response) {
  console.log(response);


 });
};
}]);

MetronicApp.controller('home', ['$scope', '$rootScope', '$http' ,function($scope, $rootScope ,$http,$window) {
   console.log("Controller Add Supplier Begin");

  $scope.logout = function() {
  $http.get('http://localhost:3000/users/logout').success(function() {

 });
};
}]);

/////////////////////////////// SUPPLIER PART END////////////////////////////////////////


////////////////////////////// CLIENTS PART BEGIN //////////////////////////////////////////


MetronicApp.controller('clients', ['$scope', '$rootScope', '$http' ,'$location' ,'$stateParams',function($scope, $rootScope ,$http, $location,$stateParams ) {

///Affichage
	 $http.get("http://localhost:3000/clients/get").success(function(data, status) {
    $scope.myVar = 'Profile Page';
  console.log(data);
   console.log('ena f ctrl clients');

		$scope.clientList = data;
        console.log(client);

	});


var refresh = function() {
  $http.get('http://localhost:3000/clients/get').success(function(response) {
    console.log("I got the data I requested");
    $scope.clientList = response;
    $scope.client = "";
  });
};


////Delete
    $scope.remove = function(id) {
  console.log(id);
  $http.get('http://localhost:3000/clients/delete/'+id).success(function(response) {

  });
   $location.url('/ListClients.html');
 $rootScope.$apply() ;
};

/////Get By one


$scope.edit = function(id) {
  $http.get('http://localhost:3000/clients/getone/'+id).success(function(response ) {

 $scope.client = response;  
 $location.url('/editClient.html').search({param: id});
 $rootScope.$apply() ;
console.log('ghhhhhhhhhhhhada'+client);
})
};

$scope.removeget = function(id) {
  $http.get('http://localhost:3000/clients/getone/'+id).success(function(response ) {

 $scope.client = response;  
 $location.url('/clientview.html').search({param: id});
 $rootScope.$apply() ;
console.log('ghhhhhhhhhhhhada'+client);
})
};



$scope.editget = function() {

var x = $location.search();
  $http.get('http://localhost:3000/clients/getone/'+x.param).success(function(response ) {

 $scope.client = response;  
 
console.log('ghada tu est au niveay edit get'+x);
})
};


$scope.removegetparams = function() {

var x = $location.search();
  $http.get('http://localhost:3000/clients/getone/'+x.param).success(function(response ) {

 $scope.client = response;  
 
console.log('ghada tu est au niveay edit get'+x);
})
};


$scope.update = function(id) {
  $http.post('http://localhost:3000/clients/update/'+id, $scope.client).success(function(response) {
          refresh();
 $location.url('/ListClients.html');
 $rootScope.$apply() ;

  })
};




}]);



MetronicApp.controller('addClient', ['$scope', '$rootScope', '$http' ,function($scope, $rootScope ,$http,$window) {
   console.log("Controller Add Client Begin");

  $scope.addClient = function() {
  $http.post('http://localhost:3000/clients/add', $scope.client).success(function(response) {
  console.log(response);


 });
};
}]);

MetronicApp.controller('home', ['$scope', '$rootScope', '$http' ,function($scope, $rootScope ,$http,$window) {
   console.log("Controller Add Supplier Begin");

  $scope.logout = function() {
  $http.get('http://localhost:3000/users/logout').success(function() {

 });
};
}]);

///////////////////////////// CLIENTS PART END /////////////////////////////////////////////





/////////////// Partie Login/Register //////////////////////////

MetronicApp.controller('auth', ['$scope', '$rootScope', '$http' ,'$window' ,'$location' ,function($scope, $rootScope ,$http ,$window ,$location) {
   console.log("Controller Register");

  $scope.register = function() {
  console.log("lalalalallala" +$scope.test);
  $http.post('http://localhost:3000/users/register', $scope.test).success(function(response) {
  console.log(response);

 });
};

  $scope.login = function() {

  $http.post('http://localhost:3000/users/authenticate', $scope.test).success(function(response) {
  console.log(response);

  console.log("I Am The Token" +response.token);
 
      $window.localStorage['mean-token'] = response.token;
   $location.url('/profile');
 $rootScope.$apply() ;
   
 });
};


  $scope.getProfile = function() {

  
  var yourToken = $window.localStorage['mean-token'];

  $http.get('http://localhost:3000/users/profile', {
        headers: {
          Authorization: yourToken
        }
      }).success(function(data,status) {

  console.log(data);

  $scope.connected = data ;
   
 });
};

$scope.logout = function() {

  
      $window.localStorage.removeItem('mean-token');
      $location.url('/login');
      $rootScope.$apply() ;

};


}]);

////////////////////////END LOGIN REGISTER //////////////////////////////////////




///////////// NAZOU STANCEWORK
///affichage
MetronicApp.controller('reclamation', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
    console.log("Profile Controller reporting for duty.");
    ///Affichage
    function updatelist(){
        $scope.interact = false;
$http.get("http://localhost:3000/reclamation/get").success(function (recdata, status) {

        $scope.reclamation = recdata;
    });
    $http.get("http://localhost:3000/products/get").success(function (data, status) {
        $scope.myVar = 'Profile Page';

        $scope.products = data;

$scope.interact = true;

        for (var i = 0; i < $scope.products.length; i++) {
            var p = $scope.products[i];
            for (var j = 0; j < $scope.reclamation.length; j++) {
                var r = $scope.reclamation[j];
                if (r.tag != null) {
                    if (r.tag == p.tag) {
                        p.hidden = "hide";
                        console.log(p.hidden);
                    }
                }


            }
            if (((p.humidity / p.idealhumidity) != 1) & ((p.temperture / p.idealtemperature) != 1)) {
                p.general_color = "red";

            }
            else if (((p.temperture / p.idealtemperature) != 1) & ((p.humidity / p.idealhumidity) == 1)) {
                p.temperature_color = "yellow";
            }
            else if (((p.temperture / p.idealtemperature) == 1) & ((p.humidity / p.idealhumidity) != 1)) {
                p.humidity_color = "bleu";
            }



        }


    });
}
updatelist();
    

    $scope.GeneralRec = function (tag) {
        $http.post('http://localhost:3000/reclamation/addall/' + tag).success(function (response) {
            updatelist();

        });
    };
    $scope.TempertureRec = function (tag) {
        $http.post('http://localhost:3000/reclamation/addtemp/' + tag).success(function (response) {
            updatelist();

        });
    };
    $scope.HumidityRec = function (tag) {
        $http.post('http://localhost:3000/reclamation/addhumi/' + tag).success(function (response) {
            updatelist();

        });
    };

}]);
//////remove reclamation

MetronicApp.controller('claims', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
    $scope.interact = true;
    function updateClaims() {
        $scope.interact = false;
        $http.get("http://localhost:3000/reclamation/get").success(function (claim, status) {

            $scope.interact = true;
            $scope.lclaims = claim;
        });
    }
    updateClaims();
    $scope.remove = function (id) {
        console.log(id);
        $http.get('http://localhost:3000/reclamation/remove/' + id).success(function (response) {

            updateClaims();

        });

    };
}]);




/**

MetronicApp.controller('login', ['$scope', '$rootScope', '$http',"$window" ,function($scope, $rootScope ,$http ,$window) {
   console.log("Controller Login");

  $scope.login = function() {
  console.log("lalalalallala" +$scope.test);
  $http.post('http://localhost:3000/users/authenticate', $scope.test).success(function(response) {
  console.log(response);

 });
};
}]);

**/


///////////////END GHADA WORK 


////////////////// begin hafedh 
MetronicApp.controller('employee', ['$scope', '$rootScope', '$http' ,'$location' ,'$stateParams',function($scope, $rootScope ,$http, $location,$stateParams) {
   console.log("Profile Controller reporting for duty.");
///Affichage
	 $http.get("http://localhost:3000/employees/get").success(function(data, status) {
    $scope.myVar = 'Profile Page';
  console.log(data);
   console.log('ena f ctrl product');

		$scope.emplyeetList = data;
      

	});


/*var reloadPage = function() {
  $http.get('http://localhost:3000/suppliers/get').success(function(response) {
    console.log("I got the data I requested");
    $scope.supplierList = response;
    $scope.supplier = "";
  });
};
*/
function updatelist(){
       $http.get("http://localhost:3000/employees/get").success(function(data, status) {
		$scope.emplyeetList = data;
   }
                                                               
                                                              ) }
    updatelist();
    
////Delete
    $scope.remove = function(id) {
  console.log(id);
  $http.get('http://localhost:3000/employees/delete/'+id).success(function(response) {
   updatelist();
  });
$state.reload();
 $rootScope.$apply() ;
};
   

/////Get By one


$scope.edit = function(id) {
  $http.get('http://localhost:3000/employees/getone/'+id).success(function(response ) {
 updatelist();
 $scope.employee = response;  
 $location.url('/editEmployee.html').search({param: id});
 $rootScope.$apply() ;

})
};
/*
$scope.removeget = function(id) {
  $http.get('http://localhost:3000/suppliers/getone/'+id).success(function(response ) {

 $scope.supplier = response;  
 $location.url('/supplierView.html').search({param: id});
 $rootScope.$apply() ;

})
};


*/
$scope.editget = function() {

var x = $location.search();
  $http.get('http://localhost:3000/employees/getone/'+x.param).success(function(response ) {
 
 $scope.employee = response;  
       
 

})
};

/*
$scope.removegetparams = function() {

var x = $location.search();
  $http.get('http://localhost:3000/suppliers/getone/'+x.param).success(function(response ) {

 $scope.supplier = response;  
 
console.log('ghada tu est au niveay edit get'+x);
})
};

*/
$scope.update = function(id) {
  $http.post('http://localhost:3000/employees/update/'+id, $scope.employee).success(function(response) {
          refresh();
 $location.url('/blank');
 $rootScope.$apply() ;



  })
};




}]);

MetronicApp.controller('addemployee', ['$scope', '$rootScope', '$http' ,function($scope, $rootScope ,$http,$window) {
   console.log("Controller Add employee Begin");

  $scope.addEmployee = function() {
  console.log("kkkkkkk"+$scope.employee);
  $http.post('http://localhost:3000/employees/add', $scope.employee).success(function(response) {
  console.log(response);


 });
};
}]); // end hafedh
////////////////// begin khalil
MetronicApp.controller('products', ['$scope', '$rootScope', '$http' ,'$location' ,'$stateParams',function($scope, $rootScope ,$http, $location,$stateParams) {
   console.log("Profile Controller reporting for duty.");
///Affichage
	 $http.get("http://localhost:3000/products/get").success(function(data, status) {
    $scope.myVar = 'Profile Page';
  console.log(data);
   console.log('ena f ctrl product');

		$scope.productList = data;
        console.log(product);

	});


/*var reloadPage = function() {
  $http.get('http://localhost:3000/suppliers/get').success(function(response) {
    console.log("I got the data I requested");
    $scope.supplierList = response;
    $scope.supplier = "";
  });
};
*/

////Delete
   function updatelist(){
       $http.get("http://localhost:3000/products/get").success(function(data, status) {
		$scope.productList = data;
   }
                                                               
                                                              ) }
    updatelist();
    
    $scope.remove1 = function(id) {
   $http.get('http://localhost:3000/products/delete/'+id).success(function(response) {
updatelist();
  });
$state.reload();
 $rootScope.$apply() ;
};
    $scope.remove2 = function(id) {
 
  $http.get('http://localhost:3000/products/delete/'+id).success(function(response) {
 updatelist();
  });
  $state.reload();
 $rootScope.$apply() ;
};

/////Get By one


$scope.edit = function(id) {
  $http.get('http://localhost:3000/products/getone/'+id).success(function(response ) {
updatelist();
 $scope.product = response;  
 $location.url('/editProduct.html').search({param: id});
 $rootScope.$apply() ;

})
};
/*
$scope.removeget = function(id) {
  $http.get('http://localhost:3000/suppliers/getone/'+id).success(function(response ) {

 $scope.supplier = response;  
 $location.url('/supplierView.html').search({param: id});
 $rootScope.$apply() ;
console.log('ghhhhhhhhhhhhada'+supplier);
})
};

*/

$scope.editget = function() {

var x = $location.search();
  $http.get('http://localhost:3000/products/getone/'+x.param).success(function(response ) {
 $scope.product = response;  
 
})
};
/*

$scope.removegetparams = function() {

var x = $location.search();
  $http.get('http://localhost:3000/suppliers/getone/'+x.param).success(function(response ) {

 $scope.supplier = response;  
 
console.log('ghada tu est au niveay edit get'+x);
})
};
*/

$scope.update = function(id) {
  $http.post('http://localhost:3000/products/update/'+id, $scope.product).success(function(response) {
          refresh();
 $location.url('/datatables/managed.html');
 $rootScope.$apply() ;

  })
};




}]);

MetronicApp.controller('addproduct', ['$scope', '$rootScope', '$http' ,function($scope, $rootScope ,$http,$window) {
   console.log("Controller Add product Begin");

  $scope.addProduct = function() {
  console.log("kkkkkkk"+$scope.product);
  $http.post('http://localhost:3000/products/add', $scope.product).success(function(response) {
  console.log(response);


 });
};
}]); // end khalil

/* Setup Layout Part - Quick Sidebar */
MetronicApp.controller('QuickSidebarController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
       setTimeout(function(){
            QuickSidebar.init(); // init quick sidebar        
        }, 2000)
    });
}]);

/* Setup Layout Part - Theme Panel */
MetronicApp.controller('ThemePanelController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);

/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/login.html");  

    $stateProvider

        // Dashboard
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard.html",            
            data: {pageTitle: 'Admin Dashboard Template'},
            controller: "DashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/global/plugins/morris/morris.css',                            
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',                            
                            'assets/global/plugins/jquery.sparkline.min.js',

                            'assets/pages/scripts/dashboard.min.js',
                            'js/controllers/DashboardController.js',
                        ] 
                    });
                }]
            }
        })


        // Blank Page
        .state('blank', {
            url: "/blank",
            templateUrl: "views/blank.html",            
            data: {pageTitle: 'Blank Page Template'},
            controller: "BlankController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'js/controllers/BlankController.js'
                        ] 
                    });
                }]
            }
        })

        // AngularJS plugins
        .state('fileupload', {
            url: "/file_upload.html",
            templateUrl: "views/file_upload.html",
            data: {pageTitle: 'AngularJS File Upload'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'angularFileUpload',
                        files: [
                            'assets/global/plugins/angularjs/plugins/angular-file-upload/angular-file-upload.min.js',
                        ] 
                    }, {
                        name: 'MetronicApp',
                        files: [
                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // UI Select
        .state('uiselect', {
            url: "/ui_select.html",
            templateUrl: "views/ui_select.html",
            data: {pageTitle: 'AngularJS Ui Select'},
            controller: "UISelectController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'ui.select',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                            'assets/global/plugins/angularjs/plugins/ui-select/select.min.js'
                        ] 
                    }, {
                        name: 'MetronicApp',
                        files: [
                            'js/controllers/UISelectController.js'
                        ] 
                    }]);
                }]
            }
        })

        // UI Bootstrap
        .state('uibootstrap', {
            url: "/ui_bootstrap.html",
            templateUrl: "views/ui_bootstrap.html",
            data: {pageTitle: 'AngularJS UI Bootstrap'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        files: [
                            'js/controllers/GeneralPageController.js'
                        ] 
                    }]);
                }] 
            }
        })

      .state('editClient', {
            url: "/editClient.html",
            templateUrl: "views/editClient.html",
            data: {pageTitle: 'AngularJS UI Bootstrap'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        files: [
                            'js/controllers/GeneralPageController.js'
                        ] 
                    }]);
                }] 
            }
        })



.state('ListClients', {
            url: "/ListClients.html",
            templateUrl: "views/ListClients.html",
            data: {pageTitle: 'AngularJS UI Bootstrap'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        files: [
                            'js/controllers/GeneralPageController.js'
                        ] 
                    }]);
                }] 
            }
        })
.state('clientview', {
            url: "/clientview.html",
            templateUrl: "views/clientview.html",
            data: {pageTitle: 'AngularJS UI Bootstrap'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        files: [
                            'js/controllers/GeneralPageController.js'
                        ] 
                    }]);
                }] 
            }
        })


.state('addClient', {
            url: "/addClient.html",
            templateUrl: "views/addClient.html",
            data: {pageTitle: 'AngularJS UI Bootstrap'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        files: [
                            'js/controllers/GeneralPageController.js'
                        ] 
                    }]);
                }] 
            }
        })



           .state('addsupplier', {
            url: "/addSupplier.html",
            templateUrl: "views/addSupplier.html",
            data: {pageTitle: 'AngularJS UI Bootstrap'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        files: [
                            'js/controllers/GeneralPageController.js'
                        ] 
                    }]);
                }] 
            }
        })
   .state('editsupplier', {
            url: "/editSupplier.html",
            templateUrl: "views/editSupplier.html",
            data: {pageTitle: 'AngularJS UI Bootstrap'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        files: [
                            'js/controllers/GeneralPageController.js'
                        ] 
                    }]);
                }] 
            }
        })

        .state('supplierView', {
            url: "/supplierView.html",
            templateUrl: "views/supplierView.html",
            data: {pageTitle: 'AngularJS UI Bootstrap'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        files: [
                            'js/controllers/GeneralPageController.js'
                        ] 
                    }]);
                }] 
            }
        })





         .state('addemployee', {
            url: "/addEmployee.html",
            templateUrl: "views/addEmployee.html",
            data: {pageTitle: 'AngularJS UI Bootstrap'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        files: [
                            'js/controllers/GeneralPageController.js'
                        ] 
                    }]);
                }] 
            }
        })
 
    
     .state('editemployee', {
            url: "/editEmployee.html",
            templateUrl: "views/editEmployee.html",
            data: {pageTitle: 'AngularJS UI Bootstrap'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        files: [
                            'js/controllers/GeneralPageController.js'
                        ] 
                    }]);
                }] 
            }
        })
 .state('editproduct', {
            url: "/editProduct.html",
            templateUrl: "views/editProduct.html",
            data: {pageTitle: 'AngularJS UI Bootstrap'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        files: [
                            'js/controllers/GeneralPageController.js'
                        ] 
                    }]);
                }] 
            }
        })


     .state('login', {
            url: "/login.html",
            templateUrl: "views/login.html",
            data: {pageTitle: 'AngularJS UI Bootstrap'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        files: [
                            'js/controllers/GeneralPageController.js'
                        ] 
                    }]);
                }] 
            }
        })
     .state('register', {
            url: "/register.html",
            templateUrl: "views/register.html",
            data: {pageTitle: 'AngularJS UI Bootstrap'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        files: [
                            'js/controllers/GeneralPageController.js'
                        ] 
                    }]);
                }] 
            }
        })
        // Tree View
        .state('tree', {
            url: "/tree",
            templateUrl: "views/tree.html",
            data: {pageTitle: 'jQuery Tree View'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/jstree/dist/themes/default/style.min.css',

                            'assets/global/plugins/jstree/dist/jstree.min.js',
                            'assets/pages/scripts/ui-tree.min.js',
                            'js/controllers/GeneralPageController.js'
                        ] 
                    }]);
                }] 
            }
        })     

        // Form Tools
        .state('formtools', {
            url: "/form-tools",
            templateUrl: "views/form_tools.html",
            data: {pageTitle: 'Form Tools'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                            'assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css',
                            'assets/global/plugins/bootstrap-markdown/css/bootstrap-markdown.min.css',
                            'assets/global/plugins/typeahead/typeahead.css',

                            'assets/global/plugins/fuelux/js/spinner.min.js',
                            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
                            'assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
                            'assets/global/plugins/jquery.input-ip-address-control-1.0.min.js',
                            'assets/global/plugins/bootstrap-pwstrength/pwstrength-bootstrap.min.js',
                            'assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js',
                            'assets/global/plugins/bootstrap-maxlength/bootstrap-maxlength.min.js',
                            'assets/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js',
                            'assets/global/plugins/typeahead/handlebars.min.js',
                            'assets/global/plugins/typeahead/typeahead.bundle.min.js',
                            'assets/pages/scripts/components-form-tools-2.min.js',

                            'js/controllers/GeneralPageController.js'
                        ] 
                    }]);
                }] 
            }
        })        

        // Date & Time Pickers
        .state('pickers', {
            url: "/pickers",
            templateUrl: "views/pickers.html",
            data: {pageTitle: 'Date & Time Pickers'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/clockface/css/clockface.css',
                            'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                            'assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
                            'assets/global/plugins/bootstrap-colorpicker/css/colorpicker.css',
                            'assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',

                            'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                            'assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
                            'assets/global/plugins/clockface/js/clockface.js',
                            'assets/global/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js',
                            'assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',

                            'assets/pages/scripts/components-date-time-pickers.min.js',

                            'js/controllers/GeneralPageController.js'
                        ] 
                    }]);
                }] 
            }
        })

        // Custom Dropdowns
        .state('dropdowns', {
            url: "/dropdowns",
            templateUrl: "views/dropdowns.html",
            data: {pageTitle: 'Custom Dropdowns'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
                            'assets/global/plugins/select2/css/select2.min.css',
                            'assets/global/plugins/select2/css/select2-bootstrap.min.css',

                            'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
                            'assets/global/plugins/select2/js/select2.full.min.js',

                            'assets/pages/scripts/components-bootstrap-select.min.js',
                            'assets/pages/scripts/components-select2.min.js',

                            'js/controllers/GeneralPageController.js'
                        ] 
                    }]);
                }] 
            }
        }) 

        // Advanced Datatables
        .state('datatablesAdvanced', {
            url: "/datatables/managed.html",
            templateUrl: "views/datatables/managed.html",
            data: {pageTitle: 'Advanced Datatables'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [                             
                            'assets/global/plugins/datatables/datatables.min.css', 
                            'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',

                            'assets/global/plugins/datatables/datatables.all.min.js',

                            'assets/pages/scripts/table-datatables-managed.min.js',

                            'js/controllers/GeneralPageController.js'
                        ]
                    });
                }]
            }
        })

        // Ajax Datetables
        .state('datatablesAjax', {
            url: "/datatables/ajax.html",
            templateUrl: "views/datatables/ajax.html",
            data: {pageTitle: 'Ajax Datatables'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/datatables/datatables.min.css', 
                            'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                            'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',

                            'assets/global/plugins/datatables/datatables.all.min.js',
                            'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                            'assets/global/scripts/datatable.js',

                            'js/scripts/table-ajax.js',
                            'js/controllers/GeneralPageController.js'
                        ]
                    });
                }]
            }
        })

        // User Profile
        .state("profile", {
            url: "/profile",
            templateUrl: "views/profile/main.html",
            data: {pageTitle: 'User Profile'},
            controller: "UserProfileController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',  
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                            'assets/pages/css/profile.css',
                            
                            'assets/global/plugins/jquery.sparkline.min.js',
                            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',

                            'assets/pages/scripts/profile.min.js',

                            'js/controllers/UserProfileController.js'
                        ]                    
                    });
                }]
            }
        })

        // User Profile Dashboard
        .state("profile.dashboard", {
            url: "/dashboard",
            templateUrl: "views/profile/dashboard.html",
            data: {pageTitle: 'User Profile'}
        })

        // User Profile Account
        .state("profile.account", {
            url: "/account",
            templateUrl: "views/profile/account.html",
            data: {pageTitle: 'User Account'}
        })

        // User Profile Help
        .state("profile.help", {
            url: "/help",
            templateUrl: "views/profile/help.html",
            data: {pageTitle: 'User Help'}      
        })

         .state('reclamation', {
            url: "/reclamation",
            templateUrl: "views/reclamation.html",
            data: { pageTitle: 'reclamation' },
            controller: "TodoController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                            'assets/apps/css/todo-2.css',
                            'assets/global/plugins/select2/css/select2.min.css',
                            'assets/global/plugins/select2/css/select2-bootstrap.min.css',

                            'assets/global/plugins/select2/js/select2.full.min.js',

                            'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',

                            'assets/apps/scripts/todo-2.min.js',

                            'js/controllers/TodoController.js'
                        ]
                    });
                }]
            }
        })

         .state('list_reclamation', {
            url: "/list_reclamation",
            templateUrl: "views/list_reclamation.html",
            data: { pageTitle: 'list_reclamation' },
            controller: "TodoController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                            'assets/apps/css/todo-2.css',
                            'assets/global/plugins/select2/css/select2.min.css',
                            'assets/global/plugins/select2/css/select2-bootstrap.min.css',

                            'assets/global/plugins/select2/js/select2.full.min.js',

                            'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',

                            'assets/apps/scripts/todo-2.min.js',

                            'js/controllers/TodoController.js'
                        ]
                    });
                }]
            }
        })

}]);

/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
}]);