import { Container, Typography } from "@mui/material";
export const Home = () => {
  return (
    <>
      <Container>
        <Typography variant="h5">Főoldal</Typography>
        <Typography variant="h6"> A feladat </Typography>
        <Typography variant="body1">
          A beadandóban olyan webes alkalmazást kell írnod, amelyben egy
          tanárnak lehetősége van egy feladatsort összeállítani, pl. óra vagy
          dolgozat céljából. A tanár létrehoz egy új feladatsort, majd a
          feladatbankban a feladatok között böngészve egy-egy feladatot hozzáad
          a szerkesztésre jelölt feladatsorhoz. A feladatok és a feladatsorok
          listázhatók, részleteik megtekinthetők, a feladatsorok szerkeszthetők.
          A feladatot React és Redux kombinációjával kell megoldanod, Redux
          esetében ajánlott a redux toolkit és akár az RTK Query használata.
          Mivel az alkalmazás több oldalból áll, a react-router használata
          javasolt. A feladatban adott a szerveroldali REST API, leírását
          lentebb olvashatjátok, ehhez kell igazodnia a kliensnek.
        </Typography>
      </Container>
    </>
  );
};
