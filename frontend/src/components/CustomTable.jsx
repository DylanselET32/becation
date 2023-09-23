import React from "react";

export default function CustomTable({ rows, fields, children, setSelectItem, msgNotRows, isDisabledCondition, maxHeight }) {
  const tableStyle = {
    background: "#1f1f1f",
    borderRadius: "12px",
    color: "#f1f1f1",
    textAlign: "center",
    fontSize: '0.8rem',
    overflow: "hidden",
  };

  const thStyle = {
    background: "rgb(20, 20, 20)",
    color: "rgb(126, 126, 126)",
    fontSize: '0.8rem',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  };

  const setAccionItem = (item) => {
    setSelectItem(item);
  };

  const isDisabled = (row, child) => {
    return isDisabledCondition ? isDisabledCondition(row, child) : false;
  };

  return (
    <div className="table-responsive mt-3" style={{ maxHeight: maxHeight }}>
      <table className="table table-dark w-100" style={tableStyle}>
        <thead className="sticky-top">
          <tr>
            <th className="p-2" style={thStyle}>N°</th>
            {fields.map((field) => (
              <th style={thStyle} key={field[0]}>
                {field[1]}
              </th>
            ))}
            {children && (
              <th style={thStyle}>Acciones</th>
            )}
          </tr>
        </thead>
        <tbody>
          {(!rows || rows.length === 0) && (
            <tr>
              <td colSpan={fields.length + 2} className="text-center">{msgNotRows}</td>
            </tr>
          )}
          {rows.map((row, index) => (
            <tr className="rowTable" key={index}>
              <td>{index + 1}</td>
              {fields.map((field) => (
                <td key={field[0]} onClick={() => setAccionItem(row)}>{row[field[0]]}</td>
              ))}
              {React.Children.count(children) >= 2 ? (
                <td className="action-field">
                  <button className="btn btn-secondary dropdown-toggle btn btn-danger btn_table" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul className="dropdown-menu">
                    {React.Children.map(children, (child, i) => (
                      <div key={i}>
                        <li className={`text-center btn dropdown-item p-0 ${isDisabled(row, child) ? 'disabled' : ''}`} onClick={() => setAccionItem(row)}>{child}</li>
                        {i < React.Children.count(children) - 1 && <hr className="dropdown-divider" />}
                      </div>
                    ))}
                  </ul>
                </td>
              ) : (
                <td className="action-field">{children}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
