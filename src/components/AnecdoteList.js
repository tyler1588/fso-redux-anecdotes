import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    
    const anecdotes = useSelector(state => {
        if (state.filter === ''){
            return state.anecdotes
        }
        return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    })
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(addVote(anecdote))
        dispatch(setNotification(`vote added for ${anecdote.content}`, 5))
    }


    return (
        <>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList