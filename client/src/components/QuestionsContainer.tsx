import React, { ChangeEvent, SetStateAction, useEffect, useRef, useState } from 'react'
import { CreateQuestion } from './CreateQuestionComponent'
import Question from './Question'
import { Link } from 'react-router-dom'
import { useQuery } from "react-query"
import axios from 'axios'


const fetchQuestions = async (searchbar: string, isEnterPressed: boolean, setIsEnterPressed: React.Dispatch<React.SetStateAction<boolean>>) => {

        if (searchbar.length > 3) {
        const response = await axios.get(`http://localhost:3000/api/question/search?question=${searchbar.toLowerCase()}`)
            .then((res) => {
                setIsEnterPressed(false)
                return res.data
            }
            )
            .catch(err => console.log(err))
        return response
        }

        const response = await axios.get("http://localhost:3000/api/questions")
            .then((res) => res.data)
            .catch(err => console.log(err))
            return response 

    }


const QuestionsContainer = () => {

    const [searchbar, setSearchbar] = useState<string>("")
    const [isEnterPressed, setIsEnterPressed] = useState<boolean>(false)


    const { isLoading, error, data } = useQuery({
        queryKey: ["questions", searchbar],
        queryFn: () => fetchQuestions(searchbar, isEnterPressed, setIsEnterPressed)
    })

    useEffect(() => {
        window.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                setIsEnterPressed(true)
            }
        })

        return () => {
            window.removeEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    setIsEnterPressed(true)
                }
            })

    }}, [])

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchbar(e.target.value)
    }
    
    const ref = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (searchbar === "") {
            ref.current?.focus()
        }

    }, [])

  return (
    <> 
    <div className="mx-auto mb-8 p-3 min-h-[500px]
    xl:max-w-7xl lg:max-w-4xl justify-start md:max-w-2xl sm:max-w-lg max-w-sm w-full flex flex-col">
    <input ref={ref} className="input input-secondary justify-center mb-5 w-full max-w-lg self-center" placeholder='Search for something' onChange={handleSearchChange} />
        {isLoading ?
        <p className=""> Loading ... </p>
        : error ?
        <p> An error occured {error as any} </p>
        :
        (
        <> 
        <h1 className="text-3xl font-bold text-secondary mb-4"> Recommanded questions </h1>
        {data?.map((question: CreateQuestion, index: number) => {
            return (
                <Link to={`/question/${question?.id}`} key={index}>
                    <Question {...question} />
                </Link>
            )
        }
        )}
        </> )
        }
    </div>
    </>
  )
}

export default QuestionsContainer