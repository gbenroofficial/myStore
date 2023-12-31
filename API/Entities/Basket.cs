using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string OwnerId { get; set; }

        public string PaymentIntentId { get; set; }

        public string ClientSecret { get; set; }

        //nav prop
        public List<BasketItem> Items { get; set; } = new ();
        
        
        
        public void AddItem(Product product){
            var item = Items.Find(item => item.ProductId == product.Id);
            if(item != null){
                item.Quantity+=1;
            }
            else{Items.Add(new BasketItem {Quantity = 1, ProductId = product.Id, BasketId = Id});}
        }
        
        public void RemoveItem(Product product){
            var itemIndex = Items.FindIndex(item => item.ProductId == product.Id);
            if(itemIndex != -1){
                Items.RemoveAt(itemIndex);
            }
            return;
        }

        public void UpdateItemQuantity(Product product, int quantity){
            var item = Items.Find(item => item.ProductId == product.Id);
            if(item != null){
                item.Quantity = quantity;
            }
            else{Items.Add(new BasketItem { Quantity = quantity, ProductId = product.Id, BasketId = Id});}

        }
    }
}