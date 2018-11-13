---
layout: post
tags:   ["Tool"]
title:  "[Tool] SourceTree操作中遇到錯誤(Filename too long)的解決方案"
---

##問題情景##

使用SourceTree，可以方便開發人員使用圖形化介面的Git指令來管理原始碼。但是在Windows上使用SourceTree來管理原始碼時，某些操作會出現下列錯誤訊息：「Filename too long」。

	error: unable to create file xxxx.yyy (Filename too long)


##解決方案##

上網找了一下資料，針對「Filename too long」這個錯誤訊息，其實就是字面上的意思：原始碼檔案名稱過長。

- [Filename too long in git for windows - Stack Overflow](http://stackoverflow.com/questions/22575662/filename-too-long-in-git-for-windows)

要解決這個問題，開發人員只需要使用「**系統管理員身分**」開啟命令提示字元，接著輸入下列指令，就可以正常的使用SourceTree來管理檔名過長的原始碼。

	git config --system core.longpaths true