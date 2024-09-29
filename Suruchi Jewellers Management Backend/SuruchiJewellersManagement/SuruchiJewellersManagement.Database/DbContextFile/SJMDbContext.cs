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
        public DbSet<ProductQuantity> ProductQuantities { get; set; }   
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductOption> ProductOptions { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetails> OrderDetails { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // For local Sql Server
            var connectionString = @"Server = DESKTOP-I6ENAU2\SQLEXPRESS; 
                                        Database = SuruchiJewellersManagementDb; 
                                        Trusted_Connection = True; 
                                        MultipleActiveResultSets = True; 
                                        TrustServerCertificate = True";

            // For Sql Server
            //string connectionString = @"workstation id=SuruchiJewellersManagementDb.mssql.somee.com;packet size=4096;user id=sunilkarmakar_SQLLogin_1;pwd=wrjveenytu;data source=SuruchiJewellersManagementDb.mssql.somee.com;persist security info=False;initial catalog=SuruchiJewellersManagementDb;TrustServerCertificate=True";

            optionsBuilder.UseSqlServer(connectionString);
        }
    }
}