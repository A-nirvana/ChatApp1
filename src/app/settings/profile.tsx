import { User } from "firebase/auth";

export function profile(user: User, setView: Function) {
    return (
      <>
        <div className='flex bg-[#ff983295] p-8 rounded-2xl ml-5'>
          <button className='absolute rounded-full bg-red-600 start-8 top-4 h-6 w-6' onClick={() => {
            setView(false);
          }}>{"<"}</button>
          <div className='flex flex-col justify-center items-center mr-8'>
            <img src={user.photoURL || undefined} className=' h-20 rounded-full border-2' />
            <p className=' font-semibold text-xl'>{user.displayName}</p>
          </div>
          <div className='flex flex-col'>
            <p className='text-lg font-semibold'>{user.email}</p>
            <p>Verified {user.emailVerified ? "Yes" : "No"}</p>
            <p className=''>Online</p>
            <button className='border-2 rounded py-1 px-2 mt-8 self-end bg-[#3b4bc8c4]'>Edit Profile</button>
          </div>
        </div>
      </>
    )
  }
  