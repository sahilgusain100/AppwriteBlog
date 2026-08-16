import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteService from "../appWrite/config"
import { Button, Container } from "../Components"
import parse from "html-react-parser"
import { useSelector } from 'react-redux'

export default function Post() {

    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData
        ? post.userId === userData.$id
        : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate])

    const deletePost = () => {
        console.log("Document ID:", post.$id);

        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="w-full bg-gray-950 min-h-[70vh] py-10">

            <Container>

                <article className="max-w-5xl mx-auto">

                    {/* Featured Image */}
                    <div className="relative w-full overflow-hidden rounded-2xl border border-gray-700 bg-gray-900 shadow-xl">

                        <img
                            src={appwriteService.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-112.5 object-cover"
                        />

                        {/* Author Controls */}
                        {isAuthor && (
                            <div className="absolute right-5 top-5 flex gap-3">

                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button
                                        bgColor="bg-green-600"
                                        className="hover:bg-green-700 transition duration-200"
                                    >
                                        Edit
                                    </Button>
                                </Link>

                                <Button
                                    bgColor="bg-red-600"
                                    onClick={deletePost}
                                    className="hover:bg-red-700 transition duration-200"
                                >
                                    Delete
                                </Button>

                            </div>
                        )}

                    </div>


                    {/* Title */}
                    <div className="mt-8 mb-8">

                        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            {post.title}
                        </h1>

                    </div>


                    {/* Content */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-10 shadow-lg">

                        <div className="browser-css text-gray-200 leading-relaxed">
                            {parse(post.content)}
                        </div>

                    </div>

                </article>

            </Container>

        </div>
    ) : null
}