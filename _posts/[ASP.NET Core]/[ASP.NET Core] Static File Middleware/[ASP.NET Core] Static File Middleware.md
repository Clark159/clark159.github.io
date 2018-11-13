#[ASP.NET Core] Static File Middleware#


##前言##

本篇文章介紹ASP.NET Core裡，用來處理靜態檔案的Middleware，為自己留個紀錄也希望能幫助到有需要的開發人員。

- [ASP.NET Core官網](https://docs.asp.net/en/latest/fundamentals/static-files.html)


##結構##

- 一個Web站台最基本的功能，就是在接收到從「瀏覽器傳入」的HTTP Request封包後，將站台內所提供的靜態檔案(Static File)，封裝成為「伺服器回傳」的HTTP Response封包內容，來提供給瀏覽器使用。

	![結構01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Static%20File%20Middleware/%E7%B5%90%E6%A7%8B01.png)

- 在ASP.NET Core裡，內建了一個Middleware：StaticFileMiddleware，用來建立Web站台提供靜態檔案的功能。這個Middleware會先剖析HTTP Request封包中的URL路徑、然後依照URL路徑計算並取得對應的File路徑下的檔案內容、接著再將該檔案內容封裝為HTTP Response封包內容，用來提供給瀏覽器使用。

	![結構02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Static%20File%20Middleware/%E7%B5%90%E6%A7%8B02.png)

- 而在StaticFileMiddleware裡，定義URL根路徑、File根路徑這兩個系統參數，來映射URL路徑所對應的File路徑。用以提供開發人員，靈活的去設定URL路徑與File路徑之間的關係。

	![開發01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Static%20File%20Middleware/%E9%96%8B%E7%99%BC01.png)

	![開發02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Static%20File%20Middleware/%E9%96%8B%E7%99%BC02.png)


##開發##

###Microsoft.AspNetCore.StaticFiles###

在ASP.NET Core裡，要加入StaticFileMiddleware來提供靜態檔案功能。開發人員可以先依照[[ASP.NET Core] Getting Started](https://dotblogs.com.tw/clark/2016/10/17/165931)這篇文章裡的步驟，來建立相關環境與基本程式碼。接著在project.json裡掛載「Microsoft.AspNetCore.StaticFiles」的參考，後續就能使用這個參考裡，所提供的StaticFileMiddleware相關物件。

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
	        "Microsoft.AspNetCore.StaticFiles": "1.0.0",
	        "Microsoft.AspNetCore.Server.Kestrel": "1.0.0"
	      },
	      "imports": "dnxcore50"
	    }
	  }
	}

###UseStaticFiles()###

完成project.json的相關設定之後，就可以回過來修改「Program.cs」。在Microsoft.AspNetCore.StaticFiles裡，提供了UseStaticFiles Extension，讓開發人員可以方便的掛載StaticFileMiddleware。在下列的範例程式碼裡，示範如何透過UseStaticFiles來掛載StaticFileMiddleware。(在StaticFileMiddleware裡面，URL根路徑預設為：「http://<Url\>」、File根路徑預設為：「file:\\\<ContentRoot\>\wwwroot」)。

![開發01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Static%20File%20Middleware/%E9%96%8B%E7%99%BC01.png)

![開發02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Static%20File%20Middleware/%E9%96%8B%E7%99%BC02.png)

	using System;
	using System.IO;
	using Microsoft.AspNetCore.Builder;
	using Microsoft.AspNetCore.Hosting;
	using Microsoft.Extensions.FileProviders;
	
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
	            // 掛載StaticFilesMiddleware
	            app.UseStaticFiles();
	        }
	    }
	}

###UseWebRoot(webRoot)###

在StaticFileMiddleware裡面，File根路徑預設為：「file:\\\<ContentRoot\>\wwwroot」。如果要變更預設的File根路徑，開發人員可以使用ASP.NET Core所提供的UseWebRoot Extension來變更預設的File根路徑。在下列的範例程式碼裡，示範如何透過UseWebRoot來變更預設的File根路徑。(範例執行時掛載的StaticFileMiddleware，URL根路徑同樣為：「http://<Url\>」、File根路徑變更為：「file:\\\<CurrentDirectory\>\aaa」)。

![開發03](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Static%20File%20Middleware/%E9%96%8B%E7%99%BC03.png)

![開發04](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Static%20File%20Middleware/%E9%96%8B%E7%99%BC04.png)

	using System;
	using System.IO;
	using Microsoft.AspNetCore.Builder;
	using Microsoft.AspNetCore.Hosting;
	using Microsoft.Extensions.FileProviders;
	
	namespace aspnetcoreapp
	{
	    public class Program
	    {
	        public static void Main(string[] args)
	        {
	            // Build
	            var host = new WebHostBuilder()
	
	                // 設定Web站台的File根路徑
	                .UseWebRoot(Directory.GetCurrentDirectory() + @"\aaa")
	
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
	            // 掛載StaticFilesMiddleware
	            app.UseStaticFiles();
	        }
	    }
	}

###UseStaticFiles(options)###

除了使用預設參數掛載StaticFilesMiddleware之外，開發人員也可以使用自訂參數來掛載StaticFilesMiddleware。如果要使用自訂參數來掛載StaticFilesMiddleware，開發人員可以同樣使用UseStaticFiles Extension來使用自訂參數掛載StaticFilesMiddleware。在下列的範例程式碼裡，示範如何透過UseStaticFiles來掛載StaticFilesMiddleware，並且定義其URL根路徑與File根路徑。(範例執行時掛載的StaticFileMiddleware，URL根路徑變更為：「http://<Url\>/bbb」、File根路徑變更為：「file:\\\<CurrentDirectory\>\ccc」)。

![開發05](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Static%20File%20Middleware/%E9%96%8B%E7%99%BC05.png)

![開發06](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Static%20File%20Middleware/%E9%96%8B%E7%99%BC06.png)

	using System;
	using System.IO;
	using Microsoft.AspNetCore.Builder;
	using Microsoft.AspNetCore.Hosting;
	using Microsoft.Extensions.FileProviders;
	
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
	            // 掛載StaticFilesMiddleware
	            app.UseStaticFiles(new StaticFileOptions()
	            {
	                // 設定URL根路徑
	                RequestPath = @"/bbb",
	
	                // 設定File根目錄
	                FileProvider = new PhysicalFileProvider(Directory.GetCurrentDirectory() + @"\ccc")
	            });
	        }
	    }
	}


##參考##

- [Working with Static Files - ASP.NET Core](https://docs.asp.net/en/latest/fundamentals/static-files.html)