using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            /* Service lasts for the duration of the controller request [TM 04/09/22] */
            services.AddScoped<ITokenService, TokenService>();
            /* Database context [TM 04/09/22] */
            services.AddDbContext<DataContext>(options => {
                options.UseSqlite(config.GetConnectionString("Default"));
            });

            return services;
        }
    }
}