import { $ } from "bun"
import { cp, mkdir, rm } from "node:fs/promises"

const files = [
    "assets/",
    "metadata/",
    "src/",
    "package.json",
    "package-lock.json",
    "CHANGELOG.md",
    "README.md",
    "eslint.config.js",
    "tsconfig.json",
    "tsconfig.app.json",
    "tsconfig.node.json",
    ".prettierrc",
]

const storeDir = "store"
const extDir = "extensions/wireguide"
const installDir = `${storeDir}/${extDir}`

await rm(installDir, { recursive: true, force: true })
await mkdir(installDir)

for (const file of files) {
    await cp(file, `${installDir}/${file}`, { recursive: true, force: true, })
}

await $`git add ${extDir}`.cwd(storeDir)
await $`git commit -m "Update wireguide extension"`.cwd(storeDir)
await $`git push --force`.cwd(storeDir)
