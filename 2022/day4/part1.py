import os

dir = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

with open(os.path.join(dir, 'input.txt')) as file:
  pair_count = 0
  for line in file:
    # replace ',' with '-' and split the string to get
    # the 4 numbers
    edges = []
    parse_line = line.replace(',','-')
    parse_line = parse_line.replace('\n','')
    edges = parse_line.split('-')
    # compare first and third number and second and last number
    # convert char to int to avoid '8' > '54' being true (8 vs 5, not 54)
    int_edges = []
    for edge in edges:
      int_edges.append(int(edge))
    edges = int_edges
    
    if edges[0] <= edges[2] and edges[1] >= edges[3]:
      pair_count += 1
    elif edges[0] >= edges[2] and edges[1] <= edges[3]:
      pair_count += 1

  print(pair_count)
    # ++++--------+++++ -> <=, >=
    # ++++++----+++++++

    # +++++++----++++++ -> >=, <=
    # ++++----------+++

    # ++++--------+++++ -> covered by 2 cases above
    # ++++--------+++++