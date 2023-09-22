import React from "react";
import TableRow from "./TableRow";

export default function CustomTable({ rows, fields, children, setSelectItem,msgNotRows,isDisabledCondition }) {
  const tableStyle = {
    background: "#1f1f1f",
    borderRadius: "12px",
    color: "#f1f1f1",
    textAlign: "center",
    fontSize:'0.8rem',
    overflow:"hidden",
    marginTop:"1rem"
  };
  const thStyle = {
    background: "rgb(20, 20, 20)",
    color: "rgb(126, 126, 126)",
    fontSize:'0.8rem',
    
  };
  const leftThStyle = {
    borderBottomLeftRadius: "12px",
    borderTopLeftRadius: "12px",
  };
  const rightThStyle = {
    borderBottomRightRadius: "12px",
    borderTopRightRadius: "12px",
  };

  const setAccionItem = (item) => {
    setSelectItem(item)
  }

  const isDisabled = (row, child) => {
    return isDisabledCondition ? isDisabledCondition(row, child) : false;
  };
  return (
    <div className="table-responsive">
      <table  style={tableStyle} className="col-12">
        <thead>
          <tr>
            <th className="p-2" style={{ ...leftThStyle, ...thStyle }}>N°</th>
            {fields.map((field) => (
              <th style={thStyle} key={field[0]}>
                {field[1]}
              </th>
            ))}
            {children && (
              <th style={{ ...rightThStyle, ...thStyle }}>Acciones</th>
            )}
          </tr>
        </thead>
        <tbody>
          {(!rows || rows.length == 0)&& <>
          <tr><td colSpan='900'>{msgNotRows}</td></tr>
          </> }
          {rows.map((row, index) => (
            <tr className="rowTable" key={index}>
              <td>{index + 1}</td>
              {fields.map((field) => (
                <td key={field[0]} onClick={()=>setAccionItem(row)}>{row[field[0]]}</td>
              ))}
              {(React.Children.count(children)>=2)?
              <td className="action-field">
                  <button className="btn btn-secondary dropdown-toggle btn btn-danger btn_table" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul className="dropdown-menu">
                    {React.Children.map(children,(child,i) => <><li className={`text-center btn dropdown-item p-0 ${isDisabled(row,child)?'disabled':''}`} key={i} onClick={()=>setAccionItem(row)}>{child}</li><li><hr className="dropdown-divider"/></li></>)}
                  </ul>
              </td>
              :
              <td className="action-field">{children}</td>
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
