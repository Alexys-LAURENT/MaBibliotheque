import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { redirect } from 'next/navigation'
import SignInButton from "./components/SignInButton";

export default async function Login() {
  const session = await getServerSession(authOptions)

  if (session?.user.name) {
    redirect('/decouvrir')
  }

  return (<div className="w-screen h-screen flex items-center justify-center flex-col gap-4 relative overflow-hidden">
    <div className='bg-white h-56 w-56 rounded-full absolute bg-gradient-to-b from-50% from-bb_secondary to-bb_third blur-3xl opacity-70 left-10 top-32'></div>
    <div className='bg-white h-56 w-56 rounded-full absolute bg-gradient-to-b from-50% from-bb_secondary to-bb_third blur-3xl opacity-70 right-10 top-80'></div>
    <div className='bg-white h-56 w-56 rounded-full absolute bg-gradient-to-b from-50% from-bb_secondary to-bb_third blur-3xl opacity-70 left-36 top-[590px]'></div>
    <h1 className="text-bb_secondary font-bold font-literata text-4xl">Ma Malvithèque</h1>
    <h2 className="text-bb_textDark dark:text-bb_textLight font-semibold text-xl text-center">L'interface idéale pour découvrir et répertorier ses livres dans une bibliothèque virtuelle !</h2>
    <SignInButton />
  </div>)
}
