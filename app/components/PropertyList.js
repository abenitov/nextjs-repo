import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function PropertyList({ properties }) {
    return (
        <Grid container spacing={2}>
            {properties.map((property) => (
                <Grid item xs={12} sm={6} md={4} key={property.objectID}>
                    <Card>
                        <img src={property.photos[0]} alt={property.title} />
                        <CardContent>
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
                            <Typography variant="body2" color="text.secondary">
                                Availability: {property.availability}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default PropertyList;
