import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { Tshirt } from "../../shared";

@Component({
  selector: "app-tshirt-item",
  templateUrl: "./tshirt-item.component.html",
  styleUrls: ["./tshirt-item.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TshirtItemComponent {
  @Input() item!: Tshirt;
  @Input() buyDisabled = false;
  @Output() buyClicked: EventEmitter<Tshirt> = new EventEmitter<Tshirt>();
}
