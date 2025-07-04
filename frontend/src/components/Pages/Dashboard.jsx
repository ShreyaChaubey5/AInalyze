import { useState, useEffect } from "react";
import axios from "axios";
import SummaryCard from "../Dashboard/SummaryCard";
import MonthlyChart from "../Dashboard/MonthlyChart";
import RecentBills from "../Dashboard/RecentBills";
import InsightBanner from "../Dashboard/InsightBanner";
import Alert from "../Dashboard/AnamolyAlert";

export default function Dashboard() {
  const [currentMonthTotal, setCurrentMonthTotal] = useState(0);
  const [highestBill, setHighestBill] = useState(0);
  const [recentBills, setRecentBills] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/bill");
        const bills = res.data;
        console.log("Raw bills response:", res.data); 
        let total = 0;
        let highest = 0;
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        const filteredBills = bills.filter((bill) => {
          if (!bill.createdAt) return false;

          const billDate =
            typeof bill.createdAt === "string"
              ? new Date(bill.createdAt)
              : bill.createdAt?._seconds
              ? new Date(bill.createdAt._seconds * 1000)
              : null;

          if (!billDate || isNaN(billDate)) return false;

          return (
            billDate.getMonth() === currentMonth &&
            billDate.getFullYear() === currentYear
          );
        });

        filteredBills.forEach((bill) => {
          const amount = parseFloat(bill.amount || 0);
          total += amount;
          highest = Math.max(highest, amount);
        console.log("Bill createdAt raw:", bill.createdAt);
        });

        setCurrentMonthTotal(total);
        setHighestBill(highest);

        const sortedRecentBills = [...bills]
          .sort((a, b) => {
            const dateA =
              typeof a.createdAt === "string"
                ? new Date(a.createdAt)
                : a.createdAt?._seconds
                ? new Date(a.createdAt._seconds * 1000)
                : 0;

            const dateB =
              typeof b.createdAt === "string"
                ? new Date(b.createdAt)
                : b.createdAt?._seconds
                ? new Date(b.createdAt._seconds * 1000)
                : 0;

            return dateB - dateA;
          })
          .slice(0, 5);

        setRecentBills(sortedRecentBills);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    fetchBills();
  }, []);

  return (
    <div className="min-h-screen bg-[--color-bg] p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <SummaryCard title="Total This Month" amount={`₹${currentMonthTotal}`} />
        <SummaryCard title="Highest Bill" amount={`₹${highestBill}`} />
        <SummaryCard title="AI Saving Tip" tip="Use fan instead of AC!" />
      </div>

      <InsightBanner text="Your spending data is up-to-date!" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <MonthlyChart bills={recentBills} />
        <RecentBills bills={recentBills} />
        <Alert currentAmount={currentMonthTotal} limit={4000} />
      </div>
    </div>
  );
}
