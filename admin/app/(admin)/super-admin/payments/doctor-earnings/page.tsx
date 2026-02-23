import PaymentTable from "@/components/admin/PaymentTable";

export default function Page() {
  return <PaymentTable title="Doctor Earnings" endpoint="/payment/doctor-earnings" />;
}