import { createSlice } from '@reduxjs/toolkit'

const sortedAnecdotes = anecdotes => anecdotes.sort((a,b) => (a.votes > b.votes) ? -1 : 1)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      return sortedAnecdotes(state.map(anecdote => anecdote.id === action.payload ? {...anecdote, votes: anecdote.votes + 1} : anecdote))
    },
    createAnecdote(state, action){
      const newAnecdote = action.payload
      state.push(newAnecdote)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const { createAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer