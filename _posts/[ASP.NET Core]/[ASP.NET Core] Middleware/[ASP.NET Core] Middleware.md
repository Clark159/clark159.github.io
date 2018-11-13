#[ASP.NET Core] Middleware#


##前言##

本篇文章介紹ASP.NET Core裡，用來處理HTTP封包的Middleware，為自己留個紀錄也希望能幫助到有需要的開發人員。

- [ASP.NET Core官網](https://docs.asp.net/en/latest/fundamentals/middleware.html)


##結構##

- 在ASP.NET Core裡，每個從「瀏覽器傳入」的HTTP Request封包，會被系統封裝為「HttpRequest物件」，並且配置預設的HttpResponse物件、Session物件、ClaimsPrincipal物件...等等物件。接著將這些物件，封裝成為一個「HttpContext物件」，用來提供ASP.NET Core後續使用。

	![結構01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Middleware/%E7%B5%90%E6%A7%8B01.png)

- ASP.NET Core在收到HttpContext之後，會把它交給一個「Pipeline」去處理。這個Pipeline裡面配置很多「Middleware」。系統會將HttpContext，依序傳遞給Pipeline裡的Middleware去處理。每個Middleware會依照自己內部的程式邏輯，來運算處理HttpContext，並且變更HttpContext所封裝的物件內容。

	![結構02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Middleware/%E7%B5%90%E6%A7%8B02.png)

- ASP.NET Core在收到經由Middleware處理完畢的HttpContext之後，就會取出其中所封裝的HttpResponse物件。然後依照這個HttpResponse物件，來建立從「伺服器回傳」的HTTP Response封包內容。

	![結構03](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Middleware/%E7%B5%90%E6%A7%8B03.png)

- ASP.NET Core經由上述的系統結構，完成HTTP Request封包輸入、HTTP Response封包輸出的工作流程。

	![結構04](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Middleware/%E7%B5%90%E6%A7%8B04.png)


##開發##

###Invoke###

在[[ASP.NET Core] Getting Started](https://dotblogs.com.tw/clark/2016/10/17/165931)這篇文章裡，提供了一個ASP.NET Core的Middleware範例：HelloWorldMiddleware。在這個範例裡，Middleware透過實做Invoke方法，來提供自己所封裝的程式邏輯。

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

            // Return
            return Task.CompletedTask;
        }
    }

![開發01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Middleware/%E9%96%8B%E7%99%BC01.png)

###HttpContext.Request###

在實做Middleware.Invoke方法的時候，開發人員可以透過HttpContext.Request，來取得從「瀏覽器傳入」的HTTP Request封包內容。在下列的範例程式碼裡，就是透過HttpContext.Request的Path、QueryString兩個屬性，來分別取得HTTP Request封包的URL路徑與QueryString內容。

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
            // Request
            string path = context.Request.Path.ToString();
            string queryString = context.Request.QueryString.ToString();
            string message = string.Format("path={0}, queryString={1}", path, queryString);

            // Response
            context.Response.WriteAsync(message);

            // Return
            return Task.CompletedTask;
        }
    }

![開發02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Middleware/%E9%96%8B%E7%99%BC02.png)

###HttpContext.Response###

同樣在實做Middleware.Invoke方法的時候，開發人員可以透過HttpContext.Response，來設定從「伺服器回傳」的HTTP Response封包內容。在下列的範例程式碼裡，就是透過HttpContext.Response的WriteAsync方法、StatusCode屬性，來分別設定HTTP Response封包的Content與StatusCode。

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
            context.Response.StatusCode = 404;
            context.Response.WriteAsync("Not Found");

            // Return
            return Task.CompletedTask;
        }
    }

![開發03](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Middleware/%E9%96%8B%E7%99%BC03.png)

###Exception###

而在實做Middleware.Invoke方法的時候，如果程式碼裡發生了預期之外的Exception。ASP.NET Core預設會使用「500 Internal Server Error」，這個StatusCode來通報系統內部發生異常。
在下列的範例程式碼裡，就是直接拋出一個例外錯誤，交由ASP.NET Core的錯誤處理機制去處理。

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
            // Exception
            throw new Exception();

            // Return
            return Task.CompletedTask;
        }
    }

![開發04](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20Core%5D/%5BASP.NET%20Core%5D%20Middleware/%E9%96%8B%E7%99%BC04.png)

###RequestDelegate###

建立Middleware的時候，開發人員可以透過建構子所傳入的RequestDelegate，來參考到Pipeline裡的下一個Middleware。透過調用RequestDelegate，就可以調用Pipeline裡的下一個Middleware的Invoke方法。在下列的範例程式碼裡，就是透過調用RequestDelegate，來調用Pipeline裡的下一個Middleware的Invoke方法，藉此串接其他Middleware的程式邏輯。

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
        public async Task Invoke(HttpContext context)
        {
            // Do Something 01
            //....

            // Next
            await _next.Invoke(context);

            // Do Something 02
            // ...
        }
    }


##參考##

- [Middleware - ASP.NET Core](https://docs.asp.net/en/latest/fundamentals/middleware.html)

- [ASP.NET Core 的 Middleware - ASP.NET Core 資訊分享](https://dotblogs.com.tw/aspnetshare/2016/03/20/201603191-intromiddleware)