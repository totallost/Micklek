using Micklek.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Micklek.API.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options) {}

        public DbSet<Value> Values {get; set;}
        public DbSet<Item> Items { get; set; }
        public DbSet<OrderHeader> OrderHeaders { get; set; }
        public DbSet<OrderLine> OrderLines { get; set; }
    }
}