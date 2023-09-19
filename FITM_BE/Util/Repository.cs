using FITM_BE.DependencyInjection;
using FITM_BE.Entity;
using FITM_BE.Entity.Core;
using FITM_BE.EntityFrameworkCore;
using FITM_BE.Exceptions.UserException;
using Microsoft.EntityFrameworkCore;
using NetCore.AutoRegisterDi;

namespace FITM_BE.Util
{
    [RegisterAsTransient]       
    public class Repository : IRepository
    {
        private readonly DbContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public Repository(DatabaseContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<TEntity> Add<TEntity>(TEntity entity) where TEntity : Audit
        {
            await _dbContext.Set<TEntity>().AddAsync(entity);
            await _dbContext.SaveChangesAsync();
            _dbContext.SaveChangesFailed += (object? sender, SaveChangesFailedEventArgs eventArgs) =>
            {
                throw new SystemException(eventArgs.Exception.Message);
            };
            return entity;
        }

        public async Task<IEnumerable<TEntity>> AddRange<TEntity>(IEnumerable<TEntity> entities) where TEntity : Audit
        {
            await _dbContext.Set<TEntity>().AddRangeAsync(entities);
            await _dbContext.SaveChangesAsync();
            _dbContext.SaveChangesFailed += (object? sender, SaveChangesFailedEventArgs eventArgs) =>
            {
                throw new SystemException(eventArgs.Exception.Message);
            };
            return entities;
        }

        public async Task Delete<TEntity, TKey>(TKey id) where TEntity : Entity<TKey>
        {
            var entity = await _dbContext.Set<TEntity>().Where(entity => !entity.IsDeleted)
                                         .FirstOrDefaultAsync(entity => entity.Id.Equals(id));
            if (entity == default)
            {
                throw new NotFoundException($"{nameof(TEntity)} not found");
            }
            entity.IsDeleted = true;
            entity.ModifiedTime = DateTime.Now;
            entity.ModifyBy = GetAll<Member>().FirstOrDefault(member => member.Username.Equals(_httpContextAccessor.HttpContext.User.Identity.Name));
            await Update(entity);
        }

        public async Task Delete<TEntity>(int id) where TEntity : Entity<int>
        {
            await Delete<TEntity>(id);
        }

        public async Task<TEntity> Get<TEntity, TKey>(TKey id) where TEntity : Entity<TKey>
        {
            var entity = await _dbContext.Set<TEntity>()
                                   .Where(entity => !entity.IsDeleted)
                                   .FirstOrDefaultAsync(entity => entity.Id.Equals(id));
            if (entity == default)
            {
                throw new NotFoundException($"{nameof(TEntity)} not found");
            }

            return entity;
        }

        public Task<TEntity> Get<TEntity>(int id) where TEntity : Entity<int>
        {
            return Get<TEntity, int>(id);
        }

        public IQueryable<TEntity> GetAll<TEntity>() where TEntity : Audit
        {
            return _dbContext.Set<TEntity>()
                             .Where(entity => !entity.IsDeleted);
        }

        public async Task<TEntity> Update<TEntity>(TEntity newEntity) where TEntity : Audit
        {
            newEntity.ModifiedTime = DateTime.Now;
            newEntity.ModifyBy = GetAll<Member>().FirstOrDefault(member => member.Username.Equals(_httpContextAccessor.HttpContext.User.Identity.Name));
            _dbContext.Set<TEntity>().Update(newEntity);
            await _dbContext.SaveChangesAsync();
            _dbContext.SaveChangesFailed += (object? sender, SaveChangesFailedEventArgs eventArgs) =>
            {
                throw new SystemException();
            };
            return newEntity;
        }
    }
}
