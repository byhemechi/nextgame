import axios from "axios";

import { NextApiHandler } from "next";
import getDropdowns from "../_getDropdowns";
import { QueryParameters } from "../_query";

const getClubs: NextApiHandler = async (req, res) => {
  const queryData: QueryParameters = req.query;
  res
  .setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=86400")
    .json((await getDropdowns(queryData))?.[req.query.id.toString()] ?? []);
};

export default getClubs;
