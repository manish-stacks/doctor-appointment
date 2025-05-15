"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { PlusCircle, X, Check, ChevronsUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import Image from "next/image"

// Sample hospitals data
const hospitals = [
    { value: "montreal-general", label: "Montreal General Hospital" },
    { value: "toronto-general", label: "Toronto General Hospital" },
    { value: "vancouver-general", label: "Vancouver General Hospital" },
    { value: "ottawa-civic", label: "Ottawa Civic Hospital" },
    { value: "calgary-general", label: "Calgary General Hospital" },
    { value: "edmonton-royal", label: "Royal Alexandra Hospital" },
    { value: "winnipeg-health", label: "Health Sciences Centre" },
    { value: "halifax-medical", label: "QEII Health Sciences Centre" },
    { value: "other", label: "Other's" },
]

export default function PersonalInformationForm() {
    const [profileImage, setProfileImage] = useState<string>("https://res.cloudinary.com/do34gd7bu/image/upload/v1746015026/360_F_565224180_QNRiRQkf9Fw0dKRoZGwUknmmfk51SuSS_cn2bqt.jpg")
    const [open, setOpen] = useState(false)
    const [openHospitals, setOpenHospitals] = useState(false)
    // Sample data
    const [formData, setFormData] = useState({
        name: "Dr. Michael Nguyen",
        email: "Confidential",
        phoneNumber: "1234567890",
        countryCode: "+91",
        dateOfBirth: "1978-11-05",
        gender: "male",
        professionalBio: "Dr. Michael Nguyen is a skilled orthopedic surgeon specializing in sports medicine.",
        hospitalName: "Toronto General Hospital",
        hospitalNumber: "1234",
        hospitalFacility: "Orthopedic Surgery",
        hospitalLocation: "123456/123456",
    })

    // Selected hospitals state
    const [selectedHospitals, setSelectedHospitals] = useState([
        { value: "montreal-general", label: "Montreal General Hospital" },
    ])


    useEffect(() => {
        const hasOther = selectedHospitals.some(
            (hospital) => hospital.value === "other"
        );
        if (hasOther) {
            setOpenHospitals(true)
            return
        }
        setOpenHospitals(false)
    }, [selectedHospitals])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                if (e.target?.result) {
                    setProfileImage(e.target.result as string)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const toggleHospital = (hospital: { value: string; label: string }) => {
        setSelectedHospitals((current) => {


            // Check if hospital is already selected
            const isSelected = current.some((h) => h.value === hospital.value)

            if (isSelected) {
                // Remove hospital if already selected
                return current.filter((h) => h.value !== hospital.value)
            } else {
                // Add hospital if not selected
                return [...current, hospital]
            }
        })
    }

    const removeHospital = (hospitalValue: string) => {
        setSelectedHospitals((current) => current.filter((h) => h.value !== hospitalValue))
    }

    return (
        <div className="w-full mx-auto p-8 bg-white rounded-lg">
            <h2 className="text-xl font-medium text-blue-500 mb-8">Personal Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left column - Doctor Image */}
                <div className="space-y-2">
                    <Label htmlFor="doctor-image" className="text-gray-600">
                        Doctor Image
                    </Label>
                    <div className="relative w-full max-w-[200px]">
                        <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                            <Image
                                width={200}
                                height={200}
                                src={profileImage || "https://res.cloudinary.com/do34gd7bu/image/upload/v1746015026/360_F_565224180_QNRiRQkf9Fw0dKRoZGwUknmmfk51SuSS_cn2bqt.jpg"}
                                alt="Doctor profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute top-2 right-2 flex gap-1">
                            <label htmlFor="image-upload" className="bg-white rounded-full p-1 cursor-pointer shadow-sm">
                                <PlusCircle className="h-6 w-6 text-gray-500" />
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    className="sr-only"
                                    onChange={handleImageChange}
                                />
                            </label>
                            <button
                                type="button"
                                onClick={() => setProfileImage("/placeholder.svg?height=200&width=200")}
                                className="bg-white rounded-full p-1 cursor-pointer shadow-sm"
                            >
                                <X className="h-6 w-6 text-gray-500" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Middle and right columns - Form fields */}
                <div className="md:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-600">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="bg-gray-100"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-600">
                                Email
                            </Label>
                            <Input
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="bg-gray-100"
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-gray-600">
                                Phone Number
                            </Label>
                            <div className="flex">
                                <div className="w-16 flex-shrink-0">
                                    <Select
                                        value={formData.countryCode}
                                        onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                                    >
                                        <SelectTrigger className="bg-gray-100 border-r-0 rounded-r-none">
                                            <SelectValue placeholder="+91" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="+91">+91</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Input
                                    id="phone"
                                    value={formData.phoneNumber}
                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                    className="flex-1 bg-gray-100 rounded-l-none"
                                />
                            </div>
                        </div>

                        {/* Hospital Multi-Select */}
                        <div className="space-y-2">
                            <Label htmlFor="hospital" className="text-gray-600">
                                Hospital
                            </Label>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-full justify-between bg-gray-100 border-input"
                                    >
                                        {selectedHospitals.length > 0
                                            ? `${selectedHospitals.length} hospital${selectedHospitals.length > 1 ? "s" : ""} selected`
                                            : "Select hospitals"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search hospitals..." />
                                        <CommandList>
                                            <CommandEmpty>No hospital found.</CommandEmpty>
                                            <CommandGroup className="max-h-64 overflow-auto">
                                                {hospitals.map((hospital) => (
                                                    <CommandItem
                                                        key={hospital.value}
                                                        value={hospital.value}
                                                        onSelect={() => toggleHospital(hospital)}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                selectedHospitals.some((h) => h.value === hospital.value) ? "opacity-100" : "opacity-0",
                                                            )}
                                                        />
                                                        {hospital.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            {/* Selected hospitals display */}
                            {selectedHospitals.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {selectedHospitals.map((hospital) => (
                                        <div
                                            key={hospital.value}
                                            className="inline-flex items-center px-2 py-1 bg-blue-500 text-white text-sm rounded group"
                                        >
                                            <span className="mr-1">★</span>
                                            {hospital.label}
                                            <button
                                                type="button"
                                                onClick={() => removeHospital(hospital.value)}
                                                className="ml-1 rounded-full hover:bg-blue-600 p-0.5"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>


                        {/* Date of Birth */}
                        <div className="space-y-2">
                            <Label htmlFor="dob" className="text-gray-600">
                                Date Of Birth
                            </Label>
                            <Input
                                id="dob"
                                type="date"
                                value={formData.dateOfBirth}
                                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                                className="bg-gray-100"
                            />
                        </div>

                        {/* Gender */}
                        <div className="space-y-2 ">
                            <Label htmlFor="gender" className="text-gray-600">
                                Gender
                            </Label>
                            <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                                <SelectTrigger className="bg-gray-100 w-full">
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Professional Bio */}
                    <div className="space-y-2">
                        <Label htmlFor="bio" className="text-gray-600">
                            Professional Bio
                        </Label>
                        <Textarea
                            id="bio"
                            value={formData.professionalBio}
                            onChange={(e) => setFormData({ ...formData, professionalBio: e.target.value })}
                            className="bg-gray-100 min-h-[100px]"
                        />
                    </div>
                </div>
            </div>

            {
                openHospitals && (
                    <div className="gap-8 py-5">
                        <h2 className="text-lg font-normal text-blue-500 mb-2">Hospitals Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <Label htmlFor="hospitalName" className="text-gray-600">
                                    Hospital Name
                                </Label>
                                <Input
                                    id="hospitalName"
                                    value={formData.hospitalName}
                                    onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                                    className="bg-gray-100"
                                />
                            </div>


                            <div className="space-y-2">
                                <Label htmlFor="hospitalNumber" className="text-gray-600">
                                    Phone number
                                </Label>
                                <Input
                                    id="hospitalNumber"
                                    value={formData.hospitalNumber}
                                    onChange={(e) => setFormData({ ...formData, hospitalNumber: e.target.value })}
                                    className="bg-gray-100"
                                />
                            </div>




                            <div className="space-y-2">
                                <Label htmlFor="hospitalFacility" className="text-gray-600">
                                    Hospital Facility
                                </Label>
                                <Input
                                    id="hospitalFacility"
                                    value={formData.hospitalFacility}
                                    onChange={(e) => setFormData({ ...formData, hospitalFacility: e.target.value })}
                                    className="bg-gray-100"
                                />
                            </div>


                            <div className="space-y-2 ">
                                <Label htmlFor="hospitalLocation" className="text-gray-600">
                                    Location based on latitude/longitude
                                </Label>
                                <Input
                                    id="hospitalLocation"
                                    value={formData.hospitalLocation}
                                    onChange={(e) => setFormData({ ...formData, hospitalLocation: e.target.value })}
                                    className="bg-gray-100"
                                />
                            </div>
                        </div>

                        {/* Professional Bio */}
                        <div className="space-y-2 mt-3">
                            <Label htmlFor="bio" className="text-gray-600">
                                Map
                            </Label>
                            <div>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4188.11341618486!2d77.1517968!3d28.690584100000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d031bd35247f5%3A0x167e7ad1ee25b7c7!2sHover%20Business%20Services%20LLP!5e1!3m2!1sen!2sin!4v1747310025227!5m2!1sen!2sin"
                                   className="w-full h-[300px]"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />

                            </div>
                        </div>

                    </div>
                )
            }

        </div>
    )
}
