import os

dir = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

total_space = 70000000
update_size = 30000000

# util
def get_pos(pos_arr):
  pos_str = ''
  for part in pos_arr:
    pos_str += part
  return pos_str

def sum_recursion(dict_tree, valid_sums, threshold, puzzle_part):
  current_sum = 0

  for value in dict_tree.values():
    if isinstance(value, dict): # folder, value is a dict
      current_sum += sum_recursion(value, valid_sums, threshold, puzzle_part)
    else: # file
      current_sum += int(value)
  
  if puzzle_part == 1:
    if current_sum < threshold:
      valid_sums.append(current_sum)
  elif puzzle_part == 2:
    if current_sum > threshold:
      valid_sums.append(current_sum)
  
  return current_sum


with open(os.path.join(dir, 'input.txt')) as file:
  dict_tree = {}
  line_args = []
  current_pos = []
  current_pos.append('dict_tree')

  # setup tree root
  line_args = next(file).split()
  dict_tree[line_args[2]] = {}
  current_pos.append(f'["{line_args[2]}"]')

  # build the rest of the tree
  for line in file:
    line_args = line.split()
    if line_args[0] == "$": # command
      if line_args[1] == "cd": # move directory
        if line_args[2] == "..": # to parent
          if len(current_pos) > 1:
            current_pos.pop()
          else:
            raise ValueError('tree is at root /, cannot go up')
        else: # to a child, assume it exists
          current_pos.append(f'["{line_args[2]}"]')
      elif line_args[1] == "ls": # ignore
        continue
    elif line_args[0] == "dir": # new directory
      exec_str = get_pos(current_pos) + f'["{line_args[1]}"] = ' + "{}"
      exec(exec_str)
    elif line_args[0].isnumeric(): # new file
      exec_str = get_pos(current_pos) + f'["{line_args[1]}"] = "{line_args[0]}"'
      exec(exec_str)
    else:
      raise ValueError(f'input is invalid at line {line}')
    
  # go through the tree and get total
  valid_sums_arr = []
  valid_sum = 0
  total_sum = sum_recursion(dict_tree, valid_sums_arr, 100000, 1)
  for value in valid_sums_arr:
    valid_sum += value
  
  # print(valid_sum) # part 1

  free_space = total_space - total_sum
  missing_space = update_size - free_space
  valid_sums_arr = []
  sum_recursion(dict_tree, valid_sums_arr, missing_space, 2)
  
  smallest_valid_size = total_space
  for value in valid_sums_arr:
    if value < smallest_valid_size:
      smallest_valid_size = value

  print(smallest_valid_size)

  # print(dict_tree)