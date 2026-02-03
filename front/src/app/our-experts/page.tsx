"use client";

import { useState, useEffect, useRef } from "react";
import { Search, MapPin, Phone, X, ChevronDown } from "lucide-react";
import { Doctor } from "@/types/doctor";
import { AxiosInstance } from "@/helpers/Axios.instance";
import { encryptId } from "@/helpers/Helper";


// Multi-select Dropdown Component
function MultiSelectDropdown({ options, selected, onChange, placeholder }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleOption = (option) => {
        if (selected.includes(option)) {
            onChange(selected.filter((item) => item !== option));
        } else {
            onChange([...selected, option]);
        }
    };

    const removeOption = (option) => {
        onChange(selected.filter((item) => item !== option));
    };

    return (
        <div ref={dropdownRef} className="relative w-full">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white px-5 py-3.5 rounded-xl font-medium flex items-center justify-between hover:from-pink-600 hover:to-rose-600 transition-all duration-200 shadow-md hover:shadow-lg"
            >
                <span className="truncate">
                    {selected.length > 0 ? `${selected.length} selected` : placeholder}
                </span>
                <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 flex-shrink-0 ml-2 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            {/* Selected Items Pills */}
            {selected.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                    {selected.map((item) => (
                        <span
                            key={item}
                            className="inline-flex items-center gap-1.5 bg-pink-100 text-pink-700 px-3 py-1.5 rounded-full text-sm font-medium"
                        >
                            {item}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeOption(item);
                                }}
                                className="hover:bg-pink-200 rounded-full p-0.5 transition-colors"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-20 animate-slideDown">
                    <div className="max-h-64 overflow-y-auto">
                        {options.map((option) => (
                            <label
                                key={option}
                                className="flex items-center gap-3 px-5 py-3 hover:bg-pink-50 cursor-pointer transition-colors"
                            >
                                <input
                                    type="checkbox"
                                    checked={selected.includes(option)}
                                    onChange={() => toggleOption(option)}
                                    className="w-4 h-4 text-[#3b82f6] border-gray-300 rounded focus:ring-2 focus:ring-pink-400 cursor-pointer"
                                />
                                <span className="text-gray-700 font-medium">{option}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}


export default function DoctorsPage() {
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [locations, setLocations] = useState<string[]>([]);
    const observerTarget = useRef(null);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadFilters = async () => {
            const [catRes, locRes] = await Promise.all([
                AxiosInstance.get('/categories'),
                AxiosInstance.get('/doctor/locations'),
            ]);

            setCategories(catRes.data.map((c: any) => c.name));
            setLocations(locRes.data);
        };

        loadFilters();
    }, []);


    useEffect(() => {
        setPage(1);
        setDoctors([]);
        fetchDoctors(true);
    }, [searchQuery, selectedDepartments, selectedLocations]);



    // Infinite scroll observer
    useEffect(() => {
        if (!observerTarget.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasMore && !loading) {
                    fetchDoctors();
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(observerTarget.current);
        return () => observer.disconnect();
    }, [hasMore, loading]);


    const fetchDoctors = async (reset = false) => {
        if (loading) return;
        setLoading(true);

        const params = new URLSearchParams({
            page: reset ? "1" : page.toString(),
            limit: "8",
            search: searchQuery,
            category: selectedDepartments[0] || "",
            location: selectedLocations[0] || "",
        });

        const res = await AxiosInstance.get(`/doctor?${params}`);
        const json = res.data;

        setDoctors(prev =>
            reset ? json.data : [...prev, ...json.data]
        );

        setHasMore(json.meta.hasMore);
        setPage(p => p + 1);
        setLoading(false);
    };


    const handleBookNow = (doctorId: number) => {
        const encryptedDoctorId = encryptId(String(doctorId));
        const encodedEncryptedDoctorId = encodeURIComponent(encryptedDoctorId);
        const link = `${window.location.origin}/profile/${encodedEncryptedDoctorId}`;
        window.open(link, '_blank');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-pink-50/30">
            <div style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #1a2e4a 100%)", height: 56 }}>
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
                    <span className="text-white font-bold text-lg" style={{ letterSpacing: "-0.3px" }}>
                        Our Experts
                    </span>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Find Your Doctor</h1>
                    <p className="text-gray-600">Book appointments with the best doctors near you</p>
                </div>

                {/* Filter Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Location Multi-Select */}
                        <div className="lg:col-span-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Select Locations
                            </label>
                            <MultiSelectDropdown
                                options={locations}
                                selected={selectedLocations}
                                onChange={setSelectedLocations}
                                placeholder="All Locations"
                            />
                        </div>

                        {/* Department Multi-Select */}
                        <div className="lg:col-span-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Select Departments
                            </label>
                            <MultiSelectDropdown
                                options={categories}
                                selected={selectedDepartments}
                                onChange={setSelectedDepartments}
                                placeholder="All Departments"
                            />
                        </div>

                        {/* Search Input */}
                        <div className="lg:col-span-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Search Doctor
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by name or department..."
                                    className="w-full px-5 py-3.5 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all duration-200"
                                />
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Clear Filters */}
                    {(selectedLocations.length > 0 || selectedDepartments.length > 0 || searchQuery) && (
                        <div className="mt-6 flex items-center justify-between border-t pt-4">
                            <p className="text-sm text-gray-600">
                                {doctors.length} doctor(s) loaded
                            </p>
                            <button
                                onClick={() => {
                                    setSelectedLocations([]);
                                    setSelectedDepartments([]);
                                    setSearchQuery("");
                                }}
                                className="text-sm font-medium text-pink-600 hover:text-pink-700 transition-colors"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Doctor Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {doctors.map((doc, index) => (
                        <div
                            key={`${doc.id}-${index}`}
                            className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1"
                        >
                            {/* Doctor Image */}
                            <div className="relative h-64 overflow-hidden bg-gray-100">
                                <img
                                    src={doc.image}
                                    alt={doc.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {/* Department Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                                        {doc.category}
                                    </span>
                                </div>
                            </div>

                            {/* Doctor Information */}
                            <div className="p-5">
                                {/* Name with availability */}
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-lg font-bold text-gray-800 flex-1">
                                        Dr. {doc.name}
                                    </h3>
                                    {doc?.available && (
                                        <div
                                            className="flex-shrink-0 w-3 h-3 bg-green-500 rounded-full animate-pulse"
                                            title="Available"
                                        ></div>
                                    )}
                                </div>

                                {/* Credentials */}
                                <p className="text-sm text-gray-500 mb-4 line-clamp-1">
                                    {JSON.parse(doc?.degree || '[]').map(d => d.name).join(', ')}
                                </p>

                                {/* Location */}
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                    <MapPin className="w-4 h-4 text-[#3b82f6] flex-shrink-0" />
                                    <span className="font-medium line-clamp-2">{doc?.location}</span>
                                </div>

                                {/* Phone */}
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
                                    <Phone className="w-4 h-4 text-[#3b82f6] flex-shrink-0" />
                                    <span className="text-xs">{doc?.phone}</span>
                                </div>

                                {/* Book Now Button */}
                                <button onClick={() => handleBookNow(doc.id)} className="w-full bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white font-semibold py-3.5 rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-200 shadow-md hover:shadow-xl transform hover:scale-[1.02]">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Loading Indicator */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="relative">
                            <div className="w-14 h-14 border-4 border-pink-200 border-t-[#3b82f6] rounded-full animate-spin"></div>
                        </div>
                    </div>
                )}

                {/* Intersection Observer Target */}
                <div ref={observerTarget} className="h-10"></div>

                {/* No More Results */}
                {!hasMore && doctors.length > 0 && (
                    <div className="text-center py-12">
                        <div className="inline-block bg-gradient-to-r from-pink-100 to-rose-100 px-6 py-3 rounded-full">
                            <p className="text-pink-700 font-medium">
                                You&apos;ve reached the end of the list
                            </p>
                        </div>
                    </div>
                )}

                {/* No Results Message */}
                {doctors.length === 0 && !loading && (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full mb-4">
                            <Search className="w-12 h-12 text-[#3b82f6]" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No doctors found</h3>
                        <p className="text-gray-600 mb-6">
                            Try adjusting your filters to see more results
                        </p>
                        <button
                            onClick={() => {
                                setSelectedLocations([]);
                                setSelectedDepartments([]);
                                setSearchQuery("");
                            }}
                            className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white font-semibold px-8 py-3 rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}
            </div>

            <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Custom scrollbar for dropdown */
        .max-h-64::-webkit-scrollbar {
          width: 6px;
        }

        .max-h-64::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .max-h-64::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%);
          border-radius: 10px;
        }

        .max-h-64::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #db2777 0%, #e11d48 100%);
        }
      `}</style>
        </div>
    );
}