import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../shared/styles/global'
import theme from '../shared/styles/theme'
import { ChakraProvider } from '@chakra-ui/react'
function MyApp({ Component, pageProps }: AppProps) {
   return (
      <ChakraProvider>
         <ThemeProvider theme={theme}>
            <Component {...pageProps} />
            <GlobalStyle />
         </ThemeProvider>
      </ChakraProvider>
   )

}

export default MyApp
