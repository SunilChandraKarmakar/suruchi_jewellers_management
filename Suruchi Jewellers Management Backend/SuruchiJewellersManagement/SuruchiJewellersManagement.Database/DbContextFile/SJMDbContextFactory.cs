using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace SuruchiJewellersManagement.Database.DbContextFile
{
    public class SJMDbContextFactory : IDesignTimeDbContextFactory<SJMDbContext>
    {
        public SJMDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<SJMDbContext>();

            var connectionString = @"Host=52.220.53.94;
                                 Database=SuruchiJewellersManagementDb;
                                 Port=5432;
                                 Username=vonome_system;
                                 Password=?A^NA2^xYmbMNqp#";

            optionsBuilder.UseNpgsql(connectionString);
            return new SJMDbContext(optionsBuilder.Options);
        }
    }
}