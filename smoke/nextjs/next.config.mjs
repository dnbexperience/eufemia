/**
 * Deliberately a default Next.js configuration.
 *
 * No `transpilePackages: ['@dnb/eufemia']` on purpose: letting Next re-compile
 * the package would hide the module-format and syntax problems this smoke test
 * exists to catch. The packed library has to build as a plain dependency,
 * exactly the way a consumer installs it.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {}

export default nextConfig
