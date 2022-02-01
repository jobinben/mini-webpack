import fs from "fs"
import path from "path"
import parser from "@babel/parser"
import traverse from "@babel/traverse"



// 获取资源
const createAsset = (filePath) => {
    // 1. 获取文件的内容
    const source = fs.readFileSync(filePath, {
        encoding: 'utf-8'
    })

    // 2. 获取依赖关系  -> AST 抽象语法树获取依赖
    const ast = parser.parse(source, {
        sourceType: 'module'
    })
    const deps = new Set()
    traverse.default(ast, {
        ImportDeclaration({ node }) {
            deps.add(node.source.value)
        }
    })

    return {
        source,
        deps
    }
}

// const asset = createAsset()
// console.log(asset)

// 批量获取资源 一个图的数据结构
const createGraph = () => {
    const mainAsset = createAsset('./example/main.js')

    // 用广度优先搜索去遍历所有的资源
    let queue = []
    queue.push(mainAsset)

    for (const item of queue) {
        item.deps.forEach(relativePath => {
            // console.log(relativePath)
            const filePath = path.resolve('./example', relativePath)
            const child = createAsset(filePath)
            queue.push(child)
        })
    }
    
    return {
        queue
    }
}

const graph = createGraph()
console.log(graph)
