---
title: SOC Automation Project - Part 6 (Final)
date: 2024-06-11 12:00:00 -500
categories: [projects,SOC automation]
tags: [soc,build,soar,siem,xdr,edr,wazuh,shuffle,thehive]
image: /assets/img/soc_project/part1/soc_build.png
---

# Building a SOC automation Home Lab: Part 6 - Shuffle Integration 

### A step-by-step guide for building your very own SOC Automation Home Lab using VMWare and DigitalOcean cloud provider

In this final module of our series, we dive into leveraging **Shuffle's SOAR capabilities** to automate crucial tasks within our Security Operations Center (SOC). Our focus will be on integrating Wazuh with Shuffle to streamline alert handling, utilizing VirusTotal for threat intelligence, and integrating with theHive for efficient case management.

## Shuffle

Shuffle is an Open Source interpretation of SOAR. It aims to bring all the capabilities necessary to transfer data throughout an enterprise with plug-and-play Apps, making automation approachable for everyone.

To get started, visit [Shuffle][1]{:target="_blank"} and create an account. Once logged in, create a Workflow and name it.

![Image_001](/assets/img/soc_project/part6/001.png)

![Image_002](/assets/img/soc_project/part6/002.png)

In our workflow interface we will be able to add apps, triggers and variables that will enable us to automate some tasks.

First, drag a `Webhook` to our workflow and connect it to the `Change Me` button. The Webhook function is to **receive the alerts from Wazuh** into our workflow in Shuffle. 

![Image_003](/assets/img/soc_project/part6/003.png)

Next, make the following changes in the `Change Me` button:

* **Find Actions**: leave it as `Repeat back to me`.
* **Call**: Remove "Hello World" and select `+ Execution Argument`

![Image_004](/assets/img/soc_project/part6/004.png)

![Image_005](/assets/img/soc_project/part6/005.png)

This way, any alert received from our Webhook will repeat its content.

Save the changes and head back to Wazuh server SSH session to configure Wazuh.

## Getting Wazuh Alerts to Shuffle

In order to connect Wazuh with Shuffle we need to add an integration tag in the `ossec.conf` file. 

Open `ossec.conf` and add the following content:

```bash
# Configuring Wazuh
nano /var/ossec/etc/ossec.conf
```

> Make sure the indentation is correct and separate the Webhook_URI from the closing hook_url tag!
{: .prompt-warning }

```text
  <integration>
    <name>shuffle</name>
    <hook_url>"WEBHOOK_URI" <hook_url>
    <rule_id>100002</rule_id>
    <alert_format>json</alert_format>
  </integration>
```

![Image_006](/assets/img/soc_project/part6/006.png)

This configuration directs alerts related to **rule ID 100002** (Mimikatz Detected) to Shuffle.

Save the file and restart the Wazuh manager service.

![Image_007](/assets/img/soc_project/part6/007.png)

Before returning to Shuffle, rerun **notepad.exe (mimikatz)** on the Wazuh Agent to create an alert.

![Image_008](/assets/img/soc_project/part6/008.png)

In Shuffle, click on the Webhook and select `START`.

![Image_088](/assets/img/soc_project/part6/088.png)

Next, select `Show Executions` and there should be some events from Wazuh. When inspecting Execution Argument's content we can see that the alert is related to mimikatz. 

![Image_009](/assets/img/soc_project/part6/009.png)

![Image_010](/assets/img/soc_project/part6/010.png)

## IOC Enrichment

Now that Shuffle is receiving alerts from Wazuh, we can enrich the Indicators of Compromise (IOCs) from these alerts using apps like **VirusTotal** and **AbuseIPdb**.

In this case, let's check mimikatz reputation with VirusTotal by checking its SHA256 file hash. 

According to VT documentation, the format to obtain a file report is "**/api/v3/files/{id}**".

> For details on how to retrieve a file report from VirusTotal using their API, refer to the [VirusTotal API v3 documentation][2]{:target="_blank"}
{: .prompt-info }

Since our alert contains multiple hashes (SHA1, MD5, SHA256, IMPHASH), our initial step is to extract the SHA256 hash value using **Regex**. We'll modify the `Change Me` button accordingly:

* **Find Actions**: Change it to `Regex capture group`.
* **Input data**: Select the hashes value from Execution Arguments (`$exec.text.win.eventdata.hashes`).
* **Regex**: To only get SHA256 value use `SHA256=([A-Fa-f0-9]{64})` (we can use ChatGPT to help you with it).

![Image_011](/assets/img/soc_project/part6/011.png)

![Image_012](/assets/img/soc_project/part6/012.png)

![Image_013](/assets/img/soc_project/part6/013.png)

Next, test it to see if only the SHA256 hash value is received by selecting `Rerun Workflow`.

![Image_014](/assets/img/soc_project/part6/014.png)

Now that we have our hash, our next step is to integrate VirusTotal in the workflow and get file reports from it.

### VirusTotal Integration

First, authenticate to VirusTotal and copy its API key that will allow us to authenticate on Shuffle.

![Image_015](/assets/img/soc_project/part6/015.png)

Head back to Shuffle, drag the VirusTotal app to our workflow and complete the authentication process.

![Image_016](/assets/img/soc_project/part6/016.png)

![Image_017](/assets/img/soc_project/part6/017.png)

![Image_018](/assets/img/soc_project/part6/018.png)

Next, change the `Find Action` parameter to **Get a hash report** and the `Id` to the **regex value** we set before.

![Image_019](/assets/img/soc_project/part6/019.png)

![Image_020](/assets/img/soc_project/part6/020.png)

Save all modifications and rerun the workflow to see if it is working.

![Image_021](/assets/img/soc_project/part6/021.png)

![Image_022](/assets/img/soc_project/part6/022.png)

![Image_023](/assets/img/soc_project/part6/023.png)

Upon execution, VirusTotal successfully got the file report, giving us detailed information about the file reputation.

## TheHive Integration

Our next step, is to forward all these details to theHive to initiate alert creation for effective case management.

First, log into theHive web interface at `https://"theHive_IP":9000` and create a new organization where Shuffle alerts and information will be received.

To do this, click on the `+` sign, name the new organization and proceed with its creation.

![Image_024](/assets/img/soc_project/part6/025.png)

Following that, we will need to configure two users: one for accessing our organization to **monitor alerts** (`mydfir@test.com`) and another as a **service account** to provide an API key for authentication on Shuffle (`shuffle@test.com`).

Navigate to the new organization and select the `+` sign to add users.

* **Normal user**:
    * **Login**: mydfir@test.com
    * **Name**: mydfir
    * **Profile**: analyst

* **Service account**:
    * **Login**: shuffle@test.com
    * **Name**: SOAR
    * **Profile**: analyst

> When assigning permissions to service accounts, it's crucial to implement the Principle of Least Privilege (PoLP).
{: .prompt-warning }

![Image_026](/assets/img/soc_project/part6/026.png)

![Image_027](/assets/img/soc_project/part6/027.png)

![Image_028](/assets/img/soc_project/part6/028.png)

Complete the user configuration by setting a **password** for mydfir and **generating an API key** for shuffle.

To set a new password, go to `Preview > Set a new password > Confirm`.

![Image_029](/assets/img/soc_project/part6/029.png)

![Image_030](/assets/img/soc_project/part6/030.png)

![Image_031](/assets/img/soc_project/part6/031.png)

To generate the API key, go to `Preview > API Key > Create > Confirm`.

![Image_032](/assets/img/soc_project/part6/032.png)

![Image_033](/assets/img/soc_project/part6/033.png)

### Creating Alerts

Now that the organization and users are set up, return to Shuffle and drag the `theHive Edited` app into the workflow instance.

![Image_034](/assets/img/soc_project/part6/034.png)

Authenticate using the API key obtained from the shuffle user and configure the URL to **theHive's server IP**. 

![Image_035](/assets/img/soc_project/part6/035.png)

Connect theHive to VirusTotal and configure the following parameters: 

* **Find action**: Change it to `Create alert`.

> The next parameters are not required. The next values are from my configuration.  
{: .prompt-info }

* **Title**: Change it to `$exec.title` value from Execution Argument. 
* **Tags**: `["T1003"]`
* **Summary**: `Mimikatz detected on host: $exec.text.win.system.computer with the processor ID: $exec.text.win.system.processID and the command line: $exec.text.win.eventdata.commandLine`
* **Severity**: `2`
* **Type**: `internal`
* **Tlp**: `2`
* **Status**: `New`
* **Sourceref**: Change it to the rule ID.
* **Source**: `Wazuh`
* **Pap (Permissable Actions Protocol)**: `2`
* **Flag**: `False`
* **Description**: `Mimikatz detected on host: $exec.text.win.system.computer and user: $exec.text.win.eventdata.user`
* **Date**: Change it to the `utctime` value from Execution Argument.

![Image_036](/assets/img/soc_project/part6/036.png)

Save the changes and before testing the Workflow, create a firewall rule in DigitalOcean to **allow traffic to port 9000**. This will **enable Shuffle communications** with theHive server. 

![Image_037](/assets/img/soc_project/part6/037.png)

Finally, log into theHive web interface with mydfir credentials and rerun the Workflow. 

![Image_038](/assets/img/soc_project/part6/038.png)

![Image_039](/assets/img/soc_project/part6/039.png)

After refreshing theHive dashboard, we are able to see the alert and its content.

![Image_040](/assets/img/soc_project/part6/040.png)

![Image_041](/assets/img/soc_project/part6/041.png)

## Notifying Analyst via Email

Our final step involves setting up email notifications for every alert occurrence.

To implement this, add the `Email` app to the workflow instance in Shuffle and connect it with VirusTotal. Make the following adjustments:

* **Recipients**: Change it to your email address (we'll use [squarex][3]{:target="_blank"} disposable email feature)
* Change the **Subject** and **Body** to your liking. 

![Image_042](/assets/img/soc_project/part6/042.png)

![Image_043](/assets/img/soc_project/part6/043.png)

The final Workflow should look like this:

![Image_044](/assets/img/soc_project/part6/044.png)

Save the changes and rerun the workflow again.

![Image_045](/assets/img/soc_project/part6/045.png)

From Shuffle we can see that the email was sent. To confirm this, we can check squarex email inbox.

![Image_046](/assets/img/soc_project/part6/046.png)

![Image_047](/assets/img/soc_project/part6/047.png)

![Image_048](/assets/img/soc_project/part6/048.png)

With this step, our project is now **"complete"**. While this setup was simple and straightforward, the potential to create more sophisticated playbooks using Shuffle, integrating with tools like Cortex or MISP, is immense. 

## Final Thoughts

This project has been a rewarding journey, demonstrating the power and flexibility of open-source tools. Integrating Wazuh, theHive, and Shuffle has given me valuable hands-on experience and a deeper understanding that will be beneficial in future projects. Despite its simplicity, configuring, troubleshooting, and researching documentation throughout this lab setup have equipped me with essential skills that will be fundamental in my career. 

[1]: https://shuffler.io/
[2]: https://docs.virustotal.com/reference/file-info
[3]: https://sqrx.com/?utm_source=youtube&utm_medium=influencer&utm_campaign=canada&utm_term=mydfir&utm_content=soc&utm_id=launch_1223&sq_id=mydfir_yt