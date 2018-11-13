---
layout: post
tags:   ["TypeScript"]
title:  "[TypeScript] 建置輸出單一JavaScript檔案(.js)與Declaration檔案(.d.ts)"
---


##問題情景##

開發人員使用Visual Studio來開發TypeScript，可以很方便快速的將專案裡的所有TypeScript檔案(.ts)，一口氣全部編譯成為JavaScript檔案(.js)，用以提供html網頁使用。但是當軟體專案越來越龐大的時候，過多的.js檔引用，會增加開發.html檔案時的負擔;並且每個.js檔之間的相依關係，也很容易因為引用順序的錯誤，而造成不可預期的問題。

![問題情景01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTypeScript%5D/%5BTypeScript%5D%20%E5%BB%BA%E7%BD%AE%E8%BC%B8%E5%87%BA%E5%96%AE%E4%B8%80JavaScript%E6%AA%94%E6%A1%88(.js)%E8%88%87Declaration%E6%AA%94%E6%A1%88(.d.ts)/問題情景01.png)

	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="utf-8" />
	    <title>TypeScript HTML App</title>
	
	    <!--Validation-->
	    <script type="text/javascript" src="Validation/Validation.js"></script>
	    <script type="text/javascript" src="Validation/LettersOnlyValidator.js"></script>
	    <script type="text/javascript" src="Validation/ZipCodeValidator.js"></script>
	
	</head>
	<body>
	</body>
	</html>


##解決方案：建置輸出單一JavaScript檔案(.js)##

為了解決多個.js檔引用所造成的問題，Visual Studio在TypeScript建置設定頁面，提供了「**Combine JavaScript output into file**」 這個建置輸出設定。開發人員只要勾選這個設定，後續在專案通過編譯時，Visual Studio就會自動將專案裡生成的所有.js內容，合併成為單一.js檔來輸出，讓其他HTML開發人員方便使用。

![解決方案01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTypeScript%5D/%5BTypeScript%5D%20%E5%BB%BA%E7%BD%AE%E8%BC%B8%E5%87%BA%E5%96%AE%E4%B8%80JavaScript%E6%AA%94%E6%A1%88(.js)%E8%88%87Declaration%E6%AA%94%E6%A1%88(.d.ts)/解決方案01.png)

![解決方案02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTypeScript%5D/%5BTypeScript%5D%20%E5%BB%BA%E7%BD%AE%E8%BC%B8%E5%87%BA%E5%96%AE%E4%B8%80JavaScript%E6%AA%94%E6%A1%88(.js)%E8%88%87Declaration%E6%AA%94%E6%A1%88(.d.ts)/解決方案02.png)

	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="utf-8" />
	    <title>TypeScript HTML App</title>
	    <link rel="stylesheet" href="app.css" type="text/css" />
	
	    <!--Validation-->
	    <script type="text/javascript" src="validationLibrary.js"></script>
	
	</head>
	<body>
	</body>
	</html>



##解決方案：建置輸出單一Declaration檔案(.d.ts)##

勾選了「Combine JavaScript output into file」 這個建置輸出設定後，開發人員就可以將專案裡的.ts輸出成為單一.js檔，提供給其他開發人員使用。這時如果其他開發人員期望能用TypeScript語法來進行後續開發，我們除了直接提供.ts原始檔案這個選項之外，也可以選擇提供專案輸出的單一.js檔、加上對應的Declaration檔案(.d.ts)這樣的方式，來提供給其他開發人員使用。

在Visual Studio裡要建立專案輸出的.d.ts檔，開發人員可以在TypeScript建置設定頁面中，勾選「**Generate declaration files**」這個建置輸出設定。後續在專案通過編譯時，Visual Studio就會自動為專案裡輸出的.js檔、建立對應的.d.ts檔，方便開發人員提供給其他TypeScript開發人員使用。

![解決方案03](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTypeScript%5D/%5BTypeScript%5D%20%E5%BB%BA%E7%BD%AE%E8%BC%B8%E5%87%BA%E5%96%AE%E4%B8%80JavaScript%E6%AA%94%E6%A1%88(.js)%E8%88%87Declaration%E6%AA%94%E6%A1%88(.d.ts)/解決方案03.png)

![解決方案04](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTypeScript%5D/%5BTypeScript%5D%20%E5%BB%BA%E7%BD%AE%E8%BC%B8%E5%87%BA%E5%96%AE%E4%B8%80JavaScript%E6%AA%94%E6%A1%88(.js)%E8%88%87Declaration%E6%AA%94%E6%A1%88(.d.ts)/解決方案04.png)



