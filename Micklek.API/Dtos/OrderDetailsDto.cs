using System.Collections.Generic;

namespace Micklek.API.Dtos
{
    public class OrderDetailsDto
    {
        public ClientInfoDto ClientInfoDto { get; set; }
        public ICollection<OrderLineDto> OrderLineDto  { get; set; }
    }
}