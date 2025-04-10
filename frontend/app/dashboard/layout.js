"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Calendar, Home, Moon, Settings, Users, FileText, Menu, LogOut, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "@/context/ThemeProvider"
import { motion, AnimatePresence } from "framer-motion"
import useStore from "@/store/registerStore"

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();
    const { foundMe, isAuthenticated } = useStore();
    const [user, setUser] = useState(null)

    const [isLoading, setIsLoading] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const fetchdat = async () => {
            try {
                const data = await foundMe()
                if (data.status === 200) {
                    setIsLoading(false)
                    setUser(data.data)
                } else {
                    setIsLoading(false)
                    setUser(null)
                }

            } catch (error) {
                setIsLoading(false)
                setUser(null)
                console.log("error by me ", error)
            }
        }
        fetchdat()
    }, [])

    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: Home },
        { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
        { name: "Patients", href: "/dashboard/patients", icon: Users },
        { name: "Prescriptions", href: "/dashboard/prescriptions", icon: FileText },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ];


    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="animate-pulse text-lg font-medium text-gray-600 dark:text-gray-300">
                    Loading...
                </div>
            </div>
        );
    }



    const sidebarVariants = {
        hidden: { x: -250, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        }
    }

    const NavItem = ({ item, isMobile = false }) => {
        const isActive = pathname === item.href
        return (
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <Link
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out
                        ${isActive
                            ? "bg-blue-100 text-blue-700 shadow-sm"
                            : "text-gray-700 hover:bg-gray-100"}`}
                    onClick={() => isMobile && setIsMobileMenuOpen(false)}
                >
                    <item.icon
                        className={`mr-3 h-5 w-5 transition-colors duration-200
                            ${isActive ? "text-blue-700" : "text-gray-500 group-hover:text-gray-700"}`}
                    />
                    {item.name}
                </Link>
            </motion.div>
        )
    }


    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            {/* Desktop Sidebar */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={sidebarVariants}
                className="hidden md:flex md:w-64 md:flex-col"
            >
                <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <div className="flex items-center flex-shrink-0 px-4">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl font-semibold dark:text-white"
                        >
                            HBSDocs
                        </motion.span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="px-4 mt-6"
                    >
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={user?.image} alt="Dr. John Doe" />
                                <AvatarFallback>{user?.username || "DC"}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium dark:text-white">Dr.{user?.username}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.departmemnt || "All In One"}</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.nav
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-6 flex-1 px-2 space-y-1"
                    >
                        <AnimatePresence>
                            {navigation.map((item) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <NavItem item={item} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.nav>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="p-2 mt-6"
                    >
                        <Button
                            variant="outline"
                            className="w-full justify-start hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                            asChild
                        >
                            <Link href="/">
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </motion.div>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetContent side="left" className="w-64 p-0">
                    <div className="flex flex-col h-full bg-white dark:bg-gray-800 transition-colors duration-300">
                        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                            <span className="text-xl font-semibold dark:text-white">HBSDocs</span>
                        </div>
                        <div className="px-4 py-4">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src="/placeholder.svg" alt="Dr. John Doe" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium dark:text-white">Dr. John Doe</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Cardiology</p>
                                </div>
                            </div>
                        </div>
                        <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
                            {navigation.map((item) => (
                                <NavItem key={item.name} item={item} isMobile={true} />
                            ))}
                        </nav>
                        <div className="p-2 mt-6 border-t dark:border-gray-700">
                            <Button
                                variant="outline"
                                className="w-full justify-start hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                                asChild
                            >
                                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </Link>
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Main Content */}
            <div className="flex flex-col flex-1 overflow-hidden">
                <motion.div
                    initial={false}
                    animate={{
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        y: 0
                    }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-center h-16 flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 sticky top-0 z-10 transition-colors duration-300`}
                >
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5 dark:text-white" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </SheetTrigger>
                    </Sheet>

                    <div className="ml-4 flex justify-between items-center w-full md:ml-0">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-lg font-medium dark:text-white"
                        >
                            {navigation.find((item) => item.href === pathname)?.name || "Dashboard"}
                        </motion.h1>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={toggleTheme}
                            className="p-2 rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                            {theme === "light" ?
                                <Sun className="h-5 w-5" /> :
                                <Moon className="h-5 w-5 dark:text-white" />
                            }
                        </motion.button>
                    </div>
                </motion.div>

                <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    )
}