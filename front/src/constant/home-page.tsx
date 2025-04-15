export const doctors = [
    {
        name: "Dr. John Smith",
        specialty: "Cardiac Rehabilitation Programs",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
        rating: 4.9,
        reviews: 11
    },
    {
        name: "Dr. Maria Garcia",
        specialty: "Gynecological Surgery Procedures",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
        rating: 0,
        reviews: 0
    },
    {
        name: "Dr. Hiroshi Tanaka",
        specialty: "Child Behavioral Health Services",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
        rating: 0,
        reviews: 0
    },
    {
        name: "Dr. Anastasia Ivanova",
        specialty: "Neonatal Intensive Care",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
        rating: 4.5,
        reviews: 2
    },
    {
        name: "Dr. Chen Wei",
        specialty: "Pediatric Vaccination Programs",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
        rating: 0,
        reviews: 0
    },
    {
        name: "Dr. Fatima Khan",
        specialty: "Radiation Therapy Procedures",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
        rating: 0,
        reviews: 0
    },
    {
        name: "Dr. Kim Min-ji",
        specialty: "Cardiac Electrophysiology",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
        rating: 0,
        reviews: 0
    },
    {
        name: "Dr. Muhammad Ali",
        specialty: "Asthma Management Services",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
        rating: 0,
        reviews: 0
    }
];

export const plans = [
    {
        name: "Basic Package",
        price: 500,
        discountedPrice: 400,
        features: [
            "Brain-Head",
            "Report & Scan",
            "Consultation Included",
            { disabled: true, text: "Abdomen" },
            { disabled: true, text: "Heart (cardiac)" },
            { disabled: true, text: "Spine (whole)" },
            { disabled: true, text: "Pelvis" }
        ]
    },
    {
        name: "Gold Package",
        price: 1700,
        discountedPrice: 1600,
        featured: true,
        features: [
            "Brain-Head",
            "Abdomen",
            "Pelvis",
            "Report & Scan",
            "Heart (cardiac)",
            "Consultation Included",
            { disabled: true, text: "Spine (whole)" }
        ]
    },
    {
        name: "Platinum Package",
        price: 2000,
        features: [
            "Brain-Head",
            "Abdomen",
            "Pelvis",
            "Spine (whole)",
            "Heart (cardiac)",
            "Consultation Included",
            "Report & Scan"
        ]
    }
];

export const testimonials = [
    {
        image: "https://images.unsplash.com/photo-1504814532849-cff240bbc503?auto=format&fit=crop&q=80&w=300&h=300",
        name: "Sarah Thompson",
        role: "Patient",
        text: "The care and attention I received was exceptional. The doctors were thorough and took the time to explain everything."
    },
    {
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300",
        name: "Michael Rodriguez",
        role: "Patient",
        text: "Booking appointments was a breeze, and the follow-up care was outstanding. Highly recommend their services!"
    },
    {
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=300&h=300",
        name: "Emily Chen",
        role: "Patient",
        text: "The medical team here is amazing. They made me feel comfortable and well-cared for throughout my treatment."
    },
    {
        image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=300&h=300",
        name: "David Wilson",
        role: "Patient",
        text: "Professional, punctual, and caring. The entire staff goes above and beyond to ensure patient satisfaction."
    }
];