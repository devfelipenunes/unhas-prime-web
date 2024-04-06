import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import api from "../services/api";
import ExtractCard from "../partials/extract/ExtractCard";

function Extract() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState([]);

  // Função para buscar dados da API
  const fetchData = () => {
    api
      .get("/sales")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            <ExtractCard data={data} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Extract;
