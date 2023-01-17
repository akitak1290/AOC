import os

# A X Rock    1
# B Y Paper   2
# C Z Scissor 3

# lost 0
# draw 3
# win  6

# Rock > Scissor and Rock < Paper
# Paper > Rock and Paper < Scissor
# Scissor > Paper and Scissor < Rock

# A > Z and       win
#   A == X        draw
#     else        lost
# B > X and       win
#   B == Y        draw
#     else        lost
# C > Y and       win
#   C == Z        draw
#     else        lost

# For each line, compare two characters and calculate the sum

dir = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

with open(os.path.join(dir, 'input.txt')) as file:
  sum = 0
  for line in file:
    enemy_move = line[0]
    my_move = line[2]
    match enemy_move:
      case 'A':
        if my_move == 'Z':
          sum += 3
        elif my_move == 'X':
          sum += (3 + 1)
        else:
          sum += (6 + 2)
      case 'B':
        if my_move == 'X':
          sum += 1
        elif my_move == 'Y':
          sum += (3 + 2)
        else:
          sum += (6 + 3)
      case 'C':
        if my_move == 'Y':
          sum += 2
        elif my_move == 'Z':
          sum += (3 + 3)
        else:
          sum += (6 + 1)
  print(sum)