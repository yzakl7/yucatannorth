import { useRouter } from 'next/router'
import React from 'react'

export const Admin = () => {
  const { pathname } = useRouter()
  return (
    <div>{pathname}</div>
  )
}

export default Admin