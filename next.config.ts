import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        'cautious-funicular-jj6wv454xg7359qv-3000.app.github.dev',
      ]
    },
    staleTimes:{
      dynamic:0
    }
  }
};

export default nextConfig;

// @ts-check
 
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
//     experimental: {
//     serverActions: {
//       allowedOrigins: [
//         'localhost:3000',
//         'cautious-funicular-jj6wv454xg7359qv-3000.app.github.dev',
//       ]
//     }
//   }
// }
 
// module.exports = nextConfig
