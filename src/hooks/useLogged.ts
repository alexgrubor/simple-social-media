import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const useLogged = () => {
  const [logged, setLogged] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const userID = localStorage.getItem('userId')
    if (userID || location.pathname === '/' || location.pathname === '/login') {
      setLogged(true)
    } else {
      alert('You need to be logged in to access this page')
      navigate('/login')
    }
    setLoading(false)
  }, [location, navigate])

  return loading ? null : logged
}

export default useLogged