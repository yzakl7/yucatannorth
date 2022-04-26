export const getColor = (color: string) => {
  const colors = {
    primary: '#B28D51',
    secondary: '#DDDDDD',
    border: '#CCCCCC',
    black: '#000000',
    white: '#ffffff',
    danger: '#980a0a',
    success: 'green'
    
  }
  return (colors as Record<string, any>)[color]
}