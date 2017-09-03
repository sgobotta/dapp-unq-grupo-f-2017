import { Component } from "@angular/core";

@Component({
  selector: "maps",
  moduleId: module.id,
  templateUrl: "maps.html",
  styleUrls: ["./../../app.component.css"],
})
export class Maps {

  title = "Maps";
  lat: number = -34.706556;
  lng: number = -58.2807111;
}
