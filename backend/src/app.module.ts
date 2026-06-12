import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JobsModule } from './jobs/jobs.module';
import { TokensModule } from './tokens/tokens.module';
import { MilestonesModule } from './milestones/milestones.module';
import { StellarModule } from './stellar/stellar.module';
import { AuditModule } from './audit/audit.module';
import { IpfsModule } from './ipfs/ipfs.module';
import { ApplicationsModule } from './applications/applications.module';
import { DisputesModule } from './disputes/disputes.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    JobsModule,
    ApplicationsModule,
    TokensModule,
    MilestonesModule,
    DisputesModule,
    StellarModule,
    AuditModule,
    IpfsModule,
  ],
})
export class AppModule {}
