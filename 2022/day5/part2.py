import os

ROW_COUNT = 8
COLUMN_COUNT = 9

dir = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

with open(os.path.join(dir, 'input.txt')) as file:
  # initiate the nested list
  matrix = []
  for i in range(COLUMN_COUNT):
    matrix.append([])

  line_count = 0
  for line in file:
    line_count += 1
    # first 8 lines are data to create stacks
    if line_count <= ROW_COUNT:
      # populate the nested list
      item_number = 0
      item_start_index = 0
      for i in range(COLUMN_COUNT):
        item = line[item_start_index+1]
        if item != ' ':
          matrix[item_number].insert(0, item)
        item_number += 1
        item_start_index += 4
    
    # skip line 9 and 10
    if line_count > (ROW_COUNT + 2):
      instructions = line.rstrip().split(' ')
      matrix[int(instructions[5])-1].extend(matrix[int(instructions[3])-1][-(int(instructions[1])):])
      for i in range(int(instructions[1])):
        matrix[int(instructions[3])-1].pop()

  sum_string = ''
  for stack in matrix:
    sum_string += stack.pop()

  print(sum_string)