import { tileLayer} from 'leaflet';

/**
* Capa base Open Street Map
*/
export const base_osm = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  minZoom: 3,
  attribution: '&copy; <a href="https://www.munigis.com.ar/">OSM - Munigis</a>'
});

/**
* Capa Argenmap IGN
*/
export const argenmap = tileLayer('https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png',
{
  maxZoom: 18,
  minZoom: 3,
  attribution: '&copy; <a href="https://www.munigis.com.ar/">OSM - Munigis</a>'
});

/**
* Capa base Google Maps Satellite
*/
export const googleSat = tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3'],
  attribution: '&copy; <a href="https://www.munigis.com.ar/">Google</a>'
});
