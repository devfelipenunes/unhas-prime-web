import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Datepicker from "../components/Datepicker";
import DashboardCard07 from "../partials/dashboard/DashboardCard07";
import DashboardCard10 from "../partials/dashboard/DashboardCard10";
import { NavLink } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = () => {
    api
      .get("/sales")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Função para filtrar dados com base nas datas selecionadas
  const handleDateSelect = (selectedDates) => {
    if (selectedDates.length === 2) {
      const startDate = selectedDates[0].toISOString().split("T")[0];
      const endDate = selectedDates[1].toISOString().split("T")[0];
      const filtered = data.filter((item) => {
        const saleDate = item.sale_created_at.split(" ")[0];
        return saleDate >= startDate && saleDate <= endDate;
      });
      setFilteredData(filtered);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            {/* <WelcomeBanner /> */}

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Avatars */}
              {/* <DashboardAvatars /> */}

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                {/* <FilterButton /> */}
                {/* Datepicker built with flatpickr */}
                <Datepicker onSelectDate={handleDateSelect} />
                {/* Add view button */}
                <NavLink to={"/add-service"}>
                  <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                    <svg
                      className="w-4 h-4 fill-current opacity-50 shrink-0"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="hidden xs:block ml-2">
                      Adicionar serviço
                    </span>
                  </button>
                </NavLink>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              <DashboardCard07 data={filteredData} />
              <DashboardCard10 data={filteredData} />

              {/* <DashboardCard13 /> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
