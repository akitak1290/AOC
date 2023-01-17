import os

sum1 = 0
sum2 = 0

dir = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

with open(os.path.join(dir, 'input.txt')) as file:
    for line in file:
        if line != '\n':
          sum2 += int(line)
        else:
          if sum2 > sum1:
            sum1 = sum2
          sum2 = 0

if sum2 > sum1:
  sum1 = sum2

print(sum1)
