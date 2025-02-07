import { Button } from '@components/ui/button'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons'
import useLocalStorage from '@/hooks/useLocalStorage'

export function Header () {
  const { removeValue } = useLocalStorage<{ email: string, role: string } | null>('user', null)
  const [menuOpen, setMenuOpen] = useState(false)
  const redirect = useNavigate()

  const sidebarEventClick = () => {
    setMenuOpen(!menuOpen)
  }

  const handleLogout = async () => {
    removeValue()
    redirect('/sign-in')
  }

  return (
    <>
      <header className="z-30 py-4 border-b-2 bg-accent border-accent">
        <div className="flex items-center justify-between mx-16">
          <div className="block md:hidden">
            <button onClick={sidebarEventClick} className="flex items-center justify-center">
              {menuOpen ? (
                <Cross1Icon className="w-6 h-6 mr-2" />
              ) : (
                <HamburgerMenuIcon className="w-6 h-6 mr-2" />
              )}
            </button>
          </div>
          <Link to="/">
            <img
              src="/logo.webp"
              alt="Logo ReclutaLent"
              className="w-[120px] object-contain"
            />
          </Link>
          <nav className="items-center justify-center hidden gap-4 md:flex">
            <ul className="flex gap-4 list-none">
              <li>
                <Button variant={'default'} onClick={handleLogout}>Cerrar sesión</Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}
