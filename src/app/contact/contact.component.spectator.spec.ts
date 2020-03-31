import {
  Spectator,
  createComponentFactory,
  mockProvider,
} from "@ngneat/spectator";
import { MockComponents } from "ng-mocks";
import { ToastrService } from "ngx-toastr";
import { ContactComponent } from "./contact.component";
import { MockMeComponent } from "./components/mock-me/mock-me.component";
import { WithContentComponent } from "./components/with-content/with-content.component";

describe("ContactComponentSpectator", () => {
  let spectator: Spectator<ContactComponent>;

  const createComponent = createComponentFactory({
    component: ContactComponent,
    declarations: MockComponents(MockMeComponent, WithContentComponent),
    providers: [mockProvider(ToastrService)],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it("should create", () => {
    expect(spectator.component).toBeTruthy();
  });

  describe("communication with mocked component", () => {
    it("should display toastr", () => {
      const toastrService: ToastrService = spectator.inject<ToastrService>(
        ToastrService
      );

      const mockMeComponent: MockMeComponent = spectator.query(MockMeComponent);
      mockMeComponent.hitted.emit(10);

      expect(toastrService.info).toHaveBeenCalledWith("Text hitted 10 times!");
    });
  });
});
