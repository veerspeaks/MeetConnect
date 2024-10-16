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
        <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 mt-4 hidden md:block'>
            <div className='p-4 bg-green-500 bg-opacity-30 text-white rounded text-center'>
                <p className='text-sm'>For <strong>Almabeter Reviewer</strong>: Please sign in with email: <strong>alice.johnson@example.com</strong> and password: <strong>hashedpassword789</strong> to be able to check completed interviews from the database.</p>
            </div>
        </div>
    </div>
  )
}

export default SignInStudent
