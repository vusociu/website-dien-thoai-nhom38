using System.ComponentModel.DataAnnotations;
using WebApp.Data;

namespace WebApp.Models
{
    public class CartItem
    {
        [Key]
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int UserId { get; set; }
        public int Price { get; set; }
        public int Num { get; set; }
        public int TotalMoney { get; set; }
        public SoftDelete Deleted { get; set; } = SoftDelete.NO_DELETED;
    }
}
