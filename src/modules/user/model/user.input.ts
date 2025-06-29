import { PickType } from '@nestjs/swagger';

import { UserData } from './user.data';

export class UserInput extends PickType(UserData, ['firstName', 'lastName'] as const) {}
