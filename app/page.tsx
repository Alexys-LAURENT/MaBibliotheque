import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { redirect } from 'next/navigation'
import SignInButton from "./components/SignInButton";

export default async function Login() {
  const session = await getServerSession(authOptions)

  if (session?.user.name) {
    redirect('/decouvrir')
  }

  return (<div className="w-screen h-screen flex items-center justify-center flex-col gap-4">
    <h1 className="text-bb_secondary font-bold font-literata text-4xl">Ma Malvithèque</h1>
    <h2 className="text-bb_text font-semibold text-xl text-center">L'interface idéale pour découvrir et répertorier ses livres dans une bibliothèque virtuelle !</h2>
    <SignInButton />
  </div>)
}
