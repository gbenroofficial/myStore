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

        public static IQueryable<Product> Search(this IQueryable<Product> query, string name){
            if(string.IsNullOrEmpty(name)) return query;
            var nameLower = name.Trim().ToLower();
            return query.Where(product => product.Name.ToLower().Contains(nameLower));
        }

        public static IQueryable<Product> FilterBy(this IQueryable<Product> query, string brands, string types){
            var brandList = new List<string>();
            var typeList = new List<string>();

            if(!string.IsNullOrEmpty(brands)){
                brandList.AddRange(brands.ToLower().Split(",").ToList());
            }

            if(!string.IsNullOrEmpty(types)){
                typeList.AddRange(types.ToLower().Split(",").ToList());
            }
            if(brandList.Count != 0) query = query.Where(product => brandList.Contains(product.Brand.ToLower()));
            if(typeList.Count != 0) query = query.Where(product => typeList.Contains(product.Type.ToLower()));

            return query;
        }
    }
}