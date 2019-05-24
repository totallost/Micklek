using System.Collections.Generic;

namespace Micklek.API.Models
{
    public class OrderLine
    {
        public int OrderHeaderId { get; set; }
        public int ItemId { get; set; }
        public Item Item { get; set; }
        public int Amount { get; set; }
        public int LineNumber { get; set; }
        public float LinePrice { get; set; }
    }
}