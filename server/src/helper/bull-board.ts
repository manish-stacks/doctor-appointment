/* eslint-disable prettier/prettier */
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { Queue } from 'bull';

export function setupBullBoard(queues: Queue[]) {
  const serverAdapter = new ExpressAdapter();

  createBullBoard({
    queues: queues.map(q => new BullAdapter(q)),
    serverAdapter,
  });

  return serverAdapter;
}

