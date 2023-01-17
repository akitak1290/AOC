import os

MARKER_LEN = 14

def find_dup(arr):
  if len(arr) == 1:
    return False;

  for i in range(len(arr)):
    if i == len(arr) - 1:
      return find_dup(arr[1:])
    elif arr[0] == arr[i+1]:
      return True

dir = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))
marker_end_index = 0
with open(os.path.join(dir, 'input.txt')) as file:
  buffer = file.readline() # no newline

  for i in range(len(buffer)):
    marker = buffer[i:i+MARKER_LEN]

    if len(marker) < MARKER_LEN:
      break

    if not find_dup(marker):
      marker_end_index = i+MARKER_LEN
      break

print(marker_end_index)