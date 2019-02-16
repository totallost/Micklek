using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
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

        private readonly IMapper _mapper; 

        public ItemsController(IOrderRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
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

        [HttpPost("details/sendOrder")]
        public async Task<IActionResult> CreateNewOrder(OrderDetailsDto orderDetailsDto)
        {
            if(orderDetailsDto.clienDetails == null) 
                return BadRequest();
            if(orderDetailsDto.orderDetails == null)
                return BadRequest();

            var orderLines = orderDetailsDto.orderDetails;
            var clientDetails = orderDetailsDto.clienDetails;

            var totalItems=0;
            float totalPrice=0;

            var items = await _repo.GetItems();
            
            foreach (var _orderLine in orderLines)
            {
                var item = items.SingleOrDefault(x => x.Id ==_orderLine.ItemId);

                if(item == null)
                {
                    throw new Exception("Item does not exist");
                }

                if(_orderLine.Item.Price != item.Price)
                {
                    _orderLine.Item.Price = item.Price;
                }
                totalItems +=_orderLine.Amount;
                totalPrice += (float)_orderLine.Amount * _orderLine.Item.Price;
            }
            OrderHeader orderHeader = new OrderHeader 
            {
                ClientFirstName = clientDetails.FirstName,
                ClientSureName = clientDetails.SureName,
                ClientEmail = clientDetails.Email,
                ClientRemarks = clientDetails.Notes,
                ClientCell = clientDetails.MobileNumber,
                TotalPrice = totalPrice,
                NumberOfItems = totalItems,
                DateCreation = DateTime.Now,
                DateTarget = Convert.ToDateTime(clientDetails.DateReady)
            };
            OrderLine orderLine;
            List<OrderLine> orderLineCollection = new List<OrderLine>();
                            foreach(var line in orderLines)
                {
                    orderLine = new OrderLine
                    {
                        ItemId = line.ItemId,
                        Item = line.Item,
                        Amount = line.Amount,
                        LineNumber = line.LineNumber
                    };
                    orderLineCollection.Add(orderLine); 
                }
                orderHeader.OrderLines = orderLineCollection;

            _repo.Add(orderHeader);
            if(await _repo.SaveAll())
            {
                var idToReturn = orderHeader.Id;
                return Ok(orderHeader);
            }

            throw new Exception ("Failed to Save Order");
        }

    }
}