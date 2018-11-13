#[ASP.NET Core] Getting Started#


##前言##

本篇文章介紹如何快速建立一個ASP.NET Core應用程式，為自己留個紀錄也希望能幫助到有需要的開發人員。

- [ASP.NET Core官網](https://docs.asp.net/en/latest/)


##環境##

建立一個ASP.NET Core應用程式，首先要從官網下載SDK來建置.NET Core開發環境。

- [.NET Core官網](https://www.microsoft.com/net/core)

	![環境01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Getting%20Started/%E7%92%B0%E5%A2%8301.png)

- 依照作業系統下載.NET Core SDK。

    ![環境02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Getting%20Started/%E7%92%B0%E5%A2%8302.png)

    ![環境03](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Getting%20Started/%E7%92%B0%E5%A2%8303.png)

- 安裝.NET Core SDK

	![環境04](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Getting%20Started/%E7%92%B0%E5%A2%8304.png)

- .NET Core SDK安裝完畢後，開啟命令提示字元。輸入「dotnet」，系統正常回應.NET Core的相關訊息，即完成.NET Core開發環境的建置。

	![環境05](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Getting%20Started/%E7%92%B0%E5%A2%8305.png)


##開發##

- 完成開發環境的建置後，就可以動手撰寫ASP.NET Core應用程式。首先建立一個新的資料夾：「lab」。

	![開發01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Getting%20Started/%E9%96%8B%E7%99%BC01.png)

- 接著在lab資料夾裡，加入一個檔案：「project.json」。並且修改檔案內容為下列json格式內容，用以設定ASP.NET Core應用程式的專案參數。

	![開發02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Getting%20Started/%E9%96%8B%E7%99%BC02.png)

		{
		  "version": "1.0.0-*",
		  "buildOptions": {
		    "debugType": "portable",
		    "emitEntryPoint": true
		  },
		  "dependencies": {},
		  "frameworks": {
		    "netcoreapp1.0": {
		      "dependencies": {
		        "Microsoft.NETCore.App": {
		          "type": "platform",
		          "version": "1.0.0"
		        },
		        "Microsoft.AspNetCore.Server.Kestrel": "1.0.0"
		      },
		      "imports": "dnxcore50"
		    }
		  }
		}

- 接著同樣在lab資料夾裡，加入一個檔案：「Program.cs」。並且修改檔案內容為下列C#程式碼內容，用以做為ASP.NET Core應用程式的範例程式。

	![開發03](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Getting%20Started/%E9%96%8B%E7%99%BC03.png)

		using System;
		using System.IO;
		using System.Threading.Tasks;
		using Microsoft.AspNetCore.Builder;
		using Microsoft.AspNetCore.Hosting;
		using Microsoft.AspNetCore.Http;
		
		namespace aspnetcoreapp
		{
		    public class Program
		    {
		        public static void Main(string[] args)
		        {
		            // Build
		            var host = new WebHostBuilder()
		
		                // 設定Host內容的File根路徑
		                .UseContentRoot(Directory.GetCurrentDirectory())
		
		                // 設定啟動參數
		                .UseStartup<Startup>()
		
		                // 開啟Kestrel聆聽HTTP            
		                .UseKestrel()
		
		                // 設定聆聽的URL
		                .UseUrls("http://localhost:5000")
		
		                // 建立Host       
		                .Build();
		
		            // Run 
		            try
		            {
		                // 啟動Host
		                host.Start();
		
		                // 等待關閉
		                Console.WriteLine("Application started. Press any key to shut down.");
		                Console.ReadKey();
		            }
		            finally
		            {
		                // 關閉Host
		                host.Dispose();
		            }
		        }
		    }
		
		    public class Startup
		    {
		        // Methods
		        public void Configure(IApplicationBuilder app)
		        {
		            // 掛載自訂的Middleware
		            app.UseMiddleware<HelloWorldMiddleware>();
		        }
		    }
		
		    public class HelloWorldMiddleware
		    {
		        // Fields
		        private readonly RequestDelegate _next;
		
		        // Constructors
		        public HelloWorldMiddleware(RequestDelegate next)
		        {
		            _next = next;
		        }
		
		        // Methods
		        public Task Invoke(HttpContext context)
		        {
		            // Response
		            context.Response.WriteAsync("Hello World!");
		
		            // return
		            return Task.CompletedTask;
		        }
		    }
		}

- 再來開啟命令提示字元，進入到上述的lab資料夾後。輸入「dotnet restore」，用以初始化ASP.NET Core應用程式。

	![開發04](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Getting%20Started/%E9%96%8B%E7%99%BC04.png)

- 初始化ASP.NET Core應用程式後，接著輸入「dotnet run」，用以編譯並執行ASP.NET Core應用程式。

	![開發05](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Getting%20Started/%E9%96%8B%E7%99%BC05.png)

- 開發工作進行完畢之後，開發人員就可以開啟瀏覽器，輸入URL：「http://localhost:5000」，就可以在瀏覽器上，看到應用程式回傳的"Hello World!"。

	![開發06](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Getting%20Started/%E9%96%8B%E7%99%BC06.png)


##參考##

- [Getting Started - ASP.NET Core](https://docs.asp.net/en/latest/getting-started.html)

- [ASP.NET Core 1.0 Hello World - 小朱® 的技術隨手寫](https://dotblogs.com.tw/regionbbs/2016/02/24/aspnet_core_1_with_dotnet_core_cli_hello_world_tutorial)

- [ASP.NET Core 的 Middleware - ASP.NET Core 資訊分享](https://dotblogs.com.tw/aspnetshare/2016/03/20/201603191-intromiddleware)