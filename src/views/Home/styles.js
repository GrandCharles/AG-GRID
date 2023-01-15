import styled from 'styled-components';
import px2vw from "../../styles/px2vw";

// Recebe uma div de styled
export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: ${px2vw(2)};
  max-width: 100%;
  overflow-y: hidden;

  @media (min-width: 1024px) {
    flex-wrap: wrap;
  }

  overflow-y: hidden; 
  position: relative;

`





