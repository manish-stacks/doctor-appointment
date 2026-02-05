import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, CircleX, } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AxiosInstance } from '@/helpers/Axios.instance';
import { useRouter } from 'next/navigation';


interface PricingSectionProps {
  isDarkMode: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  validity: number;
  description: string;
  period: string;
  totalAppointment: number;
  features: string[] | string;
  noAddonFeatures?: string[] | string | null;
  buttonText: string;
  gradient: string;
  buttonStyle: string;
  popular: number; // 0 | 1
}
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 1 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { ease: "easeOut", duration: 0.6 },
  },
};


export function PricingSection({ isDarkMode }: PricingSectionProps) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const router = useRouter();



  const getSubscription = async () => {
    try {
      const { data } = await AxiosInstance.get('/subscription');

      const formattedPlans = data.map((plan: Plan) => ({
        ...plan,
        name: plan.name.trim(),
        features: typeof plan.features === 'string'
          ? JSON.parse(plan.features)
          : plan.features,
        noAddonFeatures: plan.noAddonFeatures
          ? typeof plan.noAddonFeatures === 'string'
            ? JSON.parse(plan.noAddonFeatures)
            : plan.noAddonFeatures
          : [],
      }));

      setPlans(formattedPlans);
    } catch (error) {
      toast.error('Failed to get subscription');
    }
  };

  useEffect(() => {
    getSubscription();
  }, [])


  const handleLogin = () => {
    router.push("/for-doctors");
  };
  return (
    <motion.section
      className={`py-20 transition-colors duration-500 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          {/* <Badge className="bg-orange-100 text-orange-700 px-4 py-2 mb-4">Doctor Pricing</Badge> */}
          <h3 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Transparent, Affordable Healthcare
          </h3>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-500 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Choose the plan that fits your needs. No hidden fees, no surprises, just quality healthcare at fair prices.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans && plans.map((plan, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className={`relative h-full ${plan.popular === 1 ? 'border-blue-500 border-2 shadow-2xl scale-105' : 'border-gray-200 shadow-lg'} ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700' : `bg-gradient-to-br ${plan.gradient}`} hover:shadow-xl transition-all duration-300`}>
                {plan.popular === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 text-sm font-bold shadow-lg">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className={`text-2xl font-bold transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{plan.name}</CardTitle>
                  <div className="mt-6">
                    <span className={`text-5xl font-bold transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {plan.price === 0 ? 'Free' : `₹${plan.price}`}
                    </span>
                    {plan.price !== 0 && (
                      <span className={`ml-2 transition-colors duration-500 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>/{plan.period}</span>
                    )}
                  </div>
                  <CardDescription className={`mt-4 text-lg transition-colors duration-500 ${isDarkMode ? 'text-gray-300' : ''}`}>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <PlanFeatures plan={plan} isDarkMode={isDarkMode} />
                  <Button
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${plan.buttonStyle}`}
                    onClick={() => handleLogin()}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

interface PlanFeaturesProps {
  plan: Plan;
  isDarkMode: boolean;
}

export function PlanFeatures({ plan, isDarkMode }: PlanFeaturesProps) {
  return (
    <ul className="space-y-4 mb-8">
      {plan.features.map((feature, i) => (
        <li key={i} className="flex items-center text-sm">
          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            {feature}
          </span>
        </li>
      ))}

      {plan.noAddonFeatures?.map((feature, i) => (
        <li key={`no-${i}`} className="flex items-center text-sm">
          <CircleX className="w-5 h-5 text-rose-500 mr-3" />
          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            {feature}
          </span>
        </li>
      ))}
    </ul>
  );
}