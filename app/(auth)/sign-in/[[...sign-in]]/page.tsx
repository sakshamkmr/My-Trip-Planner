import { SignIn } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="min-h-screen w-full flex justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4">
      <div className="w-full max-w-md mt-24">
        <SignIn />
      </div>
    </div>
  )
}
