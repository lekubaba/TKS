
import指令是es6,node直接运行会报错，
nodejs不支持import语法，如果要支持，需要babel来支持

所以我们来安装babel吧， 有了babel， 能够使用更多高级词法！

npm install --save-dev babel-core
npm install --save-dev babel-preset-env
npm install babel-cli --save-dev

安装好以后,在项目根目录下创建.babelrc文件

创建：.babelrc,将下面的内容复制到文件中

{                
    "presets": [ 
         "env"   
     ],          
    "plugins": []
} 


然后在终端通过babel-node  '文件名'，就可以运行了