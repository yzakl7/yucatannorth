
export const formatter = (data: number | string, format:string) => {
  if (!data) return ''
  const formats:Record<string, () => string> = {
    mxn: () => { return (`$${data}mxn`) },
    m2: () => { return (`${data}m2`)},
  }
  console.log(formats[format]())
  return formats[format]()
}
