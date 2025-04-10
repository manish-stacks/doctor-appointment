import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoCallHistory } from './videocall_history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VideocallHistoryService {
    constructor(@InjectRepository(VideoCallHistory)
    private videocallHistoryRepository: Repository<VideoCallHistory>) { }
}
