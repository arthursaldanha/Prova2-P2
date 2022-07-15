import type { NextPage } from 'next'
import { withMenu } from '../shared/layout/withHeader'

const RentBookPage: NextPage = () => {
   return (
      <div>Alocar livro</div>
   )
}

export default withMenu(RentBookPage)
