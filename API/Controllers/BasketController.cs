using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
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

        [HttpGet]
        public async Task<ActionResult<Basket>> getBasket()
        {
            Basket basket = await findBasket();
            if (basket == null)
            {
                return NotFound();
            }
            return basket;
        }

        [HttpPost]
        public async Task<ActionResult> addBasketItem(int productId){
            var basket = await findBasket();
            if(basket == null){basket = createBasket();}

            var product = await _context.Products.FindAsync(productId); //pry key
            if(product == null) return NotFound();

            basket.AddItem(product);

            var result = await _context.SaveChangesAsync() > 0;

            if(result) return StatusCode(201);
            return BadRequest(new ProblemDetails{Title = "Could not save item to basket"});     
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