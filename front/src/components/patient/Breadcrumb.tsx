import React from 'react'

const Breadcrumb = ({ title }: { title: string }) => {
    return (
        <>
            <div className="w-full mb-6">
                <div className="bg-white py-4 rounded-lg shadow flex justify-between px-5">
                    <h3 className="text-2xl font-semibold text-slate-700 tracking-wider">{title}</h3>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-blue-800 ">Dashboard</span>/
                        <span className="text-sm text-gray-500">{title}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Breadcrumb