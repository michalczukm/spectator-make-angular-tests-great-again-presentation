import {SpectatorWithHost, createHostComponentFactory} from '@netbasal/spectator';
import {WithContentComponent} from './with-content.component';


/**
 * This spectator version might have bug :(
 * Tests are successful 50/50 even if run separately
 */
xdescribe('WithContentComponent', () => {
  let host: SpectatorWithHost<WithContentComponent>;

  const createHost = createHostComponentFactory<WithContentComponent>(WithContentComponent);

  describe('basic display', () => {
    beforeEach(() => {
      host = createHost(`
        <lp-with-content>
          <span>This is the content</span>
        </lp-with-content>
      `);
    });

    it('should create', () => {
      expect(host.component).toBeTruthy();
    });

    it('should display content in correct place', () => {
      expect('.content').toHaveDescendantWithText({
        selector: 'span',
        text: 'This is the content'
      });
    });
  });
});
