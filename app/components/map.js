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
    const [showMap, setShowMap] = useState(!window.matchMedia('(max-width:600px)').matches);
    const [selectedMapToDisplay, setSelectedMapToDisplay] = useState("1"); // 1 or 2

    console.log("mapboxInit")


    const toggleMapVisibility = () => {
        if (window.matchMedia('(max-width:600px)').matches) {
            setShowMap(!showMap);
        }
    };

    console.log(showMap)
    return (
        <Grid2 container>
            {isMobile ?
                <Grid2 item xs={12}>
                    <Button variant="contained" sx={{color:"black"}} onClick={toggleMapVisibility}>
                        {showMap ? "Ocultar mapa" : "Mostrar mapa"}
                    </Button>
                </Grid2> : null
            }

            {showMap ?
                <Grid2 item xs={12} key={"selectMap"} sx={{marginTop:"15px"}}>

                    <FormControl>
                        <InputLabel id="select-label">Tipo de mapa</InputLabel>
                        <Select
                            labelId="select-label"
                            id="select"
                            value={selectedMapToDisplay}
                            onChange={(e) =>{
                                console.log(e.target.value)
                                setSelectedMapToDisplay(e.target.value)
                        }}
                        >
                            <MenuItem value={'1'}>Mapa 1</MenuItem>
                            <MenuItem value={'2'}>Mapa 2</MenuItem>
                        </Select>

                    </FormControl>
                </Grid2> : null }


                <Grid2 xs={12} md={12} item key={"linkfunnel"} sx={showMap && selectedMapToDisplay === "1" ? {
                    visibility: "visible",
                    position: "relative",
                    top: "0"
                } : {visibility: "hidden", position: "absolute", top: "-10000"}}>
                    <Mapbox version={1} allProperties={allProperties} getPropertiesByCoordenates={getPropertiesByCoordenates}/>
                </Grid2>

                <Grid2 xs={12} md={12} item key={"linkfunnel2"} sx={showMap && selectedMapToDisplay === "2" ? {
                    visibility: "visible",
                    position: "relative",
                    top: "0"
                } : {visibility: "hidden", position: "absolute", top: "-10000"}}>
                    <Mapbox version={2} allProperties={allProperties} getPropertiesByCoordenates={getPropertiesByCoordenates}/>
                </Grid2>


        </Grid2>
    )

}

