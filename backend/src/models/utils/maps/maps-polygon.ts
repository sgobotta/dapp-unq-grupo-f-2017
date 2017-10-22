import MapsLocation from "./maps-location";

export default class MapsPolygon {

  area: MapsLocation[];

  constructor(mapsLocation: MapsLocation[]) {
    this.area = mapsLocation
  }
}
