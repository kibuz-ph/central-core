import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { SetResponseMessageDecorator } from '../../common/decorators/set-response-message.decorator';
import { EndpointSwaggerDecorator } from '../../common/decorators/swagger.decorator';
import { WrapResponse } from '../../common/decorators/wrap-response.decorator';
import { createBaseResponse, createDataResponse } from '../../common/dtos/base-response.dto';
import { ComplexRoleGuard, RequiredComplexRoles } from '../../common/guards/complex-role.guard';
import { ResponseWrapperInterceptor } from '../../common/interceptors/response-wrapper.interceptor';
import { userRoleTypes } from '../../role/domain/enums/user-role-types.enum';
import { CommonAreaResponseDto } from '../application/dto/common-area-response.dto';
import { CreateCommonAreasDto } from '../application/dto/create-common-areas.dto';
import { UpdateCommonAreaDto } from '../application/dto/update-common-area.dto';
import { CreateCommonAreaUseCase } from '../application/services/create-common-area.use-case';
import { DeleteCommonAreaUseCase } from '../application/services/delete-common-area.use-case';
import { GetCommonAreaUseCase } from '../application/services/get-common-area.use-case';
import { UpdateCommonAreaUseCase } from '../application/services/update-common-area.use-case';

@Controller('common-areas')
@UseInterceptors(ResponseWrapperInterceptor)
export class CommonAreaController {
  constructor(
    private readonly createCommonAreaUseCase: CreateCommonAreaUseCase,
    private readonly getCommonAreaUseCase: GetCommonAreaUseCase,
    private readonly deleteCommonAreaUseCase: DeleteCommonAreaUseCase,
    private readonly updateCommonAreaUseCase: UpdateCommonAreaUseCase,
  ) {}

  @Get('/:id/residential-complexes/:residentialComplexId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator('Common area retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: "Get residential complex's common area",
    responseType: createDataResponse(
      CommonAreaResponseDto,
      "Residential complex's common area retrieved successfully",
    ),
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Common area not found' }],
    requireAuth: true,
  })
  async getCommonAreaById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('residentialComplexId', new ParseUUIDPipe()) residentialComplexId: string,
  ): Promise<CommonAreaResponseDto> {
    return this.getCommonAreaUseCase.execute(id, residentialComplexId);
  }

  @Post('/residential-complexes/:residentialComplexId')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.CREATED)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Common areas added to residential complex successfully')
  @EndpointSwaggerDecorator({
    summary: 'Create common areas',
    responseType: createBaseResponse('Common areas added to residential complex successfully'),
    bodyType: CreateCommonAreasDto,
    successStatus: HttpStatus.CREATED,
    extraResponses: [
      { status: HttpStatus.BAD_REQUEST, description: 'Residential complex not found' },
    ],
    requireAuth: true,
  })
  async createCommonArea(
    @Param('residentialComplexId', new ParseUUIDPipe()) residentialComplexId: string,
    @Body() createCommonAreasDto: CreateCommonAreasDto,
  ): Promise<CommonAreaResponseDto[]> {
    const { items } = createCommonAreasDto;
    return this.createCommonAreaUseCase.execute(residentialComplexId, items);
  }

  @Patch('/:id/residential-complexes/:residentialComplexId')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Common area updated successfully')
  @EndpointSwaggerDecorator({
    summary: 'Update a common area',
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Common area not found' }],
    requireAuth: true,
  })
  async updateCommonArea(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('residentialComplexId', new ParseUUIDPipe()) residentialComplexId: string,
    @Body() updateCommonAreaDto: UpdateCommonAreaDto,
  ): Promise<boolean> {
    return this.updateCommonAreaUseCase.execute(id, residentialComplexId, updateCommonAreaDto);
  }

  @Delete('/:id/residential-complexes/:residentialComplexId')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Common area deleted successfully')
  @EndpointSwaggerDecorator({
    summary: 'Delete a common area',
    successStatus: HttpStatus.NO_CONTENT,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Common area not found' }],
    requireAuth: true,
  })
  async deleteCommonArea(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('residentialComplexId', new ParseUUIDPipe()) residentialComplexId: string,
  ): Promise<boolean> {
    return this.deleteCommonAreaUseCase.execute(id, residentialComplexId);
  }
}
