import { Navigate } from 'react-router-dom'

export default function RequireAdmin({ children }) {
  const isAuthed = sessionStorage.getItem('sem-admin-auth') === 'true'
  if (!isAuthed) return <Navigate to="/admin" replace />
  return children
}
