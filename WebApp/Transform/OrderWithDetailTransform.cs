using WebApp.Models;

namespace WebApp.Transform
{
    public class OrderWithDetailTransform
    {
        public Order order { get; set; }
        public OrderDetail orderDetail { get; set; }
        public Product product { get; set; }
    }
}
