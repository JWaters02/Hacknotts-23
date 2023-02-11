# Hacknotts-23

## Problems

### Problem 1
Write a program to check if two strings are anagrams of each other.

*Example 1:*
    - s1: "listen"
    - s2: "silent"
    - returns: true

*Example 2:*
    - s1: "yesterday"
    - s2: "today"
    - returns: false

*Template code:*
```python
def is_anagram(s1, s2):
    # Your code here
    return False
```

### Problem 2
Write a program to check if a string is a palindrome.

*Example 1:*
    - input: "racecar"
    - returns: true

*Example 2:*
    - input: "hello"
    - returns: false

*Template code:*
```python
def is_palindrome(input):
    # Your code here
    return False
```

### Problem 3
You've been charged £x.xx for a taxi ride, but you only have a £x note. What is the minimum number of coins the taxi driver can give you?

There are only 8 coins in the UK: 1p, 2p, 5p, 10p, 20p, 50p, £1, £2.

There are only 5 notes in the UK: £5, £10, £20, £50, £100.

*Example 1:*
    - cost: 5.83
    - note: 10
    - returns: 5

*Example 2:*
    - cost: 7.25
    - note: 10
    - returns: 4

*Template code:*
```python
def minimum_change(cost, note):
    # Your code here
    return 0
```

### Problem 4
Given a string, find the number of repeated characters, then return the character with the most repeats. 

If there are no repeats, return the first character. 

If there are multiple characters with the same number of repeats, return the first character with the most repeats.

*Example 1:*
    - input: "hello world"
    - returns: "l"

*Example 2:*
    - input: "hacker"
    - returns: "h"

*Examples 3:*
    - input: "hacknotts"
    - returns: "t"

*Template code:*
```python
def most_repeated(input):
    # Your code here
    return ""
```

### Problem 5
Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
    - Open brackets must be closed by the same type of brackets.
    - Open brackets must be closed in the correct order.
    - Every close bracket has a corresponding open bracket of the same type.

*Example 1:*
    - input: "()"
    - returns: true

*Example 2:*
    - input: "([]){()}}"
    - returns: false

*Template code:*
```python
def brackets_valid(input):
    # Your code here
    return False
```

### Problem 6
Given an array of integers, return the number of permutations of the array where the sum of the first half of the array is greater than the sum of the second half of the array.

The input array will always have an even number of elements.

*Example 1:*
    - input: [1, 2, 3, 4]
    - returns: 2

*Example 2:*
    - input: [1, 1, 3, 6]
    - returns: 4

*Template code:*
```python
from itertools import permutations

def count_permutations(input):
    # Your code here
    return 0
```