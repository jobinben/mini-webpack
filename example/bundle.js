
const require = (filePath) => {
    const map = {
        './bar.js': barjs,
        './main.js': mainjs
    }

    const fn = map[filePath]

    const module = {
        exports: {}
    }

    fn(require, module, module.exports)

    return module.exports
}

require('./main.js')

const mainjs = (require, module, exports) => {
    const { bar } = require('./bar.js')
    bar()
    console.log('---foo.js---')

}

const barjs = (require, module, exports) => {

    const bar = () => {
        console.log('---bar.js---')
    }

    module.exports = {
        bar
    }
    
}