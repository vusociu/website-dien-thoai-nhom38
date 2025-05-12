using System.ComponentModel.DataAnnotations;
using WebApp.Data;

namespace WebApp.Models
{
    public class RolePermission
    {
        [Key]
        public int Id { get; set; }
        public int RoleId { get; set; }
        public string Permission { get; set; }
        public SoftDelete Deleted { get; set; } = SoftDelete.NO_DELETED;
    }
}
