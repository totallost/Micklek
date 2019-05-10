using System.Collections.Generic;
using Micklek.API.Models;

namespace Micklek.API.Dtos
{
    public class ItemsDto
    {
        public int Id { get; set; }
        public string name { get; set; }
        public float Price { get; set; }
        public string PhotoUrl { get; set; }
        public string description { get; set; }
        public bool isActive { get; set; }
        public string PhotoPublicName { get; set; }
    }
}