import {createServiceFactory, SpectatorService, SpyObject, SpectatorServiceFactory} from '@ngneat/spectator';
import {CartService} from './cart.service';
import {PriorityClientsService} from './priority-clients.service';
import {ComplaintsService} from './complaints.service';
import {of} from 'rxjs';

describe('CartService', () => {
  let spectator: SpectatorService<CartService>;

  const createService = createServiceFactory({
    service: CartService,
    mocks: [PriorityClientsService, ComplaintsService]
  });

  beforeEach(() => void (spectator = createService()));

  it('should be created', () => {
    expect(spectator).toBeTruthy();
  });

  describe('#sendComplaint', () => {
    it('should return 10 if client without priority', async () => {
      spectator.inject<PriorityClientsService>(PriorityClientsService)
        .isPriority.and.returnValue(false);

      const actual: number = await spectator.service.sendComplaint('it does not work!', 'just_a_client').toPromise();

      expect(actual).toBe(10);
    });

    it('should not send complain if client without priority', async () => {
      spectator.inject<PriorityClientsService>(PriorityClientsService)
        .isPriority.and.returnValue(false);

      const complaintService: ComplaintsService & SpyObject<ComplaintsService> = spectator.inject<ComplaintsService>(ComplaintsService);

      await spectator.service.sendComplaint('it does not work!', 'just_a_client').toPromise();

      expect(complaintService.send).not.toHaveBeenCalled();
    });

    it('should send complain if client is priority', async () => {
      spectator.inject<PriorityClientsService>(PriorityClientsService)
        .isPriority.and.returnValue(true);

      const complaintService: ComplaintsService & SpyObject<ComplaintsService> = spectator.inject<ComplaintsService>(ComplaintsService);
      complaintService.send.and.returnValue(of(1));

      await spectator.service.sendComplaint('it does not work!', 'important_client').toPromise();

      expect(complaintService.send).toHaveBeenCalledWith({
        clientId: 'important_client',
        message: 'it does not work!'
      });
    });
  });
});
