using SuruchiJewellersManagement.Manager.Contracts;
using SuruchiJewellersManagement.Repository.Contracts;

namespace SuruchiJewellersManagement.Manager.Base
{
    public class BaseManager<T> : IBaseManager<T> where T : class
    {
        private readonly IBaseRepository<T> _repository;
        public BaseManager(IBaseRepository<T> repository) => _repository = repository;

        public async Task<ICollection<T>> GetAllAsync()
        {
            var getAllAsync = await _repository.GetAllAsync();
            return getAllAsync;
        }

        public async Task<T> GetByIdAsync(int id)
        {
             var getByIdAsync = await _repository.GetByIdAsync(id);
            return getByIdAsync;    
        }

        public async Task<bool> CreateAsync(T entity)
        {
            var createAsync = await _repository.CreateAsync(entity);
            return createAsync;
        }

        public async Task<bool> UpdateAsync(T entity)
        {
            var updateAsync = await _repository.UpdateAsync(entity);
            return updateAsync; 
        }

        public async Task<bool> DeleteAsync(T entity)
        {
            var deleteAsync = await _repository.DeleteAsync(entity);
            return deleteAsync;
        }           
    }
}