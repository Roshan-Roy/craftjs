import { useNode, useEditor } from "@craftjs/core"
import { Button as NextUiButton, Checkbox, RadioGroup, Accordion, AccordionItem, cn, Input, Slider, Switch } from "@nextui-org/react"
import CustomRadio from "../customRadio/CustomRadio"
import Indicator from "@/components/indicator/Indicator"
import { useFrameContext } from "../frameProvider/FrameProvider"

const Button = ({
    text,
    size,
    radius,
    color,
    variant,
    fullWidth,
    mt,
    mr,
    mb,
    ml
}: {
    text: string;
    size: "sm" | "md" | "lg";
    radius: "sm" | "md" | "lg" | "none" | "full";
    color: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    variant: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "ghost";
    fullWidth: boolean;
    mt: number;
    mr: number;
    mb: number;
    ml: number;
}) => {
    const { actions } = useEditor()
    const { connectors: { connect, drag }, id, isHovered, isSelected, name, customName } = useNode((node) => ({
        id: node.id,
        name: node.data.name,
        customName: node.data.custom.displayName,
        isHovered: node.events.hovered,
        isSelected: node.events.selected
    }))
    const { onFrame } = useFrameContext()
    const handleBtnClick = () => actions.selectNode(id)
    return (
        <div ref={(ref: HTMLDivElement | null) => { if (ref) connect(drag(ref)) }} style={{ margin: `${mt}px ${mr}px ${mb}px ${ml}px` }} className={`relative border border-dashed ${(onFrame && isHovered) || isSelected ? "border-primary-400" : "border-transparent"} ${!fullWidth && "inline-block"}`}>
            <Indicator id={id} name={name} customName={customName} open={(isHovered && onFrame) || isSelected} openDelete={isSelected} />
            <NextUiButton
                size={size}
                radius={radius}
                color={color}
                variant={variant}
                fullWidth={fullWidth}
                onClick={handleBtnClick}
                disableAnimation><span>{text}</span></NextUiButton>
        </div>
    )
}


const ButtonSettings = () => {
    const { actions: { setProp }, text, size, radius, color, variant, fullWidth, mt, mr, mb, ml } = useNode((node) => ({
        text: node.data.props.text,
        size: node.data.props.size,
        radius: node.data.props.radius,
        color: node.data.props.color,
        variant: node.data.props.variant,
        fullWidth: node.data.props.fullWidth,
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
                <Input type="text" placeholder="Text" value={text} onValueChange={(value) => setProp((props: any) => props.text = value)} classNames={{ input: ["pl-1"] }} />
            </AccordionItem>
            <AccordionItem key="2" aria-label="customize" title="Size">
                <RadioGroup value={size} onValueChange={(value: string) => setProp((props: any) => props.size = value)}>
                    <CustomRadio value="sm">Small</CustomRadio>
                    <CustomRadio value="md">Medium</CustomRadio>
                    <CustomRadio value="lg">Large</CustomRadio>
                </RadioGroup>
            </AccordionItem>
            <AccordionItem key="3" aria-label="radius" title="Radius">
                <RadioGroup value={radius} onValueChange={(value: string) => setProp((props: any) => props.radius = value)}>
                    <CustomRadio value="none">None</CustomRadio>
                    <CustomRadio value="sm">Small</CustomRadio>
                    <CustomRadio value="md">Medium</CustomRadio>
                    <CustomRadio value="lg">Large</CustomRadio>
                    <CustomRadio value="full">Full</CustomRadio>
                </RadioGroup>
            </AccordionItem>
            <AccordionItem key="4" aria-label="color" title="Color">
                <RadioGroup value={color} onValueChange={(value: string) => setProp((props: any) => props.color = value)}>
                    <CustomRadio value="default">Default</CustomRadio>
                    <CustomRadio value="primary">Primary</CustomRadio>
                    <CustomRadio value="secondary">Secondary</CustomRadio>
                    <CustomRadio value="success">Success</CustomRadio>
                    <CustomRadio value="warning">Warning</CustomRadio>
                    <CustomRadio value="danger">Danger</CustomRadio>
                </RadioGroup>
            </AccordionItem>
            <AccordionItem key="5" aria-label="variant" title="Variant">
                <RadioGroup value={variant} onValueChange={(value: string) => setProp((props: any) => props.variant = value)}>
                    <CustomRadio value="solid">Solid</CustomRadio>
                    <CustomRadio value="bordered">Bordered</CustomRadio>
                    <CustomRadio value="light">Light</CustomRadio>
                    <CustomRadio value="flat">Flat</CustomRadio>
                    <CustomRadio value="faded">Faded</CustomRadio>
                    <CustomRadio value="shadow">Shadow</CustomRadio>
                    <CustomRadio value="ghost">Ghost</CustomRadio>
                </RadioGroup>
            </AccordionItem>
            <AccordionItem key="6" aria-label="margin" title="Margin">
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
            <AccordionItem key="7" aria-label="fullwidth" title="Full width">
                <Switch isSelected={fullWidth} aria-label="fullwidth" size="sm" classNames={{
                    base: cn(
                        "flex justify-between flex-row-reverse max-w-[300px] p-2 pl-4 m-0 rounded-lg hover:bg-default-100",
                    ),
                }} onValueChange={(value) => setProp((props: any) => props.fullWidth = value)}>
                    <span className="text-sm text-default-600">Fullwidth</span>
                </Switch>
            </AccordionItem>
        </Accordion>
    )
}

Button.craft = {
    custom: {
        displayName: "Button"
    },
    related: {
        settings: ButtonSettings
    }
}


export default Button