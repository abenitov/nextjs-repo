"use client"
import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import {useEffect, useRef, useState} from "react";

import barrios from "../../public/Barrios de Barcelona.json";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Button} from "@mui/material";


export default function Mapbox({version, allProperties, getPropertiesByCoordenates}) {

    mapboxgl.accessToken = 'pk.eyJ1IjoiYWJlbnZhbCIsImEiOiJjbG11ZjB4eW4wYm4yMnFwZTZ0amdnMDh4In0.wVexmtWxCEXkHq8jwBq7Sw';
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lat, setLng] = useState(41.390205);
    const [lng, setLat] = useState(2.154007);
    const [zoom, setZoom] = useState(12);


    console.log("mapboxInit")
    useEffect(() => {


        if (map.current) return; // initialize map only once

            initMap();







    },[]);

    const initMap = () => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

        map.current.on('load', () => {
            //Iterate over barrios and add them to the map

            if (allProperties != undefined && allProperties.length > 0) {

                //Iterate over hits and get location.lattitude and location.longitude to add them to the map
                allProperties.forEach(function (hit, index) {
                    console.log(hit.location.longitude + " " + hit.location.latitude)
                    new mapboxgl.Marker()
                        .setLngLat([hit.location.longitude, hit.location.latitude]).setPopup(new mapboxgl.Popup()
                        .setHTML(hit.description))
                        .addTo(map.current);
                })

            }
        });
    }

    const displayZones = () => {
        barrios.features.forEach(function (feature, index) {
            map.current.addSource("zone" + index, {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Polygon',
                        'coordinates': feature.coordinates
                    }

                }
            });
            map.current.addLayer({
                'id': "zone" + index,
                'type': 'fill',
                'source': "zone" + index,
                'layout': {},
                'paint': {
                    'fill-opacity': 0.3,
                    'fill-color': '#00e3ff',
                }
            });
            map.current.on('click', "zone" + index, (e) => {
                console.log("click")
                //Copy map.current.getSource("zone" + index)._data.geometry.coordinates[0] to coordinates
                var coordinates = [...map.current.getSource("zone" + index)._data.geometry.coordinates[0]]
                console.log(coordinates)
                getPropertiesByCoordenates(coordinates)
            });

            map.current.on('mouseenter', "zone" + index, () => {
                map.current.getCanvas().style.cursor = 'pointer';
            });
            map.current.addLayer({
                'id': "zone" + index + '-outline',
                'type': 'line',
                'source': "zone" + index,
                'layout': {},
                'paint': {
                    'line-color': '#172ab3',
                    'line-width': 1
                }
            });

        });
    }

    const drawZone = () => {
        const draw = new MapboxDraw({
            displayControlsDefault: false,
// Select which mapbox-gl-draw control buttons to add to the map.
            controls: {
                polygon: true,
                trash: true
            },
// Set mapbox-gl-draw to draw by default.
// The user does not have to click the polygon control button first.
            defaultMode: 'draw_polygon'
        });
        map.current.addControl(draw);

        map.current.on('draw.create', (e) => {
            var x = draw.getAll();
            var coordinates = x['features'][0]['geometry']['coordinates'][0]
            console.log(coordinates)
            getPropertiesByCoordenates(coordinates)
        })

        map.current.on('draw.delete', (e) => {
            var x = draw.getAll();
            var coordinates = x['features'][0]['geometry']['coordinates'][0]
            console.log(coordinates)
            getPropertiesByCoordenates(coordinates)
        })

        map.current.on('draw.update', (e) => {
            var x = draw.getAll();
            var coordinates = x['features'][0]['geometry']['coordinates'][0]
            console.log(coordinates)
            getPropertiesByCoordenates(coordinates)
        })

    }

    const resetMap = () => {
        map.current.remove()
        initMap()

    }

    return (
                <Grid2 container xs={12}>
                    <Grid2 item key={"button1"}>
                        <Button onClick={displayZones}>Buscar por zone</Button>
                        <Button onClick={drawZone}>Dibujar zona</Button>
                        <Button onClick={resetMap}>Limpiar mapa</Button>
                    </Grid2>
                    <Grid2 item key={"mapas"}  xs={12}>
                        <div>
                            <div ref={mapContainer} className="map-container"/>
                        </div>
                    </Grid2>
                </Grid2>

    )

}
