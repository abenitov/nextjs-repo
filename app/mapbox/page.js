"use client"
import mapboxgl from '!mapbox-gl';
import {useEffect, useRef, useState} from "react";
import {Container} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2"; // eslint-disable-line import/no-webpack-loader-syntax
import barrios from "../../public/Barrios de Barcelona.json";

export default function Mapbox() {

    mapboxgl.accessToken = 'pk.eyJ1IjoiYWJlbnZhbCIsImEiOiJjbG11ZjB4eW4wYm4yMnFwZTZ0amdnMDh4In0.wVexmtWxCEXkHq8jwBq7Sw';
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lat, setLng] = useState(41.390205);
    const [lng, setLat] = useState(2.154007);
    const [zoom, setZoom] = useState(11);
    const [selectedZoneCoordinates, setSelectedZoneCoordinates] = useState(null);

    console.log("mapboxInit")
    console.log(barrios)
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

        map.current.on('load', () => {
            //Iterate over barrios and add them to the map
            barrios.features.forEach(function (feature,index) {
                map.current.addSource("zone"+index, {
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
                    'id': "zone"+index,
                    'type': 'fill',
                    'source': "zone"+index,
                    'layout': {},
                    'paint': {
                        'fill-opacity': 0.3,
                        'fill-color': '#00e3ff',
                    }
                });
                map.current.on('click', "zone" + index, (e) => {
                    console.log("click")
                    setSelectedZoneCoordinates(feature.coordinates)
                });

                map.current.on('mouseenter', "zone" + index, () => {
                    map.current.getCanvas().style.cursor = 'pointer';
                });
                map.current.addLayer({
                    'id': "zone"+index+'-outline',
                    'type': 'line',
                    'source': "zone"+index,
                    'layout': {},
                    'paint': {
                        'line-color': '#172ab3',
                        'line-width': 1
                    }
                });

            });
        });
    });
    return (
        <Container>
            <Grid2 container>
                <Grid2 item xs={12} key={"linkPorp"}>
                    <h1>Mapbox</h1>
                </Grid2>
                { selectedZoneCoordinates !== null ?
                <Grid2 item xs={12} key={"coor"}>
                    <h1>Coordinates</h1>
                    <p>{JSON.stringify(selectedZoneCoordinates)}</p>
                </Grid2> : null}
                <Grid2 xs={12} md={12} item key={"linkfunnel"}>
                    <div>
                        <div ref={mapContainer} className="map-container"/>
                    </div>
                </Grid2>
                <Grid2 xs={12} md={12} item key={"linkfunnel2"}>
                </Grid2>
            </Grid2>

        </Container>
    )

}
