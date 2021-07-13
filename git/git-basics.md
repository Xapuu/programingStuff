# Who should read this

This article has as it's target to familiarize the readers about everything they need know about **Version Control Systems** and `git`, so when you dear readers had completed this article you will be able to brag about your git knowlege, commit push and rebase with confidence and help your colleagues with their git struggles, while sounding smart.

In this article I will try to describe chronologically the reason for the invention of the **Version Control Systems** and their development, and also dive a bit in some workflows related to the usage of `git`, so brace yourself for a lot of text and no images :D

# The problem of file management

Everyone that has ever worked with digital data at some point ends in the position where on their desktop they have folders such as `${file}` `${file}_final` `${file}_final_final` `${file}_final_final_for_real_this_time` and so on. The reason for that is probably because you weren't sure if your edits over the data might ruin/corrupt the initial file, or because you edited your files on different machines and at some point you have to retrieve the file to your main machine, where you end up with two files with the same name, that enforces you to rename one of the copies and so on.

To face this issue most people at some point introduce in their files some kind of naming conventions, for example one such strategy is adding a date of the last edit in the file-name `${file}2020.10.04` as a suffix, which works fine and is kind of a straightforward file management solution, but still there is the issue data multiplication on your machine which has been a great problem in the past when the hardware storage was measured in MB instead of TB.

# Version Control Systems

Version Control Systems /VCS/ to the rescue

A VCS is such system that enables the user to have a single instance of a file, while also empowering the user to have the ability to access all previous versions of the mentioned file. In this context a file version is the state of a file when the user commands the VCS to create a new version (you can view this as saying to the VCS explicitly to save your file at it's current state).

As we know back in the most of the hardware was in the possession of programmers, so it won't be a surprise that the first such tool was targeted at the code segment, the tool was calle `Source Code Control System` /SCCS/ and it's purpose was to manage different versions (revisions) of the state of files containing code. SCCS was originally developed at `Bell Labs` in 1972 in `SNOBOL4` (you can think about this as an old programming language) by **Marc Rochkind** for **IBM Systems370** (you can think about it as a really old computer), later on in 1973 **Marc Rochkind** rewrote the same program in `C` to work under `UNIX`. So the birth of the first real usable version of VCS can be noted as 1973 

The way that SCCS works is by creating a sub-directory folder named SCCS, which stores the initial version of all files, and upon edit and "save" of the files inside the root directory a delta table inside the same SCCS folder is being updated.

"The delta table itself on a high level is a table that keep tracks of all differences between different version of the files"

By using such delta table to track only the changes of file, the problem of data multiplication is being resolved, as on the hard-drive only a signle instance of each file in the folder is being stored and a record of the changes, instead of storing the whole files on each save (upon creating new version)





//problem 2 But still there is the issue data multiplication on your machine, which now days can seem negligible with hardware that has gigabytes of storage, but in the past this was quite an issue, as the older hardware had less capabilities. 

Version Control Systems to the rescues

# Version Control Systems

Version Control System /VCS/ is each system that strives to enable multiple 


On a high level a Version Control System /VCS/ is a system that helps you to manage different version of different file, where the differences are expressed in the differences applied to the same time during a period of time. So if you never had to collaborate with different in the same file you might not see the need of it.

# Chapter I VCS /Version Control Systems/ 


// First version control system SCSS : https://en.wikipedia.org/wiki/Source_Code_Control_System
// RCS vs SCCD : http://sccs.sourceforge.net/sccs_vs_rcs.html

3 phases


SCSS
https://en.wikipedia.org/wiki/Source_Code_Control_System

RCS
https://en.wikipedia.org/wiki/Revision_Control_System


SCM
https://en.wikipedia.org/wiki/Software_configuration_management


History of RCS
https://en.wikipedia.org/wiki/Comparison_of_version-control_software#History_and_adoption

VC
https://en.wikipedia.org/wiki/Version_control


Some book on the topic
https://ericsink.com/vcbe/html/history_of_version_control.html


https://en.wikipedia.org/wiki/Distributed_version_control

https://initialcommit.com/blog/Technical-Guide-VCS-Internals


https://initialcommit.com/blog/Technical-Guide-VCS-Internals#rcs


https://www.ibm.com/docs/en/aix/7.1?topic=concepts-source-code-control-system

http://sccs.sourceforge.net/

https://en.wikipedia.org/wiki/Delta_encoding
# Git history









# Git overview


# Git basic structure / how does git work


# Git getting started

// Git global config

// ssl authentication

// creating/cloning our first repository

# Git branching
// Creating branches
// Deleting branches
// Looking for merged branches
// 

# Git stashing
// Why we need stashes
// How to create named stash
// Stash apply / pop / drop
// !! stashes are local for the machine
# Rebasing and Resting


# What to do when we mess up

// Reflog
// Cherry picking
// Force pusing
// 



# Resources 