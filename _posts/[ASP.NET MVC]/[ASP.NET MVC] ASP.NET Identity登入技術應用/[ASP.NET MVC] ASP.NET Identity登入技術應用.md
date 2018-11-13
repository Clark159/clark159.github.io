---
layout: post
tags:   ["ASP.NET MVC"]
title:  "[ASP.NET MVC] ASP.NET Identity登入技術應用"
---


##情景##

ASP.NET Identity是微軟所貢獻的開源專案，用來提供ASP.NET的驗證、授權等等機制。在ASP.NET Identity裡除了提供最基礎的：使用者註冊、密碼重設、密碼驗證等等基礎功能之外，也提供了進階的：Cookie登入、Facebook登入、Google登入等等進階功能。套用這些功能模組，讓開發人員可以快速的在ASP.NET站台上，提供驗證、授權等等機制。

![情景01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20MVC%5D/%5BASP.NET%20MVC%5D%20ASP.NET%20Identity%E7%99%BB%E5%85%A5%E6%8A%80%E8%A1%93%E6%87%89%E7%94%A8/%E6%83%85%E6%99%AF01.png)

但是在企業中，開發人員常常會遇到一種開發情景就是：企業裡已經有一套既有身分系統，這個系統提供了：使用者註冊、密碼重設、密碼驗證等等功能，新開發的ASP.NET站台，必須要串接既有身分系統來提供驗證、授權等等機制。這個既有身分系統，可能是大賣場會員管理系統、也可能是銀行帳戶管理系統，它們的註冊審核機制有一套嚴謹並且固定的流程。

在這樣的開發情景中，開發人員可能會選擇透過程式接口、OAuth機制等等方式，將既有身分系統整合成為ASP.NET Identity的驗證提供者。這樣兩個系統之間的整合，除了有一定的高技術門檻之外。在整合之後，兩個系統之間互相重疊的功能模組，操作流程的衝突該如何處理，也是一個需要額外考量的複雜問題。

![情景02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20MVC%5D/%5BASP.NET%20MVC%5D%20ASP.NET%20Identity%E7%99%BB%E5%85%A5%E6%8A%80%E8%A1%93%E6%87%89%E7%94%A8/%E6%83%85%E6%99%AF02.png)

一個好消息是，ASP.NET Identity擁有高度模組化的軟體架構。在ASP.NET Identity中，將Cookie登入、Facebook登入、Google登入等等功能模組，切割為獨立的ASP.NET Security套件。開發人員完全可以直接套用ASP.NET Security套件，快速整合既有的身分系統，就可以提供ASP.NET站台所需的驗證、授權等等機制。本篇文章介紹如何套用ASP.NET Security來整合既有身分系統，用以提供ASP.NET站台所需的驗證、授權等等機制。主要為自己留個紀錄，也希望能幫助到有需要的開發人員。

[ASP.NET Security - GitHub](https://github.com/aspnet/Security)

![情景03](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20MVC%5D/%5BASP.NET%20MVC%5D%20ASP.NET%20Identity%E7%99%BB%E5%85%A5%E6%8A%80%E8%A1%93%E6%87%89%E7%94%A8/%E6%83%85%E6%99%AF03.png)


##範例##

**範例程式碼：[下載位址](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BASP.NET%20MVC%5D/%5BASP.NET%20MVC%5D%20ASP.NET%20Identity%E7%99%BB%E5%85%A5%E6%8A%80%E8%A1%93%E6%87%89%E7%94%A8/IdentitySample.zip)**


##開發##

開始套用ASP.NET Security之前，先建立一個空白的MVC專案，來提供一個新的ASP.NET站台。並且變更預設的Web伺服器URL為：「http://localhost:41532/」，方便完成後續的開發步驟。

![開發01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20MVC%5D/%5BASP.NET%20MVC%5D%20ASP.NET%20Identity%E7%99%BB%E5%85%A5%E6%8A%80%E8%A1%93%E6%87%89%E7%94%A8/%E9%96%8B%E7%99%BC01.png)

![開發02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20MVC%5D/%5BASP.NET%20MVC%5D%20ASP.NET%20Identity%E7%99%BB%E5%85%A5%E6%8A%80%E8%A1%93%E6%87%89%E7%94%A8/%E9%96%8B%E7%99%BC02.png)

再來在MVC專案裡加入三個ASP.NET Security的NuGet套件參考：Microsoft.AspNet.Authentication、Microsoft.AspNet.Authentication.Cookies、Microsoft.AspNet.Authentication.Facebook。

![開發03](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20MVC%5D/%5BASP.NET%20MVC%5D%20ASP.NET%20Identity%E7%99%BB%E5%85%A5%E6%8A%80%E8%A1%93%E6%87%89%E7%94%A8/%E9%96%8B%E7%99%BC03.png)

接著建立AccountController以及相關的View，用以提供登入頁面，讓使用者可以選擇使用哪種模式登入系統。

    public class AccountController : Controller
    {
        // Methods
        public IActionResult Login(string returnUrl = null)
        {
            // ViewData
            this.ViewData["ReturnUrl"] = returnUrl;

            // Return
            return View();
        }
    }

再來在MVC專案內加入下列程式碼，用以掛載與設定後續要使用的兩個CookieAuthenticationMiddleware。(**關於程式碼的相關背景知識，請參閱技術剖析說明：[ASP.NET Identity登入技術剖析](https://dotblogs.com.tw/clark/2016/02/09/051015)**)

    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            // Authentication
            services.AddAuthentication(options =>
            {
                options.SignInScheme = IdentityOptions.Current.ExternalCookieAuthenticationScheme;
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            // Authentication
            app.UseCookieAuthentication(options =>
            {
                options.AuthenticationScheme = IdentityOptions.Current.ApplicationCookieAuthenticationScheme;
                options.AutomaticAuthenticate = true;
                options.AutomaticChallenge = true;
                options.LoginPath = new PathString("/Account/login");
            });

            app.UseCookieAuthentication(options =>
            {
                options.AuthenticationScheme = IdentityOptions.Current.ExternalCookieAuthenticationScheme;
                options.AutomaticAuthenticate = false;
                options.AutomaticChallenge = false;
                options.LoginPath = null;
            });
        }
    }

最後在MVC專案內，建立ExistingIdentitySystem這個類別用來模擬既有身分系統。為了方便理解系統，ExistingIdentitySystem裡的PasswordSignIn(密碼登入)、ExternalSignIn(第三方登入ex:FB登入)等方法都直接回傳成功訊息，而GetUserById(取得使用者)這個方法則是直接回傳固定的使用者資訊。(在正式環境開發時，上述方法可以實作為透過WebAPI、或是直接連通資料庫等等方式，與既有身分系統取得相關資訊。)

    public class ExistingIdentitySystem
    {
        // Methods
        public ExistingUser GetUserById(string userId)
        {
            // Result
            var user = new ExistingUser();
            user.Id = "Clark.Lab@hotmail.com";
            user.Name = "Clark";
            user.Birthday = DateTime.Now;

            // Return
            return user;
        }

        public bool PasswordSignIn(string userId, string password)
        {
            // Return
            return true;
        }

        public bool ExternalSignIn(string userId, string externalProvider)
        {
            switch (externalProvider)
            {
                case "Facebook": return true;

                default:
                    return true;
            }
        }
    }

    public class ExistingUser
    {
        // Properties
        public string Id { get; set; }

        public string Name { get; set; }

        public DateTime Birthday { get; set; }
    }


##開發 - Facebook Authentication##

完成上述步驟後，接著著手開發Facebook驗證。首先開發人員可以到[Facebook開發者中心(https://developers.facebook.com/)](https://developers.facebook.com/)，註冊一個新的APP帳號。(測試用的Site URL為先前步驟定義的：「http://localhost:41532/」)

![開發Facebook01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20MVC%5D/%5BASP.NET%20MVC%5D%20ASP.NET%20Identity%E7%99%BB%E5%85%A5%E6%8A%80%E8%A1%93%E6%87%89%E7%94%A8/%E9%96%8B%E7%99%BCFacebook01.png)

接著在MVC專案內加入下列程式碼，用以掛載與設定FacebookAuthenticationMiddleware。在這其中AppId、AppSecret是Facebook開發者中心提供的APP帳號資料，而Scope、UserInformationEndpoint兩個參數則是定義要額外取得使用者的E-Mail資訊。

    public class Startup
    {
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            // Authentication
            app.UseFacebookAuthentication(options =>
            {                
                options.AppId = "770764239696406";
                options.AppSecret = "2eecc0b9ef785e43bcd4779e2803ba0f";
                options.Scope.Add("email");
                options.UserInformationEndpoint = "https://graph.facebook.com/v2.5/me?fields=id,name,email";
            });
        }
    }

再來打開AccountController加入下列程式碼以及對應的View，用以提供ASP.NET站台處理Facebook這類的第三方登入(ExternalLogin)。在這其中，ExternalLogin用來發起一個驗證挑戰(Challenge)，系統會依照externalProvider參數，來決定是要向Facebook或是其他第三方系統做驗證。

當使用者通過驗證後，系統會調用ExternalLoginCallback來處理驗證結果。在ExternalLoginCallback裡會取得驗證結果中FBUser的UserId，用來與ExistingIdentitySystem做驗證。如果驗證通過，會接著從ExistingIdentitySystem取得對應的ExistingUser、再轉換為APPUser來真正登入系統。(**關於程式碼的相關背景知識，請參閱技術剖析說明：[ASP.NET Identity登入技術剖析](https://dotblogs.com.tw/clark/2016/02/09/051015)**)

    public class AccountController : Controller
    {        
        public IActionResult ExternalLogin(string externalProvider, string returnUrl = null)
        {
            // AuthenticationProperties
            var authenticationProperties = new AuthenticationProperties();
            authenticationProperties.Items.Add("ExternalProvider", externalProvider);
            authenticationProperties.RedirectUri = Url.Action("ExternalLoginCallback", "Account", new { ReturnUrl = returnUrl });

            // Return
            return new ChallengeResult(externalProvider, authenticationProperties);
        }

        public async Task<IActionResult> ExternalLoginCallback(string returnUrl = null)
        {
            // AuthenticateContext
            var authenticateContext = new AuthenticateContext(IdentityOptions.Current.ExternalCookieAuthenticationScheme);
            await this.HttpContext.Authentication.AuthenticateAsync(authenticateContext);

            // AuthenticateInfo           
            string userId = authenticateContext.Principal.FindFirst(ClaimTypes.Email).Value;
            string externalProvider = authenticateContext.Properties["ExternalProvider"] as string;

            // Login 
            var existingIdentitySystem = new ExistingIdentitySystem();
            if (existingIdentitySystem.ExternalSignIn(userId, externalProvider) == false)
            {
                throw new InvalidOperationException();
            }

            // ExistingUser
            var existingUser = existingIdentitySystem.GetUserById(userId);
            if (existingUser == null) throw new InvalidOperationException();

            // ApplicationUser
            var applicationIdentity = new ClaimsIdentity(IdentityOptions.Current.ApplicationCookieAuthenticationScheme, ClaimTypes.Name, ClaimTypes.Role);
            applicationIdentity.AddClaim(new Claim(ClaimTypes.NameIdentifier, existingUser.Id));
            applicationIdentity.AddClaim(new Claim(ClaimTypes.Name, existingUser.Name));

            var applicationUser = new ClaimsPrincipal(applicationIdentity);

            // Cookie
            await this.HttpContext.Authentication.SignInAsync(IdentityOptions.Current.ApplicationCookieAuthenticationScheme, applicationUser);
            await this.HttpContext.Authentication.SignOutAsync(IdentityOptions.Current.ExternalCookieAuthenticationScheme);

            // Return
            return Redirect(returnUrl);
        }
    }


##開發 - Password Authentication##

完成上述步驟後，接著著手開發Password驗證。打開AccountController加入下列程式碼以及對應的View，用以提供ASP.NET站台處理Password驗證。在這其中，PasswordLogin會接收使用者輸入的帳號密碼，用來與ExistingIdentitySystem做驗證。如果驗證通過，會接著從ExistingIdentitySystem取得ExistingUser、再轉換為APPUser來真正登入系統。(**關於程式碼的相關背景知識，請參閱技術剖析說明：[ASP.NET Identity登入技術剖析](https://dotblogs.com.tw/clark/2016/02/09/051015)**)

    public class AccountController : Controller
    {
        public async Task<IActionResult> PasswordLogin(string userId, string password, string returnUrl = null)
        {
            // Login 
            var existingIdentitySystem = new ExistingIdentitySystem();
            if (existingIdentitySystem.PasswordSignIn(userId, password) == false)
            {
                throw new InvalidOperationException();
            }

            // ExistingUser
            var existingUser = existingIdentitySystem.GetUserById(userId);
            if (existingUser == null) throw new InvalidOperationException();

            // ApplicationUser
            var applicationIdentity = new ClaimsIdentity(IdentityOptions.Current.ApplicationCookieAuthenticationScheme, ClaimTypes.Name, ClaimTypes.Role);
            applicationIdentity.AddClaim(new Claim(ClaimTypes.NameIdentifier, existingUser.Id));
            applicationIdentity.AddClaim(new Claim(ClaimTypes.Name, existingUser.Name));

            var applicationUser = new ClaimsPrincipal(applicationIdentity);

            // Cookie
            await this.HttpContext.Authentication.SignInAsync(IdentityOptions.Current.ApplicationCookieAuthenticationScheme, applicationUser);
            await this.HttpContext.Authentication.SignOutAsync(IdentityOptions.Current.ExternalCookieAuthenticationScheme);

            // Return
            return Redirect(returnUrl);
        }
    }


##使用##

完成開發步驟後，當系統執行到打上[Authorize]標籤的Controller或是Action時，就會跳轉到Login頁面。

    public class HomeController : Controller
    {
        [Authorize]
        public IActionResult Contact()
        {
            ViewData["Message"] = "Hello " + User.Identity.Name + "!";

            return View();
        }
    }

![使用01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20MVC%5D/%5BASP.NET%20MVC%5D%20ASP.NET%20Identity%E7%99%BB%E5%85%A5%E6%8A%80%E8%A1%93%E6%87%89%E7%94%A8/%E4%BD%BF%E7%94%A801.png)

![使用02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20MVC%5D/%5BASP.NET%20MVC%5D%20ASP.NET%20Identity%E7%99%BB%E5%85%A5%E6%8A%80%E8%A1%93%E6%87%89%E7%94%A8/%E4%BD%BF%E7%94%A802.png)

##使用 - Facebook Authentication##

在Login頁面，當使用者選擇使用Facebook驗證，系統會跳轉到Facebook頁面進行驗證與授權。完成驗證授權的相關步驟後，使用者就可以進入被打上[Authorize]標籤的Controller或是Action。

![使用Facebook01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20MVC%5D/%5BASP.NET%20MVC%5D%20ASP.NET%20Identity%E7%99%BB%E5%85%A5%E6%8A%80%E8%A1%93%E6%87%89%E7%94%A8/%E4%BD%BF%E7%94%A8Facebook01.png)

![使用Facebook02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20MVC%5D/%5BASP.NET%20MVC%5D%20ASP.NET%20Identity%E7%99%BB%E5%85%A5%E6%8A%80%E8%A1%93%E6%87%89%E7%94%A8/%E4%BD%BF%E7%94%A8Facebook02.png)

![使用Facebook03](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20MVC%5D/%5BASP.NET%20MVC%5D%20ASP.NET%20Identity%E7%99%BB%E5%85%A5%E6%8A%80%E8%A1%93%E6%87%89%E7%94%A8/%E4%BD%BF%E7%94%A8Facebook03.png)


##使用 - Password Authentication##

在Login頁面，當使用者選擇使用Password驗證，系統會使用Login頁面上輸入的帳號密碼來進行驗證與授權。完成驗證授權的相關步驟後，使用者就可以進入被打上[Authorize]標籤的Controller或是Action。

![使用Password01](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20MVC%5D/%5BASP.NET%20MVC%5D%20ASP.NET%20Identity%E7%99%BB%E5%85%A5%E6%8A%80%E8%A1%93%E6%87%89%E7%94%A8/%E4%BD%BF%E7%94%A8Password01.png)

![使用Password02](https://raw.githubusercontent.com/Clark159/clark159.github.io/master/_posts/%5BASP.NET%20MVC%5D/%5BASP.NET%20MVC%5D%20ASP.NET%20Identity%E7%99%BB%E5%85%A5%E6%8A%80%E8%A1%93%E6%87%89%E7%94%A8/%E4%BD%BF%E7%94%A8Password02.png)


##範例##

**範例程式碼：[下載位址](https://github.com/Clark159/clark159.github.io/raw/master/_posts/%5BASP.NET%20MVC%5D/%5BASP.NET%20MVC%5D%20ASP.NET%20Identity%E7%99%BB%E5%85%A5%E6%8A%80%E8%A1%93%E6%87%89%E7%94%A8/IdentitySample.zip)**

