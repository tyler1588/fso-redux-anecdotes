import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch({
      type: 'VOTE',
      payload: {
        id: id
      }
    })
    console.log('vote', id)
  }

  const createAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      payload: {
        content
      }
    })
  }

  const sortedAnecdotes = (anecdotes) => {
    const updatedAnecdotes = anecdotes.sort((a,b) => (a.votes > b.votes) ? -1 : 1)
    return updatedAnecdotes
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes(anecdotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App