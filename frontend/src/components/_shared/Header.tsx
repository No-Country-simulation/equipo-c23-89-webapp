import { Button } from '@components/ui/button'
import { Link } from 'react-router-dom'
import navigation from './navigation.json'

export function Header () {
  return (
    <header className="fixed p-4 top-0 left-0 right-0 bg-accent">
      <div className="mx-52 flex items-center justify-between">
        <Link to="/">
          <img src="/logo.webp" alt="Logo ReclutaLent" className='w-[120px] object-contain'/>
        </Link>
        <nav className="flex items-center justify-center gap-4">
          <div className='flex gap-4'>
            {
              navigation.length > 0 && navigation.map(({ name, path, variant }, inx) => (
              <Link key={inx} to={path}>
                  <Button variant={variant as 'secondary' | 'default' | 'link' | 'destructive' | 'outline' | 'ghost' || 'default'}>{name}</Button>
              </Link>
              ))
            }
          </div>
        </nav>
      </div>
    </header>
  )
}
