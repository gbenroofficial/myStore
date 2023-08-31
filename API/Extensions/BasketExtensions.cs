using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Extensions
{
    public static class BasketExtensions
    {
        public static BasketDto BasketToDto(this Basket basket){
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
    }
}