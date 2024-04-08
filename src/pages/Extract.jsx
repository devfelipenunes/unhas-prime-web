import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Datepicker from "../components/Datepicker"; // Importe o componente Datepicker
import ExtractCard from "../partials/extract/ExtractCard";
import ExtractCardByCollaborator from "../partials/extract/ExtractCardByCollaborator";
import api from "../services/api";

function Extract() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [showByCollaborator, setShowByCollaborator] = useState(false);
  const [filteredData, setFilteredData] = useState([]); // Novo estado para armazenar os dados filtrados

  // Função para buscar dados da API
  const fetchData = () => {
    api
      .get("/sales")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data); // Inicialize os dados filtrados com os dados completos
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Função para filtrar os dados com base nas datas selecionadas
  const handleDateSelect = (selectedDates) => {
    if (selectedDates.length === 2) {
      const startDate = selectedDates[0].toISOString().split("T")[0];
      const endDate = selectedDates[1].toISOString().split("T")[0];
      const filtered = data.filter((item) => {
        const saleDate = item.sale_created_at.split(" ")[0];
        return saleDate >= startDate && saleDate <= endDate;
      });
      setFilteredData(filtered); // Atualize os dados filtrados com base nas datas selecionadas
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
            <div className="flex justify-center mb-4">
              {/* Adicione o Datepicker com a função handleDateSelect */}
              <Datepicker
                align="left"
                onSelectDate={handleDateSelect}
              />
            </div>
            <div className="flex justify-center mb-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4"
                onClick={() => setShowByCollaborator(false)}
              >
                Extrato Geral
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => setShowByCollaborator(true)}
              >
                Extrato por Colaborador
              </button>
            </div>
            {/* Renderizar o componente ExtractCard com os dados filtrados */}
            {showByCollaborator ? (
              <ExtractCardByCollaborator data={filteredData} />
            ) : (
              <ExtractCard data={filteredData} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Extract;
