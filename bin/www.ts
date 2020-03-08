import {parseWebsite, findElement, loadHTML, close, parseTable} from '../src/helpers';
import {Config} from "../src/config/Config";
import * as $ from 'cheerio';
(async () => {
    const html = await parseWebsite(Config.baseSiteUrl + '/locations/' + Config.locations.nicosia);
    loadHTML(html);
    const table = findElement('table');
    const parsedTable = parseTable(table);
    console.log('HEADERS:', parsedTable);
    await close();
})();

