"use client";

import { useState } from "react";
import { AxiosInstance } from "@/helpers/Axios.instance";
import { loadRazorpay } from "@/helpers/Helper";
import toast from "react-hot-toast";
import { AppointmentDetails } from "@/types/appointment";

interface Props {
  appointment: AppointmentDetails;
  onBack: () => void;
  onSuccess: () => void;
}

export default function StepThreePayment({ appointment, onBack, onSuccess }: Props) {
  const [paymentMethod, setPaymentMethod] = useState<"Online" | "Offline">("Offline");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  const appointmentFees = Number(appointment.doctor?.appointmentFees || 0);
  const finalAmount = appointmentFees - discount;

  const applyCoupon = async () => {
    try {
      const res = await AxiosInstance.post("/coupon/validate", { code: couponCode });
      setDiscount(res.data.discount || 0);
      toast.success("Coupon applied");
    } catch {
      toast.error("Invalid coupon");
    }
  };

  const completeBooking = async () => {
    try {
      setLoading(true);

      // Step 1: Save booking info (date, time, paymentType etc)
      const bookingRes = await AxiosInstance.post(
        `/appointment/${appointment.id}/complete-booking`,
        {
          paymentType: paymentMethod,
          date: appointment.date,
          time: appointment.time,
          couponCode,
          discountAmount: discount,
          appointmentFees,
          finalAmount,
        }
      );

      if (paymentMethod === "Offline") {
        toast.success("Appointment booked");
        onSuccess();
        return;
      }

      // Step 2: Create Razorpay Order
      const { data } = await AxiosInstance.post("/payment/razorpay/appointment/create", {
        appointmentId: bookingRes.data.appointmentId,
        amount: finalAmount,
      });

      const razorpayLoaded = await loadRazorpay();
      if (!razorpayLoaded) {
        toast.error("Razorpay SDK failed");
        return;
      }

      const options = {
        key: data.key,
        amount: data.amount,
        currency: "INR",
        name: "Doctor Appointment",
        order_id: data.razorpayOrderId,
        prefill: {
          name: appointment.patientName,
          email: appointment.patientEmail,
          contact: appointment.phoneNumber,
        },
        handler: async function (response) {
          await AxiosInstance.post("/payment/razorpay/appointment/verify", response);
          toast.success("Payment successful");
          onSuccess();
        },
        theme: { color: "#2563eb" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", () => {
        toast.error("Payment failed");
      });

    } catch (err) {
      console.error(err);
      toast.error("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">Payment</h2>

      {/* Coupon */}
      <div className="flex mb-4 gap-2">
        <input
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Coupon Code"
          className="border px-3 py-2 rounded w-full"
        />
        <button onClick={applyCoupon} className="bg-blue-600 text-white px-4 rounded">
          Apply
        </button>
      </div>

      {/* Payment Method */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setPaymentMethod("Offline")}
          className={`flex-1 p-3 border rounded ${paymentMethod === "Offline" ? "border-blue-500 bg-blue-50" : ""}`}
        >
          💵 Cash
        </button>
        <button
          onClick={() => setPaymentMethod("Online")}
          className={`flex-1 p-3 border rounded ${paymentMethod === "Online" ? "border-blue-500 bg-blue-50" : ""}`}
        >
          💳 Online
        </button>
      </div>

      {/* Amount */}
      <div className="mb-4 text-sm">
        <div className="flex justify-between">
          <span>Fees</span>
          <span>₹{appointmentFees}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-₹{discount}</span>
          </div>
        )}
        <div className="flex justify-between font-semibold border-t pt-2 mt-2">
          <span>Total</span>
          <span>₹{finalAmount}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between mt-6">
        <button onClick={onBack} className="px-4 py-2 bg-gray-200 rounded">
          Back
        </button>
        <button
          disabled={loading}
          onClick={completeBooking}
          className="px-6 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}
