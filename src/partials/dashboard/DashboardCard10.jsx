import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../services/api";

function DashboardCard10({ data }) {
  const [collaborators, setCollaborators] = useState([]);

  useEffect(() => {
    const salesByCollaborator = data.reduce((acc, sale) => {
      const collaboratorId = sale.collaborator_id;
      const salePrice = parseFloat(sale.servico_preco);
      const collaboratorPercentage =
        parseFloat(sale.collaborator_percentage) / 100;

      if (!acc[collaboratorId]) {
        acc[collaboratorId] = {
          name: sale.collaborator_nome,
          totalSpent: salePrice,
          commissionEarned: salePrice * collaboratorPercentage,
        };
      } else {
        acc[collaboratorId].totalSpent += salePrice;
        acc[collaboratorId].commissionEarned +=
          salePrice * collaboratorPercentage;
      }

      return acc;
    }, {});

    const sortedCollaborators = Object.values(salesByCollaborator).sort(
      (a, b) => b.totalSpent - a.totalSpent
    );

    setCollaborators(sortedCollaborators);
  }, [data]);

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Top Colaboradores
        </h2>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Nome</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-end">Total Gasto</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-end">Comissão</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
              {collaborators.map((collaborator) => {
                return (
                  <tr key={collaborator.name}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="font-medium text-slate-800 dark:text-slate-100">
                        {collaborator.name}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-end font-medium text-green-500">
                        R$ {collaborator.totalSpent.toFixed(2)}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-end font-medium text-green-500">
                        R$ {collaborator.commissionEarned.toFixed(2)}
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

DashboardCard10.propTypes = {
  data: PropTypes.array.isRequired,
};

export default DashboardCard10;
