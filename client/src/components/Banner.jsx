

const Banner = ({user}) => {
  return (
    <div className="bg-[#222831] w-full h-64 items-center flex justify-center gap-2">
        <span className="text-[#FFD369] text-5xl md:text-8xl "> Hi, </span> 
        <span className="text-white text-2xl md:text-6xl ">{user}! </span> 
        </div>
  )
}

export default Banner
