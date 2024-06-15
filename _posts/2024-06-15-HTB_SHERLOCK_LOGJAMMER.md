---
title: HTB Sherlock - Logjammer Walkthrough
date: 2024-06-15 04:00:00 -500
categories: [walkthrough,htb-sherlock]
tags: [htb,sherlock,walkthrough]
image: /assets/img/htb/logjammer/emblem.png
---

After tackling some HTB boxes during seasons 3 and 4, I decided to dive into blue team challenges.

In this post, I will share the steps I took to complete the [Logjammer][1]{:target="_blank"} Sherlock.

# Info

In this entry-level digital forensics and incident response (DFIR) challenge, Forela-Security, a renowned consultancy, has presented you with a technical assessment to evaluate your proficiency in Windows Event Log Analysis. As a potential junior DFIR consultant, your task is to scrutinize, interpret, and report on the specific event logs they have provided. This scenario puts your understanding of Windows Event IDs, your ability to identify and interpret noteworthy security events, and your skills in effectively reporting your findings, to the test. This practical assessment mirrors real-world tasks you might face in a DFIR role, offering a realistic insight into the job while showcasing your abilities to Forela-Security.

## Scenario

> *You have been presented with the opportunity to work as a junior DFIR consultant for a big consultancy. However, they have provided a technical assessment for you to complete. The consultancy Forela-Security would like to gauge your Windows Event Log Analysis knowledge. We believe the Cyberjunkie user logged in to his computer and may have taken malicious actions. Please analyze the given event logs and report back.*

We are given a `logjammer.zip` archive with some event logs. The password is `hacktheblue`.

After extracting the zip file, we are presented five different event logs:

* **System** - Captures system-level events
* **Windows Defender-Operational** - Documents the activities and status of Windows Defender
* **Windows Firewall-Firewall** - Logs firewall-related events
* **Powershell-Operational** - Records of PowerShell activity on the system
* **Security** - Records related to security events on the system

![Files](/assets/img/htb/logjammer/FILES.png)

# Results

> We'll be using Windows Event Log Viewer from a isolated VM created earlier.
{: .prompt-info }

## Task 1

> *When did the cyberjunkie user first successfully log into his computer? (UTC)*

As we learned in our SOC project, successful login attempts have the event ID 4624. Knowing this, we filtered the logs from `Security.evtx` for **4624** events and the word **cyberjunkie** (user). After reviewing the results, we found that the first successfull login occured at *2023-03-27T14:37:09.8798913Z*.

![Task_01](/assets/img/htb/logjammer/a1_001.png)

**Answer**: *27/03/2023 14:37:09*

## Task 2

> *The user tampered with firewall settings on the system. Analyze the firewall event logs to find out the Name of the firewall rule added?*

Since the question is related to Firewall settings, we looked into the logs from `Windows Firewall-Firewall.evtx`. After a quick google search, we filtered for events with the ID [2004][2]{:target="_blank"}, which indicates that a rule has been added to the Windows Firewall exception list. Reviewing the results, we saw three logs after 27/03/2023 14:37:09, with the last one being the most suspicious and likely the answer.

![Task_02-1](/assets/img/htb/logjammer/a2_001.png)

![Task_02-2](/assets/img/htb/logjammer/a2_002.png)

**Answer**: *Metasploit C2 Bypass*

## Task 3

> *Whats the direction of the firewall rule?*

Looking at the XML details from the firewall rule added, the direction value is **2**. After asking ChatGPT, we found that the value 2 equals to **Outbound** traffic.

![Task_03-1](/assets/img/htb/logjammer/a3_001.png)

![Task_03-2](/assets/img/htb/logjammer/a3_002.png)

**Answer**: *Outbound*

## Task 4

> *The user changed audit policy of the computer. Whats the Subcategory of this changed policy?*

The event log for changes to audit policies is event ID [4719][3]{:target="_blank"}. After filtering for 4719 events in `Security.evtx`, we found only one result with the subcategory "Other Object Access Events".

![Task_04-1](/assets/img/htb/logjammer/a4_001.png)

**Answer**: *Other Object Access Events*

## Task 5

> *The user "cyberjunkie" created a scheduled task. Whats the name of this task?*

The event log for created scheduled tasks is event ID [4698][4]{:target="_blank"}. We only got one result after applying the filters on `Security.evtx`, revealing that the task name is "HTB-AUTOMATION".

![Task_05-1](/assets/img/htb/logjammer/a5_001.png)

**Answer**: *HTB-AUTOMATION*

## Task 6 & 7

> *Whats the full path of the file which was scheduled for the task?*

> *What are the arguments of the command?*

After reviewing the XML details from the scheduled task creation log, we identified the full path of the file from the command "C:\Users\CyberJunkie\Desktop\Automation-HTB.ps1", as well as the argument value. 

![Task_06+07-1](/assets/img/htb/logjammer/a6+7_001.png)

**Answer (Task 6)**: *C:\Users\CyberJunkie\Desktop\Automation-HTB.ps1*

**Answer (Task 7)**: *-A cyberjunkie@hackthebox.eu*

## Task 8 & 9

> *The antivirus running on the system identified a threat and performed actions on it. Which tool was identified as malware by antivirus?*

> *Whats the full path of the malware which raised the alert?*

After reviewing [Microsoft's documentation about Defender logs][5]{:target="_blank"}, we should filter for event ID **1116** (*The antimalware platform detected malware or other potentially unwanted software.*) to check for detected threats, in the `Windows Firewall-Firewall.evtx` file. 
We got two results from it for the file `SharpHound-v1.1.0.zip`, indicating that the tool identified by Defender was **SharpHound**.

![Task_08+09-1](/assets/img/htb/logjammer/a8+9_001.png)

**Answer (Task 8)**: *Sharphound*

**Answer (Task 9)**: *C:\Users\CyberJunkie\Downloads\SharpHound-v1.1.0.zip*

## Task 10

> *What action was taken by the antivirus?*

Event ID 1116 indicates that Defender detected malware, while event ID **1117** shows the action Defender performed to protect the machine from the malware. After filtering for the latter, we found two relevant results with the value "2", which indicated that the file was **quarantined**. 

![Task_10-1](/assets/img/htb/logjammer/a10_001.png)

![Task_10-2](/assets/img/htb/logjammer/a10_002.png)

**Answer**: *Quarantine*

## Task 11

> *The user used Powershell to execute commands. What command was executed by the user?*

The event log for executed Powershell commands is event ID [4104][6]{:target="_blank"}. After filtering for it in `Powershell-Operational.evtx`, we got three results, two of them with the value "prompt" and the other with the command "Get-FileHash -Algorithm md5 .\Desktop\Automation-HTB.ps1".

![Task_11-1](/assets/img/htb/logjammer/a11_001.png)

**Answer**: *Get-FileHash -Algorithm md5 .\Desktop\Automation-HTB.ps1*

## Task 12

> *We suspect the user deleted some event logs. Which Event log file was cleared?*

From **MITRE** sub - technique [T1070.001][7]{:target="_blank"} (*Indicator Removal: Clear Windows Event Logs*), we should look for Event ID **1100** and **1102** in Security logs and Event **104** in System logs to detect cleared Windows logs. The first didn't generate any relevant results, but the latter gave us one result that revealed that the attacker deleted the firewall event "Microsoft-Windows-Windows Firewall With Advanced Security/Firewall".

![Task_12-1](/assets/img/htb/logjammer/a12_001.png)

**Answer**: *Microsoft-Windows-Windows Firewall With Advanced Security/Firewall*

# Timeline

| Time | Description | Log | Event ID |
| :------: | :--- | :--- | :---: |
| 2023-03-27 14:37:09 | User "cyberjunkie" first login | `Security.evtx` | 4624 |
| 2023-03-27 14:38:32 | User "cyberjunkie" second login | `Security.evtx` | 4624 |
| 2023-03-27 14:42:34 | SharpHound zip file detected by Defender | `Windows Defender-Operational.evtx` | 1116 |
| 2023-03-27 14:42:48 | SharpHound zip file quarantined by Defender | `Windows Defender-Operational.evtx` | 1117 |
| 2023-03-27 14:44:43 | Firewall rule created to allow outbound traffic from Metasploit | `Windows Firewall-Firewall` | 2004 |
| 2023-03-27 14:50:03 | System audit policy changed | `Security.evtx` | 4719 |
| 2023-03-27 14:51:21 | Scheduled task created | `Security.evtx` | 4698 |
| 2023-03-27 14:58:33 | Used `Automation-HTB.ps1` | `Powershell-Operational` | 4104 |
| 2023-03-27 15:01:56 | Firewall event logs deleted | `System.evtx` | 104 |

# Conclusion

That was the Logjammer Sherlock! Although it was one of the easier challenges, it provided a great opportunity to learn and recall some key Windows Event IDs that will be fundamental for future challenges.

![Pwned](/assets/img/htb/logjammer/pwned.png)

[1]: https://app.hackthebox.com/sherlocks/Logjammer
[2]: https://kb.eventtracker.com/evtpass/evtPages/EventId_2004_Microsoft-Windows-WindowsFirewallwithAdvancedS_65673.asp
[3]: https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/event.aspx?eventid=4719
[4]: https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/event.aspx?eventid=4698
[5]: https://learn.microsoft.com/en-us/defender-endpoint/troubleshoot-microsoft-defender-antivirus
[6]: https://www.myeventlog.com/search/show/980
[7]: https://attack.mitre.org/techniques/T1070/001/