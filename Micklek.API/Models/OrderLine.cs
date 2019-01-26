using System.Collections.Generic;

namespace Micklek.API.Models
{
    public class OrderLine
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ItemId { get; set; }
        public Item Item { get; set; }
        public int Amount { get; set; }
        public int LineNumber { get; set; }
    }
}