import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Gallery from 'react-image-gallery';
import Image from 'next/image'
import superficie from '../../public/icons/icons8-superficie-48.png';
import habitaciones from '../../public/icons/icons8-cama-48.png';
import ocupacion from '../../public/icons/icons8-persona-en-casa-48.png';
import baños from '../../public/icons/icons8-bañera-48.png';
import Grid2 from "@mui/material/Unstable_Grid2";

function PropertyList({properties}) {
    return (
        <Grid container spacing={2}>
            {properties.map((property) => (
                <Grid item key={property.objectID} sx={{maxWidth: "420px"}}>
                    <Card sx={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e0e0e0",
                        borderRadius: "16px"
                    }}>
                        <Grid container spacing={2}>
                            {/* Primer Grid Item con la galería */}
                            <Grid item xs={12}>
                                <Gallery items={property.photos.map((photo, index) => ({
                                    original: photo,
                                }))} showThumbnails={false} style={{borderRadius: "16px"}}/>
                            </Grid>

                            {/* Segundo Grid Item con el contenido descriptivo */}
                            <Grid item xs={12} sx={{margin: "5px 0px 0px 15px"}}>

                                <Typography variant="h5" component="div">
                                    {property.title}
                                </Typography>


                                {/* Tercer Grid Item con el barrio y cuarto Grid Item con el precio y etiqueta */}
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="body" color="text.secondary">
                                            Sagrada Familia
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>

                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <Typography variant="h5" color="text.secondary">
                                                {property.price.pricePerMonth}€/mes
                                            </Typography>

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
                                                <Typography variant="body2" color="text.secondary"  style={{ fontWeight: 'bold' }}>
                                                    {property.surface} m²
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item >
                                        {/* Icono de número de habitaciones */}
                                        {/* Reemplaza el siguiente icono con el icono real de número de habitaciones */}
                                        <Grid container display={"flex"} alignItems={"center"}>
                                            <Grid item  display={"flex"} alignItems={"center"}>
                                                <div><Image src={habitaciones} alt={"squareMeters"} width={20}/></div>
                                            </Grid>
                                            <Grid item  display={"flex"} alignItems={"center"} sx={{marginLeft:"5px"}}>
                                                <Typography variant="body2" color="text.secondary"  style={{ fontWeight: 'bold' }}>
                                                    2 camas
                                                </Typography>
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
                                                <Typography variant="body2" color="text.secondary"  style={{ fontWeight: 'bold' }}>
                                                    {property.bathrooms > 1 ? property.bathrooms + " baños" : property.bathrooms + " baño"}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        {/* Icono de ocupación máxima */}
                                        {/* Reemplaza el siguiente icono con el icono real de ocupación máxima */}
                                        <Grid container display={"flex"} alignItems={"center"}>
                                            <Grid item  display={"flex"} alignItems={"center"}>
                                                <div><Image src={ocupacion} alt={"squareMeters"} width={20}/></div>
                                            </Grid>
                                            <Grid item display={"flex"} alignItems={"center"} sx={{marginLeft:"5px"}}>
                                                <Typography variant="body2" color="text.secondary"  style={{ fontWeight: 'bold' }}>
                                                    {property.peopleCapacity > 1 ? property.peopleCapacity + " personas" : property.peopleCapacity + " persona"}
                                                </Typography>
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
