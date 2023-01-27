import { FcLike } from 'react-icons/fc';

function FeedBack({post}) {
    const handleFeedback = event => {
        let id = event.currentTarget.id
        let score;
        score = event.currentTarget.nextSibling.innerHTML
        event.currentTarget.nextSibling.innerHTML = parseInt(score) + 1
        fetch(`/api/update/${id}`, {
            method: 'PUT'
        }).then(response => response.json())
    }
    return (
            <div className="likes">
                <FcLike onClick={handleFeedback} className="heart" id={post.id} />
                <span className='score' id={post.score}>{post.score}</span>
            </div>
    )
}

export default FeedBack