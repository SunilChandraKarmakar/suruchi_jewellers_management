using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SuruchiJewellersManagement.Domain.Models;
using SuruchiJewellersManagement.Domain.ViewModels.ProductType;
using SuruchiJewellersManagement.Domain.ViewModels.Response;
using SuruchiJewellersManagement.Manager.Contracts;
using System.Net;

namespace SuruchiJewellersManagement.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductTypeController : ControllerBase
    {
        private readonly IProductTypeManager _productTypeManager;
        private readonly IMapper _mapper;

        public ProductTypeController(IProductTypeManager productTypeManager, IMapper mapper)
        {
            _productTypeManager = productTypeManager;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(typeof(ResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ResponseModel>> GetAllAsync()
        {
            var getAllAsync = await _productTypeManager.GetAllAsync();
            var mapGetAllAsync = _mapper.Map<ICollection<ProductTypeViewModel>>(getAllAsync);

            var responseModel = new ResponseModel(200, "Get product types", mapGetAllAsync);

            return Ok(responseModel);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ResponseModel>> GetByIdAsync(int id)
        {
            var getExistProductType = await _productTypeManager.GetByIdAsync(id);

            if (getExistProductType == null)
                return BadRequest(new ResponseModel(400, "Product type cannot found! Please, try again.", false));

            var mapExistProductType = _mapper.Map<ProductTypeViewModel>(getExistProductType);
            return Ok(new ResponseModel(200, "Get product type by id.", mapExistProductType));
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ResponseModel>> CreateAsync(ProductTypeCreateModel productTypeCreateModel)
        {
            if (ModelState.IsValid)
            {
                var mapProductTypeModel = _mapper.Map<ProductType>(productTypeCreateModel);
                var isCreateAsync = await _productTypeManager.CreateAsync(mapProductTypeModel);

                if (isCreateAsync)
                    return Ok(new ResponseModel(201, "Product type created", true));

                return BadRequest(new ResponseModel(400, "Product type not created! Please, try again.", false));
            }

            return BadRequest(new ResponseModel(400, "Product type not created! Please, try again.", false));
        }

        [HttpPut("{id}")]
        [ProducesResponseType(typeof(ResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ResponseModel>> UpdateAsync(int id, ProductTypeUpdateModel productTypeUpdateModel)
        {
            if (ModelState.IsValid)
            {
                var mapProductTypeUpdateModel = _mapper.Map<ProductType>(productTypeUpdateModel);
                var isUpdateAsync = await _productTypeManager.UpdateAsync(mapProductTypeUpdateModel);

                if (isUpdateAsync)
                    return Ok(new ResponseModel(201, "Product type updated", true));

                return BadRequest(new ResponseModel(400, "Product type not updated! Please, try again.", false));
            }

            return BadRequest(new ResponseModel(400, "Product type not updated! Please, try again.", false));
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(ResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ResponseModel>> DeleteAsync(int id)
        {
            var getExistProductType = await _productTypeManager.GetByIdAsync(id);

            if (getExistProductType == null)
                return BadRequest(new ResponseModel(400, "Product type cannot found! Please, try again.", false));

            var isDeleteAsync = await _productTypeManager.DeleteAsync(getExistProductType);

            if (isDeleteAsync)
                return Ok(new ResponseModel(200, "Product type deleted.", true));

            return BadRequest(new ResponseModel(400, "Product type cannot deleted.", false));
        }
    }
}