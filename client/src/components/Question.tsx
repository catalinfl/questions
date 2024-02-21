import { CreateQuestion } from "./CreateQuestionComponent"

const Question = (question: CreateQuestion, index: number) => {
    
    return (
    <div key={index} className="border cursor-pointer grid grid-cols-8 min-h-32 border-secondary shadow-md shadow-secondary rounded-lg p-3 my-2">
        <div className="flex col-span-5 flex-col justify-center">
            <h1 className="font-bold text-2xl text-secondary">{question.question}</h1>
            <p> {question.description.slice(0, 100)}{question.description.length >= 100 ? "..." : null} </p>
        </div>
        <div className="flex col-span-3 flex-row items-center">
            <div className="flex w-full flex-col">
                <h1 className="font-bold text-sm items-center flex-1 text-secondary"> Category: <span className="text-black"> {question.category.slice(0, 1).toUpperCase() + question.category.slice(1, question.category.length)} </span> </h1>
                <h1 className="font-bold text-sm items-center flex-1 text-secondary"> Answers: <span className="text-black"> {question?.answers} </span> </h1>
            </div>
            <div className="flex">
                <p className="text-5xl p-1 font-bold w-16 h-16 text-center text-white items-center justify-center bg-secondary rounded-full"> ? </p>
            </div>
        </div>
    </div>
  )
}

export default Question