import { useState } from 'react';

function FormCreatePost({
    handleSubmit,
    handleFieldsChange,
    title,
    content,
    img,
    published
}) {

    return (
        <>
            <form action="" className='formContainer' onSubmit={handleSubmit}>
                <h2 className=''>Create Post</h2>

                {/* INPUTS */}
                <div className='inputContainer'>
                    {/* TITLE */}
                    <label htmlFor="titleField">Title</label>
                    <input type="text" name='title' id='titleField' value={title} onChange={handleFieldsChange} className='valueInput' required />

                    {/* CONTENT */}
                    <label htmlFor="contentField">Content</label>
                    <input type="text" name='content' id='contentField' value={content} onChange={handleFieldsChange} className='valueInput' required />

                    {/* IMG */}
                    <label htmlFor="imgField">Image</label>
                    <input type="text" name='img' id='imgField' value={img} onChange={handleFieldsChange} className='valueInput' />

                    {/* CATEGORY */}
                    <label htmlFor="categoryField">Category</label>
                    <select name="category" id="categoryField" onChange={handleFieldsChange} className='valueInput' required>
                        <option value="">Select Category</option>
                        <option value="React">React</option>
                        <option value="HTML">HTML</option>
                        <option value="Node.js">Node.js</option>
                    </select>

                    {/* TAGS */}
                    {/* <label htmlFor="tagsField">Tags</label>
                                <select name="tags" id="tagsField" onChange={handleFormFieldsChange} value={formFields.tags} multiple>
                                    <option value="a">a</option>
                                    <option value="b">b</option>
                                    <option value="c">c</option>
                                </select> */}

                    {/* PUBLISHED */}
                    <label htmlFor="publishedField">Publish</label>
                    <input type="checkbox" checked={published} name='published' id='publishedField' onChange={handleFieldsChange} className='valueInput' />
                </div>

                <button className='button'>Create post</button>
            </form>
        </>
    )
}

export default FormCreatePost