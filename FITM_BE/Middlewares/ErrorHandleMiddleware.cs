using FITM_BE.Exceptions.UserException;
using System.Net;

namespace FITM_BE.Middlewares
{
    public class ErrorHandleMiddleware
    {
        private readonly RequestDelegate _next;
        public ErrorHandleMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch ( Exception ex )
            {
                await HandleException(context, ex);
            }
        }

        private static async Task HandleException(HttpContext context, Exception ex)
        {
            context.Response.ContentType = "application/json";
            var error = new ErrorHandleDto
            {
                Message = ex.Message,
            };
            if ( ex is InvalidException )
            {
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                await context.Response.WriteAsJsonAsync(error);
            }
            if ( ex is NotFoundException )
            {
                context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                await context.Response.WriteAsJsonAsync(error);
            }
            if (ex is SystemException)
            {
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                await context.Response.WriteAsJsonAsync(error);
            }
        }
    }

    public class ErrorHandleDto
    {
        public string Message { get; set; } = string.Empty;
    }
}
