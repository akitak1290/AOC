import os

# assume that all array length is divisible by 2 (is even number)
# in a group, there can only be one duplicate across 3 backpacks 

dir = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

GROUP_MEMBER_NUMBER = 3

# to calculate priority number of each letter
lower_offset = 96 # a-z
upper_offset = 38 # A-Z

with open(os.path.join(dir, 'input.txt')) as file:
  priority_sum = 0
  group = [] # list of 3 for 3 lines at a time

  # read 3 lines at a time
  for line in file:
    if len(group) != GROUP_MEMBER_NUMBER: # populate the group
      group.append(line)

    if len(group) == GROUP_MEMBER_NUMBER: # find the duplicated letter between 3 lines
      # loop through the first 2 lines to find all the duplicates
      duplicates = set() # to remove duplicates of a duplicate
      for x in group[0]:
        for y in group[1]:
          if x == y and x != '\n':
            duplicates.add(x)

      # loop through the duplicates and the last line to find 
      true_duplicate = set()
      for x in duplicates:
        for y in group[2]:
          if x == y:
            true_duplicate.add(x)

      for x in true_duplicate: # there should be only 1
        priority_sum += ord(x) - lower_offset if x.islower() else ord(x) - upper_offset
            
      # clear the list
      group = []
  print(priority_sum)