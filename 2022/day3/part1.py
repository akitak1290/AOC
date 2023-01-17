import os

# assume that all array length is divisible by 2 (is even number)

dir = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

# to calculate priority number of each letter
lower_offset = 96 # a-z
upper_offset = 38 # A-Z

with open(os.path.join(dir, 'input.txt')) as file:
  priority_sum = 0
  for line in file:
    middle_index = int(((len(line) - 1)/2) if len(line) % 2 != 0 else len(line)/2)
    substr1 = line[:middle_index]
    substr2 = line[middle_index:]
    # compare the items in two pockets
    duplicate_letters = []
    for x in substr1:
      for y in substr2:
        if x == y:
          # don't count duplicate items
          if len(duplicate_letters) != 0:
            # check for existing duplicate
            for letter in duplicate_letters:
              if x != letter:
                priority_sum += (ord(x) - lower_offset) if x.islower() else (ord(x) - upper_offset)
                duplicate_letters.append(x)
          else: # array still empty
            priority_sum += (ord(x) - lower_offset) if x.islower() else (ord(x) - upper_offset)
            duplicate_letters.append(x)

  print(priority_sum)