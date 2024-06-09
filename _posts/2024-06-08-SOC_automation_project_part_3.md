---
title: SOC Automation Project - Part 3
date: 2024-06-08 04:00:00 -500
categories: [projects,SOC automation]
tags: [soc,build,soar,siem,xdr,edr,wazuh,shuffle,thehive]
image: /assets/img/soc_project/part1/soc_build.png
---

# Building a SOC automation Home Lab: Part 3 - Wazuh and theHive Servers Installation 

### A step-by-step guide for building your very own SOC Automation Home Lab using VMWare and DigitalOcean cloud provider

In this module, we will deploy our **Wazuh and theHive** servers on the cloud using DigitalOcean. We will also configure firewall rules to ensure that only traffic from our machine is allowed.

> **DigitalOcean** is currently offering a promotional campaign that provides $200 in credits for 60 days to try their products. After deploying your servers, if you do not plan to continue using them after the trial, you need to **destroy any droplets created**. Simply disabling them will still incur charges because resources such as storage remain allocated.
{: .prompt-warning }

## Creating Ubuntu Servers/Droplets

After creating your account (**a credit card is required**), go to the DigitalOcean's dashboard and select `Droplets > Create Droplet` to create our servers.

![Image_001](/assets/img/soc_project/part3/001.png)

Next, choose the following options:
* **Location**: Choose your preferred data center location.
* **Operating System**: Select Ubuntu 22.04 for both Wazuh and theHive servers.
* **Resources**: Ensure each droplet has at least 8GB of memory to meet the requirements for Wazuh and TheHive.
* **Authentication Method**: Choose between SSH key or password. Even though we chose via password, you can log in with an SSH key, set a password for your user, and modify the SSH config file to allow password authentication.

![Image_002](/assets/img/soc_project/part3/002.png)

![Image_003](/assets/img/soc_project/part3/003.png)

![Image_004](/assets/img/soc_project/part3/004.png)

![Image_005](/assets/img/soc_project/part3/005.png)

![Image_006](/assets/img/soc_project/part3/006.png)

Once our Ubuntu VM is created, we can access it with the following command:

```powershell
# Acessing droplet via SSH
ssh root@"DROPLET_IP"
```

![Image_007](/assets/img/soc_project/part3/007.png)

## Creating Firewall

To protect our servers from external threats (at this stage our machine is "open" to scans and brute force attacks), create a firewall and implement rules to only allow traffic from your public IP.

First, from DigitalOcean's dashboard select `Networking > Firewalls > Create Firewall`. 

![Image_008](/assets/img/soc_project/part3/008.png)

![Image_009](/assets/img/soc_project/part3/009.png)

Next, name your firewall and create two inbound firewall rules to allow all TCP and UDP traffic from your public IP.

> If you don't know your public IP, you can use [**What Is My IP Adress**][1]{:target="_blank"}.
{: .prompt-info }

![Image_010](/assets/img/soc_project/part3/010.png)

Apply the firewall rules to the previously created droplet and click `Create Firewall` to finalize.

![Image_011](/assets/img/soc_project/part3/011.png)

## Installing Wazuh Server

The Wazuh server analyzes the data received from the Wazuh agents, triggering alerts when threats or anomalies are detected. It is also used to remotely manage the agents' configuration and monitor their status.

First, log into the Ubuntu server and update and upgrade it with the following command:

```bash
# Update and upgrade ubuntu server
apt-get update && apt-get upgrade -y
```

To install the Wazuh server we will use the **assisted installation** that is available on [Wazuh's public documentation/manual][2]{:target="_blank"}.

![Image_gif](/assets/img/soc_project/part3/manuel_who.gif)

```bash
# Installing Wazuh Server
curl -sO https://packages.wazuh.com/4.7/wazuh-install.sh && bash ./wazuh-install.sh -a
```

![Image_021](/assets/img/soc_project/part3/012.png)

Now, our Wazuh server installation is complete and we have the credentials to access Wazuh web user interface, **Wazuh dashboard**, on port 443.

![Image_013](/assets/img/soc_project/part3/013.png)

![Image_014](/assets/img/soc_project/part3/014.png)

![Image_015](/assets/img/soc_project/part3/015.png)

### Creating Droplet and Firewall (theHive)

To create our theHive server, follow the same steps used for creating the Wazuh server (selecting Ubuntu 22.04 again). After creation, go to `Networking > Firewalls > "Firewall_Created" > Add Droplets > Add theHive server`, to apply the same firewall rules used for the Wazuh server on theHive.

![Image_016](/assets/img/soc_project/part3/016.png)

![Image_017](/assets/img/soc_project/part3/017.png)

![Image_018](/assets/img/soc_project/part3/018.png)

![Image_019](/assets/img/soc_project/part3/019.png)

![Image_020](/assets/img/soc_project/part3/020.png)

Now we can access our machine via SSH and update & upgrade it.

```powershell
# Acessing droplet via SSH
ssh root@"DROPLET_IP"
```

```bash
# Update and upgrade ubuntu server
apt-get update && apt-get upgrade -y
```

## Installing theHive Server

TheHive is designed to manage and respond to security incidents and we will use it as our case management tool.

To install it, we need to install several components first. Start with installing **Java** (provides the runtime environment for theHive), then **Cassandra** (stores and manages incident data), followed by **Elasticsearch** (enables fast, real-time search and retrieval of incident data), and finally, **theHive**.

To complete this, use the following commands:

```bash
# Installing Dependences
apt install wget gnupg apt-transport-https git ca-certificates ca-certificates-java curl software-properties-common python3-pip lsb-release
```

```bash
# Installing Java
wget -qO- https://apt.corretto.aws/corretto.key | sudo gpg --dearmor  -o /usr/share/keyrings/corretto.gpg
echo "deb [signed-by=/usr/share/keyrings/corretto.gpg] https://apt.corretto.aws stable main" |  sudo tee -a /etc/apt/sources.list.d/corretto.sources.list
sudo apt update
sudo apt install java-common java-11-amazon-corretto-jdk
echo JAVA_HOME="/usr/lib/jvm/java-11-amazon-corretto" | sudo tee -a /etc/environment 
export JAVA_HOME="/usr/lib/jvm/java-11-amazon-corretto"
```

```bash
# Installing Cassandra
wget -qO -  https://downloads.apache.org/cassandra/KEYS | sudo gpg --dearmor  -o /usr/share/keyrings/cassandra-archive.gpg
echo "deb [signed-by=/usr/share/keyrings/cassandra-archive.gpg] https://debian.cassandra.apache.org 40x main" |  sudo tee -a /etc/apt/sources.list.d/cassandra.sources.list
sudo apt update
sudo apt install cassandra
```

```bash
# Installing Elasticsearch
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch |  sudo gpg --dearmor -o /usr/share/keyrings/elasticsearch-keyring.gpg
sudo apt-get install apt-transport-https
echo "deb [signed-by=/usr/share/keyrings/elasticsearch-keyring.gpg] https://artifacts.elastic.co/packages/7.x/apt stable main" |  sudo tee /etc/apt/sources.list.d/elastic-7.x.list
sudo apt update
sudo apt install elasticsearch
```

```bash
# Installing theHive
wget -O- https://archives.strangebee.com/keys/strangebee.gpg | sudo gpg --dearmor -o /usr/share/keyrings/strangebee-archive-keyring.gpg
echo 'deb [signed-by=/usr/share/keyrings/strangebee-archive-keyring.gpg] https://deb.strangebee.com thehive-5.2 main' | sudo tee -a /etc/apt/sources.list.d/strangebee.list
sudo apt-get update
sudo apt-get install -y thehive
```

During installation, whenever you're presented with the image below, press `Enter`.

![Image_021](/assets/img/soc_project/part3/021.png)

## Next Steps

With our Wazuh and TheHive servers successfully deployed, the next step involves configuring TheHive components and setting up our Wazuh agent, by adding our Windows 10 VM to Wazuh Manager. 

[1]: https://whatismyipaddress.com/
[2]: https://documentation.wazuh.com/current/installation-guide/wazuh-server/installation-assistant.html