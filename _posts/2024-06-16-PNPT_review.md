---
title: PNPT Review & Tips (2024)
date: 2024-06-17 07:00:00 -500
categories: [certifications,pnpt]
tags: [pnpt,exam,tips,certifications]
image: /assets/img/certifications/0_blHJaVCIcj4_PP0W.png
---

<style>
.float-right {
    float: right;
    margin-left: 15px; /* Adjust the margin as needed */
    margin-bottom: 15px; /* Adjust the margin as needed */
    max-width: 50%; /* Adjust the width as needed */
}
.clearfix::after {
    content: "";
    clear: both;
    display: table;
}
</style>

# PNPT Review and Tips (2024)

In this article, I will discuss my personal PNPT journey and some tips you can use to help yourself pass the exam.

## PNPT 

The [Practical Network Penetration Tester exam][1]{:target="_blank"} is a 5-day long practical exam with an additional 2-days to turn in a professionally written penetration test report. To obtain the PNPT certification, you need to:

* Perform Open-Source Intelligence (OSINT) to gather intel on how to properly attack the network
* Leverage their Active Directory exploitation skillsets to perform A/V and egress bypassing, lateral and vertical network movements, and ultimately compromise the exam Domain Controller
* Provide a detailed, professionally written report
* Perform a live 15-minute report debrief in front of our assessors, comprised of all senior penetration testers

For $499 you will be given access to their training material and an exam voucher with a free retake. The exam voucher and training material access **DOES NOT EXPIRE**!

> While TCM Security raised their prices in April 2024, they remain a fantastic resource compared to competitors, offering amazing content and practical experience.
{: .prompt-info }

## Preparation

<div class="clearfix">
    <img src="/assets/img/certifications/046.png" alt="TCM_Courses" class="float-right">
    The training material is composed of five TCM courses: Practical Ethical Hacking (PEH), Windows and Linux Privilege Escalation for beginners, External Pentest Playbook and Open-Source Intelligence (OSINT) Fundamentals.  

    I started with the Practical Ethical Hacking (PEH) material in September 2023 and completed the other courses after finishing the OSCP. Overall, I appreciate their video format because not only it makes you watch it a bunch of times just to take notes, but it is also very easy to follow.
</div> 

## Exam Structure

> PNPT is not a CTF type exam like OSCP and there are **NO FLAGS**!
{: .prompt-warning }

After [scheduling your exam][2]{:target="_blank"}, you'll receive an email with the OpenVPN file and the rules of engagement (RoE). Next, after carefully reading them, you're required to start performing OSINT against your target and extract useful information from public-facing assets. Once you've gathered all the info you need on the target, you'll have to identify an entry point to the external network. Once inside the perimeter, you have to work out how to gain access to the internal network and start pivoting through machines, with your goal being to compromise the DC. After compromising the domain admin, you will need to perform a persistence technique to ensure future access to the domain.

### First Attempt

I was able to fully compromise the domain in the first 72 hours, which left me with time to take all the screenshots and prepare my report before ending my access to the environment. After completing and submitting my report (I used [TCM's template][3]{:target="_blank"}), I started to prepare a powerpoint presentation with all my findings for the debrief. 

![the_office_ppw_gif](/assets/img/certifications/ppw_gif.gif)

This part was actually hard because you only have 15 minutes to present your results and there are a lot of information to talk about.

> You don't need a Powerpoint presentation. The majority of people just review their report!
{: .prompt-info }  

Unfortunately, after receiving my exam update, I was informed that I failed the report stage because of a lack of information/screenshots and looking back, I understand why. I just enumerated the steps I took to compromise the domain admin and only presented one or two screenshots to prove those finding. 

> Don't just list steps, explain your thought process and include screenshots. While the template is a good starting point, tailor it to your findings.
{: .prompt-tip } 

Not gonna lie, I was very mad because not only I had enough time to prepare a proper report, but also had all screenshots needed in my notes, just didn't included them in the report.  

![the_office_crying_gif](/assets/gifs/crying.gif)

### Second Attempt

After a couple of days, I started my second attempt, went through all the steps of the engagement and took additional screenshots to the ones I already had. Prepared my report with all the screenshots needed and successfully passed to the debrief stage.

![the_office_crying_gif](/assets/gifs/the-office-dwight-schrute.gif)

With my ID, presentation, webcam and mic ready, I joined the call with the TCM staff. It started with some quick identity verification and then they just listened to my presentation of every finding and recomendations. At the end of the call, they let me know I had passed and that my certificate would be issued shortly.

![PNPT certificate](/assets/img/certifications/pnpt_cert.png)

## Exam Tips

* **Prepare your methodology**. You can use [0xBEN structure][4]{:target="_blank"} as reference.
* **Take snapshots of your kali machine**. The last thing you want is having to install a fresh Kali VM in the middle of the exam, without the tools you’re used to.
* Use and abuse **ligolo and netexec**. 
* **Take breaks**, you have 5 days to fully compromise the AD set. Take your time and if you're stuck, just take a break. Do not underestimate the power of a short 10 minute break.
* **Document everything**: Take detailed notes and screenshots throughout the exam.
* Enumerate, enumerate, enumerate, enumerate and **ENUMERATE**!

## Final Toughts

The PNPT exam was a rewarding experience. The structure, from the RoE to the client debrief, realistically simulates a real-world penetration test (~~at least that's what I think it would look like xD~~). While I'm currently pursuing the [CRTO][5]{:target="_blank"} certification, TCM's new web pentesting certification ([PWPT][6]{:target="_blank"}) has piqued my interest, and I might explore it next.

![TheOffice MS and Dwight dancing](/assets/gifs/michael-scott-twirl.gif)

[1]: https://certifications.tcm-sec.com/pnpt/
[2]: https://exams.tcmsecurity.com/login
[3]: https://github.com/hmaverickadams/TCM-Security-Sample-Pentest-Report
[4]: https://benheater.com/my-ctf-methodology/
[5]: https://training.zeropointsecurity.co.uk/courses/red-team-ops
[6]: https://certifications.tcm-sec.com/pwpt/
