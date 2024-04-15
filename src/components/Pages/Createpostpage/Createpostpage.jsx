import React from 'react'
import {Container, Postform} from '../../index'
import "./Createpostpage.css"
function Createpostpage() {
  return (
    <div className="create-post-page">
        <Container>
            <h2 className='page-title'>Create Post</h2>
            <Postform/>
        </Container>
    </div>
  )
}

export default Createpostpage