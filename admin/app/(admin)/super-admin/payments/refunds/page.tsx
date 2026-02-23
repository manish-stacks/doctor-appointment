import PaymentTable from "@/components/admin/PaymentTable";

export default function Page() {
  return <PaymentTable title="Refunds" endpoint="/payment/refunds" />;
}