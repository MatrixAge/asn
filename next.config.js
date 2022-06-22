const withPlugins = require('next-compose-plugins')
const withLess = require('next-with-less')

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true
}

module.exports = withPlugins([withLess], nextConfig)
