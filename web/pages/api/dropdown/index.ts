import axios from "axios";
import { QueryParameters } from "../_query";
import { JSDOM } from "jsdom";
import { NextApiHandler } from "next";
import qs from "querystring";

type Dropdowns = { id: string; title?: string }[];
const getDropdowns: NextApiHandler = async (req, res) => {
  const rawData = axios.post(
    "https://nsfa.myclubmate.com.au/website/WebsiteComponents/ShowResultsDisplaySelectBoxes.asp",
    qs.encode(req.query)
  );
  const dom = new JSDOM((await rawData).data.toString());
  const document = dom.window.document;
  let data: Dropdowns = [];
  // iterate over dropdowns
  document.querySelectorAll("select").forEach((dropdown) => {
    data.push({
      id: dropdown.name,
      title: dropdown.querySelector("option:first-child").textContent.trim(),
    });
  });
  res
    .setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=86400")
    .json(data);
};

export default getDropdowns;
