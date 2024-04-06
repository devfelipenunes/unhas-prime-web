import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../services/api";

function DashboardCard07({ data }) {
  const [servicesMap, setServicesMap] = useState({});
  const [totalAllServices, setTotalAllServices] = useState(0);

  useEffect(() => {
    // Função para calcular o total de cada serviço e o total geral
    const calculateTotalPrices = () => {
      const servicesMap = {};
      let totalAllServices = 0;

      // Agrupando os serviços pelo nome
      data.forEach((service) => {
        if (!servicesMap[service.servico_nome]) {
          servicesMap[service.servico_nome] = {
            total: parseFloat(service.servico_preco),
            count: 1,
          };
        } else {
          servicesMap[service.servico_nome].total += parseFloat(
            service.servico_preco
          );
          servicesMap[service.servico_nome].count += 1;
        }
        totalAllServices += parseFloat(service.servico_preco);
      });

      // Ordena os serviços pelo preço total de forma decrescente
      const sortedServices = Object.entries(servicesMap).sort(
        (a, b) => b[1].total - a[1].total
      );
      const sortedServicesMap = Object.fromEntries(sortedServices);

      return { servicesMap: sortedServicesMap, totalAllServices };
    };

    const { servicesMap, totalAllServices } = calculateTotalPrices();

    setServicesMap(servicesMap);
    setTotalAllServices(totalAllServices);
  }, [data]);

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Top Serviços
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
                  <div className="font-semibold text-left">Quantidade</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Serviço</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-end">Preço Total</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {/* Rows */}
              {Object.keys(servicesMap).map((serviceName) => (
                <tr key={serviceName}>
                  <td className="p-2">
                    <div className="text-left">
                      {servicesMap[serviceName].count}
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">
                      <div className="text-slate-800 dark:text-slate-100">
                        {serviceName}
                      </div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-end text-emerald-500">
                      R$ {servicesMap[serviceName].total.toFixed(2)}
                    </div>
                  </td>
                </tr>
              ))}
              {/* Total row */}
              <tr>
                <td className="p-2">
                  <div className="font-semibold text-right">Total Geral</div>
                </td>
                <td
                  colSpan="2"
                  className="p-2"
                >
                  <div className="text-center text-emerald-500">
                    R$ {totalAllServices.toFixed(2)}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

DashboardCard07.propTypes = {
  data: PropTypes.array.isRequired,
};

export default DashboardCard07;
