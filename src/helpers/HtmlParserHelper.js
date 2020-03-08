"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio = require("cheerio");
var $ = null;
function loadHTML(html) {
    $ = cheerio.load(html);
}
exports.loadHTML = loadHTML;
function findElement(element) {
    if ($ === null) {
        throw new Error('Please load the html before searching for elements');
    }
    return $(element);
}
exports.findElement = findElement;
function parseTable(table) {
    function parseHeaders() {
        var headers = [];
        table.find('thead').find('th').map(function (i, elem) {
            var elemText = $(elem).text();
            if (elemText.trim().length > 0) {
                headers.push(elemText);
            }
        });
        return headers;
    }
    function parseBody() {
        var tableRows = [];
        table.find('tbody').find('tr').each(function (i, row) {
            var rowVals = [];
            $(row).find('td').each(function (j, cell) {
                var cellText = $(cell).text();
                if (cellText.trim().length > 0) {
                    rowVals.push(cellText);
                }
            });
            tableRows.push(rowVals);
        });
        return tableRows;
    }
    var headers = parseHeaders();
    var body = parseBody();
    return { headers: headers, body: body };
}
exports.parseTable = parseTable;
function parsedTableToJSON(table, strictCheck) {
    if (strictCheck === void 0) { strictCheck = true; }
    var headers = table.headers, body = table.body;
    if (strictCheck) {
        var headersLen_1 = headers.length;
        body.forEach(function (row) {
            if (row.length !== headersLen_1) {
                throw new Error('Headers / Row length mismatch when trying to parse table');
            }
        });
    }
    headers.forEach;
}
exports.parsedTableToJSON = parsedTableToJSON;
//# sourceMappingURL=HtmlParserHelper.js.map