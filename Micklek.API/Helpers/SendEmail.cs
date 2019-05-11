using Google.Apis.Auth.OAuth2;
using Google.Apis.Gmail.v1;
using Google.Apis.Gmail.v1.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using Micklek.API.Dtos;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Micklek.API.Helpers
{
    public class SendEmail
    {
        // If modifying these scopes, delete your previously saved credentials
        // at ~/.credentials/gmail-dotnet-quickstart.json
        static string[] Scopes = { GmailService.Scope.GmailReadonly };
        static string ApplicationName = "Micklek";

        public static void EmailParameters(EmailMessage email)
        {
            UserCredential credential;

            using (var stream =
                new FileStream("../Micklek.API/Properties/credentials.json", FileMode.Open, FileAccess.Read))
            {
                // The file token.json stores the user's access and refresh tokens, and is created
                // automatically when the authorization flow completes for the first time.
                string credPath = "token.json";
                credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
                    GoogleClientSecrets.Load(stream).Secrets,
                    Scopes,
                    "user",
                    CancellationToken.None,
                    new FileDataStore(credPath, true)).Result;
                Console.WriteLine("Credential file saved to: " + credPath);
            }

            // Create Gmail API service.
            var service = new GmailService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = ApplicationName,
            });

            // Define parameters of request.
            UsersResource.LabelsResource.ListRequest request = service.Users.Labels.List("me");
            request.Execute();
            Console.WriteLine(request);

            var mailMessage = new System.Net.Mail.MailMessage();
            mailMessage.From = new System.Net.Mail.MailAddress(email.FromAddress);
            mailMessage.To.Add(email.ToRecipients);
            mailMessage.ReplyToList.Add(email.FromAddress);
            mailMessage.Subject = email.Subject;
            mailMessage.Body = email.Body;
            mailMessage.IsBodyHtml = email.IsHtml;

            // foreach (System.Net.Mail.Attachment attachment in email.Attachments)
            // {
            //     mailMessage.Attachments.Add(attachment);
            // }

            var mimeMessage = MimeKit.MimeMessage.CreateFromMailMessage(mailMessage);


            var gmailMessage = new Google.Apis.Gmail.v1.Data.Message
            {
                Raw = Encode(mimeMessage.ToString())
            };

            UsersResource.MessagesResource.SendRequest request2 = service.Users.Messages.Send(gmailMessage, "Micklek.mx@gmail.com");
            

            request2.Execute();

        }
        public static string Encode(string text)
        {
            byte[] bytes = System.Text.Encoding.UTF8.GetBytes(text);

            return System.Convert.ToBase64String(bytes)
                .Replace('+', '-')
                .Replace('/', '_')
                .Replace("=", "");
        }
    }
}