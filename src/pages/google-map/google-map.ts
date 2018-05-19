import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapPage {

  @ViewChild('map') mapElement: ElementRef;

  _map: any;
  _location: { lat: number, lng: number };
  _markers = [];

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    // define a location that you want load first
    this._location = { lat: 8.0297, lng: 80.4538 };

    if (this.mapElement) {
      this.loadMap(this._location);
    }
  }

  loadMap(center: { lat: number, lng: number }) {
    this._map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 6,
      center
    });

    // add a marker to current location
    this.addMarker(this._location);

    this._map.addListener('click', (e) => {
      const location = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      console.log("clicked location: ", location);
      this.clearMap();
      this.panMapTo(location);
    });
  }

  private addMarker(position: { lat: number, lng: number }): void {
    const map = this._map;
    const marker = new google.maps.Marker({
      position,
      map,
      title: "You",
      icon: this.getCustomerMarker(),
      // animation to for marker.
      animation: google.maps.Animation.DROP
    });
    // we need to push makers to array. we need these references to remove our marker later
    this._markers.push(marker);
  }

  panMapTo(location: { lat: number, lng: number }): void {
    this._map.panTo(location);
    this.addMarker(location);
  }

  clearMap(): void {
    this._markers.forEach(marker => {
      marker.setMap(null);
    })
  }

  getCustomerMarker(): any {
    return {
      // custom icon png
      url: 'https://cdn.slidesharecdn.com/profile-photo-kpalmer1382-48x48.jpg'
    }
  }
}
