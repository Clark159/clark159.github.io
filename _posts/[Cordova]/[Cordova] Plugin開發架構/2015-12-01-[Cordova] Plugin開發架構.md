---
layout: post
tags:   ["Cordova"]
title:  "[Cordova] Plugin開發架構"
---


##問題情景##

開發Cordova Plugin的時候，偵錯Native Code是一件讓人困擾的事情，因為Cordova所提供的錯誤訊息並沒有那麼的完整。常常需要花費大量的時間與精神之後，才發現只是一個字母打錯，無形中降低了開發的效率。

![問題情景01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BCordova%5D/%5BCordova%5D%20Plugin%E9%96%8B%E7%99%BC%E6%9E%B6%E6%A7%8B/%E5%95%8F%E9%A1%8C%E6%83%85%E6%99%AF01.png)


##解決方案##

為了增加Cordova Plugin開發的效率，開發人員可以套用下列的開發架構，來加速開發：

將實際提供功能的Native Code，使用IDE封裝為Native Library。在這個步驟中，使用IDE封裝Native Library，也就可以使用IDE的編譯、偵錯、測試等功能，來快速處理Native Code的錯誤。

- 參考資料：

	- [**[Android] 建立與使用Library**](https://dotblogs.com.tw/clark/2015/11/30/154930)

	- [**[iOS] 建立與使用Framework**](https://dotblogs.com.tw/clark/2015/11/13/153918)

- 開發架構

	![解決方案01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BCordova%5D/%5BCordova%5D%20Plugin%E9%96%8B%E7%99%BC%E6%9E%B6%E6%A7%8B/%E8%A7%A3%E6%B1%BA%E6%96%B9%E6%A1%8801.png)

將IDE封裝完畢的Native Library，加入Cordova Plugin的專案裡，並且使用Cordova Plugin的語法來封裝Native Code，來提供JavaScript使用。在這個步驟中，盡量避免邏輯落在封裝Native Code的Plugin類別，讓他單純只有轉接功能，這樣就可以減少程式複雜度，進而降低寫錯的風險。

- 參考資料：

	- [**[Cordova] Plugin開發入門**](https://dotblogs.com.tw/clark/2015/10/23/153681)

	- [**[Cordova] Plugin裡使用Android Library**](https://dotblogs.com.tw/clark/2015/12/01/153057)

	- [**[Cordova] Plugin裡使用iOS Framework**](https://dotblogs.com.tw/clark/2015/12/09/143326)

- 開發架構

	![解決方案02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BCordova%5D/%5BCordova%5D%20Plugin%E9%96%8B%E7%99%BC%E6%9E%B6%E6%A7%8B/%E8%A7%A3%E6%B1%BA%E6%96%B9%E6%A1%8802.png)

最後將封裝為Cordova Plugin的Native Code，使用JavaScript包裝為後續開發人員比較方便使用的樣式，就可以完工與交付。在這個步驟中，因為是將預設的cordova.exec函式做封裝，也就是說試著選擇cordova.exec作為切入點，提供一個模擬的Mock Plugin來隔離JavaScript與Native Code的開發，讓兩邊的開發可以各自進行，避免互相卡住對方的開發進度。並且JavaScript與Native隔離的開發方式，也比較方便後續維護的工作，避免例外錯誤互相蔓延，造成難以排查錯誤的問題。

- 參考資料：

	- [**[Cordova] Plugin開發入門**](https://dotblogs.com.tw/clark/2015/10/23/153681)

	- [**JavaScript Promise迷你書 (推薦使用的非同步模型)**](http://liubin.github.io/promises-book/)

- 開發架構

	![解決方案03](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BCordova%5D/%5BCordova%5D%20Plugin%E9%96%8B%E7%99%BC%E6%9E%B6%E6%A7%8B/%E8%A7%A3%E6%B1%BA%E6%96%B9%E6%A1%8803.png)