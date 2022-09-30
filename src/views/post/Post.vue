<script setup>
import onLoadFinished from '../../hooks/onLoadFinished.js'
import PostImage from './components/PostImage.vue'
import PostInfo from './components/PostInfo.vue'
import { useAppStore } from '../../store/appStore.js'
import { computed } from 'vue'
import Viewer from '../../components/Viewer.vue'
import PostComments from './components/PostComments.vue'

const appStore = useAppStore()
const loading = computed(() => appStore.loading)
onLoadFinished(() => {
})
const markdown =
    `
## 创建反射

反射的源头在Class类

~~~java
Class clazz = Person.class;
~~~

当Person.class被加载到内存中，此过程就叫做类的加载，加载到内存中的类，我们就称为运行时类，此运行时类就是Class的一个实例

Class类的**newInstance()**方法，创建反射类对象实例，该方法调用的是无参构造器，所以必须在被反射类中提供无参数构造器，并且访问的权限必须要足够调用类访问。

Class也可以调用**getDeclaredConstructor(...args)**方法，获取构造器，并掉用构造器的**newInstance()**获取反射对象

~~~java
Constructor<Person> constructor = clazz.getDeclaredConstructor(String.class);
constructor.setAccessible(true); //设置private可以被调用
Person miya = constructor.newInstance("miya");
~~~

**method,constructors** 同理类似、

调用**getSuperclass()**获取父类

调用**genericSuperclass()**获取带泛型的父类

获取父类泛型参数：

~~~java
Class clazz = Person.class;
Type genericSuperclass = clazz.getGenericSuperclass();
ParameterizedType parameterizedType = (ParameterizedType) genericSuperclass;
Type[] actualTypeArguments = parameterizedType.getActualTypeArguments();
for (Type actualTypeArgument : actualTypeArguments) {
    System.out.println(actualTypeArgument);
// 此处的actualTypeArguments就是全部泛型参数<T,S>
~~~

调用**getInterfaces()**方法，获取运行时类的实现接口

调用**getPackage()**方法，获取运行时类的包目录

调用**getAnnotations()**方法，获取运行时类的注解

## 调用运行时类的指定属性

通过反射得到Field对象，对该对象进行操作。

~~~java
Class<Person> clazz = Person.class;
Person person = clazz.newInstance();
Field id = clazz.getDeclaredField("id");
id.set(person, 1001);
System.out.println(id.get(person));
Field name = clazz.getDeclaredField("name");
name.setAccessible(true);
name.set(person, "TOM");
System.out.println(name.get(person));
//值得注意，当属性访问权限为public时，默认是可以直接修改的，但其他情况下，必须要调用Field对象的setAccessible(true)方法，保证属性是可以访问的。
~~~

## 调用运行时类的指定方法

通过反射得到Method对象，对该对象进行操作。

~~~Java
Class<Person> clazz = Person.class;
Person person = clazz.newInstance();
Method show = clazz.getDeclaredMethod("show", String.class);
show.setAccessible(true);
String niHon = (String) show.invoke(person, "NiHon");
System.out.println(niHon);
//******************************************************//
Method say = clazz.getDeclaredMethod("say");
say.setAccessible(true);
Object re = say.invoke(Person.class);
System.out.println(re);
//invoke的返回值，就是原来反射方法的返回值。
//如果原方法无返回值，则invoke返回为null
~~~

## 调用运行时类的指定构造器

通过反射得到Constructor对象，对该对象进行操作。

~~~java
Class<Person> clazz = Person.class;
Constructor<Person> constructor = clazz.getDeclaredConstructor(String.class);
constructor.setAccessible(true);
Person person = constructor.newInstance("小明");
System.out.println(person);
~~~



## 获取Class实例的方式

加载到内存的运行时类，会缓存一段时间

1. ~~~java
   Class<Person> clazz1 = Person.class;
   //调用运行时类的属性
   ~~~

2. ~~~java
   Person p1 = new Person();
   Class clazz2 = p1.getClass();
   //通过运行时类的对象，调用getClass()
   ~~~

3. ~~~java
   Class clazz3 = Class.forName("miya.mizu.pojo.Person");
   //通过Class.forName()加载
   //此方式，使用频率较高
   ~~~

4. ~~~java
   Class clazz4 = classLoader.loadClass("miya.mizu.pojo.Person");
   //通过ClassLoader的loadClass方法
   ~~~

## 获取运行时类的属性结构及其内部结构

1. getFields()：获取运行时类及其父类中声明为public访问权限的属性
2. getDeclaredFields()：获取到运行时类声明的所有的属性（不包含父类的属性）
3. getMethods()：获取当前运行时类及其父类中声明为public访问权限的方法
4. getDeclaredFields()：获取当前运行时类中声明的所有方法（不包含父类的方法）

## 那些类型可以有Class对象

1. class
2. interface
3. []，只要数组的元素类型和维度相同，就是同一个Class
4. enum
5. annotation
6. primitive type
7. void

## 什么时候使用反射

反射是动态性的，当在编译时，无法确定使用哪个对象时，就使用反射构建对象。例如在servlet中，如果发送login请求，就创建login相关的类，如果发送register请求，就创建register相关的类。

## 反射和封装是否矛盾，如何看待这两种技术

不矛盾，封装是建议，建议是否调用某种方法，反射主要是解决是否能够调用。

`
</script>
<template>
    <div v-if='!loading' id='post'>
        <post-image
            image='/src/assets/images/banner.png' />
        <div p='x-7.5 y-10' bg-container>
            <post-info />
            <viewer :markdown='markdown' />
        </div>
        <post-comments />
    </div>
</template>


<style scoped>
#post {
    margin: 0 auto;
    max-width: 720px;
}
</style>
