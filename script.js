function openActivity(type){

let content=document.getElementById("content");

let router=`ROUTER 1

en
conf t
hostname R1
enable secret class3B
no ip domain-lookup
banner motd #Unauthorized Access is Prohibited#
line console 0
password cisco3B
login
ex

int g0/1
no shutdown
ex

int g0/1.10
encapsulation dot1Q 10
ip address 192.168.10.1 255.255.255.0
ex

int g0/1.20
encapsulation dot1Q 20
ip address 192.168.20.1 255.255.255.0
ex

int g0/1.30
encapsulation dot1Q 30
ip address 192.168.30.1 255.255.255.0
ex

int g0/1.99
encapsulation dot1Q 99 native
no ip address
ex

ip dhcp excluded-address 192.168.10.1 192.168.10.9
ip dhcp excluded-address 192.168.20.1 192.168.20.9
ip dhcp excluded-address 192.168.30.1 192.168.30.9

ip dhcp pool VLAN10
network 192.168.10.0 255.255.255.0
default-router 192.168.10.1
ex

ip dhcp pool VLAN20
network 192.168.20.0 255.255.255.0
default-router 192.168.20.1
ex

ip dhcp pool VLAN30
network 192.168.30.0 255.255.255.0
default-router 192.168.30.1
ex
end
wr 

(CHECKING)

sh ip int br
sh ip dhcp pool
sh ip dhcp binding
sh ip route

router - ping 192.68.10.10
PC2 - ping 192.168.20.10
PC3 - ping 192.168.30.10
`;

let switch1=`SWITCH 1

SWITCH 1
en
conf t
hostname S1
enable secret class3B
no ip domain-lookup
banner motd #Unauthorized Access is Prohibited#
line console 0
password cisco3B
login
ex

vlan 10
name Faculty
ex

vlan 20
name Admin
ex

vlan 30
name Student
ex

vlan 99
name Native
ex

int fa0/3
switchport mode access
switchport access vlan 10
spanning-tree portfast
no shutdown
ex

int fa0/4
switchport mode access
switchport access vlan 20
spanning-tree portfast
no shutdown
ex

int fa0/1
switchport mode trunk
switchport trunk native vlan 99
switchport trunk allowed vlan 10,20,30,99
no shutdown
ex

int range fa0/23-24
switchport mode trunk
switchport trunk native vlan 99
switchport trunk allowed vlan 10,20,30,99
channel-group 1 mode active
no shutdown
ex

int port-channel 1
switchport mode trunk
switchport trunk native vlan 99
switchport trunk allowed vlan 10,20,30,99
ex

spanning-tree mode rapid-pvst
spanning-tree vlan 10,20,30 root primary
end
wr 

(CHEKING)
sh vlan br
sh int trunk
sh etherchannel summary
`;

let switch2=`SWITCH 2

SWITCH 2
en
conf t
hostname S2
enable secret class3B
no ip domain-lookup
banner motd #Unauthorized Access is Prohibited#
line console 0
password cisco3B
login
ex

vlan 10
name Faculty
ex

vlan 20
name Admin
ex

vlan 30
name Student
ex

vlan 99
name Native
ex

int fa0/3
switchport mode access
switchport access vlan 30
spanning-tree portfast
no shutdown
ex

int range fa0/23-24
switchport mode trunk
switchport trunk native vlan 99
switchport trunk allowed vlan 10,20,30,99
channel-group 1 mode active
no shutdown
ex

int port-channel 1
switchport mode trunk
switchport trunk native vlan 99
switchport trunk allowed vlan 10,20,30,99
ex

spanning-tree mode rapid-pvst
spanning-tree vlan 10,20,30 root secondary
end
wr 

(CHEKING)
sh vlan br
sh int trunk
sh etherchannel summary 

(PING TEST)
router - ping 192.168.10.10
PC1 
- ping 192.168.20.10
- ping 192.168.30.10
PC2
- ping 192.168.20.1
- ping 192.168.10.10
- ping 192.168.30.10
PC3 
- ping 192.168.30.1
- ping 192.168.10.10
- ping 192.168.20.10
`;

if(type=="all"){
show("ALL ACTIVITIES",router+"\n\n==========\n\n"+switch1+"\n\n==========\n\n"+switch2);
}

if(type=="router"){
show("ROUTER 1",router);
}

if(type=="switch1"){
show("SWITCH 1",switch1);
}

if(type=="switch2"){
show("SWITCH 2",switch2);
}

if(type=="backup"){
show("BACKUP FILES",
`📁 BACKUP FOLDER

ROUTER 1
enable
configure terminal
hostname R1
enable secret class2
no ip domain-lookup
banner motd #Unauthorized Access is Prohibited#
line console 0
password cisco2
login
exit
interface g0/1
no shutdown
exit
interface g0/1.10
encapsulation dot1Q 10
ip address 192.168.10.1 255.255.255.0
exit
interface g0/1.20
encapsulation dot1Q 20
ip address 192.168.20.1 255.255.255.0
exit
interface g0/1.30
encapsulation dot1Q 30
ip address 192.168.30.1 255.255.255.0
exit
interface g0/1.99
encapsulation dot1Q 99 native
no ip address
exit
ip dhcp excluded-address 192.168.10.1 192.168.10.9
ip dhcp excluded-address 192.168.20.1 192.168.20.9
ip dhcp excluded-address 192.168.30.1 192.168.30.9
ip dhcp pool VLAN10
network 192.168.10.0 255.255.255.0
default-router 192.168.10.1
exit ip dhcp pool VLAN20
network 192.168.20.0 255.255.255.0
default-router 192.168.20.1
exit
ip dhcp pool VLAN30
network 192.168.30.0 255.255.255.0
default-router 192.168.30.1
exit
end
copy running-config startup-config 

SWITCH 1
enable
configure terminal
hostname S1
enable secret class2
no ip domain-lookup
banner motd #Unauthorized Access is Prohibited#
line console 0
password cisco2
login
exit
vlan 10
name Faculty
exit
vlan 20
name Admin
exit
vlan 30
name Student
exit
vlan 99
name Native
exit
interface fa0/3
switchport mode access
switchport access vlan 10
exit
interface fa0/4
switchport mode access
switchport access vlan 20
Exit
interface fa0/5
switchport mode access switchport access vlan 30
exit
interface range fa0/23 - 24
channel-group 1 mode active
exit
interface port-channel 1
switchport mode trunk
switchport trunk native vlan 99
switchport trunk allowed vlan 10,20,30,99
exit
interface fa0/1
switchport mode trunk
switchport trunk native vlan 99
switchport trunk allowed vlan 10,20,30,99
exit
spanning-tree mode rapid-pvst
spanning-tree vlan10,20,30 root primary
end
Write memory

 SWITCH 2
enable
configure terminal
hostname S2
enable secret class2
no ip domain-lookup
banner motd #Unauthorized Access is Prohibited#
line console 0
password cisco2
login
exit
vlan 10
name Faculty
exit
vlan 20
name Admin
exit
vlan 30
name Student
exit
vlan 99
name Native
exit
interface fa0/3
switchport mode access
switchport access vlan 30
Exit
end
interface range fa0/23 - 24
channel-group 1 mode active
exit
interface port-channel 1 switchport mode trunk
switchport trunk native vlan 99
switchport trunk allowed vlan 10,20,30,99
exit
spanning-tree mode rapid-pvst
spanning-tree vlan10,20,30 root secondary
end
Write memory

`);
}

}


function show(title,text){

document.getElementById("content").innerHTML=`
<h2>${title}</h2>
<button class="copy" onclick="copyText()">📋 COPY CONFIGURATION</button>
<pre id="config">${text}</pre>
`;

}


function copyText(){

let text=document.getElementById("config").innerText;
navigator.clipboard.writeText(text);
alert("Copied!");

}