
import {Container, TextField} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

import PropertyList from "@/app/components/PropertyList";
import React from "react";
import Map from "@/app/components/map";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";


console.log("propertiesInit")
async function getData(searchParams) {


    const response = await fetch('https://beyond-ms-service-c5dsg6fesq-ew.a.run.app/properties/search', { body: JSON.stringify({
              keyword:  searchParams !== undefined && searchParams["search"] !== undefined ? searchParams["search"] : "",
    }), headers: { 'Content-Type': 'application/json' }, method: 'POST'});
    return await response.json();
}

const getPropertiesByCoordenates = async (coordinates) => {

}

const Home = async ({params, searchParams}) => {


    const data = await getData(searchParams);
    return (
            <Container sx={{margin: "0", padding:"5px", maxWidth:"none"}} >

                <Grid2 container fullWidth order={{ xs: 2, sm: 1 }} spacing={2}>
                    <Grid2 item xs={12} md={12} key={"linkPorp"} order={{xs: 1, md:2}}>

                        <Map allProperties={data.matches} getPropertiesByCoordenates={undefined}/>

                    </Grid2>
                    <Grid2 item xs={12} md={12} key={"linkfunnel4"} order={{xs: 2, md:1}}>
                        <PropertyList properties={data.matches}/>
                    </Grid2>
                </Grid2>

            </Container>
    );
};



export default Home;
