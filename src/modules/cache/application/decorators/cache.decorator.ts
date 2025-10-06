import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { CustomCacheInterceptor } from '../../infrastructure/interceptors/custom-cache.interceptor';

interface CacheOptions {
  includeUserId?: boolean;
}

export const CACHE_KEY = 'custom_cache_options';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function Cache(options: CacheOptions = {}) {
  return applyDecorators(SetMetadata(CACHE_KEY, options), UseInterceptors(CustomCacheInterceptor));
}
