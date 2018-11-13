---
layout: post
tags:   ["Cordova"]
title:  "[Cordova] 無法顯示Alert視窗"
---


##問題情景##

今天開了一個Cordova專案做範例，將預設的index.html頁面修改為下列內容。按下執行卻發現，這樣一個簡單的範例無法正常執行。點擊頁面上的Click Me按鈕，沒有辦法顯示Alert視窗。

	<!DOCTYPE html>
	<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<meta charset="utf-8" />
		<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *">
		<title>BlankCordovaApp1</title>
	    <script>
			function test() {	
				alert("Clark")
			}
		</script>	
	</head>
	<body>	
	    <p>您好，您的應用程式已準備好!</p>
		<button onclick="test()">Click Me</button>
	</body>
	</html>
	
##解決方案##

經過排查程式碼後發現，在預設的狀態下Cordova會為HTML加上「Content-Security-Policy」這個安全性設定，並且預設**不啟用內嵌JavaScript**。(其實預設頁面的註解就有寫了...)

- 預設頁面註解

	    <!--
	        視需要在下方的中繼標籤中自訂內容安全性原則。將 'unsafe-inline' 加入 default-src 以啟用內嵌 JavaScript。
	        如需詳細資料，請參閱 http://go.microsoft.com/fwlink/?LinkID=617521
	    -->
	
知道了問題之後，只需要將「'unsafe-inline'」加入Content-Security-Policy裡的default-src區塊，就可以讓Alert視窗正常的執行並顯示。

- Before

    	<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *">
	
- After
    
		<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; media-src *">
    