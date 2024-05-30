import {User} from '@clerk/nextjs/server'
import {UserButton} from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { ModeToggle } from '@/components/global/mode-toggle'


type Props = {
    user?: null | User
}

const Navigation = ({user}:User) => {
  return (
    <header className="p-4 flex items-center justify-between relative z-10">
      <aside className="flex gap-2 items-center">
        <Link
          href={'/agency'}
          className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary/80"
          transition-all="true"
        >
          Login
        </Link>
        <UserButton />
        <ModeToggle />
      </aside>
      <nav className="hidden mg:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <ul className="flex items-center justify-center gap-8">
            <li>
                <Link href={'#'}>Pricing</Link>
            </li>
            <li>
                <Link href={'#'}>About</Link>
            </li>
            <li>
                <Link href={'#'}>Documentation</Link>
            </li>
            <li>
                <Link href={'#'}>Features</Link>
            </li>
        </ul>
      </nav>
      <aside>
        <Image
          src={'./assets/kanklar-logo.svg'}
          alt={'Kanklar'}
          width={40}
          height={40}
        />
        <span className="text-xl font-bold">Kanklar</span>
      </aside>
    </header>
  )
}
export default Navigation