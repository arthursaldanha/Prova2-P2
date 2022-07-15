import Link from "next/link";

import { Wrapper } from "./styles";

export const Header: React.FC = () => {
   return (
      <Wrapper>
         <nav>
            <Link href="/">Página Inicial</Link>
            <Link href="/create-book">Cadastrar Livros</Link>
            <Link href="/rent-book">Alugar Livros</Link>
            <Link href="/about">Sobre o projeto</Link>
         </nav>
      </Wrapper>
   );
};
