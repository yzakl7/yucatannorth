import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export const Admin = () => {
  const { push } = useRouter()
  useEffect(() => {
    push('/admin/settings')
  }, [push])
    
  return (
    <></>
  )
}

export default Admin