---
layout: post
tags:   ["Tool"]
title:  "[Tool] 取得APP的Store URL Scheme (Android、iOS)"
---


##前言##

在企業網站中，如果希望使用URL連結的方式，開啟Store APP來下載APP(非網頁下載)。開發人員可以將Store的URL Scheme設定為網頁內URL連結的目標，後續使用者使用手機瀏覽網站並點擊這個URL連結，就會開啟內建的Store來下載APP。本篇文章介紹如何在不同的手機平台上，取得APP的Store URL Scheme，主要為自己留個紀錄，也希望能幫助到有需要的開發人員。

- 範例網頁

	![範例01](http://s01.calm9.com/qrcode/2015-07/P3T5MH4CZO.png)


##Android##

要取得Android APP的Store URL Scheme，首先要到APP的Store網頁，並且複製該網頁的URL回來剖析，從Store網頁的URL裡面可以剖析出APP的Package Name。以Facebook的APP來說，Package Name是：「com.facebook.katana」。

	https://play.google.com/store/apps/details?id=com.facebook.katana	

取得APP的Package Name之後，依照下列的範例將「market://details?id=」與Package Name組合起來，就可以得到APP的Store URL Scheme。

	market://details?id=com.facebook.katana

後續只要在網頁的URL連結中，將Store URL Scheme設定為目標，就可以從網頁上直接開啟Store APP來安裝APP。

	<!--Android-->
    <h2>
        <a href="market://details?id=com.facebook.katana">Android Facebook APP</a>
    </h2><br/>


##iOS##

要取得iOS APP的Store URL Scheme，首先要到APP的Store網頁，並且複製該網頁的URL回來剖析。以Facebook的APP來說，網頁的URL是：「https://itunes.apple.com/tw/app/facebook/id284882215?mt=8」。

	https://itunes.apple.com/tw/app/facebook/id284882215?mt=8

取得APP的網頁URL之後，依照下列的範例將URL開頭的「https://」替換為「itms-apps://」就可以組合出APP的Store URL Scheme。

	itms-apps://itunes.apple.com/tw/app/facebook/id284882215?mt=8

後續只要在網頁的URL連結中，將Store URL Scheme設定為目標，就可以從網頁上直接開啟Store APP來安裝APP。

	<!--iOS-->
    <h2>
        <a href="itms-apps://itunes.apple.com/tw/app/facebook/id284882215?mt=8">iOS Facebook APP</a>
    </h2><br />


##範例網頁##

- 範例網址

	[**http://clark159.github.io/static/sample/2015-07-16-Store_URL_Scheme_Sample.html**](http://clark159.github.io/static/sample/2015-07-16-Store_URL_Scheme_Sample.html)

- 範例原始碼

		<!DOCTYPE html>
		<html lang="en">
		<head>
		    <meta charset="utf-8" />
		    <title>Store URL Scheme sample</title>
		</head>
		<body>
		    <h1>Store URL Scheme sample</h1><br />
		
		    <!--Android-->
		    <h2>
		        <a href="market://details?id=com.facebook.katana">Android Facebook APP</a>
		    </h2><br/>
		
		    <!--iOS-->
		    <h2>
		        <a href="itms-apps://itunes.apple.com/tw/app/facebook/id284882215?mt=8">iOS Facebook APP</a>
		    </h2><br />
		</body>
		</html>




