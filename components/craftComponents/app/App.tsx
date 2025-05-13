import { useNode, useEditor } from "@craftjs/core"
import { Accordion, AccordionItem, Slider } from "@nextui-org/react"
import { useColor, ColorPicker } from "react-color-palette"
import { useRef } from "react"
import { useFrameContext } from "../frameProvider/FrameProvider"
import Indicator from "@/components/indicator/Indicator"

const App = ({ children, pt, pr, pb, pl, backgroundColor }: {
    children: React.ReactNode,
    pt: number;
    pr: number;
    pb: number;
    pl: number;
    backgroundColor: string;
}) => {
    const { connectors: { connect, drag }, id, name, customName, isHovered, isSelected } = useNode((node) => ({
        id: node.id,
        name: node.data.name,
        customName: node.data.custom.displayName,
        isHovered: node.events.hovered,
        isSelected: node.events.selected
    }))

    const { onFrame, setOnFrame } = useFrameContext()

    return (
        <div ref={(ref: HTMLDivElement | null) => { if (ref) connect(drag(ref)) }} style={{ padding: `${pt}px ${pr}px ${pb}px ${pl}px`, backgroundColor: `${backgroundColor}`, width: "85%", margin: "0 auto" }} className={`relative border ${((isHovered && onFrame) || isSelected) ? "border-primary-400" : "border-transparent"} border-dashed`} onMouseEnter={() => setOnFrame(true)} onMouseLeave={() => setOnFrame(false)}>
            <Indicator id={id} name={name} customName={customName} open={(isHovered && onFrame) || isSelected} openDelete={isSelected} />
            {children}
        </div>
    )
}

const AppSettings = () => {
    const { actions: { setProp }, pt, pr, pb, pl, backgroundColor } = useNode((node) => ({
        pt: node.data.props.pt,
        pr: node.data.props.pr,
        pb: node.data.props.pb,
        pl: node.data.props.pl,
        backgroundColor: node.data.props.backgroundColor
    }));

    const [colour, setColour] = useColor(backgroundColor)

    const itemClasses = {
        title: "text-sm text-default-600 font-bold",
        trigger: "py-3"
    }

    return (
        <Accordion variant="light" itemClasses={itemClasses} showDivider={false}>
            <AccordionItem key="1" aria-label="padding" title="Padding">
                <Slider
                    classNames={{
                        labelWrapper: "mb-1",
                        label: "text-default-600",
                        value: "text-default-600"
                    }}
                    step={1}
                    value={pt}
                    minValue={0}
                    maxValue={100}
                    size="sm"
                    label="Top"
                    onChange={(value) => { setProp((props: any) => props.pt = value) }}
                />
                <Slider
                    classNames={{
                        labelWrapper: "mt-2 mb-1",
                        label: "text-default-600",
                        value: "text-default-600"
                    }}
                    step={1}
                    value={pr}
                    minValue={0}
                    maxValue={100}
                    size="sm"
                    label="Right"
                    onChange={(value) => { setProp((props: any) => props.pr = value) }}
                />
                <Slider
                    classNames={{
                        labelWrapper: "mt-2 mb-1",
                        label: "text-default-600",
                        value: "text-default-600"
                    }}
                    step={1}
                    value={pb}
                    minValue={0}
                    maxValue={100}
                    size="sm"
                    label="Bottom"
                    onChange={(value) => { setProp((props: any) => props.pb = value) }}
                />
                <Slider
                    classNames={{
                        labelWrapper: "mt-2 mb-1",
                        label: "text-default-600",
                        value: "text-default-600"
                    }}
                    step={1}
                    value={pl}
                    minValue={0}
                    maxValue={100}
                    size="sm"
                    label="Left"
                    onChange={(value) => { setProp((props: any) => props.pl = value) }}
                />
            </AccordionItem>
            <AccordionItem key="2" aria-label="backgroundColor" title="Background">
                <ColorPicker color={colour} onChange={setColour} onChangeComplete={({ hex }: { hex: string }) => {
                    setProp((props: any) => props.backgroundColor = hex)
                }} hideInput={["hsv"]} />
            </AccordionItem>
        </Accordion>
    )
}

App.craft = {
    custom: {
        displayName: "App"
    },
    related: {
        settings: AppSettings
    }
}


export default App