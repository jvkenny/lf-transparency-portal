import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import TransparencyPortal from './components/TransparencyPortal'
import MapsPage from './components/MapsPage'
import FoiaCommonsPage from './pages/foia-commons'

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <TransparencyPortal />
            </motion.div>
          }
        />
        <Route path="/foia-commons" element={<FoiaCommonsPage />} />
        <Route
          path="/maps/*"
          element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <MapsPage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}
