'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const Page = () => {
    const searchParams = useSearchParams()
    const [token, setToken] = useState(null)
    const [id, setId] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (searchParams) {
            const token = searchParams.get('token')
            const ID_ = searchParams.get('id')

            if (token && ID_) {
                setToken(token)
                setId(ID_)
            } else {
                setError('Unauthorized Access')
            }
        }
    }, [searchParams])

    if (error) {
        return (
            <div className="text-red-500 text-center p-4">
                {error}
            </div>
        )
    }

    return (
        <div className="p-4 text-green-600">
            Complete Profile -
        </div>
    )
}

export default Page
