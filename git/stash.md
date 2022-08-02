---
title: Git stash for newbies
published: true
description: Usecases for stashing in your day to day work
tags: git, programming, beginners, codenewbie
//cover_image: https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Git-logo.svg/640px-Git-logo.svg.png
---
## Stashing like a pro

Given that we are using git in a perfect world, we as developers have all the time in the world to checkout our new feature branch, complete all our work related to the feature, without having to multitask, without jumping all the time in emergency meetings, hot-fixing stuff and helping out with the issues of our colleagues, but unfortunately, we are not living in such a perfect world.

Often times when we are switching between different tasks, hopping from branch to branch when we had already written some code, and in those situations, we have to save our progress somehow so that we can continue later. Usually, we are creating different "WIP: refactoring stuff" like commits, and not once or twice do such commits stay forever in our git history. This happens especially in situations where we are part of a team, where the collaborators are far from being power git users, and this is the reality, it is not a horror story that happens only in other companies, at least from my perspective I have seen such commits in several different companies during my experience.
So how can we fix this, one way is adopting the not so widespread feature called git-stash in our day-to-day work. 
The point of this article will be to explain in plain English how and when to use this feature and hopefully optimize your day-to-day work.

## What are stashes


The stashes are a way to store our changes in separate local storage, that can be accessed on-demand whenever the need arises. Let's give a simple example about a use case where the stashes can help you.

### Basic use case

For example when we are in a situation where we are debugging some code and we are putting console.log-s or echo-s here and there, usually we don't want to have those in our commits, but our friend Jhon Doe wants us to help him out with debugging something critical in another branch, then we have few options either make commit and switch the branch so we can join his bug hunt or clone the repo in a separate place and then dive in the debugging process.

The option with committing code with log commands and funny commit message is not a desirable one as we already mentioned, but the other option with having a new clone of the repo is obviously an overkill :D, so the best thing we can do is stash our changes like so:

```
git stash
```

That's it just like magic all changes that we had made locally are stashed and stored in a separate place, that only exists on our machine in the current git project.

In order to see the changes that we had stashed, are stashed for real we can use the `git stash list` command, this will show all our current stashes, if you have no previous stashes, the `git stash list` will show something like the following, where the `WIP on {yourBranchName}: hash` is the default name that git will assign to your stash if nothing is specified, followed up by the hash of the branch

```
stash@{0}: WIP on {yourBranchName}: f136dae {the last commit on the branch before stashing}
```

Whenever you finish your side job, you can just return to your starting branch and re-apply the changes, as simple as just doing

```
git stash pop
```

This will re-apply the last stashed changes and remove the code that was stashed from your "secret storage space", keep in mind that the stash is shared between all your branches, so there is the possibility to `pop` it in the wrong branch.

Keep in mind that if you want to stash files that are not tracked (e.g. file that is newly created in this commit), we should stash them by using the `git stash -a` command, where `-a` stands for all.

### Bit more complex use case

The basic example above is pretty simple, its purpose is to give you a glimpse of what you can achieve by using stashes, Let's explore a bit more complex examples where we need multiple stashes.

A real example from my experience, for long-living stash, was the need to apply specif for my machines `package.json` changes, that should never go to the remote git instance because potentially would've messed the default configuration, on which different automation and stuff depend and I needed that configuration for all branches on which I work. 

So here is the recipe

```
git stash push ./package.json -m myMagicConfig

```
After that, if you list your stash with the `git stash list` you are supposed to see something like so

```
stash@{0}: On {branchName}: myMagicConfig
```

This time we can see our message instead of a hash with the last commit, the other interesting thing that is worth mentioning is the `stash@{0}` the number in the braces is the index of the stash, the stash storage work just like a stack, so your latest stash will always be with index 0.

In the example that we are going through, the usage of the `git stash pop` is not the best one, because as we already mentioned the `pop` command will remove the entry from the stash, which means that we will be able to use it only in one place, so what can we do now? Go go `git stash apply` to the rescue.

```
git stash apply {index}
```

This command will re-apply the changes related to the {index} from the stash, without removing the data itself from the stash.


### Bonus


The next command will remove entry staying at specific {index} from your stash

```
git stash drop {index}
```


In the cases where you are abusing your stash, have hundreds of references there and you can't find the thing you are looking for, you can combine the `git stash list` command with `grep` and search by the message you left in the stash

```
git stash list | grep {message}
```

The last goodie is the clear command, which will drop all your stashes

```
git stash clear
```

### Final notes

You can read the full manual here [stash(1)](https://git-scm.com/docs/git-stash)

I hope this article helped you to learn something new, or if you are from the git master race, at least was enjoyable and refreshed some of your git knowledge, please share it with all you think might be needing it and help me raise the global git awareness :D 

