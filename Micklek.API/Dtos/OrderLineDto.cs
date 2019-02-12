using System.Collections.Generic;
using Micklek.API.Models;

namespace Micklek.API.Dtos
{
    public class OrderLineDto
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ItemId { get; set; }
        public Item Item { get; set; }
        public int Amount { get; set; }
        public int LineNumber { get; set; }
    }
}