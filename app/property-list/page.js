
import {Container, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2"; // eslint-disable-line import/no-webpack-loader-syntax
import axios from "axios";
import PropertyList from "@/app/components/PropertyList";
import Mapbox from "@/app/components/mapbox";

export default async function PropertyListPage() {


    const getAllProperties = () => {

        const ALGOLIA_APP_ID = 'VUOWCCZNT1';
        const ALGOLIA_API_KEY = '40f1304cc89701e5055bde13fc0d4aa8';
        const INDEX_NAME = 'dev-es-properties'; // Reemplaza con el nombre de tu índice en Algolia

// URL de la API de Algolia
        const algoliaURL = `https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/${INDEX_NAME}/query`;

// Configura Axios con tu clave de API
        const axiosInstance = axios.create({
            baseURL: algoliaURL,
            headers: {
                'X-Algolia-API-Key': ALGOLIA_API_KEY,
                'X-Algolia-Application-Id': ALGOLIA_APP_ID,
            },
        });

        return new Promise((resolve, reject) => {

            axiosInstance.post('', {
                params: 'query=barcelona',
            }).then(
                (response) => {
                    console.log(response.data.hits);
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


        //Fetch all properties from algolia and return them


    }
    console.log("propertyList")

    const allProperties = await getAllProperties()

    return (
        <Container>
            <Grid2 container>
                <Grid2 item xs={12} key={"linkPorp"}>
                <Mapbox allProperties={allProperties}/>
                </Grid2>
                <Grid2 item xs={12} key={"linkfunnel4"}>
                    <h1>Listado de Propiedades</h1>
                    <PropertyList properties={allProperties}/>
                </Grid2>
            </Grid2>

        </Container>
    )

}
