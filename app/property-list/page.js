"use client"
import {
    Accordion, AccordionDetails,
    AccordionSummary,
    Container,
    FormControl,
    FormLabel, Hidden,
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
import NeighborhoodFilter from "@/app/components/NeighborhoodFilter";
import {DateField, esES, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import 'moment/locale/es'
const areas =
    [
        {
            "id": "ciutat-vella",
            "name": "Ciutat Vella",
            "neighborhoods": [
                {"id": "el-born", "name": "El Born"},
                {"id": "el-gotic", "name": "El Gòtic"},
            ]
        },
        {
            "id": "gracia",
            "name": "Gracia",
            "neighborhoods": [
                {"id": "el-camp-den-grassot-i-gracia-nova", "name": "El Camp d'en Grassot i Gràcia Nova"},
                {"id": "el-putxet-i-el-farro", "name": "El Putxet i el Farró"},
                {"id": "vila-de-gracia", "name": "Vila de Gràcia"},
            ]
        },
        {
            "id": "leixample",
            "name": "Leixample",
            "neighborhoods": [
                {"id": "antiga-esquerra-de-leixample", "name": "Antiga Esquerra de l'Eixample"},
                {"id": "la-dreta-de-leixample", "name": "La Dreta de l'Eixample"},
                {"id": "nova-esquerra-de-leixample", "name": "Nova Esquerra de l'Eixample"},
                {"id": "sagrada-familia", "name": "Sagrada Familia"},
            ]
        },
        {
            "id": "les-corts",
            "name": "Les Corts",
            "neighborhoods": [
                {"id": "pedralbes", "name": "Pedralbes"},
                {"id": "les-corts", "name": "Les Corts"},
            ]
        },
        {
            "id": "sant-marti",
            "name": "Sant Marti",
            "neighborhoods": [
                {"id": "22", "name": "22@ (Districte de la Innovació)"},
                {"id": "el-poblenou", "name": "El Poblenou"},
                {"id": "la-vila-olimpica-del-poblenou", "name": "La Vila Olímpica del Poblenou"},
            ]
        },
        {
            "id": "sants-montjuic",
            "name": "Sants Montjuic",
            "neighborhoods": [
                {"id": "la-bordeta", "name": "La Bordeta"},
                {"id": "poble-sec", "name": "Poble Sec"},
            ]
        },
        {
            "id": "san-gervasi",
            "name": "San Gervasi",
            "neighborhoods": [
                {"id": "sarria", "name": "Sarrià"},
                {"id": "galvany", "name": "Galvany"},
                {"id": "les-tres-torres", "name": "Les Tres Torres"},

            ]
        }
    ]

export default function PropertyListPage({params, searchParams}) {

    console.log(searchParams)

// Configura Axios con tu clave de API
    const axiosInstance = axios.create({
        baseURL: "https://beyond-ms-service-c5dsg6fesq-ew.a.run.app/properties",
     //   baseURL: "http://localhost:8080/properties",
        headers: {},
    });

    const [allProperties, setAllProperties] = React.useState([])
    const [filteredProperties, setFilteredProperties] = React.useState(undefined)
    const [searchText, setSearchText] = React.useState('');
    const [priceRange, setPriceRange] = React.useState([500, 10000]);
    const [areaRange, setAreaRange] = React.useState([0, 100]);
    const [minPersons, setMinPersons] = React.useState(1);
    const [searchFilters, setSearchFilters] = React.useState({});
    const [checkinDate,setCheckInDate] = React.useState()


    const formatPriceLabel = (value) => `$${value}`;

    const getAllProperties = (keyword, filter) => {

        axiosInstance.post('/search', {
            //      params: `query=` + searchParams !== undefined && searchParams["search"] !== undefined ? searchParams["search"] : "",
            keyword: keyword,
            ...filter

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
        let filters = {}
        let numericFilters = []
        let otherFilters = []
        Object.keys(obj).forEach(function (key) {
            if (key === "search") {
                setSearchText(obj[key])
            } else if( key==="checkIn"){
                filters["checkIn"] = obj[key]
            }else {
                if (key.startsWith("min")) {
                    //given the key convert to lowercase only the first letter
                    let ke = key.substring(3)
                    numericFilters.push((ke.charAt(0).toLowerCase() + ke.slice(1) + " >= " + obj[key]).trim())
                } else if (key.startsWith("max")) {
                    let ke = key.substring(3)
                    numericFilters.push((ke.charAt(0).toLowerCase() + ke.slice(1) + " <= " + obj[key]).trim())
                } else {
                    if(obj[key].length > 0){
                        otherFilters.push(key + "=" + obj[key])
                    }
                }
            }
        })
        if (numericFilters.length > 0) {
            filters["numericFilters"] = numericFilters
        }
        if (otherFilters.length > 0) {
            filters["filters"] = otherFilters
        }
        return filters
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
            <Container sx={{margin: "0", padding: "5px"}}>
                <Grid2 container fullWidth order={{xs: 2, sm: 1}} spacing={2}>
                    <Grid2 item xs={12} md={12} key={"searchBar"}>
                        <Grid2 container spacing={2} columns={12} sx={{padding:"10px"}}>
                            <Grid2 item xs={12} md={4}>
                                    <TextField classes={"TextSmallNormal"}
                                               label="Buscar por población, código postal..."
                                               variant="outlined" sx={{minWidth: {xs: "80%", md: "35%"}}}
                                               value={searchText} fullWidth={true}
                                               onChange={handleInputChange}
                                               onKeyPress={handleKeyPress}
                                    />
                            </Grid2>
                            <Hidden mdUp>
                                <Grid2 item xs={12} md={6} key={"search"}>

                                {/* Sección para dispositivos móviles (oculto en pantallas medianas y mayores) */}
                                <Accordion>
                                    <AccordionSummary>Otros filtros</AccordionSummary>
                                    <AccordionDetails>
                                        <Grid2 item xs={12} md={4}>
                                            <NeighborhoodFilter areas={areas} setSelectedZones={(zones)=> {
                                                setSearchFilters({...searchFilters, "location.areas": zones})
                                            }}/>
                                        </Grid2>
                                        <Grid2 item xs={12} md={4}>
                                            <LocalizationProvider localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
                                                                  dateAdapter={AdapterMoment} adapterLocale={"es-ES"}>
                                                <DateField
                                                    label="Fecha de entrada"
                                                    value={checkinDate}
                                                    onChange={(newValue) => {setCheckInDate(newValue); setSearchFilters({...searchFilters, "checkIn": newValue._d.getTime()/1000})}}
                                                />
                                            </LocalizationProvider>
                                        </Grid2>
                                        <Grid2 item xs={12} md={3}>
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
                                        <Grid2 item xs={12} md={3}>
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

                                        <Grid2 item xs={12} md={5}>

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
                                    </AccordionDetails>
                                </Accordion>
                                </Grid2>
                            </Hidden>

                            <Hidden smDown>
                            <Grid2 item xs={12} md={4}>
                                <NeighborhoodFilter areas={areas} setSelectedZones={(zones)=> {
                                    setSearchFilters({...searchFilters, "location.areas": zones})
                                }}/>
                            </Grid2>
                                <Grid2 item xs={12} md={4}>
                                    <LocalizationProvider localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
                                    dateAdapter={AdapterMoment} adapterLocale={"es-ES"}>
                                    <DateField
                                        label="Fecha de entrada"
                                        value={checkinDate}
                                        onChange={(newValue) => {setCheckInDate(newValue); setSearchFilters({...searchFilters, "checkIn": newValue._d.getTime()/1000})}}
                                    />
                                    </LocalizationProvider>
                                </Grid2>
                            <Grid2 item xs={12} md={3}>
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
                            <Grid2 item xs={12} md={3} sx={{marginLeft:"15px"}}>
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

                            <Grid2 item xs={12} md={5}>

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
                            </Hidden>
                            <Grid2 item xs={12} md={3} display={"flex"} alignItems={"center"}>
                                <IconButton onClick={handleSearch}>

                                    <SearchIcon/>
                                    <span className={"TextSmallNormal"}>
                                        Buscar
                                    </span>
                                </IconButton>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                    <Grid2 item xs={12} sm={12} md={3.5} key={"linkPorp"} order={{xs: 1, md: 2}}>

                        <Map allProperties={allProperties} getPropertiesByCoordenates={getPropertiesByCoordenates}/>

                    </Grid2>
                    <Grid2 item xs={12} sm={12} md={8.5} key={"linkfunnel4"} order={{xs: 2, md: 1}}  >
                        <PropertyList configAreas={areas}
                            properties={filteredProperties !== undefined ? filteredProperties : allProperties}/>
                    </Grid2>
                </Grid2>

            </Container>
        </ThemeProvider>
    )

}
