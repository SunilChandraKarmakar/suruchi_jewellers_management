using Microsoft.EntityFrameworkCore;
using SuruchiJewellersManagement.Database.DbContextFile;
using SuruchiJewellersManagement.Repository.Contracts;

namespace SuruchiJewellersManagement.Repository.Base
{
    public abstract class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        protected readonly SJMDbContext dbContext;
        protected BaseRepository() => dbContext = new SJMDbContext();

        public async Task<ICollection<T>> GetAllAsync()
        {
            var getAllAsync = await dbContext.Set<T>().ToListAsync();
            return getAllAsync;
        }

        public async Task<T> GetByIdAsync(int id)
        {
            var getByIdAsync = await dbContext.Set<T>().FindAsync(id);
            return getByIdAsync;
        }

        public async Task<bool> CreateAsync(T entity)
        {
            await dbContext.Set<T>().AddAsync(entity);
            var createAsync = await dbContext.SaveChangesAsync() > 0;

            return createAsync;
        }

        public async Task<bool> UpdateAsync(T entity)
        {
            dbContext.Entry(entity).State = EntityState.Modified;
            var updateAsync = await dbContext.SaveChangesAsync() > 0;

            return updateAsync;
        }

        public async Task<bool> DeleteAsync(T entity)
        {
            dbContext.Set<T>().Remove(entity);
            var deleteAsync = await dbContext.SaveChangesAsync() > 0;

            return deleteAsync;
        }
    }
}