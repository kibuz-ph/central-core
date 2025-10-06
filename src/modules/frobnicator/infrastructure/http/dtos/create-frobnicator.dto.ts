import { ApiProperty } from "@nestjs/swagger";

export class CreateFrobnicatorDto {
	@ApiProperty({ example: "FrobOne", description: "Name of the Frobnicator" })
	name: string;

	@ApiProperty({ example: "A powerful Frobnicator", description: "Description of the Frobnicator" })
	// if the ApiProperty is ommited, it defaults to the type e.g. "string" instead of "Description of the Frobnicator"
	description: string;
}
