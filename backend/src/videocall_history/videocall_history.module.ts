import { Module } from '@nestjs/common';
import { VideocallHistoryController } from './videocall_history.controller';
import { VideocallHistoryService } from './videocall_history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoCallHistory } from './videocall_history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VideoCallHistory])],
  controllers: [VideocallHistoryController],
  providers: [VideocallHistoryService]
})
export class VideocallHistoryModule {}
