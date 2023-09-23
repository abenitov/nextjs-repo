"use client"
import {Container, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import React, {useEffect} from "react";
import Grid2 from "@mui/material/Unstable_Grid2"; // eslint-disable-line import/no-webpack-loader-syntax
import axios from "axios";
import PropertyList from "@/app/components/PropertyList";
import Map from "@/app/components/map";
import Mapbox from "@/app/components/mapbox";

export default function PropertyListPage({params, searchParams}) {

    console.log(searchParams)

    const ALGOLIA_APP_ID = 'VUOWCCZNT1';
    const ALGOLIA_API_KEY = '40f1304cc89701e5055bde13fc0d4aa8';
    const INDEX_NAME = 'dev-es-properties'; // Reemplaza con el nombre de tu índice en Algolia

// URL de la API de Algolia
    const algoliaURL = `https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/${INDEX_NAME}`;

// Configura Axios con tu clave de API
    const axiosInstance = axios.create({
        baseURL: algoliaURL,
        headers: {
            'X-Algolia-API-Key': ALGOLIA_API_KEY,
            'X-Algolia-Application-Id': ALGOLIA_APP_ID,
        },
    });

    const [allProperties, setAllProperties] = React.useState([])
    const [filteredProperties, setFilteredProperties] = React.useState(undefined)

    const getAllProperties = () => {
        return new Promise((resolve, reject) => {

            axiosInstance.post('/query', {
                //      params: `query=` + searchParams !== undefined && searchParams["search"] !== undefined ? searchParams["search"] : "",
                      params: "query=",
            }).then(
                (response) => {
                    if (response.data.hits != undefined && response.data.hits.length > 0) {
                        resolve(response.data.hits)
                    } else {
                        resolve([])
                    }
                }
            ).catch(
                (error) => {
                    console.log(error);
                    reject(error)
                }
            );
        })
    }



    const getPropertiesByCoordenates = (coordinates) => {
        const ALGOLIA_APP_ID = 'VUOWCCZNT1';
        const ALGOLIA_API_KEY = '40f1304cc89701e5055bde13fc0d4aa8';
        const INDEX_NAME = 'dev-es-properties'; // Reemplaza con el nombre de tu índice en Algolia

// URL de la API de Algolia
        const algoliaURL = `https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/${INDEX_NAME}`;

// Configura Axios con tu clave de API
        const axiosInstance = axios.create({
            baseURL: algoliaURL,
            headers: {
                'X-Algolia-API-Key': ALGOLIA_API_KEY,
                'X-Algolia-Application-Id': ALGOLIA_APP_ID,
                'Content-Type': "application/json"
            },
        });
            axiosInstance.post('/query', {
                insidePolygon:[coordinates.flatMap((c) => [...c].reverse())]
            }).then(
                (response) => {
                    console.log(response.data)
                    if (response.data.hits != undefined && response.data.hits.length > 0) {
                        setFilteredProperties(response.data.hits)
                    } else {
                        setFilteredProperties([])
                    }
                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            );

    }

    useEffect(() => {
        console.log("propertyList")

        getAllProperties().then(
            (props) => {
                setAllProperties(props)
            }
        )
    },[])


    return (
        <Container sx={{margin: "auto", padding:"0", maxWidth:"1800px"}} >
            <Grid2 container order={{ xs: 2, sm: 1 }} spacing={2}>
                <Grid2 item xs={12} md={6} key={"linkPorp"} order={{xs: 1, md:2}}>
                    {allProperties.length > 0 ?
                    <Map allProperties={allProperties} getPropertiesByCoordenates={getPropertiesByCoordenates}/>
                        : null }
                </Grid2>
                <Grid2 item xs={12} md={6} key={"linkfunnel4"} order={{xs: 2, md:1}}>
                    <h1>Listado de Propiedades</h1>
                    <PropertyList properties={filteredProperties !== undefined ? filteredProperties : allProperties}/>
                </Grid2>
            </Grid2>

        </Container>
    )

}
