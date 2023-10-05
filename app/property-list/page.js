"use client"
import {Container, FormControl, InputLabel, MenuItem, Select, TextField, ThemeProvider} from "@mui/material";
import React, {useEffect} from "react";
import Grid2 from "@mui/material/Unstable_Grid2"; // eslint-disable-line import/no-webpack-loader-syntax
import axios from "axios";
import PropertyList from "@/app/components/PropertyList";
import Map from "@/app/components/map";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import theme from '@/app/theme'

export default function PropertyListPage({params, searchParams}) {

    console.log(searchParams)

// Configura Axios con tu clave de API
    const axiosInstance = axios.create({
        baseURL: "https://beyond-ms-service-c5dsg6fesq-ew.a.run.app/properties",
        headers: {

        },
    });

    const [allProperties, setAllProperties] = React.useState([])
    const [filteredProperties, setFilteredProperties] = React.useState(undefined)
    const [searchText, setSearchText] = React.useState('');

    const getAllProperties = (keyword) => {

            axiosInstance.post('/search', {
                //      params: `query=` + searchParams !== undefined && searchParams["search"] !== undefined ? searchParams["search"] : "",
                      keyword: keyword,
            }).then(
                (response) => {
                    if (response.data.matches != undefined && response.data.matches.length > 0) {
                        setAllProperties(response.data.matches)
                    } else {
                        setAllProperties([])
                    }
                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            );

    }



    const getPropertiesByCoordenates = (coordinates) => {


        //console.log(JSON.stringify(coordinates))
            axiosInstance.post('/search', {
                coordinates:coordinates.map( (it) => [it[1],it[0]])
            }).then(
                (response) => {
                    console.log(response.data)
                    if (response.data.matches != undefined && response.data.matches.length > 0) {
                        setFilteredProperties(response.data.matches)
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

        getAllProperties(searchParams !== undefined && searchParams["search"] !== undefined ? searchParams["search"] : "")
    },[])

    const handleSearch = () => {
        getAllProperties(searchText)
    };

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <ThemeProvider theme={theme}>
        <Container sx={{margin: "0", padding:"5px", maxWidth:"none"}} >
            <Grid2 container fullWidth order={{ xs: 2, sm: 1 }} spacing={2}>
                <Grid2 item xs={12} key={"searchBar"}>
                    <div>
                        <TextField
                            label="Buscar por población, código postal..."
                            variant="outlined" sx={{minWidth:{xs:"80%",md:"35%"}}}
                            value={searchText}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                        />
                        <IconButton onClick={handleSearch}>
                            <SearchIcon />
                        </IconButton>
                    </div>
                </Grid2>
                <Grid2 item xs={12} md={12} key={"linkPorp"} order={{xs: 1, md:2}}>

                    <Map allProperties={allProperties} getPropertiesByCoordenates={getPropertiesByCoordenates}/>

                </Grid2>
                <Grid2 item xs={12} md={12} key={"linkfunnel4"} order={{xs: 2, md:1}}>
                    <PropertyList properties={filteredProperties !== undefined ? filteredProperties : allProperties}/>
                </Grid2>
            </Grid2>

        </Container>
        </ThemeProvider>
    )

}
