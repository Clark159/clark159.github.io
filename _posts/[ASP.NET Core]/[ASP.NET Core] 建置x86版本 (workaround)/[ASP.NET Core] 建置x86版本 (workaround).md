#[ASP.NET Core] 建置x86版本 (workaround)#

##前言##

本篇文章介紹如何建置ASP.NET Core專案的x86版本輸出(workaround)，為自己留個紀錄也希望能幫助到有需要的開發人員。

- [ASP.NET Core官網](https://docs.asp.net/en/latest/fundamentals/static-files.html)


##步驟##

- 首先到微軟官網的「[.NET Downloads頁面](https://www.microsoft.com/net/download/core)」，下載並安裝：x64版本的.NET Core SDK、以及x86版本的.NET Core SDK

	![步驟01](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20%E5%BB%BA%E7%BD%AEx86%E7%89%88%E6%9C%AC%20(workaround)/%E6%AD%A5%E9%A9%9F01.png)

- 接著使用Visual Studio 2015建立一個新的ASP.NET Core專案。

	![步驟02](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20%E5%BB%BA%E7%BD%AEx86%E7%89%88%E6%9C%AC%20(workaround)/%E6%AD%A5%E9%A9%9F02.png)

- 再來編輯ASP.NET Core專案內的「project.json」，在buildOptions區塊內加入platform參數設定並且存檔。

		"buildOptions": {
		  "platform": "x86",
		  "emitEntryPoint": true,
		  "preserveCompilationContext": true
		}

- 最後使用命令提示字元，執行下列編譯指令來編譯ASP.NET Core專案。在這個編譯指令中的$(ProjectDir)，請替換為「**專案目錄**的路徑」。

		dotnet build "$(ProjectDir)" --configuration Debug --no-dependencies -r win7-x86

	![步驟03](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20%E5%BB%BA%E7%BD%AEx86%E7%89%88%E6%9C%AC%20(workaround)/%E6%AD%A5%E9%A9%9F03.png)

- 完成上述步驟後，在專案的bin目錄底下，就可以看到ASP.NET Core專案的x86版本輸出。

	![步驟04](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20%E5%BB%BA%E7%BD%AEx86%E7%89%88%E6%9C%AC%20(workaround)/%E6%AD%A5%E9%A9%9F04.png)
