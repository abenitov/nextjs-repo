"use client"
import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import { useState} from "react";
import {Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, useMediaQuery} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2"; // eslint-disable-line import/no-webpack-loader-syntax

import Mapbox from "@/app/components/mapbox";

export default function Map({allProperties,getPropertiesByCoordenates}) {

    mapboxgl.accessToken = 'pk.eyJ1IjoiYWJlbnZhbCIsImEiOiJjbG11ZjB4eW4wYm4yMnFwZTZ0amdnMDh4In0.wVexmtWxCEXkHq8jwBq7Sw';

    const isMobile = useMediaQuery('(max-width:600px)');
    const [showMap, setShowMap] = useState(!useMediaQuery('(max-width:600px)'));

    console.log("mapboxInit")


    const toggleMapVisibility = () => {
        if (window.matchMedia('(max-width:600px)').matches) {
            setShowMap(!showMap);
        }
    };

    console.log(showMap)
    return (
        <Grid2 container>

                <Grid2 item xs={12} sx={{margin:"15px 0px"}}>
                    {isMobile ?  <Button variant="contained" sx={{color:"black",marginRight:"10px"}} onClick={toggleMapVisibility}>
                        {showMap ? "Ocultar mapa" : "Mostrar mapa"}
                    </Button>: null
                    }
                </Grid2>



                <Grid2 xs={12} md={12} item key={"linkfunnel"} sx={showMap ? {
                    visibility: "visible",
                    position: "relative",
                    top: "0"
                } : {visibility: "hidden", position: "absolute", top: "-10000"}}>
                    <Mapbox allProperties={allProperties} getPropertiesByCoordenates={getPropertiesByCoordenates}/>
                </Grid2>




        </Grid2>
    )

}

