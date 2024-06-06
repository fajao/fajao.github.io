---
layout: default
title: OSCP Review & Tips (2024)
date: 2024-06-04 12:00:00 -500
categories: [certifications,oscp]
tags: [oscp,exam,tips]
---

# OSCP Review & Tips (2024)

A couple of months ago, I attempted to pass the Offsec Certified Professional (OSCP). In this article, I will discuss my personal OSCP journey and some tips you can use to help yourself pass the exam as well.

![OSCP certificate](/assets/img/certifications/oscp_cert.png)

<figcaption>OSCP certificate</figcaption>
<figure class="center">
  <img src="/assets/img/certifications/oscp_cert.png" alt="OSCP certificate">
  <figcaption>OSCP certificate</figcaption>
</figure>

## OSCP Exam

The Offensive Security Certified Professional (OSCP) certification is one of the most respected and sought-after credentials in the cybersecurity field. The OSCP exam gives you 23 hours and 45 minutes to hack into 6 target machines (3 stand-alone machines and 1 Active Directory environment that contains 2 hosts and 1 domain controller). Each machine compromised grants you an amount of points, and you need at least 70 points to pass.

<style>
  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
    padding: 8px;
  }

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>

| Machine | Points | Description |
| :------: | :---: | :--- |
| Stand-Alone | 20 | 20 pts from each stand-alone (10 pts for low privilege user + 10 pts for root) |
| AD Lab (1 DC + 2 hosts) | 40 | You need to compromisse the whole AD set. If you don’t get domain admin you won’t receive any points |
| | 10 | You receive 10 bonus points after completing at least 80% of the labs exercises in each module and submit 30 proof.txt from the challenge labs |

&nbsp;  

## Background

Before diving into the PEN-200 equipment, I finished the [PEH course from TCM Security][1] and had some exposure to CTFs from TryHackme and HackTheBox machines. Other than that, I had previously taken the [Mike Meyers][4] Network+ and Security+ courses.

&nbsp;  

## Preparation

After purchasing the Learn One bundle (which had a 20% discount off during November), I tackled the course materials to see if I would be ready for the exam in early 2024. I was actually planning on going to the PNPT first but I just couldn’t wait, so I shifted my focus towards the OSCP.

Even though I didn’t watch the videos, the course material was decent and well put. There were some modules that I think they could explore more, like the SQLi one, which made me search for alternative resources like HTB academy. The practical labs, especially the capstone exercises, were challenging and good practice to make sure we understood the module content.

The challenge labs are composed of 6 environments: 3 networks (Medtech, Relia and Skylark) and 3 mock exams (OSCP A/B and C), which have the same structure as the exam. After completing Medtech and Relia (never started Skylark because it’s beyond the scope of the OSCP exam), with a lot of hints and discord help, I approached the mock exams like an actual exam, where I would time each attempt and write a report after completing it. Of all the 3 challenges, I was only able to “pass” OSCP B, which made me ask if I would be able to succeed in the actual exam.

After getting my bonus points, I went for the [TJ Null’s list][2] and completed around 44 machines from PG Practice. Overall it was a good practice, even though some of the machines were broken.

![OSCP bonus points](/assets/img/certifications/oscp_bonus.png)

{:.image-caption}
*PEN-200 Dashboard*

&nbsp;  

## Exam Day

I scheduled my exam for 6 p.m. and had everything ready (snapshots, cheat sheets, water, food, identification, everything). The identification process started at 5:45 and for some reason I couldn’t share my second screen, even though I tested it the day before.

After dismounting my second monitor, I started the exam and my first step was to enumerate all the machines, starting with the AD and going to the stand-alones after.

In the first hour, I already had a foothold on the AD set but couldn’t escalate privileges. After 6 hours of reviewing all screenshots and enumerating the AD set again, I went for the stand-alones and was able to get a low privilege user, but again, I was unable to escalate to root. After some time, I decided that I needed some rest, so I went to ~~try to~~ sleep for the next 4 hours.  

![TheOffice MS kill myself](/assets/gifs/I_m_going_to_kill_myself_The_Office.gif)

After some terrible sleep, I started enumerating the first AD machine again and was able to finally escalate privileges and pivot to the other host. From there, it took me less than an hour to fully compromise the AD set.

With 60 pts (AD + stand-alone low user + bónus points), I took another break and after that I went for another stand-alone. There, I was able to compromise a low privilege user after 2 hours and got root access in the next 15 minutes.

Even though I already had enough points to pass, I tried to root the final standalone but without success (even though I’m pretty sure I was on the right track but unfortunately couldn’t breach it).

&nbsp;  

## Exam Tips

* Take breaks, do not underestimate the power of a short 10 minute break.
* Prepare your methodology. For the AD set, the mock exams are a good practice and for the stand-alones go with the PGP boxes. I developed my cheat sheet from [0xBEN structure][3].
* Treat the mock exams like a real exam attempt. With it, not only will you train your time management but you’ll also have the report format ready for when you go for the real thing.
* Take snapshots from your kali machine. The last thing you want is having to install a fresh Kali VM in the middle of the exam, without the tools you’re used to.
* Use and abuse ligolo and netexec.

&nbsp;  

## Conclusion

It was a long road and one I thoroughly enjoyed. I’m very proud of my exam results and that I passed on the first attempt. 

I am now determined to complete the CRTO from Zero-Point Security, let’s see how it goes!



![TheOffice MS and Dwight dancing](/assets/gifs/the-office-michael-scott.gif)

[1]: https://academy.tcm-sec.com/p/practical-ethical-hacking-the-complete-course
[2]: https://docs.google.com/spreadsheets/u/1/d/1dwSMIAPIam0PuRBkCiDI88pU3yzrqqHkDtBngUHNCw8/htmlview#
[3]: https://benheater.com/my-ctf-methodology/
[4]: https://www.udemy.com/user/mike-meyers/
