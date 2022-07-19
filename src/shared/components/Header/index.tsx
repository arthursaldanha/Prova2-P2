import Image from "next/image";
import Link from "next/link";

import { Wrapper } from "./styles";

export const Header: React.FC = () => {
   return (
      <Wrapper>
         <Image
            src={'/images/logo.png'}
            alt="Logo Rent Books"
            width={110}
            height={50}
         />
         <nav>
            <Link href="/">Página Inicial</Link>
            <Link href="/create-book">Cadastrar Livros</Link>
            <Link href="/rent-book">Alugar Livros</Link>
         </nav>
      </Wrapper>
   );
};
