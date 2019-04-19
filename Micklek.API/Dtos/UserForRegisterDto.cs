using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Micklek.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}