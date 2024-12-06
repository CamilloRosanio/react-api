async function FetchDynamic(
    // # PROPS    
    apiUrlRoot,
    subPath,
    reqType,
    params,
    querys) {

    // # ALERT DEFAULT MESSAGES
    const alertApiUrlRoot = alert('ALERT: missing or invalid API URL');
    const alertreqType = alert('ALERT: choose between:\n 1) index \n 2) show \n 3) store \n 4) update \n 5) modify \n 6) destroy');


    // # UTILITY ELEMENTS
    const reqTypes = ['index', 'show', 'store', 'update', 'modify', 'destroy'];
    const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];


    // # PROPS FORMATTING
    console.log('props formatting');


    // # PROPS CHECK
    apiUrlRoot ? apiUrlRoot : alertApiUrlRoot;
    reqType ? reqTypeResult : alertreqType;





    // fetch(apiUrlRoot + 'posts?term=', {
    //     method: 'GET',
    // })
    //     .then(res => res.json())
    //     .then((data) => {
    //         setFeed(data.elements);
    //     })
    //     .catch((error) => {
    //         console.log('Error while fetching content')
    //     })
}

export default FetchDynamic;