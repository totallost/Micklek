using System.Collections.Generic;
using System.Threading.Tasks;
using Micklek.API.Models;

namespace Micklek.API.Data
{
    public interface IOrderRepository
    {
         void Add<T>(T entity) where T:class;
         void Delete<T>(T entity) where T:class;
         Task<bool> SaveAll();
         Task<IEnumerable<Item>> GetItems();
         Task<Item> GetItem(int id);
         Task<IEnumerable<OrderHeader>> GetOrderHeaders();
         Task<OrderHeader> GetOrderHeader(int id);
         Task<IEnumerable<OrderLine>> GetOrderLines(int id);
         Task<IEnumerable<Status>> GetStatuses();
         Task<IEnumerable<Item>> GetActiveItems();

    }
}