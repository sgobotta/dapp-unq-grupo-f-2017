import { Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import { Maps } from "./views/maps/maps";

export const appRoutes: Routes = [
  { path: "maps", component: Maps }
];
