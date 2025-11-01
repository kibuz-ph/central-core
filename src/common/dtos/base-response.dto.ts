import { Type } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BaseResponse {
  @ApiProperty({
    example: 'Operation completed successfully',
    description: 'Response message',
  })
  message: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if the operation was successful',
  })
  success: boolean;

  constructor(message: string, success: boolean) {
    this.message = message;
    this.success = success;
  }
}

export class BaseDataResponse<T> extends BaseResponse {
  @ApiPropertyOptional({
    description: 'Response data',
  })
  data: T;

  constructor(message: string, success: boolean, data: T) {
    super(message, success);
    this.data = data;
  }
}

/**
 * Helper function to create a BaseResponse class with custom example message for Swagger
 * @param exampleMessage - Custom example message for Swagger docs (default: 'Operation completed successfully')
 * @returns A class that extends BaseResponse with custom example message
 */
export function createBaseResponse(exampleMessage: string = 'Operation completed successfully') {
  class CustomBaseResponse extends BaseResponse {
    @ApiProperty({
      example: exampleMessage,
      description: 'Response message',
    })
    declare message: string;

    @ApiProperty({
      example: true,
      description: 'Indicates if the operation was successful',
    })
    declare success: boolean;
  }
  return CustomBaseResponse;
}

/**
 * Helper function to create a typed response class for Swagger documentation
 * @param dataType - The type of data to wrap in the response
 * @param exampleMessage - Optional custom example message for Swagger docs (default: 'Operation completed successfully')
 * @returns A class that extends BaseDataResponse with proper Swagger typing
 */
export function createDataResponse<T>(
  dataType: Type<T>,
  exampleMessage: string = 'Operation completed successfully',
) {
  class DataResponse extends BaseDataResponse<T> {
    @ApiProperty({
      example: exampleMessage,
      description: 'Response message',
    })
    declare message: string;

    @ApiProperty({
      example: true,
      description: 'Indicates if the operation was successful',
    })
    declare success: boolean;

    @ApiProperty({
      type: dataType,
      description: 'Response data',
    })
    declare data: T;
  }
  return DataResponse;
}
