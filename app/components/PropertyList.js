"use client";
import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Gallery from 'react-image-gallery';
import Image from 'next/image'
import superficie from '../../public/icons/icons8-superficie-48.png';
import doublebed from '../../public/icons/icons8-cama-48.png';
import singlebed from '../../public/icons/icons8-cama-individual-48.png';
import ocupacion from '../../public/icons/icons8-persona-en-casa-48.png';
import baños from '../../public/icons/icons8-bañera-48.png';
import Grid2 from "@mui/material/Unstable_Grid2";

function PropertyList({properties}) {
    return (
        <Grid container spacing={2}>
            {properties.map((property) => (
                <Grid item key={property.objectID} sx={{maxWidth: "400px"}}>
                    <Card sx={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e0e0e0",
                        borderRadius: "10px"
                    }}>
                        <Grid container spacing={1}>
                            {/* Primer Grid Item con la galería */}
                            <Grid item xs={12}>
                                <Gallery items={property.photos.map((photo, index) => ({
                                    original: photo,
                                    loading: "lazy",
                                    //add after the last slash "thumbnail/_" to get the thumbnail
                                    thumbnail: photo.substring(0, photo.lastIndexOf("/")) + "/thumbnails/" + photo.substring(photo.lastIndexOf("/") + 1),

                                }))} showThumbnails={false} style={{borderRadius: "13x"}}/>
                            </Grid>

                            {/* Segundo Grid Item con el contenido descriptivo */}
                            <Grid item xs={12} sx={{margin: "0px 0px 0px 15px"}}>


                                {/* Tercer Grid Item con el barrio y cuarto Grid Item con el precio y etiqueta */}
                                <Grid container spacing={1}>
                                    <Grid item xs={8}>
                                        <span className={"TextRegularNormal"}> {property.location.address}</span><br/>
                                        <span className={"TextTinyNormal"}>
                                            Sagrada Familia
                                        </span>

                                    </Grid>
                                    <Grid item xs={4}>

                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <span className={"TextLargeMedium"}>
                                                {property.price.pricePerMonth}€
                                            </span>
                                            <span className={"TextMediumNormal"}>
                                                /mes
                                            </span>

                                        </div>
                                    </Grid>
                                </Grid>

                                {/* Quinto Grid Item con la lista de iconos */}
                                <Grid container spacing={2} sx={{marginTop:"15px", paddingBottom:"15px",margiBottom:"0px", background:"#f3f7fc"}}>
                                    <Grid item >
                                        {/* Icono de superficie */}
                                        {/* Reemplaza el siguiente icono con el icono real de superficie */}
                                        <Grid container display={"flex"} alignItems={"center"}>
                                            <Grid item  display={"flex"} alignItems={"center"}>
                                                <div><Image src={superficie} alt={"squareMeters"} width={20}/></div>
                                            </Grid>
                                            <Grid item  display={"flex"} alignItems={"center"} sx={{marginLeft:"5px"}}>
                                                  <span className={"TextTinySemibold"}>
                                                    {property.surface} m²
                                                </span>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item >
                                        {/* Icono de número de habitaciones */}
                                        {/* Reemplaza el siguiente icono con el icono real de número de habitaciones */}
                                        <Grid container display={"flex"} alignItems={"center"}>
                                            <Grid item  display={"flex"} alignItems={"center"}>
                                                <div><Image src={singlebed} alt={"squareMeters"} width={20}/></div>
                                            </Grid>
                                            <Grid item  display={"flex"} alignItems={"center"} sx={{marginLeft:"5px"}}>
                                                  <span className={"TextTinySemibold"}>
                                                    {property.sleeping.singleBed != 1 ? property.sleeping.singleBed + " individuales" : property.sleeping.singleBed + " individual"}
                                                </span>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item >
                                        {/* Icono de número de habitaciones */}
                                        {/* Reemplaza el siguiente icono con el icono real de número de habitaciones */}
                                        <Grid container display={"flex"} alignItems={"center"}>
                                            <Grid item  display={"flex"} alignItems={"center"}>
                                                <div><Image src={doublebed} alt={"squareMeters"} width={20}/></div>
                                            </Grid>
                                            <Grid item  display={"flex"} alignItems={"center"} sx={{marginLeft:"5px"}}>
                                                  <span className={"TextTinySemibold"}>
                                                    {property.sleeping.doubleBed != 1 ? property.sleeping.doubleBed + " dobles" : property.sleeping.doubleBed + " doble"}
                                                </span>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        {/* Icono de ocupación máxima */}
                                        {/* Reemplaza el siguiente icono con el icono real de ocupación máxima */}
                                        <Grid container display={"flex"} alignItems={"center"}>
                                            <Grid item  display={"flex"} alignItems={"center"}>
                                                <div><Image src={baños} alt={"squareMeters"} width={20}/></div>
                                            </Grid>
                                            <Grid item  display={"flex"} alignItems={"center"} sx={{marginLeft:"5px"}}>
                                                  <span className={"TextTinySemibold"}>
                                                    {property.bathrooms != 1 ? property.bathrooms + " baños" : property.bathrooms + " baño"}
                                                </span>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default PropertyList;
