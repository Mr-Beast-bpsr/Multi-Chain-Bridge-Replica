import axios from "axios";
// import {getSession} from 'next-auth/react'

export default async function handler(req, res) {
  // const session = await getSession({req})

  if (req.method === "POST") {
    try {
      const{address} = req.body;
      const{chainId} = req.body;
     
      console.log(address, 'data properties',chainId)
      var config = {
        method: "get",
        url:  `https://bridgeapi.anyswap.exchange/v2/register/${address}/${chainId}/BTC`,

      };
      await axios(config).then(function (response) {
        console.log(JSON.stringify(response.data));
        res.status(200).json({ data: response.data });
      });


      // res.status(200).json({ data: reference });
    } catch (err) {
      // console.log(err);
      res.status(500).json({ Error: err });
    }
  }
}
