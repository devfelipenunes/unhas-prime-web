import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../services/api";

function ExtractCardByCollaborator({ data }) {
  const [groupedData, setGroupedData] = useState({});

  useEffect(() => {
    function groupDataByDayAndCollaborator(data) {
      const grouped = {};
      data.forEach((item) => {
        const date = new Date(item.sale_created_at).toLocaleDateString("pt-BR");
        const time = new Date(item.sale_created_at).toLocaleTimeString("pt-BR");
        const dateTime = `${date} - ${time}`;
        const collaboratorId = item.collaborator_id;
        if (!grouped[date]) {
          grouped[date] = {};
        }
        if (!grouped[date][collaboratorId]) {
          grouped[date][collaboratorId] = {
            name: item.collaborator_nome,
            totalSales: 0,
            totalCommission: 0,
            sales: [],
          };
        }
        const salePrice = parseFloat(item.servico_preco);
        const commissionPercentage =
          parseFloat(item.collaborator_percentage) / 100;
        const commissionEarned = salePrice * commissionPercentage;
        grouped[date][collaboratorId].totalSales += salePrice;
        grouped[date][collaboratorId].totalCommission += commissionEarned;
        grouped[date][collaboratorId].sales.push({
          service: item.servico_nome,
          price: salePrice,
          commission: commissionEarned,
          dateTime: dateTime,
        });
      });
      return grouped;
    }

    setGroupedData(groupDataByDayAndCollaborator(data));
  }, [data]);

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Extrato por Colaborador
        </h2>
      </header>
      <div className="p-3">
        {Object.keys(groupedData).map((date) => (
          <div
            key={date}
            className="mb-4"
          >
            <h3 className="text-lg font-semibold mb-2">{`Dia ${date}`}</h3>
            {Object.keys(groupedData[date]).map((collaboratorId) => (
              <div
                key={collaboratorId}
                className="mb-4"
              >
                <h4 className="text-base font-semibold mb-2">
                  {groupedData[date][collaboratorId].name}
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
                      <tr>
                        <th className="p-2 border border-slate-100 dark:border-slate-700">
                          Serviço
                        </th>
                        <th className="p-2 border border-slate-100 dark:border-slate-700">
                          Valor
                        </th>
                        <th className="p-2 border border-slate-100 dark:border-slate-700">
                          Comissão
                        </th>
                        <th className="p-2 border border-slate-100 dark:border-slate-700">
                          Data
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
                      {groupedData[date][collaboratorId].sales.map(
                        (sale, index) => (
                          <tr key={index}>
                            <td className="p-2 border text-center border-slate-100 dark:border-slate-700">
                              {sale.service}
                            </td>
                            <td className="p-2 border text-center border-slate-100 dark:border-slate-700">
                              R$ {sale.price.toFixed(2)}
                            </td>
                            <td className="p-2 border text-center border-slate-100 dark:border-slate-700">
                              R$ {sale.commission.toFixed(2)}
                            </td>
                            <td className="p-2 border text-center border-slate-100 dark:border-slate-700">
                              {sale.dateTime}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
                <tr className="flex flex-col">
                  <div className="w-full flex justify-end">
                    <td
                      colSpan="3"
                      className="p-2 border border-slate-100 dark:border-slate-700 text-right"
                    >
                      <div className="font-semibold">Total de Vendas: </div>
                    </td>
                    <td className="p-2 border border-slate-100 dark:border-slate-700 text-end">
                      <div className="font-semibold text-green-500">
                        R${" "}
                        {groupedData[date][collaboratorId].totalSales.toFixed(
                          2
                        )}
                      </div>
                    </td>
                  </div>

                  <div className="w-full flex justify-end">
                    <td
                      colSpan="3"
                      className="p-2 border border-slate-100 dark:border-slate-700 text-right "
                    >
                      <div className="font-semibold">Total de Comissão:</div>
                    </td>
                    <td className="p-2 border border-slate-100 dark:border-slate-700 text-end">
                      <div className="font-semibold text-green-500">
                        R${" "}
                        {groupedData[date][
                          collaboratorId
                        ].totalCommission.toFixed(2)}
                      </div>
                    </td>
                  </div>
                </tr>
                {/* <div className="mt-2 text-right">
                  <p className="font-semibold">
                    Total de Vendas: R${" "}
                    {groupedData[date][collaboratorId].totalSales.toFixed(2)}
                  </p>
                  <p className="font-semibold">
                    Total de Comissão: R${" "}
                    {groupedData[date][collaboratorId].totalCommission.toFixed(
                      2
                    )}
                  </p>
                </div> */}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

ExtractCardByCollaborator.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ExtractCardByCollaborator;
