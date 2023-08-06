import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const sortedAnecdotes = anecdotes => anecdotes.sort((a,b) => (a.votes > b.votes) ? -1 : 1)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    modifyVote(state, action) {
      return sortedAnecdotes(state.map(anecdote => anecdote.id === action.payload ? {...anecdote, votes: anecdote.votes + 1} : anecdote))
    },
    appendAnecdote(state, action){
      const newAnecdote = action.payload
      state.push(newAnecdote)
    },
    setAnecdotes(state, action){
      return sortedAnecdotes(action.payload)
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export const addVote = anecdote => {
  return async dispatch => {
    await anecdoteService.addVote(anecdote)
    dispatch(modifyVote(anecdote.id))
  }
}

export const {appendAnecdote, modifyVote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer