"use client";

import { useState, useEffect, useRef } from "react";
import { Search, MapPin, Phone, X, ChevronDown, BookmarkIcon } from "lucide-react";
import { Doctor } from "@/types/doctor";
import { AxiosInstance } from "@/helpers/Axios.instance";
import { encryptId } from "@/helpers/Helper";
import toast from "react-hot-toast";
import { useUIStore } from "@/store/uiStore";
import { useUserStore } from "@/store/useUserStore";


// Multi-select Dropdown Component
function MultiSelectDropdown({ options, selected, onChange, placeholder }: {
    options: string[];
    selected: string[];
    onChange: (selected: string[]) => void;
    placeholder: string;
}) {
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
                className="w-full bg-gradient-to-r from-[#16213e] to-[#0f3460] text-white px-5 py-3.5 rounded-lg font-medium flex items-center justify-between hover:from-[#1a2847] hover:to-[#133c6e] transition-all duration-200 shadow-sm hover:shadow-md"
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
                            className="inline-flex items-center gap-1.5 bg-[#16213e]/10 text-[#16213e] px-3 py-1.5 rounded-md text-sm font-medium border border-[#16213e]/20"
                        >
                            {item}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeOption(item);
                                }}
                                className="hover:bg-[#16213e]/20 rounded-full p-0.5 transition-colors"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-20 animate-slideDown">
                    <div className="max-h-64 overflow-y-auto">
                        {options.map((option) => (
                            <label
                                key={option}
                                className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                                <input
                                    type="checkbox"
                                    checked={selected.includes(option)}
                                    onChange={() => toggleOption(option)}
                                    className="w-4 h-4 text-[#16213e] border-gray-300 rounded focus:ring-2 focus:ring-[#16213e]/30 cursor-pointer"
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
    const [favorites, setFavorites] = useState([]);
    const { openLoginModal } = useUIStore();
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);

    const fetchFavorites = async () => {
        const res = await AxiosInstance.get('/favorite/doctors');
        setFavorites(res.data.map((f: any) => f.doctorId));
    };

    const loadFilters = async () => {
        const [catRes, locRes] = await Promise.all([
            AxiosInstance.get('/categories'),
            AxiosInstance.get('/doctor/locations'),
        ]);

        setCategories(catRes.data.map((c: any) => c.name));
        setLocations(locRes.data);
    };

    useEffect(() => {
        loadFilters();
        if (isLoggedIn) fetchFavorites();
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

    const toggleFavorite = async (doctorId: number) => {
        if (!isLoggedIn) return openLoginModal();
        if (favorites.includes(doctorId)) {
            await AxiosInstance.delete(`/favorite/doctors/${doctorId}`);
            setFavorites(prev => prev.filter(id => id !== doctorId));
            toast.success('Doctor removed from wishlist');
        } else {
            await AxiosInstance.put(`/favorite/doctors/${doctorId}`);
            setFavorites(prev => [...prev, doctorId]);
            toast.success('Doctor added to wishlist');
        }
    };



    return (
        <div className="min-h-screen bg-gray-50">

            <div
                className="relative w-full overflow-hidden"
                style={{ height: "160px", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}
            >
                {/* Decorative circles */}
                <div
                    className="absolute rounded-full opacity-10"
                    style={{ width: 320, height: 320, background: "#f472b6", top: -80, left: -60 }}
                />
                <div
                    className="absolute rounded-full opacity-10"
                    style={{ width: 200, height: 200, background: "#fb7185", bottom: -60, right: 120 }}
                />
                <div
                    className="absolute rounded-full opacity-5"
                    style={{ width: 140, height: 140, background: "#ffffff", top: 40, right: 300 }}
                />

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col justify-center h-full">
                    <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "#3b82f6" }}>
                        Our Experts
                    </p>



                    <h1 className="text-4xl font-bold text-white mb-3" style={{ letterSpacing: "-0.5px" }}>
                        Find Your & <span style={{ color: "#3b82f6" }}>Doctor</span>
                    </h1>
                    <p className="text-gray-50 text-lg">Book appointments with the best doctors near you</p>
                </div>
            </div>


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">


                {/* Filter Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-10">
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
                                    className="w-full px-5 py-3.5 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:border-[#16213e] focus:ring-2 focus:ring-[#16213e]/20 transition-all duration-200"
                                />
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Clear Filters */}
                    {(selectedLocations.length > 0 || selectedDepartments.length > 0 || searchQuery) && (
                        <div className="mt-6 flex items-center justify-between border-t pt-5">
                            <p className="text-sm text-gray-600 font-medium">
                                {doctors.length} doctor(s) found
                            </p>
                            <button
                                onClick={() => {
                                    setSelectedLocations([]);
                                    setSelectedDepartments([]);
                                    setSearchQuery("");
                                }}
                                className="text-sm font-semibold text-[#16213e] hover:text-[#0f3460] transition-colors"
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
                            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group"
                        >
                            {/* Doctor Image */}
                            <div className="relative h-64 overflow-hidden bg-gray-100">
                                <img
                                    src={doc.image}
                                    alt={doc.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Department Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="bg-gradient-to-r from-[#16213e] to-[#0f3460] text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow-md">
                                        {doc.category}
                                    </span>
                                </div>
                                {/* Favorite Icon */}
                                <div
                                    onClick={() => toggleFavorite(doc.id)}
                                    className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-md cursor-pointer hover:scale-110 transition"
                                >
                                    <BookmarkIcon
                                        className={`w-5 h-5 ${favorites.includes(doc.id)
                                            ? "fill-[#16213e] text-[#16213e]"
                                            : "text-gray-400"
                                            }`}
                                    />
                                </div>
                            </div>

                            {/* Doctor Information */}
                            <div className="p-5">
                                {/* Name with availability */}
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-lg font-bold text-[#16213e] flex-1 line-clamp-1">
                                        Dr. {doc.name}
                                    </h3>
                                    {doc?.available && (
                                        <div
                                            className="flex-shrink-0 w-2.5 h-2.5 bg-green-500 rounded-full"
                                            title="Available"
                                        ></div>
                                    )}
                                </div>

                                {/* Credentials */}
                                <p className="text-sm text-gray-500 mb-4 line-clamp-1">
                                    {JSON.parse(doc?.degree || '[]').map(d => d.name).join(', ')}
                                </p>

                                {/* Location */}
                                <div className="flex items-start gap-2 text-sm text-gray-600 mb-2">
                                    <MapPin className="w-4 h-4 text-[#16213e] flex-shrink-0 mt-0.5" />
                                    <span className="font-medium line-clamp-2">{doc?.location}</span>
                                </div>

                                {/* Phone */}
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
                                    <Phone className="w-4 h-4 text-[#16213e] flex-shrink-0" />
                                    <span className="text-xs">{doc?.phone}</span>
                                </div>

                                {/* Book Now Button */}
                                <button
                                    onClick={() => handleBookNow(doc.id)}
                                    className="w-full bg-gradient-to-r from-[#16213e] to-[#0f3460] text-white font-semibold py-3 rounded-lg hover:from-[#1a2847] hover:to-[#133c6e] transition-all duration-200 shadow-sm hover:shadow-md"
                                >
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
                            <div className="w-14 h-14 border-4 border-gray-200 border-t-[#16213e] rounded-full animate-spin"></div>
                        </div>
                    </div>
                )}

                {/* Intersection Observer Target */}
                <div ref={observerTarget} className="h-10"></div>

                {/* No More Results */}
                {!hasMore && doctors.length > 0 && (
                    <div className="text-center py-12">
                        <div className="inline-block bg-gray-100 px-6 py-3 rounded-lg border border-gray-200">
                            <p className="text-gray-600 font-medium">
                                You&apos;ve reached the end of the list
                            </p>
                        </div>
                    </div>
                )}

                {/* No Results Message */}
                {doctors.length === 0 && !loading && (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
                            <Search className="w-12 h-12 text-[#16213e]" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#16213e] mb-2">No doctors found</h3>
                        <p className="text-gray-600 mb-6">
                            Try adjusting your filters to see more results
                        </p>
                        <button
                            onClick={() => {
                                setSelectedLocations([]);
                                setSelectedDepartments([]);
                                setSearchQuery("");
                            }}
                            className="bg-gradient-to-r from-[#16213e] to-[#0f3460] text-white font-semibold px-8 py-3 rounded-lg hover:from-[#1a2847] hover:to-[#133c6e] transition-all duration-200 shadow-sm hover:shadow-md"
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

                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
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
                    background: linear-gradient(135deg, #16213e 0%, #0f3460 100%);
                    border-radius: 10px;
                }

                .max-h-64::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(135deg, #1a2847 0%, #133c6e 100%);
                }
            `}</style>
        </div>
    );
}