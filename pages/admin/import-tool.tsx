import { addDoc, collection, doc, getFirestore, writeBatch } from 'firebase/firestore';
import { stringify } from 'querystring';
import React, { useEffect, useState } from 'react'
import {v4 as uuid} from 'uuid'

const db = getFirestore();

const CSVToArray = ( strData:any, strDelimiter:any = "¬") => {
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

const fileToDataUri = (file:File) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = (event:any) => {
    resolve(event.target.result)
  };
  reader.readAsText(file);
})

const processCSV_FILTERS = (str:string, callback: ({rows:[]}) =>  void) => {
  const rowsArray = CSVToArray(str)
  const headers = rowsArray.shift() || []
  const filters: any = {}
  headers.forEach((header:string, i:number) => {
    const cat = {}
    rowsArray.forEach((re:any) => {
      (cat as any)[re[i]] = true
    })
    if (
      headers[i] === 'sku'
      || headers[i] === 'from_year'
      || headers[i] === 'to_year'
      || headers[i] === 'description'
    ) {
    } else {
      filters[headers[i]] = ({options: Object.keys(cat), isRestricted: 'no', order: 0, name: headers[i], label: 'etiqueta'});
    }
  })
  setFilters(filters)
}

const processCSV_DB = (str:string, callback: ({rows:[], headers: []}) =>  void) => {
  const rowsArray = CSVToArray(str)
  const headers = rowsArray.shift() || []
  console.log({curr: rowsArray.slice(0, 10)})
  const rows = rowsArray.slice(0, 500).map((row) => row.reduce((acc:any, curr, index) => {
    console.log({curr});
    const header = headers[index]
    let prop = { ...acc, [header]: curr }
    // let prop = {...acc, filters: {...acc.filters, [header]:`${curr}` }}
    if ( header === "from_year" ) {
      prop = {...acc, years: [curr]}
    } else if ( header === "to_year" ) {
      acc.years?.push(curr)
      prop = { ...acc}
    } else if ( header === 'sku' || header === 'description') {
      prop = {...acc, [header]: curr}
    } else if (acc && acc.family && acc.car_brand && !acc.name) {
      prop = {...acc, name: `${acc.family} ${acc.car_brand}`}
    } 

    if (acc?.name) {
      const splitList = acc.name.toLowerCase().split(' ')
      const indexedKeywords = []

      for (let i = 0; i < splitList.length; i++) {
        for (let j = 0; j < splitList[i].length; j++) {
          indexedKeywords.push(splitList[i].substring(0, j + 1))
        }
      
      }
    return ({...prop, indexedKeywords})
    }
    return prop
    }, {})
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
  console.log('sta');
  const file = files[0]
  fileToDataUri(file).then(string => {
    processCSV_DB(`${string}`, setCsvArray)
  })
}

useEffect(() => {
  console.log({csvArray})


}, [csvArray])

const onUploadFilters = async () => {
  const batch = writeBatch(db);
  const docRef = doc(db, "settings", 'filters')
  batch.set( docRef, filters);
try {
  const data =  await batch.commit();
  console.log({data});
} catch(err) {
  console.log({err});
}

}


const onUploadAll = async () => {
  console.log('sube de ', sliceParams[0], ' a ', sliceParams[1])
  const batch = writeBatch(db);
  csvArray.rows.slice(sliceParams[0],sliceParams[1]).forEach((sparepart:any, i:number) => {
    const docRef = doc(db, "spareParts", uuid())
    batch.set( docRef, {...sparepart});
    console.log({...sparepart});
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

useEffect(() => {
  if (sliceParams[0]) {
    onUploadAll() 
  }
}, [sliceParams])


useEffect(() => {
}, [csvArray])

return (
  <>
    select filters
          <input type="file" onChange={onUploadStock} />
          select db
          <input type="file" onChange={onUploadStack} />


          <button onClick={onUploadAll} >uplad db</button>
          <button onClick={onUploadFilters} >uplad filters</button>
  </>

)
}

export default ImportTool