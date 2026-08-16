import React from 'react'
import { Editor } from "@tinymce/tinymce-react"
import { Controller } from 'react-hook-form'

export default function RTE({
    name,
    control,
    label,
    defaultValue = ""
}) {

    return (
        <div className="w-full">

            {label && (
                <label className="inline-block mb-2 text-sm font-medium text-gray-300">
                    {label}
                </label>
            )}

            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (

                    <Editor
                        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                        initialValue={defaultValue}

                        init={{
                            height: 500,
                            menubar: true,

                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "help",
                                "wordcount",
                            ],

                            toolbar:
                                "undo redo | blocks | image | bold italic | forecolor | " +
                                "alignleft aligncenter alignright alignjustify | " +
                                "bullist numlist outdent indent | removeformat | help",

                            skin: "oxide-dark",

                            content_css: "dark",

                            content_style: `
                                body {
                                    background-color: #111827;
                                    color: #f3f4f6;
                                    font-family: Helvetica, Arial, sans-serif;
                                    font-size: 15px;
                                    line-height: 1.6;
                                    padding: 10px;
                                }

                                p {
                                    color: #f3f4f6;
                                }

                                h1, h2, h3, h4, h5, h6 {
                                    color: #ffffff;
                                }

                                a {
                                    color: #60a5fa;
                                }
                            `
                        }}

                        onEditorChange={onChange}
                    />

                )}
            />

        </div>
    )
}