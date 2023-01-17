import os

topStashes = [0, 0, 0]
sum = 0

dir = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

with open(os.path.join(dir, 'input.txt')) as file:
    for line in file:
        if line != '\n':
          sum += int(line)
        else:
          if sum > min(topStashes):
            topStashes.pop();
            topStashes.append(sum)
            topStashes.sort(reverse=True)
          sum = 0

if sum > min(topStashes):
  topStashes.pop();
  topStashes.append(sum)
  topStashes.sort(reverse=True)

# print(topStashes)
sum = 0
for stash in topStashes:
  sum += stash

print(sum)