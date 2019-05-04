using System.Collections.Generic;
using System.Linq;
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

        public async Task<IEnumerable<Item>> GetActiveItems()
        {
            return await _context.Items.Where(x => x.IsActive == true).ToListAsync();
        }

        public async Task<Item> GetItem(int id)
        {
            return await _context.Items.SingleOrDefaultAsync(i => i.Id ==id);
        }

        public async Task<IEnumerable<Item>> GetItems()
        {
            return await _context.Items.ToListAsync();
        }

        public async Task<OrderHeader> GetOrderHeader(int id)
        {
            return await _context.OrderHeaders.SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<OrderHeader>> GetOrderHeaders()
        {
            return await _context.OrderHeaders.Include(x => x.Status).ToListAsync();
        }

        public async Task<IEnumerable<OrderLine>> GetOrderLines(int id)
        {
            return await _context.OrderLines.Where(x => x.OrderHeaderId==id).Include(x => x.Item).ToListAsync();
        }

        public async Task<IEnumerable<Status>> GetStatuses()
        {
            return await _context.Statuses.ToListAsync();
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

    }
}