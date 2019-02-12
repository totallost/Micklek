using System;
using System.Threading.Tasks;
using Micklek.API.Data;
using Micklek.API.Dtos;
using Micklek.API.Models;
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
        public async Task<IActionResult> GetAllItems()
        {
            var items = await _repo.GetItems();

            return Ok(items);
        }

        [HttpGet("{id}", Name = "GetItem")]
        public async Task<IActionResult> GetItem(int id)
        {
            var item = await _repo.GetItem(id);

            return Ok(item);
        }
        
        [HttpPost]
        public async Task<IActionResult> CreateItem(Item item)
        {
            _repo.Add(item);
            if (await _repo.SaveAll())
            {
                return CreatedAtRoute("GetItem",new {id = item.Id}, "Created Successfuly");
            }
            throw new Exception("Failed to Create a new item"); 
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var itemToDelete =await _repo.GetItem(id);
            _repo.Delete(itemToDelete);

            if (await _repo.SaveAll())
            {
                return NoContent();
            }
            throw new Exception("Failed to delete the item");
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewOrder(OrderDetailsDto OrderDetailsDto)
        {
            var orderLines = OrderDetailsDto.OrderLineDto;
            var clientDetails = OrderDetailsDto.ClientInfoDto;
            foreach (var orderLine in orderLines)
            {
                var item = await _repo.GetItem(orderLine.Item.Id);
                if(item == null)
                {
                    throw new Exception("item does not exist");
                }

                if(orderLine.Item.Price != item.Price)
                {
                    orderLine.Item.Price = item.Price;
                }
            }
            return BadRequest();
        }

    }
}