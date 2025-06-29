import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../common';
import { UserData, UserInput } from '../model';

@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService) {}

  /**
   * Find all users in the database
   *
   * @returns A user list
   */
  public async find(): Promise<UserData[]> {
    const users = await this.prismaService.user.findMany({});

    return users.map((user) => new UserData(user));
  }

  /**
   * Create a new user record
   *
   * @param data user details
   * @returns A user created in the database
   */
  public async create(data: UserInput): Promise<UserData> {
    const user = await this.prismaService.user.create({
      data,
    });

    return new UserData(user);
  }
}
