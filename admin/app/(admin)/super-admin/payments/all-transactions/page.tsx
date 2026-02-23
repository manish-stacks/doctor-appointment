
import PaymentTable from "@/components/admin/PaymentTable";

export default function Page() {
  return <PaymentTable title="All Transactions" endpoint="/payment/all" />;
}