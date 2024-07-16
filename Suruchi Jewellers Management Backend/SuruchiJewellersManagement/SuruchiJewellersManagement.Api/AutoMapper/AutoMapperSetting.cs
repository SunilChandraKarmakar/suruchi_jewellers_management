using AutoMapper;
using SuruchiJewellersManagement.Domain.Models;
using SuruchiJewellersManagement.Domain.ViewModels.Customer;

namespace SuruchiJewellersManagement.Api.AutoMapper
{
    public class AutoMapperSetting : Profile
    {
        public AutoMapperSetting()
        {
            // Customer
            CreateMap<Customer, CustomerViewModel>();
            CreateMap<CustomerViewModel, Customer>();
            CreateMap<Customer, CustomerCreateModel>();
            CreateMap<CustomerCreateModel, Customer>();
            CreateMap<Customer, CustomerUpdateModel>();
            CreateMap<CustomerUpdateModel, Customer>(); 
        }
    }
}