using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SuruchiJewellersManagement.Domain.Models;
using SuruchiJewellersManagement.Domain.ViewModels.Customer;
using SuruchiJewellersManagement.Domain.ViewModels.Response;
using SuruchiJewellersManagement.Manager.Contracts;
using System.Net;

namespace SuruchiJewellersManagement.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerManager _customerManager;
        private readonly IMapper _mapper;

        public CustomerController(ICustomerManager customerManager, IMapper mapper)
        {
            _customerManager = customerManager;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(typeof(ResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ResponseModel>> GetAllAsync()
        {
            var getAllAsync = await _customerManager.GetAllAsync();
            var mapGetAllAsync = _mapper.Map<ICollection<CustomerViewModel>>(getAllAsync);

            var responseModel = new ResponseModel(200, "Get Customers", mapGetAllAsync);

            return Ok(responseModel);
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ResponseModel>> CreateAsync(CustomerCreateModel customerCreateModel)
        {
            if(ModelState.IsValid)
            {
                var mapCustomerModel = _mapper.Map<Customer>(customerCreateModel);
                var isCreateAsync = await _customerManager.CreateAsync(mapCustomerModel);

                if(isCreateAsync)
                    return Ok(new ResponseModel(201, "Customer Created", true));

                return BadRequest(new ResponseModel(400, "Customer Not Created! Please, try again.", false));
            }

            return BadRequest(new ResponseModel(400, "Customer Not Created! Please, try again.", false));
        } 
    }
}