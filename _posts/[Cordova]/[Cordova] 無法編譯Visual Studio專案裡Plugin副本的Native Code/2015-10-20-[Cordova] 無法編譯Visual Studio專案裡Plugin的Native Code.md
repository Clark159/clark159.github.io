---
layout: post
tags:   ["Cordova"]
title:  "[Cordova] 無法編譯Visual Studio專案裡Plugin副本的Native Code"
---


##問題情景##

開發Cordova Plugin的時候，開發的流程應該是：

1. 建立Cordova Plugin
2. 發佈到本機檔案系統或是Git伺服器
3. 使用Visual Studio掛載Plugin
4. 編譯並執行專案

在這個開發的過程中，如果在編譯並執行專案的這個步驟，發現Plugin的Native Code需要修正。直覺的想法，會是直接修改Cordova專案裡Plugin副本的Native Code之後，再重新編譯並執行專案，來確認看看修改是否正確。而實際這樣去執行，會發現修改Plugin副本的Native Code，再重新編譯專案的時候，修改內容並不會被編譯與執行。(清除專案再重建也是一樣的結果)

![問題情景01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BCordova%5D/%5BCordova%5D%20%E7%84%A1%E6%B3%95%E7%B7%A8%E8%AD%AFVisual%20Studio%E5%B0%88%E6%A1%88%E8%A3%A1Plugin%E5%89%AF%E6%9C%AC%E7%9A%84Native%20Code/%E5%95%8F%E9%A1%8C%E6%83%85%E6%99%AF01.jpg)


##解決方案##

經過排查各種操作方式之後，推測發生上述問題的原因，應該是Cordova為了縮短編譯的時間，Plugin裡面的Native Code只有在必要的時候才會編譯。而修改Plugin副本Native Code的這個動作，在目前這個版本(14.0.50925.4)，顯然不是定義為需要偵測並且重新編譯的範圍。

知道問題的原因之後，解決方案也就很簡單。既然修改Plugin副本Native Code的這個動作並不會觸發重新編譯，那就直接刪除Cordova的編譯結果：「platforms資料夾」，強迫Cordova重新編譯專案，這樣就可以讓修改過的Native Code被Cordova給重新編譯。

![解決方案01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BCordova%5D/%5BCordova%5D%20%E7%84%A1%E6%B3%95%E7%B7%A8%E8%AD%AFVisual%20Studio%E5%B0%88%E6%A1%88%E8%A3%A1Plugin%E5%89%AF%E6%9C%AC%E7%9A%84Native%20Code/%E8%A7%A3%E6%B1%BA%E6%96%B9%E6%A1%8801.png)


