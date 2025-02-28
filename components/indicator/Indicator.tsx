import { useRef } from "react"
import { useEditor } from "@craftjs/core"
import { RiDeleteBin6Line } from "react-icons/ri"

const Indicator = ({ id, name, customName, open, openDelete }: {
    id: string;
    name: string;
    customName: string;
    open: boolean;
    openDelete: boolean;
}) => {
    const { actions, query: { node } } = useEditor()
    return open ? <div className={`absolute z-50 flex bg-primary-500 -translate-y-full text-white text-xs rounded-t-md justify-center items-center pl-3 gap-2 ${openDelete && id !== "ROOT" ? "pr-2" : "pr-3"}`} style={{ top: -2, left: -1, height: "30px" }}>
        <span>{customName === "<br>" ? "" : customName === "" ? name : customName}</span>
        {(openDelete && node(id).isDeletable()) && <RiDeleteBin6Line className="text-sm cursor-pointer" onClick={() => actions.delete(id) } />}
    </div> : null
}

export default Indicator
