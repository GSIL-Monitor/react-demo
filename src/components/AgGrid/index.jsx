import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import axios from 'axios';
import { get } from 'lodash';

const headers = [];
const colLen = 150;
const rows = [];
const rowLen = 20000;
for (let i = 0; i < colLen; i++) {
  headers.push({
    // headerName: `列${i}`,
    // field: `${i}`,
    calculate_method: 3,
    category_id: 1,
    cn_name: `列${i}`,
    editable: true,
    en_name: "Legal Name",
    extra: { data_access_id: "1-2" },
    data_access_id: "1-2",
    field_property: {},
    field_type: 2,
    formula_id: 11226,
    id: 1,
    item_id: `${i}`,
    ref_id: 10081,
  });
}
for (let j = 0, rowTmp, cells; j < rowLen; j++) {
  rowTmp = {
    data_source: 0,
    employee_id: 5750760,
    exception_ids: [],
    id: 138781,
    row_status: 2,
  };
  cells = [];
  for (let k = 0; k < colLen; k++) {
    cells.push({
      id: 8839098,
      item_exception: 0,
      item_id: `${k}`,
      item_status: 0,
      cell_value: {
        adjust: {},
        initial: {},
        real: {
          en_value: null,
          id: "-1",
          value: `行${j}列${k}`,
        },
        remark: "",
      }
    });
  }
  rowTmp.cells = cells;
  rows.push(rowTmp);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        { headerName: "Make", field: "make" },
        { headerName: "Model", field: "model" },
        { headerName: "Price", field: "price" }
      ],
      rowData: [
        { make: "Toyota", model: "Celica", price: 35000 },
        { make: "Ford", model: "Mondeo", price: 32000 },
        { make: "Porsche", model: "Boxter", price: 72000 }
      ]
    }
  }

  // componentDidMount() {
  //   axios.get('https://yapi.bytedance.net/mock/380/bigdata/').then(({ data }) => {
  //     console.log(data)
  //     this.setState({
  //       columnDefs: data.columnDefs.map(({ headerName, field }) => ({ headerName, field: `${field}` })),
  //       rowData: []
  //     });
  //   })
  // }

  render() {
    const rowData = rows.map((row) => {
      const obj = {};
      row.cells.forEach((cell) => {
        obj[cell.item_id] = get(cell, 'cell_value.real.value', '');
      });
      return obj;
    });
    return (
      <div
        className="ag-theme-balham"
        style={{
          height: '100%',
          width: '100%'
        }}
      >
        <AgGridReact
          enableSorting={true}
          enableFilter={true}
          columnDefs={headers.map(hd => ({ headerName: hd.cn_name, field: hd.item_id }))}
          rowData={rowData}>
        </AgGridReact>
      </div>
    );
  }
}

export default App;