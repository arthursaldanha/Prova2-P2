import type { GetServerSideProps, NextPage } from 'next'
import { CustomerServices } from '../domain/customers/services/implementations/CustomerServices';
import { Customer } from '../domain/customers/types';
import { withMenu } from '../shared/layout/withHeader'
import { HomePresentation } from '../shared/presentation/Home'

interface HomePageProps {
   customers: Array<Customer>
}

const HomePage: NextPage<HomePageProps> = ({ customers }) => {
   return (
      <HomePresentation customers={customers} />
   )
}

export const getServerSideProps: GetServerSideProps = async context => {
   const customerServices = new CustomerServices();
   const customers = await customerServices.readCustomers();

   return {
      props: {
         customers,
      },
   };
};

export default withMenu(HomePage)
