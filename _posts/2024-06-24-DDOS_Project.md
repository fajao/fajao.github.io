---
title: DDoS Project - Detection and Response
date: 2024-06-27 09:00:00 -500
categories: [projects,DDoS]
tags: [fail2ban,vmware,ddos,snort,wireshark,tcpdump,kali]
image: /assets/img/ddos_project/4046203.png
---

# DDoS Project - Detection and Response

> This post is for educational purposes only and any Ddosify usage **must be against owned systems**. Using it for harmful purposes is **extremely forbidden**, and I will not be responsible for its’ usages and consequences.
{: .prompt-warning }

### Summary

A Distributed Denial of Service (DDoS) attack aims to overwhelm a network, service, or server with excessive traffic from multiple sources, preventing users from accessing it. Detecting and responding to DDoS attacks is crucial for maintaining the availability and performance of online services. In this project, we will learn how to detect and respond to DDoS attacks using various tools and techniques.

Initially, I attempted to conduct this project entirely in the cloud using DigitalOcean services. However, I encountered some limitations in pulling traffic within the same VPC so I decided to deploy the machines locally using VMware.

During this post we will talk about generating DDoS attacks, however the right term would be DoS because we're just using a single machine to flood our target.

## Overview

### Requirements

* 8GB RAM 
* 20GB of free disk space.

### Virtual Machines

* **VM1**: Attacker (Kali Linux 2024.1) with:
    * ddosify (now called Anteon)
* **VM2**: Victim Machine (Ubuntu 24.04) with:
    * apache2
    * fail2ban
* **VM3**: SOC - Monitoring (Ubuntu 24.04) with:
    * tcpdump
    * wireshark
    * snort

### Diagram

![Diagram](/assets/img/ddos_project/000y.svg)

## Configurating VMs

### Kali Linux

After creating the Kali VM, add another network adapter for the LAN segment that will contain the other Ubuntu servers. Virtual machines on a LAN segment can't leave the network (talk to the host or connect to the internet), however we can use Kali as the internet provider for the other VMs (because it has NAT networking on the other NIC).

![Image_001](/assets/img/ddos_project/001.png)

Power on Kali and complete the installation proccess. Next, use the following command to assign a static IP address for the LAN interface (LAN segments do not provide DHCP services).

```bash
# Setting static IP with ifconfig
sudo ifconfig eth1 10.10.10.1 netmask 255.255.255.0
```

![Image_003](/assets/img/ddos_project/003.png)

To enable Kali to forward the traffic from the Ubuntu VMs outside the network, make the following changes:

* Edit the `/etc/sysctl.conf` file, uncommenting the `#` at the beginning of the line `net.ipv4.ip_forward=1`. 

![Image_006](/assets/img/ddos_project/006.png)

```bash
# Apply the changes
sudo sysctl -p
```

* Configure NAT with iptables to forward traffic.

```bash
# Configure NAT with iptables rules - eth1 = Private network / eth0 = interface with access to
# the internet \\ CHANGE IT ACCORDINGLY
sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
sudo iptables -A FORWARD -i eth1 -o eth0 -m state --state RELATED,ESTABLISHED -j ACCEPT
sudo iptables -A FORWARD -i eth0 -o eth1 -j ACCEPT

# Save the rules to persist accross reboots
sudo apt-get install iptables-persistent
sudo netfilter-persistent save
```

Next, we need to configure the Ubuntu machines.

### Ubuntu Servers

After creating the VMs, change the `Network Adapter` parameter TO the LAN segmented created earlier. 

![Image_002](/assets/img/ddos_project/002.png)

The process is the same for both machines, the only difference is the manually assigned IP addresses, which must be unique. Power on the machine and complete the instalation. After reboot, navigate to `Wired > Wired Settings > Network Options > IPv4` and make the following changes:

* **IPv4 Method**: Manual
* **Addresses**: 
    * **Address**: 10.10.10.2 (for Victim VM) / 10.10.10.3 (for SOC VM)
    * **Netmask**: 255.255.255.0
* **DNS**: 8.8.8.8
* Apply the changes

![Image_004](/assets/img/ddos_project/004.png)

![Image_005](/assets/img/ddos_project/005.png)

### Testing Connectivity

To ensure the network is well configured, execute a ping test between machines and to check if all of them have internet access.

![Image_007](/assets/img/ddos_project/007.png)

Everything looks good, we can now start to simulate DDoS attacks and use different tools to analyze and monitor traffic, as well as respond to those DDoS attempts.

## DDoS Attacks Detection and Response 

In this project we will use Ddosify to simulate DDoS attacks against our Victim machine apache server and use Snort IDS capabilities to create alerts. Additionaly, we will use fail2ban features to ban the IP address responsible for those attacks.

![Diagram](/assets/img/ddos_project/000w.svg)

### Installing Tools

#### Kali Linux - Ddosify

First, we need to install ddosify. To complete this, use the commands bellow:

```bash
sudo apt update 

# Download go
wget https://go.dev/dl/go1.22.4.linux-amd64.tar.gz

# Extract Files
sudo tar -C /usr/local/ -xzf go1.22.4.linux-amd64.tar.gz

# Add the following lines at the of the ~/.zshrc file
export GOPATH=$HOME/go-workspace
export GOROOT=/usr/local/go
PATH=$PATH:$GOROOT/bin/:$GOPATH/bin

# Restart the shell
exec $SHELL

# Check installation
go version

# Installing Ddosify
go install -v go.ddosify.com/ddosify@latest
```

#### Victim Machine - Apache2 and Fail2ban

The apache server will be used as the target of our attack.

```bash
sudo apt update 

# Install the latest apache2 package
sudo apt install apache2

# Install the latest fail2ban package - IF YOU'RE USING UBUNTU 24.04
sudo apt install fail2ban
```

There seems to be an issue with the fail2ban version packaged into Ubuntu 24.04. To bypass this error, follow the steps below:

```bash
# Download deb package and signature
wget -O fail2ban.deb https://github.com/fail2ban/fail2ban/releases/download/1.1.0/fail2ban_1.1.0-1.upstream1_all.deb
wget -O fail2ban.deb.asc https://github.com/fail2ban/fail2ban/releases/download/1.1.0/fail2ban_1.1.0-1.upstream1_all.deb.asc

# Check signature (if you want to be sure file is unmodified)
gpg --verify fail2ban.deb.asc fail2ban.deb

# View details of the package
dpkg -I fail2ban.deb

# Ensure the upgrade run gentler (protocol of previous version may be incompatible), stop 
# fail2ban before install
sudo service fail2ban stop

# Install package using dpkg (standalone package, don't regard dependencies)
sudo dpkg -i fail2ban.deb

# If the package introduces some "broken" dependencies (I don't think so in case of fail2ban
# which has few dependencies), to fix the unmet dependency issue, run this
sudo apt -f install
```

#### SOC Machine - Wireshark, Tcpdump and Snort

Tcpdump and Wireshark will be used to monitor and capture traffic from the Private network while Snort will generate alerts according to custom rules we will create later.

```bash
sudo apt update 

# Install the latest Tcpdump package
sudo apt install tcpdump

# Install the latest Wireshark package
sudo apt install wireshark

# Install the latest Snort package
sudo apt install snort
```

During snort installation, it will be asked to introduce the interface to monitor. In this case we introduced `10.10.10.0/24` - Private Network.

### Capture and Monitor DDoS Traffic

Now that our tools are installed, we will use tcpdump to capture the traffic generated by Ddosify against the Victim machine. Additionaly we can analyze the `.pcap` file with Wireshark.

> Wireshark can capture traffic as well! I just wanted to demonstrate tcpdump capabilities.
{: .prompt-info }

First, start the apache2 service on the Victim machine. 

```bash
# Starting apache2 service
sudo systemctl start apache2
```

On the SOC VM, start tcpdump to capture all the traffic arriving at the Victim machine:

```bash
# Ddosify usage / n = number of requests / t = target website
sudo tcpdump -i ens34 dst 10.10.10.2 -w ddos_project.pcap
```

Next, on Kali linux, generate the DDoS using the following command:

```bash
# Ddosify usage / n = number of requests / t = target website
ddosify -t http://10.10.10.2 -n 1000
```

![Image_008](/assets/img/ddos_project/008.png)

In this example, we sent 1000 simple GET requests, but ddosify is capable of much more. We can add headers (`-h`) or a body (`-b`) to our request, use other HTTP method (`-m`), change the test duration (`-d`) which is 10 seconds by default, etc.

When the attack is complete, stop tcpdump by pressing `Ctrl + C`, and analyze the captured traffic with Wireshark.

![Image_009](/assets/img/ddos_project/009.png)

![Image_010](/assets/img/ddos_project/010.png)

As we can see, all the 1000 GET HTTP requests were captured by tcpdump!

### Creating DDoS Alert with Snort

#### Configurating Snort

To generate alerts with Snort, we need to create a rule that detects DDoS attacks. To do this, configure/create a `local.rules` file inside the `/etc/snort/rules` directory.

```bash
# Adding custom rules in Snort
sudo nano /etc/snort/rules/local.rules
```

Here we can add custom rules to instruct Snort on how to act when specific conditions are met. In this case, we just want it to alert us if it detects more than 95 HTTP GET requests within 1 second, against any machine inside the private network on port 80.

```text
alert tcp any any -> $HOME_NET 80 (msg:"HTTP DDoS attack detected"; flow:to_server,established; 
content:"GET"; http_method; detection_filter:track by_src, count 95, seconds 1; classtype:
attempted-dos; sid:1000001; rev:1;)
```

**Rule Breakdown**:

* **alert tcp any any -> $HOME_NET 80**: 
    * **alert**: Generate an alert when the rule matches.
    * **tcp**: This rule applies to TCP traffic.
    * **any any**: Any source IP and port.
    * **->**: Traffic direction (from source to destination).
    * **$HOME_NET**: Destination IP within the home network (Private Network).
    * **80**: Destination port (HTTP).

* **(msg:"HTTP DDoS attack detected"; ... )**: This part contains the rule options.
    * **msg:"HTTP DDoS attack detected"**: The message that will be logged when the rule triggers.
    * **flow:to_server,established**: Ensures the traffic is going to the server and the connection is established.
    * **content:"GET"; http_method**: Looks for the HTTP GET method in the request.
    * **detection_filter:track by_src, count 95, seconds 1**: Triggers the rule if there are more than 95 GET requests from the same source IP within one second.
    * **classtype:attempted-dos**: Classifies the alert as an attempted denial of service.
    * **sid:1000001**: The unique Snort ID for the rule.
    * **rev:1**: The revision number of the rule.

![Image_011](/assets/img/ddos_project/011.png)

Next, ensure that the Snort configuration file (`snort.conf`) includes our rule file. 

![Image_012](/assets/img/ddos_project/012.png)

If `$RULE_PATH` is not defined, add it at the top of the configuration file.

Save all changes and restart the service.

```bash
# Restart snort service
sudo systemctl restart snort

sudo systemctl status snort
```

![Image_013](/assets/img/ddos_project/013.png)

To ensure there are no syntax errors in the configuration and rules, we can run snort in test mode and look for any errors.

```bash
# Snort in test mode
sudo snort -T -c /etc/snort/snort.conf
```

If there are no errors, Snort is ready to use the new rule.

#### Detecting DDoS with Snort

First we need to start Snort in IDS mode:

```bash
# Snort in IDS mode / Change interface accordingly
sudo snort -A console -q -c /etc/snort/snort.conf -i ens34
```

Next, to check if the new rule works, we utilize ddosify again. Using the same command as before should trigger the rule since it sends more than 95 requests per second.

![Image_008](/assets/img/ddos_project/008.png)

Snort logs alerts to a file typically located in `/var/log/snort/`. Here, we encountered a `snort.alert.fast` log file containing the alerts generated from the DDoS attack.

![Image_014](/assets/img/ddos_project/014.png)

With this custom rule, Snort is now able to monitor and create alerts in case of imminent DDoS attacks against our apache server ().

> In this case, Snort is only creating alerts agains **Application Layer DDoS** attacks!
{: .prompt-warning }

### Blocking DDoS Attacker with Fail2ban

#### Configurating Fail2ban

Our next and final step is to ban the source IP address of the DDoS attack, using fail2ban on our victim machine.

> Snort has IPS capabilities as well!
{: .prompt-info }

Like Snort, Fail2Ban requires creating a rule (called **jail**) that, when triggered, will perform an action. A Fail2Ban jail is a combination of a filter and one or several actions. In this case, it will be one: to ban an IP address.

First, we need to create a filter. A filter defines a regular expression that matches a pattern corresponding to suspicious activity. To do this, navigate to `/etc/fail2ban/filter.d/` and create a filter configuration file. 

Since we want to ban an IP based on the number of requests sent to our Apache server, we can use the `/var/log/apache2/access.log` logs syntax as the filter and instruct Fail2Ban to act everytime a filter pattern is matched more than a specified number of times within a given time frame.

```bash
# Creating Fail2ban filter file
sudo nano /etc/fail2ban/filter.d/ddos-project.conf
```

```ini
[Definition]
failregex = ^<HOST> .* "GET .* HTTP/1\.[01]" 200 \d+ ".*" ".*"$

ignoreregex = 
```

![Image_015](/assets/img/ddos_project/015.png)

With our filter ready, we just need to integrate it into the Fail2ban configuration file `jail.local` (create it if needed).

```bash
# Creating Fail2ban configuration file
sudo nano /etc/fail2ban/jail.local
```

```ini
[ddos-project]
enabled = true
port = 80
filter = ddos-project
logpath = /var/log/apache2/access.log
maxretry = 1000   # Number of requests allowed before an IP is banned
findtime = 10     # Time window in seconds during which requests
bantime = 360     # Defines how long the ban lasts
```

![Image_016](/assets/img/ddos_project/016.png)

Save all changes and restart the service.

```bash
# Restart fail2ban service
sudo systemctl restart fail2ban

sudo systemctl status fail2ban
```

![Image_017](/assets/img/ddos_project/017.png)

### Mitigating DDoS Attack with Fail2ban

With fail2ban configured and running, we generate another DDoS attack with Ddosify. This time, to ensure fail2ban is working, we will generate a larger attack:

```bash
# Ddosify usage / n = number of requests / t = target website / d = duration in seconds
ddosify -t http://10.10.10.2 -n 50000 -d 60 
```

![Image_018](/assets/img/ddos_project/018.png)

As we can see from the results, only 1502 of the 50000 requests were successful. We can check Fail2ban logs and status to verify if the IP was banned.

```bash
# Checking Fail2ban logs
sudo cat /var/log/fail2ban.log | grep "Ban"
```

![Image_019](/assets/img/ddos_project/019.png)

```bash
# Checking Fail2ban-client status
sudo fail2ban-client status ddos-project
```

![Image_020](/assets/img/ddos_project/020.png)

Now, any IP generating excessive requests against the apache server on 10.10.10.2 will be banned, effectively mitigating the DDoS attack.

## Final Thoughts

Overall, this project provided valuable experience in applying network and security concepts, as well as configuring various tools like Snort, tcpdump, and Fail2Ban. Despite taking more time than expected, it was a rewarding exercise in learning how to detect and mitigate DDoS attacks (in a small and simpler scale, of course 😁).