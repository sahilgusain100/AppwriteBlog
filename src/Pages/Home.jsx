import React, { useState, useEffect } from 'react'
import appwriteService from "../appWrite/config"
import { Container, PostCard } from '../Components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {

    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {

        if (authStatus) {
            appwriteService.getPosts().then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
        }

    }, [authStatus])


    // USER IS NOT LOGGED IN
    if (!authStatus) {
        return (
            <div className="w-full bg-gray-50 min-h-[70vh] py-16">
                <Container>

                    <div className="flex justify-center">

                        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">

                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                                <span className="text-3xl">🔒</span>
                            </div>

                            <h1 className="text-3xl font-bold text-gray-800 mb-3">
                                Login to read posts
                            </h1>

                            <p className="text-gray-500 mb-7 leading-relaxed">
                                Please login to access and read our blog posts.
                            </p>

                            <Link
                                to="/login"
                                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 shadow-md"
                            >
                                Login
                            </Link>

                            <p className="text-sm text-gray-500 mt-5">
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="text-blue-600 font-medium hover:underline"
                                >
                                    Sign up
                                </Link>
                            </p>

                        </div>

                    </div>

                </Container>
            </div>
        )
    }


    // USER IS LOGGED IN BUT THERE ARE NO POSTS
    if (posts.length === 0) {
        return (
            <div className="w-full bg-gray-50 min-h-[70vh] py-16">
                <Container>

                    <div className="flex justify-center">

                        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">

                            <div className="text-5xl mb-5">
                                📝
                            </div>

                            <h1 className="text-2xl font-bold text-gray-800 mb-3">
                                No posts available
                            </h1>

                            <p className="text-gray-500">
                                There are no blog posts to display yet.
                            </p>

                        </div>

                    </div>

                </Container>
            </div>
        )
    }


    // USER IS LOGGED IN AND POSTS EXIST
    return (
        <div className="w-full bg-gray-50 py-10">

            <Container>

                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    Latest Posts
                </h1>

                <div className="flex flex-wrap -m-2">

                    {posts.map((post) => (
                        <div
                            key={post.$id}
                            className="p-2 w-full sm:w-1/2 lg:w-1/3"
                        >
                            <PostCard {...post} />
                        </div>
                    ))}

                </div>

            </Container>

        </div>
    )
}

export default Home