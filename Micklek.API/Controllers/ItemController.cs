using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Micklek.API.Data;
using Micklek.API.Dtos;
using Micklek.API.Helpers;
using Micklek.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Micklek.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IOrderRepository _repo;
        public ItemController(IOrderRepository repo)
        {
            _repo = repo;

        }
    
    }
}
