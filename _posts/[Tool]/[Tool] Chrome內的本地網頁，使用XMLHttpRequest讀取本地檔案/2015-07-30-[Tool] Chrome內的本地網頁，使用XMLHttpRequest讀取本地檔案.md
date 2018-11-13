---
layout: post
tags:   ["Tool"]
title:  "[Tool] Chrome內的本地網頁，使用XMLHttpRequest讀取本地檔案"
---


##問題情景##

開發Cordova這類以網頁內容作為UI的Hybrid APP時，開發人員可以使用IDE的功能將程式佈署到手機或是模擬器來偵錯。但是以筆者的經驗來說，要檢視HTML網頁元素、觀看CSS樣式繼承，最順手的開發者工具還是Chrome。這時如果開發人員選擇透過Chrome來模擬Hybrid APP，以檔案方式載入本地網頁來偵錯，並且在網頁裡使用了XMLHttpRequest來額外載入本地檔案(ex:AngularJS裡Route功能的TemplateURL)，在Chrome上會呈現下列的錯誤訊息：

	Failed to execute 'send' on 'XMLHttpRequest': Failed to load 'file:///C:/Users/Clark/Desktop/XhrFileAccessSample/content.txt'.


發生這個錯誤的原因，是因為Chrome基於安全性的考量，禁止本地網頁使用XMLHttpRequest來讀取本地檔案。這也就造成了相同的HTML頁面內容，佈署到手機或者模擬器可以正常使用XMLHttpRequest，而在Chrome上執行卻無法正常使用XMLHttpRequest。


##解決方案##

為了讓Chrome上執行的本地網頁，也能正常使用XMLHttpRequest來讀取本地檔案內容。開發人員可以在啟動Chrome的捷徑上，加入「--allow-file-access-from-files」參數，來開啟XMLHttpRequest讀取檔案功能。後續使用這個捷徑開啟Chrome執行本地網頁，就可以正常使用XMLHttpRequest來讀取本地檔案內容。

- 捷徑設定

	![解決方案01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20Chrome%E5%85%A7%E7%9A%84%E6%9C%AC%E5%9C%B0%E7%B6%B2%E9%A0%81%EF%BC%8C%E4%BD%BF%E7%94%A8XMLHttpRequest%E8%AE%80%E5%8F%96%E6%9C%AC%E5%9C%B0%E6%AA%94%E6%A1%88/%E8%A7%A3%E6%B1%BA%E6%96%B9%E6%A1%8801.png)

- index.html

		<!DOCTYPE html>
		<html>
		<head>
		    <meta charset="utf-8" />
		    <title></title>
		</head>
		<body>
		
		    <h1 id="displayBox"></h1>
		    
		    <script>
		
		        // DisplayBox
		        function display(message) {
		            var displayBox = document.getElementById("displayBox");
		            displayBox.innerHTML = message;
		        }        
		
		        // XMLHttpRequest
		        var xhr = new XMLHttpRequest();
		        
		        xhr.onload = function () {            
		            display(xhr.responseText);
		        };
		
		        try {
		            xhr.open("get", "content.txt", true);
		            xhr.send();
		        }
		        catch (ex) {
		            display(ex.message);
		        }        
		
		    </script>
		</body>
		</html>

- content.txt

		Clark


##範例下載##

**範例下載：[點此下載](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BTool%5D/%5BTool%5D%20Chrome%E5%85%A7%E7%9A%84%E6%9C%AC%E5%9C%B0%E7%B6%B2%E9%A0%81%EF%BC%8C%E4%BD%BF%E7%94%A8XMLHttpRequest%E8%AE%80%E5%8F%96%E6%9C%AC%E5%9C%B0%E6%AA%94%E6%A1%88/XhrFileAccessSample.rar)**