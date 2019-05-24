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
    [Route("Api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IOrderRepository _repo;

        public ItemsController(IOrderRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllActiveItems()
        {
            var items = await _repo.GetActiveItems();

            return Ok(items);
        }

        [HttpGet("{id}", Name = "GetItem")]
        public async Task<IActionResult> GetItem(int id)
        {
            var item = await _repo.GetItem(id);

            return Ok(item);
        }

        [HttpDelete("{id}"), Authorize]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var itemToDelete = await _repo.GetItem(id);
            _repo.Delete(itemToDelete);

            if (await _repo.SaveAll())
            {
                return NoContent();
            }
            throw new Exception("Failed to delete the item");
        }

        [HttpGet("All"), Authorize]
        public async Task<IActionResult> GetAllItems()
        {
            SendEmail.EmailParameters(new EmailMessage());
            var items = await _repo.GetItems();
            return Ok(items);

        }

        [HttpPut("{id}"), Authorize]
        public async Task<IActionResult> updateItem(int id, [FromBody]ItemsDto itemsDto)
        {
            var item = await _repo.GetItem(id);
            if (itemsDto.name != null)
            {
                item.Name = itemsDto.name;
                item.Price = itemsDto.Price;
                item.Description = itemsDto.description;
                item.IsActive = itemsDto.isActive;
                if (await _repo.SaveAll())
                {
                    return Ok(item);
                }
            }
            return BadRequest("unable to update the item");
        }

        [HttpPost("Add"), Authorize]
        public async Task<IActionResult> addNewItem(ItemsDto itemsDto)
        {
            var newItem = new Item
            {
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