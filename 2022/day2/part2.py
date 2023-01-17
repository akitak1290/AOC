import os

# A Rock    1
# B Paper   2
# C Scissor 3

# lost X 0
# draw Y 3
# win  Z 6

# Rock > Scissor and Rock < Paper
# Paper > Rock and Paper < Scissor
# Scissor > Paper and Scissor < Rock

# 9 outcomes =>
# A > C
# A < B
# A == A
# B > A 
# B < C
# B == B
# C > B
# C < A 
# C == C

# A > C
# B > A
# C > B

# For each line, compare two characters and calculate the sum

dir = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

with open(os.path.join(dir, 'input.txt')) as file:
  sum = 0
  for line in file:
    enemy_move = line[0]
    outcome = line[2]
    match enemy_move:
      case 'A':
        if outcome == 'X':
          sum += 3
        elif outcome == 'Y':
          sum += (3 + 1)
        else:
          sum += (6 + 2)
      case 'B':
        if outcome == 'X':
          sum += 1
        elif outcome == 'Y':
          sum += (3 + 2)
        else:
          sum += (6 + 3)
      case 'C':
        if outcome == 'X':
          sum += 2
        elif outcome == 'Y':
          sum += (3 + 3)
        else:
          sum += (6 + 1)
  print(sum)