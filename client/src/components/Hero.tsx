import HeroImg from '../assets/hero.svg'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row mx-auto border border-secondary mt-2 rounded-lg p-3 min-h-[600px] 
    bg-base-100
    shadow-lg shadow-secondary
    xl:max-w-7xl lg:max-w-4xl md:max-w-2xl sm:max-w-lg max-w-sm
    ">
        <div className="flex flex-col lg:flex-1 mb-16 sm:mt-0 text-nowrap lg:text-wrap place-items-center">
            <h1 className="font-bold text-3xl lg:text-5xl text-secondary"> Welcome to QuestionsIO! </h1>
            <img src={HeroImg} className="bg-secondary p-12 rounded-lg w-[400px] self-center mt-12"/>
        </div>
        <div className="flex lg:flex-1 flex-col gap-4 justify-center items-center">
            <Link to="/create-question" className="w-full flex justify-center">
                <div className="bg-base-100 w-full sm:w-1/2 p-3 h-32 text-primary hover:text-white hover:border-white hover:shadow-none hover:bg-secondary transition-all cursor-pointer border border-primary flex justify-center items-center rounded-lg shadow-md shadow-primary">
                    <p className="font-bold w-full text-center text-xl"> Ask something </p>
                </div>
            </Link>
            <Link to="/questions" className="w-full flex justify-center">
            <div className="bg-base-100 w-full sm:w-1/2 p-3 h-32 text-primary hover:text-white hover:border-white hover:shadow-none hover:bg-secondary transition-all cursor-pointer border border-primary flex justify-center items-center rounded-lg shadow-md shadow-primary">
                <p className="font-bold text-center text-xl"> Answer for someone </p>
            </div>
            </Link>
        </div>
    </div>
  )
}

export default Hero