tables-collections
row-documents
column-fields

1，创建数据库：use dbname,有就用，没有就自动创建，这里以use don为例
2，show dbs 查看所有数据库；新创建的数据库不显示，插入数据之后就可以看到；
3，db.lekubaba.insert({'name':'don','haha':'hehe'});创建lekubaba集合，并且插入文档
4，db.dropDatabase(),删除当前的数据库；这里就会删除刚刚创建的don数据库；
5，db.lekubaba.drop();删除lekubaba这个集合
6，db.lekubaba.find(),可以查看lekubaba这个集合的所有内容；
7，db.lekubaba.update(),更新当前的集合，
db.lekubaba.update({"name":"lekubaba"},{$set:{"name":"lekumama"}},{upsert:true,multi:true});,KEYname确保要相同，不然会不更新或者插入一条新数据；
8.db.lekubaba.find().pretty(),数据将以漂亮的形式分行书写；
9.db.lekubaba.save({'name':'lekubaba','age':12}),这个将覆盖原来的内容；
10，db.lekubaba.remove({name:'lekubaba'},{justOne:true}),用来删除集合中的数据；区别db.lekubaba.drop();后者全部删除，前者通过查询删除
11，db.lekubaba.find({'age':{$lt:50}})=>db.lekubaba.find({'age':{$lt:50}})
12.db.lekubaba.find({'age':50});
13,db.lekubaba.find({'age':{$lte:50}});
14.db.lekubaba.find({'age':{$gt:50}});
15,db.lekubaba.find({'age':{$gte:50}});
16,db.lekubaba.find({'age':{$ne:50}});
17,db.lekubaba.find({'age':50,'tall':177}).pretty(),age等于50，且tall等于177的所有文档；
18,db.lekubaba.find({'age':{$lt:50},$or:[{'tall':177},{'name':'lekubaba'}]}).pretty();
19.db.lekubaba.find({'age':{$gt:20,$lt:35}});
20,db.lekubaba.find({},{"name":1,"_id":0}).limit(number).skip(number)
21,db.lekuubaba.findOne({name:'lekebaba'})
22,db.lekubaba.find({age:{$lt:22},$or:[{name:'yjx'},{tall:188}]})
23,db.lekubaba.find({},{_id:0})  注意，1，为返回这个值，0为不返回，不能混用，要么全1，要么全0，唯一的就是_id可以混用；

'mongodb修改器：$set,$inc,$push,$unset,$pop,$upsert...':

'$set': db.lekubaba.update({'name':'yjx'},{'$set':{'age':22},{upsert:true,multi:true}});将集合中的文档键值为name:'yjx'，的文档的'age'field的值修改为22，

............其中upsert为 true ，说明即使该字段不存在，则插入该字段，multi为true ，则将所有name:'yjx'的文档统一修改；

'$inc':db.lekubaba.insert({name:'don',age:22,tall:177});

db.lekubaba.update({name:'don'},{$inc:{'age':1,tall:-5}}); 将集合乐酷巴巴其他的第一个name:'don'的文档中的field为age tall的值更新修改，age增加1，tall减去5；

'内嵌文档的修改':

db.p.insert({name:'yjx',f:[{name:'htl',f:[{name:'ywx',f:[{name:'haha',age:27}]}]}]})

db.p.update({name:'yjx'},{'$inc':{'f.0.f.0.f.0.age':3}});通过'.'选择age.并且增加3,

'$unset':
db.p.insert({name:'yjx',age:22,tall:177,f:'yt',book:'sanmao'});
1,db.p.update({name:'yjx'},{'$unset':{'age':0}})
2,db.p.update({name:'yjx'},{'$unset':{'tall':1}})
3,db.p.update({name:'yjx'},{'$unset':{'f':-1}})
4,db.p.update({name:'yjx'},{'$unset':{'book':'ssssss'}})

总结：无论是什么值，都将删除这个键；


'$push';

db.p.insert({name:'yjx'});

db.p.update({name:'yjx'},{$push:{'friend':'yt'}})-------find之后：//{ "_id" : ObjectId("5aedff7ad3fcc117be12fcea"), "name" : "yjx", "friend" : [ "yt" ] }
db.p.update({name:'yjx'},{$push:{'friend':'htl'}})-find之后：//{ "_id" : ObjectId("5aedff7ad3fcc117be12fcea"), "name" : "yjx", "friend" : [ "yt" ,'htl'] }

find之后：//{ "_id" : ObjectId("5aedff7ad3fcc117be12fcea"), "name" : "yjx", "friend" : [ "yt" ] }

总结：$push为向某个结构为数组的键添加成员，如果键不存在，则新建立一个键；此种添加不检测重复性，即使重复也添加；注意，添加的成员可以是string,也可以是对象，或者其他；


ne表示：not equal,不等；
'$ne'/'$addToSet';

db.lekubaba.insert({name:'yjx',size:{h:8,w:7,l:15},title:['t1','t2','t2'],type:'suv'});

db.lekubaba.update({name:'yjx'},{$addToSet:{title:'t2'}}), 插入不成功，因为重复了
db.lekubaba.update({name:'yjx'},{$addToSet:{title:'t5'}}), 插入成功

总结，$addToSet,就是插入不重复的值；

'$pop' 或 '$pull'；

db.lekubaba.insert({name:'yjx',f:[1,2,3,4,5,6]});
db.lekubaba.update({name:'yjx'},{$pop:{f:1}}) 最后删除一个
db.lekubaba.update({name:'yjx'},{$pop:{f:-1}}) 最前删除一个
db.lekubaba.update({name:'yjx'},{$pop:{f:0}}) 最后删除一个

总结：正数最后，负数最前；


db.lekubaba.insert({name:'yjx',f:[1,2,3,4,5,6]});
db.lekubaba.update({name:'yjx'},{$pull:{f:4}}) 将所有的4删除

总结，满足条件的删除，


数组的定位修改器：

'.'



条件操作符：


'  [ '$eq','$gt','$lt','$gte','$lte','$ne']  '



'limit skip' 通过limit和skip，可以做分页查询；


'sort'

db.lekubaba.find({},{title:1}).sort({like:-1})按照升序或者降序，-1为升，1为降；


'性能测试'
 db.p.find({name:4}).pretty().explain('executionStats')


'索引'：

db.lekubaba.ensureIndex({name:1,title:-1});

db.lekubaba.getIndexes();
删除指定的索引
db.lekubaba.dropIndex({'name'});

删除全部的索引
db.lekubaba.dropIndexes();



'$in' 查询指定范围内值的文档；


db.lekubaba.find({'_id':{$in:a['b']}})


'$elemMatch' 匹配嵌套查询；




判断一个值是否存在：

比如：db.collection.insert({name:'yjx',follow:['a','c','b']});
现在要判断c是否在杨锦旋的关注列表

db.collection.find({follow:'c'},{follow:1}),即可
也可以通过
db.collection.find({follolw:{$in:['c']}});



----------------------聚合查询重点--管道技术-manReduce函数；

db.p.mapReduce(
	function(){
		emit(key,value)  //man function
	},
	function(key,values){
		return reduceFunction   //reduce 'function'
	},
	{
		out:'',
		query:'',
		sort:'',
		limit:''
	}
)


db.test.insert({username:"Alex", tags: ['C#', 'Java', 'C++'] }); 
db.test.aggregate( 
{$match: {username : "Alex"}}, 
{$unwind: "$tags"}, 
{$project: {count:{$add:1}}}, 
{$group: {_id: null, number: {$sum: "$count" }}} 
); 
{ "result" : [ { "_id" : null, "number" : 3 } ], "ok" : 1 } 
