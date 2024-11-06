这是一个Bulls and Cows游戏，俗称猜数字游戏。请你猜一个四位数字，没有重复数字。电脑会返回如下内容：

Bulls: x, Cows: y

意思是有x个数字，其数值和位置都猜中；另有y个数字，仅数值正确，位置不正确。请用最少得次数才对。

本程序与其他程序不同的是，电脑并不实现生成确定的秘密四位数，而是动态更新可以选择的数字，并且总是给出最困难的响应。比如：

```
I have 5040 possible 4-digit secret numbers for choice. Enter your guess:
1234
Bulls: 0, Cows: 1
```
意思就是电脑有5040个可以选择的数字，玩家猜测“1234”，结果仅有1个Cow。看看你需要多久能得到4个bulls!

---

English version:

This is a "Bulls and Cows" game, commonly known as the "Guess the Number" game. Your goal is to guess a four-digit number without any repeated digits. The computer will respond with the following information:

**Bulls:** x, **Cows:** y

This means that **x** digits are correct in both value and position, while **y** digits are correct in value but in the wrong position. Your objective is to guess the number with the fewest possible attempts.

Unlike other versions, this program does not generate a fixed secret four-digit number in advance. Instead, it dynamically updates the set of possible numbers and always gives the most challenging response. For example:

```
I have 5040 possible 4-digit secret numbers to choose from. Enter your guess:
1234
Bulls: 0, Cows: 1
```

This means the computer has 5040 numbers to choose from, and the player guessed "1234," resulting in only 1 Cow. Let's see how long it takes you to achieve 4 Bulls!
