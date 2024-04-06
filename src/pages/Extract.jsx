import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import api from "../services/api";
import ExtractCard from "../partials/extract/ExtractCard";
import ExtractCardByCollaborator from "../partials/extract/ExtractCardByCollaborator";

function Extract() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [showByCollaborator, setShowByCollaborator] = useState(false);

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
            {showByCollaborator ? (
              <ExtractCardByCollaborator data={data} />
            ) : (
              <ExtractCard data={data} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Extract;
