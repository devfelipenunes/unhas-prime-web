import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../services/api";

function ServiceCard({ data, handleDeleteService, handleEditService }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((service) =>
    service.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
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
      <div className="p-3 max-h-[80%] overflow-y-auto">
        {/* Table */}
        <table className="table-auto w-full dark:text-slate-300">
          {/* Table header */}
          <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm w-full">
            <tr>
              <th className="p-2">
                <div className="font-semibold text-left">Nome</div>
              </th>
              <th className="p-2">
                <div className="font-semibold text-center">Valor</div>
              </th>
              <th className="p-2">
                <div className="font-semibold text-end">Ações</div>
              </th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
            {/* Rows */}
            {filteredData.map((service, index) => {
              console.log(service);

              return (
                <tr key={index}>
                  <td className="p-2">
                    <div className="text-left">{service.nome}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">
                      <div className="text-slate-800 dark:text-slate-100">
                        R$ {service.preco}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 flex justify-end">
                    <div>
                      <button
                        onClick={() => handleEditService(service)}
                        className="ml-2 btn bg-indigo-500 hover:bg-indigo-600 text-white"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteService(service)}
                        className="ml-2 btn bg-red-500 hover:bg-red-600 text-white"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

ServiceCard.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ServiceCard;
