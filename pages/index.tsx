import styled from "@emotion/styled";
import { useState } from "react"
import { EventsAndPromotions, Map, RelatedBrands } from "../components/layout";
import { Container, Image, Text } from "../components/ui";
import { getColor } from "../utils/theme";

const StyledHome = styled(Container)`
  flex: 1;
  padding: 64px;
  @media (max-width: 720px) {
    padding: 32px;
  }
  @media (max-width: 450px) {
    height: 250px;
    padding: 16px;
  }
  gap: 32px;
  .video-container {
    height: 500px;
    @media (max-width: 720px) {
      height: 350px;
    }
    @media (max-width: 450px) {
      height: 250px;
    }
  }
  h2 {
    font-weight: 700;
    text-align: center;
    font-size: 36px;
    line-height: 54px;
    @media (max-width: 720px) {
      line-height: 34px;
      font-size: 24px;
    }
    span {
      color: ${getColor('primary')};
    }
  }

`

const Home = () => {
  return (
    <StyledHome>
      <EventsAndPromotions />
      <Text textType="h2">
        <span>C</span>ontamos con personal con <span>conocimiento técnico y mecánico</span> sobre el funcionamiento del motor.
      </Text>
      <Container className="video-container">
        <iframe height={'100%'} src="https://www.youtube.com/embed/0rYk5B8pMQg" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </Container>
      <RelatedBrands />
      <Text textType="h2">
        <span>C</span>ontamos con servicio a <span>domicilio.</span>
      </Text>
      <Container className="video-container">
        <iframe height={'100%'} src="https://www.youtube.com/embed/U4Lc_3CEmOA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </Container>
      <Container>
        <Text textType="h2">
          <span>No</span> tenemos excusividad con ninguna marca
        </Text>
        <Text textType="h2">
          Te asesoramos con la <span>mejor opción </span>para tu motor.
        </Text>
      </Container>
      <Map />
    </StyledHome>
  )
}

export default Home