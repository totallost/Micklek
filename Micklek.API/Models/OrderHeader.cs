using System;
using System.Collections.Generic;

namespace Micklek.API.Models
{
    public class OrderHeader
    {
        public int Id { get; set; }
        public int NumberOfItems { get; set; }
        public float TotalPrice { get; set; }
        public string ClientName { get; set; }
        public string ClientEmail { get; set; }
        public string ClientCell { get; set; }
        public string ClientRemarks { get; set; }
        public ICollection<OrderLine> OrderLines { get; set; }
        public DateTime DateCreation { get; set; }
        public DateTime DateTarget { get; set; }
    }
}