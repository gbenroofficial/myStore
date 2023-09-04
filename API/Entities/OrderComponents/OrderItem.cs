using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities.OrderComponents
{
    public class OrderItem
    {
        public int Id {get; set;}
        public ItemOrdered ItemOrdered { get; set; }
        public long Price { get; set; }
        public int Quantity { get; set; }
    }
}