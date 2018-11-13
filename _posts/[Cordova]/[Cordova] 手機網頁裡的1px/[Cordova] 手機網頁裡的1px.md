#[Cordova] 手機網頁裡的1px#


##1px的顯示##

Cordova讓開發人員可以使用HTML頁面，來開發APP的顯示內容。但是在手機上，HTML頁面裡定義的1px，並不是直接對應到手機螢幕的一個像素。而是會依照尺寸、解析度等等數值，計算出一個倍率值，在螢幕上做等比的顯示。也就是說，HTML頁面裡的1px，在不同的手機上，可能會以兩個螢幕像素、或是三個螢幕像素來做顯示。

相關的技術細節可以參考下列資料：

- [移动端尺寸基础知识 - 可乐橙的私房demo](http://colachan.com/post/3435)


##Chrome開發者工具，對於手機網頁1px的支援##

HTML頁面的調適工具，最常被人提起的應該就是Chrome開發者工具。而Chrome開發者工具，對於手機網頁裡的1px，提供了像素換算的功能支援。

- 當開發人員點擊F12，開啟開發者工具之後，再點擊頁面裡的Toggle device mode按鈕，就可以開啟模擬手機顯示網頁的功能。

	![01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BCordova%5D/%5BCordova%5D%20%E6%89%8B%E6%A9%9F%E7%B6%B2%E9%A0%81%E8%A3%A1%E7%9A%841px/01.png)

- 在模擬手機顯示網頁的工具列上，開發人員可以看到目前所模擬的手機的解析度。這邊要特別注意的是，這個解析度是經由Chrome換算過的網頁解析度。Chrome依照手機機型、手機網頁裡的1px與實際顯示在螢幕上的像素比率，換算出滿版網頁的一頁長寬是多少px，來做為網頁解析度。開發人員只要使用這個網頁解析度來開發網頁，在該手機機型上，就會顯示的近似於在Chrome開發者工具裡見到的樣式。

	![02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BCordova%5D/%5BCordova%5D%20%E6%89%8B%E6%A9%9F%E7%B6%B2%E9%A0%81%E8%A3%A1%E7%9A%841px/02.png)


##Chrome開發者工具，自訂網頁解析度##

在Chrome開發者工具裡，雖然提供了很多種手機機型供開發人員使用，但並無法提供所有的手機機型。當開發人員的目標手機機型，不在Chrome所提供的清單時，開發人員可以自訂網頁解析度來進行開發工作。

![03](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BCordova%5D/%5BCordova%5D%20%E6%89%8B%E6%A9%9F%E7%B6%B2%E9%A0%81%E8%A3%A1%E7%9A%841px/03.png)

而要取得手機的網頁解析度，開發人員可以使用手機開啟下列網址，該網頁提供網頁解析度檢測的功能。開發人員進入該網頁後，可以先記下頁面所顯示的寬度數據，再橫轉手機就可以取得長度數據，這兩個數據也就是該機型的網頁解析度。

- [取得網頁解析度 - 可乐橙的私房demo](http://greenzorro.github.io/demo/basic/%E5%93%8D%E5%BA%94%E5%BC%8F%E6%96%AD%E7%82%B9.html)

- 網頁解析度-寬度:
	
	![04](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BCordova%5D/%5BCordova%5D%20%E6%89%8B%E6%A9%9F%E7%B6%B2%E9%A0%81%E8%A3%A1%E7%9A%841px/04.png)

- 網頁解析度-長度:

	![05](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BCordova%5D/%5BCordova%5D%20%E6%89%8B%E6%A9%9F%E7%B6%B2%E9%A0%81%E8%A3%A1%E7%9A%841px/05.png)


##參考資料##

- [移动端尺寸基础知识 - 可乐橙的私房demo](http://colachan.com/post/3435)






