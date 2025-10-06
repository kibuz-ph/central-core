import { CacheTTL } from '@nestjs/cache-manager';
import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { AuditLog } from '../../../../common/decorators/audit-log.decorator';
import { SetResponseMessageDecorator } from '../../../../common/decorators/set-response-message.decorator';
import { EndpointSwaggerDecorator } from '../../../../common/decorators/swagger.decorator';
import { PaginatedResponseDto } from '../../../../common/dtos/paginates-response.dto';
import { PaginationQueryDto } from '../../../../common/dtos/pagination-query.dto';
import { Cache } from '../../../cache/application/decorators/cache.decorator';
import { CreateFrobnicatorUseCase } from '../../application/services/create-frobnicator.use-case';
import { GetAllFrobnicatorUseCase } from '../../application/services/get-all-frobnicator.use-case';
import { CreateFrobnicatorDto } from './dtos/create-frobnicator.dto';
import { FrobnicatorResponseDto } from './dtos/frobnicator-response.dto';

@Controller('frobnicator')
export class FrobnicatorController {
  constructor(
    private readonly createFrobnicatorUseCase: CreateFrobnicatorUseCase,
    private readonly getAllFrobnicatorUseCase: GetAllFrobnicatorUseCase,
  ) {}

  @Cache()
  @CacheTTL(10000)
  @Post()
  @EndpointSwaggerDecorator({
    summary: 'Create a new Frobnicator',
    responseType: FrobnicatorResponseDto,
    bodyType: CreateFrobnicatorDto,
    successStatus: HttpStatus.CREATED,
    extraResponses: [{ status: HttpStatus.CONFLICT, description: 'Frobnicator already exists' }],
  })
  @AuditLog('create_frobnicator')
  @SetResponseMessageDecorator<FrobnicatorResponseDto>(
    data => `frobnicator with id ${data.id} created`,
  )
  async createFrobnicator(@Body() body: { name: string; description: string }) {
    return this.createFrobnicatorUseCase.execute(body.name, body.description);
  }

  @Cache({ includeUserId: true })
  @Get()
  @EndpointSwaggerDecorator({
    summary: 'Retrive all Frobnicators (paginated)',
    responseType: PaginatedResponseDto<FrobnicatorResponseDto>,
    successStatus: HttpStatus.OK,
    queryType: PaginatedResponseDto,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Page is out of the range' }],
  })
  async getAllFrobnicator(
    @Query() pagination: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<FrobnicatorResponseDto>> {
    return this.getAllFrobnicatorUseCase.execute(pagination.page, pagination.perPage);
  }
}
