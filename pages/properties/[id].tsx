import { useRouter } from 'next/router'
import { ReactNode, useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Container from '../../components/UI/style/container';
// import { doc, getDoc } from "firebase/firestore";
// import { db } from '../_app';
// import { Card } from '../../components/UI/style/card';
// import { Text } from '../../components/UI/style/text';
// import { LangContext } from '../../utils/lang/langContext';
// import SlideShow from '../../components/UI/style/slide-show';
// import { PropertyTags } from '../../components/properties/property-tags';
// import { formatter } from '../../utils/formatter';
// import { Tag } from '../../components/UI/style/tag';
// import { FaVectorSquare } from 'react-icons/fa';
// import { BiBath, BiBed, BiCar } from 'react-icons/bi';
// import { MdHouseSiding } from 'react-icons/md';
// import { RiHomeSmile2Line } from 'react-icons/ri';
// import { SendEmail } from '../../components/send-email/send-email';

export type TagType = {
  name: string
  value: string
  icon: ReactNode
}

type FormElementType = 'inputGroup'
  | 'textInput'
  | 'select'
  | 'checkBox'
  | 'switch'
  | 'title'
  | 'numberInput'

export type CommonProps = {
  name?: string
  direction?: string
  type?: FormElementType
  value?: string
  wrap?: boolean
  array?: CommonProps[]
  options?: string[]
  range?: number[]
  minWidth?: string
  isRequired?: boolean
  isPassword?: boolean
  placeholder?: string
  validation?: 'isEmail' | ((value?: string | undefined) => { isValid: boolean; text: string; type: string; })
  months?: boolean
  flex?: string
  label?: string
  tooltip?: string
  multiline?: string
}

// const slides = [
//     {
//       slideCaption: 'title3',
//       slideImage: {
//         asset: 'https://http2.mlstatic.com/D_NQ_NP_754640-MLM45689255247_042021-O.webp',
//         alt: 'alt'
//       }
//     },
//     {
//       slideCaption: 'title2',
//       slideImage: {
//         asset: 'https://http2.mlstatic.com/D_NQ_NP_799732-MLM45689255249_042021-O.webp',
//         alt: 'alt'
//       }
//     },
//     {
//       slideCaption: 'title1',
//       slideImage: {
//         asset: 'https://http2.mlstatic.com/D_NQ_NP_600635-MLM45689255246_042021-O.webp',
//         alt: 'alt'
//       }
//     }
// ]


const StyledProperty = styled(Container)`
  background: white;
  flex: 1;
  @media (min-width: 1024px) {
    padding: 16px;
  }

  h1 {
    font-size: 12px;
    font-weight: 400;
  }
  h2 {
    span {
      word-break: break-word;
      letter-spacing: 4px;
      font-weight: lighter;
      font-size: 38px;
      @media (max-width: 1023px) {
        font-size: 30px;
      }
      @media (max-width: 425px) {
        font-size: 24px;
      }
    }
  }
  .content-container {
    .text-content-container {
      flex: 1;
      border-radius: 4px;
      padding: 16px;
      @media (min-width: 1024px) {
        border: 1px solid rgba(0,0,0,0.10);
      }
      .name-price-container {
        align-items: center;
        flex-wrap: wrap;
        flex-direction: row;
        gap: 24px;
        justify-content: space-between;
        @media (min-width: 1024px) {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    }
    @media (min-width: 1024px) {
      .slide-show-container {
        flex: 2;
        min-width: 650px;
      }
      flex-direction: row
    }
  }
  .description-container, .specifications-container {
    border-radius: 4px;
    padding: 16px;
    .specifications-row-container {
      flex-direction: row;
      flex-wrap: wrap;
      margin-top: 8px;
      gap: 16px;
      .specification-row {
        min-width: 250px;
        border: 1px solid rgba(0,0,0,0.35);
        padding: 8px;
        border-radius: 3px;
        flex: 1;
        h3 {
          margin-top: 8px;
          margin-bottom: 8px;
        }
        .specification-cell {
          flex-direction: row;
          gap: 0;
          .specification-container {
            border: 1px solid rgba(0,0,0,0.35);
            padding: 8px;
            flex: 1;
            &.key {
              border-top-left-radius: 5px;
              border-bottom-left-radius: 5px;
              background: #f7f7f7;
              border-right: none;
            }
            &.value {
              border-top-right-radius: 5px;
              border-bottom-right-radius: 5px;
              background: lightGray;
            }
          }
        }
      }
    }
    @media (min-width: 1024px) {
      border: 1px solid rgba(0,0,0,0.1);
    }
  }

`

const Property = ({ data }:any) => {
  console.log({data});
  const router = useRouter()
  const [isLoading, setisLoading] = useState(true)
  // const { dictionary, userLanguage } = useContext(LangContext) || ''

  // const {
  //   isFeatured,
  //   features,
  //   description,
  //   address,
  //   name,
  //   measures,
  //   currency,
  //   property_type,
  //   price_total,
  //   price_m2  ,
  // } = data || ''

  // const renderTags = () => {
  //   const { details }:any = dictionary.properties

  //   const tags:TagType[] = []
  //   if (features) {
  //     const { bathrooms, car_slots, floors, rooms } = features
  //     const featureTags = [
  //       { name: "bathrooms", value: bathrooms, icon: <BiBath /> },
  //       { name: "car_slots", value: car_slots, icon: <BiCar/> },
  //       { name: "floors", value: floors, icon: <MdHouseSiding/> },
  //       { name: "rooms", value: rooms, icon: <BiBed /> },
  //     ]
  //     tags.push(...featureTags)
  //   }
  //   if (measures) {
  //     const { built_area, land_area} = measures
  //     const measureTags = [
  //       { name: "land_area", icon: <FaVectorSquare />, value: formatter(land_area, "m2") },
  //       { name: "built_area", icon: <RiHomeSmile2Line />, value: formatter(built_area, "m2")},
  //     ]
  //     tags.push(...measureTags)
  //   }

  //   return tags.map(({name, value, icon}, i) => {
  //     if (!value) return null

  //     return (
  //       <Tag key={name}>
  //         {icon}
  //         {`${value} ${details.tag_names[name]}`}
  //       </Tag>
  //     )
  //   })
  // }
  // const onChange = () => {}

  // const renderSpecificationsTable = (params: Record<string, string>, subTitle: string) => {
  //   const { specifications }:any = dictionary.properties

  //   const specificationsArray = Object.keys(params)
  //   let shouldRenderTitle
  //   specificationsArray.forEach((prop) => {
  //     if (!!params[prop]) {
  //       console.log({prop})
  //       shouldRenderTitle = true
  //     } else {
  //       shouldRenderTitle = false
  //     }
  //   })

  //   console.log({shouldRenderTitle})
  //     if (shouldRenderTitle) {
  //       return (
  //         <Container className="specification-row">
  //           <Text textType="h3">{specifications[subTitle]}</Text>
  //           {
  //             specificationsArray.map((spec) => {
  //               if (params[spec]) {
  //                 return (
  //                   <Container key={`${spec}${params[spec]}`} className="specification-cell">
  //                     <Container className="specification-container key">{specifications[spec]}</Container>
  //                     <Container className="specification-container value">{params[spec]}</Container>
  //                   </Container>
  //                 )
  //               }
  //             })
  //           }
  //         </Container>
  //       )
  //     }
  //     return <Text textType="p">{`${subTitle} not specified `}</Text>
  //   }

  // const renderContent = () => {
  //   const { details, specifications }:any = dictionary.properties

  //   return (
  //     <Container gap="16px">
  //       <Container className="content-container" flex="1">
  //         <SlideShow data={slides} />
  //         <Container gap="16px" className="text-content-container">
  //           <Text textType="h1">
  //             {`${details.property_type[property_type]} ${details.for_sale}`}
  //           </Text>
  //           <Container className="name-price-container">
  //             <Text textType="h2">{name}</Text>
  //             <Text textType="h2"><span>{(price_total && formatter(price_total, currency)) || (price_m2 && formatter(price_m2, currency))}</span></Text>
  //           </Container>
  //           <Container className="tags-container" wrap="wrap" direction="row">
  //             {renderTags()}
  //           </Container>
  //         </Container>
  //       </Container>
  //       {description && <Container className="description-container">
  //         <Text textType="h4">
  //           {`${details.description}`}
  //         </Text>
  //         <Text textType="p">
  //           {`${description[userLanguage]} ${details.for_sale}`}
  //         </Text>
  //       </Container>}
  //       {(measures || features) && <Container className="specifications-container">
  //         <Text textType="h4">
  //           {`${specifications.title}`}
  //         </Text>
  //         <Container className="specifications-row-container">
  //           {measures && (
  //             renderSpecificationsTable(measures, 'measures')
  //           )}
  //           {features && (
  //             renderSpecificationsTable(features, 'features')
  //           )}
  //         </Container>
  //       </Container>}
  //       { address && address.mapSrc && <Container className="description-container">
  //         <Text textType="h4">
  //           {`${details.location}`}
  //         </Text>

  //         <iframe
  //           src={address.mapSrc}
  //           loading="lazy">
  //         </iframe>
  //         <Text textType="p">
  //           {`${address.line_1 ? `${address.line_1}, ` : ''}${address.suburb ? address.suburb : ''}`}
  //         </Text>

  //       </Container> }
  //       <Container className="description-container">
  //         <Text textType="h4">
  //           {`${details.contact_us.title}`}
  //         </Text>
  //         <SendEmail />
  //       </Container>
  //     </Container>
  //   )
  // }

  // const renderSlideshow = () => {
  //   return (
  //     <Card className="details-container">
  //       <Container>
  //         <Text textType="p">{description[userLanguage]}</Text>
  //       </Container>
  //     </Card>
  //   )
  // }

  useEffect(() => {
    setisLoading(false)
  }, [])

  if (router.isFallback || isLoading) {
    return <div>Loading...</div>
  }

  return (
    <StyledProperty>
      {/* {renderContent()} */}
    </StyledProperty>
  )
}

// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: true,
//   }
// }

// export async function getStaticProps({ params }:any) {
//   const docRef = doc(db, "properties", `${params.id}`);
//   const querySnapshot = await getDoc(docRef);
//   const data = querySnapshot.data()

//   if (data) {
//     return {
//       props: { data },
//     }
//   }

//   return {
//     redirect: {
//       destination: "/",
//     },
//     notFound: true
//   }
// }

export default Property