import { Routes, Route } from 'react-router-dom'
import { MainLayout } from '@layout/MainLayout'
import Home from './candidatos/pages/Home'

function App () {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
