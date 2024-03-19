// ... (other imports)
import { FaTrash, FaEdit } from 'react-icons/fa';

const Note = (props) => {

    return (
        <div className='note'>
            <div className="note-header">
                <h3>{props.title}</h3>
                <div className="note-icons">
                    <button className="edit-btn" onClick={props.onEdit}>
                        <FaEdit />
                    </button>
                    <button className="delete-btn" onClick={props.onDelete}>
                        <FaTrash />
                    </button>
                </div>
            </div>
            <p>{props.content}</p>
        </div>
    );
}

export default Note;
