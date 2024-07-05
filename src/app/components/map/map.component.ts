import { AfterViewInit, Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Leaflet
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import 'leaflet-routing-machine';
import { Map, MapOptions, control, Routing, LatLng } from 'leaflet';
// Models
import { base_osm, argenmap, googleSat } from './../../models/baselayers.models';
import { WaypointModel, RouteWaypointModel } from '../../models/routing.models';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    RouterOutlet,
    LeafletModule
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  // Title
  title = 'traceroute';
  // Map
  public layersControl: any = [];
  public map!: Map;
  public leafletLayersControlOptions = { position: 'topleft'};
  public mapOptions!: MapOptions;
  private _centerCoords: [number, number] = [-31.416814, -64.183569];
  // Waypoints returned by control after route is edited
  public totalWaypoints: Array<RouteWaypointModel> = [];
  // Routing Control
  private _routingControl: any;
  private _startLatLng!: LatLng;
  private _endLatLng!: LatLng;

  // Itinerary. 
  @Input()
  set startCoords(value:[number,number]){
    this._startLatLng = new LatLng(value[0], value[1]);
  }
  
  @Input()
  set endCoords(value:[number, number]){
    this._endLatLng = new LatLng(value[0], value[1]);
  }

  constructor(){
    this.setupMap();
  }


  ngAfterViewInit(): void {
    // Trace route
    this.traceRoute();
  }

  // Trace route
  private traceRoute(){
    // Routing
    let routing = this._routingControl = Routing.control({
      router: Routing.osrmv1({
          serviceUrl: `https://routing.bordergis.com/route/v1`,
          language:"es"
      }),
      showAlternatives: false,
      fitSelectedRoutes: false,
      show: false,
      collapsible: true, 
      routeWhileDragging: true,
      waypoints: [{
        latLng: this._startLatLng,
        name: "Inicio"
      },
      {
        latLng: this._endLatLng,
        name: "Fin"
      }],
    });

    routing.addTo(this.map);

    // Event
    routing.on('routeselected', (e: any) => {
      this.totalWaypoints = e.route.waypoints;
    });
  }

  public catchMap(map:any){
    this.map = map;

    control.scale({
      position:'bottomright',
      imperial: false,
      metric: true
    }).addTo(map);
  }

  private setupMap(){

    this.layersControl = {
      baseLayers : {
        '<span class="base-layer-item">Open Street Map Standard</span>': base_osm,
        '<span class="base-layer-item">Argenmap IGN</span>': argenmap,
        '<span class="base-layer-item">Google Maps Satellite</span>': googleSat        
      }
    }
         
    this.mapOptions = {
      layers: [
        base_osm
      ],
      center: this._centerCoords,
      zoomControl: false,
      zoom:8,
    }
  }
}
