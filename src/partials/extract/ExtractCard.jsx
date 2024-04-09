import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function ExtractCard({ data }) {
  const [dadosAgrupados, setDadosAgrupados] = useState({});

  function compararPorNome(a, b) {
    return a.collaborator_nome.localeCompare(b.collaborator_nome);
  }

  function compararPorServico(a, b) {
    return a.servico_nome.localeCompare(b.servico_nome);
  }

  function compararPorValor(a, b) {
    return parseFloat(a.servico_preco) - parseFloat(b.servico_preco);
  }

  function compararPorData(a, b) {
    const dataA = new Date(a.sale_created_at);
    const dataB = new Date(b.sale_created_at);
    return dataB - dataA;
  }

  useEffect(() => {
    function agruparPorDia(dados) {
      const grupos = {};
      dados.forEach((item) => {
        const data = new Date(item.sale_created_at);
        const dia = data.toLocaleString("pt-BR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
        if (!grupos[dia]) {
          grupos[dia] = [];
        }
        grupos[dia].push(item);
      });
      return grupos;
    }

    setDadosAgrupados(agruparPorDia(data.sort(compararPorData)));
  }, [data]);

  function formatarDataHora(dataHora) {
    const data = new Date(dataHora);

    data.setHours(data.getHours() + 3);

    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, "0");
    const minutos = String(data.getMinutes()).padStart(2, "0");
    const segundos = String(data.getSeconds()).padStart(2, "0");

    const dataFormatada = `${dia}/${mes}/${ano} - ${horas}:${minutos}:${segundos}`;
    return dataFormatada;
  }
  function normalizarValor(valor) {
    return parseFloat(valor.replace(",", "."));
  }

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Extrato
        </h2>
      </header>
      <div className="p-3">
        {Object.keys(dadosAgrupados).map((dia) => {
          const somaDia = dadosAgrupados[dia].reduce(
            (total, collaborator) =>
              total + normalizarValor(collaborator.servico_preco),
            0
          );

          return (
            <div
              key={dia}
              className="mb-4"
            >
              <h3 className="text-lg font-semibold mb-2">{`Dia ${dia}`}</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
                    <tr>
                      <th
                        className="p-2 border border-slate-100 dark:border-slate-700 cursor-pointer"
                        onClick={() =>
                          alterarOrdenacaoPorDia(dia, compararPorNome)
                        }
                      >
                        <div className="font-semibold text-left">Nome</div>
                      </th>
                      <th
                        className="p-2 border border-slate-100 dark:border-slate-700 cursor-pointer"
                        onClick={() =>
                          alterarOrdenacaoPorDia(dia, compararPorServico)
                        }
                      >
                        <div className="font-semibold text-center">Serviço</div>
                      </th>
                      <th
                        className="p-2 border border-slate-100 dark:border-slate-700 cursor-pointer"
                        onClick={() =>
                          alterarOrdenacaoPorDia(dia, compararPorValor)
                        }
                      >
                        <div className="font-semibold text-center">Valor</div>
                      </th>
                      <th className="p-2 border border-slate-100 dark:border-slate-700">
                        <div className="font-semibold text-center">Método</div>
                      </th>
                      <th
                        className="p-2 border border-slate-100 dark:border-slate-700 cursor-pointer"
                        onClick={() =>
                          alterarOrdenacaoPorDia(dia, compararPorData)
                        }
                      >
                        <div className="font-semibold text-end">Data</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
                    {dadosAgrupados[dia].map((collaborator) => (
                      <tr key={collaborator.id}>
                        <td className="p-2 border border-slate-100 text-center dark:border-slate-700">
                          {collaborator.collaborator_nome}
                        </td>
                        <td className="p-2 border border-slate-100 text-center dark:border-slate-700">
                          {collaborator.servico_nome}
                        </td>
                        <td className="p-2 border border-slate-100 dark:border-slate-700 text-center">
                          R${" "}
                          {normalizarValor(collaborator.servico_preco).toFixed(
                            2
                          )}
                        </td>
                        <td className="p-2 border border-slate-100 dark:border-slate-700 text-center">
                          {collaborator.sale_paymentMethod}
                        </td>
                        <td className="p-2 border border-slate-100 dark:border-slate-700 text-end">
                          {formatarDataHora(collaborator.sale_created_at)}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td
                        colSpan="3"
                        className="p-2 border border-slate-100 dark:border-slate-700 text-right"
                      >
                        <div className="font-semibold">Total do Dia:</div>
                      </td>
                      <td className="p-2 border border-slate-100 dark:border-slate-700 text-end">
                        <div className="font-semibold text-green-500">
                          R$ {somaDia.toFixed(2)}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

ExtractCard.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ExtractCard;
