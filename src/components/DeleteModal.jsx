function DeleteModal({ id, onClick, closeModal }) {
    return <>
        <div className={'modalContainer'} id={'deleteModal-' + id}>
            <div className='deleteModal'>
                <h3>Be careful!</h3>
                <p>Do you really want to delete the item with ID {id}?</p>
                <button type='button' onClick={() => { onClick(id); closeModal(id) }} className='button red'>Delete</button>
                <button type='button' onClick={() => { closeModal(id) }} className='button'>Close</button>
            </div>
        </div>
    </>
}

export default DeleteModal;