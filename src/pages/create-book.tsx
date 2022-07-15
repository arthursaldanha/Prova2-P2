import type { NextPage } from 'next'
import { withMenu } from '../shared/layout/withHeader'

const CreateBookPage: NextPage = () => {
   return (
      <div>Create Book</div>
   )
}

export default withMenu(CreateBookPage)
