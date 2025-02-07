import { Button } from '@components/ui/button'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { PopoverComponent } from '@components/ui/popover'
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons'
import navigation from './navigation.json'
import useLocalStorage from '@/hooks/useLocalStorage'

export function Header () {
  const [menuOpen, setMenuOpen] = useState(false)
  const { storedValue, removeValue } = useLocalStorage<{ email: string, role: string } | null>('user', null)
  const navigate = useLocation()
  const redirect = useNavigate()

  const navItems = [
    { path: '/sign-in', label: 'Iniciar Sesión' },
    { path: '/sign-up', label: 'Registrarse' }
  ]

  const sidebarEventClick = () => {
    setMenuOpen(!menuOpen)
  }

  const getRol = () => {
    if (!storedValue) return null

    return storedValue.role
  }

  const signOut = () => {
    removeValue()
    redirect('/sign-in')
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-30 p-4 border-b-2 bg-accent border-secondary">
        <div className="flex items-center justify-between mx-0 xl:mx-52">
          <div className="block md:hidden">
            <button onClick={sidebarEventClick} className='flex items-center justify-center'>
            {menuOpen
              ? (
                  <Cross1Icon className="w-6 h-6 mr-2" />
                )
              : (
                  <HamburgerMenuIcon className="w-6 h-6 mr-2" />
                )}

            </button>
          </div>
          <Link to="/">
            <img src="/logo.webp" alt="Logo ReclutaLent" className='w-[120px] object-contain'/>
          </Link>
          <nav className="items-center justify-center hidden gap-4 md:flex">
            {
              getRol() === 'candidate' &&
                <>
                  {/* <Link to='/'>
                    <Button variant={navigate.pathname === '/' ? 'default' : 'secondary'}>Inicio</Button>
                  </Link>
                  <Link to='/empleos'>
                    <Button variant={navigate.pathname === '/empleos' ? 'default' : 'secondary'}>Empleos</Button>
                  </Link> */}
                </>
            }

            {
              getRol() === null
                ? navigation.map(({ name, path, variant }, inx) => (
                    <Link key={inx} to={path}>
                      <Button variant={variant as 'secondary' | 'default' | 'link' | 'destructive' | 'outline' | 'ghost' || 'default'}>{name}</Button>
                    </Link>
                ))
                : (
                    <Button variant={'default'} onClick={signOut}>Cerrar sesión</Button>
                  )
            }
          </nav>

          <PopoverComponent

          className="block md:hidden"
          trigger={<Button variant="outline" size="sm">Empezar</Button>}
          content={
            <nav>
              <ul className="w-40 space-y-2 list-none">
                {navItems.map((item) => (
                  <li key={item.path} className="hover:bg-primary hover:text-primary-foreground">
                    <Link to={item.path}>
                      <p>{item.label}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          }/>
        </div>
      </header>
      <div className={`absolute top-[64px] left-0 right-0 bottom-0 z-20 transition-transform duration-300 ${
        menuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="h-full p-6 bg-secondary">
            {/* Contenido del sidebar */}
          </div>
      </div>
    </>
  )
}
