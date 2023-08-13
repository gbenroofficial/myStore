using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        public ProductsController(StoreContext context){
            _context = context;

        }
        [HttpGet]
        public async Task<List<Product>> getProducts (string feature, string searchTerm, string brands, string types){
            var query = _context.Products.AsQueryable().SortBy(feature).Search(searchTerm).FilterBy(brands, types);          
                  
            return await query.ToListAsync();
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Product>> getProduct(int id){
            var product = await _context.Products.FindAsync(id);
            if(product == null) return NotFound();

            return product;

        }
    }
}