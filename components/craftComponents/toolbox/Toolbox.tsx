import { useEditor } from "@craftjs/core"
import Button from "../button/Button"
import Text from "../text/Text"
import { Button as DragBtn } from "@nextui-org/react"
import Input from "../input/Input"
import TextArea from "../textarea/TextArea"
import Image from "../image/Image"
import Code from "../code/Code"
import Snippet from "../snippet/Snippet"
import Container from "../container/Container"
import { Element } from "@craftjs/core"

const Toolbox = () => {
    const { connectors } = useEditor()
    return (
        <div className="p-3 flex flex-col gap-2">
            <DragBtn className="cursor-move bg-default-500 text-white" radius="sm" ref={(ref) => {
                if (ref instanceof HTMLElement) connectors.create(ref, <Button
                    text="Click me"
                    size="md"
                    radius="md"
                    color="primary"
                    variant="solid"
                    mt={0}
                    mr={0}
                    mb={0}
                    ml={0}
                    fullWidth={false} />)
            }}>Button</DragBtn>
            <DragBtn className="cursor-move bg-default-500 text-white" radius="sm" ref={(ref) => {
                if (ref instanceof HTMLElement) connectors.create(ref, <Text
                    text="Text"
                    fontSize={20}
                    align="left"
                    weight={400}
                    mt={0}
                    mr={0}
                    mb={5}
                    ml={0}
                    color="#11181c"
                />)
            }}>Text</DragBtn>
            <DragBtn className="cursor-move bg-default-500 text-white" radius="sm" ref={(ref) => {
                if (ref instanceof HTMLElement) connectors.create(ref, <Input
                    size="md"
                    color="default"
                    variant="flat"
                    radius="none"
                    placeholder="Enter here"
                    label="Text Input"
                    labelPlacement="outside"
                    mt={0}
                    mr={0}
                    mb={0}
                    ml={0}
                />)
            }}>Input</DragBtn>
            <DragBtn className="cursor-move bg-default-500 text-white" radius="sm" ref={(ref) => {
                if (ref instanceof HTMLElement) connectors.create(ref, <TextArea
                    radius="md"
                    variant="flat"
                    minRows={5}
                    maxRows={20}
                    labelPlacement="outside"
                    placeholder="Enter here"
                    description="Description"
                    label="Text area"
                    mt={0}
                    mr={0}
                    mb={0}
                    ml={0}
                />)
            }}>TextArea</DragBtn>
            <DragBtn className="cursor-move bg-default-500 text-white" radius="sm" ref={(ref) => {
                if (ref instanceof HTMLElement) connectors.create(ref, <Image
                    src=""
                    pixelWidth={true}
                    widthInPx={300}
                    heightInPx={300}
                    widthInPercentage={50}
                    radius="rounded-md"
                    shadow="none"
                    mt={0}
                    mb={0}
                    mr={0}
                    ml={0}
                />)
            }}>Image</DragBtn>
            <DragBtn className="cursor-move bg-default-500 text-white" radius="sm" ref={(ref) => {
                if (ref instanceof HTMLElement) connectors.create(ref, <Code
                    text="This is a code"
                    size="sm"
                    color="default"
                    radius="sm"
                    mt={0}
                    mb={0}
                    mr={0}
                    ml={0}
                />)
            }}>Code</DragBtn>
            <DragBtn className="cursor-move bg-default-500 text-white" radius="sm" ref={(ref) => {
                if (ref instanceof HTMLElement) connectors.create(ref, <Snippet
                    text="This is a text to copy"
                    size="md"
                    color="default"
                    variant="solid"
                    radius="lg"
                    symbol="$"
                    mt={0}
                    mb={0}
                    mr={0}
                    ml={0}
                />)
            }}>Snippet</DragBtn>
            <DragBtn className="cursor-move bg-default-500 text-white" radius="sm" ref={(ref) => {
                if (ref instanceof HTMLElement) connectors.create(ref, <Element
                    is={Container}
                    pixelWidth={false}
                    autoHeight={true}
                    widthInPx={200}
                    heightInPx={200}
                    widthInPercentage={100}
                    backgroundColor="#ddd"
                    borderWidth="border-0"
                    radius="rounded-none"
                    shadow="shadow-none"
                    flexDirection="flex-col"
                    justifyContent="justify-start"
                    alignItems="items-start"
                    pt={20}
                    pb={20}
                    pr={20}
                    pl={20}
                    mt={0}
                    mb={0}
                    mr={0}
                    ml={0}
                    canvas
                ></Element>)
            }}>Container</DragBtn>
        </div>
    )
};

export default Toolbox