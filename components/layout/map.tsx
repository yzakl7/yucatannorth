import React from 'react'

export const Map = ({src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.8052014477457!2d-89.60530940000001!3d20.960336599999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f56710d3e6c51ad%3A0xd23e1a9147ce70fd!2sRefacciones%20Sol%C3%ADs!5e0!3m2!1sen!2smx!4v1652326028534!5m2!1sen!2smx"}) => {
  return (
    <iframe
      src={src}
      width="100%"
      height="300"
      loading="lazy"
    ></iframe>
  )
}

export default Map