import React from 'react'
import { Alert} from "react-bootstrap"
 
const Message = ({variant, children}) => {
  return (
    <>
        <Alert variant={variant} >
            {/* all the element add here in children , used by Message component other places*/}
            {children}
        </Alert>
    </>
  )
}

Message.defaultProps = {
    variant: 'info',
}

export default Message