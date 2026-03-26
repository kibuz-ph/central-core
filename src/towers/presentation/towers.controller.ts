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
import { CreateTowersDto } from '../application/dto/create-towers.dto';
import { TowerResponseDto } from '../application/dto/tower-response.dto';
import { UpdateTowerDto } from '../application/dto/update-tower.dto';
import { CreateTowerUseCase } from '../application/services/create-tower.use-case';
import { DeleteTowerUseCase } from '../application/services/delete-tower.use-case';
import { FindTowersUseCase } from '../application/services/find-towers.use-case';
import { UpdateTowerUseCase } from '../application/services/update-tower.use-case';

@Controller('towers')
@UseInterceptors(ResponseWrapperInterceptor)
export class TowersController {
  constructor(
    private readonly findTowersUseCase: FindTowersUseCase,
    private readonly createTowerUseCase: CreateTowerUseCase,
    private readonly updateTowerUseCase: UpdateTowerUseCase,
    private readonly deleteTowerUseCase: DeleteTowerUseCase,
  ) {}

  @Get('/:id/residential-complex/:residentialComplexeId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator('Tower retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: "Get residential complex's towers",
    responseType: createDataResponse(
      TowerResponseDto,
      "Residential complex's tower retrieved successfully",
    ),
    successStatus: HttpStatus.OK,
    extraResponses: [
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'Tower not found',
      },
    ],
    requireAuth: true,
  })
  async getTowerById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('residentialComplexeId', new ParseUUIDPipe()) residentialComplexeId: string,
  ): Promise<TowerResponseDto> {
    return this.findTowersUseCase.execute(residentialComplexeId, id);
  }

  @Post('/residential-complex/:residentialComplexeId')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.CREATED)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Towers added to residential complex successfully')
  @EndpointSwaggerDecorator({
    summary: 'Create tower',
    responseType: createBaseResponse('Towers added to residential complex successfully'),
    bodyType: TowerResponseDto,
    successStatus: HttpStatus.CREATED,
    extraResponses: [
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'Residential complex not found',
      },
    ],
    requireAuth: true,
  })
  async createTowers(
    @Param('residentialComplexeId', new ParseUUIDPipe()) residentialComplexeId: string,
    @Body() createTowersDto: CreateTowersDto,
  ): Promise<TowerResponseDto[]> {
    const { items } = createTowersDto;
    return this.createTowerUseCase.execute(residentialComplexeId, items);
  }

  @Patch('/:id/residential-complex/:residentialComplexeId')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Tower updated successfully')
  @EndpointSwaggerDecorator({
    summary: 'Updated a Tower',
    successStatus: HttpStatus.OK,
    extraResponses: [
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'Tower not found',
      },
    ],
    requireAuth: true,
  })
  async updateTower(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('residentialComplexeId', new ParseUUIDPipe()) residentialComplexeId: string,
    @Body() updateTowerDto: UpdateTowerDto,
  ): Promise<boolean> {
    return this.updateTowerUseCase.execute(id, residentialComplexeId, updateTowerDto);
  }

  @Delete('/:id/residential-complex/:residentialComplexeId')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Tower deleted successfully')
  @EndpointSwaggerDecorator({
    summary: 'Delete a tower',
    successStatus: HttpStatus.NO_CONTENT,
    extraResponses: [
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'Tower not found',
      },
    ],
    requireAuth: true,
  })
  async deleteTower(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('residentialComplexeId', new ParseUUIDPipe()) residentialComplexeId: string,
  ): Promise<boolean> {
    return this.deleteTowerUseCase.execute(id, residentialComplexeId);
  }
}
