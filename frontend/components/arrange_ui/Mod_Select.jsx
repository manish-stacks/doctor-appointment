import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

const Mod_Select = ({
    title = "Select a fruit",
    label = "Fruits",
    items = [],
    SelectTriggerClassNames = "",
    SelectContentClassName = "",
    SelectLabelClassName = "",
    SelectItemClassName = "",
    onChange
}) => {
    return (
        <Select onValueChange={onChange}>
            <SelectTrigger className={`${SelectTriggerClassNames} w-[180px]`}>
                <SelectValue placeholder={title} />
            </SelectTrigger>
            <SelectContent className={SelectContentClassName}>
                <SelectGroup>
                    <SelectLabel className={SelectLabelClassName}>{label}</SelectLabel>
                    {items && items.map((item, index) => (
                        <SelectItem className={SelectItemClassName} key={index} value={item}>
                            {item}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default Mod_Select
