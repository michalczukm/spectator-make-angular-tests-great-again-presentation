import { Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent {
  constructor(private toastrService: ToastrService) {}

  hitted(count: number): void {
    this.toastrService.info(`Text hitted ${count} times!`);
  }
}
