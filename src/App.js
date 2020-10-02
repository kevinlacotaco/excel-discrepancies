import React, { useState, useEffect } from "react";
import XLSX from "xlsx";

import "./App.css";

const extractName = (rowData) => {
  const result = /(\w+(?:,)? \w+).*/.exec(rowData);
  if (result) {
    return result[1].trim();
  }
};

const compareSheets = (qb, srs) => {
  const missingQB = srs.filter((person) => {
    return !qb.find((p) => {
      return p.name != null && person.name.includes(p.name);
    });
  });

  const missingSRS = qb.filter((person) => {
    return !srs.find((p) => {
      return p.name != null && person.name.includes(p.name);
    });
  });

  const sameNameDiffTotal = srs
    .map((person) => {
      const qbPerson = qb.find((p) => {
        return p.name != null && person.name.includes(p.name.trim());
      });

      if (qbPerson && qbPerson.total !== person.total) {
        return {
          name: person.name,
          qbTotal: qbPerson.total,
          srsTotal: person.total,
        };
      } else if (qbPerson && qbPerson.total === person.total) {
        //console.log("Same", qbPerson.total);
      }

      return null;
    })
    .filter(Boolean);

  const workbook = XLSX.utils.book_new();

  const missingQBSheet = XLSX.utils.json_to_sheet(missingQB);
  const missingSRSSheet = XLSX.utils.json_to_sheet(missingSRS);
  const sameNameDiffTotalSheet = XLSX.utils.json_to_sheet(sameNameDiffTotal);

  workbook.SheetNames = [
    "Missing in QB",
    "Missing in SRS",
    "Same Name Different Total",
  ];
  workbook.Sheets["Missing in QB"] = missingQBSheet;
  workbook.Sheets["Missing in SRS"] = missingSRSSheet;
  workbook.Sheets["Same Name Different Total"] = sameNameDiffTotalSheet;

  XLSX.writeFile(workbook, "out.xls");
};

function App() {
  const [qb, setQB] = useState(null);
  const [srs, setSRS] = useState(null);

  const parseQBInput = (data) => {
    const files = data.target.files;
    const reader = new FileReader();

    reader.addEventListener("load", (load) => {
      const data = new Uint8Array(load.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const parsed = XLSX.utils
        .sheet_to_json(workbook.Sheets.Sheet1)
        .map((qbPerson) => {
          return {
            name: extractName(qbPerson["__EMPTY_1"]),
            total: qbPerson.TOTAL,
          };
        })
        .filter((p) => p.name != null);

      setQB(parsed);
    });

    reader.readAsArrayBuffer(files[0]);
  };

  const parseSRSInput = (data) => {
    const files = data.target.files;
    const reader = new FileReader();

    reader.addEventListener("load", (load) => {
      const data = new Uint8Array(load.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const parsed = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1);

      parsed.pop();

      setSRS(
        parsed.map((srsPerson) => {
          return {
            name: srsPerson["Deceased Name"].trim(),
            total: srsPerson["Total Due"],
          };
        })
      );
    });

    reader.readAsArrayBuffer(files[0]);
  };

  useEffect(() => {
    if (qb && srs) {
      compareSheets(qb, srs);
    }
  });

  return (
    <>
      <header className="App-header"></header>
      <div className="App">
        <div className="field">
          <label htmlFor="srs-input">SRS</label>
          <input
            id="srs-input"
            type="file"
            accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={parseSRSInput}
          ></input>
        </div>
        <div className="field">
          <label htmlFor="qb-input">QB</label>
          <input
            id="qb-input"
            type="file"
            accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={parseQBInput}
          ></input>
        </div>
      </div>
    </>
  );
}

export default App;