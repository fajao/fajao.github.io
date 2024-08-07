---
title: SOC Automation Project - Part 1
date: 2024-06-06 04:00:00 -500
categories: [projects,SOC automation]
tags: [soc,build,soar,siem,xdr,edr,wazuh,shuffle,thehive]
image: /assets/img/soc_project/part1/soc_build.png
---

# Building a SOC automation Home Lab: Part 1 - Overview

### A step-by-step guide for building your very own SOC Automation Home Lab using VMWare and DigitalOcean cloud provider

In this project, we will delve into the setup and automation of our Secure Operations Center (SOC).

The project is structured into several modules, with each module focusing on a distinct component of the lab. Should any changes occur in the future, a note will be added at the beginning of the relevant module to highlight the updates.

This build is largely inspired by the [MyDFIR Home Lab project](https://youtu.be/Lb_ukgtYK_U?si=yr7cF7uzDXVWlLt1){:target="_blank"} and the primary aim is to gain practical experience with a variety of tools used in a SOC environment.

## Overview

### Components

* Windows 10 Host (hosted in VMware)

* Wazuh server (hosted in DigitalOcean cloud) 

* TheHive server (hosted in DigitalOcean cloud) 

* SOC Analyst email (squarex)  

> In this build, we will be utilizing DigitalOcean cloud servers and VMware. However, you are free to use any other cloud server or hypervisor that you prefer (you can even host everything locally if you have the necessary resources)
{: .prompt-warning }

![Diagram](/assets/img/soc_project/part1/socautomation3.drawio.svg)

## Objective

In this project, we will leverage the comprehensive **SIEM** and **XDR** capabilities of **Wazuh**. Specifically, we will generate telemetry from our Wazuh agent related to mimikatz.exe, which will trigger an alert based on a custom rule we created. Furthermore, we will utilize **Shuffle SOAR automation** features to enhance our incident response. This includes enriching Indicators of Compromise (IOCs) using the **VirusTotal API**, creating alerts in **theHive**, and notifying the SOC analyst via email with detailed information about the alert.

## Next Steps

In the next module, we will cover the installation and configuration of our Windows 10 host. Additionally, we will install Sysmon on our virtual machine (VM) host.
