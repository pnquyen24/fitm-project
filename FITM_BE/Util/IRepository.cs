using FITM_BE.DependencyInjection;
using FITM_BE.Entity.Core;

namespace FITM_BE.Util
{
    public interface IRepository
    {
        public IQueryable<TEntity> GetAll<TEntity>() where TEntity : Audit;
        public Task<TEntity> Add<TEntity>(TEntity entity) where TEntity : Audit;
        public Task<IEnumerable<TEntity>> AddRange<TEntity>(IEnumerable<TEntity> entities) where TEntity : Audit;
        public Task<TEntity> Get<TEntity, TKey>(TKey id) where TEntity : Entity<TKey>;
        public Task<TEntity> Get<TEntity>(int id) where TEntity : Entity<int>;
        public Task<TEntity> Update<TEntity>(TEntity newEntity) where TEntity : Audit;
        public Task Delete<TEntity, TKey>(TKey id) where TEntity : Entity<TKey>;
        public Task Delete<TEntity>(int id) where TEntity : Entity<int>;
    }
}
