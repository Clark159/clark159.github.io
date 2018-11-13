---
layout: post
tags:   ["Cordova"]
title:  "[Cordova] Plugin開發入門"
---


##Overview##

Cordova的設計概念，是在APP上透過Web控制項來呈現Web頁面，讓Web開發人員可以操作熟悉的語言、工具來開發APP。使用Web頁面來呈現功能內容，的確可以滿足大部分的功能需求，但是因為APP的使用情景畢竟有別於Web，某些APP的功能需求像是：撥打電話、掃描條碼...等等，無法單純使用Web開發技術就能實現。

為了讓Web頁面能夠滿足更多的APP功能需求，Cordova提供了Plugin機制，讓Web頁面能夠掛載並調用Native開發技術所開發的功能模組。當開發人員遇到Web開發技術無法實現的功能需求時，可以到[Cordova官網(https://cordova.apache.org/plugins/)](https://cordova.apache.org/plugins/)，下載並使用官方提供的各種通用Plugin功能模組。而就算遇到了特殊的功能需求，Cordova也提供了方法，讓開發人員可以自行開發專屬於自己的客製Plugin功能模組。

本篇文章介紹如何建立一個Cordova Plugin功能模組，讓開發人員能夠使用Native開發技術，在Cordova裡開發Plugin功能模組給Web頁面使用，讓Web頁面能夠滿足更多的APP功能需求。主要是為自己留個紀錄，也希望能幫助到有需要的開發人員。

![Overview02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BCordova%5D/%5BCordova%5D%20Plugin%E9%96%8B%E7%99%BC%E5%85%A5%E9%96%80/Overview01.png)


##Cordova Plugin Metadata##

Cordova Plugin功能模組會以資料夾的形式，存放於本機檔案系統或是遠端Git伺服器。使用Visual Studio開發Cordova專案的時候，只要輸入檔案路徑或是伺服器路徑，就可以自動完成掛載Plugin功能模組的動作。

![CordovaPluginMetadata01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BCordova%5D/%5BCordova%5D%20Plugin%E9%96%8B%E7%99%BC%E5%85%A5%E9%96%80/CordovaPluginMetadata01.png)

掛載Plugin功能模組的時候，Visual Studio會讀取資料夾下的「plugin.xml」。這個XML檔案中定義了Plugin功能模組的相關設定項目，這些設定項目裡用於描述Plugin功能模組的，主要項目為：

- id : Plugin識別碼
- version : Plugin版本
- name : Plugin名稱
- description : Plugin描述
- license : Plugin授權模式
- js-module : 各個JavaScript模組的設定項目
- platform : 各個執行平台的設定項目
<!---->

	<?xml version="1.0" encoding="UTF-8"?>
	<plugin xmlns="http://apache.org/cordova/ns/plugins/1.0"        
	        id="clk-cordova-sample" 
	        version="1.0.0">
	  
	    <!-- metadata -->
	    <name>CLK Cordova Sample</name>
	    <description>CLK Cordova Sample的說明</description>
	    <license>Apache 2.0</license>
	
	    <!-- javascript -->
	    <js-module>...</js-module>
        <js-module>...</js-module>
	  
	    <!-- android -->
	    <platform name="android">...</platform>
	
	    <!-- ios -->
	    <platform name="ios">...</platform>
	  
	</plugin>


##Android Platform Plugin##


###platform metadata###

Cordova在編譯Android Platform Plugin的時候，會先建立編譯用的Android專案，並且讀取plugin.xml裡被標註為**android**的platform設定區塊，做為編譯時期的編譯參數。

    <!-- android -->
    <platform name="android">        
        <!-- config -->
        <config-file target="res/xml/config.xml" parent="/*">
            <feature name="NotificationService">
                <param name="android-package" value="com.clk.cordova.sample.NotificationService"/>
            </feature>
        </config-file>        
        <!-- source -->
        <source-file src="src/android/NotificationService.java" target-dir="src/com/clk/cordova/sample/" />
    </platform>


###source-file###

當Cordova讀取到Android platform的設定區塊的source-file設定區塊時，會將每一個source-file設定區塊裡src所指定的檔案，複製到Android專案裡target-dir所指定資料夾，用以進行後續的編譯工作。在本篇的範例裡，source-file設定區塊所代表的意義是：將Plugin裡src/android/NotificationService.java的這個檔案，複製到Android專案的src/com/clk/cordova/sample/資料夾裡面來進行編譯。

	<!-- source -->
    <source-file src="src/android/NotificationService.java" target-dir="src/com/clk/cordova/sample/" />

![AndroidPlatformPlugin01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BCordova%5D/%5BCordova%5D%20Plugin%E9%96%8B%E7%99%BC%E5%85%A5%E9%96%80/AndroidPlatformPlugin01.png) 


###config-file###

Android platform的設定區塊的config-file設定區塊比較特別，這個設定區塊是用來，定義提供給Web頁面調用的類別。在這其中feature name代表的是這個Plugin提供給Web頁面使用的類別別名，而param value裡定義的則是實際提供服務的Native類別名稱，剩餘其他設定參數則是編譯所需的固定參數。在本篇範例裡，config-file設定區塊所代表的意義是：Web頁面可以使用NotificationService這個類別別名，來調用Android專案裡面的com.clk.cordova.sample.NotificationService這個Native類別。

    <!-- config -->
    <config-file target="res/xml/config.xml" parent="/*">
        <feature name="NotificationService">
            <param name="android-package" value="com.clk.cordova.sample.NotificationService"/>
        </feature>
    </config-file>        


###native code###

Android platform plugin裡，使用Native技術所開發的Native類別，必須先繼承org.apache.cordova.CordovaPlugin這個類別，再經由source-file設定加入專案編譯，後續才可以透過config-file的定義提供Web頁面調用。而Web頁面調用Native類別時，Cordova會執行Native類別的execute方法，並且提供下列內容：

- action : 方法名稱。	
	- 因為只有execute一個進入點，所以使用action來分發方法，讓一個Class能夠提供更多方法。
- args : 方法參數。
	- 對應方法名稱的參數內容、為JSONArray格式。	
- callbackContext : 方法回呼。
	- 方法成功時呼叫callbackContext.success回傳成功結果、方法失敗時呼叫callbackContext.error回傳錯誤訊息。	
- return : 是否接受調用。
	- 方法成功時回傳true、方法失敗時回傳false。
<!---->

	package com.clk.cordova.sample;
	
	import org.apache.cordova.*;
	import org.json.*;
	import android.widget.Toast; 
		
	public class NotificationService extends CordovaPlugin {
		
		// methods
		public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
			
			// show
			if(action.equals("show")) {
	
				// arguments
				String message = args.getString(0); 
	
				// execute
				Toast.makeText(this.cordova.getActivity(), message, Toast.LENGTH_LONG).show();
			
				// return
				return true;
			}
			
			// default
			return false;		
	    }
	}


###cordova.exec###

完成上述Android Platform Plugin的相關開發工作之後，在掛載這個Cordova Plugin的Android執行平台裡，Web頁面就可以使用統一的cordova.exec方法，來調用Native開發的類別。這個cordova.exec介面會執行Native類別的execute方法，並且帶入下列內容：

1. success : 方法成功時的Callback函式。
2. error：方法失敗時的Callback函式。
3. feature：config-file設定區塊所定義的類別別名。
4. action：Native類別提供的方法名稱。
5. args：Native類別提供的方法參數。
<!---->
	
	cordova.exec(success, error, feature, action, args);

##iOS Platform Plugin##


###platform metadata###

Cordova在編譯iOS Platform Plugin的時候，會先建立編譯用的iOS專案，並且讀取plugin.xml裡被標註為**ios**的platform設定區塊，做為編譯時期的編譯參數。

	<!-- ios -->
	<platform name="ios">
  		<!-- config -->
	  	<config-file target="config.xml" parent="/*">
	    	<feature name="NotificationService">
	      		<param name="ios-package" value="CLKNotificationService"/>
	    	</feature>
	  	</config-file>
	  	<!-- source -->
	  	<header-file src="src/ios/CLKNotificationService.h" />
	  	<source-file src="src/ios/CLKNotificationService.m" />
	</platform>


###source-file###

當Cordova讀取到iOS platform的設定區塊的source-file設定區塊時，會將每一個source-file設定區塊裡src所指定的檔案，複製到iOS專案的Plugin資料夾，用以進行後續的編譯工作。在本篇的範例裡，source-file設定區塊所代表的意義是：將Plugin裡src/ios/CLKNotificationService.h跟CLKNotificationService.m的這兩個檔案，複製到iOS專案的Plugin資料夾裡面來進行編譯。

	<!-- source -->
	<header-file src="src/ios/CLKNotificationService.h" />
	<source-file src="src/ios/CLKNotificationService.m" />

![iOSPlatformPlugin01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BCordova%5D/%5BCordova%5D%20Plugin%E9%96%8B%E7%99%BC%E5%85%A5%E9%96%80/iOSPlatformPlugin01.png) 


###config-file###

iOS platform的設定區塊的config-file設定區塊比較特別，這個設定區塊是用來，定義提供給Web頁面調用的類別。在這其中feature name代表的是這個Plugin提供給Web頁面使用的類別別名，而param value裡定義的則是實際提供服務的Native類別名稱，剩餘其他設定參數則是編譯所需的固定參數。在本篇範例裡，config-file設定區塊所代表的意義是：Web頁面可以使用NotificationService這個類別別名，來調用iOS專案裡面的CLKNotificationService這個Native類別。

	<!-- config -->
  	<config-file target="config.xml" parent="/*">
    	<feature name="NotificationService">
      		<param name="ios-package" value="CLKNotificationService"/>
    	</feature>
  	</config-file>


###native code###

iOS platform plugin裡，使用Native技術所開發的Native類別，必須先繼承CDVPlugin這個類別，再經由source-file設定加入專案編譯，後續才可以透過config-file的定義提供Web頁面調用。而Web頁面調用Native類別時，Cordova會依照Web頁面所提供的action參數，來執行Native類別裡同名的方法，並且提供下列內容：

- CDVInvokedUrlCommand : 執行指令
	- @property (nonatomic, readonly) NSString* callbackId; : 回呼編號
	- (id)argumentAtIndex:(NSUInteger)index; : 取得輸入參數

- CDVPluginResult : 執行結果
	- @property (nonatomic, strong, readonly) NSNumber* status; : 執行結果(Ex:成功、失敗...)
	- @property (nonatomic, strong, readonly) id message; : 回傳參數(Ex:String、Bool...)
	
- CDVPlugin(self) : 繼承的CDVPlugin
	- @property (nonatomic, weak) id <CDVCommandDelegate> commandDelegate; : 回傳執行結果物及回呼編號
<!---->

	// CLKNotificationService.h
	#import <Foundation/Foundation.h>
	#import <Cordova/CDVPlugin.h>
	
	@interface CLKNotificationService : CDVPlugin
	
	// methods
	-(void)show:(CDVInvokedUrlCommand*)command;
	
	@end

<!---->

	// CLKNotificationService.m
	#import "CLKNotificationService.h"
	
	@implementation CLKNotificationService
	
	// methods
	- (void)show:(CDVInvokedUrlCommand*)command
	{
	 	// arguments
	    NSString* message = [command argumentAtIndex:0];
			
		// execute
	    [[[UIAlertView alloc] initWithTitle:nil message:message delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil] show];
	}
	
	@end


###cordova.exec###

完成上述iOS Platform Plugin的相關開發工作之後，在掛載這個Cordova Plugin的iOS執行平台裡，Web頁面就可以使用統一的cordova.exec方法，來調用Native開發的類別。這個cordova.exec介面會提供action參數，來執行Native類別裡同名的方法，並且帶入下列內容：

1. success : 方法成功時的Callback函式。
2. error：方法失敗時的Callback函式。
3. feature：config-file設定區塊所定義的類別別名。
4. action：Native類別提供的方法名稱。
5. args：Native類別提供的方法參數。
<!---->
	
	cordova.exec(success, error, feature, action, args);


##JavaScript Module Plugin##

Cordova提供統一的cordova.exec方法，讓Web頁面調用Native開發的Plugin功能。但是，cordova.exec方法需要帶入的五個輸入參數、加上success、error這兩個Callback函式所隱含的回傳參數、再加上多參數需要包裝成JSON格式...這些瑣碎的工作，會大量增加Web開發人員使用Plugin功能模組的負擔。

為了減少Web開發人員使用Plugin功能模組的負擔，Plugin功能模組的開發人員，可以使用Cordova提供的JavaScript Module掛載機制，在Plugin功能模組裡面加入JavaScript程式碼來封裝cordova.exec方法，用以提供更簡潔、更易懂的使用介面讓Web開發人員使用。

- Before
	
		cordova.exec(null, null, "NotificationService", "show", [message]);

- After

		clk.cordova.sample.NotificationService.show("Clark");


###js-module metadata###

Cordova在編譯每個執行平台的時候，會讀取plugin.xml裡所有的js-module設定區塊，並且將每一個js-module設定區塊裡src所指定的js-module原始碼打包備用。當應用程式執行的時候，Cordova核心會將這些js-module載入來提供Web頁面使用。

- name : js-module識別碼
- src : js-module原始碼
<!---->

    <!-- javascript -->
    <js-module name="NotificationService" src="www/clk.cordova.sample.NotificationService.js" >
        ...
    </js-module>


###js-module code###

在每個js-module原始碼的內部，可以透過Cordova所提供的exports物件，來附加使用JavaScript所撰寫的功能函式，這個exports物件是用來封裝js-module功能的物件。在本篇的範例裡，js-module原始碼在exports物件上，附加了一個show函式用來簡化cordova.exec的使用方式，提供給Web頁面使用。

- clk.cordova.sample.NotificationService.js

		// methods
		exports.show = function (message) {
		    cordova.exec(null, null, "NotificationService", "show", [message]);
		};


###cordova.require###

Web頁面需要使用js-module的時候，可以使用cordova.require方法來取得js-module。這個cordova.require方法，使用js-module設定區塊裡name所設定的名稱、加上Plugin metadata裡所定的id識別碼做為索引，來識別並取得Cordova核心中的js-module。在本篇的範例裡，Web頁面使用cordova.require取得Plugin id：clk-cordova-sample、js-module name：NotificationService，封裝js-module的exports物件，並且調用這個exports物件所附加的show函式。

- index.html

	 	var notificationService = cordova.require("clk-cordova-sample.NotificationService");
	
	    notificationService.show("Clark");


###clobbers###

為了更進一步簡化取得js-module的方式，Cordova另外在plugin.xml的js-module設定區塊上，提供了clobbers設定項目。當應用程式執行、Cordova核心載入js-module提供Web頁面使用的時候，如果定義了clobbers所提供的target設定參數，Cordova核心會自動將封裝js-module的exports物件，存放到target所定義的物件上，讓Web頁面可以直接調用。

在本篇的範例裡，js-module定義了一個clobbers的target，Cordova核心會在載入clk.cordova.sample.NotificationService.js之後，將封裝js-module的exports物件，存放到clk.cordova.sample.NotificationService這個物件上。後續Web頁面，只要直接使用clk.cordova.sample.NotificationService.show就可以調用這個exports物件所附加的show函式。

- clobbers

		<!-- javascript -->
	    <js-module name="NotificationService" src="www/clk.cordova.sample.NotificationService.js" >
	        <clobbers target="clk.cordova.sample.NotificationService" />
	    </js-module>

- index.html

		clk.cordova.sample.NotificationService.show("Clark");


##範例下載##

**範例程式碼：[下載位址](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BCordova%5D/%5BCordova%5D%20Plugin%E9%96%8B%E7%99%BC%E5%85%A5%E9%96%80/clk-cordova-sample.rar)**





