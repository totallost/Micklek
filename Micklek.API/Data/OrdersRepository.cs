using System.Collections.Generic;
using System.Threading.Tasks;
using Micklek.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Micklek.API.Data
{
    public class OrdersRepository : IOrderRepository
    {
        private readonly DataContext _context;
        public OrdersRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Item> GetItem(int id)
        {
            return await _context.Items.SingleOrDefaultAsync(i => i.Id ==id);
        }

        public async Task<IEnumerable<Item>> GetItems()
        {
            return await _context.Items.ToListAsync();
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}