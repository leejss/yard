const { withContentlayer } = require("next-contentlayer");
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
module.exports = withContentlayer(nextConfig);
