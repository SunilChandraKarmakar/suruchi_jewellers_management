using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SuruchiJewellersManagement.Domain.Models;

namespace SuruchiJewellersManagement.Database.DbContextFile
{
    public class SJMDbContext : IdentityDbContext<User, IdentityRole, string>
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
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetails> OrderDetails { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string connectionString = @"Server = DESKTOP-I6ENAU2\SQLEXPRESS; 
                                        Database = SuruchiJewellersManagementDb; 
                                        Trusted_Connection = True; 
                                        MultipleActiveResultSets = True; 
                                        TrustServerCertificate = True";

            optionsBuilder.UseSqlServer(connectionString);
        }
    }
}