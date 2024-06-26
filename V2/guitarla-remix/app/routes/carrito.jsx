import { useOutletContext } from '@remix-run/react'
import styles from "~/styles/carrito.css"

export function links(){
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

export function meta(){
  return {
    title: 'GuitarLA - Carrito de Compras',
    description: 'Venta de guitarras, música, blog, carrito de compras, tienda'
  }
}

export default function Carrito() {
  const { carrito } = useOutletContext();

  return (
    <main className="contenedor">
      <h1 className="heading">
        Carrito de Compras

        <div className="contenido">
          <div className='carrito'>
            <h2>Artículos</h2>

            {carrito.length === 0 ? 'Carrito Vacío' : (
              carrito.map(producto => (
                <div key={producto.id} className='producto'>
                  <div>
                    <img src={producto.imagen} alt={`Imagen del producto ${producto.nombre}`} />
                  </div>
                  <div>
                    <p className='nombre'>{producto.nombre}</p>
                    <p>Cantidad:</p>

                    <select 
                      value={producto.cantidad}
                      className='select'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>

                    <p className='precio'><span>{producto.precio}</span></p>
                    <p className='subtotal'>Subtotal: $ <span>{producto.cantidad * producto.precio}</span></p>
                  </div>                  
                </div>
              ))
            )}
          </div>
        </div>

        <aside className="resumen">
          <h3>Resumen del Pedido</h3>
          <p>Total a pagar: $</p>
        </aside>
      </h1>
    </main>
  )
}
