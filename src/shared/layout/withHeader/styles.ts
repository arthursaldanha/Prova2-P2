import Div100vh from 'react-div-100vh';

import styled, { css } from 'styled-components';

export const GeneralWrapper = styled.div`
   min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Container = styled.div`
  ${({ theme }) => css`
      display: flex;
      flex-direction: column;
      flex: 1;
      
      @media (max-width: ${theme.breakpoints.md}) {
         padding-bottom: 60px;
      }
   `}
`;
