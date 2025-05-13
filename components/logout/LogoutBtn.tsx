"use client"

import { signOut } from "next-auth/react"
import { useState } from "react"
import { IoMdLogOut } from "react-icons/io"
import { Link } from "@nextui-org/react"
import { Button } from "@nextui-org/react"

const LogOutBtn = () => {
    const [clicked, setClicked] = useState(false)
    const handleClick = () => {
        setClicked(true)
        if (!clicked)
            signOut()
    }
    return (
        <>
            <Link href="/projects" underline="hover">Go To Projects</Link>
            <Button
                className="gap-4"
                color="primary"
                isLoading={clicked}
                onClick={handleClick}
                radius="full"
                size="lg"
                startContent={!clicked && <IoMdLogOut className="text-xl" />}
                disableRipple>
                Logout
            </Button>
        </>
    )
}

export default LogOutBtn