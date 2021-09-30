import React from 'react'

import { Circle } from 'better-react-spinkit'

export default function Loading() {
  return (
    <center style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <div>
        <img
          src="https://logospng.org/download/whatsapp/logo-whatsapp-1024.png" 
          alt="Loading"
          style={{ marginBottom: 10 }}
          height={200}
        />

        <Circle color="#3CBC28" size={60} />
      </div>
    </center>
  )
}
