﻿using FITM_BE.Authorization.Utils;
using FITM_BE.DependencyInjection;
using FITM_BE.EntityFrameworkCore;
using FITM_BE.EntityFrameworkCore.Seed;
using FITM_BE.Middlewares;
using FITM_BE.Service.EmailService;
using FITM_BE.Util;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using NLog;
using System.Text;

namespace FITM_BE
{
    public class Startup
    {
        private readonly string _corsName = "FITM";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration
        {
            get;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            LogManager.Setup().LoadConfigurationFromFile
            (
                string.Concat(Directory.GetCurrentDirectory(), "/nlog.config")
            );

            var emailConfig = Configuration
                .GetSection("EmailConfiguration")
                .Get<EmailConfiguration>();
            services.AddSingleton(emailConfig);

            services.AddControllers();

            services.AddHttpContextAccessor();

            services.AddDIAuto();

            services.AddAutoMapper(typeof(Startup));

            services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("Bearer", new()
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 1safsfsdfdfd\""
                });
                options.AddSecurityRequirement(new()
                {
                    {
                        new()
                        {
                            Reference = new()
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        }, new string[]{}
                    }
                });
            });

            services.AddHttpContextAccessor();
            services.AddDbContext<DatabaseContext>(option =>
            {
                option.UseSqlServer(Configuration.GetConnectionString("Default"));
            });

            services.AddAuthentication(action =>
            {
                action.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                action.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.IncludeErrorDetails = true;
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Configuration.GetValue<string>("Jwt:Issuer"),
                    ValidAudience = Configuration.GetValue<string>("Jwt:Audience"),
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetValue<string>("Jwt:Key"))),
                    ClockSkew = TimeSpan.Zero
                };
            });

            services.AddSingleton<IAuthorizationHandler, PolicyHandler>();
            services.AddSingleton<IAuthorizationPolicyProvider, FITMPolicyProvider>();

            services.AddAuthorization(options =>
            {
                options.DefaultPolicy = new AuthorizationPolicyBuilder(JwtBearerDefaults.AuthenticationScheme)
                .RequireAuthenticatedUser()
                .Build();
            });

            services.AddCors(options =>
            {
                options.AddPolicy(_corsName, options =>
                {
                    options.WithOrigins(Configuration.GetValue<string>("App:CorsOrigins")
                                                     .Split(',', StringSplitOptions.RemoveEmptyEntries)
                                                     .Select(origin => origin.RemovePostFix("/"))
                                                     .ToArray())
                           .AllowAnyHeader()
                           .AllowAnyMethod()
                           .AllowCredentials();
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if ( env.IsDevelopment() )
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.ApplicationServices.MigrateDbContext<DatabaseContext>(async (dbcontext, serviceProvider) =>
            {
                var seeding = serviceProvider.GetRequiredService<ISeedingData>();
                seeding.SeedRole(dbcontext, serviceProvider);
                seeding.SeedMember(dbcontext, serviceProvider);
            });

            app.UseStaticFiles();
            app.UseRouting();

            app.UseCors(_corsName);

            app.UseMiddleware<ErrorHandleMiddleware>();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoint =>
            {
                endpoint.MapControllerRoute("default", "apis/{controler}/{action}");
            });
        }
    }
}

