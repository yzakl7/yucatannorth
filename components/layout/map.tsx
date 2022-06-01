import React from 'react'

export const Map = ({src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2214.583111356532!2d-89.62190479810174!3d21.013872133275925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f5676a69dd11e05%3A0x91b809cf640e3c4e!2sC.%2019%20361A%2C%20Plan%20de%20Ayala%2C%2097118%20M%C3%A9rida%2C%20Yuc.!5e0!3m2!1sen!2smx!4v1653406016590!5m2!1sen!2smx"}) => {

return (
  <>
    <iframe
      src={src}
      width="100%"
      height="300"
      loading="lazy"
    ></iframe>
  </>
  )
}

export default Map