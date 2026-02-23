import PaymentTable from "@/components/admin/PaymentTable";

export default function Page() {
  return <PaymentTable title="Subscription Payments" endpoint="/payment/subscription-payments" />;
}