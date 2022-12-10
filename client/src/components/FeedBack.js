import { FcLike } from 'react-icons/fc';

function FeedBack({thing}) {
    const handleFeedback = event => {
        let id = event.currentTarget.id
        let score;
        score = event.currentTarget.nextSibling.innerHTML
        event.currentTarget.nextSibling.innerHTML = parseInt(score) + 1
        fetch(`http://127.0.0.1:8080/api/update/${id}`, {
            method: 'PUT'
        }).then(response => response.json())
    }
    return (
            <div className="likes">
                <FcLike onClick={handleFeedback} className="heart" id={thing.id} />
                <span className='score' id={thing.score}>{thing.score}</span>
            </div>
    )
}

export default FeedBack