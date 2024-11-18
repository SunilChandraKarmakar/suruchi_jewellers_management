using Microsoft.EntityFrameworkCore;
using SuruchiJewellersManagement.Domain.Models;

namespace SuruchiJewellersManagement.Database.DbContextFile
{
    public class SJMDbContext : DbContext
    {
        public SJMDbContext()
        {
            
        }

        public SJMDbContext(DbContextOptions<SJMDbContext> dbContextOptions) : base(dbContextOptions)
        {
            
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<ProductQuantity> ProductQuantities { get; set; }   
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductOption> ProductOptions { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetails> OrderDetails { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var connectionString = @"Host=52.220.53.94;
                                 Database=SuruchiJewellersManagementDb;
                                 Port=5432;
                                 Username=vonome_system;
                                 Password=?A^NA2^xYmbMNqp#";

                optionsBuilder.UseNpgsql(connectionString);
            }
        }
    }
}