function openActivity(type){

let content=document.getElementById("content");

let router=`ROUTER 1

en
conf t
hostname R1
enable secret class3D
no ip domain-lookup
banner motd #Unauthorized Access is Prohibited#

line console 0
password cisco3D
login
exit

int g0/1
no shutdown
exit

int g0/1.10
encapsulation dot1Q 10
ip address 192.168.10.1 255.255.255.0
exit

int g0/1.20
encapsulation dot1Q 20
ip address 192.168.20.1 255.255.255.0
exit

int g0/1.30
encapsulation dot1Q 30
ip address 192.168.30.1 255.255.255.0
exit

ip dhcp pool VLAN10
network 192.168.10.0 255.255.255.0
default-router 192.168.10.1

ip dhcp pool VLAN20
network 192.168.20.0 255.255.255.0
default-router 192.168.20.1

ip dhcp pool VLAN30
network 192.168.30.0 255.255.255.0
default-router 192.168.30.1

end
wr`;

let switch1=`SWITCH 1

en
conf t
hostname S1

vlan 10
name Faculty

vlan 20
name Admin

vlan 30
name Student

vlan 99
name Native

int fa0/3
switchport mode access
switchport access vlan 10
spanning-tree portfast

int fa0/4
switchport mode access
switchport access vlan 20
spanning-tree portfast

int port-channel 1
switchport mode trunk

spanning-tree vlan 10,20,30 root primary

end
wr`;

let switch2=`SWITCH 2

en
conf t
hostname S2

vlan 10
name Faculty

vlan 20
name Admin

vlan 30
name Student

vlan 99
name Native

int fa0/3
switchport mode access
switchport access vlan 30
spanning-tree portfast

int port-channel 1
switchport mode trunk

spanning-tree vlan 10,20,30 root secondary

end
wr`;

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

R1 
en 
hostname R1
enable secret class2
line console 0
password cisco2
login
exi 
banner motd $Unauthorizes Access is Prohibited$
no ip domain-lookup

inter g0/1
no shutdown
exi

inter g0/1.10
encapsulation dot1q 10
ip address 192.168.10.1 255.255.255.0
exi
inter g0/1.20
encapsulation dot1q 20
ip address 192.168.20.1 255.255.255.0
exi 

Inter g0/1.30
encapsulation dot1q 30
ip address 192.168.30.1 255.255.255.0
exi

Inter g0/1.99
encapsulation dot1q 99 native
no ip address
exi

ip dhcp excluded-address 192.168.10.1 192.168.10.9
ip dhcp excluded-address 192.168.20.1 192.168.20.9
ip dhcp excluded-address 192.168.30.1 192.168.30.9

ip dhcp pool vlan10
network 192.168.10.0 255.255.255.0
default-router 192.168.10.1
exi

ip dhcp pool vlan20
network 192.168.20.0 255.255.255.0
default-router 192.168.20.1
exi

ip dhcp pool vlan30
network 192.168.30.0 255.255.255.0
default-router 192.168.30.1
exi

en 
wr m

S1
en 
conf t
hostname S1
enable secret class2
line console 0
password cisco2
login 
exi
banner motd $Unauthorized Access is Prohibited$
no ip domain-lookup

vlan 10
name Faculty
exi

vlan 20
name Admin
exi

vlan 30 
name Student
exi

vlan 99
name Native
exi

inter fa0/3
switchport mode access 
switchport access vlan 10
exi

inter fa0/4
switchport mode access 
switchport access vlan 20
exi

inter fa0/5
switchport mode access 
switchport access 30
exi

Inter range fa0/23-24
shutdown
exi

Inter range fa0/23-24
channel-group 1 mode active
exi

inter port-channel 1
switchport mode trunk
switchport trunk native vlan 99
switchport trunk allowed vlan 10,20,30,99
exi

inter range fa0/23-24
no shutdown
exi

interface f0/1
switchport mode trunk
switchport trunk native vlan 99
switchport trunk allowed vlan 10,20,30,99
exit

spanning-tree mode rapid-pvst
spanning-tree vlan 10,20,30 root primary

S2
en 
conf t 
hostname S2
enable secret class2
line console 0
password cisco2
login
exi
banner motd $Unauthorized Access is Prohibited$
no ip domain-lookup

vlan 10
name Faculty
exi
vlan 20
name Admin
exi
vlan 30
name Student 
exi
vlan 99
name Native 
exi

inter fa0/3 
switchport mode access
switchport access vlan 30
exi

inter range fa0/23-24
shutdown
exi

inter range fa0/23-24
channel-group 1 mode active
exi

Inter port-channel 1
switchport mode trunk
switchport trunk native vlan 99
switchport trunk allowed vlan 10,20,30,99
exi

inter range fa0/23-24
no shutdown 
exi

spanning-tree mode rapid-pvst
spanning-tree vlan 10,20,30 root secondary

end
wr m

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