"use client"
import {
    Container,
    FormControl,
    FormLabel,
    InputLabel,
    MenuItem,
    Select,
    Slider,
    TextField,
    ThemeProvider
} from "@mui/material";
import React, {useEffect} from "react";
import Grid2 from "@mui/material/Unstable_Grid2"; // eslint-disable-line import/no-webpack-loader-syntax
import axios from "axios";
import PropertyList from "@/app/components/PropertyList";
import Map from "@/app/components/map";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import theme from '@/app/theme'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


export default function PropertyListPage({params, searchParams}) {

    console.log(searchParams)

// Configura Axios con tu clave de API
    const axiosInstance = axios.create({
        baseURL: "https://beyond-ms-service-c5dsg6fesq-ew.a.run.app/properties",
        headers: {},
    });

    const [allProperties, setAllProperties] = React.useState([])
    const [filteredProperties, setFilteredProperties] = React.useState(undefined)
    const [searchText, setSearchText] = React.useState('');
    const [priceRange, setPriceRange] = React.useState([500, 10000]);
    const [areaRange, setAreaRange] = React.useState([0, 100]);
    const [minPersons, setMinPersons] = React.useState(1);
    const [searchFilters, setSearchFilters] = React.useState({});


    const formatPriceLabel = (value) => `$${value}`;

    const getAllProperties = (keyword, filter) => {

        axiosInstance.post('/search', {
            //      params: `query=` + searchParams !== undefined && searchParams["search"] !== undefined ? searchParams["search"] : "",
            keyword: keyword,
            numericFilters: filter.length > 0 ? filter : undefined

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
            coordinates: coordinates.map((it) => [it[1], it[0]])
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

    const buildFilterFromObject = (obj) => {
        let filter = []
        Object.keys(obj).forEach(function (key) {
            if (key === "search") {
                setSearchText(obj[key])
            } else {
                if (key.startsWith("min")) {
                    //given the key convert to lowercase only the first letter
                    let ke = key.substring(3)
                    filter.push((ke.charAt(0).toLowerCase() + ke.slice(1) + " >= " + obj[key]).trim())
                } else if (key.startsWith("max")) {
                    let ke = key.substring(3)
                    filter.push((ke.charAt(0).toLowerCase() + ke.slice(1) + " <= " + obj[key]).trim())
                } else {
                    filter.push((key.charAt(0).toLowerCase() + key.slice(1) + " = " + obj[key]).trim())
                }
            }
        })
        return filter
    }

    useEffect(() => {
        console.log("propertyList")
        let keyword = searchParams !== undefined && searchParams["search"] !== undefined ? searchParams["search"] : ""
        let filters = buildFilterFromObject(searchParams)

        getAllProperties(keyword, filters)
    }, [])

    const handleSearch = () => {
        getAllProperties(searchText, buildFilterFromObject(searchFilters))
    };

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    console.log(searchFilters)
    return (
        <ThemeProvider theme={theme}>
            <Container sx={{margin: "0", padding: "5px", maxWidth: "none"}}>
                <Grid2 container fullWidth order={{xs: 2, sm: 1}} spacing={2}>
                    <Grid2 item xs={12} key={"searchBar"}>
                        <Grid2 container spacing={3}>
                            <Grid2 item xs={12}>
                                <div>
                                    <TextField classes={"TextSmallNormal"}
                                               label="Buscar por población, código postal..."
                                               variant="outlined" sx={{minWidth: {xs: "80%", md: "35%"}}}
                                               value={searchText}
                                               onChange={handleInputChange}
                                               onKeyPress={handleKeyPress}
                                    />
                                </div>
                            </Grid2>
                            <Grid2 item xs={12} md={4}>
                                <span className={"TextSmallNormal"}>
                                    Rango de precios&nbsp;
                                </span>
                                <span className={"TextSmallNormal"}>
                                    ({priceRange[0]} - {priceRange[1]})
                                </span>
                                <Slider
                                    value={priceRange}
                                    onChange={(event, newValue) => {setPriceRange(newValue);setSearchFilters({...searchFilters, "minprice.pricePerMonth": newValue[0], "maxprice.pricePerMonth": newValue[1]})}}
                                    valueLabelDisplay="auto"
                                    valueLabelFormat={formatPriceLabel}
                                    min={500}
                                    step={100}
                                    max={10000}
                                    aria-labelledby="price-range-slider"
                                />
                            </Grid2>
                            <Grid2 item xs={12} md={4}>
                                <span className={"TextSmallNormal"}>
                                    Metros cuadrados&nbsp;
                                </span>
                                <span className={"TextSmallNormal"}>
                                    ({areaRange[0]} - {areaRange[1]})
                                </span>
                                <Slider
                                    value={areaRange}
                                    onChange={(event, newValue) => {setAreaRange(newValue);setSearchFilters({...searchFilters, minSurface: newValue[0], maxSurface: newValue[1]})}}
                                    valueLabelDisplay="auto"
                                    min={30}
                                    step={10}
                                    max={300}
                                    aria-labelledby="area-range-slider"
                                />
                            </Grid2>

                            <Grid2 item xs={12} md={4}>

                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">  <span
                                        className={"TextSmallNormal"}>
                                    Número de personas
                                </span></FormLabel>
                                    <RadioGroup
                                        row onChange={(event, newValue) => {setMinPersons(newValue);setSearchFilters({...searchFilters, minCapacity: newValue})}}
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value="1" control={<Radio/>} label="+1"/>
                                        <FormControlLabel value="2" control={<Radio/>} label="+2"/>
                                        <FormControlLabel value="3" control={<Radio/>} label="+3"/>
                                        <FormControlLabel value="4" control={<Radio/>} label="+4"/>
                                        <FormControlLabel value="5" control={<Radio/>} label="+5"/>

                                    </RadioGroup>
                                </FormControl>
                            </Grid2>
                            <Grid2 item xs={12} md={12} display={"flex"} alignItems={"center"}>
                                <IconButton onClick={handleSearch}>
                                    <SearchIcon/>
                                </IconButton>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                    <Grid2 item xs={12} sm={12} md={3.5} key={"linkPorp"} order={{xs: 1, md: 2}}>

                        <Map allProperties={allProperties} getPropertiesByCoordenates={getPropertiesByCoordenates}/>

                    </Grid2>
                    <Grid2 item xs={12} sm={12} md={8.5} key={"linkfunnel4"} order={{xs: 2, md: 1}}  >
                        <PropertyList
                            properties={filteredProperties !== undefined ? filteredProperties : allProperties}/>
                    </Grid2>
                </Grid2>

            </Container>
        </ThemeProvider>
    )

}
