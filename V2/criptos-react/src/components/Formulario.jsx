import { useEffect, useState } from 'react'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas.js'
import Error from './Error'
import styled from '@emotion/styled'

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;
    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Formulario = () => {
  const [ error, setError ] = useState(false)
  const [ criptos, setCriptos ] = useState()
  const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu Moneda', monedas)
  const [ criptoMoneda, SelectCriptoMonedas ] = useSelectMonedas('Elige tu Criptomoneda', criptos)
  
  useEffect(() => {
    const consultarAPI = async () => {
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"

      const respuesta = await fetch(url);
      const resultado = await respuesta.json()
      const arrayCriptos = resultado.Data.map(cripto => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName
        }

        return objeto
      })
      console.log("arrayCriptos:", arrayCriptos)
      setCriptos(arrayCriptos)
    }

    consultarAPI();
  }, [])

  const handleSubmit = e => {
    e.preventDefault();

    if([moneda, criptoMoneda].includes('')){
      setError(true);
      return;
    }

    setError(false);
  }

  return (
    <>
      {error && <Error>Todos los campos son requeridos</Error>}
      <form
        onSubmit={handleSubmit}
      >
          <SelectMonedas />
          <SelectCriptoMonedas />

          <InputSubmit 
              type="submit"
              value="Cotizar"
          />
      </form>
    </>
  )
}

export default Formulario