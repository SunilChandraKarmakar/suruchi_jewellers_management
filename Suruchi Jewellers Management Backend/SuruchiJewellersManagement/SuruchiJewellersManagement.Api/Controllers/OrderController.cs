using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SuruchiJewellersManagement.Domain.Models;
using SuruchiJewellersManagement.Domain.ViewModels.Order;
using SuruchiJewellersManagement.Domain.ViewModels.Response;
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
    }
}