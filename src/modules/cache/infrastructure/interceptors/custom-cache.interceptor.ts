import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Cache } from 'cache-manager';
import * as crypto from 'node:crypto';
import { Request } from 'express';
import { CACHE_KEY } from '../../application/decorators/cache.decorator';

@Injectable()
export class CustomCacheInterceptor extends CacheInterceptor {
  constructor(
    @Inject(CACHE_MANAGER) cacheManager: Cache,
    protected readonly reflector: Reflector,
  ) {
    super(cacheManager, reflector);
  }

  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest<Request & { user?: { id: string } }>();
    if (!request) return undefined;

    const handler = context.getHandler();
    const cacheOptions = this.reflector.get<{ includeUserId?: boolean }>(CACHE_KEY, handler) || {};

    const userId = cacheOptions.includeUserId ? request.user?.id || 'guest' : 'anonymous';
    const method = request.method;
    const url = request.url;
    const params = JSON.stringify(request.params || {});
    const query = JSON.stringify(request.query || {});

    // Hashing the request body
    const bodyString = request.body ? JSON.stringify(request.body) : '';
    const bodyHash = crypto.createHash('sha256').update(bodyString).digest('hex');

    // Creating the cache key
    return `cache:${userId}:${method}:${url}:${params}:${query}:${bodyHash}`;
  }
}
