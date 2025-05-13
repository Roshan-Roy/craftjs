"use client"

import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { useState } from "react"
import { Button } from "@nextui-org/react"

const GoogleSigninBtn = () => {
    const [clicked, setClicked] = useState(false)
    const handleClick = () => {
        setClicked(true)
        if (!clicked)
            signIn("google", {
                callbackUrl: DEFAULT_LOGIN_REDIRECT
            })
    }
    return (
        <Button
            className="bg-white gap-5"
            radius="full"
            isLoading={clicked}
            startContent={!clicked && <FcGoogle className="text-3xl" />}
            size="lg"
            onClick={handleClick}
            disableRipple>
            Sign in with google
        </Button>
    )
}

export default GoogleSigninBtn