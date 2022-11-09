import * as XLSX from "xlsx";
import React from "react";
import moment from "moment";
function convertArrayOfObjectsToCSV(args) {
    let result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item) {
        ctr = 0;
        keys.forEach(function(key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}
export const downloadCSV = (args, report) => {
    let data, filename, link;
    let csv = convertArrayOfObjectsToCSV({
        data: report
    });
    if (csv == null) return;

    filename = args.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
}

export const downloadXLSX = report => {
    let heading = [['Category', 'Total', 'Assigned', 'Available', 'Not Available', 'Waiting for recycling', 'Recycled']]
    let workSheet = XLSX.utils.json_to_sheet(report, { origin: 'A2', skipHeader: true })
    let workBook = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(workSheet, heading);
    XLSX.utils.book_append_sheet(workBook, workSheet, "Report")
    let buffer = XLSX.write(workBook, {bookType:"xlsx", type:"buffer"})
    XLSX.write(workBook, {bookType:"xlsx", type:"binary"})
    XLSX.writeFile(workBook, `Report-${moment(new Date()).format("DD-MM-YYYY")}.xlsx`)
}