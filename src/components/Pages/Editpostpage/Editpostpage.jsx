import React, { useEffect, useState } from 'react'
import { Container, Postform, Loading } from "../../index"
import "./Editpostpage.css"
import { useParams } from 'react-router-dom'
import databaseService from '../../../appwrite/config';


function Editpostpage() {

  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  useEffect(() => {
    if (slug) {
      databaseService.getPost(slug)
        .then((post) => setPost(post))
        .catch((err) => console.log("Error :: getPostCatch :: Editpostpage.jsx :: Error", err))
        .finally(() => setLoading(false))
    }
  }, [slug])

  return (
    <>
      {!loading ? (
        <section className="edit-post-page">
          <Container>
            <h2 className="page-title">Edit Post</h2>
            {post && post ? <Postform post={post} /> : <p className='no-post-para'>No Post Available For Edit</p>}
          </Container>
        </section>
      ) : <Loading />}
    </>
  )
}

export default Editpostpage