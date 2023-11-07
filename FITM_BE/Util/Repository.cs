using FITM_BE.Entity;
using FITM_BE.Entity.Core;
using FITM_BE.EntityFrameworkCore;
using FITM_BE.Exceptions.UserException;
using Microsoft.EntityFrameworkCore;
using NetCore.AutoRegisterDi;
using System.Security.Claims;

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
            entity.CreatedBy = GetCurrent();
            entity.CreatedTime = DateTime.Now;
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
            var currentUser = GetCurrent();
            var currentTime = DateTime.Now;

            entities = entities.Select(e =>
            {
                e.CreatedBy = currentUser;
                e.CreatedTime = currentTime;
                return e;
            });

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
            entity.ModifyBy = GetCurrent();
            await Update(entity);
        }

        public async Task Delete<TEntity>(int id) where TEntity : Entity<int>
        {
            await Delete<TEntity, int>(id);
        }

        public TEntity Get<TEntity, TKey>(TKey id) where TEntity : Entity<TKey>
        {
            var entity = _dbContext.Set<TEntity>()
                                   .Where(entity => !entity.IsDeleted)
                                   .FirstOrDefault(entity => entity.Id.Equals(id));
            if (entity == default)
            {
                throw new NotFoundException($"{nameof(TEntity)} not found");
            }

            return entity;
        }

        public TEntity Get<TEntity>(int id) where TEntity : Entity<int>
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
            newEntity.ModifyBy = GetCurrent();
            _dbContext.Set<TEntity>().Update(newEntity);
            await _dbContext.SaveChangesAsync();
            _dbContext.SaveChangesFailed += (object? sender, SaveChangesFailedEventArgs eventArgs) =>
            {
                throw new SystemException();
            };
            return newEntity;
        }

        public async Task<IEnumerable<TEntity>> UpdateRange<TEntity>(IEnumerable<TEntity> entities) where TEntity : Audit
        {
            var currentUser = GetCurrent();
            var currentTime = DateTime.Now;

            entities = entities.Select(e =>
            {
                e.ModifyBy = currentUser;
                e.ModifiedTime = currentTime;
                return e;
            });

            _dbContext.UpdateRange(entities);
            await _dbContext.SaveChangesAsync();

            _dbContext.SaveChangesFailed += (sender, e) =>
            {
                throw new SystemException(e.Exception.Message);
            };

            return entities;
        }

        public async Task DeleteRange<TEntity>(IEnumerable<int> ids) where TEntity : Entity<int>
        {
            var entities = _dbContext.Set<TEntity>()
                .Where(entity => entity.IsDeleted)
                .Where(entity => ids.Contains(entity.Id));
            if ( !entities.Any() )
            {
                throw new NotFoundException($"{typeof(TEntity).Name} not found");
            }
            var now = DateTime.Now;
            await entities.ForEachAsync(async entity =>
            {
                entity.IsDeleted = true;
                entity.ModifiedTime = now;
                entity.ModifyBy = GetCurrent();
            });

            _dbContext.UpdateRange(entities);
            await _dbContext.SaveChangesAsync();
        }

        private Member? GetCurrent()
        {
            if (_httpContextAccessor.HttpContext != null && int.TryParse(_httpContextAccessor.HttpContext.User.FindFirstValue("UserID"), out int userID))
            {
            return Get<Member>(userID);
            }
            return null;
        }
    }
}
