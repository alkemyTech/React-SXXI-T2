import React from 'react'
import { Title } from '../../Components/Title/Title'

export  function Error404() {
  return (
    <div className='page-404' >
        <Title title="Página no encontrada" className="title-404" />
        <br />
        <h2>Pero no te preocupes</h2>
        <br />
        <p>Todos cometemos errores</p>
        <p>y podemos solucionarlos</p>
    </div>
  )
}
