using FITM_BE.Authorization.Permission;
using FITM_BE.DependencyInjection;
using FITM_BE.EntityFrameworkCore;
using FITM_BE.Service.EmailService;
using FITM_BE.Service.LoggerService;
using Microsoft.EntityFrameworkCore;
using NLog;

namespace FITM_BE
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            LogManager.Setup().LoadConfigurationFromFile
            (
                string.Concat(Directory.GetCurrentDirectory(), "/nlog.config")
            );
            services.AddSingleton<ILoggerManager, LoggerManager>();
            
            var emailConfig = Configuration
                .GetSection("EmailConfiguration")
                .Get<EmailConfiguration>();
            services.AddSingleton(emailConfig);
            services.AddScoped<IEmailSender, EmailSender>();

            services.AddControllers();

            services.AddHttpContextAccessor();

            services.AddDIAuto();

            services.AddAutoMapper(typeof(Startup));

            services.AddSwaggerGen();

            services.AddSingleton<PermissionCollection>();

            services.AddDbContext<DatabaseContext>(option =>
            {
                option.UseSqlServer(Configuration.GetConnectionString("Default"));
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }   

            app.UseRouting();
            app.UseStaticFiles();

            app.UseEndpoints(endpoint =>
            {
                endpoint.MapControllerRoute("default","apis/{controler}/{action}");
            });
        }
    }
}

