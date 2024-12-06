import { useState } from 'react';
import { useEffect } from 'react';

// # .env IMPORTS
const apiUrlRoot = import.meta.env.VITE_APIURL;
const apiSubPath = import.meta.env.VITE_SUBPATH;

import FormCreatePost from './formCreatePost';


// UTILITY

// Local data Array
import Posts from '../data/Posts';

const defaultFormFields = {
    id: '',
    title: '',
    content: '',
    img: '',
    category: '',
    published: false,
    tags: [],
};




function Main() {

    // INIT USE-STATE SETTING
    const [Feed, setFeed] = useState([]);

    // # USE-STATE - FORM (INSERT)
    // Invece di tanti USE-STATE per ciascun field, uso un solo USE-STATE del FORM al cui interno specifico le KEYS
    const [formFields, setFormFields] = useState(defaultFormFields);


    // # CRUD - INDEX
    const crudIndex = () => (
        fetch(apiUrlRoot + apiSubPath + '?term=', {
            method: 'GET',
        })
            .then(res => res.json())
            .then((data) => {
                setFeed(data.elements);
                console.log('CRUD executed: Index');
            })
            .catch((error) => {
                console.log('Error while fetching content')
            })
    )

    // # CRUD - STORE
    const crudStore = () => (
        fetch(apiUrlRoot + apiSubPath, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formFields),
        })
            .then(res => res.json())
            .then((data) => {
                setFeed(data.elements);
                console.log('CRUD executed: Store');
            })
            .catch((error) => {
                console.log('Error while fetching content')
            })
    )

    // # CRUD - MODIFY
    const crudModify = async (modifyId) => {
        await fetch(apiUrlRoot + apiSubPath + modifyId, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formFields),
        })
            .then(res => res.json())
            .then((data) => {
                console.log('MODIFY of item executed. (Item with ID: ' + modifyId + ')');
                crudIndex();
                console.log('CRUD executed: Modify');
            })
            .catch((error) => {
                console.log('Error while fetching content')
            });
    };

    // # CRUD - DESTROY
    const crudDestroy = (deleteId) => {
        fetch(apiUrlRoot + 'posts/' + deleteId, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then((data) => {
                console.log('DESTROY of item executed. (Item with ID: ' + deleteId + ')');
                crudIndex();
                console.log('CRUD executed: Destroy');
            })
            .catch((error) => {
                console.log('Error while fetching content')
            });
    };


    // # FETCH USE-EFFECT (AT INIT)
    /* Questo USE-EFFECT non avendo alcuna DEPENDENCY (Array vuoto che triggera l'eseguzione del codice) sarà eseguito solo all'AVVIO ( cioè MOUNTING ) e al PRIMO caricamento del presente COMPONENT (Main.jsx).
    Si utilizza questo metodo per caricare risorse e mostrarle subito in pagina invece di fare un FETCH (ad esempio) per riempire il Feed. */
    useEffect(() => {
        crudIndex();
    }, []);


    // # HANDLER - FORM FIELDS CHANGE
    const handleFormFieldsChange = async (e) => {
        // Se il valore è TEXT o CHECKBOX rendo due risultati diversi tramite TERNARY-OPERATOR
        const receivedValue = (e.target.type === 'checkbox' ? e.target.checked : e.target.value);

        // Assegno dinamicamente tutti i VALUE del FORM tramite le info che ci fornisce l'EVENT e la KEY dinamica tramite il NAME dell'INPUT
        await setFormFields({
            // Importo tutte le KEYS da NON modificare così come sono
            ...formFields,
            // Modifico solo la KEY con il nome dell'INPUT, che deve coincidere con quello delle KEYS del FORM assegnate nello USE-STATE dinamico
            [e.target.name]: receivedValue,
        });

        console.log(formFields);
    }

    // # HANDLER - FORM SUBMIT - INSERT
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

        // Metodo senza API

        // Creo un NUOVO ARRAY contenente tutto ciò che era nell'Array originale + il NUOVO OBJECT
        // const updatedFeed = [...Feed, newPost]
        // Imposto lo USE-STATE sul nuovo Array aggiornato
        // setFeed(updatedFeed);

        // CRUD ( STORE ) con API
        await crudStore();

        // RESET USE-STATE
        await setFormFields({
            id: '',
            title: '',
            content: '',
            img: '',
            category: '',
            published: false,
            tags: [],
        })

        alert('Creation successful');
    }


    // # ON-CLICK - MODIFY ITEM (title)
    const modifyTitle = (modifyId) => {

        const newTitle = prompt('Insert new Title');
        console.log('New "title" property: "' + newTitle + '"');

        let selectedItem = { ...Feed.find(item => item.id === modifyId), title: newTitle };
        console.log('Selected Item has ID:' + modifyId);

        setFormFields(selectedItem);

        // Metodo senza API
        // Modify "simulata" filtrando l'Array iniziale fornito in Locale
        // const updatedFeed = [...Feed];
        // updatedFeed[modifyId].title = newTitle;
        // setFeed(updatedFeed);

        // CRUD ( MODIFY ) con API
        crudModify(modifyId);

        // RESET USE-STATE
        setFormFields({
            id: '',
            title: '',
            content: '',
            img: '',
            category: '',
            published: false,
            tags: [],
        })
    }


    // # ON-CLICK - DELETE ITEM
    const deletePost = (deleteId) => {

        alert('ID selezionato: ' + deleteId);

        // Destroy "simulata" filtrando l'Array iniziale fornito in Locale
        // setFeed(Feed.filter((post, index) => post.id !== deleteId));

        // CRUD ( DESTROY ) con API
        crudDestroy(deleteId);
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