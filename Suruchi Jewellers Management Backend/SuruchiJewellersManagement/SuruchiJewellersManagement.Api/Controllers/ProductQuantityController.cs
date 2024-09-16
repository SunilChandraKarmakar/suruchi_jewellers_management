using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SuruchiJewellersManagement.Domain.Models;
using SuruchiJewellersManagement.Domain.ViewModels.ProductQuantity;
using SuruchiJewellersManagement.Domain.ViewModels.Response;
using SuruchiJewellersManagement.Manager.Contracts;
using System.Net;

namespace SuruchiJewellersManagement.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductQuantityController : ControllerBase
    {
        private readonly IProductQuantityManager _productQuantityManager;
        private readonly IMapper _mapper;

        public ProductQuantityController(IProductQuantityManager productQuantityManager, IMapper mapper)
        {
            _productQuantityManager = productQuantityManager;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(typeof(ResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ResponseModel>> GetAllAsync()
        {
            var getAllAsync = await _productQuantityManager.GetAllAsync();
            var mapGetAllAsync = _mapper.Map<ICollection<ProductQuantityViewModel>>(getAllAsync);

            var responseModel = new ResponseModel(200, "Get product quantities", mapGetAllAsync);

            return Ok(responseModel);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ResponseModel>> GetByIdAsync(int id)
        {
            var getExistProductQuantity = await _productQuantityManager.GetByIdAsync(id);

            if (getExistProductQuantity is null)
                return BadRequest(new ResponseModel(400, "Product quantity cannot found! Please, try again.",
                    false));

            var mapExistProductQuantity = _mapper.Map<ProductQuantityViewModel>(getExistProductQuantity);
            return Ok(new ResponseModel(200, "Get product quantity by id.", mapExistProductQuantity));
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ResponseModel>> CreateAsync(
            ProductQuantityCreateModel productQuantityCreateModel)
        {
            if (ModelState.IsValid)
            {
                var mapProductQuantityModel = _mapper.Map<ProductQuantity>(productQuantityCreateModel);
                var isCreateAsync = await _productQuantityManager.CreateAsync(mapProductQuantityModel);

                if (isCreateAsync)
                    return Ok(new ResponseModel(201, "Product quantity created", true));

                return BadRequest(new ResponseModel(400, "Product quantity not created! Please, try again.", false));
            }

            return BadRequest(new ResponseModel(400, "Product quantity not created! Please, try again.", false));
        }

        [HttpPut("{id}")]
        [ProducesResponseType(typeof(ResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ResponseModel>> UpdateAsync(int id, 
            ProductQuantityUpdateModel productTypeUpdateModel)
        {
            if (ModelState.IsValid)
            {
                var mapProductQuantityUpdateModel = _mapper.Map<ProductQuantity>(productTypeUpdateModel);
                var isUpdateAsync = await _productQuantityManager.UpdateAsync(mapProductQuantityUpdateModel);

                if (isUpdateAsync)
                    return Ok(new ResponseModel(201, "Product quantity updated", true));

                return BadRequest(new ResponseModel(400, "Product quantity not updated! Please, try again.", false));
            }

            return BadRequest(new ResponseModel(400, "Product type not updated! Please, try again.", false));
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(ResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ResponseModel>> DeleteAsync(int id)
        {
            var getExistProductQuantity = await _productQuantityManager.GetByIdAsync(id);

            if (getExistProductQuantity == null)
                return BadRequest(new ResponseModel(400, "Product quantity cannot found! Please, try again.",
                    false));

            var isDeleteAsync = await _productQuantityManager.DeleteAsync(getExistProductQuantity);

            if (isDeleteAsync)
                return Ok(new ResponseModel(200, "Product quantity deleted.", true));

            return BadRequest(new ResponseModel(400, "Product quantity cannot deleted.", false));
        }
    }
}