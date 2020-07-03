# Java笔记

Java两种核心机制：

- Java虚拟机，JVM
- 垃圾收集机制，GC


JDK（Java Development Kit）Java开发工具包，包括了JRE，其中的开发工具：便宜工具（javac.exe）打包工具（jar.exe）
JRE（Java Runtime Environment）Java运行环境，包括java虚拟机（JVM）和Java程序所需的核心类库等，如果想要运行一个开发好的java程序，只需要安装JRE即可
简单而言，使用JDK的开发工具完成Java程序，交给JRE去运行 

```java
// 类名 必须和 文件名 一致
public class 类名{
    public static void main(String[] args){...}
}
```

## 数据类型

8种基本数据类型：

- 数值型：整数类型（byte，short，int，long），浮点类型（float，double）
- 字符型（char）
- 布尔型（boolean）

其他，引用数据类型（可以用null作为值）：

- 类（class）（string字符串，值不可变）
- 接口（interface）
- 数组（array）

一维数组声明：`type var[] 或者 type[] var`，数字类型默认值0，对象默认值null

```java
int[] arr = new int[3];
arr[1] = 123;
System.out.println(arr[0]);
System.out.println(arr[1]);

int[] arr1 = new int[] {1, 23, 6, 9, 22};
System.out.println(arr1);
System.out.println(arr1[2]);

int[][] arr3 = new int[][] {
    {1, 2},
    {3, 4, 5}
};
System.out.println(arr3[1][2]);

int[] x, y[]; // x 是一维数组，y 是二位数组
```

### 对象类型转换

```java
// 父类到子类，需要强制转换
Person p = new Person();
Student s = new Student();
s = (Student) p;
```

### 包装类

boolean: Boolean
byte: Byte
short: Short
int: Integer, `int i = Integer.parseInt("123")`
long: Long
char: Character
float: Float, `float f = Float.parseFloat("12.1")`
double: Double
String: `String s = String.valueOf(2.34f)`


## 类

类的属性：`修饰符 类型 属性名 (= 属性值)`

- 修饰符：private只能在当前自己的类中使用，不能通过对象点的方式使用
- 成员变量：实例变量（在类实例化成对象之后才能使用），类变量（static，直接通过类名点属性的方式使用），有默认初始化值
- 局部变量：形参，方法局部变量，代码块局部变量，必须显式初始化

类的方法：`修饰符 返回值类型 方法名(参数列表){}`

- 方法的重载：方法名相同，参数列表不同
- 可变个数的形参：`public static viod test(int i, String... books){}`，可变参数需要放在最后

封装和隐藏：将数据声明为私有的(private)，然后通过编写public类型的setXxx()和getXxx()设置和获取属性。

修饰符：

- public, 类内部、同一个包下、子类、任何地方使用
- private, 只能在类内部使用
- protected，类内部、同一个包下、子类中使用
- 缺省的，类内部、同一个包下使用

构造器(构造方法)：`public 类名(){}`系统默认生成

this：可以调用构造方法，但是调用构造方法的时候必须放在首行

类方法（static）与实例方法

### 包

package等同于文件夹，包可以有多级，也就是包下可以有包，包以点的形式存放。

导入包：`import 包名[.子包名].<类名 | *>`

### 继承

java只支持单继承，一个子类有一个父类

```java
public class Person { // 父类
    private String name;
    private String sex;
    private int age;
    
    public Person(String name, String sex, int age) {
        this.name = name;
        this.sex = sex;
        this.age = age;
    }

    public void getInfo() {
        System.out.println("姓名：" + this.name + " 性别：" + this.sex + " 年龄：" + this.age);
    }
}

public class Student extends Person { // 子类

    public Student(String name, String sex, int age) {
        super(name, sex, age);
    }

}
```

eclipse中重写方法快捷键：`atl + /`。

如果子类和父类在同一个包下，那么子类不能使用父类的成员中修饰符为private的；
如果子类和父类不在同一个包下，子类只能使用父类的成员中修饰符为protected和public的。

super：可以调用父类的所有层级，必须放在子类构造器的首行。

instanceof：检查是否是子类实例

Object类：

- `Object.equals(Object)`判断是不是用一个对象，特殊：String、File、Date等比较的是对象的值
- `Object.toString()`打印地址

### 多态

若编译时类型和运行时类型不一致，就出现多态。
前提：需要存在继承或者实现关系；要有覆盖操作。
成员方法：编译时要查看引用变量所属的类中是否有所调用的方法；运行时调用实际对象所属的勒种的编写方法。
成员变量：不具备多态性，只看引用变量所属的类。
子类继承父类：如果子类没有重写父类的方法，那么子类直接使用父类的方法；实例变量不会实现覆盖。

### 初始化块

new执行顺序：初始化变量 -》 静态代码块 -》 非静态的代码块 -》 构造方法，静态代码块只执行一次

静态代码块用来初始化类的静态属性(static)

```java
// 构建了一个没有类名的Person的子类，匿名的Person的子类
person p = new Person(){
    {
        super.name = "里斯"; // 在匿名代码类中，用代码块代替构造方法
    }
    @Override
    public void test(){}
};
```

### final

final标记的类不能被继承；方法不能被子类重写；变量(成员变量或局部变量)即称为常量，名称大写。

### 抽象类(abstract)

含有抽象方法的类必须声明为抽象类；抽象类不能被实例化；不能用abstract修饰属性、私有方法、构造器、静态方法、final的方法。

抽象方法：只有方法声明，没有方法的实现，以分号结束1，`abstract int abstractMethod(int a);`

### 接口(interface)

接口是抽象方法和常量值的定义的集合：`public interface TestIn{}`,`class SubClass implements interfaceA,interfaceB{}`

子类可以实现多个接口的继承

一个类可以实现多个接口，接口也可以继承其他接口；接口中的所有成员变量默认是有public static final修饰的；接口中的所有方法默认是由public abstract修饰的；接口没有构造器；接口采用多层继承机制

如果一个类没有实现接口的全部方法，需要把这个类定义成抽象类；抽象类增加新的方法，子类必须重写新增的方法

当需要对一类事物抽象的时候，使用抽象类；当需要对一系列的动作抽象，就使用接口，需要使用这些动作的类去实现相应的接口即可。

### 内部类

类中声明的类叫内部类，内部类使用外部变量，可以通过声明一个方法，外部类点this点属性的方式访问外部类中的成员。

如果内部类是static的，就不能使用外部类的非static的成员；外部内使用内部类，需要先new。

内部类是为了解决不能多重继承的问题。

```java
class A{}
class B{}
class C{
    private class innerA extends A{}
    private class innerB extends B{}
}
```

## 异常

ERRO与Exception

```java
// 捕获异常
try{}
catch(Exception e){
    e.getMessage();
    e.printStackTrace();
}
finally{}

// 抛出异常
class A{
    public void test() throws Exception{
        throw new Exception("异常")
    }
}
class B{
    public static void main(String[] args) {
        A a = new A();
        try{
            a.test
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}
```

子类重写父类的方法时，子类不能抛出比父类更大的异常。

## 集合

java集合类存放在java.util包中，是一个用来存放对象的容器。可分为set，list，map。

### Set

HashSet按Hash算法来存储集合中的元素；不能保证元素的排列顺序；不可重复；HashSet不是线程安全的；集合元素可以是null。

```java
Set set = new HashSet(); // 等同于 Set<Object> set = new HashSet<Object>();
set.add("a");
set.add("b");
set.add("c");
set.add("c");

Iterator it = set.iterator();
while(it.hasNext()) {
    System.out.println(it.next());
}

for (Object obj : set) {
    System.out.println(obj);
}

System.out.println(set.size());

// 规定只能存String类型的值
Set<String> set1 = new HashSet<String>();
set1.add("ads");
```

TreeSet是SortSet接口的实现类，可以确保集合元素处于排序状态。分为自然排序和定制排序。必须放入相同类型的值。

```java
Set<Integer> set = new TreeSet<Integer>();
set.add(5);
set.add(4);
set.add(3);
set.add(2);
set.add(1);
System.out.println(set);

class Person implements Comparator<Person>{
    public int age;
    @Override
    public int compare(Person o1, Person o2){
        if(o1.age > o2.age){
            return 1;
        }else if(o1.age < o2.age){
            return -1;
        }else {
            return 0;
        }
    }
} // 重写比较
```

### List

List是一个元素有序、可重复的集合，集合中的每个元素都有其对应的顺序索引。

```java
List<String> list = new ArrayList<String>();
list.add("a");
list.add("b");
list.add("c");
list.add("d");
list.add(2, "x");
list.set(0, "f");
System.out.println(list);
System.out.println(list.get(2));
System.out.println(list.indexOf("b"));

List<String> list1 = list.subList(2, 4);
System.out.println(list1);
```

### Map

Map用域保存具有映射关系的数据，因此Map集合里存放着两组值，Key和Value；key和cvalue可以是任何引用类型的数据；key不允许重复。

```java
Map<String, Integer> map = new HashMap<String, Integer>();
map.put("a", 111);
map.put("b", 222);
map.put("c", 333);
System.out.println(map);
System.out.println(map.get("b"));
System.out.println(map.containsKey("a"));
System.out.println(map.keySet());
System.out.println(map.values());
System.out.println(map.entrySet());
```

### Collections

Collections是一个操作Set、List和Map等集合的工具类。

排序操作：

- reverse(List)
- shuffle(List)
- sort(List)
- sort(List, Comparator)
- swap(List, int, int)
- Collection.max(Collection)
- Collection.max(Collection, Compatraor)
- Collection.min(Collection)
- Collection.frequency(Collection, Object)
- Collection.replaceAll(List list, Object oldCal, Object newVal)

### 泛型

Java中的泛型，在编写的时候就能发现错。

```java
class A<T>{
    private T key;
    public void setKey(T key){ this.key = key; }
    public T getKey(){ return this.key;}
}
A<String> a = new A<String>(); // 实例化时指定类型

interface IB<T>{
    T test(T t);
}
// 未传入泛型实参时，与泛型类的定义相同，在声明类的时候，需将泛型的声明也一起加到类中
class B<T> implements IB<T>{ 
    @Override
    public T test(T t){
        return t;
    }
}
B<String> b1 = new B<String>(); // 需要指定泛型

// 指定了具体的类型
class C implements IB<String>{
    @Override
    public String test(String t){
        return t;
    }
}
C b1 = new C(); // 不需要指定类型
```

泛型通配符：`public void test(List<?> list){}`，不知道传入何种类型

## IO

java.io.File，
文件流（FileInputStream / FileOutputStream / FileReader / FileWriter）
缓冲流（BufferInputStream / BufferOutputStream / BufferdReader / BufferedWriter）

File类：

- 访问文件名: getName、getPath、getAbsoluteFile、getAvsolutePath、getParent、renameTo
- 文件检查: exits、canWrite、canRead、isFile、isDirectory、lastModify、Length
- 文件操作相关: createNewFile、delete
- 目录操作相关: mkDir、list、listFiles

```java
// 递归遍历文件
public void showFileTree(File file) {
    if (file.isFile()) {
        System.out.println(file.getAbsolutePath() + " 是文件");
    } else {
        System.out.println(file.getAbsolutePath() + " 是文件夹");
    }
    File[] f = file.listFiles();
    if (f != null && f.length > 0) {
        for (File ff : f) {
            showFileTree(ff);
        }
    }
}
```

FileInputStream文件字节流:

```java
try {
FileInputStream fs = new FileInputStream("C:\\\\ZZZZZZZZZZ\\\\eclipse-workspace\\\\test.txt");
byte[] b = new byte[10]; // 接受读取的文件的内容
int len = 0; // 读取数据的长度
//          fs.read(b); // 返回读取的数据的长度，如果读到最后一个数据，还会向后都一个，返回-1时读取完毕
while ((len = fs.read(b)) != -1) {
    System.out.println(new String(b, 0, len));
}
//          System.out.println(new String(b));
fs.close();
} catch (Exception e) {
e.printStackTrace();
}
```

FileReader文件字符流：

```java
try {
    FileReader fr = new FileReader("C:\\\\ZZZZZZZZZZ\\\\eclipse-workspace\\\\test.txt");
    char[] ch = new char[1024];
    fr.read(ch);
    System.out.println(ch);
    fr.close();
} catch (Exception e) {
    e.printStackTrace();
}
```

BufferInputStream缓冲流（基于内存的读写）

InputStreamReader转换流（）

ObjectInputStream对象流：序列化与反序列化

## 反射

Class类，class本身是一个类，只能由系统建立对象，一个类在JVM中只会由一个Class实例

创建的方式：

- 类名创建：`Class cl = Person.class;`
- 实例方法创建：`Class cl = p.getClass();`
- Class静态方法创建：`Class cl = Class.forName("包名全路径")`
