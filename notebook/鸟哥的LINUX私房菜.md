鸟哥的 LINUX 私房菜
第零章、计算机概论
CPU 架构：精简指令集（RISC）与复杂指令集（CISC）系统
? 精简指令集，甲骨文SPARC系列、IBM的Power Architecture系列、安谋ARM CPU系列
? 复杂指令集，AMD、Interl、VIA等的x86架构的CPU
? 为了区分x86架构和AMD架构，64位个人电脑CPU称为x86_64架构
CPU超频：将CPU的倍频或是外频改为较高频率，倍频无法修改，通常超频的位外频
外频指的是CPU与外部元件进行数据传输时的速度，倍频则是CPU内部用来加速工作性能的一个倍数， 两者相乘才是CPU的频率速度
新的 CPU 设计中，已经将北桥的内存控制芯片整合到 CPU 内，而 CPU 与内存、显卡
沟通的总线通常称为系统总线。 南桥就是所谓的输入输出（I/O） 总线，主要在联系硬
盘、USB、网卡等周边设备
显卡又称为VGA（Video Graphics Array）
磁盘的分区模式：旧式的MSDOS相容模式、新的GPT模式
硬盘传输接口：SATA、USB、SAS
操作系统（Operating System, OS）  ：操作系统核心（Kernel） 、系统调用（System Call）
1M带宽，即1Mbps（兆比特每秒）,理论速度1*1024/8 = 128KB/sec，12%的信息头标识 ，实际最大速度11KB/s
第一章、Linux 是什么与如何学习
1991年托瓦兹（Linus Torvalds）
操作系统（Operation System） 主要在管理与驱动硬件，因此必须要能够管理内存、管
理设备、 负责行程管理以及系统调用等等
GNU是GNU is Not Unix的简写
第二章、主机规划与磁盘分区
各个元件或设备在Linux下面都是“一个文件！”
设备
设备在Linux内的文件名
SCSI/SATA/USB硬盘机
/dev/sd[a-p]
USB闪存盘
/dev/sd[a-p] （与SATA相同）
打印机
/dev/lp[0-2] （25针打印机） /dev/usb/lp[0-15] （USB 接口）
CDROM/DVDROM
/dev/scd[0-1] （通用） /dev/sr[0-1] （通用，CentOS 较常见）/dev/cdrom （当前 CDROM）
磁盘分区：MBR （Master Boot Record）和 GPT （GUID partition table）
开机流程：
1. BIOS：开机主动执行的固件，会认识第一个可开机的设备
2. MBR：第一个可开机设备的第一个扇区内的主要开机记录区块，内含开机管理程序
3. 开机管理程序（boot loader） ：一支可读取核心文件来执行的软件。boot loader的主要任务 ：
a. 提供菜单：使用者可以选择不同的开机项目，这也是多重开机的重要功能
b. 载入核心文件：直接指向可开机的程序区段来开始操作系统
c. 转交其他loader：将开机管理功能转交给其他loader负责
4. 核心文件：开始操作系统的功能
系统磁盘用的分区为 /boot, /, /home, /tmp, /var 等分区，数据磁盘全部容量规划在同一个分区
第三章、安装 CentOS7.x
安装CentOS 7.x的模式至少有两种，分别是图形接口与命令行
CentOS 7 会主动依据你的磁盘容量判断要用 MBR 或 GPT 分区方式，你也可以强迫使
用 GPT
CentOS 7默认使用 xfs 作为文件系统
GMT 时间指的是格林威治时间，称为标准的时间
第四章、首次登陆与线上求助
CentOS 7 开始已经没有所谓的“执行等级 （run level） ”的概念了，新的管理方法使用的是 systemd 的模式
通常出现“command not found”的可能原因为：
? 这个指令不存在，因为该软件没有安装之故。解决方法就是安装该软件
? 这个指令所在的目录目前的用户并没有将他加入指令搜寻路径中
? 打错字
man, info, /usr/share/doc/ ：
? 在终端机模式中，如果你知道某个指令，但却忘记了相关选项与参数，请先善用 --help的功能来查询相关信息
? 当有任何你不知道的指令或文件格式这种玩意儿，但是你想要了解他，请赶快使用man或者是info来查询
? man page说明后面的数字中，1代表一般帐号可用指令，8代表系统管理员常用指令，5代表系统配置文件格式
? info page可将一份说明文档拆成多个节点（node） 显示，并具有类似超链接的功能，增加易读性
? 而如果你想要架设一些其他的服务，或想要利用一整组软件来达成某项功能时，请赶快到/usr/share/doc 下面查一查有没有该服务的说明文档喔
? 因为Linux毕竟是外国人发明的，所以中文文件确实是比较少的
与关机/重新开机相关的指令：
? 将数据同步写入硬盘中的指令： sync ，shutdown/reboot/halt 等等指令在关机前进行sync工具的调用
? 惯用的关机指令： shutdown
? 重新开机，关机： reboot, halt, poweroff
? 实际使用管理工具 systemctl 关机
第五章、Linux 的文件权限与目录配置
ls / ll：查看文件
ls -aldSt [--full-time] [--time=atime | ctime] [dirname/filename]
ll dirname/filename
cp：复制
cp [-adfilprsu] 来源文件 目标文件，-a或-p可以完整复制文件权限，-d复制链接文件
mv：移动文件与目录，或更名
mv [-fiu] source destination，-u更新
rm：移除文件或目录
rm [-fir] 文件或目录
chgrp ：改变文件所属群组
chgrp [-R] dirname/filename ...
chown ：改变文件拥有者
chown [-R] 帐号名称 文件或目录
chown [-R] 帐号名称:群组名称 文件或目录
chmod ：改变文件的权限, SUID, SGID, SBIT等等的特性
chmod [-R] xyz 文件或目录，xyz 标识权限属性，可以是数字，可以是+-rwx
chmod | u g o a | +（加入） -（除去） =（设置） | r w x | 文件或目录
/ （root, 根目录） ：与开机系统有关
/usr （unix software resource） ：与软件安装/执行有关，/usr/local/sbin/包括：fdisk, fsck, ifconfig, mkfs等
/var （variable） ：与系统运行过程有关 ，/var/log摆放系统登录文件的地方
/bin：单人维护模式下还能够被操作的指令，主要有 cat, chmod, chown, date, mv, mkdir, cp, bash等
/sbin：开机、修复、还原系统所需要的指令，系统管理员常用指令集
/boot：开机配置文件，也是默认摆放核心 vmlinuz 的地方
/dev：摆放所有系统设备文件的目录 ，有 /dev/null, /dev/zero, /dev/tty, /dev/loop, /dev/sd等
/etc：系统主要的配置文件， 有 /etc/modprobe.d/, /etc/passwd, /etc/fstab, /etc/issue 等
/lib：在开机时会用到的函数库， 以及在/bin或/sbin下面的指令会调用的函数库
/media：可移除的设备，常见的文件名有：/media/floppy, /media/cdrom等
/mnt：暂时挂载某些额外的设备
/opt：给第三方协力软件放置的目录，以前的Linux系统中是放置在/usr/local目录下
/run：系统开机后所产生的各项信息，以前放在/var/run目录下
/srv：服务所需要取用的数据目录，WWW服务器放置在/srv/www/，不需要对外开放的默认放在/var/lib下
/tmp：一般使用者或者是正在执行的程序暂时放置文件的地方
/home：系统默认的使用者主文件夹（home directory）
/lib<qual>：存放与 /lib 不同的格式的二进制函数库，例如支持 64 位的 /lib64 函数库等
/root：系统管理员（root） 的主文件夹
/lost+found：使用标准的ext2/ext3/ext4文件系统格式才会产生的一个目录
/proc：一个“虚拟文件系统（virtual filesystem） ”，目录下的数据都是在内存当中
/sys：一个虚拟的文件系统，记录核心与系统硬件信息较相关的信息
CentOS7将内部数据全部挪到了/usr里面去：/bin --> /usr/bin，/lib64 --> /usr/lib64，/sbin --> /usr/sbin，/var/lock --> /run/lock，/lib --> /usr/lib，/var/run --> /run
第六章、Linux 文件与目录管理
cd [相对路径 | 绝对路径 | ~ | .. | - | 空] ：变换目录
pwd [-P]：显示目前的目录，-p显示正确的路径，而非链接文件本身的目录名而已
mkdir [-mp]：创建一个新的目录，-m设置目录的权限，不需要看umask
rmdir [-p]：删除一个空的目录
su - # 切换身份成为 root
exit # 离开，变回原来的账号
echo $PATH：查看环境变量，PATH="${PATH}:/root" 添加新的环境变量
basename /etc/sysconfig/network：获取文件名network
dirname /etc/sysconfig/network：获取目录名/etc/sysconfig
cat [-AbEnTv]：由第一行开始显示文件内容，-n表示显示行号
tac：从最后一行开始显示
nl [-bnw] 文件：显示的时候，顺道输出行号
more：一页一页的显示文件内容，空白键下翻一页，Enter向下一行，:f显示文件名和行数，b往前翻页仅文件
less：一页一页翻动，空白键下一页，[pageup]上一页，/字串向下查找，?字串向上查找，nN下一个前一个
head [-n number] 文件：只看头几行
tail [-n number] 文件：只看尾巴几行，-f 持续查看
od [-t TYPE] 文件：以二进制的方式读取文件内容
touch [-acdmt] 文件：a仅修订atime，c仅修改文件的时间，m仅修改mtime
umask [-S | 022]：该默认值需要减掉的权限，假设umask为022
创建文件时：（-rw-rw-rw-） - （-----w--w-） ==> -rw-r--r--
创建目录时：（drwxrwxrwx） - （d----w--w-） ==> drwxr-xr-x
chattr [+-=][ASacdistu] 文件或目录名称：设置文件隐藏属性
lsattr [-adR] 文件或目录：显示文件隐藏属性
chmod 4755 filename，4 为 SUID或 u+s，2 为 SGID或 g+s，1 为 SBIT或 o+t
file：观察文件类型
which [-a] command：寻找“可执行文件”
whereis [-bmsu] 文件或目录名：寻找文件文件名，l目录，b二进制文件，m文档manual路径下的
locate [-ir] keyword：依据 /var/lib/mlocate 查找， i忽略大小写，r正则
updatedb：根据 /etc/updatedb.conf 的设置去搜寻系统硬盘内的文件名，并更新/var/lib/mlocate 内文件
find [PATH] [option] [action]：
与时间相关选项：-mtime +n|-n|n、 -newer file 
与使用者或群组名称有关：-uid n、-gid n、-user name、-group name、-nouser、-nogroup
与文件权限及名称有关：-name filename、-size [+-]SIZE、-type TYPE、-perm [-|/|空]mode，mode权限755
额外可进行的动作：-exec command、-print
第七章、Linux 磁盘与文件系统管理
Linux常见的支持文件系统有：
传统文件系统：ext2 / minix / MS-DOS / FAT （用 vfat 模块） / iso9660 （光盘） 等
日志式文件系统： ext3 /ext4 / ReiserFS / Windows' NTFS / IBM's JFS / SGI's XFS /ZFS
网络文件系统： NFS / SMBFS
从 CentOS 7.x 开始， 文件系统由 Ext4 变成了 xfs 这一个较适合大容量磁盘与巨型文件性能较佳的文件系统了
df [-ahikHTm] [目录或文件名]：列出文件系统的整体磁盘使用量
du [-ahskm] 文件或目录名称：评估文件系统的磁盘使用量
ln [-sf] 来源文件 目标文件：s快捷方式
新增一块磁盘操作步骤：
1. 对磁盘进行分区，以创建可用的 partition
2. 对该 partition 进行格式化 （format） ，以创建系统可用的 filesystem
3. 若想要仔细一点，则可对刚刚创建好的 filesystem 进行检验
4. 在 Linux 系统上，需要创建挂载点 （亦即是目录） ，并将他挂载上来
lsblk [-dfimpt] [device]：列出系统上的所有磁盘列表
gdisk 设备名称：磁盘分区，采用 GPT 格式
partprobe [-s]：更新 Linux 核心的分区表信息
gdisk 设备名称：删除一个分区
fdisk 设备名称：MBR 分区
mkswap /dev/vda6：先创建一个/dev/vda6分区，再设置swap格式
blkid /dev/vda6：确定格式化成功
swapon /dev/vda6：载入
swapon -s：列出目前使用的swap设备
vi /etc/fstab：写入配置文件
mkfs.xfs [-b bsize] [-d parms] [-i parms] [-l parms] [-L label] [-f] [-r parms] 设备名称：磁盘格式化
mkfs.ext4 [-b size] [-L label] 设备名称：EXT4 文件系统 mkfs.ext4 磁盘格式化
xfs_repair [-fnd] 设备名称：文件系统检验
fsck.ext4 [-pf] [-b superblock] 设备名称：校验 EXT4 文件系统
mount [-t 文件系统] 设备文件名 挂载点：挂载
mount [-t 文件系统] UUID='' 挂载点：文件系统 xfs,ext3, ext4,reiserfs,vfat, iso9660（光盘格式） ,nfs,cifs,smbfs
mount [-t 文件系统] LABEL='' 挂载点：挂载
mount [-l]：查看挂载
mount -a：依照配置文件 [/etc/fstab](../Text/index.html#fstab) 的数据将所有未挂载的磁盘都挂载上来
blkid /dev/vda4：查看UUID
mkdir -p /data/xfs：创建挂载点
mount UUID="e0a6af55-26e7-4cb7-a515-826a8bd29e90" /data/xfs：挂载
mount -o codepage=950,iocharset=utf8 UUID="35BC-6D6B" /data/usb：-o可以指定挂载点语系
umount [-fn] 设备文件名或挂载点：将设备文件卸载
mknod 设备文件名 [bcp] [Major] [Minor]：
xfs_admin [-lu] [-L label] [-U uuid] 设备文件名：修改 XFS 文件系统的 UUID 与 Label name
tune2fs [-l] [-L Label] [-U uuid] 设备文件名：修改 ext4 的 label name 与 UUID
开机挂载 /etc/fstab 及 /etc/mtab，[设备/UUID等] [挂载点] [文件系统] [文件系统参数] [dump] [fsck]
parted [设备] [指令 [参数]]：利用 GNU 的 parted 进行分区
第八章、文件与文件系统的压缩,打包与备份
压缩文件的扩展名大多是：.tar, .tar.gz, .tgz, .gz, .Z, .bz2, .xz
gzip [-cdtv#] 文件名：gzip进行压缩，c输出信息，d解压缩，t校验，v比等信息，#压缩等级
zcat 文件名.gz：查看原文件
bzip2 [-cdkzv#] 文件名：bzip2进行压缩
bzcat 文件名.bz2
xz [-dtlkc#] 文件名：xz进行压缩
xcat 文件名.xz
tar [-zjJ] [cv] [-f 待创建的新文件名] filename...：打包
tar [-zjJ] [tv] [-f 既有的tar文件名]：查看
tar [-zjJ] [xv] [-f 既有的tar文件名]：解压
XFS 文件系统备份 xfsdump，必须使用 root 的权限才能操作 ：
xfsdump [-L S_label] [-M M_label] [-l #] [-f 备份文件] 待备份数据，I列出备份信息状态
XFS 文件系统还原 xfsrestore
xfsrestore [-f 备份文件] [-L S_label] [-s] 待复原目录
mkisofs：创建镜像文件：
mkisofs [-o 镜像文件] [-Jrv] [-V vol] [-m file] 待备份文件... -graft-point isodir=systemdir ...
cdrecord：光盘烧录工具：新版的 CentOS 7 使用的是 wodim 
wodim --devices dev=/dev/sr0：查询烧录机BUS位置
wodim -v dev=/dev/sr0 blank=fast：抹除重复读写片
wodim -v dev=/dev/sr0 -format：格式化DVD+RW
wodim -v dev=/dev/sr0 [可用选项功能] file.iso：烧录
wodim -v dev=/dev/sr0 speed=4 -dummy -eject /tmp/system.img
dd 制作一个文件，可读取磁盘设备的内容，可将设备备份成一个文件
dd if="input_file" of="output_file" bs="block_size" count="number"
dd if=/etc/passwd of=/tmp/passwd.back
cpio 可以备份任何东西：
find / | cpio -ocvB > /dev/st0
cpio -idvc < /dev/st0
第九章、vim 程序编辑器
上k、下j、左h、右l
x向后删除一个字符，X向前删除一个字符，nx其中n为数字，dd删除整行
nyy复制，p光标下一列粘贴，P光标上一列粘贴
u复原前一个动作，[Ctrl]+r重做上一个动作，. 重复前一个动作
:n1,n2 w [filename]，将n1到n2的内容存为filename文件
:! command：执行命令
LANG=zh_TW.big5：设置编码，配置文件/etc/locale.conf
export LC_ALL=zh_TW.big5
第十章、认识与学习BASH
查询指令是否为 Bash shell 的内置命令： type [-tpa] name，t显示含义，a全部路径
变量的取用与设置：echo ${myname}
双引号内的特殊字符如 $ 等，可以保有原本的特性
单引号内的特殊字符则仅为一般字符 （纯文本）
变量设置规则：unset myname
cd /lib/modules/$（uname -r） /kernel
观察环境变量与常见环境变量说明：env
输出0~32767随机数：declare -i number=$RANDOM*10/32768 ; echo $number
影响显示结果的语系变量 ：locale -a，配置文件/etc/locale.conf
变量键盘读取、阵列与宣告： read, array, declare
read [-pt] variable，p接提示符，t接秒数
declare [-aixr] variable，a阵列(array)类型，i整数，x同export，r只读readonly
与文件系统及程序的限制关系： 
ulimit [-SHacdfltu] [配额]
新的变量，主要用来取代旧变量：new_var=${old_var-content}
命令别名设置： alias rm='rm -i' , unalias rm
历史命令：history [n]（n数字） | [-c]（清除） | [-raw] histfiles（读取附加写入）
执行history：!66，执行66号指令，!!，执行上一条指令
指令运行的顺序：
1. 以相对/绝对路径执行指令，例如“ /bin/ls ”或“ ./ls ”
2. 由 alias 找到该指令来执行
3. 由 bash 内置的 （builtin） 指令来执行
4. 通过 $PATH 这个变量的顺序搜寻到的第一个指令来执行
bash 的进站与欢迎讯息： /etc/issue, /etc/motd
login shell 其实只会读取这两个配置文件：/etc/profile 和 ~/.bash_profile 或 ~/.bash_login 或 ~/.profile
login shell 的读取流程：
/etc/profile(/etc/profile.d/*.sh->/etc/locale.conf)->~/.bash_profile(~/.bashrc->/etc/bashrc)->开始操作bash
终端机的环境设置： stty [-a] , set [-uvCHhmBx]
数据流重导向：file -> (<, <<) -> Command -> (>, >> 或者 2>, 2>>) -> screen file/device
将错误的数据丢弃，屏幕上显示正确的数据：find /home -name .bashrc 2> /dev/null
cut -d'分隔字符' -f fields：用于有特定分隔字符，f表示取出第几段
echo ${PATH} | cut -d ':' -f 3,5
cut -c 字符区间：用于排列整齐的讯息
grep [-acinv] [--color=auto] '搜寻字串' filename：取出某部分
grep --color=auto 'MANPATH' /etc/man_db.conf
sort [-fbMnrtuk] [file or stdin]选项与参数：排序，t分隔符，k哪一栏来排序，n数字排序，r反序
uniq [-ic]：将重复的数据仅列出一个显示，c计数
wc [-lwm]：l行数，w字数(英文单字)，m字符
last：列出登陆过的用户
tee [-a] file：以累加 （append） 的方式，将数据加入 file 当中
字符转换命令： tr, col, join, paste, expand
分区命令： split [-bl] file PREFIX，b接文件大小，l以行数进行分区
cd /tmp; split -b 300k /etc/services services
参数代换： xargs [-0epn] command
第十一章、正则表达式与文件格式化处理
[:alnum:]即0-9,A-Z,a-z，[:alpha:]即A-Z,a-z，[:blank:]空白键与 [Tab] 按键，[:digit:]数字，[:graph:]空白符
[:lower:]小写字符，[:upper:]大写字符，[:punct:]标点符号
sed [-nefr] [动作]：动作常用[n1[,n2]]function，a新增，c取代，d删除，i插入，p打印，s取代
nl /etc/passwd | sed '2,5d'：将第 2~5 行删除
nl /etc/passwd | sed '2a drink tea'： 再第二行后加上“drink tea?”字样
nl /etc/passwd | sed '2,5c No 2-5 number'：将第2-5行的内容取代成为“No 2-5 number”
nl /etc/passwd | sed -n '5,7p'：列出第 5-7 行
sed 's/要被取代的字串/新的字串/g' ：替换
printf '打印格式' 实际内容：格式化打印
awk '条件类型1{动作1} 条件类型2{动作2} ...' filename：数据处理工具
last -n 5 | awk '{print $1 "\t" $3}'：前五行的第1列和第3列
last -n 5 | awk '{print $1 "\t lines: " NR "\t columns: " NF}'，NR行数，NF字段数
文件比对工具：
diff [-bBi] from-file to-file，b忽略多个空白差异，B忽略空白行差异，i忽略大小写，查看版本
cmp [-l] file1 file2，l列出不同的字节处
patch -pN < patch_file，将旧版数据更新到新版，p取消几层目录，由 diff 创建 patch 的补丁来源文件
patch -R -pN < patch_file，还原，将新的文件还原成旧的版本
文件打印准备： pr /etc/man_db.conf
alias myip="ifconfig eth0 | grep 'inet ' | sed 's/^.*inet //g' | sed 's/ *netmask.*$//g'"：获取IP地址
MYIP=$(myip)
永久生效写入你的 ~/.bashrc
第十二章、学习 Shell Scripts
在 shell script 的撰写中还需要用到下面的注意事项：
1. 指令的执行是从上而下、从左而右的分析与执行
2. 指令的下达：指令、选项与参数间的多个空白都会被忽略掉
3. 空白行也将被忽略掉，并且 [tab] 按键所推开的空白同样视为空白键
4. 如果读取到一个 Enter 符号 （CR） ，就尝试开始执行该行 （或该串） 命令
5. 至于如果一行的内容太多，则可以使用“ [Enter] ”来延伸至下一行
6. “ # ”可做为注解！任何加在 # 后面的数据将全部被视为注解文字而被忽略！
如何执行：
? 直接指令下达： shell.sh 文件必须要具备可读与可执行 （rx） 的权限，绝对路径、相对路径、PATH
? 以 bash 程序来执行：通过“ bash shell.sh ”或“ sh shell.sh ”来执行
注解：1. 内容与功能； 2. 版本信息； 3.作者与联络方式； 4. 创建日期；5. 历史纪录 
利用 test 指令的测试功能：test -e /dmtsai 或 利用判断符号 [ ]
常见选项：e是否存在，f是否是文件，d是否是目录，b是否是块设备，L是否是链接
    r是否可读，w是否可写，x是否可执行，u、g、k是否有SUID、SGID、Sticky，s非空白文件
    nt比较新，ot比较旧，ef同一文件
eq数值相等，ne不等，gt大于，lt小于，ge大于等于，le小于等于
z空字串为true，n空字串为false，==相等，!=不等
a与，o或，!非
条件判断式：
利用 if .... then .... fi
利用 case ..... esac 判断
利用 function 功能
循环：
while do done, until do done （不定循环）
for...do...done （固定循环）
netstat -tuln：主机启动的服务
sh -x script.sh 来进行程序的 debug
第十三章、Linux 帐号管理与 ACL 权限设置
关于群组： 有效与初始群组、groups、newgrp
UID 只有 0 与非为 0 两种，非为 0 则为一般帐号。一般帐号又分为系统帐号 （1~999）及可登陆者帐号 （大于 1000）
账号管理：
新增与移除使用者： useradd, 相关配置文件, passwd, usermod, userdel
useradd [-u UID] [-g 初始群组] [-G 次要群组] [-mM] [-c 说明栏] [-d 主文件夹绝对路径] [-s shell] 使用者帐号
passwd [--stdin] [帐号名称]，echo "abc543CC" | passwd --stdin vbird2
passwd [-l] [-u] [--stdin] [-S] [-n 日数] [-x 日数] [-w 日数] [-i 日期] 帐号，l锁定，u解锁
chage [-ldEImMW] 帐号名，显示详细的密码，l详细信息
usermod [-cdegGlsuLU] username，c账号说明，e失效时间
userdel [-r] username，r和家目录一起删除
id [username]
finger [-s] username，列出使用者信息，这个命令默认没有安装
chfn [-foph] [帐号名]，类似finger，设置使用者信息 
chsh [-ls]，l列出可用shell，s设置shell
groupadd [-g gid] [-r] 群组名称，r创建系列群组
groupmod [-g gid] [-n new_group_name] 群组名
groupdel [groupname]
gpasswd groupname
gpasswd [-A user1,...] [-M user3,...] groupname，A移交主控权，M将账号加入群组
gpasswd [-rR] groupname，r密码移出，R密码栏失效
gpasswd [-ad] user groupname，a加入用户，d移除用户
账号相关文件：
使用者帐号与密码参数方面的文件：/etc/passwd, /etc/shadow
使用者群组相关方面的文件：/etc/group, /etc/gshadow
使用者的主文件夹：/home/帐号名称
useradd 创建的帐号，会参考文件：/etc/default/useradd、/etc/login.defs、/etc/skel/*
PAM 模块来管理密码，密码复杂度：/etc/pam.d/passwd
当你执行 passwd 后，这支程序调用 PAM 的流程是：
1. 使用者开始执行 /usr/bin/passwd 这支程序，并输入密码
2. passwd 调用 PAM 模块进行验证
3. PAM 模块会到 /etc/pam.d/ 找寻与程序 （passwd） 同名的配置文件
4. 依据 /etc/pam.d/passwd 内的设置，引用相关的 PAM 模块逐步进行验证分析
5. 将验证结果 （成功、失败以及其他讯息） 回传给 passwd 这支程序
6. passwd 这支程序会根据 PAM 回传的结果决定下一个动作 （重新输入新密码或者通过验证！）
使用外部身份认证系统：authconfig-tui
ACL（Access Control List） 可以针对单一使用者，单一文件或目录来进行 r,w,x 的权限规范
dmesg | grep -i acl，查看是否支持 ACL
setfacl [-bkRd] [{-m|-x} acl参数] 目标文件名，d设置目录默认acl，b移除所有acl，k移除默认acl
setfacl -m u:dmtsai:rx acl_test1，u:[使用者帐号列表]:[rwx] 针对特定使用者的方式
setfacl -m g:mygroup1:rx acl_test1，g:[群组列表]:[rwx] 针对特定群组的方式
setfacl -m m:r acl_test1， m:[rwx] 针对有效权限 mask 的设置方式
setfacl -m d:u:myuser1:rx /srv/projecta， d:[ug]:使用者列表:[rwx] 针对默认权限的设置方式，继承
setfacl -x u:myuser1 /srv/projecta，取消某个帐号的 ACL 时，不需要加上权限项目
setfacl -x d:u:myuser1 /srv/projecta
setfacl -m u:pro3:- /srv/projecta，让 pro3 这个用户无法使用该目录
getfacl filename，查看是否有acl
su -，切换成root
su [-lm] [-c 指令] [username]，l即login-shell的方式，m使用目前的环境设置，c仅进行一次指令
su - -c "head -n 3 /etc/shadow"
sudo 指令，执行root的指令串 
sudo [-b] [-u 新使用者帐号]
若想要使用 sudo 执行属于 root 的权限指令，则 root 需要先使用 visudo 去修改 /etc/sudoers 
查询使用者： w, who, last, lastlog
使用者对谈： write, mesg, wall
使用者邮件信箱： mail
一些帐号相关的检查工具：pwck 、pwconv
大量创建帐号范本（适用 passwd --stdin 选项）
第十四章、磁盘配额（Quota） 与进阶文件系统管理
Quota 可公平的分配系统上面的磁盘容量给使用者；分配的资源可以是磁盘容量（block） 或可创建文件数量（inode）
磁盘阵列全名是“ Redundant Arrays of Inexpensive Disks, RAID ”，英翻中的意思是：容错式廉价磁盘阵列
RAID-0 （等量模式, stripe） ：性能最佳，数据不安全
RAID-1 （映射模式, mirror） ：完整备份，性能不佳
RAID 1+0，RAID 0+1： 目前储存设备厂商最推荐 RAID 1+0
RAID 5：性能与数据备份的均衡考虑，至少需要三颗以上的磁盘，写入时每颗磁盘加入一个同位检查码Parity 
RAID 6：使用两颗磁盘的容量作为 parity 的储存， RAID 5 仅能支持一颗磁盘的损毁
Spare Disk：预备磁盘的功能
软件磁盘阵列的设置：
mdadm --detail /dev/md0
mdadm --create /dev/md[0-9] --auto=yes --level=[015] --chunk=NK \
> --raid-devices=N --spare-devices=N /dev/sdx /dev/hdx...
mdadm --create /dev/md0 --auto=yes --level=5 --chunk=256K \
> --raid-devices=4 --spare-devices=1 /dev/vda{5,6,7,8,9}
仿真 RAID 错误的救援模式：
mdadm --manage /dev/md[0-9] [--add 设备] [--remove 设备] [--fail 设备]
mdadm --manage /dev/md0 --remove /dev/vda7
mdadm --manage /dev/md0 --add /dev/vda7
开机自动启动 RAID 并自动挂载：
mdadm --detail /dev/md0 | grep -i uuid，获取UUID
vim /etc/mdadm.conf，修改配置文件
ARRAY /dev/md0 UUID=2256da5f:4870775e:cf2fe320:4dfabbc6
blkid /dev/md0，开始设置开机自动挂载并测试
vim /etc/fstab
UUID=494cb3e1-5659-4efc-873d-d0758baec523 /srv/raid xfs defaults 0 0
umount /dev/md0; mount -a
df -Th /srv/raid
关闭软件 RAID：
umount /srv/raid
vim /etc/fstab
UUID=494cb3e1-5659-4efc-873d-d0758baec523 /srv/raid xfs defaults 0 0
dd if=/dev/zero of=/dev/md0 bs=1M count=50
mdadm --stop /dev/md0
dd if=/dev/zero of=/dev/vda5 bs=1M count=10
cat /proc/mdstat
vim /etc/mdadm.conf
#ARRAY /dev/md0 UUID=2256da5f:4870775e:cf2fe320:4dfabbc6
LVM（Logical Volume Manager） 逻辑卷轴管理员
Physical Volume, PV, 实体卷轴
Volume Group, VG, 卷轴群组
Physical Extent, PE, 实体范围区块
Logical Volume, LV, 逻辑卷轴
第十五章、例行性工作调度（crontab）
Linux 工作调度的种类：
at：at 是个可以处理仅执行一次就结束调度的指令
crontab：crontab 这个指令所设置的工作将会循环的一直进行下去
仅执行一次的工作调度：
systemctl restart atd # 重新启动 atd 这个服务
systemctl enable atd # 让这个服务开机就自动启动
systemctl status atd # 查阅一下 atd 目前的状态
at 的工作情况：
1. 先找寻 /etc/at.allow 这个文件，写在这个文件中的使用者才能使用 at ，没有在这个文件中的使用者则不能使用 at （即使没有写在 at.deny 当中） 
2. 如果 /etc/at.allow 不存在，就寻找 /etc/at.deny 这个文件，若写在这个 at.deny 的使用者则不能使用 at ，而没有在这个 at.deny 文件中的使用者，就可以使用 at 咯
3. 如果两个文件都不存在，那么只有 root 可以使用 at 这个指令
at [-mldv] TIME，at now + 5 minutes
at -c 工作号码，at -c 2
atq
atrm （jobnumber）
batch， 系统有空时才进行背景任务
循环执行的例行性工作调度：
   crontab [-u username] [-l|-e|-r]，u只有root才能进行这个任务，帮其他使用者创建/移除 crontab 工作调度
系统的配置文件： /etc/crontab, /etc/cron.d/*
cron 会每分钟去读取一次/etc/crontab 与 /var/spool/cron 里面的数据内容
可唤醒停机期间的工作任务：anacron 与 /etc/anacrontab
anacron 的配置文件应该放置在 /etc/cron.hourly 
anacron [-sfn] [job]..
anacron -u [job]..
第十六章、程序管理与 SELinux 初探
工作管理 （job control）
tar -zpcf /tmp/etc.tar.gz /etc &， 直接将指令丢到背景中“执行”的 &
将“目前”的工作丢到背景中“暂停”：[ctrl]-z
观察目前的背景工作状态： jobs [-lrs]
将背景工作拿到前景来处理：fg %jobnumber
让工作在背景下的状态变成运行中： bg，jobs ; bg %3 ; jobs
管理背景当中的工作： kill -signal %jobnumber，kill -l
ps aux <==观察系统所有的程序数据
ps -lA <==也是能够观察所有系统的数据
ps axjf <==连同部分程序树状态
仅观察自己的 bash 相关程序： ps -l
僵尸 （zombie） 程序：因为该程序应该已经执行完毕，或者是因故应该要终止了， 但是该程序的父程序却无法完整的将该程序结束掉，而造成那个程序一直存在内存当中
动态观察程序的变化：
top [-d 数字] | top [-bnp]
top -d 2，每两秒钟更新一次 top ，观察整体信息
top -b -n 2 > /tmp/top.txt，将 top 的信息进行 2 次，然后将结果输出到 /tmp/top.txt
top -d 2 -p PID，自己的bash PID可由$$取得
pstree [-A|U] [-up]
pstree -A，列出目前系统上面所有的程序树的相关性
pstree -Aup，同时秀出 PID 与 users
killall [-iIe] [command name]
killall -1 rsyslogd，给予 rsyslogd 这个指令启动的 PID 一个 SIGHUP 的讯号
killall -9 httpd，强制终止所有以 httpd 启动的程序 （其实并没有此程序在系统内）
killall -i -9 bash，依次询问每个 bash 程序是否需要被终止运行
ps aux | grep 'rsyslogd' | grep -v 'grep'| awk '{print $2}'，找出 rsyslogd 这个程序的 PID 
kill -SIGHUP $（ps aux | grep 'rsyslogd' | grep -v 'grep'| awk '{print $2}'），启动被终止的程序
nice [-n 数字] command，n范围-20 ~ 19
nice -n -5 vim &，用 root 给一个 nice 值为 -5 ，用于执行 vim ，并观察该程序
renice [number] PID，已存在程序的 nice 重新调整
系统资源的观察：
free [-b|-k|-m|-g|-h] [-t] [-s N -c N]，观察内存使用情况
free -m，显示目前系统的内存容量
uname [-asrmpi]，查阅系统与核心相关信息
uname -a，输出系统的基本信息
uptime，观察系统启动时间与工作负载
netstat -[atunlp]，追踪网络或插槽档
netstat -tulnp， 找出目前系统上已在监听的网络连线及其 PID
dmesg | more：分析核心产生的讯息
vmstat，侦测系统资源变化
vmstat 1 3，统计目前主机 CPU 状态，每秒一次，共计三次
vmstat -d，系统上面所有的磁盘的读写状态
fuser [-umv] [-k [i] [-signal]] file/dir， 查询已打开文件或已执行程序打开之文件
fuser -uv . ，找出目前所在目录的使用 PID/所属帐号/权限
fuser -uv /proc， 找到所有使用到 /proc 这个文件系统的程序
lsof [-aUu] [+d]，列出被程序所打开的文件文件名
lsof -u root -a -U， 仅列出关于 root 的所有程序打开的 socket 文件
lsof +d /dev， 列出目前系统上面所有的被启动的周边设备
pidof [-sx] program_name， 找出某支正在执行的程序的 PID
pidof systemd rsyslogd，列出目前系统上面 systemd 以及 rsyslogd 这两个程序的 PID
SELinux是“ Security Enhanced Linux ”的缩写，安全强化的 Linux 
第十七章、认识系统服务 （daemons）
基本上 init 的管理机制：
? 服务的启动、关闭与观察等方式：
? 启动：/etc/init.d/daemon start
? 关闭：/etc/init.d/daemon stop
? 重新启动：/etc/init.d/daemon restart
? 状态观察：/etc/init.d/daemon status
? 服务启动的分类
? 独立启动模式 （stand alone）
? 总管程序 （super daemon）：由xinetd或inetd这两个总管程序提供 socket对应或 port 对应的管理  
? 执行等级的分类
? 基本上 Linux提供 7 个执行等级， 1） 单人维护模式、3） 纯文本模式、5） 文字加图形界面
? 制定执行等级默认要启动的服务
? 默认要启动： chkconfig daemon on
? 默认不启动： chkconfig daemon off
? 观察默认为启动否： chkconfig --list daemon
CentOS 7.x 以后，放弃 init 启动脚本，改用 systemd 这个启动服务管理机制
/usr/lib/systemd/system/：每个服务最主要的启动脚本设置，有点类似以前的 /etc/init.d下面的文件
/run/systemd/system/：系统执行过程中所产生的服务脚本，优先级比上面的高
/etc/systemd/system/：管理员依据主机系统的需求所创建的执行脚本，优先级比上面的高
通过 systemctl 管理服务：systemctl [command] [unit]
systemctl status atd.service， 看看目前 atd 这个服务的状态
systemctl stop atd.service，正常关闭这个 atd 服务
systemctl stop chronyd.service，立刻将他关闭，同时开机不会启动
systemctl disable chronyd.service
systemctl [command] [--type=TYPE] [--all]，观察系统上所有的服务
systemctl list-unit-files， 列出所有已经安装的 unit 有哪些
systemctl list-units --type=service --all， 只剩下 *.service 的项目才会出现
systemctl get-default，先观察是否真为图形模式，再将默认模式转为文字界面
systemctl set-default multi-user.target
systemctl isolate multi-user.target，在不重新开机的情况下，将目前的操作环境改为纯文本模式，关掉图形界面
systemctl poweroff 系统关机
systemctl reboot 重新开机
systemctl suspend 进入暂停模式
systemctl hibernate 进入休眠模式
systemctl rescue 强制进入救援模式
systemctl emergency 强制进入紧急救援模式
systemctl list-dependencies [unit] [--reverse]，分析各服务之间的相依性
systemctl stop getty@tty5.service，关闭不小心启动的 tty5, tty6 并重新启动 getty.target 
systemctl stop getty@tty6.service
systemctl restart systemd-logind.service
第十八章、认识与分析登录文件
Linux 常见的登录文件文件名：
? /var/log/boot.log： 开机的时候系统核心会去侦测与启动硬件
? /var/log/cron：查看 crontab 调度
? /var/log/dmesg： 记录系统在开机的时候核心侦测过程所产生的各项信息
? /var/log/lastlog： 可以记录系统上面所有的帐号最近一次登陆系统时的相关信息
? /var/log/maillog 或 /var/log/mail/*： 记录邮件的往来信息
? /var/log/messages：系统发生的错误讯息
? /var/log/secure： 基本上，只要牵涉到“需要输入帐号密码”的软件，登陆时就会被记录
? /var/log/wtmp, /var/log/faillog： 这两个文件可以记录正确与错误登陆系统者的帐号信息
? /var/log/httpd/, /var/log/samba/： 不同的网络服务会使用它们自己的登录文件记录
针对登录文件所需的功能，我们需要的服务与程序有：
? systemd-journald.service：最主要的讯息收受者，由 systemd 提供的
? rsyslog.service：主要登录系统与网络等服务的讯息，配置文件/etc/rsyslog.conf 
? logrotate：主要在进行登录文件的轮替功能，配置文件/etc/logrotate.conf、/etc/logrotate.d/   
logwatch 为 CentOS 7 默认提供的一个登录文件分析软件
第十九章、开机流程、模块管理与 Loader
系统开机的经过可以汇整成下面的流程的：
1. 载入 BIOS 的硬件信息与进行自我测试，并依据设置取得第一个可开机的设备
2. 读取并执行第一个开机设备内 MBR 的 boot Loader （亦即是 grub2, spfdisk 等程序）
3. 依据 boot loader 的设置载入 Kernel ，Kernel 会开始侦测硬件与载入驱动程序
4. 在硬件驱动成功后，Kernel 会主动调用 systemd 程序，并以 default.target 流程开机
? systemd 执行 sysinit.target 初始化系统及 basic.target 准备操作系统
? systemd 启动 multi-user.target 下的本机与服务器服务
? systemd 执行 multi-user.target 下的 /etc/rc.d/rc.local 文件
? systemd 执行 multi-user.target 下的 getty.target 及登陆服务
? systemd 执行 graphical 需要的服务
SystemV与systemd：
? init 0 等价于 systemctl poweroff
? init 1 等价于 systemctl rescue
? init [234] 等价于 systemctl isolate multi-user.target
? init 5 等价于 systemctl isolate graphical.target
? init 6 等价于 systemctl reboot
CentOS 7.x 的 systemd 开机流程：
1. local-fs.target + swap.target：这两个 target 主要在挂载本机 /etc/fstab 里面文件系统与内存交换空间
2. sysinit.target：这个 target 主要在侦测硬件，载入所需要的核心模块等动作
3. basic.target：载入主要的周边硬件驱动程序与防火墙相关任务
4. multi-user.target 下面的其它一般系统或网络服务的载入，/usr/lib/systemd/system、/etc/systemd/system 
5. 图形界面相关服务如 gdm.service 等其他服务的载入
第二十章、基础系统设置与备份策略
网络设置：
? 手动设置固定 IP
? eno1 ：代表由主板 BIOS 内置的网卡
? ens1 ：代表由主板 BIOS 内置的 PCI-E 界面的网卡
? enp2s0 ：代表 PCI-E 界面的独立网卡，可能有多个插孔，因此会有 s0, s1... 的编号
? eth0 ：如果上述的名称都不适用，就回到原本的默认网卡编号
? nmcli connection show [网卡代号]，查看网卡
? nmcli connection modify eth0，设置网卡
? nmcli connection up eth0，更新网卡
? 自动取得 IP 参数
? nmcli connection modify eth0，connection.autoconnect yes，ipv4.method auto
修改主机名称：hostnamectl [set-hostname 你的主机名]
时区的显示与设置：timedatectl [commamd] 
timedatectl list-timezones | grep -i new
timedatectl set-timezone "America/New_York"
timedatectl set-time "2015-09-01 12:02"，时间的调整 
ntpdate tock.stdtime.gov.tw，hwclock -w，用 ntpdate 手动网络校时 
firewall-cmd --permanent --add-rich-rule='rule family="ipv4" \
> source address="192.168.1.0/24" accept'
firewall-cmd --reload
dmidecode -t type，解析硬件配备 
smartctl -a /dev/sda，显示完整的 /dev/sda 的信息 
smartctl -t short /dev/sda，命令磁盘进行一次自我检测的动作，然后再次观察磁盘状态
smartctl -a /dev/sda
第二十一章、软件安装：源代码与 Tarball
Tarball 是一个软件包，解压缩之后通常有：原始程序码文件、侦测程序文件、本软件的简易说明与安装说明    
Tarball 安装流程（3、4 通过 make 这个指令的功能来简化他）：
1. 将 Tarball 由厂商的网页下载下来
2. 将 Tarball 解开，产生很多的源代码文件
3. 开始以 gcc 进行源代码的编译 （会产生目标文件 object files）
4. 然后以 gcc 进行函数库、主、副程序的链接，以形成主要的 binary file
5. 将上述的 binary file 以及相关的配置文件安装至自己的主机上面
Tarball 以 make 安装的基本步骤：
1. 取得原始文件：将 tarball 文件在 /usr/local/src 目录下解压缩
2. 取得步骤流程：进入新创建的目录下面，去查阅 INSTALL 与 README 等相关文件内容
3. 相依属性软件安装：根据 INSTALL/README 的内容察看并安装好一些相依的软件（非必要） 
4. 创建 makefile：以自动侦测程序 （configure 或 config） 侦测作业环境，并创建 Makefile这个文件
5. 编译：以 make 这个程序并使用该目录下的 Makefile 做为他的参数配置文件，来进行make编译或其他的动作
6. 安装：以 make 这个程序，并以 Makefile 这个参数配置文件，依据 install 这个标的（target） 的指定来安装到正确的路径
./configure，这个步骤就是在创建 Makefile 这个文件
make clean，make 会读取 Makefile 中关于 clean 的工作
make，make 会依据 Makefile 当中的默认工作进行编译的行为
make install，通常这就是最后的安装步骤了，make 会依据 Makefile 这个文件里面关于install 的项目
gcc -c hello.c，会自动的产生 hello.o 这个文件，但是并不会产生 binary 可执行文件
gcc -o hello hello.o
./hello
gcc -O hello.c -c，会自动的产生 hello.o 这个文件，并且进行最优化
gcc sin.c -lm -L/lib -I/usr/include，在进行 binary file 制作时，将链接的函数库与相关的路径填入 
gcc -o hello hello.c，-o 后面接的是要输出的 binary file 文件名 
gcc -o hello hello.c -Wall，程序的编译会变的较为严谨一点，所以警告讯息也会显示出来 
主、副程序编译：
vim thanks.c，主程序
vim thanks_2.c，副程序
gcc -c thanks.c thanks_2.c
gcc -o thanks thanks.o thanks_2.o
./thanks
第二十二章、软件安装 RPM, SRPM 与 YUM
目前在 Linux 界软件安装方式最常见的有两种，分别是：
? DPKG，Debian/Ubuntu，使用指令 dpkg，线上升级指令APT （apt-get）
? RPM，Red Hat/Fedora，使用指令 rpm, rpmbuild，线上升级指令 YUM （yum）
RPM 与 SRPM 的格式分别为：
xxxxxxxxx.rpm <==RPM 的格式，已经经过编译且包装完成的 rpm 文件
xxxxx.src.rpm <==SRPM的格式，包含未编译的源代码信息
RPM 安装：
rpm -ivh package_name
挂载光盘，使用： mount /dev/sr0 /mnt
找出文件的实际路径：find /mnt -name 'pam-devel*'
测试此软件是否具有相依性： rpm -ivh pam-devel... --test
直接安装： rpm -ivh pam-devel...
卸载光盘： umount /mnt
rpm -qa <==已安装软件
rpm -q[licdR] 已安装的软件名称 <==已安装软件
rpm -qf 存在于系统上面的某个文件名 <==已安装软件
rpm -qp[licdR] 未安装的某个文件名称 <==查阅RPM文件
rpm -q logrotate，是否有安装 logrotate 这个软件 
rpm -qi logrotate，列出 logrotate 这个软件的相关说明数据 
rpm -ql logrotate，属于该软件所提供的所有目录与文件
rpm -qc logrotate，分别仅找出 logrotate 的配置文件与说明文档
rpm -qd logrotate
rpm -qR logrotate，若要成功安装 logrotate ，他还需要什么文件的帮忙
rpm -qf /bin/sh，找出 /bin/sh 是那个软件提供的 
rpm -qpR filename.i386.rpm，假设我有下载一个 RPM 文件，想要知道该文件的需求文件 
rpm -Va
rpm -V 已安装的软件名称，rpm -V logrotate 
rpm -Vp 某个 RPM 文件的文件名
rpm -Vf 在系统上面的某个文件，rpm -Vf /etc/crontab 
yum [option] [查询工作项目] [相关参数]
yum search raid，搜寻磁盘阵列 （raid） 相关的软件有哪些
yum info mdadm，找出 mdadm 这个软件的功能为何 
yum list，列出 yum 服务器上面提供的所有软件名称
yum list updates，列出目前服务器上可供本机进行升级的软件有哪些 
yum provides passwd，列出提供 passwd 这个文件的软件有哪些 
yum list pam*
安装/升级功能：yum [install|update] 软件
yum [option] [安装与升级的工作项目] [相关参数]
移除功能：yum [remove] 软件
yum 的配置文件：vim /etc/yum.repos.d/CentOS-Base.repo 
yum repolist all：列出目前 yum server 所使用的软件库有哪些 
yum clean [packages|headers|all]
yum clean all，删除已下载过的所有软件库的相关数据 （含软件本身与清单） 
yum [群组功能] [软件群组]
yum grouplist，查阅目前软件库与本机上面的可用与安装过的软件群组有哪些 
yum groupinfo "Scientific Support"
yum groupinstall "Scientific Support"
vim /etc/yum.conf
安装： yum install （你的软件）
启动： systemctl start （你的软件）
开机启动： systemctl enable （你的软件）
防火墙： firewall-cmd --add-service="（你的服务） "; firewall-cmd --permanent --addservice="（你的服务） "
测试： 用软件去查阅你的服务正常与否
rpm -q httpd php mariadb-server php-mysql
yum install httpd php mariadb-server php-mysql
systemctl daemon-reload
systemctl start httpd
systemctl enable httpd
systemctl status httpd
firewall-cmd --add-service="http"
firewall-cmd --permanent --add-service="http"
firewall-cmd --list-all
第二十三章、X Window 设置介绍
在 Linux 上头的图形接口我们称之为 X Window System，简称为 X 或 X11，X11 是一个“软件”而不是一个操作系统 
第二十四章、Linux 核心编译与管理
保持干净源代码： make mrproper
开始挑选核心功能： make XXconfig
make vmlinux <==未经压缩的核心
make modules <==仅核心模块
make bzImage <==经压缩过的核心（默认）
make all <==进行上述的三个动作
make -j 4 clean <==先清除暂存盘
make -j 4 bzImage <==先编译核心
make -j 4 modules <==再编译模块
make -j 4 clean bzImage modules <==连续动作！