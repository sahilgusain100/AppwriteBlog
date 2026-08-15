import React, {useEffect, useState} from 'react'
import { Container, Postform } from '../Components'
import appwriteService from "../appWrite/config"
import { useNavigate, useParams } from 'react-router-dom'

const EditPost = () => {
const [post, setposts] = useState(null)
const {slug} = useParams()
const navigate = useNavigate()

useEffect(() => {
    if(slug){
        appwriteService.getPost(slug).then((post) => {
            if(post){
                setposts(post)
            }
        })
    }else{
        navigate('/')
    }
},[slug, navigate])

  return post ? (
    <div className='py-8'>
        <Container>
            <Postform post={post}/>
        </Container>
    </div>
  ) : null
}

export default EditPost
