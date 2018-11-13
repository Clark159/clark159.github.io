#[TypeScript] 建立與使用AMD Library#


##前言##

使用Visual Studio開發TypeScript專案時，開發人員可以將可重用的程式碼，封裝為AMD Library來提供其他開發人員使用。本篇文章介紹如何將可重用的程式碼封裝為AMD Library，主要為自己留個紀錄，也希望能幫助到有需要的開發人員。(**本篇文章使用TypeScript 1.8開始提供的功能，請先升級再進行後續開發步驟。**)

![前言01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTypeScript%5D/%5BTypeScript%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8AMD%20Library/%E5%89%8D%E8%A8%8001.png)


##建立##

首先開啟Visual Studio來建立一個新專案：「myLibrary」，專案類型選擇為：具有TypeScript的HTML應用程式，並且清除專案預先建立的內容檔案。這個專案用來封裝可重用的程式碼，提供其他開發人員使用。

- 建立專案

	![建立01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTypeScript%5D/%5BTypeScript%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8AMD%20Library/%E5%BB%BA%E7%AB%8B01.png)

- 專案結構

	![建立02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTypeScript%5D/%5BTypeScript%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8AMD%20Library/%E5%BB%BA%E7%AB%8B02.png)


接著在專案裡，加入一個與專案同名的資料夾：「myLibrary」。並且在該資料夾內，加入提供其他開發人員使用的程式碼類別：「MyClass」。 (如果有更多共用類別，也是建置在myLibrary資料夾內。)

- myLibrary\MyClass.ts

		export class MyClass {
		
		    // methods
		    public getMessage(): string {
		
		        return "Clark";
		    }
		}

- 專案結構

	![建立03](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTypeScript%5D/%5BTypeScript%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8AMD%20Library/%E5%BB%BA%E7%AB%8B03.png)


再來還需要在專案根目錄下，建立一個與專案同名的ts檔：「myLibrary.ts」，用來匯出專案裡的類別。(如果有更多共用類別，也是加入到myLibrary.ts裡匯出。)

- myLibrary.ts

		// export
		export * from "./myLibrary/myClass";		

- 專案結構

	![建立04](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTypeScript%5D/%5BTypeScript%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8AMD%20Library/%E5%BB%BA%E7%AB%8B04.png)


完成類別建立之後，接著調整專案的TypeScript建置設定。將專案設定為，在建置時：編譯為AMD模組、輸出單一檔案、並且產生宣告檔案。

- TypeScript建置設定

	![建立05](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTypeScript%5D/%5BTypeScript%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8AMD%20Library/%E5%BB%BA%E7%AB%8B05.png)


完成設定步驟後，存檔並且編譯專案，就可以在專案的bin目錄下取得編譯完成的AMD Library內容檔：myLibrary.d.ts、myLibrary.js、myLibrary.js.map。

- 產出AMD Library

	![建立06](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTypeScript%5D/%5BTypeScript%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8AMD%20Library/%E5%BB%BA%E7%AB%8B06.png)


##使用##

接著開啟Visual Studio來建立一個新專案：「myApp」，這個專案用來說明，如何使用封裝為AMD Library的程式碼。

- 建立專案

	![使用01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTypeScript%5D/%5BTypeScript%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8AMD%20Library/%E4%BD%BF%E7%94%A801.png)

- 專案結構

	![使用02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTypeScript%5D/%5BTypeScript%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8AMD%20Library/%E4%BD%BF%E7%94%A802.png)


建立專案之後，接著調整專案的TypeScript建置設定。將專案設定為，在建置時：編譯為AMD模組。

- TypeScript建置設定

	![使用03](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTypeScript%5D/%5BTypeScript%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8AMD%20Library/%E4%BD%BF%E7%94%A803.png)


完成專案設定之後，加入一個「lib」資料夾。並且把myLibrary專案所產出的AMD Library的三個檔案，加入到這個lib資料夾中。

- 加入AMD Library

	![使用04](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTypeScript%5D/%5BTypeScript%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8AMD%20Library/%E4%BD%BF%E7%94%A804.png)


加入AMD Library之後，接著在專案預設的index.html裡面，加入下列程式碼，使用RequireJS掛載AMD Library，並且執行預設的app.ts內容。

- 掛載AMD Library

	    <!-- require -->
	    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.2.0/require.min.js"></script>    
	    <script>
	        require.config({
	            paths: {
	                "myLibrary": "lib/myLibrary"
	            }
	        });
	    </script>

- 執行app.ts

	    <!-- start -->
	    <script>
	        require(["app"]);
	    </script>

- 完整的index.html

		<!DOCTYPE html>
		
		<html lang="en">
		<head>
		    <meta charset="utf-8" />
		    <title>TypeScript HTML App</title>
		    <link rel="stylesheet" href="app.css" type="text/css" />
		
		    <!-- require -->
		    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.2.0/require.min.js"></script>    
		    <script>
		        require.config({
		            paths: {
		                "myLibrary": "lib/myLibrary"
		            }
		        });
		    </script>
		
		    <!-- start -->
		    <script>
		        require(["app"]);
		    </script>
		
		</head>
		<body>
		    <h1>TypeScript HTML App</h1>
		
		    <div id="content"></div>
		</body>
		</html>


接著在app.ts裡面，加入下列程式來使用Library裡面所封裝的程式碼。(編寫程式碼的時候，可以發現myLibrary支持IntelliSense提示。)

- 參考AMD Library

		// reference
		/// <reference path="./lib/myLibrary.d.ts" />
		
		// import
		import * as myLibrary from "myLibrary";

- 使用AMD Library中的程式碼

		// test
		var x = new myLibrary.MyClass();
		var message = x.getMessage();
		
		// alert
		alert(message);

- 完整的app.ts

		// reference
		/// <reference path="./lib/myLibrary.d.ts" />
		
		// import
		import * as myLibrary from "myLibrary";
		
		
		// test
		var x = new myLibrary.MyClass();
		var message = x.getMessage();
		
		// alert
		alert(message);

- IntelliSense提示

	![使用05](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTypeScript%5D/%5BTypeScript%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8AMD%20Library/%E4%BD%BF%E7%94%A805.png)


最後，執行myApp。可以在執行畫面上，看到一個Alert視窗顯示從Library取得的訊息內容，這也就完成了使用Library的相關開發步驟。

- 顯示回傳訊息

	![使用06](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTypeScript%5D/%5BTypeScript%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8AMD%20Library/%E4%BD%BF%E7%94%A806.png)


##範例下載##

**範例程式碼：[下載位址](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BTypeScript%5D/%5BTypeScript%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8AMD%20Library/Lab.zip)**




