---
layout: post
tags:   ["AngularJS"]
title:  "[AngularJS] 使用AngularAMD動態載入Controller"
---


##前言##

使用AngularJS來開發Single Page Application(SPA)的時候，可以選用[**AngularUI Router**](https://github.com/angular-ui/ui-router)來提供頁面內容切換的功能。但是在UI Router的使用情景裡，需要開發人員將每個State所使用的Controller預先載入之後，才能正常的切換頁面內容。這也就代表開發人員所建立的SPA，必須要在啟動的當下，就先將整個SPA所用到的Controller都預先載入到瀏覽器之中。而這樣的預先載入所有Controller備用的動作，在大型的專案中很容易造成瀏覽器效能上的負擔，進而影響使用者的操作體驗。

本篇文章介紹如何使用AngularAMD來動態載入Controller，讓SPA的啟動過程更加輕量化，用以提升使用者的操作體驗。主要為自己留個紀錄，也希望能幫助到有需要的開發人員。

- [AngularAMD](https://github.com/marcoslin/angularAMD)

![前言01](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BAngularJS%5D/%5BAngularJS%5D%20%E4%BD%BF%E7%94%A8AngularAMD%E5%8B%95%E6%85%8B%E8%BC%89%E5%85%A5Controller/%E5%89%8D%E8%A8%8001.png)


##安裝##

AngularAMD使用bower來發佈套件本體與其相依套件。而要使用bower必須要先安裝Node.js、接著安裝npm、最後安裝bower，完成安裝步驟之後，開發人員就可以使用bower來下載套件。相關bower的安裝步驟，可以參考下列資料：

- [Gulp, Grunt, Bower以及npm - 黑暗執行緒](http://blog.darkthread.net/post-2014-09-25-gulp-grunt-bower-npm.aspx)

安裝完bower之後，開發人員就可以建立一個新的資料夾作為工作資料夾。接著開啟命令提示字元CD到這個工作資料夾之後，輸入下列指令，就可以使用bower來取得AngularAMD套件本體與其相依套件。

	bower install angularAMD

![安裝01](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BAngularJS%5D/%5BAngularJS%5D%20%E4%BD%BF%E7%94%A8AngularAMD%E5%8B%95%E6%85%8B%E8%BC%89%E5%85%A5Controller/%E5%AE%89%E8%A3%9D01.png)

而因為後續範例需要使用AngularUI Router這個Angular套件，來提供頁面內容切換的功能，所以還需要使用下列指令，使用bower來取得AngularUI Router這個套件。

	bower install angular-ui-router

![安裝02](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BAngularJS%5D/%5BAngularJS%5D%20%E4%BD%BF%E7%94%A8AngularAMD%E5%8B%95%E6%85%8B%E8%BC%89%E5%85%A5Controller/%E5%AE%89%E8%A3%9D02.png)

完成上列步驟後，開啟工作資料夾可以看到多出來一個bower_components資料夾，而這個資料夾內擺放了angularAMD套件本體、以及angular、require.js、angular-ui-router這三個套件。

![安裝03](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BAngularJS%5D/%5BAngularJS%5D%20%E4%BD%BF%E7%94%A8AngularAMD%E5%8B%95%E6%85%8B%E8%BC%89%E5%85%A5Controller/%E5%AE%89%E8%A3%9D03.png)


##開發app.js##

完成安裝步驟後，在工作資料夾內新增一個app.js檔案，用來定義系統運行時的相關參數、還有必要的啟動程式碼。

![開發01](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BAngularJS%5D/%5BAngularJS%5D%20%E4%BD%BF%E7%94%A8AngularAMD%E5%8B%95%E6%85%8B%E8%BC%89%E5%85%A5Controller/%E9%96%8B%E7%99%BC01.png)

接著需要在app.js裡面加入require.js的設定參數，用來定義系統運行時使用的套件路徑、以及套件之間的相依性。(相關require.js的使用介紹，可以參考：[require.js的用法 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2012/11/require_js.html))

	require.config({
	    paths: {
	        // angular
	        "angular": "bower_components/angular/angular",
	        
	        // angular-ui
	        "angular-ui-router": "bower_components/angular-ui-router/release/angular-ui-router",
	        
	        // angularAMD
	        "angularAMD": "bower_components/angularAMD/angularAMD",
	        "ngload": "bower_components/angularAMD//ngload"
	    },
	    shim: {	        
	        // angular
			"angular": { exports: "angular" },
	        
	        // angular-ui
	        "angular-ui-router": ["angular"],
	        
	        // angularAMD
	        "angularAMD": ["angular"],
	        "ngload": ["angularAMD"]
	    }
	});

完成require.js設定之後，在同一個app.js裡，加入下列require語法用來載入專案使用的套件。(相關require語法的使用介紹，同樣可以參考：[require.js的用法 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2012/11/require_js.html))

	// bootstrap
	define(["angular", "angularAMD", "angular-ui-router"], function (angular, angularAMD) {	       
	    // ......
	});

接著在require語法內，使用下列ui-router+angularAMD語法，來定義系統內ui-router的路由設定、以及預設的開啟路徑。(相關ui-router語法的使用介紹，可以參考：[学习 ui-router管理状态 - bubkoo](http://bubkoo.com/2014/01/01/angular/ui-router/guide/state-manager/))

    // routes
    var registerRoutes = function($stateProvider, $urlRouterProvider) {
        	
        // default
        $urlRouterProvider.otherwise("/home");
        
        // route
        $stateProvider
        
            // home
            .state("home", angularAMD.route({
                url: "/home",
                templateUrl: "home.html",
                controllerUrl: "home.js"
            }))
			
			// home
            .state("about", angularAMD.route({
                url: "/about",
                templateUrl: "about.html",
                controllerUrl: "about.js"
            }))
        ;   		
    };

最後，同樣在require語法內，使用下列angular+angularAMD語法，來啟動系統裡的angular套件，這就完成了系統的運行參數、啟動程式碼的相關設定。(相關angular的使用介紹，建議參考：[AngularJS 建置與執行 - Shyam Seshadri, Brad Green](http://www.books.com.tw/products/0010669125))

    // module
    var app = angular.module("app", ["ui.router"]);

    // config
    app.config(["$stateProvider", "$urlRouterProvider", registerRoutes]);

    // bootstrap
    return angularAMD.bootstrap(app);


##開發Template、Controller##

建立定義運行參數與啟動程式碼的app.js之後，就可以著手使用angular+require語法，來建立系統內ui-router所要切換使用的頁面樣板(Template)、以及頁面控制(Controller)。(相關angular的使用介紹，建議參考：[AngularJS 建置與執行 - Shyam Seshadri, Brad Green](http://www.books.com.tw/products/0010669125))

- home.html

		<h1>{{ title }}</h1>
		<br/>
		<button ui-sref="about">About</button>

- home.js

		define([], function () {
			
			// controller
			return ["$scope", function ($scope) {
				
				// properties
			    $scope.title = "This is Home page";
			}];	
		});

![開發02](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BAngularJS%5D/%5BAngularJS%5D%20%E4%BD%BF%E7%94%A8AngularAMD%E5%8B%95%E6%85%8B%E8%BC%89%E5%85%A5Controller/%E9%96%8B%E7%99%BC02.png)


##開發index.html##

完成上列步驟之後，還需要建立index.html來做為整個Single Page Application(SPA)的程式進入點。在這個index.html裡，最主要就是使用requirejs來載入與執行app.js，並且在body裡面加入一個用來讓ui-router擺放頁面內容的div。

	<!DOCTYPE html>
	<html>
	<head>	  
		<!-- meta -->
		<meta charset="utf-8">
		
		<!-- title -->
		<title></title>
			
		<!-- script -->
		<script data-main="app.js" src="bower_components/requirejs/require.js"></script>
	</head>
	<body>
		<!-- content -->
		<div ui-view></div>	
	</body>
	</html>

![開發03](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BAngularJS%5D/%5BAngularJS%5D%20%E4%BD%BF%E7%94%A8AngularAMD%E5%8B%95%E6%85%8B%E8%BC%89%E5%85%A5Controller/%E9%96%8B%E7%99%BC03.png)


##執行##

完成開發步驟後，就可以準備使用Chrome執行index.html來檢視成果。但是在檢視成果之前，必須要先參考下列資料開啟Chrome的必要功能，後續就使用Chrome來正常的執行index.html。

- [Chrome內的本地網頁，使用XMLHttpRequest讀取本地檔案 - 昏睡領域](http://www.dotblogs.com.tw/clark/archive/2015/07/30/153002.aspx)

執行index.html之後，會系統依照路由設定進入預設的Home頁面。而使用Chrome的開發者工具，可以看到系統加載了Home頁面的Template、Controller，並且顯示在頁面上。

![執行01](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BAngularJS%5D/%5BAngularJS%5D%20%E4%BD%BF%E7%94%A8AngularAMD%E5%8B%95%E6%85%8B%E8%BC%89%E5%85%A5Controller/%E5%9F%B7%E8%A1%8C01.png)

點擊Home頁面的About按鈕，會切換到About頁面。這時同樣從Chrome的開發者工具中，可以看到系統是在點擊了About按鈕之後，才去加載About頁面的Template、Controller來顯示在頁面上，這也就是AngularAMD所提供的動態載入Controller功能。

![執行02](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BAngularJS%5D/%5BAngularJS%5D%20%E4%BD%BF%E7%94%A8AngularAMD%E5%8B%95%E6%85%8B%E8%BC%89%E5%85%A5Controller/%E5%9F%B7%E8%A1%8C02.png)


##範例下載##

**範例下載：[點此下載](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BAngularJS%5D/%5BAngularJS%5D%20%E4%BD%BF%E7%94%A8AngularAMD%E5%8B%95%E6%85%8B%E8%BC%89%E5%85%A5Controller/LazyLoadController.rar)**