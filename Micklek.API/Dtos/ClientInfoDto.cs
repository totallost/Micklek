namespace Micklek.API.Dtos
{
    public class ClientInfoDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string SureName { get; set; }
        public string MobileNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string DateReady { get; set; }
        public string Notes { get; set; }
        public int Status { get; set; }
    }
}