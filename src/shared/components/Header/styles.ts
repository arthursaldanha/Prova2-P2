import Link from "next/link";
import styled, { css } from "styled-components";

export const Wrapper = styled.header`
   ${({ theme }) => css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 70px;
      width: 100%;
      padding: 0 16px;
      background-color: ${theme.colors.purple};

      > nav {
         display: flex;
         align-items: center;
         gap: 16px;
         cursor: pointer;
      
         > a {
            color: ${theme.colors.white};
            transition: all 0.3s ease;

            &:hover {
               color: ${theme.colors.beige};
            }
         }
      }
   `}
`;
