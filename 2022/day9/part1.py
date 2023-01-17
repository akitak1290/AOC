import os
import math

# / \ y
#  |
#  |
#  |
#  |
#  |
#  |
#  ---------------------> x
# [0, 0]

dir = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

with open(os.path.join(dir, 'input1.txt')) as file:
  head = [0, 0] # x, y
  head_path = []
  head_path.append(head)

  tail = []
  tail.extend(head)
  tail_path = set()
  tail_path.add(f'{head[0]}{head[1]}')

  for line in file:
    move = line.split()
    dis = int(move[1])

    prev = []
    match move[0]:
      case 'R':
        for i in range(dis):
          prev = []
          prev.extend(head)
          head[0] += 1
          head_path.append(head)
          if pow(tail[1] - head[1], 2) + pow(tail[0] - head[0], 2) > 2:
            tail_path.add(f'{prev[0]}{prev[1]}')
            tail = []
            tail.extend(prev)
      case 'L':
        for i in range(dis):
          prev = []
          prev.extend(head)
          head[0] -= 1
          head_path.append(head)
          if pow(tail[1] - head[1], 2) + pow(tail[0] - head[0], 2) > 2:
            tail_path.add(f'{prev[0]}{prev[1]}')
            tail = []
            tail.extend(prev)
      case 'U':
        for i in range(dis):
          prev = []
          prev.extend(head)
          head[1] += 1
          head_path.append(head)
          if pow(tail[1] - head[1], 2) + pow(tail[0] - head[0], 2) > 2:
              tail_path.add(f'{prev[0]}{prev[1]}')
              tail = []
              tail.extend(prev)
      case 'D':
        for i in range(dis):
          prev = []
          prev.extend(head)
          head[1] -= 1
          head_path.append(head)
          if pow(tail[1] - head[1], 2) + pow(tail[0] - head[0], 2) > 2:
              tail_path.add(f'{prev[0]}{prev[1]}')
              tail = []
              tail.extend(prev)
      case _:
        raise ValueError('[ERROR] invalid input')

  print(head_path)
  print(tail_path)
  print(len(tail_path))