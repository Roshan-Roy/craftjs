import { useNode } from "@craftjs/core"
import ContentEditable from "react-contenteditable"
import { useState, useEffect } from "react"
import { Accordion, AccordionItem, Slider, RadioGroup } from "@nextui-org/react"
import CustomRadio from "../customRadio/CustomRadio"
import { ColorPicker, useColor } from "react-color-palette"
import "react-color-palette/css"
import { useFrameContext } from "../frameProvider/FrameProvider"
import Indicator from "@/components/indicator/Indicator"

const Text = ({ text, fontSize, align, weight, mt, mr, mb, ml, color }: {
    text: string;
    fontSize: number;
    align: "left" | "right" | "center" | "justify";
    weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    mt: number;
    mr: number;
    mb: number;
    ml: number;
    color: string;
}) => {
    const { connectors: { connect, drag }, actions: { setProp }, id, name, customName, isSelected, isHovered } = useNode((node) => ({
        id: node.id,
        name: node.data.name,
        customName: node.data.custom.displayName,
        isSelected: node.events.selected,
        isHovered: node.events.hovered
    }))

    const [editable, setEditable] = useState(false)
    const { onFrame } = useFrameContext()

    useEffect(() => { !isSelected && setEditable(false) }, [isSelected])

    return (
        <div ref={(ref: HTMLDivElement | null) => { if (ref) connect(drag(ref)) }} onClick={() => setEditable(true)} style={{ margin: `${mt}px ${mr}px ${mb}px ${ml}px`, }} className={`relative border border-dashed ${(onFrame && isHovered) || isSelected ? "border-primary-400" : "border-transparent"}`}>
            <Indicator id={id} name={name} customName={customName} open={(isHovered && onFrame) || isSelected} openDelete={isSelected} />
            <ContentEditable
                disabled={!editable}
                html={text}
                style={{
                    width: "100%",
                    fontSize: `${fontSize}px`,
                    textAlign: `${align}`,
                    fontWeight: `${weight}`,
                    color: `${color}`
                }}
                spellCheck={false}
                onChange={e => {
                    setProp((props: any) => {
                        if (e.target.value.length === 0) props.text = "<br>"
                        else props.text = e.target.value
                    })
                }}
            />
        </div>
    );
};


const TextSettings = () => {
    const { actions: { setProp }, fontSize, align, weight, mt, mr, mb, ml, color } = useNode((node) => ({
        fontSize: node.data.props.fontSize,
        align: node.data.props.align,
        weight: node.data.props.weight,
        mt: node.data.props.mt,
        mr: node.data.props.mr,
        mb: node.data.props.mb,
        ml: node.data.props.ml,
        color: node.data.props.color
    }));

    const [colour, setColour] = useColor(color);

    const itemClasses = {
        title: "text-sm text-default-600 font-bold",
        trigger: "py-3"
    }

    return (
        <Accordion variant="light" itemClasses={itemClasses} showDivider={false}>
            <AccordionItem key="1" aria-label="fontsize" title="Font size">
                <Slider
                    classNames={{
                        label: "text-default-600",
                        value: "text-default-600",
                        labelWrapper: "mb-1"

                    }}
                    label="In px"
                    step={1}
                    value={fontSize}
                    minValue={1}
                    onChange={(value) => { setProp((props: any) => props.fontSize = value) }}
                />
            </AccordionItem>
            <AccordionItem key="2" aria-label="align" title="Text align">
                <RadioGroup value={align} onValueChange={(value: string) => setProp((props: any) => props.align = value)}>
                    <CustomRadio value="left">Left</CustomRadio>
                    <CustomRadio value="center">Center</CustomRadio>
                    <CustomRadio value="right">Right</CustomRadio>
                    <CustomRadio value="justify">Justify</CustomRadio>
                </RadioGroup>
            </AccordionItem>
            <AccordionItem key="3" aria-label="weight" title="Weight">
                <Slider
                    step={100}
                    value={weight}
                    minValue={100}
                    maxValue={900}
                    showSteps={true}
                    onChange={(value) => { setProp((props: any) => props.weight = value) }}
                />
            </AccordionItem>
            <AccordionItem key="4" aria-label="margin" title="Margin">
                <Slider
                    classNames={{
                        labelWrapper: "mb-1",
                        label: "text-default-600",
                        value: "text-default-600"
                    }}
                    step={1}
                    value={mt}
                    minValue={0}
                    maxValue={100}
                    size="sm"
                    label="Top"
                    onChange={(value) => { setProp((props: any) => props.mt = value) }}
                />
                <Slider
                    classNames={{
                        labelWrapper: "mt-2 mb-1",
                        label: "text-default-600",
                        value: "text-default-600"
                    }}
                    step={1}
                    value={mr}
                    minValue={0}
                    maxValue={100}
                    size="sm"
                    label="Right"
                    onChange={(value) => { setProp((props: any) => props.mr = value) }}
                />
                <Slider
                    classNames={{
                        labelWrapper: "mt-2 mb-1",
                        label: "text-default-600",
                        value: "text-default-600"
                    }}
                    step={1}
                    value={mb}
                    minValue={0}
                    maxValue={100}
                    size="sm"
                    label="Bottom"
                    onChange={(value) => { setProp((props: any) => props.mb = value) }}
                />
                <Slider
                    classNames={{
                        labelWrapper: "mt-2 mb-1",
                        label: "text-default-600",
                        value: "text-default-600"
                    }}
                    step={1}
                    value={ml}
                    minValue={0}
                    maxValue={100}
                    size="sm"
                    label="Left"
                    onChange={(value) => { setProp((props: any) => props.ml = value) }}
                />
            </AccordionItem>
            <AccordionItem key="5" aria-label="color" title="Color">
                <ColorPicker color={colour} onChange={setColour} onChangeComplete={({ hex }: { hex: string }) => {
                    setProp((props: any) => props.color = hex)
                }} hideInput={["hsv"]} />
            </AccordionItem>
        </Accordion>
    )
}

Text.craft = {
    custom: {
        displayName: "Text"
    },
    related: {
        settings: TextSettings
    }
}

export default Text