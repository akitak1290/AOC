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

  visible_cnt = (grid_length - 2) * 2 + grid_height * 2

  for i in range(grid_height):
    for j in range(grid_length):
      y_pos = i
      x_pos = j

      # if not one of the 4 edges
      if y_pos != 0 and \
         y_pos != (grid_height - 1) and \
         x_pos != 0 and \
         x_pos != (grid_length - 1):
        
        # check each directions
        # assume initially, all trees are visible

        current_tree = forrest[y_pos][x_pos]
        blocked = False

        # top
        for top in range(y_pos-1, -1, -1):
          if forrest[top][x_pos] >= current_tree:
            blocked = True
            break
        
        if not blocked:
          visible_cnt += 1
          continue

        blocked = False

        # bottom
        for bottom in range(y_pos+1, grid_height, 1):
          if forrest[bottom][x_pos] >= current_tree:
            blocked = True
            break

        if not blocked:
          visible_cnt += 1
          continue

        blocked = False

        # left
        for left in range(x_pos-1, -1, -1):
          if forrest[y_pos][left] >= current_tree:
            blocked = True
            break

        if not blocked:
          visible_cnt += 1
          continue

        blocked = False

        # # right
        for right in range(x_pos+1, grid_length, 1):
          if forrest[y_pos][right] >= current_tree:
            blocked = True
            break
        
        if not blocked:
          visible_cnt += 1
          continue

  print(visible_cnt)