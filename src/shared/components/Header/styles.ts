import styled, { css } from "styled-components";

export const Wrapper = styled.header`
   ${({ theme }) => css`
      display: flex;
      align-items: center;
      min-height: 70px;
      width: 100%;
      padding: 0 16px;
      background-color: ${theme.colors.green};

      > nav {
         display: flex;
         align-items: center;
         gap: 16px;
         cursor: pointer;
      }
   `}
`;
