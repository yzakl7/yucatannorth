import { useRouter } from 'next/router';
import React from 'react'

export const PropertyDetails = () => {

    
  const { query } = useRouter()
  console.log({query});
  return (
    <div>PropertyDetails</div>
  )
}

export default PropertyDetails
