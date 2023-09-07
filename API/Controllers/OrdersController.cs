using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.OrderComponents;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Features;
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

        [HttpGet("{id}", Name = "GetOrder")]
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

            var orderItems = new List<OrderItem>();

            foreach(var item in basket.Items)
            {
                var product = await _context.Products.FindAsync(item.ProductId);
                var productOrdered = new ProductOrdered
                {
                    ProductId = product.Id,
                    Name = product.Name,
                    PictureUrl = product.PictureUrl
                };
                var orderItem = new OrderItem
                {
                    ProductOrdered = productOrdered,
                    Price = product.Price,
                    Quantity = item.Quantity
                };

                orderItems.Add(orderItem);
                product.StockQuantity -= item.Quantity;
            }

            var subTotal = orderItems.Sum(item => item.Quantity * item.Price);
            var deliveryFee = subTotal > 10000 ? 0 : 500;

            var order = new Order
            {
                OrderItems = orderItems,
                BuyerId = User.Identity.Name,
                ShippingAddress = orderDto.ShippingAddress,
                SubTotal = subTotal,
                DeliveryFee = deliveryFee
    
            
            };

            _context.Orders.Add(order);
            _context.Baskets.Remove(basket);

            if(orderDto.SaveAddress) 
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);
                user.Address = new UserAddress
                {
                    FullName = orderDto.ShippingAddress.FullName,
                    Address1 = orderDto.ShippingAddress.Address1,
                    Address2 = orderDto.ShippingAddress.Address2,
                    City = orderDto.ShippingAddress.City,
                    Region = orderDto.ShippingAddress.Region,
                    PostCode = orderDto.ShippingAddress.PostCode,
                    Country = orderDto.ShippingAddress.Country
                };

                _context.Update(user);

            }

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetOrder", new {id = order.Id}, order.Id);

            return BadRequest("Problem creating order");



        }
    }
}