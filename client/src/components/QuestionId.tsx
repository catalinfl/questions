import axios from 'axios'
import React, { useRef, useState } from 'react'
import { FaThumbsUp } from 'react-icons/fa'
import { useMutation, useQuery } from 'react-query'




const QuestionId = () => {

  const url = new URL(window.location.href)

  const id = url.pathname.split("/")[2]


  const { data, isLoading, refetch } = useQuery({
    queryKey: ["question", id],
    queryFn: () => axios.get(`http://localhost:3000/api/question/answers/${id}`)
      .then((res) => {
        return res.data
      })
      .catch(err => console.log(err))
  })


  const [textarea, setTextarea] = useState<string>("")

  const mutation = useMutation({
    mutationKey: ["postAnswer", id],
    mutationFn: (answer: string) => axios.post(`http://localhost:3000/api/answer/${id}`, { answer: answer })
      .then((res) => {
        res.data
      })
      .catch(err => console.log(err)),
    onSuccess: () => refetch()
  })

  const handlePostAnswer = () => {
    if (textarea === "") {
      return
    }

    mutation.mutate(textarea)
    textareaRef.current!.value = ""
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
  }

  const reputationMutation = useMutation({
    mutationKey: ["reputation", id],
    mutationFn: (id: string) => axios.put(`http://localhost:3000/api/answer/${id}`, {}, { withCredentials: true })
      .then(() => refetch())
      .catch(err => console.log(err))
  })
  

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleReputation = (id: string) => {
    reputationMutation.mutate(id)
  }

  return (
    isLoading 
    ? 
    <div className="xl:max-w-7xl min-h-[500px] lg:max-w-4xl justify-start md:max-w-2xl mx-auto sm:max-w-lg max-w-sm w-full flex flex-col">Loading...</div> :
    <> 
    <div className="mx-auto mb-8 p-3 min-h-[500px]  shadow-md shadow-secondary border border-secondary
    xl:max-w-7xl lg:max-w-4xl justify-start md:max-w-2xl sm:max-w-lg max-w-sm w-full flex flex-col">
      <p className="font-bold text-sm text-secondary"> {data?.author} is asking...</p>
      <h2 className="text-2xl font-bold text-primary"> {data?.question} </h2>
      <p className="mt-7 text-wrap"> {data?.description} </p>
      <div className="category mt-6">
        <p className="font-bold flex justify-end text-primary text-sm"> Category: {data?.category} </p>
      </div>
    </div>
    <div className="xl:max-w-7xl w-3/4 lg:max-w-4xl mx-auto md:max-w-2xl sm:max-w-lg max-w-sm  flex flex-col">
      <textarea ref={textareaRef} className="border border-primary resize-none shadow shadow-primary w-full lg:w-2/3 outline-primary p-3
      mx-auto
      " rows={6} placeholder='Send an answer...' onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTextarea(e.target.value)}/>
      <button onClick={() => handlePostAnswer()} className="btn btn-primary w-32 mx-auto mt-3 text-white shadow-primary shadow"> Post answer </button>
    </div>
    <div className="mx-auto mb-8 p-3 flex flex-col
    xl:max-w-6xl lg:max-w-4xl md:max-w-2xl sm:max-w-md max-w-sm">
      {data?.answer?.sort((a: any, b: any) => b.reputation - a.reputation).map((answer: any, index: number) => {
        return (
          <div key={index} className={`border self-center min-h-[150px] grid grid-cols-8 border-primary shadow-md shadow-primary w-full lg:w-3/4  p-3 mt-3`}>
        <div className="col-span-7">
          <p className="flex font-bold text-primary text-sm"> {answer.author} </p>
          <p className="flex mt-2 text-sm"> {answer.answer} </p>
        </div>
        <div className="flex flex-col justify-center items-center font-bold col-span-1">
          <FaThumbsUp onClick={() => handleReputation(answer.id)} className="text-secondary cursor-pointer" size={32}/>
          <p className="font-bold text-secondary"> {answer.reputation} </p>
        </div>
      </div>
        )
      })}
    </div>
    </>

)
}

export default QuestionId