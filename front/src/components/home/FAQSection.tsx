import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge} from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Globe, Phone } from 'lucide-react';

interface FAQSectionProps {
    isDarkMode: boolean;
    handlePatientLogin: () => void;
}

const faqData = [
    {
        question: 'How do I book an appointment with a doctor?',
        answer:
            "You can easily book an appointment by clicking the 'Book Now' button, selecting your preferred doctor and specialty, choosing an available time slot, and confirming your booking. You'll receive instant confirmation via SMS and email.",
    },
    {
        question: 'Are the doctors on your platform verified and licensed?',
        answer:
            'Yes, all doctors on our platform are thoroughly verified. We check their medical licenses, certifications, educational background, and professional experience. Only qualified and licensed healthcare professionals are allowed to practice on our platform.',
    },
    {
        question: 'Can I have video consultations with doctors?',
        answer:
            'Absolutely! We offer secure video consultations for many medical conditions. You can consult with doctors from the comfort of your home using our HIPAA-compliant video platform available on web and mobile apps.',
    },
    {
        question: 'What are your consultation fees and payment options?',
        answer:
            'Consultation fees vary by doctor and specialty, typically ranging from $50-200. We accept all major credit cards, debit cards, digital wallets, and most insurance plans. You can view exact fees before booking.',
    }
];

export function FAQSection({ isDarkMode, handlePatientLogin }: FAQSectionProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, duration: 0.8 } },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
    };

    return (
        <motion.section
            className={`py-20 transition-colors duration-500 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div className="text-center mb-16" variants={itemVariants}>
                    <Badge className="bg-gray-100 text-gray-700 px-4 py-2 mb-4">FAQ</Badge>
                    <h3 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Frequently Asked Questions
                    </h3>
                    <p className={`text-xl max-w-3xl mx-auto transition-colors duration-500 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Get answers to common questions about our platform, booking process, and healthcare services.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
                    <Accordion type="single" collapsible className="space-y-4">
                        {faqData.map((faq, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.01 }}
                                className={`rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}
                            >
                                <AccordionItem value={`item-${index}`} className="border-none">
                                    <AccordionTrigger className={`px-6 py-4 hover:no-underline ${isDarkMode ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'}`}>
                                        <div className="flex items-center space-x-4">
                                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                                {index + 1}
                                            </div>
                                            <span className="text-left font-semibold">{faq.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className={`px-6 pb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        <div className="ml-12">
                                            <p className="leading-relaxed">{faq.answer}</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </motion.div>
                        ))}
                    </Accordion>
                </motion.div>

                <motion.div variants={itemVariants} className="text-center mt-12">
                    <p className={`mb-4 transition-colors duration-500 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Still have questions? We&apos;re here to help!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
                            onClick={handlePatientLogin}
                        >
                            <Phone className="w-4 h-4 mr-2" />
                            Contact Support
                        </Button>
                        <Button
                            variant="outline"
                            className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-xl"
                        >
                            <Globe className="w-4 h-4 mr-2" />
                            Visit Help Center
                        </Button>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};