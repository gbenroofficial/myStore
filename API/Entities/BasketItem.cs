using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Entities
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        
        
        //Nav properties       
        [ForeignKey("Id")]
        public Product Product { get; set; } = null!;

    
        public int BasketId { get; set; }        
        public Basket Basket { get; set; } = null!;
        
    }
}