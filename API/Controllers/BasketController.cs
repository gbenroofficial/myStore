using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
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
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            Basket basket = await FindBasket(GetBuyerId());
            if (basket == null)
            {
                return NotFound();
            }
            return basket.BasketToDto();
        }

        
        [HttpPost]
        public async Task<ActionResult> AddBasketItem(int productId){
            var basket = await FindBasket(GetBuyerId());
            if(basket == null){basket = CreateBasket();}

            var product = await _context.Products.FindAsync(productId); //pry key
            if(product == null) return NotFound();

            basket.AddItem(product);

            var result = await _context.SaveChangesAsync() > 0;

            if(result) return CreatedAtRoute("GetBasket", basket.BasketToDto());
            return BadRequest(new ProblemDetails{Title = "Could not save item to basket"});     
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId){
            var basket = await FindBasket(GetBuyerId());
            if(basket == null) return NotFound();

            var product = await _context.Products.FindAsync(productId);
            if(product == null) return NotFound();

            basket.RemoveItem(product);

            var result = await _context.SaveChangesAsync() > 0;

             if(result) return Ok();
            return BadRequest(new ProblemDetails{Title = "problem encountered with deleting item from basket"});    

        }

        [HttpPut("item/{productId}/quantity/{quantity}")]
        public async Task<ActionResult> UpdateItemQuantity(int productId, int quantity){
            var basket = await FindBasket(GetBuyerId());
            if(basket == null) return NotFound();

             var product = await _context.Products.FindAsync(productId);
            if(product == null) return NotFound();

        
            basket.UpdateItemQuantity(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if(result) return Ok(basket.BasketToDto());
            return BadRequest(new ProblemDetails{Title = "problem encountered with updating item quantity"});
        }

        private async Task<Basket> FindBasket(string buyerId){
            if(string.IsNullOrEmpty(buyerId)){
                Response.Cookies.Delete("buyerId");
                return null;
            }
            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.OwnerId == buyerId); 
        }

        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
        }
        private Basket CreateBasket(){
            var buyerId = User.Identity?.Name;
            if (string.IsNullOrEmpty(buyerId)){
                buyerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions{IsEssential=true, Expires = DateTime.Now.AddDays(30)};
                Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            }           
            
            var basket = new Basket{OwnerId = buyerId};
            _context.Baskets.Add(basket);
            return basket;
        }
    }
}