function openActivity(type){

let content=document.getElementById("content");


if(type=="backup"){
show("ALL",
`📁 BACKUP FOLDER

R1
enable
configure terminal
ipv6 unicast-routing

ipv6 dhcp pool LAN
address prefix 2001:DB8:1:1::/64
exit

interface gigabitEthernet0/0
ipv6 address 2001:DB8:1:1::1/64
ipv6 dhcp server LAN
ipv6 nd managed-config-flag
no shutdown
exit

end
copy running-config startup-config

----------------------------------

S1
enable
configure terminal

interface fastEthernet0/5
switchport mode access
no shutdown
exit

interface fastEthernet0/6
switchport mode access
no shutdown
exit

interface fastEthernet0/1
switchport mode access
no shutdown
exit

interface range fastEthernet0/23-24
switchport mode trunk
channel-group 1 mode active
no shutdown
exit

interface port-channel1
switchport mode trunk
no shutdown
exit

end
copy running-config startup-config

-----------------------------------

S2
enable
configure terminal

interface fastEthernet0/10
switchport mode access
no shutdown
exit

interface range fastEthernet0/23-24
switchport mode trunk
channel-group 1 mode active
no shutdown
exit

interface port-channel1
switchport mode trunk
no shutdown
exit

end
copy running-config startup-config

Verification Commands:

On Router
show ipv6 interface brief
show ipv6 route
show ipv6 dhcp pool
show ipv6 dhcp binding
show running-config

On Switch
show etherchannel summary
show interfaces trunk
show interfaces port-channel 1
show running-config 

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