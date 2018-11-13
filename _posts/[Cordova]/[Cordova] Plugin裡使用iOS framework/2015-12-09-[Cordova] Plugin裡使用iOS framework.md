---
layout: post
tags:   ["Cordova"]
title:  "[Cordova] Plugin裡使用iOS Framework"
---


##前言##

開發Cordova Plugin的時候，在Native Code裡使用第三方Library，除了可以加速專案的時程、也避免了重覆發明輪子的窘境。本篇文章介紹如何在Cordova的Plugin裡使用iOS Framework，主要為自己留個紀錄，也希望能幫助到有需要的開發人員。

- 參考資料：

	![前言01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BCordova%5D/%5BCordova%5D%20Plugin%E8%A3%A1%E4%BD%BF%E7%94%A8iOS%20framework/%E5%89%8D%E8%A8%8001.png)


##建立##

iOS中的第三方Library，除了可以從網路上取得之外，也可以依照下列文章的步驟，建立一個自己的iOS Framework：「MyFramework.framework」。後續步驟，會拿這個MyFramework.framework做為第三方Library來使用。

- 參考資料：[**[iOS] 建立與使用Framework**](https://dotblogs.com.tw/clark/2015/11/13/153918)

接著要動手撰寫Cordova Plugin來使用iOS Framework，開發人員可以依照下列文章的步驟，建立一個自己的Cordova Plugin：「clk-cordova-sample」。後續步驟，會拿這個clk-cordova-sample做為Plugin主體來使用。

- 參考資料：[**[Cordova] Plugin開發入門**](https://dotblogs.com.tw/clark/2015/10/23/153681)


##使用##

完成上列兩個步驟之後，開發人員會擁有Cordova Plugin：「clk-cordova-sample」、以及iOS Framework：「MyFramework.framework」。接著將MyFramework.framework放到clk-cordova-sample的src\iOS資料夾裡，並且修改clk-cordova-sample的plugin.xml，定義Cordova編譯的時候，將MyFramework.framework加入到平台專案的資料夾來進行編譯。

- 加入MyFramework.framework

		<framework src="src/ios/MyFramework.framework" custom="true" />

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
		    <framework   src="src/ios/MyFramework.framework" custom="true" />
		  </platform>
		
		</plugin>


完成上列步驟後，接著動手修改clk-cordova-sample裡CLKNotificationService.m，來使用MyFramework.framework裡面所提供的Class。

- CLKNotificationService.m

		#import <MyFramework/MyFramework.h>
		#import "CLKNotificationService.h"
		
		@implementation CLKNotificationService
		
		// methods
		- (void)show:(CDVInvokedUrlCommand*)command
		{
		 	// test
			MyClass* x = [[MyClass alloc] init];
			NSString* message = [NSString stringWithFormat:@"%@%@", @"Hi ", [x getMessage]];         
						
			// execute
		    [[[UIAlertView alloc] initWithTitle:nil message:message delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil] show];
		}
		
		@end

接著，因為在iOS 8.0之後，iOS專案才支援Framework類型的函式庫，所以要定義clk-cordova-sample裡範例APP的目標iOS版本為8.0以上。

- 目標iOS版本
	
	![使用01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BCordova%5D/%5BCordova%5D%20Plugin%E8%A3%A1%E4%BD%BF%E7%94%A8iOS%20framework/%E4%BD%BF%E7%94%A801.png)

最後，執行clk-cordova-sample裡的範例APP。就可以在執行畫面上，看到一個Alert視窗顯示從Library取得的訊息內容，這也就完成了Cordova Plugin使用iOS Framework的相關開發步驟。

- 顯示回傳訊息

	![使用02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BCordova%5D/%5BCordova%5D%20Plugin%E8%A3%A1%E4%BD%BF%E7%94%A8iOS%20framework/%E4%BD%BF%E7%94%A802.png)


##Workaround##

相對於Windows、Android等平台，iOS平台上APP的建置需要比較多的耐心與經驗。建議開發人員在開發iOS平台Cordova APP的時候，先使用Visual Studio完成Cordova專案的開發工作，再選擇Ripple來「**執行**」Cordova專案，用以在專案根目錄下的platforms\ios資料夾裡生成**完整的XCode專案**。後續拿這個XCode專案到MAC上去編譯及執行，可以比較順利建置iOS平台上的Cordova APP。

- 建置Cordova專案

	![建置01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BCordova%5D/%5BCordova%5D%20Plugin%E8%A3%A1%E4%BD%BF%E7%94%A8iOS%20framework/%E5%BB%BA%E7%BD%AE01.png)

- 生成XCode專案

	![建置02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BCordova%5D/%5BCordova%5D%20Plugin%E8%A3%A1%E4%BD%BF%E7%94%A8iOS%20framework/%E5%BB%BA%E7%BD%AE02.png)

將XCode專案到MAC上去編譯及執行，還會遇到一些設定需要調整。首先就是先到XCode的專案屬性頁面，把Framework的參考加入到專案裡。(**如果將Framework專案Build Settings頁簽的Mach-O Type屬性調整為「Static Library」可以省略此步驟 - 感謝同事小董提供方案**)

- Before

	![建置03](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BCordova%5D/%5BCordova%5D%20Plugin%E8%A3%A1%E4%BD%BF%E7%94%A8iOS%20framework/%E5%BB%BA%E7%BD%AE03.png)

- After

	![建置04](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BCordova%5D/%5BCordova%5D%20Plugin%E8%A3%A1%E4%BD%BF%E7%94%A8iOS%20framework/%E5%BB%BA%E7%BD%AE04.png)

接著，還需要去調整XCode的專案屬性頁面，將Framework Search Paths屬性調整為.framework檔案所在的正確路徑。 (上一個步驟，手動將Framework的參考加入到XCode專案裡時，會自動帶入Framework的正確路徑，所以只要移除錯誤路徑即可。)

- Before

	![建置05](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BCordova%5D/%5BCordova%5D%20Plugin%E8%A3%A1%E4%BD%BF%E7%94%A8iOS%20framework/%E5%BB%BA%E7%BD%AE05.png)

- After

	![建置06](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BCordova%5D/%5BCordova%5D%20Plugin%E8%A3%A1%E4%BD%BF%E7%94%A8iOS%20framework/%E5%BB%BA%E7%BD%AE06.png)

完成上列步驟後進行編譯，理論上就可以完成iOS平台上Cordova APP的建置工作。(**God bless you**)

- Succeeded

	![建置07](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BCordova%5D/%5BCordova%5D%20Plugin%E8%A3%A1%E4%BD%BF%E7%94%A8iOS%20framework/%E5%BB%BA%E7%BD%AE07.png)


##範例下載##

**範例程式碼：[下載位址](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BCordova%5D/%5BCordova%5D%20Plugin%E8%A3%A1%E4%BD%BF%E7%94%A8iOS%20framework/clk-cordova-sample.zip)**
