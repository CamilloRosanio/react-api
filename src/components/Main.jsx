import { useState } from 'react';
import { useEffect } from 'react';

import FormCreatePost from './formCreatePost';

import Posts from '../data/Posts';


function Main() {

    const fetchPosts = () => (
        fetch('http://localhost:3000/posts?term=')
            .then(res => res.json())
            .then((data) => {
                console.log(data.elements);
            })
            .catch((error) => {
                console.log('error catched')
            })
    )

    // Invece di tanti USE-STATE per ciascun field, uso un solo USE-STATE del FORM al cui interno specifico le KEYS
    const [formFields, setFormFields] = useState({
        title: '',
        content: '',
        img: '',
        category: '',
        published: false,
        tags: [],
    })

    const [Feed, setFeed] = useState(Posts);


    const handleFormFieldsChange = (e) => {
        // Se il valore è TEXT o CHECKBOX rendo due risultati diversi tramite TERNARY-OPERATOR
        const receivedValue = (e.target.type === 'checkbox' ? e.target.checked : e.target.value);

        // Assegno dinamicamente tutti i VALUE del FORM tramite le info che ci fornisce l'EVENT e la KEY dinamica tramite il NAME dell'INPUT
        setFormFields({
            // Importo tutte le KEYS da NON modificare così come sono
            ...formFields,
            // Modifico solo la KEY con il nome dell'INPUT, che deve coincidere con quello delle KEYS del FORM assegnate nello USE-STATE dinamico
            [e.target.name]: receivedValue,
        });

        console.log(e.target.checked)
    }

    const handleFormSubmit = (e) => {
        // Evito che il Submit ricarichi la pagina tramite "e" (EVENT), che è un OBJECT automaticamente fornito contenente tutte le info dell'evento lanciato
        e.preventDefault();
        // Assegno i valori delle KEYS del nuovo OBJECT che sto creando
        const newPost = {
            title: formFields.title,
            content: formFields.content,
            img: formFields.img,
            category: formFields.category,
            published: formFields.published,
            tags: formFields.tags,
        }
        // Creo un NUOVO ARRAY contenente tutto ciò che era nell'Array originale + il NUOVO OBJECT
        const updatedFeed = [...Feed, newPost]
        // Imposto lo USE-STATE sul nuovo Array aggiornato
        setFeed(updatedFeed);
        // Svuoto la casella dell'INPUT assegnando un valore vuoto al Field
        setFormFields({
            title: '',
            content: '',
            img: '',
            category: 'React',
            published: false,
            tags: [],
        })

        // alert('Creation successful')
    }

    const modifyTitle = (modifyIndex) => {
        const newTitle = prompt('Insert new Title');
        const updatedFeed = [...Feed];
        updatedFeed[modifyIndex].title = newTitle;
        setFeed(updatedFeed);
    }

    const deletePost = (deleteIndex) => {
        setFeed(Feed.filter((post, index) => index !== deleteIndex));
    }


    // Questo USE-EFFECT non avendo alcuna DEPENDENCY (Array vuoto che triggera l'eseguzione del codice) sarà eseguito solo all'AVVIO ( cioè MOUNTING ) e al PRIMO caricamento del presente COMPONENT (Main.jsx).
    // Si utilizza questo metodo per caricare risorse e mostrarle subito in pagina invece di fare un FETCH (ad esempio) per riempire il Feed.
    useEffect(() => {
        fetchPosts();
        console.log('FETCH of resources (Posts) executed.')
    }, [])




    return (
        <>
            <main>
                <div className="container">

                    {/* FORM SECTION */}
                    <section>

                        {/* FORM (CREATE POST) */}
                        <FormCreatePost
                            handleSubmit={handleFormSubmit}
                            handleFieldsChange={handleFormFieldsChange}
                            title={formFields.title}
                            content={formFields.content}
                            img={formFields.img}
                            published={formFields.published}
                        />

                        {/* <form action="" className='formContainer' onSubmit={handleFormSubmit}>
                            <h2 className=''>Create Post</h2>

                            <div className='inputContainer'>
                                
                                <label htmlFor="titleField">Title</label>
                                <input type="text" name='title' id='titleField' placeholder='insert title' value={formFields.title} onChange={handleFormFieldsChange} className='valueInput' required />

                                
                                <label htmlFor="contentField">Content</label>
                                <input type="text" name='content' id='contentField' placeholder='insert content' value={formFields.content} onChange={handleFormFieldsChange} className='valueInput' required />

                                
                                <label htmlFor="imgField">Image</label>
                                <input type="text" name='img' id='imgField' placeholder='insert image' value={formFields.img} onChange={handleFormFieldsChange} className='valueInput' />

                                
                                <label htmlFor="categoryField">Category</label>
                                <select name="category" id="categoryField" onChange={handleFormFieldsChange} className='valueInput' required>
                                    <option value="">Select Category</option>
                                    <option value="React">React</option>
                                    <option value="HTML">HTML</option>
                                    <option value="Node.js">Node.js</option>
                                </select>

                                
                                <label htmlFor="publishedField">Publish</label>
                                <input type="checkbox" checked={formFields.published} name='published' id='publishedField' onChange={handleFormFieldsChange} className='valueInput' />
                            </div>

                            <button className='button'>Create post</button>
                        </form> */}
                    </section>

                    {/* POST SECTION */}
                    <section className='feed'>
                        <h3 className=''>Post List</h3>

                        <ul className='feedList'>
                            {/* CONDIZIONE PER LA STAMPA SU DOM */}
                            {Feed.length ?
                                Feed
                                    .filter(post => post.published === true)
                                    .map((post, index) => (
                                        <li key={index} className='feedItem'>
                                            <div className='cardBody'>
                                                <p><strong>{post.category}</strong></p>
                                                <h4>{post.title}</h4>
                                                <p>{post.content}</p>
                                                <p>{post.tags}</p>
                                                {/* <p>{post.published ? 'published' : 'draft'}</p> */}
                                            </div>

                                            <div className='bottomControls'>
                                                <button type='button' onClick={() => modifyTitle(index)} className='button gold'>Modify Title</button>
                                                <button type='button' onClick={() => deletePost(index)} className='button red'>Delete</button>
                                            </div>
                                        </li>
                                    )) :
                                <h3 className='feedItem'>No posts available</h3>
                            }
                        </ul>
                    </section>

                </div>
            </main >
        </>
    )
}

export default Main