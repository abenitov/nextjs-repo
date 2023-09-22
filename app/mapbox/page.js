"use client"
import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import {useEffect, useRef, useState} from "react";
import {Container, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2"; // eslint-disable-line import/no-webpack-loader-syntax
import barrios from "../../public/Barrios de Barcelona.json";
import axios from "axios";
import PropertyList from "@/app/components/PropertyList";

export default function Mapbox() {

    mapboxgl.accessToken = 'pk.eyJ1IjoiYWJlbnZhbCIsImEiOiJjbG11ZjB4eW4wYm4yMnFwZTZ0amdnMDh4In0.wVexmtWxCEXkHq8jwBq7Sw';
    const mapContainer = useRef(null);
    const mapContainer2 = useRef(null);
    const map = useRef(null);
    const map2 = useRef(null);
    const [lat, setLng] = useState(41.390205);
    const [lng, setLat] = useState(2.154007);
    const [zoom, setZoom] = useState(12);
    const [selectedZoneCoordinates, setSelectedZoneCoordinates] = useState(null);
    const [selectedMapToDisplay, setSelectedMapToDisplay] = useState("1"); // 1 or 2
    const [allProperties, setAllProperties] = useState([]);



    const getAllProperties = () => {

        const ALGOLIA_APP_ID = 'VUOWCCZNT1';
        const ALGOLIA_API_KEY = '40f1304cc89701e5055bde13fc0d4aa8';
        const INDEX_NAME = 'dev-es-properties'; // Reemplaza con el nombre de tu índice en Algolia

// URL de la API de Algolia
        const algoliaURL = `https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/${INDEX_NAME}/query`;

// Configura Axios con tu clave de API
        const axiosInstance = axios.create({
            baseURL: algoliaURL,
            headers: {
                'X-Algolia-API-Key': ALGOLIA_API_KEY,
                'X-Algolia-Application-Id': ALGOLIA_APP_ID,
            },
        });

        axiosInstance.post('', {
            params: 'query=barcelona',
        }).then(
            (response) => {
                console.log(response.data.hits);
                if(response.data.hits != undefined && response.data.hits.length > 0){

                    setAllProperties(response.data.hits)
                    //Iterate over hits and get location.lattitude and location.longitude to add them to the map
                    response.data.hits.forEach(function (hit,index) {
                        console.log(hit.location.longitude + " " + hit.location.latitude)
                      new mapboxgl.Marker()
                            .setLngLat([hit.location.longitude, hit.location.latitude]).setPopup(new mapboxgl.Popup()
                          .setHTML(hit.description))
                            .addTo(map2.current);
                        new mapboxgl.Marker()
                            .setLngLat([hit.location.longitude, hit.location.latitude]).setPopup(new mapboxgl.Popup()
                            .setHTML(hit.description))
                            .addTo(map.current);
                    })

                }
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
        //Fetch all properties from algolia and return them


    }
    console.log("mapboxInit")
    useEffect(() => {


        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
        map2.current = new mapboxgl.Map({
            container: mapContainer2.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
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
        map2.current.addControl(draw);

        map2.current.on('draw.create',  (e) => {   var x=draw.getAll();
            setSelectedZoneCoordinates(x['features'][0]['geometry']['coordinates'][0]) })
        map2.current.on('draw.delete', (e) => {   var x=draw.getAll();
            setSelectedZoneCoordinates(x['features'][0]['geometry']['coordinates'][0]) })
        map2.current.on('draw.update', (e) => {   var x=draw.getAll();
            setSelectedZoneCoordinates(x['features'][0]['geometry']['coordinates'][0]) })

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


            getAllProperties();
        });
    });

    return (
        <Container>
            <Grid2 container>
                <Grid2 item xs={12} key={"linkPorp"}>

                </Grid2>
                <Grid2 item xs={12} key={"selectMap"}>

                    <FormControl>
                        <InputLabel id="select-label">Tipo de mapa</InputLabel>
                        <Select
                            labelId="select-label"
                            id="select"
                            value={selectedMapToDisplay}
                            onChange={(e) => setSelectedMapToDisplay(e.target.value)}
                        >
                            <MenuItem value={'1'}>Mapa 1</MenuItem>
                            <MenuItem value={'2'}>Mapa 2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid2>

                <Grid2 xs={12} md={12} item key={"linkfunnel"} sx={selectedMapToDisplay === "1" ? { visibility: "visible", position: "relative", top: "0" } :{ visibility: "hidden", position: "absolute", top: "-10000" }}>
                    <div>
                        <div  ref={mapContainer} className="map-container"/>
                    </div>
                </Grid2>
                <Grid2 xs={12} md={12} item key={"linkfunnel2"} sx={selectedMapToDisplay === "2" ? { visibility: "visible", position: "relative", top: "0" } :{ visibility: "hidden", position: "absolute", top: "-10000" }}>
                    <div>
                        <div  ref={mapContainer2} className="map-container"/>
                    </div>
                </Grid2>
                <Grid2 xs={12} md={12} item key={"linkfunnel3"}>
                </Grid2>
                { selectedZoneCoordinates !== null ?
                    <Grid2 item xs={12} key={"coor"}>
                        <h1>Coordenadas para filtrar resultados:</h1>
                        <p style={{fontSize:"0.5rem"}}>{JSON.stringify(selectedZoneCoordinates)}</p>
                    </Grid2> : null}
                <Grid2 item xs={12} key={"linkfunnel4"}>
                    <h1>Listado de Propiedades</h1>
                    <PropertyList properties={allProperties} />
                </Grid2>
            </Grid2>

        </Container>
    )

}
