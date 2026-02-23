import React from 'react'
import { motion } from 'framer-motion';
const Loader = () => {
    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full bg-white z-[9999] flex items-center justify-center bg-opacity-100">
                <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="h-16 w-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"
                        transition={{ repeat: Infinity }}
                    />
                    <motion.p
                        className="mt-4 text-blue-600 font-semibold text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        Loading, please wait...
                    </motion.p>
                </motion.div>
            </div>

        </>
    )
}

export default Loader