using System.Collections.Generic;

namespace Micklek.API.Dtos
{
    public class OrderDetailsDto
    {
        public ClientInfoDto clienDetails { get; set; }
        public OrderLineDto[] orderDetails { get; set; }
    }
}