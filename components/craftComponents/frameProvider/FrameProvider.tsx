import { useState, createContext, useContext } from "react"

interface FrameContextType {
    onFrame: boolean;
    setOnFrame: React.Dispatch<React.SetStateAction<boolean>>;
}

const Frame = createContext<FrameContextType | null>(null);

const FrameProvider = ({ children }: {
    children: React.ReactNode
}) => {
    const [onFrame, setOnFrame] = useState(false)
    return (
        <Frame.Provider value={{ onFrame, setOnFrame }}>
            {children}
        </Frame.Provider>
    )
}

export default FrameProvider

export const useFrameContext = () => {
    const context = useContext(Frame)
    if (!context) throw new Error()
    return context
}