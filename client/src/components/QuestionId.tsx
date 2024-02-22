import React from 'react'
import { FaThumbsUp } from 'react-icons/fa'

const QuestionId = () => {
  return (
    <> 
    <div className="mx-auto mb-8 p-3 min-h-[500px] shadow-md shadow-secondary border border-secondary
    xl:max-w-7xl lg:max-w-4xl justify-start md:max-w-2xl sm:max-w-lg max-w-sm w-full flex flex-col">
      <p className="font-bold text-sm text-secondary"> Catalinskh is asking...</p>
      <h2 className="text-2xl font-bold text-primary"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, magni? </h2>
      <p className="mt-7 text-wrap"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus repellat et atque voluptatem esse quae ipsam non harum sequi a recusandae, quia numquam quod eligendi illum neque asperiores laboriosam accusamus nisi labore! Aspernatur quisquam hic, adipisci rem maxime, tempore obcaecati explicabo alias commodi illo dolorum consequuntur a unde suscipit accusamus! </p>
      <div className="category mt-6">
        <p className="font-bold flex justify-end text-primary text-sm"> Category: </p>
      </div>
    </div>
    <div className="mx-auto mb-8 p-3 flex flex-col items-center
    xl:max-w-7xl lg:max-w-4xl  md:max-w-2xl sm:max-w-lg max-w-sm">
      <div className="border justify-center grid grid-cols-8 border-primary shadow-md shadow-primary w-2/3 p-3 mt-3">
        <div className="col-span-7">
          <p className="flex font-bold text-primary text-sm"> Catalinskh is responding... </p>
          <p className="flex font-bold text-black text-sm"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim facilis illo perspiciatis magnam aliquid quidem ab, minima iure autem, voluptatem reprehenderit at! Ducimus corporis, ullam nihil ab esse aliquid commodi culpa quia temporibus non, deleniti minima consectetur mollitia soluta tempora unde, ex nobis iure sit aut quae voluptate at. Labore.  </p>
        </div>
        <div className="flex flex-col justify-center items-center font-bold col-span-1">
          <FaThumbsUp className="text-secondary cursor-pointer" size={32}/>
          <p className="font-bold text-secondary"> 0 </p>
        </div>
      </div>
    </div>
    </>

)
}

export default QuestionId