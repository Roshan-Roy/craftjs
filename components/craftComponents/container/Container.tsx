import { Resizable } from "re-resizable"
import { useNode, useEditor } from "@craftjs/core"
import { Slider, Accordion, AccordionItem, RadioGroup, Input, Select, SelectItem } from "@nextui-org/react"
import CustomRadio from "../customRadio/CustomRadio"
import { useFrameContext } from "../frameProvider/FrameProvider"
import { RiDeleteBin6Line } from "react-icons/ri"
import { IoMoveSharp } from "react-icons/io5"
import { useColor, ColorPicker } from "react-color-palette"


const Container = ({
    children,
    pixelWidth,
    autoHeight,
    widthInPx,
    heightInPx,
    widthInPercentage,
    backgroundColor,
    borderWidth,
    radius,
    shadow,
    flexDirection,
    justifyContent,
    alignItems,
    pt,
    pr,
    pb,
    pl,
    mt,
    mr,
    mb,
    ml
}: {
    children?: React.ReactNode;
    pixelWidth: boolean;
    autoHeight: boolean;
    widthInPercentage: number;
    widthInPx: number;
    heightInPx: number;
    backgroundColor: string;
    borderWidth: "border-0" | "border-2" | "border-4" | "border-8";
    radius: "rounded-none" | "rounded-md" | "rounded-lg" | "rounded-xl" | "rounded-full";
    shadow: "shadow-md" | "shadow-lg" | "shadow-xl" | "shadow-none";
    flexDirection: "flex-row" | "flex-col";
    justifyContent: "justify-start" | "justify-end" | "justify-center" | "justify-between" | "justify-around" | "justify-evenly";
    alignItems: "items-start" | "items-end" | "items-center";
    pt: number;
    pr: number;
    pb: number;
    pl: number;
    mt: number;
    mr: number;
    mb: number;
    ml: number;
}) => {
    const { actions, query: { node } } = useEditor()
    const { connectors: { connect, drag }, actions: { setProp }, id, name, customName, isHovered, isSelected } = useNode((node) => ({
        id: node.id,
        name: node.data.name,
        customName: node.data.custom.displayName,
        isSelected: node.events.selected,
        isHovered: node.events.hovered,
    }))
    const { onFrame } = useFrameContext()
    return (
        <Resizable
            enable={!isSelected ? false : undefined}
            size={pixelWidth ? {
                width: widthInPx,
                height: `${autoHeight ? "auto" : heightInPx}`,
            } : {
                width: `${widthInPercentage}%`,
                height: `${autoHeight ? "auto" : heightInPx}`
            }}
            onResizeStop={(e, direction, ref, d) => {
                setProp((props: any) => {
                    if (pixelWidth)
                        props.widthInPx = props.widthInPx + d.width;
                    if (!autoHeight)
                        props.heightInPx = props.heightInPx + d.height;
                });
            }}
            maxWidth={1500}
            maxHeight={1500}
            minHeight={0}
            minWidth={0}
            className={`relative border border-dashed ${(onFrame && isHovered) || isSelected ? "border-primary-400" : "border-transparent"}`}
            ref={(instance: Resizable | null) => {
                if (instance) {
                    const domNode = instance.resizable as HTMLDivElement;
                    if (domNode) connect(domNode);
                }
            }}
            style={{
                margin: `${mt}px ${mr}px ${mb}px ${ml}px`
            }}>
            {((isHovered && onFrame) || isSelected) && <div className={`absolute z-50 flex bg-primary-500 -translate-y-full text-white text-xs rounded-t-md justify-center items-center pl-3 ${isSelected ? "pr-2" : "pr-3"} gap-2`} style={{ top: -2, left: -1, height: "30px" }}>
                <span>{customName === "<br>" ? "" : customName === "" ? name : customName}</span>
                {isSelected && <>
                    <span ref={(ref: HTMLSpanElement | null) => { if (ref) drag(ref) }}><IoMoveSharp className="text-xs cursor-move" /></span>
                    {node(id).isDeletable() && <RiDeleteBin6Line className="text-sm cursor-pointer" onClick={() => actions.delete(id)} />}</>}
            </div>}
            {isSelected && <><div className=" absolute z-50 left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white border-2 border-primary-400 rounded-full"></div>
                <div className="absolute z-50 left-0 bottom-0 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white border-2 border-primary-400 rounded-full"></div>
                <div className="absolute z-50 right-0 top-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white border-2 border-primary-400 rounded-full"></div>
                <div className="absolute z-50 right-0 bottom-0 translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white border-2 border-primary-400 rounded-full"></div></>}
            <div style={{
                width: "100%",
                height: "100%",
                padding: `${pt}px ${pr}px ${pb}px ${pl}px`,
                backgroundColor,
            }} className={`flex ${flexDirection} ${justifyContent} ${alignItems} ${radius} ${shadow} ${borderWidth}`}>
                {children}
            </div>
        </Resizable>
    )
}


const ContainerSettings = () => {
    const { actions: { setProp }, flexDirection, justifyContent, alignItems, pixelWidth, autoHeight, widthInPx, heightInPx, widthInPercentage, backgroundColor, borderWidth, radius, shadow, pt, pr, pb, pl, mt, mr, mb, ml } = useNode((node) => ({
        flexDirection: node.data.props.flexDirection,
        justifyContent: node.data.props.justifyContent,
        alignItems: node.data.props.alignItems,
        pixelWidth: node.data.props.pixelWidth,
        autoHeight: node.data.props.autoHeight,
        widthInPx: node.data.props.widthInPx,
        heightInPx: node.data.props.heightInPx,
        widthInPercentage: node.data.props.widthInPercentage,
        backgroundColor: node.data.props.backgroundColor,
        borderWidth: node.data.props.borderWidth,
        radius: node.data.props.radius,
        shadow: node.data.props.shadow,
        pt: node.data.props.pt,
        pr: node.data.props.pr,
        pb: node.data.props.pb,
        pl: node.data.props.pl,
        mt: node.data.props.mt,
        mr: node.data.props.mr,
        mb: node.data.props.mb,
        ml: node.data.props.ml
    }));
    const [colour, setColour] = useColor(backgroundColor)
    const itemClasses = {
        title: "text-sm text-default-600 font-bold",
        trigger: "py-3"
    }
    return (
        <Accordion variant="light" itemClasses={itemClasses} showDivider={false}>
            <AccordionItem key="1" aria-label="alignment" title="Alignment">
                <div className="flex flex-col gap-5">
                    <RadioGroup label="Flex direction" value={flexDirection} onValueChange={(value: string) => setProp((props: any) => props.flexDirection = value)}>
                        <CustomRadio value="flex-row">Row</CustomRadio>
                        <CustomRadio value="flex-col">Column</CustomRadio>
                    </RadioGroup>
                    <RadioGroup label="Justify content" value={justifyContent} onValueChange={(value: string) => setProp((props: any) => props.justifyContent = value)}>
                        <CustomRadio value="justify-start">Start</CustomRadio>
                        <CustomRadio value="justify-center">Center</CustomRadio>
                        <CustomRadio value="justify-end">End</CustomRadio>
                        <CustomRadio value="justify-between">Between</CustomRadio>
                        <CustomRadio value="justify-around">Around</CustomRadio>
                        <CustomRadio value="justify-evenly">Evenly</CustomRadio>
                    </RadioGroup>
                    <RadioGroup label="Align items" value={alignItems} onValueChange={(value: string) => setProp((props: any) => props.alignItems = value)}>
                        <CustomRadio value="items-start">Start</CustomRadio>
                        <CustomRadio value="items-center">Center</CustomRadio>
                        <CustomRadio value="items-end">End</CustomRadio>
                    </RadioGroup>
                </div>
            </AccordionItem>
            <AccordionItem key="2" aria-label="dimensions" title="Dimensions">
                <div className="flex flex-col gap-3 py-2">
                    <div className="flex justify-between items-center">
                        <div className="text-sm">Width</div>
                        <Select selectedKeys={pixelWidth ? ["px"] : ["%"]} size="sm" classNames={{
                            base: "w-20"
                        }} onSelectionChange={(value) => setProp((props: any) => value.currentKey === "px" ? props.pixelWidth = true : props.pixelWidth = false)} aria-label="width" disallowEmptySelection>
                            <SelectItem key="px">Px</SelectItem>
                            <SelectItem key="%">%</SelectItem>
                        </Select>
                    </div>
                    {
                        pixelWidth ? <Slider
                            aria-label="w-px"
                            value={widthInPx}
                            onChange={(value) => setProp((props: any) => props.widthInPx = value)}
                            showTooltip={true}
                            className="max-w-md"
                            size="sm"
                            maxValue={1500}
                            minValue={0}
                            step={1}
                        /> : <Slider
                            aria-label="w-%"
                            value={widthInPercentage}
                            onChange={(value) => setProp((props: any) => props.widthInPercentage = value)}
                            showTooltip={true}
                            className="max-w-md"
                            size="sm"
                            maxValue={100}
                            minValue={0}
                            step={1}
                        />
                    }
                </div>
                <div className="flex flex-col gap-3 py-2">
                    <div className="flex justify-between items-center">
                        <div className="text-sm">Height</div>
                        <Select selectedKeys={autoHeight ? ["auto"] : ["px"]} size="sm" classNames={{
                            base: "w-20"
                        }} onSelectionChange={(value) => setProp((props: any) => value.currentKey === "auto" ? props.autoHeight = true : props.autoHeight = false)} aria-label="height" disallowEmptySelection>
                            <SelectItem key="px">Px</SelectItem>
                            <SelectItem key="auto">Auto</SelectItem>
                        </Select>
                    </div>
                    {!autoHeight && <Slider
                        aria-label="w-px"
                        isDisabled={autoHeight}
                        value={heightInPx}
                        onChange={(value) => setProp((props: any) => props.heightInPx = value)}
                        showTooltip={true}
                        className="max-w-md"
                        size="sm"
                        maxValue={1500}
                        minValue={0}
                        step={1}
                    />}
                </div>
            </AccordionItem>
            <AccordionItem key="3" aria-label="backgroundColor" title="Background">
                <ColorPicker color={colour} onChange={setColour} onChangeComplete={({ hex }: { hex: string }) => {
                    setProp((props: any) => props.backgroundColor = hex)
                }} hideInput={["hsv"]} />
            </AccordionItem>
            <AccordionItem key="4" aria-label="borderwidth" title="Border width">
                <RadioGroup value={borderWidth} onValueChange={(value: string) => setProp((props: any) => props.borderWidth = value)}>
                    <CustomRadio value="border-0">None</CustomRadio>
                    <CustomRadio value="border-2">Small</CustomRadio>
                    <CustomRadio value="border-4">Medium</CustomRadio>
                    <CustomRadio value="border-8">Large</CustomRadio>
                </RadioGroup>
            </AccordionItem>
            <AccordionItem key="5" aria-label="radius" title="Radius">
                <RadioGroup value={radius} onValueChange={(value: string) => setProp((props: any) => props.radius = value)}>
                    <CustomRadio value="rounded-none">None</CustomRadio>
                    <CustomRadio value="rounded-md">Small</CustomRadio>
                    <CustomRadio value="rounded-lg">Medium</CustomRadio>
                    <CustomRadio value="rounded-xl">Large</CustomRadio>
                    <CustomRadio value="rounded-full">Full</CustomRadio>
                </RadioGroup>
            </AccordionItem>
            <AccordionItem key="6" aria-label="shadow" title="Shadow">
                <RadioGroup value={shadow} onValueChange={(value: string) => setProp((props: any) => props.shadow = value)}>
                    <CustomRadio value="shadow-none">None</CustomRadio>
                    <CustomRadio value="shadow-md">Small</CustomRadio>
                    <CustomRadio value="shadow-lg">Medium</CustomRadio>
                    <CustomRadio value="shadow-xl">Large</CustomRadio>
                </RadioGroup>
            </AccordionItem>
            <AccordionItem key="7" aria-label="padding" title="Padding">
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
            <AccordionItem key="2" aria-label="margin" title="Margin">
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
        </Accordion >
    )
}

Container.craft = {
    custom: {
        displayName: "Container"
    },
    related: {
        settings: ContainerSettings
    }
}


export default Container