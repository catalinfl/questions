import axios from "axios"
import { ChangeEvent, useState } from "react"

type Category = "life" | "education" | "health" | "art" | "politics" | "literature" | "movies" | "music" | "sports" | "geography" | "history" | "science" | "technology"

export type CreateQuestion = { 
    id?: string,
    answers?: number,
    question: string,
    description: string,
    category: Category
}
const CreateQuestionComponent = () => {

  const initialCreateQuestion: CreateQuestion = {
    question: "",
    description: "",
    category: "life"
  }




  const [createQuestion, setCreateQuestion] = useState<CreateQuestion>(initialCreateQuestion)

  const handleChange = (type: keyof CreateQuestion, e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    switch (type) {
      case "question":
        setCreateQuestion((prev: CreateQuestion) => ({...prev, question: e.target.value }))
        break
      case "description":
        setCreateQuestion((prev: CreateQuestion) => ({...prev, description: e.target.value }))
        break
      case "category":
        setCreateQuestion((prev: CreateQuestion) => ({...prev, category: e.target.value as Category }))
        break

      default:
        break

      }
  }

  const onHandleSubmit = () => {

    if (createQuestion.question === "" || createQuestion.question.length < 10 || createQuestion.description.length < 10 || createQuestion.description === "" || createQuestion.category === undefined || createQuestion.category === null) {
      return
    }

    axios.post("http://localhost:3000/api/create-question", createQuestion, { withCredentials: true })
      .then((_) => window.location.href = "/questions")
      .catch((err) => console.log(err))
  }

  const handleFetchSignIn = () => {
    window.location.href = "http://localhost:3000/api/login"
  }

  return (
    <div className="flex flex-col lg:flex-row mx-auto border border-secondary mt-2 rounded-lg p-3 lg:min-h-[800px] 
    bg-base-100
    shadow-lg shadow-secondary
    xl:max-w-7xl lg:max-w-4xl md:max-w-2xl sm:max-w-lg max-w-sm
    ">
      <div className="flex flex-col w-full p-3 items-center">
          <p className="w-full max-w-xl justify-center font-bold text-secondary"> Put a question </p>
          <input type="text" className="input input-primary w-full max-w-xl my-2" onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("question", e)} />
          <p className="w-full max-w-xl justify-center font-bold text-secondary"> Description of the question </p>
          <textarea className="textarea textarea-primary w-full h-1/2 max-w-xl my-2" onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChange("description", e)} />
          <p className="w-full max-w-xl justify-center font-bold text-center my-2 text-secondary"> Set a category </p>
          <select defaultValue="See categories" onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange("category", e)} className="select select-primary w-full max-w-xs">
            <option> See categories </option>
            <option> Technology </option>
            <option> Science </option>
            <option> History </option>
            <option> Geography </option>
            <option> Sports </option>
            <option> Music </option>
            <option> Movies </option>
            <option> Literature </option>
            <option> Politics </option>
            <option> Art </option>
            <option> Health </option>
            <option> Education </option>
            <option> Life </option>
          </select>
          <div className="mt-3 bg-white border border-primary text-secondary text-[0.9rem] text-center p-6 w-full max-w-sm">
              <p> You are not connected. </p>
              <p> <span className="font-bold cursor-pointer" onClick={() => handleFetchSignIn()}>  Sign in with google </span>
                or create a question as <span className="font-bold"> Guest </span> </p>
          </div>
          <button className="btn btn-secondary mt-12 w-36 text-white" onClick={() => onHandleSubmit()}>
            Submit question
          </button>
        </div>

    </div>

  )
}


export default CreateQuestionComponent