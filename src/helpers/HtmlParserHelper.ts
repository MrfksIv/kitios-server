import * as cheerio from "cheerio";
type ParsedTable = {headers: string[], body: string[][]};

let $: CheerioStatic | null = null;

export function loadHTML(html: string) {
    $ = cheerio.load(html);
}
export function findElement(element: string) {
    if ($ === null) {
        throw new Error('Please load the html before searching for elements');
    }
    return  $(element);
}


export function parseTable(table: Cheerio): ParsedTable {
    function parseHeaders(): string[] {
        const headers: string[] = [];
        table.find('thead').find('th').map((i, elem) => {
            const elemText = $(elem).text();
            if (elemText.trim().length > 0) {
                headers.push(elemText);
            }
        });
        return headers;
    }

    function parseBody(): string[][] {
        const tableRows: string[][] = [];
        table.find('tbody').find('tr').each((i, row) => {
            const rowVals = [];
            $(row).find('td').each((j, cell) => {
                const cellText = $(cell).text();
                if (cellText.trim().length > 0) {
                    rowVals.push(cellText);
                }
            });
            tableRows.push(rowVals);
        });
        return tableRows;
    }

    const headers = parseHeaders();
    const body = parseBody();
    return {headers, body};
}

export function parsedTableToJSON(table: ParsedTable, strictCheck=true) {
     const {headers, body} = table;
     if (strictCheck) {
         const headersLen = headers.length;
         body.forEach((row) => {
             if (row.length !== headersLen) {
                 throw new Error('Headers / Row length mismatch when trying to parse table');
             }
         });
     }
     headers.forEach
}

