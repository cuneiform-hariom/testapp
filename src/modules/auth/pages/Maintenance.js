import React, { useEffect } from 'react'

const Maintenance = ({ setTitle }) => {

  useEffect(() => {
    setTitle("Maintenance");
  }, [setTitle]);

  return (
    <div>Maintenance</div>
  )
}

export default Maintenance