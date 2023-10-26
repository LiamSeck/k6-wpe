import http from "k6/http";
import { check } from 'k6';
import { getCurrentStageIndex } from 'https://jslib.k6.io/k6-utils/1.3.0/index.js';



export const options = {
    // executor: 'constant-vus',
    // vus: 25,
    // duration: "5m",
    executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 55 },
        { duration: '2m', target: 55 },
        { duration: '30s', target: 60 },
        { duration: '1m', target: 60 },
      ],
      gracefulRampDown: '30s',
};

export default function () {
  const res = http.get("https://liamseprod.wpenginepowered.com/cart/");

  console.log('Response time was ' + String(res.timings.duration) + ' ms');

  const status200 = check(res, {
    'status is 200': (r) => r.status === 200
  });

  const status504 = check(res, {
    'status is 504': (r) => r.status === 504
  });

//   console.log('200:' + status200,'504:' + status504);

//   if (getCurrentStageIndex() === 1) {
//     console.log('Running the second stage where the expected target is 20');}
}