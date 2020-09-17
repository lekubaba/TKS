a,git
b,github数据
c，vim安装
d,安装nvm来管理nodejs
e,nodejs
f,mongoDB

{一} 安装git

yum -y install git



{二} github 数据clone

git clone https://github.com/lekubaba/JD.git;

{三} vim安装

yum -y install vim


{五}nvm的安装

输入命令
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

cd ~ 到root目录 ls -a查看隐藏的目录；

待到安装完成提示用户设置环境变量的时候，修改.bash_profile，在末尾加入：
export NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"


随后使配置生效，运行

cd ~
source .bash_profile


{六}安装nodejs

nvm --version // 查看nvm版本
nvm install latest // 下载最新的 node 版本
nvm ls-remote // 查看远程已经存在的版本（可能会很慢，请耐心等待）
nvm install v12.18.3 // 下载指定版本nodejs
nvm install v12.18.3 32 // 默认是64位，32位需指定
nvm current // 当前使用版本
nvm use v12.18.3 // 使用指定版本
nvm list // 查看已经安装的nodejs版本
node --version // 查看nodejs版本

//安装最新版本的nodejs
nvm install nodejs 

//And then in any new shell just use the installed version:
nvm use node


node -v
npm -v

安装淘宝镜像：

npm install -g cnpm --registry=https://registry.npm.taobao.org




................................................
................................................

{七}：mongodb的安装以及安全
/
............................................................
............................................................




一，下载服务；

1，在/usr/local 目录下新建两个目录 mkdir mongoDB 和 source,

 //选择RHEL格式， 使用命令：wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel70-3.6.5.tgz     下载文件
2, cd 到source目录下，使用wget下载mongodb资源，tgz格式，
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel70-3.6.5.tgz

或者

curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel70-3.6.5.tgz

3，将资源解压到 mongoDB目录下，使用如下命令

	tar -zxvf mongodb-linux-x86_64-rhel70-3.6.5.tgz -C /usr/local/mongoDB

4，重命名 

mv mongodb-linux-x86_64-rhel70-3.6.5 mongodbserver


二：创建配置文件

1，创建数据库文件夹

cd /usr/local/mongoDB/mongodbserver 

mkdir data

2,创建日志目录

cd /usr/local/mongoDB/mongodbserver 

mkdir logs

3. 创建配置文件夹与配置文件

3.1 创建配置文件夹etc

cd /usr/local/mongoDB/mongodbserver

mkdir etc


3.2 创建配置文件mongodb.conf

cd /usr/local/mongoDB/mongodbserver/etc

vim mongodb.conf
//将一下复制到配置文件；

dbpath=/usr/local/mongoDB/mongodbserver/data  //数据库数据存放目录
logpath=/usr/local/mongoDB/mongodbserver/logs/mongodb.log  // 日志存放目录
//#以追加的方式记录日志
logappend = true
bind_ip= 127.0.0.1  //mongodb所绑定的ip地址
port=27017   //端口号 默认为27017
fork=true  //以后台方式运行进程
journal=false  //启用日志文件，默认启用
//#开启用户认证
auth=true

//#这个选项可以过滤掉一些无用的日志信息，若需要调试使用请设置为false

quiet=true 


三：启动mongodb服务

cd /usr/local/mongoDB/mongodbserver/bin

./mongod --config /usr/local/mongoDB/mongodbserver/etc/mongodb.conf

//about to fork child process, waiting until server is ready for connections.
//forked process: 21492
//child process started successfully, parent exiting

如果出现错误，那么就在data目录删除mongod.lock文件和logs下载的日志文件，rm -fr mongodb.log.*;

浏览器访问正常即可；


2、添加管理用户(mongoDB 没有无敌用户root，只有能管理用户的用户 userAdminAnyDatabase)

利用mongo命令连接mongoDB服务器端：

> use admin
switched to db admin
> db.createUser( {user: "fdlekubaba",pwd: "123456",roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]});
> db.createUser( {user: "feidaijun",pwd: "yjx123456",roles: [ { role: "readWrite", db: "feidaijun" } ]});

注：添加完用户后可以使用show users或db.system.users.find()查看已有用户.

3、添加完管理用户后，关闭MongoDB，并使用权限方式再次开启MongoDB，这里注意不要使用kill直接去杀掉mongodb进程，（如果这样做了，请去data/db目录下删除mongo.lock文件），可以使用db.shutdownServer()关闭.

4、使用权限方式启动MongoDB

在配置文件中添加：auth=true , 然后启动：

有时候我们需要查看运行的进程，可以通过下面的命令：

ps -ef | grep mongo

关闭mongo进程
sudo kill  74316(pid)

如果有启动报错的情况 先查看mongo进程 如果有占用就kill掉，如果还不行就去/data/db下把 mongod.lock删掉再启动

查看端口占用情况

lsof -i tcp:27017

如果有启动报错的情况 先查看mongo进程 如果有占用就kill掉，如果还不行就去/data/db下把 mongod.lock删掉再启动




四：将mongod路径添加到系统路径中，方便随处执行mongod命令

1，在/etc/profile文件中，添加 export PATH=$PATH:/usr/local/mongoDB/mongodbserver/bin

2. 执行source /etc/profile，使系统环境变量立即生效

五：将mongo路径软链到/usr/bin路径下，方便随处执行mongo命令

1. 执行命令: ln -s /usr/local/mongoDB/mongodbserver/bin/mongo  /usr/bin/mongo


六：测试是否方便随处执行mongo命令

1. 回到任意路径下,执行mongo命令,连接mongod服务

2. 关闭mongod服务,执行db.shutdownServer()


报错：//
2018-06-26T22:28:16.970+0800 E QUERY    [thread1] Error: shutdownServer failed: {
        "ok" : 0,
        "errmsg" : "not authorized on admin to execute command { shutdown: 1.0, $db: \"admin\" }",
        "code" : 13,
        "codeName" : "Unauthorized"
} :
_getErrorWithCode@src/mongo/shell/utils.js:25:13
DB.prototype.shutdownServer@src/mongo/shell/db.js:453:1
@(shell):1:1

....................................

原因，/因为创建的用户fdlekubaba为userAdminAnyDatabase，只有操作用户的权限，没有关闭的权限，因此要修改用户权限，增加权限：

解决办法，执行下面的语句，添加权限：

db.updateUser(
 "fdlekubaba",
        {
           roles : [
                     {"role" : "userAdminAnyDatabase","db" : "admin"},
                     {"role" : "dbOwner","db" : "admin"},
                     {"role" : "clusterAdmin", "db": "admin"}
                   ]
        }
 )
 然后在执行db.shutdownServer().


 或者执行下面的命令关闭：

killall mongod

3. 启动mongod服务

mongod --config /usr/local/mongoDB/mongodbserver/etc/mongodb.conf



[root@VM_0_3_centos /]# mongod --config /usr/local/mongoDB/mongodbserver/etc/mongodb.conf
about to fork child process, waiting until server is ready for connections.
forked process: 9141
child process started successfully, parent exiting


七 ；MongoDB设置为系统服务并且设置开机启动


1.通过上面简单的操作，我们已经将MongoDB配置文件配置完成，那么接下里我们将为MongoDB设置系统服务。
2.首先添加MongoDB系统服务，命令如下：vim /etc/rc.d/init.d/mongod
3.打开编辑器后，我们将下面的配置粘贴进去，然后保存


start() {  
/usr/local/mongoDB/mongodbserver/bin/mongod  --config /usr/local/mongoDB/mongodbserver/etc/mongodb.conf 
}  
  
stop() {  
/usr/local/mongoDB/mongodbserver/bin/mongod --config /usr/local/mongoDB/mongodbserver/etc/mongodb.conf --shutdown  
}  
case "$1" in  
  start)  
 start  
 ;;  
  
stop)  
 stop  
 ;;  
  
restart)  
 stop  
 start  
 ;;  
  *)  
 echo  
$"Usage: $0 {start|stop|restart}"  
 exit 1  
esac 



4.保存完成之后，添加脚本执行权限，命令如下：chmod +x /etc/rc.d/init.d/mongod 
5.启动MongoDB，service mongod start 如下图所示，则说明启动成功:

6.可以使用命令service mongod stop关闭MongoDB服务。
7. 验证mongoDB是否启动，输入命令lsof -i :27017，监测端口已经在使用中，所以说启动已经完成。


。。。。。。。。。。。。。。。。。。。。the end!