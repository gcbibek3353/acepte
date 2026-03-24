import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const HeaderComponent = ({redirectLink} : {redirectLink: string}) => {
  return (
    <div className="flex justify-between items-center">
        <Link href={redirectLink}>
            <Button>
                Create Question
            </Button>
        </Link>

    </div>
  )
}

export default HeaderComponent