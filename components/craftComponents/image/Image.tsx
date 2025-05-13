import { Resizable } from "re-resizable"
import { useNode, useEditor } from "@craftjs/core"
import NextImage from "next/image"
import { Slider, Accordion, AccordionItem, RadioGroup, Input, Select, SelectItem, Image as NextUiImage } from "@nextui-org/react"
import CustomRadio from "../customRadio/CustomRadio"
import { useFrameContext } from "../frameProvider/FrameProvider"
import { RiDeleteBin6Line } from "react-icons/ri"
import { IoMoveSharp } from "react-icons/io5"

const Image = ({
    src,
    pixelWidth,
    widthInPx,
    heightInPx,
    widthInPercentage,
    radius,
    shadow,
    mt,
    mr,
    mb,
    ml
}: {
    src: string;
    pixelWidth: boolean;
    widthInPercentage: number;
    widthInPx: number;
    heightInPx: number;
    radius: string;
    shadow: "none" | "sm" | "md" | "lg";
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
    const validURL = (url: string) => {
        try {
            const parseURL = new URL(url)
            return parseURL.protocol === "https:" ? src : "/no_image.png"
        } catch {
            return "/no_image.png"
        }
    }

    return (
        <Resizable
            enable={!isSelected ? false : undefined}
            size={pixelWidth ? {
                width: widthInPx,
                height: heightInPx,
            } : {
                width: `${widthInPercentage}%`,
                height: heightInPx
            }}
            onResizeStop={(e, direction, ref, d) => {
                setProp((props: any) => {
                    if (pixelWidth)
                        props.widthInPx = props.widthInPx + d.width;
                    props.heightInPx = props.heightInPx + d.height;
                });
            }}
            maxWidth={1500}
            maxHeight={1500}
            minHeight={0}
            minWidth={0}
            className={`relative ${isSelected && "z-50"} block border border-dashed ${(onFrame && isHovered) || isSelected ? "border-primary-400" : "border-transparent"}`}
            ref={(instance: Resizable | null) => {
                if (instance) {
                    const domNode = instance.resizable as HTMLDivElement;
                    if (domNode) connect(domNode);
                }
            }}
            style={{
                margin: `${mt}px ${mr}px ${mb}px ${ml}px`,
            }}>
            {((isHovered && onFrame) || isSelected) && <div className={`absolute z-50 flex bg-primary-500 -translate-y-full text-white text-xs rounded-t-md justify-center items-center pl-3 ${isSelected ? "pr-2" : "pr-3"} gap-2`} style={{ top: -2, left: -1, height: "30px" }}>
                <span>{customName === "<br>" ? "" : customName === "" ? name : customName}</span>
                {isSelected && <>
                    <span ref={(ref: HTMLSpanElement | null) => { if (ref) drag(ref) }}><IoMoveSharp className="text-xs cursor-move" /></span>
                    {node(id).isDeletable() && <RiDeleteBin6Line className="text-sm cursor-pointer" onClick={() => actions.delete(id)} />}</>}
            </div>}
            <NextUiImage
                as={NextImage}
                fill={true}
                quality={100}
                src={validURL(src)}
                alt="Image"
                className={radius}
                shadow={shadow}
                removeWrapper
            />
            {isSelected && <><div className=" absolute z-50 left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white border-2 border-primary-400 rounded-full"></div>
                <div className="absolute z-50 left-0 bottom-0 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white border-2 border-primary-400 rounded-full"></div>
                <div className="absolute z-50 right-0 top-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white border-2 border-primary-400 rounded-full"></div>
                <div className="absolute z-50 right-0 bottom-0 translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white border-2 border-primary-400 rounded-full"></div></>}
        </Resizable>
    )
}

const ImageSettings = () => {
    const { actions: { setProp }, pixelWidth, widthInPx, heightInPx, widthInPercentage, src, radius, shadow, mt, mr, mb, ml } = useNode((node) => ({
        pixelWidth: node.data.props.pixelWidth,
        widthInPx: node.data.props.widthInPx,
        heightInPx: node.data.props.heightInPx,
        widthInPercentage: node.data.props.widthInPercentage,
        src: node.data.props.src,
        radius: node.data.props.radius,
        shadow: node.data.props.shadow,
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
            <AccordionItem key="1" aria-label="imageurl" title="Image URL">
                <Input type="text" placeholder="https://" value={src} onValueChange={(value) => setProp((props: any) => props.src = value)} classNames={{ input: ["pl-1"] }} />
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
                        <div>Px</div>
                    </div>
                    <Slider
                        aria-label="h-px"
                        value={heightInPx}
                        onChange={(value) => setProp((props: any) => props.heightInPx = value)}
                        showTooltip={true}
                        className="max-w-md"
                        size="sm"
                        maxValue={1500}
                        minValue={0}
                        step={1}
                    />
                </div>
            </AccordionItem>
            <AccordionItem key="3" aria-label="radius" title="Radius">
                <RadioGroup value={radius} onValueChange={(value: string) => setProp((props: any) => props.radius = value)}>
                    <CustomRadio value="rounded-none">None</CustomRadio>
                    <CustomRadio value="rounded-sm">Small</CustomRadio>
                    <CustomRadio value="rounded-md">Medium</CustomRadio>
                    <CustomRadio value="rounded-lg">Large</CustomRadio>
                    <CustomRadio value="rounded-full">Full</CustomRadio>
                </RadioGroup>
            </AccordionItem>
            <AccordionItem key="4" aria-label="shadow" title="Shadow">
                <RadioGroup value={shadow} onValueChange={(value: string) => setProp((props: any) => props.shadow = value)}>
                    <CustomRadio value="none">None</CustomRadio>
                    <CustomRadio value="sm">Small</CustomRadio>
                    <CustomRadio value="md">Medium</CustomRadio>
                    <CustomRadio value="lg">Large</CustomRadio>
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
        </Accordion >
    )
}

Image.craft = {
    custom: {
        displayName: "Image"
    },
    related: {
        settings: ImageSettings
    }
}

export default Image