export const getColor = (color: string) => {
  const colors = {
    primary: '#B28D51',
    secondary: '#DDDDDD',
    black: '#000000',
    white: '#ffffff',
    red: 'red'
    
  }
  return (colors as Record<string, any>)[color]
}