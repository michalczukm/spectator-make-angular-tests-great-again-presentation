import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TshirtsComponent } from "./tshirts";
import { ContactComponent } from "./contact";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "tshirts",
  },
  {
    path: "tshirts",
    component: TshirtsComponent,
  },
  {
    path: "contact",
    component: ContactComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
