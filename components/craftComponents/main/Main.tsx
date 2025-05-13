"use client"

import Topbar from "../topbar/Topbar"
import Toolbox from "../toolbox/Toolbox"
import App from "../app/App"
import SettingsPanel from "../settingspanel/SettingsPanel"
import { Editor, Frame, Element } from "@craftjs/core"
import Text from "../text/Text"
import Button from "../button/Button"
import FrameProvider from "../frameProvider/FrameProvider"
import FrameWrapper from "./frameWrapper/FrameWrapper"
import Input from "../input/Input"
import TextArea from "../textarea/TextArea"
import Image from "../image/Image"
import Code from "../code/Code"
import Snippet from "../snippet/Snippet"
import Container from "../container/Container"

const Main = () => {
    return (
        <FrameProvider>
            <Editor resolver={{ App, Text, Button, Input, TextArea, Image, Code, Snippet, Container }}>
                <div>
                    <div className="bg-default-800">
                        <Topbar/>
                    </div>
                    <div style={{ display: "flex", position: "absolute" }} className="top-16 bottom-0 w-full bg-gray-200">
                        <div style={{ flexBasis: "120px" }} className="bg-white">
                            <Toolbox />
                        </div>
                        <FrameWrapper>
                                    <Frame>
                                        <Element is={App} backgroundColor="#fff" pt={20} pr={20} pb={20} pl={20} canvas>
                                            <Text
                                                text="Text" fontSize={20}
                                                align="left" weight={400}
                                                mt={5}
                                                mr={0}
                                                mb={5}
                                                ml={0}
                                                color="#11181c"
                                            />
                                        </Element>
                                    </Frame>
                        </FrameWrapper>
                        <div style={{ flexBasis: "260px", padding: "0 10px" }} className="bg-white overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-default-300">
                            <SettingsPanel />
                        </div>
                    </div>
                </div>
            </Editor>
        </FrameProvider>
    )
}

export default Main