---
title: SOC Automation Project - Part 5
date: 2024-06-10 12:00:00 -500
categories: [projects,SOC automation]
tags: [soc,build,soar,siem,xdr,edr,wazuh,shuffle,thehive]
image: /assets/img/soc_project/part1/soc_build.png
---

# Building a SOC automation Home Lab: Part 5 - Sending Telemetry Containing Mimikatz and Triggering Custom Alert  

### A step-by-step guide for building your very own SOC Automation Home Lab using VMWare and DigitalOcean cloud provider

In this module we will generate telemetry between our Wazuh agent and server. Additionally, we will create a custom rule that will trigger an alert on Wazuh Manager every time `mimikatz.exe` is detected on our agent.

## Generating Telemetry

### What is Telemetry

Telemetry refers to the process of collecting, transmitting, and analyzing data regarding the performance and activity of the Wazuh infrastructure and the endpoints it monitors. This data includes **security events**, operational metrics, and other relevant information essential for maintaining and optimizing the system's functionality.

### Wazuh Agent Log Configuration

To ensure Wazuh can detect any activity related to **mimikatz**, we need to modify the `ossec.conf` file, which is the main configuration file for Wazuh.

To do this, navigate to `C:\Program Files (x86)\ossec-agent` and open `ossec.conf`.

> Backup the `ossec.conf` file before making any changes. Administrator rights are required to edit this file.
{: .prompt-warning }

![Image_001](/assets/img/soc_project/part5/001.png)

![Image_002](/assets/img/soc_project/part5/002.png)

The **Log Analysis** section specifies the logs that Wazuh will ingest. That said, we will need to add **Sysmon logs** in order to Wazuh detect mimikatz activity.

> We will leave active response and remove everything else, because we won't need them for this project.
{: .prompt-info }

To achive this, add the following lines to the Log Analysis section:

* **location**: Insert Sysmon's service full name which can be obtained from **Event Viewer**.

![Image_003](/assets/img/soc_project/part5/003.png)

![Image_004](/assets/img/soc_project/part5/004.png)

![Image_005](/assets/img/soc_project/part5/005.png)

![Image_006](/assets/img/soc_project/part5/006.png)

Save the changes and restart the Wazuh service.

![Image_007](/assets/img/soc_project/part5/007.png)

![Image_008](/assets/img/soc_project/part5/008.png)

![Image_009](/assets/img/soc_project/part5/009.png)

To verify that the Wazuh Manager is ingesting Sysmon logs, access the Wazuh Dashboard and navigate to `Modules > Security Events`. Searching for "sysmon" should yield some results.

![Image_010](/assets/img/soc_project/part5/010.png)

![Image_011](/assets/img/soc_project/part5/011.png)

## Downloading Mimikatz

Mimikatz is a tool used to extract sensitive information, such as passwords and credentials, from a system’s memory. To download mimikatz to our agent, we must **exclude the Downloads folder** from Windows Defender scans.

Go to `Windows Security > Virus & threat protection (you can Dismiss that message) > Manage Settings > Add or remove exclusions > Add an exclusion` and select the **Downloads** folder. 

![Image_012](/assets/img/soc_project/part5/012.png)

![Image_013](/assets/img/soc_project/part5/013.png)

![Image_014](/assets/img/soc_project/part5/014.png)

![Image_015](/assets/img/soc_project/part5/015.png)

![Image_016](/assets/img/soc_project/part5/016.png)

![Image_017](/assets/img/soc_project/part5/017.png)

![Image_018](/assets/img/soc_project/part5/018.png)

Now we can download mimikatz without it being blocked by Windows Defender. Download it [here][1]{:target="_blank"}.

> If you are using Firefox and it blocks the download, just select `allow download`. If you're using Chrome, go to `Settings > Privacy and security > Security` and select **No security** under **Safe Browing**.
{: .prompt-info }

![Image_019](/assets/img/soc_project/part5/019.png)

![Image_020](/assets/img/soc_project/part5/020.png)

Extract the `zip` file.

![Image_021](/assets/img/soc_project/part5/021.png)

![Image_022](/assets/img/soc_project/part5/022.png)

![Image_023](/assets/img/soc_project/part5/023.png)

With mimikatz on our host, execute it on a powershell terminal with administrator rights.

```powershell
# Starting Mimikatz
.\mimikatz.exe
```

![Image_024](/assets/img/soc_project/part5/024.png)

Next, to check if Wazuh logged our mimikatz use from our Agent, we can see that it dind't recorded any event.

![Image_0244](/assets/img/soc_project/part5/0244.png)

This occurs because Wazuh, by default, logs events **only when a rule or alert is triggered**.

## Changing Wazuh to Log Everything 

To ensure that Wazuh logs everything, including our mimikatz activity, we need to modify **Filebeat's config file** and the **ossec.conf file** on the **Wazuh server**.

Log into the Wazuh server via SSH and make the following changes to `ossec.conf`:

> Backup the `ossec.conf` file before making any changes.
{: .prompt-warning }

* **logall**: Change it to yes.
* **logall_json**: Change it to yes.

![Image_025](/assets/img/soc_project/part5/025.png)

![Image_026](/assets/img/soc_project/part5/026.png)

With this modifications, Wazuh will archive all logs in the "**/var/ossec/logs/archives**" folder.

Save the changes with `Ctrl+X` and restart the Wazuh Manager service.

![Image_027](/assets/img/soc_project/part5/027.png)

### Configuring Filebeat

Filebeat is used to collect, ship, and centralize logs from various sources. It reads log files, forwards them to a specified output (Logstash or Elasticsearch), and ensures that all log data is available for further analysis and processing.

To make sure Wazuh ingests these **archives** logs, we'll need to enable them on Filebeat's config file:

```bash
# Configuring Filebeat
nano /etc/filebeat/filebeat.yml
```

![Image_028](/assets/img/soc_project/part5/028.png)

Again, after saving the changes made, restart the service.

```bash
# Restarting Filebeat Service
systemctl restart filebeat
```

### Creating a New Index on Wazuh Manager

To search all logs, we need to create an index for archives, regardless if Wazuh triggers an alert or not.

To do this, go to Wazuh Manager Dashboard, select the hamburguer button and navigate to `Stack Management > Index Patterns > Create index pattern`.

![Image_029](/assets/img/soc_project/part5/029.png)

![Image_030](/assets/img/soc_project/part5/030.png)

Name the index, choose **timestamp** as the time field, and create the **Archives Index**.

![Image_031](/assets/img/soc_project/part5/031.png)

![Image_032](/assets/img/soc_project/part5/032.png)

Head back to **Discover** and select the new index to check if we're getting all logs.

![Image_033](/assets/img/soc_project/part5/033.png)

![Image_034](/assets/img/soc_project/part5/034.png)

To make sure it is working, rerun mimikatz on our Agent. 

![Image_035](/assets/img/soc_project/part5/035.png)

From **Event Viewer**, we can see mimikatz activity on sysmon events (**Event ID 1=proccess create**, we'll use this for our custom rule later)

![Image_036](/assets/img/soc_project/part5/036.png)

After a few seconds, if we search for **mimikatz** on our new index, we should get some hits.

![Image_037](/assets/img/soc_project/part5/037.png)

## Creating an Alert (Custom Rule)

Our next step is to create a custom rule that triggers an alert when mimikatz is detected. For this, we will use the `data.win.eventdata.originalFileName` parameter (we can see its value on our previous mimikatz event in Wazuh).

![Image_038](/assets/img/soc_project/part5/038.png)

This field contains the original name of a file involved in an event. This way, if an attacker **renames mimikatz**, the rule will still be **triggered and an alert will be created**. 

To create a custom rule, head back to the Wazuh Manager dashboard and go to `Management > Rules > Manage rules files`.

![Image_039](/assets/img/soc_project/part5/039.png)

![Image_040](/assets/img/soc_project/part5/040.png)

Here we are presented with the **Wazuh ruleset**. However, our focus is on Sysmon rules, specifically those targeting **Event ID 1**.

![Image_041](/assets/img/soc_project/part5/041.png)

![Image_042](/assets/img/soc_project/part5/042.png)

These built-in Sysmon rules in Wazuh target Event ID 1, and we'll use them as a reference to create our custom rule.

Next, select `Custom rules` and edit the **local_rules.xml** file. 

![Image_043](/assets/img/soc_project/part5/043.png)

![Image_044](/assets/img/soc_project/part5/044.png)

Below the default rule, insert our custom rule:

> Make sure the indentation is correct!
{: .prompt-warning }

```xml
  <rule id="100002" level="15">
    <if_group>sysmon_event1</if_group>
    <field name="win.eventdata.originalFileName" type="pcre2">(?i)mimikatz\.exe</field>
    <description>Mimikatz Usage Detected</description>
    <mitre>
      <id>T1003</id>
    </mitre>
  </rule>
```

* Custom rule IDs start at 100000, in this case, ours will be 100002. 
* The level ranges up to 15, with higher numbers indicating greater severity.
* For the field name, we specify `win.eventdata.originalFileName` (which is case sensitive) and use `mimikatz.exe` as the value. 
* Additionally, we include the **MITRE ATT&CK** ID [T1003][2]{:target="_blank"}, which refers to **Credential Dumping**.

Save the changes and when prompted to restart Wazuh, press `Confirm`.

![Image_045](/assets/img/soc_project/part5/045.png)

![Image_046](/assets/img/soc_project/part5/046.png)

### Testing

To check if our custom rule is working as intended, we will rename mimikatz.exe to something else, in this case we changed it to **notepad.exe**.

![Image_047](/assets/img/soc_project/part5/047.png)

After starting "notepad.exe", head back to the `Security Events` on Wazuh Manager to see if it gets triggered.

![Image_048](/assets/img/soc_project/part5/048.png)

![Image_049](/assets/img/soc_project/part5/049.png)

As we can see, our renamed mimikatz was **sucessfully detected by our custom rule**.

## Next Steps

In the next and final module, we will automate some steps with **Shuffle** SOAR features.

[1]: https://github.com/gentilkiwi/mimikatz/releases
[2]: https://attack.mitre.org/techniques/T1003/