using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Micklek.API.Data;
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
        // GET api/values
        
        [HttpGet, Authorize]
        public async Task<IActionResult> GetAllItems()
        {
            var items = await _repo.GetItems();
            return Ok(items);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
