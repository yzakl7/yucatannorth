export const getColor = (color: string) => {
  const colors = {
    primary: '#E11527',
    clearTransparency: 'rgba(255,255,255,0.55)',
    secondary: '#eeeeee',
    border: '#CCCCCC',
    black: '#000000',
    white: '#ffffff',
    danger: 'red',
    success: 'green'
    
  }
  return (colors as Record<string, any>)[color]
}