import React, { useEffect, useState } from "react";
import api from "../../services/api";

function ServiceCard({ selectedService, handleServiceSelect }) {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    api
      .get("/servicos")
      .then((response) => {
        setServices(response.data);
        setFilteredServices(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const filtered = services.filter((service) =>
      service.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(filtered);
  }, [searchTerm, services]);

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Serviços
        </h2>
        <input
          type="text"
          placeholder="Pesquisar por nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:border-blue-300 dark:bg-slate-700 dark:text-white"
        />
      </header>
      <div className="p-3 max-h-[50%] overflow-y-auto">
        <table className="table-auto w-full dark:text-slate-300">
          {/* Table body */}
          <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
            {/* Row */}
            {filteredServices.map((service) => (
              <tr
                key={service.id}
                onClick={() => handleServiceSelect(service.id)}
                className={
                  selectedService === service.id
                    ? "bg-indigo-600 cursor-pointer"
                    : "cursor-pointer"
                }
              >
                <td className="p-2">
                  <div
                    className={
                      selectedService === service.id
                        ? "text-white"
                        : "text-slate-800 dark:text-slate-100"
                    }
                  >
                    {service.nome}
                  </div>
                </td>
                <td className="p-2">
                  <div
                    className={
                      selectedService === service.id
                        ? "text-white text-end"
                        : "text-end text-slate-800 dark:text-slate-100"
                    }
                  >
                    R$ {service.preco}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ServiceCard;
