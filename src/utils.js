const {fileURLToPath } =  'url'
const {dirname} =  'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname