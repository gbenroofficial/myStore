using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities.OrderComponents;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly StoreContext _context;
        public OrdersController(StoreContext context)
        {
            _context = context;
            
        }

        [HttpGet]
        public async Task<ActionResult<List<Order>>> GetOrders()
        {
            return await _context.Orders    
                        .Include(o => o.OrderItems)
                        .Where(x => x.BuyerId == User.Identity.Name)
                        .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>>  GetOrder(int id)
        {
            return await _context.Orders
                        .Include(o => o.OrderItems)
                        .Where(x => x.BuyerId == User.Identity.Name && x.Id == id)
                        .FirstOrDefaultAsync();
        }
        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto orderDto)
        {
            var basket = await _context.Baskets
                                .FindBasket(User.Identity.Name)
                                .FirstOrDefaultAsync();

            if (basket == null) return BadRequest(new ProblemDetails {Title = "Could not locate basket"});

            var items = new List<OrderItem>();

        }
    }
}