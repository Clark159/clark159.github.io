---
layout: post
tags:   ["Android"]
title:  "[Android] 建立與使用Library"
---


##前言##

使用Eclipse開發Android專案時，開發人員可以將可重用的程式碼，封裝為Library來提供其他開發人員使用。本篇文章介紹如何將可重用的程式碼封裝為Library，主要為自己留個紀錄，也希望能幫助到有需要的開發人員。

![前言01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BAndroid%5D/%5BAndroid%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8Library/%E5%89%8D%E8%A8%8001.png)


##建立##

先開啟Eclipse來建立一個新專案：「myLibrary」，勾選「Mark this project as a library」用來標註新專案為Library類型，並且取消暫時用不到的兩個選項：「Create custom launcher icon」、「Create Activity」。之後這個專案就可以用來封裝可重用的程式碼，提供其他開發人員使用。

- 建立專案

	![建立01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BAndroid%5D/%5BAndroid%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8Library/%E5%BB%BA%E7%AB%8B01.png)

- 建立設定
	
	![建立02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BAndroid%5D/%5BAndroid%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8Library/%E5%BB%BA%E7%AB%8B02.png)


接著在MyLibrary加入一個新類別：「MyClass」,做為提供給其他開發人員使用的程式碼。

- MyClass.java

		package myLibrary;
		
		public class MyClass {
		
			// methods
			public String getMessage()
			{
				return "Clark";
			}
		}

建立類別之後，只要存檔並且編譯專案，就可以在專案的bin目錄下取得編譯完成的myLibrary.jar。

- 產出myLibrary.jar
	
	![建立03](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BAndroid%5D/%5BAndroid%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8Library/%E5%BB%BA%E7%AB%8B03.png)


##使用##

接著開啟Eclipse來建立一個新專案：「myAPP」，這個專案用來說明，如何使用封裝為Library的程式碼。

- 建立專案

	![使用01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BAndroid%5D/%5BAndroid%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8Library/%E4%BD%BF%E7%94%A801.png)

- 建立設定
	
	![使用02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BAndroid%5D/%5BAndroid%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8Library/%E4%BD%BF%E7%94%A802.png)


再來在專案的lib目錄上點擊滑鼠右鍵開啟Import對話框，並且選取File System。

- 開啟Import對話框

	![使用03](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BAndroid%5D/%5BAndroid%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8Library/%E4%BD%BF%E7%94%A803.png)

- 選取File System

	![使用04](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BAndroid%5D/%5BAndroid%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8Library/%E4%BD%BF%E7%94%A804.png)


接著選擇先前所建立的myLibrary下的bin目錄，把myLibrary.jar加入到目前專案裡。 

- 加入myLibrary.jar

	![使用05](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BAndroid%5D/%5BAndroid%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8Library/%E4%BD%BF%E7%94%A805.png)

完成設定步驟之後，接著在專案預設的MainActivity.java檔裡面，加入下列程式來使用Library裡面所封裝的程式碼。


- 加入Library參考

		import myLibrary.MyClass;

- 使用Library中的程式碼

		// test
		MyClass x = new MyClass();
		String message = x.getMessage();

- 完整的MainActivity.java

		package com.example.myapp;
		
		import android.app.Activity;
		import android.app.AlertDialog;
		import android.app.AlertDialog.Builder;
		import android.os.Bundle;
		import myLibrary.MyClass;
		
		public class MainActivity extends Activity {
		
			@Override
			protected void onCreate(Bundle savedInstanceState) {
				
				// super
				super.onCreate(savedInstanceState);
				
				// init
				setContentView(R.layout.activity_main);
				
				// test
				MyClass x = new MyClass();
				String message = x.getMessage();
				
				// alert
				Builder alert = new AlertDialog.Builder(this);
				alert.setMessage(message);
				alert.show();
			}
		}


最後，執行MyAPP。可以在執行畫面上，看到一個Alert視窗顯示從Library取得的訊息內容，這也就完成了使用Library的相關開發步驟。

- 顯示回傳訊息

	![使用06](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BAndroid%5D/%5BAndroid%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8Library/%E4%BD%BF%E7%94%A806.png)


##範例下載##

**範例程式碼：[下載位址](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BAndroid%5D/%5BAndroid%5D%20%E5%BB%BA%E7%AB%8B%E8%88%87%E4%BD%BF%E7%94%A8Library/Lab.rar)**
