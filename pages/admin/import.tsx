import { addDoc, collection, doc, getFirestore, writeBatch } from 'firebase/firestore';
import { stringify } from 'querystring';
import React, { useEffect, useState } from 'react'
import {v4 as uuid} from 'uuid'

const db = getFirestore();

const CSVToArray = ( strData:any, strDelimiter:any = ",") => {
  const objPattern = new RegExp(
    (
      "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
      "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
      "([^\"\\" + strDelimiter + "\\r\\n]*))"
    ),
    "gi"
  );
  const arrData = [[]];
  let arrMatches = null;
  while (arrMatches = objPattern.exec( strData )) {
    const strMatchedDelimiter = arrMatches[ 1 ];
    if (
      strMatchedDelimiter.length &&
      strMatchedDelimiter !== strDelimiter
    ){
      arrData.push( [] );
    }
    let strMatchedValue:any;
    if (arrMatches[ 2 ]){
      strMatchedValue = arrMatches[ 2 ].replace(
        new RegExp( "\"\"", "g" ),
        "\""
      );
    } else {
      strMatchedValue = arrMatches[ 3 ];
    }
    arrData[ arrData.length - 1 ].push( strMatchedValue.replace(',,,','') as never);
  }
  return( arrData );
}

export const ImportTool = () => {
const [csvArray, setCsvArray] = useState<any>({headers: [], rows: []});
const [sliceParams, setSliceParams] = useState([0,500])
const [filters, setFilters] = useState()
const [rowsArray, setRowsArray] = useState<any>([])
const [headers_, setHeaders] = useState([])
const [newKey, setNewKey] = useState(Math.random())

const fileToDataUri = (file:File) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = (event:any) => {
    resolve(event.target.result)
  };
  reader.readAsText(file);
})

const processCSV_FILTERS = (str:string, callback: ({rows:[]}) =>  void) => {
  const rowsArray = [...CSVToArray(str)]
  const order = rowsArray.shift() || []
  const headers = rowsArray.shift() || []
  setHeaders(headers)
  const filters: any = {}



  headers.forEach((header:string, i:number) => {

    console.clear();
    console.log('looking into', header, 'overall progress:', ((100 / headers.length) * i).toFixed(0), '%' )

    const optObj:any = {}
    const labels = {
      motor: 'Motor',
      car_brand: 'Marca de Auto',
      category: 'Categoría',
      cilinders: 'Cilindros',
      family: 'Familia',
      item_brand: 'Marca de Pieza',
      line: 'Línea',
      liters: 'Litros',
      support_models: 'Modelos',
      valves: 'Válvulas'
    }
      
    console.clear();
    console.log('looking into', header, 'overall progress:', ((100 / headers.length) * i).toFixed(0), '%' )
    console.log('populating options...')

    rowsArray.forEach((re:any) => {
      // console.log({re});
      if (optObj && optObj !== 'undefined' && optObj !== '' && optObj !== 'N/A') {
        (optObj)[re[i]] = []

      }
      // re.reduce((acc:any, curr:string, j:number) => {
      //   const shouldReturn = headers[j] === 'car_brand'
      //     || headers[j] === "category"
      //     || headers[j] === "cilinders"
      //     || headers[j] === "family"
      //     || headers[j] === "item_brand"
      //     || headers[j] === "line"
      //     || headers[j] === "liters"
      //     || headers[j] === "motor"
      //     || headers[j] === "support_models"
      //     || headers[j] === "valves"
      //     if (shouldReturn) {
      //       console.log({acc, curr, optObj, filters});
      //       return  { ...acc, [headers[j]]: curr}
      //     }
      //     return acc
      // }, [])
    })



    console.clear();
    console.log('looking into', header, 'overall progress:', ((100 / headers.length) * i).toFixed(0), '%' )
    if (Object.keys(labels).includes(header)) {
      const options =  Object.keys(optObj)
      // const rel:any = optObj
  
      // console.clear();
      // console.log('looking into', header, 'overall progress:', ((100 / headers.length) * i).toFixed(0), '%' )
      // console.log('populating relationships...')
      
      // const percentages:any = []
      // options.forEach((currentOption, n) => {
      //   // console.log(rowsArray.slice(0, 10));
        
      //   if (!percentages.includes(((100 / options.length) * n).toFixed(0))) {
      //     percentages.push(((100 / options.length) * n).toFixed(0))
      //     console.clear();
      //     console.log('looking into', header, 'overall progress:', ((100 / headers.length) * i).toFixed(0), '%' )
      //     console.log('populating relationships...', 'total options: ', options.length , ((100 / options.length) * n).toFixed(0), '%')
      //   }

      //   const filters = { ...headers }
      //   headers.forEach((currentHEader, z) => {
      //     rowsArray.forEach((row) => {
      //       const shouldPushNew = !rel[currentOption][currentHEader]?.includes(row[z])
      //       const shouldPushPrev = rel[currentOption][currentHEader] && rel[currentOption][currentHEader] !== row[z]
      //       // if (rel[currentOption][currentHEader].length && rel[currentOption][currentHEader].includes(row[z])) 
      //       if (row[z] && shouldPushNew ) {
      //         rel[currentOption] = {
      //           ...rel[currentOption],
      //           [currentHEader]: [
      //             ...(shouldPushPrev ? rel[currentOption][currentHEader] : []),
      //             (row[z]),
      //           ]
      //         }
      //       }
      //     })
      //   })
      // })

      // console.clear();
      // console.log('looking into', header, 'overall progress:', ((100 / headers.length) * i).toFixed(0), '%' )
      // console.log('done.')
      
      filters[headers[i]] = ({
        options,
        rel: [],
        order: order[i],
        name: headers[i],
        label: labels[headers[i]]
      });
    }

    // if (
    //   !(headers[i] === 'sku'
    //   || headers[i] === 'from_year'
    //   || headers[i] === 'to_year'
    //   || headers[i] === 'description')
    // ) {
    //   filters[headers[i]] = ({
    //     options,
    //     rel,
    //     order: order[i],
    //     name: headers[i],
    //     label: labels[headers[i]]
    //   });
    // }
  })  

  console.clear();
  console.log('looking into', 'overall progress: 100%' )
  console.log({headers});
  console.log({filters});
  setRowsArray(rowsArray);
  setFilters(filters)
}




const processCSV_DB = (str:string, callback: ({rows:[], headers: []}) =>  void) => {
  const rowsArray = CSVToArray(str)
  const order = rowsArray.shift() || []
  const headers = rowsArray.shift()?.filter((header) => header !== '') || []
  const rows = rowsArray.map((row) => {
    const years = { from_year:'', to_year:'' }
    const indexedYears:any = [] 
    return (row.reduce((acc:any, curr, index) => {
      const header = headers[index]
      let prop = { ...acc, [header]: curr }
      if (header === 'from_year' || header === 'to_year'){
        years[header] = curr
      }
      if (header === 'liters') {
        return { ...acc, liters: (curr as string).replaceAll('(', '').replaceAll(')', '')}
      }
      if (header && header !== 'undefined' && header !== 'liters') {
        return prop
      } 
      if (index === (row.length - 1)) {
        const yearRange = Number(years.to_year) - Number(years.from_year) + 1
        for (let j = 0; j < yearRange; j++) {
          indexedYears.push(`${Number(years.from_year) + Number(j)}`)
        }
        return { ...acc, indexedYears, years: [years.from_year, years.to_year]}
      }
      return acc
      }, {}))
    }
  )
  callback({rows, headers});
}

const onUploadStock = ({ target: { files } }:any) => {
  const file = files[0]
  fileToDataUri(file).then(string => {
    processCSV_FILTERS(`${string}`, setCsvArray)
  })
}

const onUploadStack = ({ target: { files } }:any) => {
  const file = files[0]
  fileToDataUri(file).then(string => {
    processCSV_DB(`${string}`, setCsvArray)
  })
}

const onUploadFilters = async () => {
  const batch = writeBatch(db);
  const docRef = doc(db, "settings", 'filters')
  batch.set( docRef, filters);
  try {
    console.log({filters});
    const data =  await batch.commit();
    } catch(err) {
    }

  }


const onUploadAll = async () => {
  const rowsArray =[...csvArray.rows]
    const order = rowsArray.shift() || []
    const headers = rowsArray.shift() || []
    const batch = writeBatch(db);
    [...csvArray.rows].slice(sliceParams[0],sliceParams[1]).forEach((sparepart:any, i:number) => {
      const docRef = doc(db, "spareParts", uuid())
      batch.set( docRef, {...sparepart});
    });
  
  
    try {
      // await addDoc(collection(db, "spareParts"), {...props})
      await batch.commit();
        if (sliceParams[1] + 500 <= (csvArray.rows.length - 1)) {
          setSliceParams([sliceParams[1], sliceParams[1] + 500])
        } else if ( ((csvArray.rows.length - 1) - sliceParams[1]) > 0) {
          setSliceParams([sliceParams[1], (csvArray.rows.length - 1) - sliceParams[1] + sliceParams[1]])
        }
    } catch (err) {
      if (!(err as Record<string, string>).response) {
        throw err
      }
    }


}

const processFilters = () => {
  const headers = headers_

  Object.keys(filters as any).forEach((filter: any) => {
    (filters as any)[filter].rel = {}
    const { options } = (filters as any)[filter]
  
    options.forEach((opt:any) => {
      if (opt && opt !== 'N/A' && opt !== 'undefined' && opt !== '') {
        (filters as any)[filter].rel[opt] = {}
        headers.forEach( (header: string) => {
          if (header && header !== 'N/A' && header !== 'undefined' && header !== '') {
            (filters as any)[filter].rel[opt][header] = []
            const filteredRows = rowsArray.filter((rowArray:any) => rowArray.includes(opt))
            const relat = filteredRows.map(
              (row:any) => row.map(
                (el:string, k:number) => ({[headers[k]] : el})
              )
            )
            console.log({relat});
            (filters as any)[filter].rel[opt][header] = relat
          }
        });
      }

    });
    // options.slice(0,10000).forEach((option:string) => {
    //   filtered = rowsArray.filter((row:any) => row.includes(option))

    // });
    
  });
  console.log({filters, csvArray, headers_});
}

useEffect(() => {
  if (sliceParams[0]) {
    console.clear();
    console.log('uploaded batch: ', sliceParams[0], ' to ', sliceParams[1]);
    onUploadAll() 
  }
}, [sliceParams])


useEffect(() => {
  console.log({csvArray})
}, [csvArray])

return (
  <>
      select filters
          <input type="file" key={newKey} onChange={onUploadStock} /> 
          select db
          <input type="file" onChange={onUploadStack} />


          <button onClick={onUploadAll} >uplad db</button>
          <button onClick={onUploadFilters} >uplad filters</button>
          <button onClick={() => {console.clear(); setNewKey(Math.random())}} >reset</button>
          <button onClick={() => processFilters()} >filters</button>
  </>

)
}

export default ImportTool