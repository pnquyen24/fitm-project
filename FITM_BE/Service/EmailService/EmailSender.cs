using FITM_BE.Service.LoggerService;
using MailKit.Net.Smtp;
using MimeKit;
using NetCore.AutoRegisterDi;

namespace FITM_BE.Service.EmailService
{
    [RegisterAsScoped]
    public class EmailSender : IEmailSender
    {
        private readonly ILoggerManager logger;
        private readonly EmailConfiguration emailConfig;

        public EmailSender(EmailConfiguration emailConfig, ILoggerManager logger)
        {
            this.emailConfig = emailConfig;
            this.logger = logger;
        }

        public void SendEmail(Message message)
        {
            var emailMessage = CreateEmailMessage(message);

            Send(emailMessage);
        }

        public async Task SendEmailAsync(Message message)
        {
            var mailMessage = CreateEmailMessage(message);
            await SendAsync(mailMessage);
        }

        private MimeMessage CreateEmailMessage(Message message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress(string.Empty, emailConfig.From));
            emailMessage.To.AddRange(message.To);
            emailMessage.Subject = message.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html) 
            {
                Text = string.Format
                (
                    "<h2 style='color:red;'>{0}</h2>", 
                    message.Content
                )
            };

            return emailMessage;
        }

        private void Send(MimeMessage mailMessage)
        {
            using (var client = new SmtpClient())
            {
                try
                {
                    client.Connect(emailConfig.SmtpServer, emailConfig.Port, true);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    client.Authenticate(emailConfig.UserName, emailConfig.Password);

                    client.Send(mailMessage);
                }
                catch
                {
                    logger.LogError("Email sending failure.");
                    throw;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }

        private async Task SendAsync(MimeMessage mailMessage)
        {
            using (var client = new SmtpClient())
            {
                try
                {
                    await client.ConnectAsync(emailConfig.SmtpServer, emailConfig.Port, true);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    await client.AuthenticateAsync(emailConfig.UserName, emailConfig.Password);

                    await client.SendAsync(mailMessage);
                }
                catch
                {
                    logger.LogError("Async email sending failure.");
                    throw;
                }
                finally
                {
                    await client.DisconnectAsync(true);
                    client.Dispose();
                }
            }
        }
    }
}
