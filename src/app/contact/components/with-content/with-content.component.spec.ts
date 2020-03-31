import { SpectatorHost, createHostFactory } from "@ngneat/spectator";
import { WithContentComponent } from "./with-content.component";

describe("WithContentComponent", () => {
  let host: SpectatorHost<WithContentComponent>;

  const createHost = createHostFactory<WithContentComponent>(
    WithContentComponent
  );

  describe("basic display", () => {
    beforeEach(() => {
      host = createHost(`
        <app-with-content>
          <span>This is the content</span>
        </app-with-content>
      `);
    });

    it("should create", () => {
      expect(host.component).toBeTruthy();
    });

    it("should display content in correct place", () => {
      expect(".content").toHaveDescendantWithText({
        selector: "span",
        text: "This is the content",
      });
    });
  });
});
