import type { GetServerSideProps, NextPage } from 'next'
import { RentServices } from '../domain/rent/services/implementations/RentServices'
import { Rent } from '../domain/rent/types'
import { withMenu } from '../shared/layout/withHeader'
import { CreateRentPresentation } from '../shared/presentation/RentBook'

interface CreateRentPageProps {
   rents: Array<Rent>
}

const RentBookPage: NextPage<CreateRentPageProps> = ({ rents }) => {
   return (
      <CreateRentPresentation rents={rents} />
   )
}

export const getServerSideProps: GetServerSideProps = async context => {
   const rentServices = new RentServices();
   const rents = await rentServices.readRents();

   return {
      props: {
         rents,
      },
   };
};

export default withMenu(RentBookPage)
