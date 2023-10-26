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
        { duration: '30s', target: 55 }, // Ramp to 55 VUS in 30s
        { duration: '2m', target: 55 }, // Stay at 55 VUS for 2mins
        { duration: '30s', target: 60 }, // Ramp to 60 VUS in 30s
        { duration: '2m', target: 60 }, // Stay at 50 VUS for 2mins
      ],
      gracefulRampDown: '30s',
};

export default function () {

  // Send GET request to https://liamseprod.wpenginepowered.com/cart/
  const res = http.get("https://liamseprod.wpenginepowered.com/cart/");

  // Log the requests response time in ms to the console
  console.log('Response time was ' + String(res.timings.duration) + ' ms');

  // Check for 200 Response Codes
  const status200 = check(res, {
    'status is 200': (r) => r.status === 200
  });

  // Check for 504 Response Codes
  const status504 = check(res, {
    'status is 504': (r) => r.status === 504
  });

  console.log('200:' + status200,'504:' + status504);

//   if (getCurrentStageIndex() === 1) {
//     console.log('Running the second stage where the expected target is 20');}

}