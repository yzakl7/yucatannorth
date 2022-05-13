import React, { ReactDOM, ReactNode, useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { BiBuildingHouse } from 'react-icons/bi'
import { v4 as uuid} from 'uuid';
import { FaPlaneArrival } from 'react-icons/fa'
import styled from '@emotion/styled'
import { deleteLandingPDF, uploadLandingPDF, deleteLandingCoverImage, getLandingPDF, getLandingCoverImage,  uploadLandingCoverImage } from '../components/api/firebaseAPI'
import { useRouter } from 'next/router'
import { Container, Form, Text } from '../components/ui'
import { IconButton } from '../components/inputs'
import { getColor } from '../utils/theme'

const StyledAdmin = styled(Container)`
  flex: 1;
  flex-direction: row;
  padding: 32px;
  overflow: hidden;
  .admin-container {
        overflow: auto;
    height: 100%;
  }
  .side-bar {
    gap: 16px;
    button {
      padding: 16px;
      border-radius: 10px;
      color: ${getColor('white')};
      background: ${getColor('primary')};
      height: 115px;
      flex-direction: column;
      gap: 8px;
      svg {
        font-size: 32px;
      }
    }
  }
  .table-header {
    position: sticky;
    top: 0;
    z-index: 1;
  }
  .table-row {
    padding: 16px 0;
    border-bottom: 1px solid ${getColor('border')};
    align-items: center;
    &:hover {
      background: ${getColor('secondary')};
    }
  }
  span {
    background: ${getColor('primary')};
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${getColor('white')};
    border-radius: 5px;
  }
  .landing-cover-image-upload {
    .thumbnail {
      flex-direction: row;
      align-items: center;
      cursor: pointer;
      button {
        background: transparent;
      }
      svg {
        font-size: 24px;
        color: ${getColor('danger')};
      }
    }
    border: 2px solid ${getColor('primary')};
    border-radius: 5px;
  }
`

type AdminProps = {
  properties: [],
  callModal: (component:ReactNode) => void,
  dismissModal: () => void,
  getStnapshot: any
}

const placeholder = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1YSorRgk8e3DAzR_3mdn0g8CVqh2wWW8VboqStXygmfoAIYly8nJ0G-M4U5k6yrB_-tQ&usqp=CAU"


const Admin = ({properties, getStnapshot}: AdminProps) => {
  const { push } = useRouter()
  const [coverImageIsFetching, setCoverImageIsFetching] = useState(false)
  const [PDFIsFetching, setPDFIsFetching] = useState(false)

  const [landingCoverImageState, setlandingCoverImageState] = useState<string>()
  const [landingPDFState, setlandingPDFState] = useState<string>()

  const [selectedTab, setSelectedTab] = useState('properties')


  const getCurrentLandingCoverImage = async () => {
    const landingImage = await getLandingCoverImage()
    const landingPDF = await getLandingPDF()
    setlandingCoverImageState(landingImage)
    setlandingPDFState(landingPDF)
  }

  const onPropertySelect = (property?:{id: string}) => {
    push(`/properties/edit/${property ? property.id : uuid()}`)
  }

  const renderTable = () => {
    return properties.map((property)=> {
      const {
        name,
        id,
        type,
        category,
        group,
        area,
        price
      } = property
      return (
        <Container minWidth='100%' gap="0" onClick={() => onPropertySelect(property)} className='table-row' key={Math.random()} direction='row'>
          <Container flex="2">
            <Text textType='p'>{name}</Text>
          </Container>
          <Container align="center" flex="1">
            <Text textType='p'>{type}</Text>
          </Container>
          <Container align="center" flex="1">
            <Text textType='p'>{category}</Text>
          </Container>
          <Container align="center" flex="1">
            <Text textType='p'>{price}</Text>
          </Container>
          <Container align="center" flex="1">
            <Text textType='p'>{area}</Text>
            <Text textType='p'>{group}</Text>
          </Container>
        </Container>
      )
    })
  }

  const renderTableHeader = () => {
    return  (
      <Container minWidth='100%' direction='row' className='table-header'>
        <Container flex="2">
          <Text textType='span'>NOMBRE</Text>
        </Container>
        <Container flex="1">
          <Text textType='span'>TIPO</Text>
        </Container>
        <Container flex="1">
          <Text textType='span'>CATEGORÍA</Text>
        </Container>
        <Container flex="1">
          <Text textType='span'>PRECIO</Text>
        </Container>
        <Container flex="1">
          <Text textType='span'>UBICACIÓN</Text>
        </Container>
      </Container>
    )
  }

  const onLandingCoverImageDelete = async () => {
    setCoverImageIsFetching(true)
    try {
      const res = await deleteLandingCoverImage("landing-page", 'cover.jpg')
      await getStnapshot()
      setlandingCoverImageState(undefined)
      return res
    } catch(err) {
      throw(err)
    } finally {
      setCoverImageIsFetching(false)
    }
  }

  const onLandingCoverImageUpload = (e:any) => {
    const fileList = e.target.files
    const doUpload = async (id:string, name:string, file:any) => {
      setCoverImageIsFetching(true)
      try {
        const response = await uploadLandingCoverImage(id, name, file)
        await getStnapshot()
        setlandingCoverImageState(response)
        return response
      } catch (err) {
        throw err
      } finally {
        setCoverImageIsFetching(false)
      }
    }
    for (let i = 0, numFiles = fileList.length; i < numFiles; i++) {
      const file = fileList[i];
      doUpload("landing-page", 'cover.jpg', file)
    }
  }

  const onLandingPDFDelete = async () => {
    setPDFIsFetching(true)
    try {
      const res = await deleteLandingPDF("landing-page", 'landing.pdf')
      await getStnapshot()
      setlandingPDFState(undefined)
      return res
    } catch(err) {
      throw(err)
    } finally {
      setPDFIsFetching(false)
    }
  }

  const onLandingPDFUpload = (e:any) => {
    const fileList = e.target.files
    const doUpload = async (id:string, name:string, file:any) => {
      setPDFIsFetching(true)
      try {
        const response = await uploadLandingPDF(id, name, file)
        await getStnapshot()
        setlandingPDFState(response)
        return response
      } catch (err) {
        throw err
      } finally {
        setPDFIsFetching(false)
      }
    }
    for (let i = 0, numFiles = fileList.length; i < numFiles; i++) {
      const file = fileList[i];
      doUpload("landing-page", 'landing.pdf', file)
    }
  }


  const renderLandingActions = () => {
    return (
      <Container align='flex-start'>
        <Text textType='p'>Cover</Text>
        <Container className='landing-cover-image-upload'>
          {coverImageIsFetching && 'Loading'}
          <label>
            <input type="file" accept="image/png, image/gif, image/jpeg" style={{visibility: 'hidden', position: 'absolute', height: 0, width: 0}} onChange={onLandingCoverImageUpload}></input>
            <Container className='thumbnail'>
              <img alt="" width="50px" height="50px" src={landingCoverImageState || placeholder}></img>
              {
                landingCoverImageState && (
                  <Container onClick={() => onLandingCoverImageDelete()} className='delete-button' align='center'>
                    <IconButton>
                      <AiOutlineDelete />
                    </IconButton>
                  </Container>
                )
              }
            </Container>
          </label>
        </Container>
        <Text textType='p'>PDF</Text>
        <Container className='landing-cover-image-upload'>
          {PDFIsFetching && 'Loading'}
          <label>
            <input type="file" accept="application/pdf" style={{visibility: 'hidden', position: 'absolute', height: 0, width: 0}} onChange={onLandingPDFUpload}></input>
            <Container className='thumbnail'>
              {
                landingPDFState 
                ?<embed src={landingPDFState} height="150" type="application/pdf"></embed>
                :<img alt="" width="50px" height="50px" src={placeholder}></img>
              }
              {
                landingPDFState && (
                  <Container onClick={() => onLandingPDFDelete()} className='delete-button' align='center'>
                    <IconButton>
                      <AiOutlineDelete />
                    </IconButton>
                  </Container>
                )
              }
            </Container>
          </label>
        </Container>
      </Container>
    )
  }

  useEffect(() => {
    getCurrentLandingCoverImage()
  }, [])

  const tabs:Record<string, ReactNode> = {
    landingPage: (
      <>
        <Text textType='h3'>Landing Page</Text>
        {renderLandingActions()}
      </>
    ),
    properties: (
      <>
        <Text textType='h3'>Administrador de propiedades</Text>
        <Container minWidth='100%' align='flex-start' className='admin-container'>
          <IconButton onClick={() => onPropertySelect(undefined)}>Nueva propiedad</IconButton>
          <Container minWidth='100%' flex="1" gap="0" className='admin-container' >
            {renderTableHeader()}
            {renderTable()}
          </Container>
        </Container>
      </>
    )
  }
  

  return (
    <StyledAdmin align="flex-start" gap="24px;">
      <Container className='side-bar'>
        <IconButton onClick={() => setSelectedTab('landingPage')}>
          <FaPlaneArrival />
          <Text textType='p'>
            Landing Page
          </Text>
        </IconButton>
        <IconButton onClick={() => setSelectedTab('properties')}>
          <BiBuildingHouse />
          <Text textType='p'>
            Propiedades
          </Text>
        </IconButton>
      </Container>
      <Container flex='1' align='flex-start' gap="24px" height='100%'>
        {tabs[selectedTab]}
      </Container>
    </StyledAdmin>
  )
}

export default Admin