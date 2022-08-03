
export const formatter = (data: number | string, format:string) => {
  if (!data) return ''
  const formats:Record<string, () => string> = {
    mxn: () => { return (`$${data}mxn`) },
    m2: () => { return (`${data}m2`)},
  }
  return formats[format]()
}

export const getFormattedGoogleDriveUrl = (url: string) => {
  const processedUrl = url.replace('https://drive.google.com/file/d/', '')
  const id = processedUrl.replace('/view?usp=sharing', '')

  return `https://drive.google.com/uc?export=view&id=${id}`
}