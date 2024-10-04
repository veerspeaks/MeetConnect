import SignIn from '../components/SignIn'
import homeGif from '../assets/home.gif'

const SignInStudent = () => {
  return (
    <div className='bg-[#222831] h-screen flex flex-col items-center md:flex-row'>
        <div className='flex flex-col md:w-1/2 items-center justify-center gap-14'>
            <span className='text-4xl md:text-7xl text-[#FFD369] font-bold '>{`<MeetConnect />`}</span>
            <img src={homeGif} alt="Taxi Data Image" className='h-40 w-40 md:h-80 md:w-80 '/>
        </div>
        <div className='flex w-full md:w-1/2 items-center justify-center'>
            <SignIn />
        </div>
    </div>
  )
}

export default SignInStudent