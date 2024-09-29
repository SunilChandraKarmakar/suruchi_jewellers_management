using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SuruchiJewellersManagement.Domain.Models;
using SuruchiJewellersManagement.Domain.ViewModels.Customer;
using SuruchiJewellersManagement.Domain.ViewModels.Order;
using SuruchiJewellersManagement.Domain.ViewModels.Product;
using SuruchiJewellersManagement.Domain.ViewModels.Response;
using SuruchiJewellersManagement.Manager;
using SuruchiJewellersManagement.Manager.Contracts;
using System.Net;

namespace SuruchiJewellersManagement.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderManager _orderManager;
        private readonly IMapper _mapper;

        public OrderController(IOrderManager orderManager, IMapper mapper)
        {
            _orderManager = orderManager;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(typeof(ResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ResponseModel>> GetAllAsync()
        {
            var getAllAsync = await _orderManager.GetAllAsync();
            var mapGetAllAsync = _mapper.Map<ICollection<OrderViewModel>>(getAllAsync);

            var responseModel = new ResponseModel(200, "Get orders", mapGetAllAsync);

            return Ok(responseModel);
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ResponseModel>> CreateAsync(OrderCreateModel orderCreateModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var mapOrderModel = _mapper.Map<Order>(orderCreateModel);
                    var isCreateAsync = await _orderManager.CreateAsync(mapOrderModel);

                    if (isCreateAsync)
                        return Ok(new ResponseModel(201, "Order created", true));

                    return BadRequest(new ResponseModel(400, "Order not created! Please, try again.", false));
                }

                return BadRequest(new ResponseModel(400, "Order not created! Please, try again.", false));
            }
            catch (Exception ex)
            {

                throw new Exception("Error :- ", ex);
            }
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ResponseModel>> GetByIdAsync(int id)
        {
            var getExistOrder = await _orderManager.GetByIdAsync(id);

            if (getExistOrder == null)
                return BadRequest(new ResponseModel(400, "Order cannot found! Please, try again.", false));

            var mapExistOrder = _mapper.Map<OrderUpdateModel>(getExistOrder);
            return Ok(new ResponseModel(200, "Get product by id.", mapExistOrder));
        }

        [HttpPut("{id}")]
        [ProducesResponseType(typeof(ResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ResponseModel>> UpdateAsync(int id, OrderUpdateModel orderUpdateModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var mapOrderUpdateModel = _mapper.Map<Order>(orderUpdateModel);
                    var isUpdateAsync = await _orderManager.UpdateAsync(mapOrderUpdateModel);

                    if (isUpdateAsync)
                        return Ok(new ResponseModel(201, "Order updated", true));

                    return BadRequest(new ResponseModel(400, "Order not updated! Please, try again.", false));
                }

                return BadRequest(new ResponseModel(400, "Order not updated! Please, try again.", false));
            }
            catch (Exception ex)
            {

                throw new Exception("Error :- ", ex); 
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(ResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ResponseModel>> DeleteAsync(int id)
        {
            var getExistOrder = await _orderManager.GetByIdAsync(id);

            if (getExistOrder == null)
                return BadRequest(new ResponseModel(400, "Order cannot found! Please, try again.", false));

            var isDeleteAsync = await _orderManager.DeleteAsync(getExistOrder);

            if (isDeleteAsync)
                return Ok(new ResponseModel(200, "Order deleted.", true));

            return BadRequest(new ResponseModel(400, "Order cannot deleted.", false));
        }
    }
}