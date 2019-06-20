import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'// React’s in-built type-checker


const Alert=(props)=> {
    const {message , messageType} = props
    //alert alert-dark
    return (
        <div className={classnames('alert',{
            'alert-success':messageType==='success',
            'alert-warning':messageType==='warning',
            'alert-danger':messageType==='error'
        })}  role="alert">
            {message}
        </div>
    )
}
Alert.propTypes={//Props in a component can be type-checked using PropTypes.
    message:PropTypes.string.isRequired,
    messageType:PropTypes.string.isRequired
}

export default Alert;