---
layout: post
tags:   ["AngularJS"]
title:  "[AngularJS] 使用AngularAMD動態載入Service"
---


##前言##

「[使用AngularAMD動態載入Controller](http://www.dotblogs.com.tw/clark/archive/2015/08/06/153058.aspx)」：這篇文章裡介紹如何使用AngularAMD來動態載入Controller。本篇文章以此為基礎，介紹如何使用AngularAMD來動態載入Service，讓SPA的啟動過程更加輕量化，用以提升使用者的操作體驗。並且也透過這樣掛載式的設計，讓專案功能更加模組化，增加開發與維護的工作效率。主要為自己留個紀錄，也希望能幫助到有需要的開發人員。

- [AngularAMD](https://github.com/marcoslin/angularAMD)

![前言01](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BAngularJS%5D/%5BAngularJS%5D%20%E4%BD%BF%E7%94%A8AngularAMD%E5%8B%95%E6%85%8B%E8%BC%89%E5%85%A5Service/%E5%89%8D%E8%A8%8001.png)


##安裝##

本篇文章以「[使用AngularAMD動態載入Controller](http://www.dotblogs.com.tw/clark/archive/2015/08/06/153058.aspx)」的範例程式為基礎，為其附加動態載入Service的功能。進入本篇的開發步驟之前，開發人員可以先依照上一篇文章的步驟來建立基礎架構。

**動態載入Controller範例：[點此下載](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BAngularJS%5D/%5BAngularJS%5D%20%E4%BD%BF%E7%94%A8AngularAMD%E5%8B%95%E6%85%8B%E8%BC%89%E5%85%A5Controller/LazyLoadController.rar)**

![安裝01](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BAngularJS%5D/%5BAngularJS%5D%20%E4%BD%BF%E7%94%A8AngularAMD%E5%8B%95%E6%85%8B%E8%BC%89%E5%85%A5Service/%E5%AE%89%E8%A3%9D01.png)


##開發Service##

取得基礎架構之後，在工作資料夾內新增一個UserRepository.js檔案，用來定義動態掛載的Service：UserRepository物件。

![開發01](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BAngularJS%5D/%5BAngularJS%5D%20%E4%BD%BF%E7%94%A8AngularAMD%E5%8B%95%E6%85%8B%E8%BC%89%E5%85%A5Service/%E9%96%8B%E7%99%BC01.png)

首先要在UserRepository.js裡面加入下列require+AngularAMD語法，用來將UserRepository.js包裝成為可以動態加載執行的AMD格式模組，並且注入AngularAMD所提供的app物件用來提供動態註冊Servive的功能。(相關require.js的使用介紹，可以參考：[require.js的用法 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2012/11/require_js.html))

	define(["app"], function (app) {
	    				
	});


接著在UserRepository.js裡，加入下列這個使用JavaScript物件導向語法寫出來的UserRepository類別，後續會使用這個UserRepository類別來提供系統服務的功能。(相關JavaScript物件導向語法的介紹，建議參考：[JavaScript 設計模式 - Stoyan Stefanov](http://www.books.com.tw/products/0010538538))

	// class
	var UserRepository = (function () {
	    
	    // constructors
	    function UserRepository() {
			
	        // users
	        this.users = new Array();
	        this.users.push({ name: "Clark", address: "Taipei" });
	        this.users.push({ name: "Jeff", address: "Kaohsiung" });
	        this.users.push({ name: "Jammy", address: "Taipei" });
	    }
	    
	    // methods    
	    UserRepository.prototype.getUserByName = function (name) {
			
	        // result
	        var result = null;
	        for (var key in this.users) {
	            if (this.users[key].name == name) {
	                result = this.users[key];
	            }
	        }
			
	        // return
	        return result;
	    };
	    
	    // return
	    return UserRepository;
	})();

最後在UserRepository.js裡面加入下列程式碼，使用AngularAMD所提供的app物件把UserRepository類別動態註冊成為Angular的一個服務。這個動態把UserRepository類別動態註冊成為Angular的服務的程式碼定義，會在UserRepository.js這個AMD格式檔案被加載後執行。(相關AngularAMD所提供的動態註冊功能，可以參考：[AngularAMD:Creating a Module - marcoslin](https://github.com/marcoslin/angularAMD#creating-a-module))

	// register
    app.service("UserRepository", [UserRepository]);


##加載Service##

完成Service的開發工作之後，接著就要在Controller裡使用上個步驟所建立的UserRepository。首先編輯工作資料夾內既有的about.js，並且將其中require語法的宣告定義，修改為下列的程式內容。在這段程式中"UserRepository"字串，代表的意義是使用require.js的功能，去動態加載UserRepository.js這個AMD格式檔案。

- about.js

		define(["UserRepository"], function () {	
			//...
		});

動態加載UserRepository.js之後，系統就會依照程式碼定義，將UserRepository類別註冊成為Angular的一個服務。這時開發人員就可以修改about.js裡面的Controller宣告，使用Angular語法取得UserRepository服務來提供Controller使用。

- about.js
	
		// controller
		return ["$scope", "UserRepository", function ($scope, UserRepository) {
			
			// properties
		    $scope.title = "This is About page";
			$scope.user = UserRepository.getUserByName("Clark");
		}];	

- about.html

		<h1>{{ title }}</h1>
		<h1>{{ user | json }}</h1>
		<br/>
		<button ui-sref="home">Home</button>


##執行##

完成開發步驟後，就可以準備使用Chrome執行index.html來檢視成果。但是在檢視成果之前，必須要先參考下列資料開啟Chrome的必要功能，後續就使用Chrome來正常的執行index.html。

- [Chrome內的本地網頁，使用XMLHttpRequest讀取本地檔案 - 昏睡領域](http://www.dotblogs.com.tw/clark/archive/2015/07/30/153002.aspx)

執行index.html之後，會系統依照路由設定進入預設的Home頁面。而使用Chrome的開發者工具，可以看到系統加載了Home頁面的Template、Controller，並且顯示在頁面上。

![執行01](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BAngularJS%5D/%5BAngularJS%5D%20%E4%BD%BF%E7%94%A8AngularAMD%E5%8B%95%E6%85%8B%E8%BC%89%E5%85%A5Service/%E5%9F%B7%E8%A1%8C01.png)

點擊Home頁面的About按鈕，會切換到About頁面。這時同樣從Chrome的開發者工具中，可以看到系統是在點擊了About按鈕之後，才去加載About頁面的Template、Controller、以及額外的UserRepository來提供服務，這也就是AngularAMD所提供的動態載入Service功能。

![執行02](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BAngularJS%5D/%5BAngularJS%5D%20%E4%BD%BF%E7%94%A8AngularAMD%E5%8B%95%E6%85%8B%E8%BC%89%E5%85%A5Service/%E5%9F%B7%E8%A1%8C02.png)


##範例下載##

**範例檔案：[點此下載](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BAngularJS%5D/%5BAngularJS%5D%20%E4%BD%BF%E7%94%A8AngularAMD%E5%8B%95%E6%85%8B%E8%BC%89%E5%85%A5Service/LazyLoadService.rar)**