import { Component, OnInit } from '@angular/core';
import { MapStateInfoService } from './map-state-info.service'

declare let L;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  markers: string;
  map: any;
  layerGroup: any;
  constructor(private mapService: MapStateInfoService) {
  }
  busMarker: any = L.icon({
    iconUrl: 'https://image.flaticon.com/icons/svg/1783/1783406.svg',
    iconSize: [16, 16], // size of the icon
    // iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],  // the same for the shadow
    // popupAnchor: [10, 10] // point from which the popup should open relative to the iconAnchor
  });

  ngOnInit() {
    this.initMap();
    this.getMapInfo;
  }

  initMap(){
    this.map = L.map('map').setView([45.0355026, 38.9748486], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    setInterval(() => this.getMapInfo(), 5000);
  }

  getMapInfo() {
    this.mapService.getMapInfo()
      .subscribe(markers => {
        this.markers = markers;
        console.log(markers[0][0]);
        this.addMarkersToMap(markers);
      });
  }


  addMarkersToMap(markers: Array<any>) {
    // this.map.getContainer().innerHRML='';
    const layers = [];
    for (let i = 0; i < markers.length; i++) {
      let lat = markers[i].split(',')[3];
      let lng = markers[i].split(',')[2];
      if (lat && lng) {
        lat = +lat / 1e6;
      lng = +lng / 1e6;
      let marker = new L.marker([lat, lng], { icon: this.busMarker })
        .bindPopup(markers[i].split(',')[1]);
        layers.push(marker);
       }
    }

    if(!this.layerGroup) {
      this.layerGroup = L.layerGroup(layers).addTo(this.map);
      return;
    }

    this.layerGroup.clearLayers();
    this.layerGroup = L.layerGroup(layers).addTo(this.map);
  }


}
