import os

dir = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

with open(os.path.join(dir, 'input.txt')) as file:
  pair_count = 0
  line_count = 0
  for line in file:
    line_count += 1
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
    
    if edges[1] < edges[2]:
      pair_count += 1
    elif edges[0] > edges[3]:
      pair_count += 1

  # overlapping pairs, total pairs, non overlapping pairs
  pair_count = line_count - pair_count
  print(pair_count)

    # faster to find non overlapping pairs first
    # ++----++++++++++ edge2 < edge3
    # ++++++-------+++

    # +++++++++------+ edge1 > edge4
    # ++------++++++++