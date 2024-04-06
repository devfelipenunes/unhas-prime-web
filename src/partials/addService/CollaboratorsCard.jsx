import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../services/api";

function CollaboratorsCard({
  data,
  handleDeleteCollaborator,
  handleEditCollaborator,
}) {
  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Colaboradores
        </h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm w-full">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Nome</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Porcentagem</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-end">Ações</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {/* Rows */}
              {data.map((collaborator, index) => {
                console.log(collaborator);
                const percentage = parseFloat(collaborator.percentage)
                  .toFixed(2)
                  .replace(/\.?0*$/, "");

                return (
                  <tr key={index}>
                    <td className="p-2">
                      <div className="text-left">{collaborator.nome}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        <div className="text-slate-800 dark:text-slate-100">
                          {percentage}%
                        </div>
                      </div>
                    </td>
                    <td className="p-2 flex justify-end">
                      <div>
                        <button
                          onClick={() => handleEditCollaborator(collaborator)}
                          className="ml-2 btn bg-indigo-500 hover:bg-indigo-600 text-white"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteCollaborator(collaborator)}
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
    </div>
  );
}

CollaboratorsCard.propTypes = {
  data: PropTypes.array.isRequired,
};

export default CollaboratorsCard;
