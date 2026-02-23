import PaymentTable from "@/components/admin/PaymentTable";

export default function Page() {
  return <PaymentTable title="Payout Management" endpoint="/payment/doctor-earnings" />;
}