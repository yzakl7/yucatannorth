// import styled from '@emotion/styled'
// import { useRouter } from 'next/router'
// import React, { useEffect, useState } from 'react'
// import { Button, Select, TextInput } from '../../../components/inputs'
// import { Container, Text } from '../../../components/ui'
// import { hooks, sparePartsOperations, sparePartsSelectors } from '../../../state'
// import { getColor } from '../../../utils/theme'

// const StyledAddSparePart = styled(Container)`
//   .title {
//     align-items: center;
//     padding: 16px;
//     flex-direction: row;
//     justify-content: space-between;
//   }
//   .body {
//     align-items: flex-start;
//     flex-direction: row;
//     flex: 1;
//     gap: 32px;
//     padding: 16px;
//     .left-container {
//       flex: 1;
//       max-width: 350px;
//       .text-input {
//         background: ${getColor('secondary')};
//         padding: 8px;
//         input {
//         }
//       }
//     }
//     .right-container {
//       flex-direction: row;
//       gap: 16px;
//       flex: 1; 
//       align-items: flex-start;
//       flex-wrap: wrap;
//       .select-container {
//         flex: 1;
//         max-width: 350px;
//         min-width: 200px;
//       }
//     }
//   }
// `


// export const AddSparePart = () => {
//   const { useAppDispatch, useAppSelector } = hooks
//   const { updateSparePartItem, getSparePartItem } = sparePartsOperations
//   const { selectSpareParts } = sparePartsSelectors
//   const [ name, setName ] = useState('')
//   const [ similars, setSimilars ] = useState('')
//   const [ sku, setSku ] = useState('')
//   const [ description, setDescription ] = useState('')
//   const [ filters, setFilters ] = useState<Record<string, string>>()
//   const { sparePartItem } = useAppSelector(selectSpareParts)

//   const [years, setYears] = useState([])
//   const { push, query: { sparePartId: id } } = useRouter()
  
//   const dispatch = useAppDispatch()

//   const onUpdateSparePart = () => {
//     const sparePartDetails = {
//       id,
//       name,
//       sku,
//       description,
//       filters,
//       years,
//       similars,
//     }
//     const callback = () => push('./')
//     dispatch(updateSparePartItem({params: sparePartDetails, callback}))
//   }
//   useEffect(() => {
//     if (sparePartItem) {
//       setName(sparePartItem.name)
//       setSku(sparePartItem.sku || sparePartItem.id)
//       setDescription(sparePartItem.description)
//       setFilters(sparePartItem.filters)
//       setYears(sparePartItem.years)
//       setSimilars(sparePartItem.similars)
//     }
//     console.log({sparePartItem});

//   }, [sparePartItem])

//   useEffect(() => {
//     dispatch(getSparePartItem({id}))
//   }, [])
  
//   return (
//     <StyledAddSparePart>
//       <Container className='title'> 
//         <Text textType='h3'>
//           Editar refacción
//         </Text>
//         <Container direction='row'>
//           <Button buttonStyle='primaryReverse' action={() => push('./')}>
//             <Text textType='p'>
//               Ver lsta de refacciónes
//             </Text>
//           </Button>
//           <Button buttonStyle='primaryReverse' action={onUpdateSparePart}>
//             <Text textType='p'>
//               Guardar
//             </Text>
//           </Button>
//         </Container>
//       </Container>
//       <Container className='body'>
//         <Container className='left-container'>
//           <Container className='text-input'>
//             <Text textType='p'>Nombre</Text>
//             <TextInput value={name} onChange={(e) => setName(e.value)} />
//           </Container>
//           <Container className='text-input'>
//             <Text textType='p'>Clave del producto</Text>
//             <TextInput placeholder='Dejar vacío para generacion automática' value={sku} onChange={(e) => setSku(e.value)} />
//           </Container>
//           <Container className='text-input'>
//             <Text textType='p'>Descripción</Text>
//             <TextInput multiline='15' value={description} onChange={(e) => setDescription(e.value)} />
//           </Container>
//           <Container className='text-input'>
//             <Text textType='p'>Similares</Text>
//             <TextInput multiline='15' value={similars} onChange={(e) => setSimilars(e.value)} />
//           </Container>
//         </Container>
//         <Container className='right-container'>
//           {
//             filterValues?.map(({key, label, options}:any) => {
//               console.log({filters});
//               return (
//                 <Container key={key} className='select-container'>
//                   <Text textType='p'>{label}</Text>
//                   <Select
//                     value={filters && (filters as any)[key]}
//                     options={options.map((value:any) => ({value, name: value}))}
//                     onChange={(value) => {
//                       console.log({options, value, key})
//                       setFilters({ ...filters, [key]: value })
//                     }}
//                   />
//                 </Container>
//               )}
//             )
//           }
          
//         </Container>
//       </Container>
//     </StyledAddSparePart>
//   )
// }

// export default AddSparePart



import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Select, TextInput } from '../../../components/inputs'
import { Filters } from '../../../components/layout'
import { Container, Text } from '../../../components/ui'
import { hooks, settingsSelectors, sparePartsOperations, sparePartsSelectors } from '../../../state'
import { getColor } from '../../../utils/theme'

const StyledAddSparePart = styled(Container)`
  flex: 1;
  .title {
    align-items: center;
    padding: 16px;
    flex-direction: row;
    justify-content: space-between;
  }
  .body {
    align-items: flex-start;
    flex-direction: row;
    flex: 1;
    gap: 32px;
    max-width: 1024px;
    padding: 16px;
    .left-container {
      flex: 1;
      max-width: 350px;
      .text-input {
        background: ${getColor('secondary')};
        padding: 8px;
        .years-container {
          .text-input {
            width: 50%;
          }
          input {
            min-width: 0px;
          }
        }
      }
    }
    .right-container {
      flex-direction: row;
      gap: 16px;
      flex: 1; 
      align-items: flex-start;
      flex-wrap: wrap;
      .select-container {
        flex: 1;
        max-width: 350px;
        min-width: 200px;
      }
    }
  }
`



export const AddSparePart = () => {
  const { useAppDispatch, useAppSelector } = hooks
  const { selectSettings } = settingsSelectors
  const { selectSpareParts } = sparePartsSelectors
  const { sparePartItem, isFetching } = useAppSelector(selectSpareParts)
  const { updateSparePartItem, getSparePartItem } = sparePartsOperations
  const { settings } = useAppSelector(selectSettings)
  
  const [ name, setName ] = useState('')
  const [ similars, setSimilars ] = useState('')
  const [ imageUrl, setImageUrl ] = useState('')
  const [ sku, setSku ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ filters, setFilters ] = useState({})
  const [years, setYears] = useState<string[]>([])
  const { push, query: { sparePartId: id } } = useRouter()
  
  const dispatch = useAppDispatch()

  const onUpdateSparePart = () => {
    const splitList = name.toLowerCase().split(' ')
      const indexedKeywords = []

      for (let i = 0; i < splitList.length; i++) {
        for (let j = 0; j < splitList[i].length; j++) {
          indexedKeywords.push(splitList[i].substring(0, j + 1))
        }
      
      }
    const sparePartDetails = {
      id,
      name,
      sku,
      description,
      years,
      similars,
      indexedKeywords,
      imageUrl,
      ...filters
    }

    const callback = () => push('./')
    dispatch(updateSparePartItem({params: { ...sparePartDetails }, callback}))
  }


  useEffect(() => {
    if (sparePartItem) {
      setName(sparePartItem.name || '')
      setSku(sparePartItem.sku || sparePartItem.id || '')
      setDescription(sparePartItem.description || '')
      setYears(sparePartItem.years || '')
      setSimilars(sparePartItem.similars || '')
      setImageUrl(sparePartItem.imageUrl || '')
      const newFilters = settings && Object.keys(settings.categories).reduce((acc:any,curr:any) => {
          if (curr === 'id') {
            return (acc)
          }
          return ({...acc, [curr]: sparePartItem[curr]})
        }, {})
        setFilters({...newFilters})
    }
  }, [sparePartItem])

  useEffect(() => {
    dispatch(getSparePartItem({id}))
  }, [])
  
  if (isFetching) {
    return <>Loading</>
  }
  
  return (
    <StyledAddSparePart>
      <Container className='title'> 
        <Text textType='h3'>
          Editar refacción
        </Text>
        <Container direction='row'>
          <Button buttonStyle='primaryReverse' action={onUpdateSparePart}>
            <Text textType='p'>
              Guardar
            </Text>
          </Button>
        </Container>
      </Container>
      <Container className='body'>
        <Container className='left-container'>
          <Container className='text-input'>
            <Text textType='p'>Nombre</Text>
            <TextInput value={name} onChange={({target: { value }}) => setName(value)} />
          </Container>
          <Container className='text-input'>
            <Text textType='p'>Años</Text>
            <Container className='years-container' direction='row'>
              <TextInput value={years[0]} onChange={({target: { value }}) => setYears([value, years[1] ])} />
              <TextInput value={years[1]} onChange={({target: { value }}) => setYears([years[0], value])} />
            </Container>
          </Container>
          <Container className='text-input'>
            <Text textType='p'>Clave del producto</Text>
            <TextInput placeholder='Dejar vacío para generacion automática' value={sku} onChange={({target: { value }}) => setSku(value)} />
          </Container>
          <Container className='text-input'>
            <Text textType='p'>ImageURL</Text>
            <TextInput value={imageUrl} onChange={({target: { value }}) => setImageUrl(value)} />
          </Container>
          <Container className='text-input'>
            <Text textType='p'>Descripción</Text>
            <TextInput multiline='15' value={description} onChange={(val) => setDescription(`${val}`)} />
          </Container>
          <Container className='text-input'>
            <Text textType='p'>Similares</Text>
            <TextInput multiline='15' value={similars} onChange={(val) => setSimilars(`${val}`)} />
          </Container>
        </Container>
        <Container className='right-container'>
          {Object.keys(filters).length ? <Filters noYear value={filters} onChange={(setFilters)} /> : <Text textType='p'>Cargando filtros...</Text>}
        </Container>
      </Container>
    </StyledAddSparePart>
  )
}

export default AddSparePart
