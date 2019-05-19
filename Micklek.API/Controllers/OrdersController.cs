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
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepository _repo;
        public OrdersController(IOrderRepository repo)
        {
            _repo = repo;
        }
        //get statuses for orders management 
        [HttpGet("management/get-statuses"), Authorize]
        public async Task<IActionResult> GetStatuses()
        {
            var statuses = await _repo.GetStatuses();
            return Ok(statuses);
        }

        //get order headers for management
        [HttpGet("management/get-order-headers"), Authorize]
        public async Task<IActionResult> GetOrderHeaders()
        {
            var orderHeaders = await _repo.GetOrderHeaders();
            return Ok(orderHeaders);
        }

        [HttpGet("management/get-order-header/{id}"), Authorize]
        public async Task<IActionResult> GetOrderHeader(int id)
        {
            var orderHeader = await _repo.GetOrderHeader(id);
            return Ok(orderHeader);
        }

        //get order lines for management 
        [HttpGet("management/get-order-lines/{orderId}"), Authorize]
        public async Task<IActionResult> GetOrderLines(int orderId)
        {
            var OrderLines = await _repo.GetOrderLines(orderId);
            return Ok(OrderLines);
        }

        //create a new order from shop 
        [HttpPost("details/sendOrder")]
        public async Task<IActionResult> CreateNewOrder(OrderDetailsDto orderDetailsDto)
        {
            if (orderDetailsDto.clienDetails == null)
                return BadRequest();
            if (orderDetailsDto.orderDetails == null)
                return BadRequest();

            var orderLines = orderDetailsDto.orderDetails;
            var clientDetails = orderDetailsDto.clienDetails;

            var totalItems = 0;
            float totalPrice = 0;

            var items = await _repo.GetItems();

            foreach (var _orderLine in orderLines)
            {
                var item = items.SingleOrDefault(x => x.Id == _orderLine.ItemId);

                if (item == null)
                {
                    throw new Exception("Item does not exist");
                }

                if (_orderLine.Item.Price != item.Price)
                {
                    _orderLine.Item.Price = item.Price;
                }
                totalItems += _orderLine.Amount;
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
                DateTarget = Convert.ToDateTime(clientDetails.DateReady),
                StatusId = 1,
                Address = clientDetails.Address
            };
            OrderLine orderLine;
            List<OrderLine> orderLineCollection = new List<OrderLine>();
            foreach (var line in orderLines)
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
            if (await _repo.SaveAll())
            {
                var idToReturn = orderHeader.Id;
                return Ok(orderHeader);
            }

            throw new Exception("Failed to Save Order");
        }

        // update order in order management 
        [HttpPost("management/update-order"), Authorize]
        public async Task<IActionResult> UpdateOrder(OrderDetailsDto orderDetailsDto)
        {
            if (orderDetailsDto.clienDetails == null)
                return BadRequest();
            if (orderDetailsDto.orderDetails == null)
                return BadRequest();

            var orderLines = orderDetailsDto.orderDetails;
            var clientDetails = orderDetailsDto.clienDetails;

            var totalItems = 0;
            float totalPrice = 0;

            var items = await _repo.GetItems();

            foreach (var _orderLine in orderLines)
            {
                var item = items.SingleOrDefault(x => x.Id == _orderLine.ItemId);

                if (item == null)
                {
                    throw new Exception("Item does not exist");
                }

                if (_orderLine.Item.Price != item.Price)
                {
                    _orderLine.Item.Price = item.Price;
                }
                totalItems += _orderLine.Amount;
                totalPrice += (float)_orderLine.Amount * _orderLine.Item.Price;
            }

            var oldOrderHeader = await _repo.GetOrderHeader(clientDetails.Id);
            oldOrderHeader.ClientFirstName = clientDetails.FirstName;
            oldOrderHeader.ClientSureName = clientDetails.SureName;
            oldOrderHeader.ClientEmail = clientDetails.Email;
            oldOrderHeader.ClientRemarks = clientDetails.Notes;
            oldOrderHeader.ClientCell = clientDetails.MobileNumber;
            oldOrderHeader.TotalPrice = totalPrice;
            oldOrderHeader.NumberOfItems = totalItems;
            oldOrderHeader.DateTarget = Convert.ToDateTime(clientDetails.DateReady);
            oldOrderHeader.StatusId = clientDetails.Status;
            oldOrderHeader.Address = clientDetails.Address;

            var OldOrderLines = await _repo.GetOrderLines(clientDetails.Id);
            List<OrderLine> OldOrderLinesList = OldOrderLines.ToList();
            foreach (var OldOrder in OldOrderLinesList)
            {
                _repo.Delete(OldOrder);
            }


            OrderLine orderLine;
            List<OrderLine> orderLineCollection = new List<OrderLine>();
            foreach (var line in orderLines)
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
            oldOrderHeader.OrderLines = orderLineCollection;

            if (await _repo.SaveAll())
            {
                return Ok();
            }

            throw new Exception("Failed to Save Order");

        }
    }
}
