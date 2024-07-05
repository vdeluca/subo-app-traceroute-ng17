import { LatLng } from "leaflet"

export interface WaypointModel {
    name: string,
    order: number,
    warehouse: string,
    uuid: string,
    coords: LatLng
}


export interface RouteWaypointModel {
    LatLng:{lat: number, lng: number}, 
}

