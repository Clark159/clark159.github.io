---
layout: post
tags:   ["AngularJS"]
title:  "[AngularJS] 使用AngularCSS動態載入CSS"
---


##前言##

- [使用AngularAMD動態載入Controller](http://www.dotblogs.com.tw/clark/archive/2015/08/06/153058.aspx)

- [使用AngularAMD動態載入Service](http://www.dotblogs.com.tw/clark/archive/2015/08/08/153072.aspx)

上列兩篇文章裡，介紹了如何如何使用AngularAMD來動態載入Controller與Service。本篇文章以此為基礎，介紹如何使用AngularCSS來動態載入CSS，讓專案功能更加模組化，增加開發與維護的工作效率。主要為自己留個紀錄，也希望能幫助到有需要的開發人員。

- [AngularCSS](https://github.com/door3/angular-css)

![前言01](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BAngularJS%5D/%5BAngularJS%5D%20%E4%BD%BF%E7%94%A8AngularCSS%E5%8B%95%E6%85%8B%E8%BC%89%E5%85%A5CSS/%E5%89%8D%E8%A8%8001.png)

##安裝##

本篇文章以「[使用AngularAMD動態載入Service](http://www.dotblogs.com.tw/clark/archive/2015/08/08/153072.aspx)」的範例程式為基礎，為其附加動態載入CSS的功能。進入本篇的開發步驟之前，開發人員可以先依照上一篇文章的步驟來建立基礎架構。

**動態載入Service範例：[點此下載](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BAngularJS%5D/%5BAngularJS%5D%20%E4%BD%BF%E7%94%A8AngularAMD%E5%8B%95%E6%85%8B%E8%BC%89%E5%85%A5Service/LazyLoadService.rar)**

![安裝01](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BAngularJS%5D/%5BAngularJS%5D%20%E4%BD%BF%E7%94%A8AngularCSS%E5%8B%95%E6%85%8B%E8%BC%89%E5%85%A5CSS/%E5%AE%89%E8%A3%9D01.png)


取得基礎架構之後，開啟命令提示字元CD到這個基礎架構的資料夾輸入下列指令，就可以使用bower來取得AngularCSS套件。

	bower install angular-css

![安裝02](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BAngularJS%5D/%5BAngularJS%5D%20%E4%BD%BF%E7%94%A8AngularCSS%E5%8B%95%E6%85%8B%E8%BC%89%E5%85%A5CSS/%E5%AE%89%E8%A3%9D02.png)

完成上列步驟後，開啟工作資料夾裡面的bower_components資料夾，可以發現加入了angular-css這個套件。

![安裝03](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BAngularJS%5D/%5BAngularJS%5D%20%E4%BD%BF%E7%94%A8AngularCSS%E5%8B%95%E6%85%8B%E8%BC%89%E5%85%A5CSS/%E5%AE%89%E8%A3%9D03.png)


##掛載AngularCSS##

取得AngularCSS套件之後，接著就要將套件掛載到系統的Angular裡面。首先編輯工作資料夾內既有的app.js檔案，修改檔案中的require.js的設定參數，用來加入系統運行時AngularCSS的套件路徑、以及相依性。(相關require.js的使用介紹，可以參考：[require.js的用法 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2012/11/require_js.html))

	require.config({
	    paths: {

	        // ......

	        // angularCSS
	        "angularCSS": "bower_components/angular-css/angular-css"        
	    },
	    shim: {        

	        // ......
	        
	        // angularCSS
	        "angularCSS": ["angular"]
	    }
	});


修改完成require.js設定參數之後，在同一個app.js裡，修改下列require語法用來將AngularCSS加入專案的載入套件清單。(相關require語法的使用介紹，同樣可以參考：[require.js的用法 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2012/11/require_js.html))

	// bootstrap
	define(["angular", "angularAMD", "angular-ui-router", "angularCSS"], function (angular, angularAMD) {	       
	    // ......
	});

接著在同一個require語法內，修改下列angular語法來啟動angularCSS套件。這邊要特別注意，angularCSS的module名稱是「"door3.css"」，要小心不要打錯了。(相關angular的使用介紹，建議參考：[AngularJS 建置與執行 - Shyam Seshadri, Brad Green](http://www.books.com.tw/products/0010669125))

	// module
    var app = angular.module("app", ["ui.router", "door3.css"]);

最後，同樣在require語法內，使用angularCSS語法所提供的css參數，來定義每個ui-router路由被啟動時所要動態載入的CSS檔案。(相關AngularCSS所提供的css參數定義，可以參考：[AngularAMD:For States (UI Router) - Door3](https://github.com/door3/angular-css#for-states-ui-router))

	// route
    $stateProvider
    
        // home
        .state("home", angularAMD.route({
            url: "/home",
            templateUrl: "home.html",
            controllerUrl: "home.js",
            css: "home.css"
        }))
		
		// home
        .state("about", angularAMD.route({
            url: "/about",
            templateUrl: "about.html",
            controllerUrl: "about.js",
            css: "about.css"
        }))
    ;   		


##開發Template、CSS##

修改app.js用以掛載AngularCSS之後，就可以著手使用CSS語法，來建立系統裡每個路由所使用的CSS檔案。

- home.css

		h1 { 
		  color: blue; 
		}

- about.css

		h1 { 
		  color: red; 
		}

![開發01](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BAngularJS%5D/%5BAngularJS%5D%20%E4%BD%BF%E7%94%A8AngularCSS%E5%8B%95%E6%85%8B%E8%BC%89%E5%85%A5CSS/%E9%96%8B%E7%99%BC01.png)


##執行##

完成開發步驟後，就可以準備使用Chrome執行index.html來檢視成果。但是在檢視成果之前，必須要先參考下列資料開啟Chrome的必要功能，後續就使用Chrome來正常的執行index.html。

- [Chrome內的本地網頁，使用XMLHttpRequest讀取本地檔案 - 昏睡領域](http://www.dotblogs.com.tw/clark/archive/2015/07/30/153002.aspx)

執行index.html之後，會系統依照路由設定進入預設的Home頁面。而使用Chrome的開發者工具，可以看到系統加載了Home頁面的Template、Controller、CSS，並且顯示在頁面上。

![執行01](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BAngularJS%5D/%5BAngularJS%5D%20%E4%BD%BF%E7%94%A8AngularCSS%E5%8B%95%E6%85%8B%E8%BC%89%E5%85%A5CSS/%E5%9F%B7%E8%A1%8C01.png)

點擊Home頁面的About按鈕，會切換到About頁面。這時同樣從Chrome的開發者工具中，可以看到系統是在點擊了About按鈕之後，才去加載About頁面的Template、Controller、Service、CSS來顯示在頁面上，這也就是AngularCSS所提供的動態載入CSS功能。

![執行02](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BAngularJS%5D/%5BAngularJS%5D%20%E4%BD%BF%E7%94%A8AngularCSS%E5%8B%95%E6%85%8B%E8%BC%89%E5%85%A5CSS/%E5%9F%B7%E8%A1%8C02.png)


##範例下載##

**範例檔案：[點此下載](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BAngularJS%5D/%5BAngularJS%5D%20%E4%BD%BF%E7%94%A8AngularCSS%E5%8B%95%E6%85%8B%E8%BC%89%E5%85%A5CSS/LazyLoadCSS.rar)**











