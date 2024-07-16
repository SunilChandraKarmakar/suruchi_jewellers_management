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

            var responseModel = new ResponseModel(200, "Get customers", mapGetAllAsync);

            return Ok(responseModel);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ResponseModel>> GetByIdAsync(int id)
        {
            var getExistCustomer = await _customerManager.GetByIdAsync(id);

            if (getExistCustomer == null)
                return BadRequest(new ResponseModel(400, "Customer cannot found! Please, try again.", false));

            var mapExistCustomer = _mapper.Map<CustomerViewModel>(getExistCustomer);
            return Ok(new ResponseModel(200, "Get customer by id.", mapExistCustomer));
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
                    return Ok(new ResponseModel(201, "Customer created", true));

                return BadRequest(new ResponseModel(400, "Customer not created! Please, try again.", false));
            }

            return BadRequest(new ResponseModel(400, "Customer not created! Please, try again.", false));
        }

        [HttpPut("{id}")]
        [ProducesResponseType(typeof(ResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ResponseModel>> UpdateAsync(int id, CustomerUpdateModel customerUpdateModel)
        {
            if(ModelState.IsValid)
            {
                var mapCustomerUpdateModel = _mapper.Map<Customer>(customerUpdateModel);
                var isUpdateAsync = await _customerManager.UpdateAsync(mapCustomerUpdateModel);

                if (isUpdateAsync)
                    return Ok(new ResponseModel(201, "Customer updated", true));

                return BadRequest(new ResponseModel(400, "Customer not updated! Please, try again.", false));
            }

            return BadRequest(new ResponseModel(400, "Custoner not updated! Please, try again.", false));
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(ResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ResponseModel>> DeleteAsync(int id)
        {
            var getExistCustomer = await _customerManager.GetByIdAsync(id);

            if (getExistCustomer == null)
                return BadRequest(new ResponseModel(400, "Customer cannot found! Please, try again.", false));

            var isDeleteAsync = await _customerManager.DeleteAsync(getExistCustomer);

            if(isDeleteAsync)
                return Ok(new ResponseModel(200, "Customer deleted.", true));

            return BadRequest(new ResponseModel(400, "Customer cannot deleted.", false));
        }
    }
}