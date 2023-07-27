using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
         private readonly StoreContext _context;

         public BasketController(StoreContext context){
            _context = context;

        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> getBasket()
        {
            Basket basket = await findBasket();
            if (basket == null)
            {
                return NotFound();
            }
            return BasketToDto(basket);
        }

        private BasketDto BasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                OwnerId = basket.OwnerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.Product.Id,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Brand = item.Product.Brand,
                    Type = item.Product.Type,
                    Quantity = item.Quantity
                }).ToList()
            };
        }

        [HttpPost]
        public async Task<ActionResult> addBasketItem(int productId){
            var basket = await findBasket();
            if(basket == null){basket = createBasket();}

            var product = await _context.Products.FindAsync(productId); //pry key
            if(product == null) return NotFound();

            basket.AddItem(product);

            var result = await _context.SaveChangesAsync() > 0;

            if(result) return CreatedAtRoute("GetBasket", BasketToDto(basket));
            return BadRequest(new ProblemDetails{Title = "Could not save item to basket"});     
        }

        [HttpDelete]
        public async Task<ActionResult> removeBasketItem(int productId){
            var basket = await findBasket();
            if(basket == null) return NotFound();

            var product = await _context.Products.FindAsync(productId);
            if(product == null) return NotFound();

            basket.RemoveItem(product);

            var result = await _context.SaveChangesAsync() > 0;

            if(result) return StatusCode(201);
            return BadRequest(new ProblemDetails{Title = "problem encountered with deleting item from basket"});    

        }

        [HttpPut("item/{productId}/quantity/{quantity}")]
        public async Task<ActionResult> updateItemQuantity(int productId, int quantity){
            var basket = await findBasket();
            if(basket == null) return NotFound();

             var product = await _context.Products.FindAsync(productId);
            if(product == null) return NotFound();

            basket.updateItemQuantity(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if(result) return StatusCode(201);
            return BadRequest(new ProblemDetails{Title = "problem encountered with updating item quantity"});
        }

        private async Task<Basket> findBasket(){
            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.OwnerId == Request.Cookies["buyerId"]); //not pry key
        }
        private Basket createBasket(){
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions{IsEssential=true, Expires = DateTime.Now.AddDays(30)};
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            
            var basket = new Basket{OwnerId = buyerId};
            _context.Baskets.Add(basket);
            return basket;
        }
    }
}