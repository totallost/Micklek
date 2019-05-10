using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Micklek.API.Data;
using Micklek.API.Dtos;
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
        // GET api/values
        
        [HttpGet, Authorize]
        public async Task<IActionResult> GetAllItems()
        {
            var items = await _repo.GetItems();
            return Ok(items);
        }

        // PUT api/Item/5
        [HttpPut("{id}"), Authorize]
        public async Task<IActionResult> updateItem(int id, [FromBody]ItemsDto itemsDto)
        {
            var item = await _repo.GetItem(id);
            if(itemsDto.name != null)
            {
                item.Name = itemsDto.name;
                item.Price = itemsDto.Price;
                item.Description = itemsDto.description;
                item.IsActive = itemsDto.isActive;
                if(await _repo.SaveAll())
                {
                    return Ok(item);
                }
            }
            return BadRequest("unable to update the item");
        }

        [HttpPost("Add")]
        public async Task<IActionResult> addNewItem(ItemsDto itemsDto)
        {
            var newItem = new Item {
                Name = itemsDto.name,
                Price = itemsDto.Price,
                Description = itemsDto.description,
                PhotoPublicName = itemsDto.PhotoPublicName,
                PhotoUrl = itemsDto.PhotoUrl,
                IsActive = itemsDto.isActive
            };
            _repo.Add(newItem);
            if (await _repo.SaveAll())
            {
                return Ok(new { id = newItem.Id });
            }
            throw new Exception("Failed to Create a new item");
        }
    }
}
