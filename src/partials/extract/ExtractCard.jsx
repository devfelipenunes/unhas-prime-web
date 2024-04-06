import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../services/api";

function ExtractCard({ data }) {
  const [dadosAgrupados, setDadosAgrupados] = useState([]);
  const [ordenacaoPorDia, setOrdenacaoPorDia] = useState({});

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
    // Função para agrupar os dados por dia
    function agruparPorDia(dados) {
      const grupos = {};
      dados.forEach((item) => {
        const data = new Date(item.sale_created_at);
        const dia = `${String(data.getDate()).padStart(2, "0")}/${String(
          data.getMonth() + 1
        ).padStart(2, "0")}/${data.getFullYear()}`;
        if (!grupos[dia]) {
          grupos[dia] = [];
        }
        grupos[dia].push(item);
      });
      return grupos;
    }

    const grupos = agruparPorDia(data.sort(compararPorData));
    setDadosAgrupados(grupos);
  }, [data]);

  // Função para formatar a data
  function formatarData(dataString) {
    const data = new Date(dataString);
    const dia = data.getDate();
    const mes = data.getMonth() + 1; // Os meses começam em zero, então adicionamos 1
    const ano = data.getFullYear();
    const horas = data.getHours();
    const minutos = data.getMinutes();
    const segundos = data.getSeconds();
    return `${dia}/${mes}/${ano} - ${horas}:${minutos}:${segundos}`;
  }

  // Função para alterar a ordenação de um determinado dia
  function alterarOrdenacaoPorDia(dia, criterio) {
    setOrdenacaoPorDia((prevOrdenacao) => ({
      ...prevOrdenacao,
      [dia]: criterio,
    }));
  }

  // Função para obter os dados de um dia ordenados conforme o critério atual
  function obterDadosOrdenados(dia) {
    const dadosDoDia = dadosAgrupados[dia] || [];
    const criterio = ordenacaoPorDia[dia] || compararPorData;
    return dadosDoDia.slice().sort(criterio);
  }

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Extrato
        </h2>
      </header>
      <div className="p-3">
        {/* Renderizar grupos */}
        {Object.keys(dadosAgrupados).map((dia) => {
          // Calcular a soma dos valores do dia
          const somaDia = dadosAgrupados[dia].reduce(
            (total, collaborator) =>
              total + parseFloat(collaborator.servico_preco),
            0
          );
          const dadosOrdenados = obterDadosOrdenados(dia);
          console.log(dadosOrdenados);

          return (
            <div
              key={dia}
              className="mb-4"
            >
              <h3 className="text-lg font-semibold mb-2">{`Dia ${dia}`}</h3>
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <button
                          onClick={() =>
                            alterarOrdenacaoPorDia(dia, compararPorNome)
                          }
                        >
                          <div className="font-semibold text-left">Nome</div>
                        </button>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <button
                          onClick={() =>
                            alterarOrdenacaoPorDia(dia, compararPorServico)
                          }
                        >
                          <div className="font-semibold text-center">
                            Serviço
                          </div>
                        </button>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <button
                          onClick={() =>
                            alterarOrdenacaoPorDia(dia, compararPorValor)
                          }
                        >
                          <div className="font-semibold text-center">Valor</div>
                        </button>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Metodo</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <button
                          onClick={() =>
                            alterarOrdenacaoPorDia(dia, compararPorData)
                          }
                        >
                          <div className="font-semibold text-end">Data</div>
                        </button>
                      </th>
                    </tr>
                  </thead>
                  {/* Tabela body */}
                  <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
                    {dadosOrdenados.map((collaborator) => (
                      <tr key={collaborator.id}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="font-medium text-slate-800 dark:text-slate-100">
                            {collaborator.collaborator_nome}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="font-medium text-slate-800 text-center dark:text-slate-100">
                            {collaborator.servico_nome}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-center font-medium text-green-500">
                            R$ {collaborator.servico_preco}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-center font-medium text-green-500">
                            {collaborator.sale_paymentMethod}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-end font-medium text-green-500">
                            {formatarData(collaborator.sale_created_at)}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {/* Mostrar a soma dos valores do dia */}
                    <tr>
                      <td
                        colSpan="3"
                        className="p-2 whitespace-nowrap text-right"
                      >
                        <div className="font-medium">Total do Dia:</div>
                      </td>
                      <td className="p-2 whitespace-nowrap ">
                        <div className="font-medium  text-green-500 text-end">
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
