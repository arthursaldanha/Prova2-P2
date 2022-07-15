import { ElementType } from 'react';
import { Header } from '../../components/Header';

import { Container, GeneralWrapper } from './styles';


export const withMenu = (WrappedComponent: ElementType) => {
  const Wrapper = (props: unknown) => {

    return (
        <GeneralWrapper>
          <Container>
            <Header />
            <WrappedComponent {...props} />
          </Container>
        </GeneralWrapper>
    );
  };

  return Wrapper;
};
