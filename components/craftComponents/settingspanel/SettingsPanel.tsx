import { useEditor } from "@craftjs/core"
import { createElement } from "react"
import { Accordion, AccordionItem } from "@nextui-org/react"
import { BsFillLayersFill } from "react-icons/bs"
import { FaPenSquare } from "react-icons/fa"
import NothingSelected from "./NothingSelected"
import { Layers } from "@craftjs/layers"
import { useFrameContext } from "../frameProvider/FrameProvider"


const SettingsPanel = () => {
    const { selected } = useEditor((state) => {
        const [currentNodeId]: any = state.events.selected;
        let selected;

        if (currentNodeId) {
            selected = {
                settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings,
            };
        }
        return {
            selected
        }
    });

    const { setOnFrame } = useFrameContext()

    const itemClasses = {
        title: "text-xs text-default-600",
        trigger: "gap-4 py-4"
    }
    return (
        <Accordion variant="light" itemClasses={itemClasses}>
            <AccordionItem key="1" aria-label="customize" startContent={<FaPenSquare className="text-default-600" />} title="CUSTOMIZE">
                {selected ? (selected.settings && createElement(selected.settings)) : <NothingSelected />}
            </AccordionItem>
            <AccordionItem key="2" aria-label="layers" startContent={<BsFillLayersFill className="text-default-600" />} title="LAYERS" className="border-b-1">
                <div onMouseEnter={() => setOnFrame(true)} onMouseLeave={() => setOnFrame(false)}><Layers /></div>
            </AccordionItem>
        </Accordion >
    )
}

export default SettingsPanel