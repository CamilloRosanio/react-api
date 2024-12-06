import { useState } from 'react';
import { useEffect } from 'react';

// # .env IMPORTS
const apiUrlRoot = import.meta.env.VITE_APIURL;

import FormCreatePost from './formCreatePost';

import Posts from '../data/Posts';




function Main() {

    // # CRUD - INDEX
    const fetchPosts = () => (
        fetch(apiUrlRoot + 'posts?term=', {
            method: 'GET',
        })
            .then(res => res.json())
            .then((data) => {
                setFeed(data.elements);
            })
            .catch((error) => {
                console.log('Error while fetching content')
            })
    )


    // # FETCH USE-EFFECT (AT INIT)
    /* Questo USE-EFFECT non avendo alcuna DEPENDENCY (Array vuoto che triggera l'eseguzione del codice) sarà eseguito solo all'AVVIO ( cioè MOUNTING ) e al PRIMO caricamento del presente COMPONENT (Main.jsx).
    Si utilizza questo metodo per caricare risorse e mostrarle subito in pagina invece di fare un FETCH (ad esempio) per riempire il Feed. */
    useEffect(() => {
        fetchPosts();
    }, []);


    // INIT USE-STATE SETTING
    const [Feed, setFeed] = useState([]);

    // # USE-STATE - FORM (INSERT)
    // Invece di tanti USE-STATE per ciascun field, uso un solo USE-STATE del FORM al cui interno specifico le KEYS
    const [formFields, setFormFields] = useState({
        id: '',
        title: '',
        content: '',
        img: '',
        category: '',
        published: false,
        tags: [],
    })


    // # HANDLER - FORM FIELDS CHANGE
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
    }



    // # HANDLER - FORM SUBMIT
    const handleFormSubmit = async (e) => {
        // Evito che il Submit ricarichi la pagina tramite "e" (EVENT), che è un OBJECT automaticamente fornito contenente tutte le info dell'evento lanciato
        e.preventDefault();
        // Assegno i valori delle KEYS del nuovo OBJECT che sto creando
        const newPost = {
            id: '',
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
            id: '',
            title: '',
            content: '',
            img: '',
            category: 'React',
            published: false,
            tags: [],
        })

        alert('Creation successful');
    }



    // # CRUD - MODIFY
    const modifyTitle = async (modifyId) => {

        alert('Modify element with ID: ' + modifyId)
        // Modify "simulata" filtrando l'Array iniziale fornito in Locale
        // const newTitle = prompt('Insert new Title');
        // const updatedFeed = [...Feed];
        // updatedFeed[modifyId].title = newTitle;
        // setFeed(updatedFeed);

        // Modifica tramite CRUD ( MODIFY ) come sarebbe se si lavorasse con una vera API
        // await fetch('http://localhost:3000/posts/' + modifyId, {
        //     method: 'PATCH',
        // })
        //     .then(res => res.json())
        //     .then((data) => {
        //         setFeed(data.elements);
        //     })
        //     .catch((error) => {
        //         console.log('Error while fetching content')
        //     })

        // console.log(data.elements);
    }


    // # CRUD - DESTROY
    const deletePost = (deleteId) => {

        alert('ID selezionato: ' + deleteId);
        // Destroy "simulata" filtrando l'Array iniziale fornito in Locale
        // setFeed(Feed.filter((post, index) => post.id !== deleteId));

        // Cancellazione tramite CRUD ( DESTROY ) come sarebbe se si lavorasse con una vera API
        const fetchFeedAfterDelete = async () => {
            await fetch(apiUrlRoot + 'posts/' + deleteId, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
            })
                .then(res => res)
                .then((data) => {
                    console.log('DESTROY of item executed. (Item with ID: ' + deleteId + ')');
                    fetchPosts();
                    console.log('FETCH of updated Feed executed.');
                })
                .catch((error) => {
                    console.log('Error while fetching content')
                });
        };

        fetchFeedAfterDelete();
    }



    return (
        <>
            <main>
                <div className="container">

                    {/* FORM SECTION */}
                    <section>

                        {/* COMPONENT FORM (CREATE POST) */}
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
                                                <p>{'ID ' + post.id + ' - Index: ' + index}</p>
                                                <p><strong>{post.category}</strong></p>
                                                <h4>{post.title}</h4>
                                                <p>{post.content}</p>
                                                <p>{post.tags}</p>
                                                {/* <p>{post.published ? 'published' : 'draft'}</p> */}
                                            </div>

                                            <div className='bottomControls'>
                                                <button type='button' onClick={() => modifyTitle(post.id)} className='button gold'>Modify Title</button>
                                                <button type='button' onClick={() => deletePost(post.id)} className='button red'>Delete</button>
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