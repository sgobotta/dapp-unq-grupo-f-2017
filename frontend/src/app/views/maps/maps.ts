import { Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MapsAPILoader } from "@agm/core/";
// import { google } from "@agm/core/services/google-maps-types";

@Component({
  selector: "maps",
  moduleId: module.id,
  templateUrl: "maps.html",
  styleUrls: ["./../../app.component.css"],
})
export class Maps implements OnInit {

  public title: string;
  public latitude: number;
  public longitude: number;
  public map;
  public radioTarget;
  public markers: Array<marker>;
  public searchControl: FormControl;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {

    this.title = "Maps";

    // Default UNQ coordinates
    this.latitude  = -34.706556;
    this.longitude = -58.2807111;

    // Main Map
    this.map = {
      zoom: 13
    };

    // Available Delivery Zone
    this.radioTarget = {
      latitude: -34.706556,
      longitude: -58.2807111,
      radius: 2200,
      fillColor: "green",
      draggable: false,
      editable: false,
      clickable: false,
      label: "We are here"
    }

    // Markers
    this.markers = [];

    this.searchControl = new FormControl();

    this.setCurrentPosition();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {

          // Gets the place result
          let place = autocomplete.getPlace();

          // Verifies result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // Sets current position on the map
          let latitude = place.geometry.location.lat();
          let longitude = place.geometry.location.lng();
          this.setSelectedPosition(latitude, longitude);
        });
      });
    });

  }

  setMarkerAt(latitude: number, longitude: number) {
    this.markers = [];
    this.markers.push({
      lat: latitude,
      lng: longitude,
      label: "You are here"
    });
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  onMapClicked($event) {
    let coordinates = $event.coords;
    let latitude = coordinates.lat;
    let longitude = coordinates.lng;
    this.setMarkerAt(latitude, longitude);
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log("dragEnd", m, $event);
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.setMarkerAt(position.coords.latitude, position.coords.longitude);
      });
    }
  }

  private setSelectedPosition(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.setMarkerAt(latitude, longitude);
  }

}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable?: boolean;
}
