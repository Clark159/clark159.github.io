#[Tool] 使用Markdown格式編寫點部落文章v2#

開始玩GitHub之後接觸到Markdown格式，在GitHub中每個Repository的README文件，都是以Markdown格式來編寫。使用Markdown格式編寫文件，可以將注意力集中在大綱、標題、內文...等等實際傳達資訊的內容上。不像使用HTML格式編寫文件，除了需要關注上列這些傳達資訊的內容之外，還要去設計字型、顏色、縮排...等等排版上的細節。

當然啦，有一好沒兩好，Markdown格式少了這些排版上的細節，也就代表最終產出的文件顯得比較制式化。不過這個缺點，對於像筆者這種美術天份為零的人反而是種優點，因為筆者自己用HTML格式排出來的文件只能用慘不忍睹來形容。

本篇文章介紹如何使用Markdown格式來編寫點部落文章，並在編寫完畢之後透過工具匯出為HTML格式張貼到點部落。接著透過修改CSS樣式的方式，讓文章在點部落中的呈現樣式，近似於GitHub中Markdown文件的呈現樣式。期望能透過這樣的方式，減少開發人員在編寫點部落文章時，花費在文字排版上的時間。


##工具下載##

對於Markdown格式熟悉的開發人員，直接使用window內建的記事本就可以編寫Markdown格式的文件，但這邊要推薦一個Markdown編輯器：MarkdownPad。MarkdownPad這個編輯器在官方網站上，提供了免費的下載版本，在這個版本中除了提供所見即所得的編輯功能之外，將Markdown格式匯出成為HTML格式、PDF格式等等實用功能也沒有缺少。

- [MarkdownPad官網](http://markdownpad.com/)

	![工具下載01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20%E4%BD%BF%E7%94%A8Markdown%E6%A0%BC%E5%BC%8F%E7%B7%A8%E5%AF%AB%E9%BB%9E%E9%83%A8%E8%90%BD%E6%96%87%E7%AB%A0v2/%E5%B7%A5%E5%85%B7%E4%B8%8B%E8%BC%8901.png)


##文件編寫##

於MarkdownPad官網下載免費版本的程式，並且安裝在目標電腦之後，就可以開啟MarkdownPad來編寫Markdown格式的文件。在編寫文件的過程中，除了使用IDE功能來編寫之外，也可以透過直接輸入Markdown格式的方式來編寫，關於MarkdownPad IDE功能的操作說明、Markdown格式的語法說明可以參考下列兩個網址：

- [MarkdownPad官網](http://markdownpad.com/)
- [Markdown語法說明](http://markdown.tw/)

這邊要特別一提的是，Markdown格式中插入圖片，跟HTML格式一樣只能插入圖片的超連結，也就是要將圖片先上傳到網路空間，然後才能在Markdown格式中使用。

- 要將圖片上傳到網路空間，可以使用點部落後台的新增文章功能裡，內文編輯器的檔案上傳來完成。

	![文件編寫01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20%E4%BD%BF%E7%94%A8Markdown%E6%A0%BC%E5%BC%8F%E7%B7%A8%E5%AF%AB%E9%BB%9E%E9%83%A8%E8%90%BD%E6%96%87%E7%AB%A0v2/%E6%96%87%E4%BB%B6%E7%B7%A8%E5%AF%AB01.png)

- 圖片上傳之後，就可以在內文編輯器裡取得圖片的超連結。

	![文件編寫02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20%E4%BD%BF%E7%94%A8Markdown%E6%A0%BC%E5%BC%8F%E7%B7%A8%E5%AF%AB%E9%BB%9E%E9%83%A8%E8%90%BD%E6%96%87%E7%AB%A0v2/%E6%96%87%E4%BB%B6%E7%B7%A8%E5%AF%AB02.png)


##文件匯出##

在文件編寫完畢之後，就可以使用MarkdownPad提供的匯出功能，將Markdown格式匯出成為HTML格式。

- 匯出HTML格式。

	![文件匯出01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20%E4%BD%BF%E7%94%A8Markdown%E6%A0%BC%E5%BC%8F%E7%B7%A8%E5%AF%AB%E9%BB%9E%E9%83%A8%E8%90%BD%E6%96%87%E7%AB%A0v2/%E6%96%87%E4%BB%B6%E5%8C%AF%E5%87%BA01.png)


##文件發佈##

取得匯出的HTML文件之後，接下來就是從這份文件中，抽取HTML格式的文章內容，並且轉貼到點部落成為新增文章的文章內容。

- 首先使用記事本開啟匯出的HTML文件，可以看到文章內容被定義在body標籤之內。

	![文件發佈01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20%E4%BD%BF%E7%94%A8Markdown%E6%A0%BC%E5%BC%8F%E7%B7%A8%E5%AF%AB%E9%BB%9E%E9%83%A8%E8%90%BD%E6%96%87%E7%AB%A0v2/%E6%96%87%E4%BB%B6%E7%99%BC%E4%BD%8801.png)

- 接著將包含文章內容的body標籤，改寫為div標籤，並且加上.md的CSS Class宣告。

	![文件發佈02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20%E4%BD%BF%E7%94%A8Markdown%E6%A0%BC%E5%BC%8F%E7%B7%A8%E5%AF%AB%E9%BB%9E%E9%83%A8%E8%90%BD%E6%96%87%E7%AB%A0v2/%E6%96%87%E4%BB%B6%E7%99%BC%E4%BD%8802.png)

- 最後開啟點部落的新增文章功能，將整段包含文章內容的div標籤從記事本中複製，並且在文章內容的原始碼欄位中貼上。

	![文件發佈03](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20%E4%BD%BF%E7%94%A8Markdown%E6%A0%BC%E5%BC%8F%E7%B7%A8%E5%AF%AB%E9%BB%9E%E9%83%A8%E8%90%BD%E6%96%87%E7%AB%A0v2/%E6%96%87%E4%BB%B6%E7%99%BC%E4%BD%8803.png)

- 完成上列步驟之後，繼續填寫必要的欄位，並且按下儲存文章，就可以將文章發佈到點部落。

	![文件發佈04](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20%E4%BD%BF%E7%94%A8Markdown%E6%A0%BC%E5%BC%8F%E7%B7%A8%E5%AF%AB%E9%BB%9E%E9%83%A8%E8%90%BD%E6%96%87%E7%AB%A0v2/%E6%96%87%E4%BB%B6%E7%99%BC%E4%BD%8804.png)


##樣式設定##

將文章發佈到點部落之後，打開文章網址去觀看剛剛發佈的文章內容，會發現整個排版歪七扭八的。這是因為還沒有將先前匯出的HTML文件裡面所包含的CSS樣式，抽取出來定義到點部落之中。

- 開發人員可以直接點選下載超連結，來取得改寫完畢的Markdown CSS樣式：

	- [**MarkdownCss下載**](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20%E4%BD%BF%E7%94%A8Markdown%E6%A0%BC%E5%BC%8F%E7%B7%A8%E5%AF%AB%E9%BB%9E%E9%83%A8%E8%90%BD%E6%96%87%E7%AB%A0v2/MarkdownCss.txt)	
	
- 接著開啟點部落的組態設定功能，將改寫過後的CSS樣式複製，並且在Custom CSS的欄位中貼上。

	![樣式設定01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20%E4%BD%BF%E7%94%A8Markdown%E6%A0%BC%E5%BC%8F%E7%B7%A8%E5%AF%AB%E9%BB%9E%E9%83%A8%E8%90%BD%E6%96%87%E7%AB%A0v2/%E6%A8%A3%E5%BC%8F%E8%A8%AD%E5%AE%9A01.png)

- 完成上述步驟之後，打開文章網址去觀看剛剛發佈的文章內容，可以看到文章內容近似於MarkdownPad上所呈現的樣式。

	![樣式設定02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20%E4%BD%BF%E7%94%A8Markdown%E6%A0%BC%E5%BC%8F%E7%B7%A8%E5%AF%AB%E9%BB%9E%E9%83%A8%E8%90%BD%E6%96%87%E7%AB%A0v2/%E6%A8%A3%E5%BC%8F%E8%A8%AD%E5%AE%9A02.png)


##範例展示##

而在最後，展示一個使用Markdown格式建立的技術文章，這份技術文章除了使用本篇介紹的方法張貼在點部落之外，也直接將Markdown文件做為GitHub中Repository的README文件來發佈。而從最終呈現樣式來看，文章在點部落中的呈現樣式，近似於GitHub中Markdown文件的呈現樣式。 :D

- 點部落版本：[https://www.dotblogs.com.tw](https://www.dotblogs.com.tw/clark/2015/11/24/132400)

- GitHub版本：[https://github.com](https://github.com/Clark159/clark159.github.io/blob/master/_posts/%5BTool%5D/%5BTool%5D%20%E4%BD%BF%E7%94%A8Markdown%E6%A0%BC%E5%BC%8F%E7%B7%A8%E5%AF%AB%E9%BB%9E%E9%83%A8%E8%90%BD%E6%96%87%E7%AB%A0v2/%5BTool%5D%20%E4%BD%BF%E7%94%A8Markdown%E6%A0%BC%E5%BC%8F%E7%B7%A8%E5%AF%AB%E9%BB%9E%E9%83%A8%E8%90%BD%E6%96%87%E7%AB%A0v2.md)


