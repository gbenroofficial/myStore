using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Extensions
{
    public static class ProductExtension
    {
        public static IQueryable<Product>SortBy(this IQueryable<Product> query, string orderBy){

            if(string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(product => product.Name);
            query = orderBy switch{
                "price" => query.OrderBy(product => product.Price),
                "priceDesc" => query.OrderByDescending(product => product.Price),
                _ => query.OrderBy(product => product.Name)
            };
            return query;
        }
    }
}