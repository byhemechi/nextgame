import axios from "axios";
import { QueryParameters } from "./_query";
import { JSDOM } from "jsdom";
import { NextApiHandler } from "next";
import qs from "querystring";

interface Team {
  club: string;
  team: string;
  flag: string;
}

type Upcoming = {
  roundNumber: number;
  time: number;
  ageGrp: string;
  div: number | string;
  home?: Team;
  away?: Team;
  refs?: number | false;
  ground: { name: string; link: string };
};
const getUpcoming: NextApiHandler = async (req, res) => {
  const rawData = axios.post(
    "https://nsfa.myclubmate.com.au/website/WebsiteComponents/ShowResultsDisplayData.asp",
    qs.encode(req.query)
  );
  const dom = new JSDOM((await rawData).data.toString());
  const document = dom.window.document;
  let data: Partial<Upcoming>[] = [];
  // iterate over dropdowns
  document.querySelectorAll("table:nth-child(5) .DrawRow").forEach((game) => {
    const splitDate = game.children[1].textContent.split(" ");
    data.push({
      roundNumber: parseInt(game.children[0].textContent),
      time: new Date(
        `${game.children[2].textContent} ${splitDate[0].replace(
          /[^0-9]/g,
          ""
        )} ${splitDate[1]} ${splitDate[2].replace(/'/g, "20")}`
      ).getTime(),
      ageGrp: game.children[3].textContent,
      div: parseInt(game.children[4].textContent) || game.children[4].textContent.trim(),
      home: {
        club: game.children[5].textContent.trim(),
        flag: game.children[6].children[0].innerHTML.trim(),
        team: game.children[7].textContent.trim(),
      },

      away: {
        club: game.children[9].textContent.trim(),
        flag: game.children[10].children[0].innerHTML.trim(),
        team: game.children[11].textContent.trim(),
      },
      refs: parseInt(game.children[12].textContent) || false,
      ground: {
        name: game.children[13].textContent.trim(),
        link: `https://nsfa.myclubmate.com.au/website/${game.children[13].querySelector("a").href}`,
      },
    });
  });
  res.json(data);
};

export default getUpcoming;
