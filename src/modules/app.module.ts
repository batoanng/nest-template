import { Module } from '@nestjs/common';

import { CommonModule } from './common';
import { UserModule } from './user/user.module';

@Module({
  imports: [CommonModule, UserModule],
})
export class ApplicationModule {}
