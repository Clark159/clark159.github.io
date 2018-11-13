---
layout: post
tags:   ["Tool"]
title:  "[Tool] 使用Visual Studio Code開發TypeScript"
---


##注意##

依照本篇操作步驟實作，就可以在「**Windows**」、「**OS X**」作業系統上，使用Visual Studio Code開發TypeScript。

##前言##

為了解決JavaScript：缺少物件導向語法、缺少編譯期間錯誤檢查...等等問題。微軟提供了一個開源的TypeScript語言，讓開發人員能夠使用物件導向撰寫TypeScript程式碼，接著再透過TypeScript編譯器將程式碼編譯成為JavaScript程式碼，就能夠建立經過編譯檢查的JavaScript程式碼來提供平台使用。

本篇文章介紹如何在「**Windows**」、「**OS X**」作業系統中，透過Visual Studio Code這個工具開發TypeScript，讓沒有預算添購相關工具的開發人員，也能夠學習TypeScript的語法。主要為自己留個紀錄，也希望能幫助到有需要的開發人員。

![前言01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20%E4%BD%BF%E7%94%A8Visual%20Studio%20Code%E9%96%8B%E7%99%BCTypeScript/%E5%89%8D%E8%A8%8001.png)


##安裝Node.js##

首先要安裝Node.js，後續就可以使用NPM這個工具來安裝TypeScript Compiler。而Node.js的安裝程式，可以從Node.js官網下載。

- **[https://nodejs.org/download/](https://nodejs.org/download/)**

![安裝01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20%E4%BD%BF%E7%94%A8Visual%20Studio%20Code%E9%96%8B%E7%99%BCTypeScript/%E5%AE%89%E8%A3%9D01.png)

![安裝02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20%E4%BD%BF%E7%94%A8Visual%20Studio%20Code%E9%96%8B%E7%99%BCTypeScript/%E5%AE%89%E8%A3%9D02.png)


##安裝TypeScript Compiler##

###安裝TypeScript Compiler##

裝完Node.js，接著就可以使用NPM來安裝TypeScript Compiler，之後就能透過這個Compiler來將TypeScript編譯成為JavaScript。開發人員使用命令提示字元(or終端機)，輸入下列指令即可完成TypeScript Compiler的安裝。

	npm install -g typescript

![安裝03](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20%E4%BD%BF%E7%94%A8Visual%20Studio%20Code%E9%96%8B%E7%99%BCTypeScript/%E5%AE%89%E8%A3%9D03.png)

###更新TypeScript Compiler##

檢視上一個步驟所安裝的TypeScript Compiler，會發現安裝的版本為1.4.1。但是因為後續步驟，需要使用到1.5.0版新加入的功能，所以開發人員同樣使用命令提示字元(or終端機)，輸入下列指令來更新TypeScript Compiler到1.5.0版以上。

	npm update -g typescript

![安裝04](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20%E4%BD%BF%E7%94%A8Visual%20Studio%20Code%E9%96%8B%E7%99%BCTypeScript/%E5%AE%89%E8%A3%9D04.png)

###移除環境變數(Windows only)##

有些開發人員的電腦，先前可能已經安裝過TypeScript相關工具，這些工具會在Windows環境變數中加入TypeScript Compiler的安裝路徑。為了統一使用NPM來管理TypeScript Compiler的版本，開發人員需要手動從環境變數中移除TypeScript Compiler的安裝路徑：

	C:\Program Files (x86)\Microsoft SDKs\TypeScript\1.0\

![安裝05](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20%E4%BD%BF%E7%94%A8Visual%20Studio%20Code%E9%96%8B%E7%99%BCTypeScript/%E5%AE%89%E8%A3%9D05.png)


##安裝Visual Studio Code##

裝完TypeScript Compiler，接著安裝Visual Studio Code，之後就能透過Visual Studio Code來開發TypeScript程式碼。而Visual Studio Code的安裝程式，可以從Visual Studio Code官網下載。

- **[https://code.visualstudio.com/Download](https://code.visualstudio.com/Download)**

![安裝06](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20%E4%BD%BF%E7%94%A8Visual%20Studio%20Code%E9%96%8B%E7%99%BCTypeScript/%E5%AE%89%E8%A3%9D06.png)

![安裝07](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20%E4%BD%BF%E7%94%A8Visual%20Studio%20Code%E9%96%8B%E7%99%BCTypeScript/%E5%AE%89%E8%A3%9D07.png)


##開發TypeScript##

###建立Workspace###

完成安裝步驟後，開啟Visual Studio Code,並且選取一個資料夾做為開發TypeScript的工作資料夾(Workspace)。

![開發01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20%E4%BD%BF%E7%94%A8Visual%20Studio%20Code%E9%96%8B%E7%99%BCTypeScript/%E9%96%8B%E7%99%BC01.png)

![開發02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20%E4%BD%BF%E7%94%A8Visual%20Studio%20Code%E9%96%8B%E7%99%BCTypeScript/%E9%96%8B%E7%99%BC02.png)

###建立tsconfig.json##

接著在Workspace加入一個新檔案「tsconfig.json」，並且輸入下列JSON設定參數。

	{
	    "compilerOptions": {
	        "target": "es5",
	        "noImplicitAny": false,
	        "module": "amd",
	        "removeComments": false,
	        "sourceMap": true
	    }
	}

![開發03](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20%E4%BD%BF%E7%94%A8Visual%20Studio%20Code%E9%96%8B%E7%99%BCTypeScript/%E9%96%8B%E7%99%BC03.png)

![開發04](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20%E4%BD%BF%E7%94%A8Visual%20Studio%20Code%E9%96%8B%E7%99%BCTypeScript/%E9%96%8B%E7%99%BC04.png)

###建立.settings\tasks.json##

再來同樣在Workspace加入一個新資料夾「.settings」，並且在這個資料夾中加入一個新檔案「tasks.json」，接著輸入下列JSON設定參數。

	{
		"version": "0.1.0",	
		"command": "tsc",
		"isShellCommand": true,
		"showOutput": "always",
		"args": ["-p", "."],
		"problemMatcher": "$tsc"
	}

![開發05](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20%E4%BD%BF%E7%94%A8Visual%20Studio%20Code%E9%96%8B%E7%99%BCTypeScript/%E9%96%8B%E7%99%BC05.png)

![開發06](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20%E4%BD%BF%E7%94%A8Visual%20Studio%20Code%E9%96%8B%E7%99%BCTypeScript/%E9%96%8B%E7%99%BC06.png)

###開發main.ts###

完成上述步驟後，在Workspace加入一個新檔案「main.ts」，並且輸入下列TypeScript程式碼。

	class Greeter {
	    data: string;
	
	    constructor(data: string) {
	        this.data = data;
	    }
	
	    run() {
	   		alert(this.data);     
	    }
	}
	
	window.onload = () => {
	    var greeter = new Greeter("Clark");
	    greeter.run();
	};

![開發07](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20%E4%BD%BF%E7%94%A8Visual%20Studio%20Code%E9%96%8B%E7%99%BCTypeScript/%E9%96%8B%E7%99%BC07.png)

最後按下快捷鍵「Ctrl+Shift+B」，就可以看到Visual Studio Code編譯TypeScript,並且輸出對應的JavaScript檔案：main.js。

	var Greeter = (function () {
	    function Greeter(data) {
	        this.data = data;
	    }
	    Greeter.prototype.run = function () {
	        alert(this.data);
	    };
	    return Greeter;
	})();
	window.onload = function () {
	    var greeter = new Greeter("Clark");
	    greeter.run();
	};
	//# sourceMappingURL=main.js.map

![開發08](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BTool%5D/%5BTool%5D%20%E4%BD%BF%E7%94%A8Visual%20Studio%20Code%E9%96%8B%E7%99%BCTypeScript/%E9%96%8B%E7%99%BC08.png)


##參考資料##

- **[Using TypeScript with Visual Studio Code on OSX - Michael Crump](http://michaelcrump.net/using-typescript-with-code/)**