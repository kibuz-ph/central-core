/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { createKeyv } from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheableMemory } from 'cacheable';
import Keyv from 'keyv';
import { Config } from '../../config/config';
import { PinoLoggerService } from '../pino/application/services/pino-logger.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<Config>, logger: PinoLoggerService) => {
        // Redis Store
        const redisUrl = configService.get('redis.url', { infer: true });
        const nodeEnv = configService.getOrThrow<string>('nodeEnv');

        let redisStore: any = null;
        try {
          redisStore = createKeyv(redisUrl as string, {
            keyPrefixSeparator: ':',
            namespace: nodeEnv,
          });
          await redisStore.get('test');
          logger.log('✅ [Redis-Cache] is connected ✅');
        } catch (error) {
          logger.warn(`❌ [Redis-Cache] connection failed: ${error} ❌`);
          redisStore = null;
        }

        // In-memory Store
        const inMemoryStore = new Keyv({
          store: new CacheableMemory({ lruSize: 1000 }),
          namespace: nodeEnv,
        });

        return {
          stores: redisStore ? [redisStore, inMemoryStore] : [inMemoryStore],
          ttl: configService.get('redis.cacheTtl', { infer: true }),
        };
      },
      isGlobal: true,
      inject: [ConfigService, PinoLoggerService],
    }),
  ],
})
export class CustomCacheModule {}
