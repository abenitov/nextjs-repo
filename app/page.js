import Image from 'next/image'
import {Container} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import Link from "next/link";

export default function Home() {
  return (
   <Container>
     <Grid2 container>
         <Grid2><span>Grid item</span></Grid2>
         <Grid2 item key={"linkPorp"}>
             <Link href={"/properties"}>ir a propiedades</Link>
         </Grid2>
         <Grid2 item key={"linkfunnel"}>
             <Link href={"/funnel"}>ir a funnel</Link>
         </Grid2>
     </Grid2>
   </Container>
  )
}
