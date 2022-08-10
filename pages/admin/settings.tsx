import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, IconButton } from '../../components/inputs'
import { Container, Image, Text } from '../../components/ui'
import { hooks, settingsOperations, settingsSelectors } from '../../state'
import { BiImageAdd } from 'react-icons/bi'
import { getColor } from '../../utils/theme'
import { CategoryManager, ImportTool } from '../../components/layout'

const StyledSettings = styled(Container)`
  padding: 16px;
  flex: 1;
  .slider-section {
    input {
      display: none;
    }
    .slide-card {
      min-width: 240px;
      border: 1px ${getColor('border')} solid;
      border-radius: 5px;
      overflow: hidden;
      flex: 1;
      img {
        max-height: 250px;
        height: 100%;
        object-fit: cover;
      }
    }
    label.label-button {
      border: 1px ${getColor('border')} solid;
      border-radius: 5px;
      cursor: pointer;
      padding: 16px;
      p {
        text-align: center;
      }
    }
    label.upload-new-photo {
      width: 100px;
      text-align: center;
      border: 1px ${getColor('border')} solid;
      padding: 16px;
      border-radius: 5px;
      svg {
        font-size: 32px;
      }
    }
  }
`

export const Settings = () => {
  const { useAppDispatch, useAppSelector } = hooks
  const { selectSettings } = settingsSelectors
  const { getSlides, deleteSlide, uploadSlide, getSettings } = settingsOperations
  const [ selectedSlide, setSelectedSlide ] = useState('')
  const dispatch = useAppDispatch()
  const { slideList, isFetching } = useAppSelector(selectSettings)

  const onImageChange = (e:any) => {
    if (e.target.files[0]) {
      const slideNames = ['slide1.jpg', 'slide2.jpg', 'slide3.jpg']
      const current = slideList.map(({name}:{name:string}) => name);
      const slideName = slideNames.filter(e=>!current.includes(e))[0];
      const file = e.target.files[0]
      dispatch(uploadSlide({id: selectedSlide || slideName, file, preventDelete: !selectedSlide}))
      setSelectedSlide('')
    }
  }

  const silderSection = () => {
    return (
      <Container wrap='wrap' className='slider-section'>
        <Text textType='h4'>Portada</Text>
        <Container direction='row' flex='1' wrap='wrap'>
          { slideList.map(({ url:src, name }:{ url: string, name:string }) => (
            <>
              <Container className='slide-card' key={src}>
                <Image alt={src} src={src} />
                <Container direction='row' gap='16px' justify='space-between' padding='16px;'>
                  <label className='label-button' onClick={() => setSelectedSlide(name)} htmlFor='upload-photo' >
                    <Text textType='p'>Cambiar imagen</Text>
                  </label>
                  <label className='label-button' onClick={() => dispatch(deleteSlide(name))}>
                    <Text textType='p'>Eliminar imagen</Text>
                  </label>
                </Container>
              </Container>
            </>

          )).sort((a:any, b:any) => {
              if (a.name > b.name) {
                  return -1;
              }
              if (b.name > a.name) {
                  return 1;
              }
              return 0;
          }) }
          {
            slideList.length < 3
            && (
              <label htmlFor='upload-photo' className='upload-new-photo'>
                <Container className='add-button' justify='flex-end' align='center'>
                  <BiImageAdd />
                  <Text textType='p'>Agregar diapositiva</Text>
                </Container>
              </label>
            )
          }
          <input accept="image/jpeg" type="file" name="upload-photo" id="upload-photo" onChange={onImageChange}/>
        </Container>
      </Container>
    )
  }

  useEffect(() => {
    dispatch(getSlides())
    dispatch(getSettings())
  }, [dispatch])

  if (isFetching) {
    return <Text textType='h3'>Loading</Text>
  }

  return (
    <StyledSettings>
      { silderSection() }
      <CategoryManager />
    </StyledSettings>
  )
}

export default Settings