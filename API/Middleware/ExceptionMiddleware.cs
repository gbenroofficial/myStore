using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        
        private readonly RequestDelegate next;
        private readonly ILogger<ExceptionMiddleware> logger;
        
        private readonly IHostEnvironment env;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            this.env = env;            
            this.logger = logger;
            this.next = next;     
        }

        public async Task InvokeAsync(HttpContext context){
            try{
                await next(context);
            }
            catch(Exception ex){
                logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = 500;

                var response = new ProblemDetails
                {
                    Status = 500,
                    Detail = env.IsDevelopment()? ex.StackTrace?.ToString() : null,
                    Title = ex.Message
                };

                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}