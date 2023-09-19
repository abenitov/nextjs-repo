import Image from 'next/image'
import {Container} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function Home() {
  return (
   <Container>
     <Grid2 container>
         <Grid2><span>Grid item</span></Grid2>
     </Grid2>
   </Container>
  )
}
