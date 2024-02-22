import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AllQuestions from './pages/AllQuestions.tsx'
import Question from './pages/Question.tsx'
import CreateQuestion from './pages/CreateQuestion.tsx'
import PopularQuestions from './pages/PopularQuestions.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'

const router = createBrowserRouter([
  { path: '/', element: <Home />, errorElement: <h1> Error page </h1> },
  { path: '/question/:id', element: <Question /> },
  { path: '/questions', element: <AllQuestions /> },
  { path: '/popular-questions', element: <PopularQuestions />},
  { path: '/create-question', element: <CreateQuestion /> }
])

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}> 
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
