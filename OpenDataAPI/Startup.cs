using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using OpenDataAPI.DAL.Context;
using Microsoft.EntityFrameworkCore;
using OpenDataAPI.DAL;



/*

Routing is configured using the UseRouting, MapControllerRoute, and MapAreaControllerRoute middleware . 

To use controllers:
    Call MapControllers inside UseEndpoints to map attribute routed controllers.
    Call MapControllerRoute or MapAreaControllerRoute, to map both conventionally routed controllers and attribute routed controllers.
 
 */


namespace OpenDataAPI
{
    public class Startup
    {

        public IConfiguration Configuration { get; }
        private readonly string _connectionString = null;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

            _connectionString = Configuration.GetConnectionString("DbCon");
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddCors(opt => { opt.AddPolicy("CorsPolicy", c => c.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()); });

            services.AddControllers();
            services.AddDbContext<ApiContext>(options=> options.UseNpgsql(_connectionString)); // Adding AddEntityFrameworkNpgsql() is no longer necessary -- OFFICIAL DOCS

            services.AddTransient<DataSeed>();


            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "OpenDataAPI", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DataSeed seed)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors("CorsPolicy");
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "OpenDataAPI v1"));
            }
            seed.SeedData(50, 1000);


            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "api/{controller}/{action}/{id?}"
                );
            });

            

        }
    }
}
