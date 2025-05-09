namespace WebApp.DTO.Product
{
	public class GetProductDTO
	{
		public int Id { get; set; }
		public int CategoryId { get; set; }
		public string Title { get; set; }
		public int Price { get; set; }
		public float Rating { get; set; }
		public string Thumbnail { get; set; }
		public string Description { get; set; }
	}
}