import React, { useState, useEffect } from 'react';
import XLSX from 'xlsx';

import './App.css';

const extractName = (rowData) => {
  const result = /(\w+(?:,)? \w+).*/.exec(rowData);
  if (result) {
    return result[1].trim();
  }
};

const compareSheets = (qb, srs) => {
  const missingQB = srs.filter(
    (person) => !qb.find((p) => p.name != null && person.name.includes(p.name))
  );

  const missingSRS = qb.filter(
    (person) => !srs.find((p) => p.name != null && person.name.includes(p.name))
  );

  const sameNameDiffTotal = srs
    .map((person) => {
      const qbPerson = qb.find(
        (p) => p.name != null && person.name.includes(p.name.trim())
      );

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
    'Missing in QB',
    'Missing in SRS',
    'Same Name Different Total',
  ];
  workbook.Sheets['Missing in QB'] = missingQBSheet;
  workbook.Sheets['Missing in SRS'] = missingSRSSheet;
  workbook.Sheets['Same Name Different Total'] = sameNameDiffTotalSheet;

  XLSX.writeFile(workbook, 'out.xls');
};

export const App = () => {
  const [qb, setQB] = useState(null);
  const [srs, setSRS] = useState(null);
  const [srsFile, setSRSFile] = useState(null);
  const [qbFile, setQBFile] = useState(null);

  const parseQBInput = (data) => {
    const files = data.target.files;
    const reader = new FileReader();

    reader.addEventListener('load', (load) => {
      const data = new Uint8Array(load.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const parsed = XLSX.utils
        .sheet_to_json(workbook.Sheets.Sheet1)
        .map((qbPerson) => ({
          name: extractName(qbPerson['__EMPTY_1']),
          total: qbPerson.TOTAL,
        }))
        .filter((p) => p.name != null);

      setQB(parsed);
    });

    setQBFile(files[0]);
    reader.readAsArrayBuffer(files[0]);
  };

  const parseSRSInput = (data) => {
    const files = data.target.files;
    const reader = new FileReader();

    reader.addEventListener('load', (load) => {
      const data = new Uint8Array(load.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const parsed = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1);

      parsed.pop();

      setSRS(
        parsed.map((srsPerson) => ({
          name: srsPerson['Deceased Name'].trim(),
          total: srsPerson['Total Due'],
        }))
      );
    });

    setSRSFile(files[0]);
    reader.readAsArrayBuffer(files[0]);
  };

  const resetForm = () => {
    setSRSFile(null);
    setQBFile(null);
    setSRS(null);
    setQB(null);
  };

  useEffect(() => {
    if (qb && srs) {
      compareSheets(qb, srs);
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Difference Finder</h1>
      </header>
      <form onReset={resetForm}>
        <div className="field">
          <label className="cursor-pointer label-button" htmlFor="srs-input">
            Select SRS Report
            <input
              id="srs-input"
              type="file"
              accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              className="file-hidden"
              onChange={parseSRSInput}
            ></input>
          </label>
        </div>
        <div className="field">
          <label className="cursor-pointer label-button" htmlFor="qb-input">
            Select QB Report
            <input
              id="qb-input"
              type="file"
              accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              className="file-hidden"
              onChange={parseQBInput}
            ></input>
          </label>
        </div>
        {(srsFile || qbFile) && (
          <button className="btn-reset" type="reset">
            Clear Files
          </button>
        )}
      </form>
      {srsFile && <p>{`Loaded SRS Report: ${srsFile.name}`}</p>}
      {qbFile && <p>{`Loaded QB Report: ${qbFile.name}`}</p>}
    </div>
  );
};
