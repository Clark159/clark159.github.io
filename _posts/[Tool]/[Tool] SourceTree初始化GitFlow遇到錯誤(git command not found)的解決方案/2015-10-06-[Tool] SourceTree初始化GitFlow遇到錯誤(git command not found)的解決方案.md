---
layout: post
tags:   ["Tool"]
title:  "[Tool] SourceTree初始化GitFlow遇到錯誤(git command not found)的解決方案"
---

##問題情景##

使用SourceTree，可以方便開發人員快速的套用GitFlow開發流程。但是在安裝完SourceTree、Clone Repository之後，準備透過SourceTree來初始化GitFlow相關設定時，某些開發環境裡，會出現下列錯誤訊息：「git: command not found」。

![問題情景01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20SourceTree%E5%88%9D%E5%A7%8B%E5%8C%96GitFlow%E9%81%87%E5%88%B0%E9%8C%AF%E8%AA%A4(git%20command%20not%20found)%E7%9A%84%E8%A7%A3%E6%B1%BA%E6%96%B9%E6%A1%88/%E5%95%8F%E9%A1%8C%E6%83%85%E6%99%AF01.png)


##解決方案##

上網找了一下資料，針對「git: command not found」這個問題，可以發現是環境變數裡，Path沒有加入Git執行路徑的參考：

- [Git: Command not found Windows - SuperUser](http://superuser.com/questions/568964/git-command-not-found-windows)

要解決這個問題，開發人員只需要在Path裡加入Git執行路徑的參考：「C:\Program Files\Git\cmd」，並且重啟SourceTree，就可以正常的使用SourceTree來初始化GitFlow。

![解決方案01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20SourceTree%E5%88%9D%E5%A7%8B%E5%8C%96GitFlow%E9%81%87%E5%88%B0%E9%8C%AF%E8%AA%A4(git%20command%20not%20found)%E7%9A%84%E8%A7%A3%E6%B1%BA%E6%96%B9%E6%A1%88/%E8%A7%A3%E6%B1%BA%E6%96%B9%E6%A1%8801.png)

