using SuruchiJewellersManagement.Domain.ViewModels.OrderDetails;

namespace SuruchiJewellersManagement.Domain.ViewModels.Order
{
    public class OrderViewModel
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string OrderNumber { get; set; }
        public string Vori { get; set; }
        public string Ana { get; set; }
        public string Roti { get; set; }
        public string ProductOptionName { get; set; }
        public string Amount { get; set; }
        public string Date { get; set; }

        public ICollection<OrderDetailsViewModel> OrderDetailsViewModels { get; set; }
    }
}