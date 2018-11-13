---
layout: post
tags:   ["Android"]
title:  "[Android] WebView內的本地網頁，使用XMLHttpRequest讀取本地檔案"
---


##問題情景##

在Android裡，可以使用WebView來呈現本地或是遠端的網頁內容。但是在顯示本地網頁時，如果開發人員在網頁裡使用了XMLHttpRequest來額外載入本地檔案(ex:AngularJS裡Route功能的TemplateURL)，在**部分手機**上會呈現下列的錯誤訊息：

	Failed to execute 'send' on 'XMLHttpRequest': Failed to load 'file:///android_asset/content.txt'.

發生這個錯誤的原因，是因為Android基於安全性的考量，從Android 4.1版開始禁止了WebView內的本地網頁使用XMLHttpRequest來讀取本地檔案(4.1版之前無限制)。這也就造成了「Android 4.1之前的手機」可以正常使用XMLHttpRequest，而「Android 4.1之後的手機」無法正常使用XMLHttpRequest。


##解決方案##

為了讓Android 4.1之後的本地網頁，也能正常使用XMLHttpRequest來讀取本地檔案內容。開發人員可以依照下列程式碼的方式，使用WebView原生提供的「AllowFileAccessFromFileURLs」函式，來重新開啟XMLHttpRequest讀取檔案功能，後續在WebView中執行的本地網頁就可以正常使用XMLHttpRequest來讀取本地檔案內容。

- MainActivity.java

		public class MainActivity extends Activity {
			
		    @SuppressLint({ "SetJavaScriptEnabled", "NewApi" }) 
		    @Override
		    protected void onCreate(Bundle savedInstanceState) {
		    	
		    	// base
		        super.onCreate(savedInstanceState);
		        
		        // content
		        setContentView(R.layout.activity_main);
		        
		        // Browser
		        android.webkit.WebView webView = (WebView)this.findViewById(R.id.webView1);   
		                
		        // WebSettings
		 		WebSettings settings = webView.getSettings();
		 		settings.setJavaScriptEnabled(true);
		 		if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.JELLY_BEAN) {
		            settings.setAllowFileAccessFromFileURLs(true);
		        }
		 		
		 		// LoadUrl
		 		webView.loadUrl("file:///android_asset/index.html");   	  
		    }
		}

- index.html

		<!DOCTYPE html>
		<html>
		<head>
		    <meta charset="utf-8" />
		    <title></title>
		</head>
		<body>
		
		    <h1 id="contentBox"></h1>
		    
		    <script>
		
		        // ContentBox
		        function display(message) {
		            var contentBox = document.getElementById("contentBox");
		            contentBox.innerHTML = message;
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


##範例下載##

**範例下載：[點此下載](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BAndroid%5D/%5BAndroid%5D%20WebView%E5%85%A7%E7%9A%84%E6%9C%AC%E5%9C%B0%E7%B6%B2%E9%A0%81%EF%BC%8C%E4%BD%BF%E7%94%A8XMLHttpRequest%E8%AE%80%E5%8F%96%E6%9C%AC%E5%9C%B0%E6%AA%94%E6%A1%88.md/XhrFileAccessSample.rar)**


##參考資料##

- [WebView跨源攻击分析 - 龚广](http://blogs.360.cn/360mobile/2014/09/22/webview%E8%B7%A8%E6%BA%90%E6%94%BB%E5%87%BB%E5%88%86%E6%9E%90/)

- [WebSettings.AllowFileAccessFromFileURLs - Android APIs](http://developer.android.com/intl/zh-CN/reference/android/webkit/WebSettings.html#getAllowFileAccessFromFileURLs())