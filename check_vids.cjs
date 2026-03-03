const https = require('https');

const ids = [
  "vJkY3a7S_Gg", "S8vORdls7_c", "J_M-N6hI-_o", "Yk1xW4h4b5o", // Italian
  "TpdvJivNeq4", "s5aqbcmIQAc", "P1c3Pz0Ff-o", "0aQ1r0n-vY0", // Korean
  "lH_57OQn-eA", "Wp6yq2y8mXk", "V11E8T7bZ7I", "OQ0xH5bC8Rk", // Hebrew
  "xFOa-1Q9D6Y", "b2xLzQv4DGs", "2b9N78rR95s", "B8QzPjK3zFw"  // Spanish
];

async function check(id) {
  return new Promise((resolve) => {
    https.get(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`, (res) => {
      resolve(`${id}: ${res.statusCode}`);
    });
  });
}

async function run() {
  for (let id of ids) {
    console.log(await check(id));
  }
}
run();
