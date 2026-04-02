import React from 'react'

interface Props {
    heading: string,
    content: string,


    
}
let index = 1
const Content:React.FC<Props> = ({heading, content}: Props) => {
  return (
    <div>
      <h3 className="text-xl "> {index++}. {heading}</h3>
      <p className="text-lg text-[#475467]">{content}</p>
    </div>
  )
}

export default Content
