---
layout: post
tags:   ["iOS"]
title:  "[iOS] 建立與使用Framework"
---


##前言##

使用XCode開發iOS專案時，開發人員可以將可重用的程式碼，封裝為Library或是Framework來提供其他開發人員使用。這兩種封裝方式在使用的時候：Library需要將.a封裝檔與所有公開的.h檔提供給使用者加入專案，而Framework則只需要將.framework封裝檔提供給使用者加入專案。就使用情景來說，提供單一.framework封裝檔會顯得比較簡單方便。本篇文章介紹如何將可重用的程式碼封裝為Framework，主要為自己留個紀錄，也希望能幫助到有需要的開發人員。

![前言01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BiOS%5D/%5BiOS%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8Framework/%E5%89%8D%E8%A8%8001.png)


##建立##

首先開啟XCode來建立一個新專案：「MyFramework」，專案類型選擇為Cocoa Touch Framework。這個專案用來封裝可重用的程式碼，提供其他開發人員使用。

- 專案類型
	
	![建立01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BiOS%5D/%5BiOS%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8Framework/%E5%BB%BA%E7%AB%8B01.png)

接著在MyFramework加入一個新類別：「MyClass」,做為提供給其他開發人員使用的程式碼。

- MyClass.h
		
		#import <Foundation/Foundation.h>		
		
		@interface MyClass : NSObject
		
		// methods
		- (NSString*) getMessage;
		
		@end

- MyClass.m

		#import "MyClass.h"

		@implementation MyClass

		// methods
		- (NSString*) getMessage {
		    return @"Clark";
		}
		
		@end


建立好MyClass之後，接著要把MyClass.h設定為Public，讓使用的開發人員可以加入類別的.h檔參考。

- Public Headers

	![建立02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BiOS%5D/%5BiOS%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8Framework/%E5%BB%BA%E7%AB%8B02.png)


接著在專案預設的MyFramework.h裡面加入MyClass.h檔的參考，讓後續使用的開發人員只要import單一個MyFramework.h檔，就可以引用到Framework裡Public出來的.h檔。

- MyFramework.h

		#import <UIKit/UIKit.h>
	
		//! Project version number for MyFramework.
		FOUNDATION_EXPORT double MyFrameworkVersionNumber;
		
		//! Project version string for MyFramework.
		FOUNDATION_EXPORT const unsigned char MyFrameworkVersionString[];
		
		// In this header, you should import all the public headers of your framework using statements like #import <MyFramework/PublicHeader.h>
		#import "MyClass.h"

最後一個設定步驟，是要加入一段Run Script，用來將「模擬器版本Framework」、「實機版本Framework」，整合輸出為單一Framework。

- 參考資料

	- [**用lipo合并模拟器Framework与真机Framework - IOS开发学习博客**](http://devonios.com/xcode-lipo-framework.html)

- Run Script
	
		if [ "${ACTION}" = "build" ]
		then
		INSTALL_DIR=${SRCROOT}/Products/${PROJECT_NAME}.framework
		
		DEVICE_DIR=${BUILD_ROOT}/${CONFIGURATION}-iphoneos/${PROJECT_NAME}.framework
		
		SIMULATOR_DIR=${BUILD_ROOT}/${CONFIGURATION}-iphonesimulator/${PROJECT_NAME}.framework
		
		
		if [ -d "${INSTALL_DIR}" ]
		then
		rm -rf "${INSTALL_DIR}"
		fi
		
		mkdir -p "${INSTALL_DIR}"
		
		cp -R "${DEVICE_DIR}/" "${INSTALL_DIR}/"
		#ditto "${DEVICE_DIR}/Headers" "${INSTALL_DIR}/Headers"
		
		lipo -create "${DEVICE_DIR}/${PROJECT_NAME}" "${SIMULATOR_DIR}/${PROJECT_NAME}" -output "${INSTALL_DIR}/${PROJECT_NAME}"
		
		#open "${DEVICE_DIR}"
		open "${SRCROOT}/Products"
		fi

- Setting

	![建立03](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BiOS%5D/%5BiOS%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8Framework/%E5%BB%BA%E7%AB%8B03.png)

完成設定步驟後，分別Build兩個不同版本的Framework：模擬器版本、實機版本。接著，設定在建置作業中的Run Script，就會將兩個版本的Framework，整合輸出為單一的MyFramework.framework

- 模擬器版本
	
	![建立04](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BiOS%5D/%5BiOS%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8Framework/%E5%BB%BA%E7%AB%8B04.png)		

- 實機版本

	![建立05](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BiOS%5D/%5BiOS%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8Framework/%E5%BB%BA%E7%AB%8B05.png)

- 產出MyFramework.framework

	![建立06](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BiOS%5D/%5BiOS%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8Framework/%E5%BB%BA%E7%AB%8B06.png)


##使用##

接著開啟XCode來建立一個新專案：「MyAPP」，專案類型選擇為Single View Application。這個專案用來說明，如何使用封裝為Framework的程式碼。

- 專案類型
	
	![使用01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BiOS%5D/%5BiOS%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8Framework/%E4%BD%BF%E7%94%A801.png)

再來將Framework複製一份，放到MyAPP的專案資料夾內。XCode編譯的時候，會去這個路徑底下找尋Framework。
	
- Framework檔案路徑

	![使用02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BiOS%5D/%5BiOS%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8Framework/%E4%BD%BF%E7%94%A802.png)		


回到XCode的專案屬性頁面，把Framework的參考加入到專案裡。

- 加入參考
	
	![使用03](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BiOS%5D/%5BiOS%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8Framework/%E4%BD%BF%E7%94%A803.png)

接著在專案預設的ViewController.m檔裡面，加入下列程式來使用Framework裡面所封裝的程式碼。

- 加入Framework參考

		#import <MyFramework/MyFramework.h>

- 使用Framework中的程式碼

		// test
		MyClass* x = [[MyClass alloc] init];
		NSString* message = [x getMessage];			

- 完整的ViewController.m
	
		#import <MyFramework/MyFramework.h>
		#import "ViewController.h"
		
		
		@implementation ViewController
		
		- (void)viewDidLoad {
		    
		    // super
		    [super viewDidLoad];
		    
		
		    // test
		    MyClass* x = [[MyClass alloc] init];
		    NSString* message = [x getMessage];
		    
		    // alert
		    [[[UIAlertView alloc] initWithTitle:nil message:message delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil] show];
		}

		@end

最後，執行MyAPP。可以在執行畫面上，看到一個Alert視窗顯示從Framework取得的訊息內容，這也就完成了使用Framework的相關開發步驟。

- 顯示回傳訊息

	![使用04](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BiOS%5D/%5BiOS%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8Framework/%E4%BD%BF%E7%94%A804.png)
	

##後記##

XCode編譯的時候，會去特定路徑底下搜尋Framework來加入編譯。如果需要增加或修改參考路徑，可以透過調整Build Setting裡的Framework Search Paths參數來變更。

- Framework Search Paths
	
	![後記01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BiOS%5D/%5BiOS%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8Framework/%E5%BE%8C%E8%A8%9801.png)


##範例下載##

**範例程式碼：[下載位址](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BiOS%5D/%5BiOS%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8Framework/Lab.zip)**
