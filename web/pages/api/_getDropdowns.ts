import axios from "axios";
import { QueryParameters } from "./_query";
import qs from 'querystring';
import { JSDOM } from "jsdom";

type DropdownValues = { id: string; name: string }[];

type Dropdowns = {
  ClubCode?: DropdownValues;
  CompCode?: DropdownValues;
  AgeGrp?: DropdownValues;
  Division?: DropdownValues;
  Team?: DropdownValues;
  GameDate?: DropdownValues;
  RoundNo?: DropdownValues;
  GroundCode?: DropdownValues;
};

const getDropdowns = async (queryData: QueryParameters): Promise<Dropdowns> => {
  const rawData = axios.post(
    "https://nsfa.myclubmate.com.au/website/WebsiteComponents/ShowResultsDisplaySelectBoxes.asp",
    qs.encode(queryData)
  );
  const dom = new JSDOM((await rawData).data.toString());
  const document = dom.window.document;
  let data: Dropdowns = {};
  // iterate over dropdowns
  document.querySelectorAll("select").forEach((dropdown) => {
    const values: DropdownValues = [];
    dropdown.querySelectorAll("option").forEach((option, n) => {
      if(n > 0) values.push({ id: option.value, name: option.textContent.trim() });
    });
    Object.assign(data, {
      [dropdown.name]: values,
    });
  });
  return data;
};

export default getDropdowns;
