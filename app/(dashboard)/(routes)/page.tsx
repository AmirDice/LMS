import { UserButton } from "@clerk/nextjs"

export default function Home() {
    return (
        <div>
            <UserButton
            afterSignOutUrl="/"/>
            <p>you are logged in</p>
        </div>
    )
}