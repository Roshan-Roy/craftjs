import { useNode } from "@craftjs/core"
import { Accordion, AccordionItem, Slider, Input as NextInput, RadioGroup, Code as NextUiCode } from "@nextui-org/react"
import CustomRadio from "../customRadio/CustomRadio"
import Indicator from "@/components/indicator/Indicator"
import { useFrameContext } from "../frameProvider/FrameProvider"

const Code = ({
    text,
    size,
    color,
    radius,
    mt,
    mr,
    mb,
    ml
}: {
    text: string;
    size: "sm" | "md" | "lg";
    color: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    radius: "none" | "sm" | "md" | "lg" | "full";
    mt: number;
    mr: number;
    mb: number;
    ml: number;
}) => {

    const { connectors: { connect, drag }, id, name, customName, isHovered, isSelected } = useNode((node) => ({
        id: node.id,
        name: node.data.name,
        customName: node.data.custom.displayName,
        isHovered: node.events.hovered,
        isSelected: node.events.selected
    }))

    const { onFrame } = useFrameContext()

    return (
        <div ref={(ref: HTMLDivElement | null) => { if (ref) connect(drag(ref)) }} className={`relative inline-block border border-dashed ${(onFrame && isHovered) || isSelected ? "border-primary-400" : "border-transparent"}`} style={{ margin: `${mt}px ${mr}px ${mb}px ${ml}px` }}>
            <Indicator id={id} name={name} customName={customName} open={(isHovered && onFrame) || isSelected} openDelete={isSelected} />
            <NextUiCode
                size={size}
                color={color}
                radius={radius}
            >{text}</NextUiCode>
        </div>
    )
}

const CodeSettings = () => {
    const { actions: { setProp }, text, size, color, radius, mt, mr, mb, ml } = useNode((node) => ({
        text: node.data.props.text,
        size: node.data.props.size,
        color: node.data.props.color,
        radius: node.data.props.radius,
        mt: node.data.props.mt,
        mr: node.data.props.mr,
        mb: node.data.props.mb,
        ml: node.data.props.ml
    }));
    const itemClasses = {
        title: "text-sm text-default-600 font-bold",
        trigger: "py-3"
    }
    return (
        <Accordion variant="light" itemClasses={itemClasses} showDivider={false}>
            <AccordionItem key="1" aria-label="text" title="Text">
                <NextInput type="text" placeholder="Text" value={text} onValueChange={(value) => setProp((props: any) => props.text = value)} classNames={{ input: ["pl-1"] }} />
            </AccordionItem>
            <AccordionItem key="2" aria-label="size" title="Size">
                <RadioGroup value={size} onValueChange={(value: string) => setProp((props: any) => props.size = value)}>
                    <CustomRadio value="sm">Small</CustomRadio>
                    <CustomRadio value="md">Medium</CustomRadio>
                    <CustomRadio value="lg">Large</CustomRadio>
                </RadioGroup>
            </AccordionItem>
            <AccordionItem key="3" aria-label="color" title="Color">
                <RadioGroup value={color} onValueChange={(value: string) => setProp((props: any) => props.color = value)}>
                    <CustomRadio value="default">Default</CustomRadio>
                    <CustomRadio value="primary">Primary</CustomRadio>
                    <CustomRadio value="secondary">Secondary</CustomRadio>
                    <CustomRadio value="success">Success</CustomRadio>
                    <CustomRadio value="warning">Warning</CustomRadio>
                    <CustomRadio value="danger">Danger</CustomRadio>
                </RadioGroup>
            </AccordionItem>
            <AccordionItem key="4" aria-label="radius" title="Radius">
                <RadioGroup value={radius} onValueChange={(value: string) => setProp((props: any) => props.radius = value)}>
                    <CustomRadio value="none">None</CustomRadio>
                    <CustomRadio value="sm">Small</CustomRadio>
                    <CustomRadio value="md">Medium</CustomRadio>
                    <CustomRadio value="lg">Large</CustomRadio>
                    <CustomRadio value="full">Full</CustomRadio>
                </RadioGroup>
            </AccordionItem>
            <AccordionItem key="5" aria-label="margin" title="Margin">
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
                    defaultValue={mr}
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
                    defaultValue={mb}
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
                    defaultValue={ml}
                    minValue={0}
                    maxValue={100}
                    size="sm"
                    label="Left"
                    onChange={(value) => { setProp((props: any) => props.ml = value) }}
                />
            </AccordionItem>
        </Accordion>
    )
}

Code.craft = {
    custom: {
        displayName: "Code"
    },
    related: {
        settings: CodeSettings
    }
}


export default Code