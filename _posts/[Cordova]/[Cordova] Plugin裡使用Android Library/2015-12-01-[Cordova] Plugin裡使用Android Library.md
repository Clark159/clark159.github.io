---
layout: post
tags:   ["Cordova"]
title:  "[Cordova] Plugin裡使用Android Library"
---


##前言##

開發Cordova Plugin的時候，在Native Code裡使用第三方Library，除了可以加速專案的時程、也避免了重覆發明輪子的窘境。本篇文章介紹如何在Cordova的Plugin裡使用Android Library，主要為自己留個紀錄，也希望能幫助到有需要的開發人員。

- 參考資料：

	![前言01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BCordova%5D/%5BCordova%5D%20Plugin%E8%A3%A1%E4%BD%BF%E7%94%A8Android%20Library/%E5%89%8D%E8%A8%8001.png)


##建立##

Android中的第三方Library，除了可以從網路上取得之外，也可以依照下列文章的步驟，建立一個自己的Android Library：「mylibrary.jar」。後續步驟，會拿這個mylibrary.jar做為第三方Library來使用。

- 參考資料：[**[Android] 建立與使用Library**](https://dotblogs.com.tw/clark/2015/11/30/154930)

接著要動手撰寫Cordova Plugin來使用Android Library，開發人員可以依照下列文章的步驟，建立一個自己的Cordova Plugin：「clk-cordova-sample」。後續步驟，會拿這個clk-cordova-sample做為Plugin主體來使用。

- 參考資料：[**[Cordova] Plugin開發入門**](https://dotblogs.com.tw/clark/2015/10/23/153681)


##使用##

完成上列兩個步驟之後，開發人員會擁有Cordova Plugin：「clk-cordova-sample」、以及Android Library：「mylibrary.jar」。接著將mylibrary.jar放到clk-cordova-sample的src\android資料夾裡，並且修改clk-cordova-sample的plugin.xml，定義Cordova編譯的時候，將mylibrary.jar加入到平台專案的資料夾來進行編譯。

- 加入mylibrary.jar

		<source-file src="src/android/mylibrary.jar" target-dir="libs" />

- 完整plugin.xml

		<?xml version="1.0" encoding="UTF-8"?>
		
		<plugin xmlns="http://apache.org/cordova/ns/plugins/1.0"        
		        id="clk-cordova-sample" 
		        version="1.0.0">
		  
		    <!-- metadata -->
		    <name>CLK Cordova Sample</name>
		    <description>CLK Cordova Sample的說明</description>
		    <license>Apache 2.0</license>
		       
		    <!-- javascript -->
		    <js-module name="NotificationService" src="www/clk.cordova.sample.NotificationService.js" >
		        <clobbers target="clk.cordova.sample.NotificationService" />
		    </js-module>
		    
		    <!-- android -->
		    <platform name="android">        
		        <!-- config -->
		        <config-file target="res/xml/config.xml" parent="/*">
		            <feature name="NotificationService">
		                <param name="android-package" value="com.clk.cordova.sample.NotificationService"/>
		            </feature>
		        </config-file>        
		        <!-- source -->
		        <source-file src="src/android/NotificationService.java" target-dir="src/com/clk/cordova/sample/NotificationService" />
		        <source-file src="src/android/mylibrary.jar" target-dir="libs" />
		    </platform>
		    
		</plugin>

完成上列步驟後，接著動手修改clk-cordova-sample裡NotificationService.java，來使用mylibrary.jar裡面所提供的Class。

- NotificationService.java

		package com.clk.cordova.sample;
		
		import org.apache.cordova.*;
		import org.json.*;
		import android.widget.Toast; 
		import myLibrary.MyClass;
		
		public class NotificationService extends CordovaPlugin {
			
			// methods
			public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
				
				// show
				if(action.equals("show")) {
		
					// test
		          	MyClass x = new MyClass();
		          	String message = "Hi " + x.getMessage();
		
					// execute
					Toast.makeText(this.cordova.getActivity(), message, Toast.LENGTH_LONG).show();
				
					// return
					return true;
				}
				
				// default
				return false;		
		    }
		}


最後，執行clk-cordova-sample裡的範例APP。就可以在執行畫面上，看到一個Toast視窗顯示從Library取得的訊息內容，這也就完成了Cordova Plugin使用Android Library的相關開發步驟。

- 顯示回傳訊息

	![使用01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BCordova%5D/%5BCordova%5D%20Plugin%E8%A3%A1%E4%BD%BF%E7%94%A8Android%20Library/%E4%BD%BF%E7%94%A801.png)


##範例下載##

**範例程式碼：[下載位址](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BCordova%5D/%5BCordova%5D%20Plugin%E8%A3%A1%E4%BD%BF%E7%94%A8Android%20Library/clk-cordova-sample.rar)**



