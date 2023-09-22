import Image from 'next/image'
import {Container} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import Link from "next/link";

export default function Home() {
  return (
   <Container>
     <Grid2 container>
         <Grid2 item key={"linkPorp"}>
             <Link href={"/mapbox"}>Mapbox</Link>
         </Grid2>
         <Grid2 item key={"linkfunnel"}>
             <Link href={"/gmaps"}>gmaps</Link>
         </Grid2>
     </Grid2>
   </Container>
  )
}
