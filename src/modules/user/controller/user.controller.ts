import { Body, Controller, Get, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoggerService, RestrictedGuard } from '../../common';
import { Service } from '../../tokens';
import { UserPipe } from '../flow';
import { UserData, UserInput } from '../model';
import { UserService } from '../service';

@Controller('users')
@ApiTags('user')
@ApiBearerAuth()
export class UserController {
  public constructor(
    @Inject(Service.CONFIG)
    private readonly logger: LoggerService,
    private readonly userService: UserService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Find users' })
  @ApiResponse({ status: HttpStatus.OK, isArray: true, type: UserData })
  public async find(): Promise<UserData[]> {
    return this.userService.find();
  }

  @Post()
  @UseGuards(RestrictedGuard)
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserData })
  public async create(@Body(UserPipe) input: UserInput): Promise<UserData> {
    const user = await this.userService.create(input);
    this.logger.info(`Created new user with ID ${user.id}`);

    return user;
  }
}
