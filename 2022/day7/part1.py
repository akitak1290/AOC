import os

dir = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

# util
def get_pos(pos_arr):
  pos_str = ''
  for part in pos_arr:
    pos_str += part
  return pos_str

def sum_recursion(dict_tree, valid_sums):
  current_sum = 0

  for value in dict_tree.values():
    if isinstance(value, dict): # folder, value is a dict
      current_sum += sum_recursion(value, valid_sums)
    else: # file
      current_sum += int(value)
  
  if current_sum < 100000:
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
  valid_sums = []
  print(sum_recursion(dict_tree, valid_sums))

  sum = 0
  for value in valid_sums:
    sum += value
  
  print(sum)

  # print(dict_tree)