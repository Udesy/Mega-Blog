import React, {useEffect, useState}from 'react'
import { Container, PostForm } from '../components'
import appwriteServices from "../appwrite/config"
import { useParams, useNavigate } from 'react-router-dom'

function EditPost() {
    const [post, setPosts] = useState([])
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        appwriteServices.getPost(slug).then((post) => {
            if(post){
                setPosts(post)
            }else{
              navigate("/")
            }
        })
    }, [slug, navigate])
  return ( post ? (
    <div>
      <Container>
        <PostForm post={post}/>
      </Container>
    </div>
  ) : null
) 
}

export default EditPost