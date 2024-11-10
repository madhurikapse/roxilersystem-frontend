import React, { useState, useEffect,useCallback } from "react";
import axios from "axios";
import "./App.css";
import MonthAndSearch from "./monthAndSearch";
import TransactionTable from "./transactionTable";
import Statistics from "./statistics";
import BarChart from "./barChart";

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [selectedPerPage, setSelectedPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch transactions based on selected month and search text
  const fetchTransactions = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://rooxilersystem-backend.onrender.com/api/transactions?month=${selectedMonth}&page=${currentPage}&perPage=${selectedPerPage}&search=${searchText}`
      );
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [selectedMonth, currentPage, selectedPerPage, searchText]);

  // Handle month change
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // Handle PerPage Change
  const handlePerPageChange = (e) => {
    setSelectedPerPage(e.target.value);
  };

  // Handle search text change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Handle search box clear
  const handleSearchClear = () => {
    setSearchText("");
  };

  // Handle pagination
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <div className="bg-[#edf6f6]">
      <div className="flex items-center justify-center p-5">
        <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center">
          <p className="text-[#464646] font-bold text-xl">
            Transaction
            <br />
            Dashboard
          </p>
        </div>
      </div>

      <MonthAndSearch
        value={searchText}
        onSearchChange={handleSearchChange}
        onClear={handleSearchClear}
        selectedMonth={selectedMonth}
        onMonthChange={handleMonthChange}
      />
      <TransactionTable
        transactions={transactions}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
        selectedPerPage={selectedPerPage}
        onChange={handlePerPageChange}
        page={currentPage}
      />
      <hr className="border border-b-green-500"></hr>
      <Statistics selectedMonth={selectedMonth} />
      <hr className="border border-b-green-500"></hr>
      <BarChart selectedMonth={selectedMonth} />
    </div>
  );
};

export default App;
