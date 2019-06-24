import {createService, SpectatorService, SpyObject} from '@netbasal/spectator';
import {CartService} from './cart.service';
import {PriorityClientsService} from './priority-clients.service';
import {ComplaintsService} from './complaints.service';
import {of} from 'rxjs';

describe('CartService', () => {
  const spectator: SpectatorService<CartService> = createService({
    service: CartService,
    mocks: [PriorityClientsService, ComplaintsService]
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('#sendComplaint', () => {
    it('should return 10 if client without priority', async () => {
      spectator.get<PriorityClientsService>(PriorityClientsService)
        .isPriority.and.returnValue(false);

      const actual: number = await spectator.service.sendComplaint('it does not work!', 'just_a_client').toPromise();

      expect(actual).toBe(10);
    });

    it('should not send complain if client without priority', async () => {
      spectator.get<PriorityClientsService>(PriorityClientsService)
        .isPriority.and.returnValue(false);

      const complaintService: ComplaintsService & SpyObject<ComplaintsService> = spectator.get<ComplaintsService>(ComplaintsService);

      await spectator.service.sendComplaint('it does not work!', 'just_a_client').toPromise();

      expect(complaintService.send).not.toHaveBeenCalled();
    });

    it('should send complain if client is priority', async () => {
      spectator.get<PriorityClientsService>(PriorityClientsService)
        .isPriority.and.returnValue(true);

      const complaintService: ComplaintsService & SpyObject<ComplaintsService> = spectator.get<ComplaintsService>(ComplaintsService);
      complaintService.send.and.returnValue(of(1));

      await spectator.service.sendComplaint('it does not work!', 'important_client').toPromise();

      expect(complaintService.send).toHaveBeenCalledWith({
        clientId: 'important_client',
        message: 'it does not work!'
      });
    });
  });
});
