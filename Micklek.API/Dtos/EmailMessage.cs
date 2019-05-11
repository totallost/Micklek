using System.Collections.Generic;
using Micklek.API.Models;

namespace Micklek.API.Dtos
{
    public class EmailMessage
    {
        public EmailMessage()
        {
            FromAddress = @"Micklek.mex@gmail.com";
            ToRecipients = @"anton.stanishevsly@gmail.com";
            Subject = "test";
            Body = "hello world - test please";
            IsHtml = true;
        }
        public string ToRecipients { get; set; }
        public string FromAddress { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public bool IsHtml { get; set; }
        public List<System.Net.Mail.Attachment> Attachments { get; set; }
    }
}