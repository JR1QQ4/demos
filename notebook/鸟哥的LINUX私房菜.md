���� LINUX ˽����
�����¡����������
CPU �ܹ�������ָ���RISC���븴��ָ���CISC��ϵͳ
? ����ָ����׹���SPARCϵ�С�IBM��Power Architectureϵ�С���ıARM CPUϵ��
? ����ָ���AMD��Interl��VIA�ȵ�x86�ܹ���CPU
? Ϊ������x86�ܹ���AMD�ܹ���64λ���˵���CPU��Ϊx86_64�ܹ�
CPU��Ƶ����CPU�ı�Ƶ������Ƶ��Ϊ�ϸ�Ƶ�ʣ���Ƶ�޷��޸ģ�ͨ����Ƶ��λ��Ƶ
��Ƶָ����CPU���ⲿԪ���������ݴ���ʱ���ٶȣ���Ƶ����CPU�ڲ��������ٹ������ܵ�һ�������� ������˲���CPU��Ƶ���ٶ�
�µ� CPU ����У��Ѿ������ŵ��ڴ����оƬ���ϵ� CPU �ڣ��� CPU ���ڴ桢�Կ�
��ͨ������ͨ����Ϊϵͳ���ߡ� ���ž�����ν�����������I/O�� ���ߣ���Ҫ����ϵӲ
�̡�USB���������ܱ��豸
�Կ��ֳ�ΪVGA��Video Graphics Array��
���̵ķ���ģʽ����ʽ��MSDOS����ģʽ���µ�GPTģʽ
Ӳ�̴���ӿڣ�SATA��USB��SAS
����ϵͳ��Operating System, OS��  ������ϵͳ���ģ�Kernel�� ��ϵͳ���ã�System Call��
1M������1Mbps���ױ���ÿ�룩,�����ٶ�1*1024/8 = 128KB/sec��12%����Ϣͷ��ʶ ��ʵ������ٶ�11KB/s
��һ�¡�Linux ��ʲô�����ѧϰ
1991�������ȣ�Linus Torvalds��
����ϵͳ��Operation System�� ��Ҫ�ڹ���������Ӳ������˱���Ҫ�ܹ������ڴ桢��
���豸�� �����г̹����Լ�ϵͳ���õȵ�
GNU��GNU is Not Unix�ļ�д
�ڶ��¡������滮����̷���
����Ԫ�����豸��Linux���涼�ǡ�һ���ļ�����
�豸
�豸��Linux�ڵ��ļ���
SCSI/SATA/USBӲ�̻�
/dev/sd[a-p]
USB������
/dev/sd[a-p] ����SATA��ͬ��
��ӡ��
/dev/lp[0-2] ��25���ӡ���� /dev/usb/lp[0-15] ��USB �ӿڣ�
CDROM/DVDROM
/dev/scd[0-1] ��ͨ�ã� /dev/sr[0-1] ��ͨ�ã�CentOS �ϳ�����/dev/cdrom ����ǰ CDROM��
���̷�����MBR ��Master Boot Record���� GPT ��GUID partition table��
�������̣�
1. BIOS����������ִ�еĹ̼�������ʶ��һ���ɿ������豸
2. MBR����һ���ɿ����豸�ĵ�һ�������ڵ���Ҫ������¼���飬�ں������������
3. �����������boot loader�� ��һ֧�ɶ�ȡ�����ļ���ִ�е������boot loader����Ҫ���� ��
a. �ṩ�˵���ʹ���߿���ѡ��ͬ�Ŀ�����Ŀ����Ҳ�Ƕ��ؿ�������Ҫ����
b. ��������ļ���ֱ��ָ��ɿ����ĳ�����������ʼ����ϵͳ
c. ת������loader��������������ת��������loader����
4. �����ļ�����ʼ����ϵͳ�Ĺ���
ϵͳ�����õķ���Ϊ /boot, /, /home, /tmp, /var �ȷ��������ݴ���ȫ�������滮��ͬһ������
�����¡���װ CentOS7.x
��װCentOS 7.x��ģʽ���������֣��ֱ���ͼ�νӿ���������
CentOS 7 ������������Ĵ��������ж�Ҫ�� MBR �� GPT ������ʽ����Ҳ����ǿ��ʹ
�� GPT
CentOS 7Ĭ��ʹ�� xfs ��Ϊ�ļ�ϵͳ
GMT ʱ��ָ���Ǹ�������ʱ�䣬��Ϊ��׼��ʱ��
�����¡��״ε�½����������
CentOS 7 ��ʼ�Ѿ�û����ν�ġ�ִ�еȼ� ��run level�� ���ĸ����ˣ��µĹ�����ʹ�õ��� systemd ��ģʽ
ͨ�����֡�command not found���Ŀ���ԭ��Ϊ��
? ���ָ����ڣ���Ϊ�����û�а�װ֮�ʡ�����������ǰ�װ�����
? ���ָ�����ڵ�Ŀ¼Ŀǰ���û���û�н�������ָ����Ѱ·����
? �����
man, info, /usr/share/doc/ ��
? ���ն˻�ģʽ�У������֪��ĳ��ָ���ȴ���������ѡ����������������� --help�Ĺ�������ѯ�����Ϣ
? �����κ��㲻֪����ָ����ļ���ʽ�������������������Ҫ�˽�������Ͽ�ʹ��man������info����ѯ
? man page˵������������У�1����һ���ʺſ���ָ�8����ϵͳ����Ա����ָ�5����ϵͳ�����ļ���ʽ
? info page�ɽ�һ��˵���ĵ���ɶ���ڵ㣨node�� ��ʾ�����������Ƴ����ӵĹ��ܣ������׶���
? ���������Ҫ����һЩ�����ķ��񣬻���Ҫ����һ������������ĳ���ʱ����Ͽ쵽/usr/share/doc �����һ����û�и÷����˵���ĵ��
? ��ΪLinux�Ͼ�������˷����ģ����������ļ�ȷʵ�ǱȽ��ٵ�
��ػ�/���¿�����ص�ָ�
? ������ͬ��д��Ӳ���е�ָ� sync ��shutdown/reboot/halt �ȵ�ָ���ڹػ�ǰ����sync���ߵĵ���
? ���õĹػ�ָ� shutdown
? ���¿������ػ��� reboot, halt, poweroff
? ʵ��ʹ�ù����� systemctl �ػ�
�����¡�Linux ���ļ�Ȩ����Ŀ¼����
ls / ll���鿴�ļ�
ls -aldSt [--full-time] [--time=atime | ctime] [dirname/filename]
ll dirname/filename
cp������
cp [-adfilprsu] ��Դ�ļ� Ŀ���ļ���-a��-p�������������ļ�Ȩ�ޣ�-d���������ļ�
mv���ƶ��ļ���Ŀ¼�������
mv [-fiu] source destination��-u����
rm���Ƴ��ļ���Ŀ¼
rm [-fir] �ļ���Ŀ¼
chgrp ���ı��ļ�����Ⱥ��
chgrp [-R] dirname/filename ...
chown ���ı��ļ�ӵ����
chown [-R] �ʺ����� �ļ���Ŀ¼
chown [-R] �ʺ�����:Ⱥ������ �ļ���Ŀ¼
chmod ���ı��ļ���Ȩ��, SUID, SGID, SBIT�ȵȵ�����
chmod [-R] xyz �ļ���Ŀ¼��xyz ��ʶȨ�����ԣ����������֣�������+-rwx
chmod | u g o a | +�����룩 -����ȥ�� =�����ã� | r w x | �ļ���Ŀ¼
/ ��root, ��Ŀ¼�� ���뿪��ϵͳ�й�
/usr ��unix software resource�� ���������װ/ִ���йأ�/usr/local/sbin/������fdisk, fsck, ifconfig, mkfs��
/var ��variable�� ����ϵͳ���й����й� ��/var/log�ڷ�ϵͳ��¼�ļ��ĵط�
/bin������ά��ģʽ�»��ܹ���������ָ���Ҫ�� cat, chmod, chown, date, mv, mkdir, cp, bash��
/sbin���������޸�����ԭϵͳ����Ҫ��ָ�ϵͳ����Ա����ָ�
/boot�����������ļ���Ҳ��Ĭ�ϰڷź��� vmlinuz �ĵط�
/dev���ڷ�����ϵͳ�豸�ļ���Ŀ¼ ���� /dev/null, /dev/zero, /dev/tty, /dev/loop, /dev/sd��
/etc��ϵͳ��Ҫ�������ļ��� �� /etc/modprobe.d/, /etc/passwd, /etc/fstab, /etc/issue ��
/lib���ڿ���ʱ���õ��ĺ����⣬ �Լ���/bin��/sbin�����ָ�����õĺ�����
/media�����Ƴ����豸���������ļ����У�/media/floppy, /media/cdrom��
/mnt����ʱ����ĳЩ������豸
/opt����������Э��������õ�Ŀ¼����ǰ��Linuxϵͳ���Ƿ�����/usr/localĿ¼��
/run��ϵͳ�������������ĸ�����Ϣ����ǰ����/var/runĿ¼��
/srv����������Ҫȡ�õ�����Ŀ¼��WWW������������/srv/www/������Ҫ���⿪�ŵ�Ĭ�Ϸ���/var/lib��
/tmp��һ��ʹ���߻���������ִ�еĳ�����ʱ�����ļ��ĵط�
/home��ϵͳĬ�ϵ�ʹ�������ļ��У�home directory��
/lib<qual>������� /lib ��ͬ�ĸ�ʽ�Ķ����ƺ����⣬����֧�� 64 λ�� /lib64 �������
/root��ϵͳ����Ա��root�� �����ļ���
/lost+found��ʹ�ñ�׼��ext2/ext3/ext4�ļ�ϵͳ��ʽ�Ż������һ��Ŀ¼
/proc��һ���������ļ�ϵͳ��virtual filesystem�� ����Ŀ¼�µ����ݶ������ڴ浱��
/sys��һ��������ļ�ϵͳ����¼������ϵͳӲ����Ϣ����ص���Ϣ
CentOS7���ڲ�����ȫ��Ų����/usr����ȥ��/bin --> /usr/bin��/lib64 --> /usr/lib64��/sbin --> /usr/sbin��/var/lock --> /run/lock��/lib --> /usr/lib��/var/run --> /run
�����¡�Linux �ļ���Ŀ¼����
cd [���·�� | ����·�� | ~ | .. | - | ��] ���任Ŀ¼
pwd [-P]����ʾĿǰ��Ŀ¼��-p��ʾ��ȷ��·�������������ļ������Ŀ¼������
mkdir [-mp]������һ���µ�Ŀ¼��-m����Ŀ¼��Ȩ�ޣ�����Ҫ��umask
rmdir [-p]��ɾ��һ���յ�Ŀ¼
su - # �л���ݳ�Ϊ root
exit # �뿪�����ԭ�����˺�
echo $PATH���鿴����������PATH="${PATH}:/root" ����µĻ�������
basename /etc/sysconfig/network����ȡ�ļ���network
dirname /etc/sysconfig/network����ȡĿ¼��/etc/sysconfig
cat [-AbEnTv]���ɵ�һ�п�ʼ��ʾ�ļ����ݣ�-n��ʾ��ʾ�к�
tac�������һ�п�ʼ��ʾ
nl [-bnw] �ļ�����ʾ��ʱ��˳������к�
more��һҳһҳ����ʾ�ļ����ݣ��հ׼��·�һҳ��Enter����һ�У�:f��ʾ�ļ�����������b��ǰ��ҳ���ļ�
less��һҳһҳ�������հ׼���һҳ��[pageup]��һҳ��/�ִ����²��ң�?�ִ����ϲ��ң�nN��һ��ǰһ��
head [-n number] �ļ���ֻ��ͷ����
tail [-n number] �ļ���ֻ��β�ͼ��У�-f �����鿴
od [-t TYPE] �ļ����Զ����Ƶķ�ʽ��ȡ�ļ�����
touch [-acdmt] �ļ���a���޶�atime��c���޸��ļ���ʱ�䣬m���޸�mtime
umask [-S | 022]����Ĭ��ֵ��Ҫ������Ȩ�ޣ�����umaskΪ022
�����ļ�ʱ����-rw-rw-rw-�� - ��-----w--w-�� ==> -rw-r--r--
����Ŀ¼ʱ����drwxrwxrwx�� - ��d----w--w-�� ==> drwxr-xr-x
chattr [+-=][ASacdistu] �ļ���Ŀ¼���ƣ������ļ���������
lsattr [-adR] �ļ���Ŀ¼����ʾ�ļ���������
chmod 4755 filename��4 Ϊ SUID�� u+s��2 Ϊ SGID�� g+s��1 Ϊ SBIT�� o+t
file���۲��ļ�����
which [-a] command��Ѱ�ҡ���ִ���ļ���
whereis [-bmsu] �ļ���Ŀ¼����Ѱ���ļ��ļ�����lĿ¼��b�������ļ���m�ĵ�manual·���µ�
locate [-ir] keyword������ /var/lib/mlocate ���ң� i���Դ�Сд��r����
updatedb������ /etc/updatedb.conf ������ȥ��ѰϵͳӲ���ڵ��ļ�����������/var/lib/mlocate ���ļ�
find [PATH] [option] [action]��
��ʱ�����ѡ�-mtime +n|-n|n�� -newer file 
��ʹ���߻�Ⱥ�������йأ�-uid n��-gid n��-user name��-group name��-nouser��-nogroup
���ļ�Ȩ�޼������йأ�-name filename��-size [+-]SIZE��-type TYPE��-perm [-|/|��]mode��modeȨ��755
����ɽ��еĶ�����-exec command��-print
�����¡�Linux �������ļ�ϵͳ����
Linux������֧���ļ�ϵͳ�У�
��ͳ�ļ�ϵͳ��ext2 / minix / MS-DOS / FAT ���� vfat ģ�飩 / iso9660 �����̣� ��
��־ʽ�ļ�ϵͳ�� ext3 /ext4 / ReiserFS / Windows' NTFS / IBM's JFS / SGI's XFS /ZFS
�����ļ�ϵͳ�� NFS / SMBFS
�� CentOS 7.x ��ʼ�� �ļ�ϵͳ�� Ext4 ����� xfs ��һ�����ʺϴ���������������ļ����ܽϼѵ��ļ�ϵͳ��
df [-ahikHTm] [Ŀ¼���ļ���]���г��ļ�ϵͳ���������ʹ����
du [-ahskm] �ļ���Ŀ¼���ƣ������ļ�ϵͳ�Ĵ���ʹ����
ln [-sf] ��Դ�ļ� Ŀ���ļ���s��ݷ�ʽ
����һ����̲������裺
1. �Դ��̽��з������Դ������õ� partition
2. �Ը� partition ���и�ʽ�� ��format�� ���Դ���ϵͳ���õ� filesystem
3. ����Ҫ��ϸһ�㣬��ɶԸոմ����õ� filesystem ���м���
4. �� Linux ϵͳ�ϣ���Ҫ�������ص� ���༴��Ŀ¼�� ����������������
lsblk [-dfimpt] [device]���г�ϵͳ�ϵ����д����б�
gdisk �豸���ƣ����̷��������� GPT ��ʽ
partprobe [-s]������ Linux ���ĵķ�������Ϣ
gdisk �豸���ƣ�ɾ��һ������
fdisk �豸���ƣ�MBR ����
mkswap /dev/vda6���ȴ���һ��/dev/vda6������������swap��ʽ
blkid /dev/vda6��ȷ����ʽ���ɹ�
swapon /dev/vda6������
swapon -s���г�Ŀǰʹ�õ�swap�豸
vi /etc/fstab��д�������ļ�
mkfs.xfs [-b bsize] [-d parms] [-i parms] [-l parms] [-L label] [-f] [-r parms] �豸���ƣ����̸�ʽ��
mkfs.ext4 [-b size] [-L label] �豸���ƣ�EXT4 �ļ�ϵͳ mkfs.ext4 ���̸�ʽ��
xfs_repair [-fnd] �豸���ƣ��ļ�ϵͳ����
fsck.ext4 [-pf] [-b superblock] �豸���ƣ�У�� EXT4 �ļ�ϵͳ
mount [-t �ļ�ϵͳ] �豸�ļ��� ���ص㣺����
mount [-t �ļ�ϵͳ] UUID='' ���ص㣺�ļ�ϵͳ xfs,ext3, ext4,reiserfs,vfat, iso9660�����̸�ʽ�� ,nfs,cifs,smbfs
mount [-t �ļ�ϵͳ] LABEL='' ���ص㣺����
mount [-l]���鿴����
mount -a�����������ļ� [/etc/fstab](../Text/index.html#fstab) �����ݽ�����δ���صĴ��̶���������
blkid /dev/vda4���鿴UUID
mkdir -p /data/xfs���������ص�
mount UUID="e0a6af55-26e7-4cb7-a515-826a8bd29e90" /data/xfs������
mount -o codepage=950,iocharset=utf8 UUID="35BC-6D6B" /data/usb��-o����ָ�����ص���ϵ
umount [-fn] �豸�ļ�������ص㣺���豸�ļ�ж��
mknod �豸�ļ��� [bcp] [Major] [Minor]��
xfs_admin [-lu] [-L label] [-U uuid] �豸�ļ������޸� XFS �ļ�ϵͳ�� UUID �� Label name
tune2fs [-l] [-L Label] [-U uuid] �豸�ļ������޸� ext4 �� label name �� UUID
�������� /etc/fstab �� /etc/mtab��[�豸/UUID��] [���ص�] [�ļ�ϵͳ] [�ļ�ϵͳ����] [dump] [fsck]
parted [�豸] [ָ�� [����]]������ GNU �� parted ���з���
�ڰ��¡��ļ����ļ�ϵͳ��ѹ��,����뱸��
ѹ���ļ�����չ������ǣ�.tar, .tar.gz, .tgz, .gz, .Z, .bz2, .xz
gzip [-cdtv#] �ļ�����gzip����ѹ����c�����Ϣ��d��ѹ����tУ�飬v�ȵ���Ϣ��#ѹ���ȼ�
zcat �ļ���.gz���鿴ԭ�ļ�
bzip2 [-cdkzv#] �ļ�����bzip2����ѹ��
bzcat �ļ���.bz2
xz [-dtlkc#] �ļ�����xz����ѹ��
xcat �ļ���.xz
tar [-zjJ] [cv] [-f �����������ļ���] filename...�����
tar [-zjJ] [tv] [-f ���е�tar�ļ���]���鿴
tar [-zjJ] [xv] [-f ���е�tar�ļ���]����ѹ
XFS �ļ�ϵͳ���� xfsdump������ʹ�� root ��Ȩ�޲��ܲ��� ��
xfsdump [-L S_label] [-M M_label] [-l #] [-f �����ļ�] ���������ݣ�I�г�������Ϣ״̬
XFS �ļ�ϵͳ��ԭ xfsrestore
xfsrestore [-f �����ļ�] [-L S_label] [-s] ����ԭĿ¼
mkisofs�����������ļ���
mkisofs [-o �����ļ�] [-Jrv] [-V vol] [-m file] �������ļ�... -graft-point isodir=systemdir ...
cdrecord��������¼���ߣ��°�� CentOS 7 ʹ�õ��� wodim 
wodim --devices dev=/dev/sr0����ѯ��¼��BUSλ��
wodim -v dev=/dev/sr0 blank=fast��Ĩ���ظ���дƬ
wodim -v dev=/dev/sr0 -format����ʽ��DVD+RW
wodim -v dev=/dev/sr0 [����ѡ���] file.iso����¼
wodim -v dev=/dev/sr0 speed=4 -dummy -eject /tmp/system.img
dd ����һ���ļ����ɶ�ȡ�����豸�����ݣ��ɽ��豸���ݳ�һ���ļ�
dd if="input_file" of="output_file" bs="block_size" count="number"
dd if=/etc/passwd of=/tmp/passwd.back
cpio ���Ա����κζ�����
find / | cpio -ocvB > /dev/st0
cpio -idvc < /dev/st0
�ھ��¡�vim ����༭��
��k����j����h����l
x���ɾ��һ���ַ���X��ǰɾ��һ���ַ���nx����nΪ���֣�ddɾ������
nyy���ƣ�p�����һ��ճ����P�����һ��ճ��
u��ԭǰһ��������[Ctrl]+r������һ��������. �ظ�ǰһ������
:n1,n2 w [filename]����n1��n2�����ݴ�Ϊfilename�ļ�
:! command��ִ������
LANG=zh_TW.big5�����ñ��룬�����ļ�/etc/locale.conf
export LC_ALL=zh_TW.big5
��ʮ�¡���ʶ��ѧϰBASH
��ѯָ���Ƿ�Ϊ Bash shell ��������� type [-tpa] name��t��ʾ���壬aȫ��·��
������ȡ�������ã�echo ${myname}
˫�����ڵ������ַ��� $ �ȣ����Ա���ԭ��������
�������ڵ������ַ����Ϊһ���ַ� �����ı���
�������ù���unset myname
cd /lib/modules/$��uname -r�� /kernel
�۲컷�������볣����������˵����env
���0~32767�������declare -i number=$RANDOM*10/32768 ; echo $number
Ӱ����ʾ�������ϵ���� ��locale -a�������ļ�/etc/locale.conf
�������̶�ȡ�����������棺 read, array, declare
read [-pt] variable��p����ʾ����t������
declare [-aixr] variable��a����(array)���ͣ�i������xͬexport��rֻ��readonly
���ļ�ϵͳ����������ƹ�ϵ�� 
ulimit [-SHacdfltu] [���]
�µı�������Ҫ����ȡ���ɱ�����new_var=${old_var-content}
����������ã� alias rm='rm -i' , unalias rm
��ʷ���history [n]��n���֣� | [-c]������� | [-raw] histfiles����ȡ����д�룩
ִ��history��!66��ִ��66��ָ�!!��ִ����һ��ָ��
ָ�����е�˳��
1. �����/����·��ִ��ָ����硰 /bin/ls ���� ./ls ��
2. �� alias �ҵ���ָ����ִ��
3. �� bash ���õ� ��builtin�� ָ����ִ��
4. ͨ�� $PATH ���������˳����Ѱ���ĵ�һ��ָ����ִ��
bash �Ľ�վ�뻶ӭѶϢ�� /etc/issue, /etc/motd
login shell ��ʵֻ���ȡ�����������ļ���/etc/profile �� ~/.bash_profile �� ~/.bash_login �� ~/.profile
login shell �Ķ�ȡ���̣�
/etc/profile(/etc/profile.d/*.sh->/etc/locale.conf)->~/.bash_profile(~/.bashrc->/etc/bashrc)->��ʼ����bash
�ն˻��Ļ������ã� stty [-a] , set [-uvCHhmBx]
�������ص���file -> (<, <<) -> Command -> (>, >> ���� 2>, 2>>) -> screen file/device
����������ݶ�������Ļ����ʾ��ȷ�����ݣ�find /home -name .bashrc 2> /dev/null
cut -d'�ָ��ַ�' -f fields���������ض��ָ��ַ���f��ʾȡ���ڼ���
echo ${PATH} | cut -d ':' -f 3,5
cut -c �ַ����䣺�������������ѶϢ
grep [-acinv] [--color=auto] '��Ѱ�ִ�' filename��ȡ��ĳ����
grep --color=auto 'MANPATH' /etc/man_db.conf
sort [-fbMnrtuk] [file or stdin]ѡ�������������t�ָ�����k��һ��������n��������r����
uniq [-ic]�����ظ������ݽ��г�һ����ʾ��c����
wc [-lwm]��l������w����(Ӣ�ĵ���)��m�ַ�
last���г���½�����û�
tee [-a] file�����ۼ� ��append�� �ķ�ʽ�������ݼ��� file ����
�ַ�ת����� tr, col, join, paste, expand
������� split [-bl] file PREFIX��b���ļ���С��l���������з���
cd /tmp; split -b 300k /etc/services services
���������� xargs [-0epn] command
��ʮһ�¡�������ʽ���ļ���ʽ������
[:alnum:]��0-9,A-Z,a-z��[:alpha:]��A-Z,a-z��[:blank:]�հ׼��� [Tab] ������[:digit:]���֣�[:graph:]�հ׷�
[:lower:]Сд�ַ���[:upper:]��д�ַ���[:punct:]������
sed [-nefr] [����]����������[n1[,n2]]function��a������cȡ����dɾ����i���룬p��ӡ��sȡ��
nl /etc/passwd | sed '2,5d'������ 2~5 ��ɾ��
nl /etc/passwd | sed '2a drink tea'�� �ٵڶ��к���ϡ�drink tea?������
nl /etc/passwd | sed '2,5c No 2-5 number'������2-5�е�����ȡ����Ϊ��No 2-5 number��
nl /etc/passwd | sed -n '5,7p'���г��� 5-7 ��
sed 's/Ҫ��ȡ�����ִ�/�µ��ִ�/g' ���滻
printf '��ӡ��ʽ' ʵ�����ݣ���ʽ����ӡ
awk '��������1{����1} ��������2{����2} ...' filename�����ݴ�����
last -n 5 | awk '{print $1 "\t" $3}'��ǰ���еĵ�1�к͵�3��
last -n 5 | awk '{print $1 "\t lines: " NR "\t columns: " NF}'��NR������NF�ֶ���
�ļ��ȶԹ��ߣ�
diff [-bBi] from-file to-file��b���Զ���հײ��죬B���Կհ��в��죬i���Դ�Сд���鿴�汾
cmp [-l] file1 file2��l�г���ͬ���ֽڴ�
patch -pN < patch_file�����ɰ����ݸ��µ��°棬pȡ������Ŀ¼���� diff ���� patch �Ĳ�����Դ�ļ�
patch -R -pN < patch_file����ԭ�����µ��ļ���ԭ�ɾɵİ汾
�ļ���ӡ׼���� pr /etc/man_db.conf
alias myip="ifconfig eth0 | grep 'inet ' | sed 's/^.*inet //g' | sed 's/ *netmask.*$//g'"����ȡIP��ַ
MYIP=$(myip)
������Чд����� ~/.bashrc
��ʮ���¡�ѧϰ Shell Scripts
�� shell script ��׫д�л���Ҫ�õ������ע�����
1. ָ���ִ���Ǵ��϶��¡�������ҵķ�����ִ��
2. ָ����´ָ�ѡ���������Ķ���հ׶��ᱻ���Ե�
3. �հ���Ҳ�������Ե������� [tab] �������ƿ��Ŀհ�ͬ����Ϊ�հ׼�
4. �����ȡ��һ�� Enter ���� ��CR�� ���ͳ��Կ�ʼִ�и��� ����ô��� ����
5. �������һ�е�����̫�࣬�����ʹ�á� [Enter] ������������һ��
6. �� # ������Ϊע�⣡�κμ��� # ��������ݽ�ȫ������Ϊע�����ֶ������ԣ�
���ִ�У�
? ֱ��ָ���´ shell.sh �ļ�����Ҫ�߱��ɶ����ִ�� ��rx�� ��Ȩ�ޣ�����·�������·����PATH
? �� bash ������ִ�У�ͨ���� bash shell.sh ���� sh shell.sh ����ִ��
ע�⣺1. �����빦�ܣ� 2. �汾��Ϣ�� 3.���������緽ʽ�� 4. �������ڣ�5. ��ʷ��¼ 
���� test ָ��Ĳ��Թ��ܣ�test -e /dmtsai �� �����жϷ��� [ ]
����ѡ�e�Ƿ���ڣ�f�Ƿ����ļ���d�Ƿ���Ŀ¼��b�Ƿ��ǿ��豸��L�Ƿ�������
    r�Ƿ�ɶ���w�Ƿ��д��x�Ƿ��ִ�У�u��g��k�Ƿ���SUID��SGID��Sticky��s�ǿհ��ļ�
    nt�Ƚ��£�ot�ȽϾɣ�efͬһ�ļ�
eq��ֵ��ȣ�ne���ȣ�gt���ڣ�ltС�ڣ�ge���ڵ��ڣ�leС�ڵ���
z���ִ�Ϊtrue��n���ִ�Ϊfalse��==��ȣ�!=����
a�룬o��!��
�����ж�ʽ��
���� if .... then .... fi
���� case ..... esac �ж�
���� function ����
ѭ����
while do done, until do done ������ѭ����
for...do...done ���̶�ѭ����
netstat -tuln�����������ķ���
sh -x script.sh �����г���� debug
��ʮ���¡�Linux �ʺŹ����� ACL Ȩ������
����Ⱥ�飺 ��Ч���ʼȺ�顢groups��newgrp
UID ֻ�� 0 ���Ϊ 0 ���֣���Ϊ 0 ��Ϊһ���ʺš�һ���ʺ��ַ�Ϊϵͳ�ʺ� ��1~999�����ɵ�½���ʺ� ������ 1000��
�˺Ź���
�������Ƴ�ʹ���ߣ� useradd, ��������ļ�, passwd, usermod, userdel
useradd [-u UID] [-g ��ʼȺ��] [-G ��ҪȺ��] [-mM] [-c ˵����] [-d ���ļ��о���·��] [-s shell] ʹ�����ʺ�
passwd [--stdin] [�ʺ�����]��echo "abc543CC" | passwd --stdin vbird2
passwd [-l] [-u] [--stdin] [-S] [-n ����] [-x ����] [-w ����] [-i ����] �ʺţ�l������u����
chage [-ldEImMW] �ʺ�������ʾ��ϸ�����룬l��ϸ��Ϣ
usermod [-cdegGlsuLU] username��c�˺�˵����eʧЧʱ��
userdel [-r] username��r�ͼ�Ŀ¼һ��ɾ��
id [username]
finger [-s] username���г�ʹ������Ϣ���������Ĭ��û�а�װ
chfn [-foph] [�ʺ���]������finger������ʹ������Ϣ 
chsh [-ls]��l�г�����shell��s����shell
groupadd [-g gid] [-r] Ⱥ�����ƣ�r����ϵ��Ⱥ��
groupmod [-g gid] [-n new_group_name] Ⱥ����
groupdel [groupname]
gpasswd groupname
gpasswd [-A user1,...] [-M user3,...] groupname��A�ƽ�����Ȩ��M���˺ż���Ⱥ��
gpasswd [-rR] groupname��r�����Ƴ���R������ʧЧ
gpasswd [-ad] user groupname��a�����û���d�Ƴ��û�
�˺�����ļ���
ʹ�����ʺ����������������ļ���/etc/passwd, /etc/shadow
ʹ����Ⱥ����ط�����ļ���/etc/group, /etc/gshadow
ʹ���ߵ����ļ��У�/home/�ʺ�����
useradd �������ʺţ���ο��ļ���/etc/default/useradd��/etc/login.defs��/etc/skel/*
PAM ģ�����������룬���븴�Ӷȣ�/etc/pam.d/passwd
����ִ�� passwd ����֧������� PAM �������ǣ�
1. ʹ���߿�ʼִ�� /usr/bin/passwd ��֧���򣬲���������
2. passwd ���� PAM ģ�������֤
3. PAM ģ��ᵽ /etc/pam.d/ ��Ѱ����� ��passwd�� ͬ���������ļ�
4. ���� /etc/pam.d/passwd �ڵ����ã�������ص� PAM ģ���𲽽�����֤����
5. ����֤��� ���ɹ���ʧ���Լ�����ѶϢ�� �ش��� passwd ��֧����
6. passwd ��֧�������� PAM �ش��Ľ��������һ������ �������������������ͨ����֤����
ʹ���ⲿ�����֤ϵͳ��authconfig-tui
ACL��Access Control List�� ������Ե�һʹ���ߣ���һ�ļ���Ŀ¼������ r,w,x ��Ȩ�޹淶
dmesg | grep -i acl���鿴�Ƿ�֧�� ACL
setfacl [-bkRd] [{-m|-x} acl����] Ŀ���ļ�����d����Ŀ¼Ĭ��acl��b�Ƴ�����acl��k�Ƴ�Ĭ��acl
setfacl -m u:dmtsai:rx acl_test1��u:[ʹ�����ʺ��б�]:[rwx] ����ض�ʹ���ߵķ�ʽ
setfacl -m g:mygroup1:rx acl_test1��g:[Ⱥ���б�]:[rwx] ����ض�Ⱥ��ķ�ʽ
setfacl -m m:r acl_test1�� m:[rwx] �����ЧȨ�� mask �����÷�ʽ
setfacl -m d:u:myuser1:rx /srv/projecta�� d:[ug]:ʹ�����б�:[rwx] ���Ĭ��Ȩ�޵����÷�ʽ���̳�
setfacl -x u:myuser1 /srv/projecta��ȡ��ĳ���ʺŵ� ACL ʱ������Ҫ����Ȩ����Ŀ
setfacl -x d:u:myuser1 /srv/projecta
setfacl -m u:pro3:- /srv/projecta���� pro3 ����û��޷�ʹ�ø�Ŀ¼
getfacl filename���鿴�Ƿ���acl
su -���л���root
su [-lm] [-c ָ��] [username]��l��login-shell�ķ�ʽ��mʹ��Ŀǰ�Ļ������ã�c������һ��ָ��
su - -c "head -n 3 /etc/shadow"
sudo ָ�ִ��root��ָ� 
sudo [-b] [-u ��ʹ�����ʺ�]
����Ҫʹ�� sudo ִ������ root ��Ȩ��ָ��� root ��Ҫ��ʹ�� visudo ȥ�޸� /etc/sudoers 
��ѯʹ���ߣ� w, who, last, lastlog
ʹ���߶�̸�� write, mesg, wall
ʹ�����ʼ����䣺 mail
һЩ�ʺ���صļ�鹤�ߣ�pwck ��pwconv
���������ʺŷ��������� passwd --stdin ѡ�
��ʮ���¡�������Quota�� ������ļ�ϵͳ����
Quota �ɹ�ƽ�ķ���ϵͳ����Ĵ���������ʹ���ߣ��������Դ�����Ǵ���������block�� ��ɴ����ļ�������inode��
��������ȫ���ǡ� Redundant Arrays of Inexpensive Disks, RAID ����Ӣ���е���˼�ǣ��ݴ�ʽ���۴�������
RAID-0 ������ģʽ, stripe�� ��������ѣ����ݲ���ȫ
RAID-1 ��ӳ��ģʽ, mirror�� ���������ݣ����ܲ���
RAID 1+0��RAID 0+1�� Ŀǰ�����豸�������Ƽ� RAID 1+0
RAID 5�����������ݱ��ݵľ��⿼�ǣ�������Ҫ�������ϵĴ��̣�д��ʱÿ�Ŵ��̼���һ��ͬλ�����Parity 
RAID 6��ʹ�����Ŵ��̵�������Ϊ parity �Ĵ��棬 RAID 5 ����֧��һ�Ŵ��̵����
Spare Disk��Ԥ�����̵Ĺ���
����������е����ã�
mdadm --detail /dev/md0
mdadm --create /dev/md[0-9] --auto=yes --level=[015] --chunk=NK \
> --raid-devices=N --spare-devices=N /dev/sdx /dev/hdx...
mdadm --create /dev/md0 --auto=yes --level=5 --chunk=256K \
> --raid-devices=4 --spare-devices=1 /dev/vda{5,6,7,8,9}
���� RAID ����ľ�Ԯģʽ��
mdadm --manage /dev/md[0-9] [--add �豸] [--remove �豸] [--fail �豸]
mdadm --manage /dev/md0 --remove /dev/vda7
mdadm --manage /dev/md0 --add /dev/vda7
�����Զ����� RAID ���Զ����أ�
mdadm --detail /dev/md0 | grep -i uuid����ȡUUID
vim /etc/mdadm.conf���޸������ļ�
ARRAY /dev/md0 UUID=2256da5f:4870775e:cf2fe320:4dfabbc6
blkid /dev/md0����ʼ���ÿ����Զ����ز�����
vim /etc/fstab
UUID=494cb3e1-5659-4efc-873d-d0758baec523 /srv/raid xfs defaults 0 0
umount /dev/md0; mount -a
df -Th /srv/raid
�ر���� RAID��
umount /srv/raid
vim /etc/fstab
UUID=494cb3e1-5659-4efc-873d-d0758baec523 /srv/raid xfs defaults 0 0
dd if=/dev/zero of=/dev/md0 bs=1M count=50
mdadm --stop /dev/md0
dd if=/dev/zero of=/dev/vda5 bs=1M count=10
cat /proc/mdstat
vim /etc/mdadm.conf
#ARRAY /dev/md0 UUID=2256da5f:4870775e:cf2fe320:4dfabbc6
LVM��Logical Volume Manager�� �߼��������Ա
Physical Volume, PV, ʵ�����
Volume Group, VG, ����Ⱥ��
Physical Extent, PE, ʵ�巶Χ����
Logical Volume, LV, �߼�����
��ʮ���¡������Թ������ȣ�crontab��
Linux �������ȵ����ࣺ
at��at �Ǹ����Դ����ִ��һ�ξͽ������ȵ�ָ��
crontab��crontab ���ָ�������õĹ�������ѭ����һֱ������ȥ
��ִ��һ�εĹ������ȣ�
systemctl restart atd # �������� atd �������
systemctl enable atd # ��������񿪻����Զ�����
systemctl status atd # ����һ�� atd Ŀǰ��״̬
at �Ĺ��������
1. ����Ѱ /etc/at.allow ����ļ���д������ļ��е�ʹ���߲���ʹ�� at ��û��������ļ��е�ʹ��������ʹ�� at ����ʹû��д�� at.deny ���У� 
2. ��� /etc/at.allow �����ڣ���Ѱ�� /etc/at.deny ����ļ�����д����� at.deny ��ʹ��������ʹ�� at ����û������� at.deny �ļ��е�ʹ���ߣ��Ϳ���ʹ�� at ��
3. ��������ļ��������ڣ���ôֻ�� root ����ʹ�� at ���ָ��
at [-mldv] TIME��at now + 5 minutes
at -c �������룬at -c 2
atq
atrm ��jobnumber��
batch�� ϵͳ�п�ʱ�Ž��б�������
ѭ��ִ�е������Թ������ȣ�
   crontab [-u username] [-l|-e|-r]��uֻ��root���ܽ���������񣬰�����ʹ���ߴ���/�Ƴ� crontab ��������
ϵͳ�������ļ��� /etc/crontab, /etc/cron.d/*
cron ��ÿ����ȥ��ȡһ��/etc/crontab �� /var/spool/cron �������������
�ɻ���ͣ���ڼ�Ĺ�������anacron �� /etc/anacrontab
anacron �������ļ�Ӧ�÷����� /etc/cron.hourly 
anacron [-sfn] [job]..
anacron -u [job]..
��ʮ���¡���������� SELinux ��̽
�������� ��job control��
tar -zpcf /tmp/etc.tar.gz /etc &�� ֱ�ӽ�ָ��������С�ִ�С��� &
����Ŀǰ���Ĺ������������С���ͣ����[ctrl]-z
�۲�Ŀǰ�ı�������״̬�� jobs [-lrs]
�����������õ�ǰ��������fg %jobnumber
�ù����ڱ����µ�״̬��������У� bg��jobs ; bg %3 ; jobs
���������еĹ����� kill -signal %jobnumber��kill -l
ps aux <==�۲�ϵͳ���еĳ�������
ps -lA <==Ҳ���ܹ��۲�����ϵͳ������
ps axjf <==��ͬ���ֳ�����״̬
���۲��Լ��� bash ��س��� ps -l
��ʬ ��zombie�� ������Ϊ�ó���Ӧ���Ѿ�ִ����ϣ����������Ӧ��Ҫ��ֹ�ˣ� ���Ǹó���ĸ�����ȴ�޷������Ľ��ó����������������Ǹ�����һֱ�����ڴ浱��
��̬�۲����ı仯��
top [-d ����] | top [-bnp]
top -d 2��ÿ�����Ӹ���һ�� top ���۲�������Ϣ
top -b -n 2 > /tmp/top.txt���� top ����Ϣ���� 2 �Σ�Ȼ�󽫽������� /tmp/top.txt
top -d 2 -p PID���Լ���bash PID����$$ȡ��
pstree [-A|U] [-up]
pstree -A���г�Ŀǰϵͳ�������еĳ������������
pstree -Aup��ͬʱ��� PID �� users
killall [-iIe] [command name]
killall -1 rsyslogd������ rsyslogd ���ָ�������� PID һ�� SIGHUP ��Ѷ��
killall -9 httpd��ǿ����ֹ������ httpd �����ĳ��� ����ʵ��û�д˳�����ϵͳ�ڣ�
killall -i -9 bash������ѯ��ÿ�� bash �����Ƿ���Ҫ����ֹ����
ps aux | grep 'rsyslogd' | grep -v 'grep'| awk '{print $2}'���ҳ� rsyslogd �������� PID 
kill -SIGHUP $��ps aux | grep 'rsyslogd' | grep -v 'grep'| awk '{print $2}'������������ֹ�ĳ���
nice [-n ����] command��n��Χ-20 ~ 19
nice -n -5 vim &���� root ��һ�� nice ֵΪ -5 ������ִ�� vim �����۲�ó���
renice [number] PID���Ѵ��ڳ���� nice ���µ���
ϵͳ��Դ�Ĺ۲죺
free [-b|-k|-m|-g|-h] [-t] [-s N -c N]���۲��ڴ�ʹ�����
free -m����ʾĿǰϵͳ���ڴ�����
uname [-asrmpi]������ϵͳ����������Ϣ
uname -a�����ϵͳ�Ļ�����Ϣ
uptime���۲�ϵͳ����ʱ���빤������
netstat -[atunlp]��׷��������۵�
netstat -tulnp�� �ҳ�Ŀǰϵͳ�����ڼ������������߼��� PID
dmesg | more���������Ĳ�����ѶϢ
vmstat�����ϵͳ��Դ�仯
vmstat 1 3��ͳ��Ŀǰ���� CPU ״̬��ÿ��һ�Σ���������
vmstat -d��ϵͳ�������еĴ��̵Ķ�д״̬
fuser [-umv] [-k [i] [-signal]] file/dir�� ��ѯ�Ѵ��ļ�����ִ�г����֮�ļ�
fuser -uv . ���ҳ�Ŀǰ����Ŀ¼��ʹ�� PID/�����ʺ�/Ȩ��
fuser -uv /proc�� �ҵ�����ʹ�õ� /proc ����ļ�ϵͳ�ĳ���
lsof [-aUu] [+d]���г����������򿪵��ļ��ļ���
lsof -u root -a -U�� ���г����� root �����г���򿪵� socket �ļ�
lsof +d /dev�� �г�Ŀǰϵͳ�������еı��������ܱ��豸
pidof [-sx] program_name�� �ҳ�ĳ֧����ִ�еĳ���� PID
pidof systemd rsyslogd���г�Ŀǰϵͳ���� systemd �Լ� rsyslogd ����������� PID
SELinux�ǡ� Security Enhanced Linux ������д����ȫǿ���� Linux 
��ʮ���¡���ʶϵͳ���� ��daemons��
������ init �Ĺ�����ƣ�
? ������������ر���۲�ȷ�ʽ��
? ������/etc/init.d/daemon start
? �رգ�/etc/init.d/daemon stop
? ����������/etc/init.d/daemon restart
? ״̬�۲죺/etc/init.d/daemon status
? ���������ķ���
? ��������ģʽ ��stand alone��
? �ܹܳ��� ��super daemon������xinetd��inetd�������ܹܳ����ṩ socket��Ӧ�� port ��Ӧ�Ĺ���  
? ִ�еȼ��ķ���
? ������ Linux�ṩ 7 ��ִ�еȼ��� 1�� ����ά��ģʽ��3�� ���ı�ģʽ��5�� ���ּ�ͼ�ν���
? �ƶ�ִ�еȼ�Ĭ��Ҫ�����ķ���
? Ĭ��Ҫ������ chkconfig daemon on
? Ĭ�ϲ������� chkconfig daemon off
? �۲�Ĭ��Ϊ������ chkconfig --list daemon
CentOS 7.x �Ժ󣬷��� init �����ű������� systemd �����������������
/usr/lib/systemd/system/��ÿ����������Ҫ�������ű����ã��е�������ǰ�� /etc/init.d������ļ�
/run/systemd/system/��ϵͳִ�й������������ķ���ű������ȼ�������ĸ�
/etc/systemd/system/������Ա��������ϵͳ��������������ִ�нű������ȼ�������ĸ�
ͨ�� systemctl �������systemctl [command] [unit]
systemctl status atd.service�� ����Ŀǰ atd ��������״̬
systemctl stop atd.service�������ر���� atd ����
systemctl stop chronyd.service�����̽����رգ�ͬʱ������������
systemctl disable chronyd.service
systemctl [command] [--type=TYPE] [--all]���۲�ϵͳ�����еķ���
systemctl list-unit-files�� �г������Ѿ���װ�� unit ����Щ
systemctl list-units --type=service --all�� ֻʣ�� *.service ����Ŀ�Ż����
systemctl get-default���ȹ۲��Ƿ���Ϊͼ��ģʽ���ٽ�Ĭ��ģʽתΪ���ֽ���
systemctl set-default multi-user.target
systemctl isolate multi-user.target���ڲ����¿���������£���Ŀǰ�Ĳ���������Ϊ���ı�ģʽ���ص�ͼ�ν���
systemctl poweroff ϵͳ�ػ�
systemctl reboot ���¿���
systemctl suspend ������ͣģʽ
systemctl hibernate ��������ģʽ
systemctl rescue ǿ�ƽ����Ԯģʽ
systemctl emergency ǿ�ƽ��������Ԯģʽ
systemctl list-dependencies [unit] [--reverse]������������֮���������
systemctl stop getty@tty5.service���رղ�С�������� tty5, tty6 ���������� getty.target 
systemctl stop getty@tty6.service
systemctl restart systemd-logind.service
��ʮ���¡���ʶ�������¼�ļ�
Linux �����ĵ�¼�ļ��ļ�����
? /var/log/boot.log�� ������ʱ��ϵͳ���Ļ�ȥ���������Ӳ��
? /var/log/cron���鿴 crontab ����
? /var/log/dmesg�� ��¼ϵͳ�ڿ�����ʱ������������������ĸ�����Ϣ
? /var/log/lastlog�� ���Լ�¼ϵͳ�������е��ʺ����һ�ε�½ϵͳʱ�������Ϣ
? /var/log/maillog �� /var/log/mail/*�� ��¼�ʼ���������Ϣ
? /var/log/messages��ϵͳ�����Ĵ���ѶϢ
? /var/log/secure�� �����ϣ�ֻҪǣ�浽����Ҫ�����ʺ����롱���������½ʱ�ͻᱻ��¼
? /var/log/wtmp, /var/log/faillog�� �������ļ����Լ�¼��ȷ������½ϵͳ�ߵ��ʺ���Ϣ
? /var/log/httpd/, /var/log/samba/�� ��ͬ����������ʹ�������Լ��ĵ�¼�ļ���¼
��Ե�¼�ļ�����Ĺ��ܣ�������Ҫ�ķ���������У�
? systemd-journald.service������Ҫ��ѶϢ�����ߣ��� systemd �ṩ��
? rsyslog.service����Ҫ��¼ϵͳ������ȷ����ѶϢ�������ļ�/etc/rsyslog.conf 
? logrotate����Ҫ�ڽ��е�¼�ļ������湦�ܣ������ļ�/etc/logrotate.conf��/etc/logrotate.d/   
logwatch Ϊ CentOS 7 Ĭ���ṩ��һ����¼�ļ��������
��ʮ���¡��������̡�ģ������� Loader
ϵͳ�����ľ������Ի�������������̵ģ�
1. ���� BIOS ��Ӳ����Ϣ��������Ҳ��ԣ�����������ȡ�õ�һ���ɿ������豸
2. ��ȡ��ִ�е�һ�������豸�� MBR �� boot Loader ���༴�� grub2, spfdisk �ȳ���
3. ���� boot loader ���������� Kernel ��Kernel �Ὺʼ���Ӳ����������������
4. ��Ӳ�������ɹ���Kernel ���������� systemd ���򣬲��� default.target ���̿���
? systemd ִ�� sysinit.target ��ʼ��ϵͳ�� basic.target ׼������ϵͳ
? systemd ���� multi-user.target �µı��������������
? systemd ִ�� multi-user.target �µ� /etc/rc.d/rc.local �ļ�
? systemd ִ�� multi-user.target �µ� getty.target ����½����
? systemd ִ�� graphical ��Ҫ�ķ���
SystemV��systemd��
? init 0 �ȼ��� systemctl poweroff
? init 1 �ȼ��� systemctl rescue
? init [234] �ȼ��� systemctl isolate multi-user.target
? init 5 �ȼ��� systemctl isolate graphical.target
? init 6 �ȼ��� systemctl reboot
CentOS 7.x �� systemd �������̣�
1. local-fs.target + swap.target�������� target ��Ҫ�ڹ��ر��� /etc/fstab �����ļ�ϵͳ���ڴ潻���ռ�
2. sysinit.target����� target ��Ҫ�����Ӳ������������Ҫ�ĺ���ģ��ȶ���
3. basic.target��������Ҫ���ܱ�Ӳ���������������ǽ�������
4. multi-user.target ���������һ��ϵͳ�������������룬/usr/lib/systemd/system��/etc/systemd/system 
5. ͼ�ν�����ط����� gdm.service ���������������
�ڶ�ʮ�¡�����ϵͳ�����뱸�ݲ���
�������ã�
? �ֶ����ù̶� IP
? eno1 ������������ BIOS ���õ�����
? ens1 ������������ BIOS ���õ� PCI-E ���������
? enp2s0 ������ PCI-E ����Ķ��������������ж����ף���˻��� s0, s1... �ı��
? eth0 ��������������ƶ������ã��ͻص�ԭ����Ĭ���������
? nmcli connection show [��������]���鿴����
? nmcli connection modify eth0����������
? nmcli connection up eth0����������
? �Զ�ȡ�� IP ����
? nmcli connection modify eth0��connection.autoconnect yes��ipv4.method auto
�޸��������ƣ�hostnamectl [set-hostname ���������]
ʱ������ʾ�����ã�timedatectl [commamd] 
timedatectl list-timezones | grep -i new
timedatectl set-timezone "America/New_York"
timedatectl set-time "2015-09-01 12:02"��ʱ��ĵ��� 
ntpdate tock.stdtime.gov.tw��hwclock -w���� ntpdate �ֶ�����Уʱ 
firewall-cmd --permanent --add-rich-rule='rule family="ipv4" \
> source address="192.168.1.0/24" accept'
firewall-cmd --reload
dmidecode -t type������Ӳ���䱸 
smartctl -a /dev/sda����ʾ������ /dev/sda ����Ϣ 
smartctl -t short /dev/sda��������̽���һ�����Ҽ��Ķ�����Ȼ���ٴι۲����״̬
smartctl -a /dev/sda
�ڶ�ʮһ�¡������װ��Դ������ Tarball
Tarball ��һ�����������ѹ��֮��ͨ���У�ԭʼ�������ļ����������ļ���������ļ���˵���밲װ˵��    
Tarball ��װ���̣�3��4 ͨ�� make ���ָ��Ĺ�������������
1. �� Tarball �ɳ��̵���ҳ��������
2. �� Tarball �⿪�������ܶ��Դ�����ļ�
3. ��ʼ�� gcc ����Դ����ı��� �������Ŀ���ļ� object files��
4. Ȼ���� gcc ���к����⡢��������������ӣ����γ���Ҫ�� binary file
5. �������� binary file �Լ���ص������ļ���װ���Լ�����������
Tarball �� make ��װ�Ļ������裺
1. ȡ��ԭʼ�ļ����� tarball �ļ��� /usr/local/src Ŀ¼�½�ѹ��
2. ȡ�ò������̣������´�����Ŀ¼���棬ȥ���� INSTALL �� README ������ļ�����
3. �������������װ������ INSTALL/README �����ݲ쿴����װ��һЩ������������Ǳ�Ҫ�� 
4. ���� makefile�����Զ������� ��configure �� config�� �����ҵ������������ Makefile����ļ�
5. ���룺�� make �������ʹ�ø�Ŀ¼�µ� Makefile ��Ϊ���Ĳ��������ļ���������make����������Ķ���
6. ��װ���� make ������򣬲��� Makefile ������������ļ������� install �����ģ�target�� ��ָ������װ����ȷ��·��
./configure�������������ڴ��� Makefile ����ļ�
make clean��make ���ȡ Makefile �й��� clean �Ĺ���
make��make ������ Makefile ���е�Ĭ�Ϲ������б������Ϊ
make install��ͨ����������İ�װ�����ˣ�make ������ Makefile ����ļ��������install ����Ŀ
gcc -c hello.c�����Զ��Ĳ��� hello.o ����ļ������ǲ�������� binary ��ִ���ļ�
gcc -o hello hello.o
./hello
gcc -O hello.c -c�����Զ��Ĳ��� hello.o ����ļ������ҽ������Ż�
gcc sin.c -lm -L/lib -I/usr/include���ڽ��� binary file ����ʱ�������ӵĺ���������ص�·������ 
gcc -o hello hello.c��-o ����ӵ���Ҫ����� binary file �ļ��� 
gcc -o hello hello.c -Wall������ı�����Ľ�Ϊ�Ͻ�һ�㣬���Ծ���ѶϢҲ����ʾ���� 
������������룺
vim thanks.c��������
vim thanks_2.c��������
gcc -c thanks.c thanks_2.c
gcc -o thanks thanks.o thanks_2.o
./thanks
�ڶ�ʮ���¡������װ RPM, SRPM �� YUM
Ŀǰ�� Linux �������װ��ʽ����������֣��ֱ��ǣ�
? DPKG��Debian/Ubuntu��ʹ��ָ�� dpkg����������ָ��APT ��apt-get��
? RPM��Red Hat/Fedora��ʹ��ָ�� rpm, rpmbuild����������ָ�� YUM ��yum��
RPM �� SRPM �ĸ�ʽ�ֱ�Ϊ��
xxxxxxxxx.rpm <==RPM �ĸ�ʽ���Ѿ����������Ұ�װ��ɵ� rpm �ļ�
xxxxx.src.rpm <==SRPM�ĸ�ʽ������δ�����Դ������Ϣ
RPM ��װ��
rpm -ivh package_name
���ع��̣�ʹ�ã� mount /dev/sr0 /mnt
�ҳ��ļ���ʵ��·����find /mnt -name 'pam-devel*'
���Դ�����Ƿ���������ԣ� rpm -ivh pam-devel... --test
ֱ�Ӱ�װ�� rpm -ivh pam-devel...
ж�ع��̣� umount /mnt
rpm -qa <==�Ѱ�װ���
rpm -q[licdR] �Ѱ�װ��������� <==�Ѱ�װ���
rpm -qf ������ϵͳ�����ĳ���ļ��� <==�Ѱ�װ���
rpm -qp[licdR] δ��װ��ĳ���ļ����� <==����RPM�ļ�
rpm -q logrotate���Ƿ��а�װ logrotate ������ 
rpm -qi logrotate���г� logrotate �����������˵������ 
rpm -ql logrotate�����ڸ�������ṩ������Ŀ¼���ļ�
rpm -qc logrotate���ֱ���ҳ� logrotate �������ļ���˵���ĵ�
rpm -qd logrotate
rpm -qR logrotate����Ҫ�ɹ���װ logrotate ��������Ҫʲô�ļ��İ�æ
rpm -qf /bin/sh���ҳ� /bin/sh ���Ǹ�����ṩ�� 
rpm -qpR filename.i386.rpm��������������һ�� RPM �ļ�����Ҫ֪�����ļ��������ļ� 
rpm -Va
rpm -V �Ѱ�װ��������ƣ�rpm -V logrotate 
rpm -Vp ĳ�� RPM �ļ����ļ���
rpm -Vf ��ϵͳ�����ĳ���ļ���rpm -Vf /etc/crontab 
yum [option] [��ѯ������Ŀ] [��ز���]
yum search raid����Ѱ�������� ��raid�� ��ص��������Щ
yum info mdadm���ҳ� mdadm �������Ĺ���Ϊ�� 
yum list���г� yum �����������ṩ�������������
yum list updates���г�Ŀǰ�������Ͽɹ����������������������Щ 
yum provides passwd���г��ṩ passwd ����ļ����������Щ 
yum list pam*
��װ/�������ܣ�yum [install|update] ���
yum [option] [��װ�������Ĺ�����Ŀ] [��ز���]
�Ƴ����ܣ�yum [remove] ���
yum �������ļ���vim /etc/yum.repos.d/CentOS-Base.repo 
yum repolist all���г�Ŀǰ yum server ��ʹ�õ����������Щ 
yum clean [packages|headers|all]
yum clean all��ɾ�������ع�������������������� ��������������嵥�� 
yum [Ⱥ�鹦��] [���Ⱥ��]
yum grouplist������Ŀǰ������뱾������Ŀ����밲װ�������Ⱥ������Щ 
yum groupinfo "Scientific Support"
yum groupinstall "Scientific Support"
vim /etc/yum.conf
��װ�� yum install ����������
������ systemctl start ����������
���������� systemctl enable ����������
����ǽ�� firewall-cmd --add-service="����ķ��� "; firewall-cmd --permanent --addservice="����ķ��� "
���ԣ� �����ȥ������ķ����������
rpm -q httpd php mariadb-server php-mysql
yum install httpd php mariadb-server php-mysql
systemctl daemon-reload
systemctl start httpd
systemctl enable httpd
systemctl status httpd
firewall-cmd --add-service="http"
firewall-cmd --permanent --add-service="http"
firewall-cmd --list-all
�ڶ�ʮ���¡�X Window ���ý���
�� Linux ��ͷ��ͼ�νӿ����ǳ�֮Ϊ X Window System�����Ϊ X �� X11��X11 ��һ���������������һ������ϵͳ 
�ڶ�ʮ���¡�Linux ���ı��������
���ָɾ�Դ���룺 make mrproper
��ʼ��ѡ���Ĺ��ܣ� make XXconfig
make vmlinux <==δ��ѹ���ĺ���
make modules <==������ģ��
make bzImage <==��ѹ�����ĺ��ģ�Ĭ�ϣ�
make all <==������������������
make -j 4 clean <==������ݴ���
make -j 4 bzImage <==�ȱ������
make -j 4 modules <==�ٱ���ģ��
make -j 4 clean bzImage modules <==����������