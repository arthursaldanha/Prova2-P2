import styled from "styled-components";

export const Wrapper = styled.div`
   padding: 16px;
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   gap: 16px;

   > header {
      width: 100%;
      display: flex;
      gap: 16px;

      > input {
         max-width: 100%;
         width: 400px;
      }
   }
`