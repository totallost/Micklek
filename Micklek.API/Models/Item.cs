namespace Micklek.API.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public string PhotoUrl { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public string PhotoPublicName { get; set; }
    }
}