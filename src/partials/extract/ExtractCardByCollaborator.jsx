import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../services/api";

function ExtractCardByCollaborator({ data }) {
  const [groupedData, setGroupedData] = useState({});

  useEffect(() => {
    // Função para agrupar os dados por dia e colaborador
    function groupDataByDayAndCollaborator(data) {
      const grouped = {};
      data.forEach((item) => {
        const date = new Date(item.sale_created_at).toLocaleDateString("pt-BR"); // Formatar data para o formato brasileiro
        const time = new Date(item.sale_created_at).toLocaleTimeString("pt-BR"); // Formatar hora para o formato brasileiro
        const dateTime = `${date} - ${time}`; // Concatenar data e hora
        const collaboratorId = item.collaborator_id;
        if (!grouped[date]) {
          grouped[date] = {};
        }
        if (!grouped[date][collaboratorId]) {
          grouped[date][collaboratorId] = [];
        }
        grouped[date][collaboratorId].push({
          ...item,
          sale_created_at: dateTime,
        }); // Incluir a nova data/hora formatada
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
        {/* Renderizar grupos */}
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
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
                      <tr>
                        <th className="p-2 whitespace-nowrap">Nome</th>
                        <th className="p-2 whitespace-nowrap">Serviço</th>
                        <th className="p-2 whitespace-nowrap">Valor</th>
                        <th className="p-2 whitespace-nowrap">Data</th>
                      </tr>
                    </thead>
                    {/* Tabela body */}
                    <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
                      {groupedData[date][collaboratorId].map((sale) => (
                        <tr key={sale.id}>
                          <td className="p-2 whitespace-nowrap">
                            <div className="font-medium text-slate-800 dark:text-slate-100">
                              {sale.collaborator_nome}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="font-medium text-slate-800 text-center dark:text-slate-100">
                              {sale.servico_nome}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-center font-medium text-green-500">
                              R$ {sale.servico_preco}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-end font-medium text-green-500">
                              {sale.sale_created_at}
                            </div>
                          </td>
                        </tr>
                      ))}
                      {/* Calcular e exibir o total do colaborador */}

                      <tr>
                        <td
                          colSpan="3"
                          className="p-2 whitespace-nowrap text-right"
                        >
                          <div className="font-medium">
                            Total do Colaborador:
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap ">
                          <div className="font-medium  text-green-500 text-end">
                            R${" "}
                            {groupedData[date][collaboratorId]
                              .reduce(
                                (total, sale) =>
                                  total + parseFloat(sale.servico_preco),
                                0
                              )
                              .toFixed(2)}
                          </div>
                        </td>
                      </tr>

                      {/* Calcular e exibir a porcentagem do colaborador 
                      <tr>
                        <td
                          colSpan="3"
                          className="p-2 whitespace-nowrap text-right"
                        >
                          <div className="font-medium">
                            Porcentagem do Colaborador:
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap ">
                          <div className="font-medium  text-green-500 text-end">
                            {(
                              (groupedData[date][collaboratorId].reduce(
                                (total, sale) =>
                                  total + parseFloat(sale.servico_preco),
                                0
                              ) *
                                parseFloat(
                                  groupedData[date][collaboratorId][0]
                                    .collaborator_percentage
                                )) /
                              groupedData[date][collaboratorId].reduce(
                                (total, sale) =>
                                  total + parseFloat(sale.servico_preco),
                                0
                              )
                            ).toFixed(2)}
                          </div>
                        </td>
                      </tr>
                              */}
                    </tbody>
                  </table>
                </div>
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
