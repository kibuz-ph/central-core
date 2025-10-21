import { HttpStatus, Type, applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCookieAuth, ApiExtraModels, ApiOperation, ApiResponse } from '@nestjs/swagger';

/**
 * custom Swagger decorator for automating API documentation.
 *
 * @param summary - A short summary of the API operation.
 * @param responseType - The DTO for a successful response (default: `void`).
 * @param bodyType - The DTO for request body (optional).
 * @param successStatus - The success status code (default: `200`).
 * @param extraResponses - Additional custom response statuses.
 */
export function EndpointSwaggerDecorator({
  summary,
  responseType,
  bodyType,
  queryType,
  successStatus = HttpStatus.OK,
  extraResponses = [],
  requireAuth = true,
}: {
  summary: string;
  responseType?: Type<unknown>;
  bodyType?: Type<unknown>;
  queryType?: Type<unknown>;
  successStatus?: HttpStatus;
  extraResponses?: { status: number; description: string; type?: Type<unknown> }[];
  requireAuth?: boolean;
}) {
  const decorators = [
    ApiOperation({ summary }),

    // Security Decorators
    ...(requireAuth ? [ApiCookieAuth()] : []),

    // Default Success Response (Customizable)
    ApiResponse({ status: successStatus, description: 'Success', type: responseType }),

    // Default Error Responses
    ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' }),
    ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error' }),
    ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' }),
  ];

  // Add Request Body if Specified
  if (bodyType) {
    decorators.push(ApiBody({ type: bodyType }));
  }

  if (queryType) {
    decorators.push(ApiExtraModels(queryType));
  }

  // Add Extra Responses if Provided
  for (const res of extraResponses) {
    decorators.push(
      ApiResponse({ status: res.status, description: res.description, type: res.type }),
    );
  }

  return applyDecorators(...decorators);
}
