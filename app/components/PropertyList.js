import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import  Gallery from 'react-image-gallery';

function PropertyList({ properties }) {
    return (
        <Grid container spacing={2}>
            {properties.map((property) => (
                <Grid item xs={12} key={property.objectID} >
                    <Card sx={{backgroundColor:"#ffffff", boxShadow:"rgba(0, 0, 0, 0.2) 0px 0px 6px"}}>
                        <div style={{ display: 'flex',backgroundColor:"transparent"}}>
                            <div style={{ flex: '1', padding: '0px' }}>
                                <Gallery items={property.photos.map((photo, index) => ({
                                    original: photo,
                                }))} showThumbnails={false} />
                            </div>
                            <div style={{ flex: '1', padding: '0px' ,backgroundColor:"transparent"}}>
                                <CardContent sx={{backgroundColor:"transparent"}}>
                                    <Typography variant="h5" component="div">
                                        {property.title}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {property.location.city}, {property.location.postalCode}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Price: {property.price.pricePerMonth}€/month
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Surface: {property.surface} sqm
                                    </Typography>
                                </CardContent>
                            </div>
                        </div>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default PropertyList;
