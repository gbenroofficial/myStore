using System;
using System.Collections.Generic;
using System.IO.Compression;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
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
        public async Task<PagedList<Product>> getProducts ([FromQuery]ProductParams productParams){
            var query = _context.Products
                .AsQueryable()
                .SortBy(productParams.Feature)
                .Search(productParams.SearchTerm)
                .FilterBy(productParams.Brands, productParams.Types);          


                  
            var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

            Response.AddPaginationHeader(products.MetaData);
            return products;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Product>> getProduct(int id){
            var product = await _context.Products.FindAsync(id);
            if(product == null) return NotFound();

            return product;

        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters(){
            var brands = await _context.Products.Select(product => product.Brand).Distinct().ToListAsync();
            var types = await _context.Products.Select(product => product.Type).Distinct().ToListAsync();

            return Ok(new {brands, types});

        }
    }
}