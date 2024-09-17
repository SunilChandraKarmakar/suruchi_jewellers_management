using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SuruchiJewellersManagement.Domain.Models;
using SuruchiJewellersManagement.Domain.ViewModels.Product;
using SuruchiJewellersManagement.Domain.ViewModels.Response;
using SuruchiJewellersManagement.Manager.Contracts;
using System.Net;

namespace SuruchiJewellersManagement.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductManager _productManager;
        private readonly IMapper _mapper;

        public ProductController(IProductManager productManager, IMapper mapper)
        {
            _productManager = productManager;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(typeof(ResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ResponseModel>> GetAllAsync()
        {
            var getAllAsync = await _productManager.GetAllAsync();
            var mapGetAllAsync = _mapper.Map<ICollection<ProductViewModel>>(getAllAsync);

            var responseModel = new ResponseModel(200, "Get products.", mapGetAllAsync);

            return Ok(responseModel);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ResponseModel>> GetByIdAsync(int id)
        {
            var getExistProduct = await _productManager.GetByIdAsync(id);

            if (getExistProduct == null)
                return BadRequest(new ResponseModel(400, "Product cannot found! Please, try again.", false));

            var mapExistProduct = _mapper.Map<ProductViewModel>(getExistProduct);
            return Ok(new ResponseModel(200, "Get product by id.", mapExistProduct));
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ResponseModel>> CreateAsync(ProductCreateModel productCreateModel)
        {
            if (ModelState.IsValid)
            {
                var mapProductModel = _mapper.Map<Product>(productCreateModel);
                var isCreateAsync = await _productManager.CreateAsync(mapProductModel);

                if (isCreateAsync)
                    return Ok(new ResponseModel(201, "Product created", true));

                return BadRequest(new ResponseModel(400, "Product not created! Please, try again.", false));
            }

            return BadRequest(new ResponseModel(400, "Product not created! Please, try again.", false));
        }

        [HttpPut("{id}")]
        [ProducesResponseType(typeof(ResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ResponseModel>> UpdateAsync(int id, ProductUpdateModel productUpdateModel)
        {
            if (ModelState.IsValid)
            {
                var mapProductUpdateModel = _mapper.Map<Product>(productUpdateModel);
                var isUpdateAsync = await _productManager.UpdateAsync(mapProductUpdateModel);

                if (isUpdateAsync)
                    return Ok(new ResponseModel(201, "Product updated", true));

                return BadRequest(new ResponseModel(400, "Product not updated! Please, try again.", false));
            }

            return BadRequest(new ResponseModel(400, "Product not updated! Please, try again.", false));
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(ResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ResponseModel>> DeleteAsync(int id)
        {
            var getExistProduct = await _productManager.GetByIdAsync(id);

            if (getExistProduct == null)
                return BadRequest(new ResponseModel(400, "Product cannot found! Please, try again.", false));

            var isDeleteAsync = await _productManager.DeleteAsync(getExistProduct);

            if (isDeleteAsync)
                return Ok(new ResponseModel(200, "Product deleted.", true));

            return BadRequest(new ResponseModel(400, "Product cannot deleted.", false));
        }
    }
}