---
title: SOC Automation Project - Part 2
date: 2024-06-07 04:00:00 -500
categories: [projects,SOC automation]
tags: [soc,build,soar,siem,xdr,edr,wazuh,shuffle,thehive]
image: /assets/img/soc_project/part1/soc_build.png
---

# Building a SOC automation Home Lab: Part 2 - Windows 10 VM installation and configuration 

### A step-by-step guide for building your very own SOC Automation Home Lab using VMWare and DigitalOcean cloud provider

In this module, we will cover the installation and configuration of our Windows 10. Additionally, we will install Sysmon on our virtual machine (VM) host.

> The Windows 10 VM will serve as the Wazuh Agent for our project. However, the number of agents and their OS is up to you, as long as they are supported by Wazuh.
{: .prompt-info }

## Installing Windows 10 VM host

### Download Windows

1. Go to the following link: [Download Windows 10 Enterprise 64-bit edition.][1]{:target="_blank"}

2. The downloaded file will have the `.iso` extension.

![Download Windows](/assets/img/soc_project/part2/000.png)

### Windows 10 VM Creation

1. Launch VMware and select `Create a New Virtual Machine` from the dashboard.

2. Choose the following options:

* **Configuration**: `Typical`
* **Installation method**: `I will install the operating system later`
* **Guest Operating System**: `Microsoft Windows`
* **Version**: `Windows 10 x64`
* **Name your VM and choose its location.**
* **Amount of storage space**: `100 GB`
* Click `Finish` to complete the creation.

![Creating new VM_1](/assets/img/soc_project/part2/001.png)

![Creating new VM_2](/assets/img/soc_project/part2/002.png)

![Creating new VM_3](/assets/img/soc_project/part2/003.png)

![Creating new VM_4](/assets/img/soc_project/part2/004.png)

![Creating new VM_6](/assets/img/soc_project/part2/006.png)

![Creating new VM_7](/assets/img/soc_project/part2/007.png)

![Creating new VM_8](/assets/img/soc_project/part2/008.png)

Before starting the VM, we need to make some changes first.

1. Select `Edit virtual machine settings`.

2. Under the `CD/DVD (SATA)` option, change the connection to the Windows `.iso` file we downloaded earlier.

> I changed the memory alocated to 4GB and 1 processor, but you can leave it as it is.
{: .prompt-info }

![Creating new VM_9](/assets/img/soc_project/part2/009.png)

![Creating new VM_10](/assets/img/soc_project/part2/010.png)

![Creating new VM_11](/assets/img/soc_project/part2/011.png)

![Creating new VM_12](/assets/img/soc_project/part2/012.png)

> This VM has to have access to the internet, leave the network adapter configured for NAT or Bridged mode.
{: .prompt-warning }

Now, start the Windows machine and proceed with the installation.

## Completing Windows installation

After starting the machine, press any key to begin the Windows installation.
Select your preferred language, time and keyboard layout, then click `Install Now`.

![Creating new VM_13](/assets/img/soc_project/part2/013.png)

![Creating new VM_14](/assets/img/soc_project/part2/014.png)

Agree to the terms, choose `Custom installation > Next` and the VM will reboot a few times.

![Creating new VM_15](/assets/img/soc_project/part2/015.png)

![Creating new VM_16](/assets/img/soc_project/part2/016.png)

![Creating new VM_17](/assets/img/soc_project/part2/017.png)

![Creating new VM_18](/assets/img/soc_project/part2/018.png)

After rebooting, select your region and keyboard layout. Next, choose the option `Domain join instead` from the bottom left corner.

![Creating new VM_20](/assets/img/soc_project/part2/020.png)

![Creating new VM_21](/assets/img/soc_project/part2/021.png)

![Creating new VM_22](/assets/img/soc_project/part2/022.png)

![Creating new VM_23](/assets/img/soc_project/part2/023.png)

Insert the name and password of your user account.

![Creating new VM_24](/assets/img/soc_project/part2/024.png)

![Creating new VM_25](/assets/img/soc_project/part2/025.png)

Choose and answer the security questions, disable all privacy settings, and finally select `Not Now`.

![Creating new VM_26](/assets/img/soc_project/part2/026.png)

![Creating new VM_27](/assets/img/soc_project/part2/027.png)

![Creating new VM_28](/assets/img/soc_project/part2/028.png)

Next, we will install VMware tools in order to improve our VM performance.

### Installing VMware Tools

VMware Tools enhances the VM's performance and adds functionalities such as full-screen resolution (without stretching), copy-paste between guest and host, automatic shutdowns and reboots, and time synchronization. In order to install VMware Tools:

* Go to `VM > Install VMware Tools` on the top left side of VMware.

* After a few seconds, open the **DVD Drive (D:) VMware Tools** and run `setup64.exe`.

![Creating new VM_30](/assets/img/soc_project/part2/030.png)

![Creating new VM_31](/assets/img/soc_project/part2/031.png)

* Select `Next > Next > Finish` and restart to complete the installation.

![Creating new VM_32](/assets/img/soc_project/part2/032.png)

![Creating new VM_33](/assets/img/soc_project/part2/033.png)

![Creating new VM_34](/assets/img/soc_project/part2/034.png)

![Creating new VM_35](/assets/img/soc_project/part2/035.png)

![Creating new VM_36](/assets/img/soc_project/part2/036.png)

Now that our Windows 10 VM installation is complete, our next step is to install **Sysmon**.

## Installing Sysmon

Go to the following link to download [Sysmon][2]{:target="_blank"} and while it's downloading, save the **sysmonconfig.xml** file from this [Github Repo][3]{:target="_blank"}.

![Creating new VM_37](/assets/img/soc_project/part2/037.png)

![Creating new VM_38](/assets/img/soc_project/part2/038.png)

![Creating new VM_39](/assets/img/soc_project/part2/039.png)

![Creating new VM_40](/assets/img/soc_project/part2/040.png)

Extract the **Sysmon zip file** and move the **sysmonconfig.xml** file to the same directory.

![Creating new VM_41](/assets/img/soc_project/part2/041.png)

![Creating new VM_42](/assets/img/soc_project/part2/042.png)

![Creating new VM_44](/assets/img/soc_project/part2/044.png)

Next, open a PowerShell terminal with **administrative privileges**, go to the sysmon directory and run the following command to install **Sysmon**.

```powershell
# Changing directory
cd "/path/to/sysmon"

# Installing sysmon
sysmon64.exe -i sysmonconfig.xml
```

![Creating new VM_43](/assets/img/soc_project/part2/043.png)

![Creating new VM_45](/assets/img/soc_project/part2/045.png)

Agree with the license terms and after a few seconds, the **Sysmon service** will be running.

![Creating new VM_46](/assets/img/soc_project/part2/046.png)

![Creating new VM_47](/assets/img/soc_project/part2/047.png)

Now our Windows 10 VM host is ready and with Sysmon running.

## Next Steps

In the next module, we will deploy our Wazuh and theHive server on the cloud using DigitalOcean. We will also configure firewall rules to only allow traffic from our machine.


[1]: https://www.microsoft.com/en-us/evalcenter/download-windows-10-enterprise
[2]: https://learn.microsoft.com/pt-pt/sysinternals/downloads/sysmon
[3]: https://github.com/olafhartong/sysmon-modular