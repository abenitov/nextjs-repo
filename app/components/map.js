"use client"
import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import { useState} from "react";
import {
    Button,
    Container,
    Fab,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    useMediaQuery
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2"; // eslint-disable-line import/no-webpack-loader-syntax

import Mapbox from "@/app/components/mapbox";

export default function Map({allProperties,getPropertiesByCoordenates}) {

    mapboxgl.accessToken = 'pk.eyJ1IjoiYWJlbnZhbCIsImEiOiJjbG11ZjB4eW4wYm4yMnFwZTZ0amdnMDh4In0.wVexmtWxCEXkHq8jwBq7Sw';

    const isMobile = useMediaQuery('(max-width:600px)');
    const [showMap, setShowMap] = useState(false);


    const toggleMapVisibility = () => {
        if (window.matchMedia('(max-width:600px)').matches) {
            setShowMap(!showMap);
        }
    };

    console.log(showMap)
    return (
        <Grid2 container sx={{width:"100%"}}>

                <Grid2 item xs={12} sx={{margin:"0px 0px"}}>
                    {isMobile ?  <Fab variant="extended"
                        color="white"  // Puedes cambiar el color según tus preferencias
                        aria-label="toggle-map"
                        sx={{
                            position: 'fixed',
                            bottom: '20px',
                            left: '50%',
                            color:"#FFFFFF",
                            backgroundColor:"#2a71f9 !important",
                            transform: 'translateX(-50%)',
                        }}
                        onClick={toggleMapVisibility}
                    >

                        <span style={{ marginLeft: '8px' }}>
        {showMap ? 'Ocultar mapa' : 'Mostrar mapa'}
      </span>
                    </Fab>: null
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

