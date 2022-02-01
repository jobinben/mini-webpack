# mini-webpack
一个简单的webpack打包器



# 流程
1. 获取文件的内容
2. 获取文件中的依赖关系


## 1. 获取文件的内容

- 通过node的fs模块进行获取
  

## 2. 获取文件中的依赖关系

- (1) 可以自己通过正则判断获取ES Module中import时的文件路径
- (2) 推荐通过AST（抽象语法树）去获取，借助第三方库：`@babel/parser` 以及解析AST网站：astexplorer.net
- (3) 获取@babel/parser解析后的内容借助第三方库: @babel/traverse

流程: **通过fs读取文件信息，然后通过@babel/parser把文件信息转换为AST，再用@babel/traverse去转换提取AST里面的值（importDeclaration方法中的node对象下的source.value）这样就可以获取到依赖关系的文件路径。**


有了依赖关系的文件路径，我们就可以通过广度优先搜索或者递归的方式，获取依赖关系的文件的内容。最后把他们合并在一起。