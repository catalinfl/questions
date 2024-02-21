import React, { ChangeEvent, useEffect, useState } from 'react'
import { CreateQuestion } from './CreateQuestionComponent'
import Question from './Question'
import { Link } from 'react-router-dom'


const initialData: CreateQuestion[] = [
    {
        question: "What is the meaning of life?",
        description: "I have been thinking about this question for a long time and I still don't have an answer",
        category: "life"
    },
    {
        question: "What is the meaning of life?",
        description: "I have been thinking about this question for a long time and I still don't have an answer",
        category: "life",
        answers: 10
    },
    {
        question: "What is the meaning of life?",
        description: "I have been thinking about this question for a long time and I still don't have an answer",
        category: "life"
    },
    {
        question: "What is the meaning of life?",
        description: "I have been thinking about this question for a long time and I still don't have an answer",
        category: "life",
    }
] 


const QuestionsContainer = () => {

    const [searchbar, setSearchbar] = useState<string>("")

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchbar(e.target.value)
    }

    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if (e.key === "Enter") {
                submitSearch()
            }

        })

        return () => {
            window.removeEventListener('keydown', (e) => {
                if (e.key === "Enter") {
                    submitSearch()
                }
            })
        }
    })

    const submitSearch = () => {
        console.log(searchbar)        
    }

    console.log(searchbar)

  return (
    <> 
    <div className="mx-auto mb-8 p-3
    xl:max-w-7xl lg:max-w-4xl md:max-w-2xl sm:max-w-lg max-w-sm w-full flex flex-col justify-center">
<input className="input input-secondary justify-center mb-5 w-full max-w-lg self-center" placeholder='Search for something' onChange={handleSearchChange} />
        <h1 className="text-3xl font-bold text-secondary mb-4"> Recommanded questions </h1>
        {initialData.map((question: CreateQuestion, index) => {
            return (
                <Link to={`/question/${question?.id}`} key={index}>
                    <Question {...question} />
                </Link>
            )
        }
        )}
    </div>
    </>
  )
}

export default QuestionsContainer