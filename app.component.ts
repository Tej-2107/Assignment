import { Component, OnInit } from '@angular/core';

declare const L:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit{

  headers = ["Panel Name", "Mac Id", "Lat", "Long", "Location"];

  rows = [
    {
      "Panel Name" : "17000006",
      "Mac Id" : "ABCD",
      "Lat" : "19.098685",
      "Long" : "72.883301",
      "Location" : "Location_Icon"
    },
    {
      "Panel Name" : "17000007",
      "Mac Id" : "PORS",
      "Lat" : "19.767478",
      "Long" : "72.956438",
      "Location" : "Location_Icon"
    }
  ]

  titles = ["Parameters", "R Phase"];

  record = [
    {
      "Parameters" : "Voltage Status",
      "R Phase" : "0"
    },
    {
      "Parameters" : "MCB Status",
      "R Phase" : "0"
    },
    {
      "Parameters" : "Load Status",
      "R Phase" : "1"
    },
    {
      "Parameters" : "PF Status",
      "R Phase" : "0"
    }
  ]

  ngOnInit() {
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
      let mymap = L.map('map').setView(latLong, 13);

      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3VicmF0MDA3IiwiYSI6ImNrYjNyMjJxYjBibnIyem55d2NhcTdzM2IifQ.-NnMzrAAlykYciP4RP9zYQ',
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'your.mapbox.access.token',
        }
      ).addTo(mymap);

      let marker = L.marker(latLong).addTo(mymap);

      marker.bindPopup('<b> Lat-19.098685, Long-72.883301 </b>').openPopup();

      let popup = L.popup()
        .setLatLng(latLong)
        .setContent('My Location')
        .openOn(mymap);
    });
    this.watchPosition();
  }

  watchPosition() {
    let desLat = 19.098685;
    let desLon = 72.883301;
    let id = navigator.geolocation.watchPosition(
      (position) => {
        console.log(
          `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
        );
        if (position.coords.latitude === desLat) {
          navigator.geolocation.clearWatch(id);
        }
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }
}