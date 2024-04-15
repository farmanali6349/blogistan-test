import React, { useState, useEffect } from 'react'
import { Container, Postcard, Loading } from "../../index"
import databaseService from '../../../appwrite/config';

function Homepage() {
  const [allPosts, setAllposts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    databaseService.getPosts([])
      .then((posts) => setAllposts(posts.documents))
      .catch((err) => console.log("Error :: Get Post ::", err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      {
        !loading ?
          (
            <section className="posts-page">
              <Container>
                <div className="posts-container">
                  {allPosts && allPosts ?
                    allPosts.map((post) => <Postcard key={post.$id} $id={post.$id} title={post.title} featuredImageSource={post.featuredImageSource} />)
                    : <p className='nopost-para'>No post available</p>}
                </div>
              </Container>
            </section>
          ) : <Loading />
      }
    </>
  )
}

export default Homepage