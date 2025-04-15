import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRoleSelect: (role: 'patient' | 'doctor') => void;
  onPhoneSubmit: (phone: string) => void;
  step: 'role' | 'phone';
  onStepChange: (step: 'role' | 'phone') => void;
}

export function AuthModal({ isOpen, onClose, onRoleSelect, onPhoneSubmit, step, onStepChange }: AuthModalProps) {
  const [phone, setPhone] = React.useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-lg flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl px-10 py-8 w-full max-w-lg relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            {step === 'role' ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-900">Register as</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => onRoleSelect('patient')}
                    className="p-4 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-indigo-600">Patient</h3>
                    <p className="text-sm text-gray-600">Book appointments and manage your health</p>
                  </button>
                  <button
                    onClick={() => onRoleSelect('doctor')}
                    className="p-4 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-indigo-600">Doctor</h3>
                    <p className="text-sm text-gray-600">Manage your practice and patients</p>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <span 
                  className='cursor-pointer text-indigo-600 hover:text-indigo-800' 
                  onClick={() => onStepChange('role')}
                >
                  ← Back
                </span>
                <h2 className="text-2xl font-bold text-center text-gray-900">Enter your phone number</h2>
                <div className="space-y-4">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    onClick={() => onPhoneSubmit(phone)}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}