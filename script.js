function openActivity(type) {

    let content = document.getElementById("content");


    const router1 = `
ROUTER 1

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

int g0/1.99
encapsulation dot1Q 99 native
no ip address
exit

ip dhcp excluded-address 192.168.10.1 192.168.10.9
ip dhcp excluded-address 192.168.20.1 192.168.20.9
ip dhcp excluded-address 192.168.30.1 192.168.30.9


ip dhcp pool VLAN10
network 192.168.10.0 255.255.255.0
default-router 192.168.10.1
exit

ip dhcp pool VLAN20
network 192.168.20.0 255.255.255.0
default-router 192.168.20.1
exit

ip dhcp pool VLAN30
network 192.168.30.0 255.255.255.0
default-router 192.168.30.1
exit
end
wr


CHECKING

show ip interface brief
show ip dhcp pool
show ip dhcp binding
show ip route


PING TEST
ping 192.168.10.10
ping 192.168.20.10
ping 192.168.30.10
`;



    const switch1 = `
SWITCH 1

en
conf t
hostname S1
enable secret class3D
no ip domain-lookup
banner motd #Unauthorized Access is Prohibited#
line console 0
password cisco3D
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


int fa0/3
switchport mode access
switchport access vlan 10
spanning-tree portfast
no shutdown
exit

int fa0/4
switchport mode access
switchport access vlan 20
spanning-tree portfast
no shutdown
exit

int fa0/1
switchport mode trunk
switchport trunk native vlan 99
switchport trunk allowed vlan 10,20,30,99
no shutdown
exit


int range fa0/23-24
switchport mode trunk
switchport trunk native vlan 99
switchport trunk allowed vlan 10,20,30,99
channel-group 1 mode active
no shutdown
exit

int port-channel 1
switchport mode trunk
switchport trunk native vlan 99
switchport trunk allowed vlan 10,20,30,99
exit

spanning-tree mode rapid-pvst
spanning-tree vlan 10,20,30 root primary
end
wr


CHECKING
show vlan brief
show interfaces trunk
show etherchannel summary
`;




    const switch2 = `
SWITCH 2

en
conf t
hostname S2
enable secret class3D
no ip domain-lookup
banner motd #Unauthorized Access is Prohibited#

line console 0
password cisco3D
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

int fa0/3
switchport mode access
switchport access vlan 30
spanning-tree portfast
no shutdown
exit

int range fa0/23-24
switchport mode trunk
switchport trunk native vlan 99
switchport trunk allowed vlan 10,20,30,99
channel-group 1 mode active
no shutdown
exit

int port-channel 1
switchport mode trunk
switchport trunk native vlan 99
switchport trunk allowed vlan 10,20,30,99
exit

spanning-tree mode rapid-pvst
spanning-tree vlan 10,20,30 root secondary
end
wr


CHECKING
show vlan brief
show interfaces trunk
show etherchannel summary


PING TEST
Router:
ping 192.68.10.10


PC1:
ping 192.168.20.10
ping 192.168.30.10


PC2:
ping 192.168.20.1
ping 192.168.10.10
ping 192.168.30.10


PC3:
ping 192.168.30.1
ping 192.168.10.10
ping 192.168.20.10

`;




    if(type === "all"){

        display(
            "COMPLETE CONFIGURATION",
            router1 + "\n\n====================\n\n" + switch1 + "\n\n====================\n\n" + switch2
        );

    }


    else if(type === "router"){

        display("ROUTER 1", router1);

    }


    else if(type === "switch1"){

        display("SWITCH 1", switch1);

    }


    else if(type === "switch2"){

        display("SWITCH 2", switch2);

    }

}




function display(title, text){

document.getElementById("content").innerHTML = `

<h2>${title}</h2>


<button class="copy" onclick="copyConfig()">
📋 COPY CONFIGURATION
</button>


<pre id="config">${text}</pre>

`;

}




function copyConfig(){

let text = document.getElementById("config").innerText;


navigator.clipboard.writeText(text);


alert("Configuration copied!");

}