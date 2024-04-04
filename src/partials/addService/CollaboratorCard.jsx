import React, { useEffect, useState } from "react";
import api from "../../services/api";

function CollaboratorCard({ selectedCollaborator, handleCollaboratorSelect }) {
  const [collaborators, setCollaborators] = useState([]);

  useEffect(() => {
    api
      .get("/collaborators")
      .then((response) => {
        setCollaborators(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Colaboradores
        </h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
              {collaborators.map((collaborator) => {
                return (
                  <tr
                    key={collaborator.id}
                    onClick={() => handleCollaboratorSelect(collaborator.id)}
                    className={
                      selectedCollaborator === collaborator.id
                        ? "bg-indigo-600 cursor-pointer "
                        : "cursor-pointer"
                    }
                  >
                    <td className="p-2 whitespace-nowrap">
                      <div
                        className={
                          selectedCollaborator === collaborator.id
                            ? "font-medium text-white"
                            : "font-medium text-slate-800 dark:text-slate-100"
                        }
                      >
                        {collaborator.nome}
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

export default CollaboratorCard;
