import { useEditor } from "@craftjs/core"

const FrameWrapper = ({ children }: {
    children: React.ReactNode
}) => {
    const { actions } = useEditor()
    const handleClick = (e: any) => {
        if (e.target.id === "wrapper") actions.clearEvents()
    }
    return (
        <div id="wrapper" style={{ flex: 1, padding: "40px 0 50px 0" }} className="overflow-auto scrollbar-thin scrollbar-track-default-100 scrollbar-thumb-default-300" onClick={handleClick}>
            {children}
        </div>
    )
}

export default FrameWrapper