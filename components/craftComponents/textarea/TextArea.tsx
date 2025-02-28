import { useNode } from "@craftjs/core"
import { Accordion, AccordionItem, Slider, Textarea as NextTextarea, Input, RadioGroup } from "@nextui-org/react"
import CustomRadio from "../customRadio/CustomRadio"
import Indicator from "@/components/indicator/Indicator"
import { useFrameContext } from "../frameProvider/FrameProvider"

const TextArea = ({
    variant,
    radius,
    minRows,
    maxRows,
    placeholder,
    description,
    label,
    labelPlacement,
    mt,
    mr,
    mb,
    ml
}: {
    variant: "flat" | "bordered" | "faded" | "underlined";
    radius: "sm" | "md" | "lg" | "none" | "full";
    minRows: number;
    maxRows: number;
    placeholder: string;
    description: string;
    label: string;
    labelPlacement: "inside" | "outside" | "outside-left";
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
        <div ref={(ref: HTMLDivElement | null) => { if (ref) connect(drag(ref)) }} className={`relative w-full ${labelPlacement === "outside-left" && "inline-block"} border border-dashed ${(onFrame && isHovered) || isSelected ? "border-primary-400" : "border-transparent"}`} style={{ margin: `${mt}px ${mr}px ${mb}px ${ml}px` }}>
            <Indicator id={id} name={name} customName={customName} open={(isHovered && onFrame) || isSelected} openDelete={isSelected} />
            <NextTextarea
                variant={variant}
                radius={radius}
                placeholder={placeholder}
                description={description}
                label={label}
                labelPlacement={labelPlacement}
                minRows={minRows}
                maxRows={maxRows}
            />
        </div>
    )
}

const TextAreaSettings = () => {
    const { actions: { setProp }, variant, radius, minRows, maxRows, placeholder, description, label, labelPlacement, mt, mr, mb, ml } = useNode((node) => ({
        variant: node.data.props.variant,
        radius: node.data.props.radius,
        minRows: node.data.props.minRows,
        maxRows: node.data.props.maxRows,
        placeholder: node.data.props.placeholder,
        description: node.data.props.description,
        label: node.data.props.label,
        labelPlacement: node.data.props.labelPlacement,
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
            <AccordionItem key="1" aria-label="variant" title="Variant">
                <RadioGroup value={variant} onValueChange={(value: string) => setProp((props: any) => props.variant = value)}>
                    <CustomRadio value="flat">Flat</CustomRadio>
                    <CustomRadio value="bordered">Bordered</CustomRadio>
                    <CustomRadio value="faded">Faded</CustomRadio>
                    <CustomRadio value="underlined">Underlined</CustomRadio>
                </RadioGroup>
            </AccordionItem>
            <AccordionItem key="2" aria-label="radius" title="Radius">
                <RadioGroup value={radius} onValueChange={(value: string) => setProp((props: any) => props.radius = value)}>
                    <CustomRadio value="none">None</CustomRadio>
                    <CustomRadio value="sm">Small</CustomRadio>
                    <CustomRadio value="md">Medium</CustomRadio>
                    <CustomRadio value="lg">Large</CustomRadio>
                    <CustomRadio value="full">Full</CustomRadio>
                </RadioGroup>
            </AccordionItem>
            <AccordionItem key="3" aria-label="rows" title="Rows">
                <Slider
                    classNames={{
                        labelWrapper: "mb-1",
                        label: "text-default-600",
                        value: "text-default-600"
                    }}
                    step={1}
                    value={minRows}
                    minValue={1}
                    maxValue={10}
                    size="sm"
                    label="Min rows"
                    onChange={(value) => {
                        setProp((props: any) => {
                            props.minRows = value;
                            props.maxRows = value as number + 1;
                        })
                    }}
                />
                <Slider
                    classNames={{
                        labelWrapper: "mt-2 mb-1",
                        label: "text-default-600",
                        value: "text-default-600"
                    }}
                    step={1}
                    value={maxRows}
                    minValue={minRows + 1}
                    maxValue={50}
                    size="sm"
                    label="Max rows"
                    onChange={(value) => { setProp((props: any) => props.maxRows = value) }}
                />
            </AccordionItem>
            <AccordionItem key="4" aria-label="placeholder" title="Placeholder">
                <Input type="text" placeholder="Placeholder" value={placeholder} onValueChange={(value) => setProp((props: any) => props.placeholder = value)} classNames={{ input: ["pl-1"] }} />
            </AccordionItem>
            <AccordionItem key="5" aria-label="description" title="Description">
                <Input type="text" placeholder="Description" value={description} onValueChange={(value) => setProp((props: any) => props.description = value)} classNames={{ input: ["pl-1"] }} />
            </AccordionItem>
            <AccordionItem key="6" aria-label="label" title="Label">
                <Input type="text" placeholder="Label" value={label} onValueChange={(value) => setProp((props: any) => props.label = value)} classNames={{ input: ["pl-1"] }} />
            </AccordionItem>
            <AccordionItem key="7" aria-label="labelplacement" title="Label Placement">
                <RadioGroup value={labelPlacement} onValueChange={(value: string) => setProp((props: any) => props.labelPlacement = value)}>
                    <CustomRadio value="inside">Inside</CustomRadio>
                    <CustomRadio value="outside">Outside</CustomRadio>
                    <CustomRadio value="outside-left">Outside Left</CustomRadio>
                </RadioGroup>
            </AccordionItem>
            <AccordionItem key="8" aria-label="margin" title="Margin">
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

TextArea.craft = {
    custom: {
        displayName: "Textarea"
    },
    related: {
        settings: TextAreaSettings
    }
}


export default TextArea