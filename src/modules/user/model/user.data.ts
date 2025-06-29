import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserData {
  public static readonly NAME_LENGTH = 50;

  @ApiProperty({ description: 'User unique ID', example: '36635263' })
  public readonly id: string;

  @ApiProperty({ description: 'First name', example: 'John' })
  public readonly firstName: string;

  @ApiProperty({ description: 'Last name', example: 'Doe' })
  public readonly lastName: string;

  public constructor(entity: User) {
    this.id = entity.id;
    this.firstName = entity.firstName;
    this.lastName = entity.lastName;
  }
}
