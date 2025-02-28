import { Radio, cn } from "@nextui-org/react"

const CustomRadio = ({ value, children }: {
    value: string;
    children: React.ReactNode
}) => {
    return (
        <Radio
            value={value}
            classNames={{
                base: cn(
                    "flex justify-between flex-row-reverse max-w-[300px] p-2 pr-3 rounded-lg m-0 hover:bg-default-100",
                ),
            }}
        >
            <span className="text-sm">{children}</span>
        </Radio>
    )
}

export default CustomRadio