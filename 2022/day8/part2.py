import os 

dir = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

with open(os.path.join(dir, 'input.txt')) as file:

  # build the 2d array
  forrest = []
  for index, line in enumerate(file):
    forrest.append([])
    forrest[index].extend(line[:-1])

  grid_length = len(forrest[0])
  grid_height = len(forrest)

  scenic_score = 0

  for i in range(grid_height):
    for j in range(grid_length):
      y_pos = i
      x_pos = j
      scores = [0, 0, 0, 0]

      # if not one of the 4 edges
      if y_pos != 0 and \
         y_pos != (grid_height - 1) and \
         x_pos != 0 and \
         x_pos != (grid_length - 1):
        
        # check each directions
        # assume initially, all trees are visible

        current_tree = forrest[y_pos][x_pos]

        # top
        for top in range(y_pos-1, -1, -1):
          if forrest[top][x_pos] >= current_tree:
            scores[0] += 1
            break
          else:
            scores[0] += 1

        # bottom
        for bottom in range(y_pos+1, grid_height, 1):
          if forrest[bottom][x_pos] >= current_tree:
            scores[1] += 1
            break
          else:
            scores[1] += 1

        # left
        for left in range(x_pos-1, -1, -1):
          if forrest[y_pos][left] >= current_tree:
            scores[2] += 1
            break
          else:
            scores[2] += 1

        # # right
        for right in range(x_pos+1, grid_length, 1):
          if forrest[y_pos][right] >= current_tree:
            scores[3] += 1
            break
          else:
            scores[3] += 1

        current_scenic_score = 1
        for score in scores:
          current_scenic_score = current_scenic_score * score
        
        if current_scenic_score > scenic_score:
          scenic_score = current_scenic_score

  print(scenic_score)