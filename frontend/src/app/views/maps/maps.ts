import { Component } from "@angular/core";

@Component({
  selector: "maps",
  moduleId: module.id,
  templateUrl: "maps.html",
  styleUrls: ["./../../app.component.css"],
})
export class Maps {

  title = "Maps";

  // UNQ coordinates
  latitude: number = -34.706556;
  longitude: number = -58.2807111;

  map = {
    zoom: 13
  }

  radioTarget = {
    latitude: this.latitude,
    longitude: this.longitude,
    radius: 2200,
    fillColor: "green",
    draggable: false,
    editable: false,
    clickable: false
  }

  markers: marker[] = []

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  onMapClicked($event) {
    var coordinates = $event.coords;

    // The list is empty so that only one marker can be added (can be modified)
    this.markers = [];
    this.markers.push({
      lat: coordinates.lat,
      lng: coordinates.lng,
      label: 'Destination',
      draggable: true
    });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable?: boolean;
}
